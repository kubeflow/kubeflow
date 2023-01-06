/*
Copyright 2023.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package controllers

import (
	"context"
	"fmt"
	"reflect"

	"github.com/go-logr/logr"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	apierrs "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/utils/strings/slices"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/builder"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/predicate"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"

	kubefloworgv1alpha1 "github.com/kubeflow/kubeflow/components/volumes-viewer/api/v1alpha1"
)

// VolumesViewerReconciler reconciles a VolumesViewer object
type VolumesViewerReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

const (
	// We use a resource prefix so that the names of generated resources like deployments are unique
	resourcePrefix = "volumesviewer-"

	nameLabelKey     = "app.kubernetes.io/name"
	instanceLabelKey = "app.kubernetes.io/instance"
	partOfLabelKey   = "app.kubernetes.io/part-of"
	partOfLabelValue = "volumes-viewer"

	servicePort  = int32(80)
	istioGateway = "kubeflow/kubeflow-gateway"
)

var (
	virtualServiceTemplate = &unstructured.Unstructured{
		Object: map[string]interface{}{
			"apiVersion": "networking.istio.io/v1alpha3",
			"kind":       "VirtualService",
		},
	}
)

// Default permissions for the volumes viewer
// +kubebuilder:rbac:groups=kubeflow.org,resources=volumesviewers,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=kubeflow.org,resources=volumesviewers/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=kubeflow.org,resources=volumesviewers/finalizers,verbs=update

// Add permissions to create child resources
// +kubebuilder:rbac:groups=apps,resources=deployments,verbs=get;list;watch;create;update
// +kubebuilder:rbac:groups=core,resources=services,verbs=get;list;watch;create;update
// +kubebuilder:rbac:groups=networking.istio.io,resources=virtualservices,verbs=get;list;watch;create;update

// Add permissions to read external resources
// +kubebuilder:rbac:groups=core,resources=pods,verbs=get;list;watch
// +kubebuilder:rbac:groups=core,resources=persistentvolumeclaims,verbs=get;list;watch

// SetupWithManager sets up the controller with the Manager.
func (r *VolumesViewerReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&kubefloworgv1alpha1.VolumesViewer{}).
		// This controller manages, i.e. creates these kinds for a volumes viewer
		Owns(&appsv1.Deployment{}).
		Owns(&corev1.Service{}).
		Owns(virtualServiceTemplate).
		// We are watching Pods so that we can reconcile volumes viewer with restart=True
		Watches(
			&source.Kind{Type: &corev1.Pod{}},
			handler.EnqueueRequestsFromMapFunc(r.findVolumeViewersForPod),
			builder.WithPredicates(predicate.ResourceVersionChangedPredicate{}),
		).
		Complete(r)
}

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
func (r *VolumesViewerReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)

	instance := &kubefloworgv1alpha1.VolumesViewer{}
	if err := r.Get(ctx, req.NamespacedName, instance); err != nil {
		// Created objects are automatically garbage collected if parent is deleted
		return reconcile.Result{}, client.IgnoreNotFound(err)
	}

	if !instance.ObjectMeta.DeletionTimestamp.IsZero() {
		// The object is being deleted
		// Do nothing as the resources are automatically garbage collected
		log.Info("Volumes viewer is being deleted")
		return reconcile.Result{}, nil
	}

	commonLabels := map[string]string{
		nameLabelKey:     instance.Name,
		instanceLabelKey: resourcePrefix + instance.Name,
		partOfLabelKey:   partOfLabelValue,
	}

	rwoVolumes, err := r.reconcileDeployment(ctx, log, instance, commonLabels)
	if err != nil {
		log.Error(err, "Error while reconciling deployment")
		return ctrl.Result{}, err
	}

	if err := r.reconcileService(ctx, log, instance, commonLabels); err != nil {
		log.Error(err, "Error while reconciling service")
		return ctrl.Result{}, err
	}

	if err := r.reconcileVirtualService(ctx, log, instance, commonLabels); err != nil {
		log.Error(err, "Error while reconciling virtual service")
		return ctrl.Result{}, err
	}

	if err := r.reconcileStatus(ctx, log, instance.Name, instance.Namespace, rwoVolumes); err != nil {
		log.Error(err, "Error while reconciling status")
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

// Creates or updates the deployment as defined by the viewer's podTemplate
func (r *VolumesViewerReconciler) reconcileDeployment(ctx context.Context, log logr.Logger, viewer *kubefloworgv1alpha1.VolumesViewer, commonLabels map[string]string) ([]string, error) {
	deployment := &appsv1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name:      resourcePrefix + viewer.Name,
			Namespace: viewer.Namespace,
			Labels:    commonLabels,
		},
	}
	createDeployment := false
	if err := r.Get(ctx, types.NamespacedName{Name: deployment.Name, Namespace: deployment.Namespace}, deployment); err != nil {
		if !apierrs.IsNotFound(err) {
			return nil, err
		}
		createDeployment = true
	}

	var (
		// Do not change affinity or rwoClaims by default
		affinity   = deployment.Spec.Template.Spec.Affinity
		rwoVolumes = viewer.Status.RWOVolumes
		// The user may update the viewer and add new volumes. This case needs to be considered when computing setAffinity
		volumesChanged = !reflect.DeepEqual(deployment.Spec.Template.Spec.Volumes, viewer.Spec.PodTemplate.Volumes)
		// Affinity is only to be set when rwo scheduling is enabled and the deployment needs to be (re-)started
		determineAffinity = viewer.Spec.RWOScheduling.Enabled && (createDeployment || viewer.Spec.RWOScheduling.Restart || volumesChanged)
	)

	if determineAffinity {
		newAffinity, rwoVolumesMap, err := r.generateAffinity(ctx, log, viewer)
		// Convert map to slice
		rwoVolumes = make([]string, 0, len(rwoVolumesMap))
		for claim := range rwoVolumesMap {
			rwoVolumes = append(rwoVolumes, claim)
		}
		if err != nil {
			return rwoVolumes, err
		}
		// Only set the affinity if it is not nil - we wouldn't win anything by restarting without affinity
		if newAffinity != nil {
			affinity = newAffinity
		}
	}

	deployment.Spec.Selector = &metav1.LabelSelector{
		MatchLabels: commonLabels,
	}
	deployment.Spec.Template = corev1.PodTemplateSpec{
		ObjectMeta: metav1.ObjectMeta{
			Labels: commonLabels,
		},
		Spec: viewer.Spec.PodTemplate,
	}
	// We're using a recreate strategy to ensure that the pod is restarted when the affinity change.
	// Otherwise, we could be mounting the same PVC to multiple pods, preventing the pod from starting.
	deployment.Spec.Strategy = appsv1.DeploymentStrategy{
		Type: appsv1.RecreateDeploymentStrategyType,
	}
	deployment.Spec.Template.Spec.Affinity = affinity

	if err := ctrl.SetControllerReference(viewer, deployment, r.Scheme); err != nil {
		return nil, err
	}

	if createDeployment {
		log.Info("Creating Deployment")
		return rwoVolumes, r.Create(ctx, deployment)
	}
	log.Info("Updating Deployment")
	return rwoVolumes, r.Update(ctx, deployment)
}

// Creates or updates the service as defined by the viewer's service
func (r *VolumesViewerReconciler) reconcileService(ctx context.Context, log logr.Logger, viewer *kubefloworgv1alpha1.VolumesViewer, commonLabels map[string]string) error {
	if viewer.Spec.Service == (kubefloworgv1alpha1.Service{}) {
		return nil
	}

	service := &corev1.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name:      resourcePrefix + viewer.Name,
			Namespace: viewer.Namespace,
			Labels:    commonLabels,
		},
	}
	createService := false
	if err := r.Get(ctx, types.NamespacedName{Name: service.Name, Namespace: service.Namespace}, service); err != nil {
		if !apierrs.IsNotFound(err) {
			return err
		}
		createService = true
	}

	service.Spec.Type = "ClusterIP"
	service.Spec.Selector = commonLabels
	service.Spec.Ports = []corev1.ServicePort{
		corev1.ServicePort{
			Name:       "http",
			Port:       servicePort,
			TargetPort: viewer.Spec.Service.TargetPort,
		},
	}

	if err := ctrl.SetControllerReference(viewer, service, r.Scheme); err != nil {
		return err
	}

	if createService {
		log.Info("Creating Service")
		return r.Create(ctx, service)
	}
	log.Info("Updating Service")
	return r.Update(ctx, service)
}

func (r *VolumesViewerReconciler) reconcileVirtualService(ctx context.Context, log logr.Logger, viewer *kubefloworgv1alpha1.VolumesViewer, commonLabels map[string]string) error {
	if viewer.Spec.Service == (kubefloworgv1alpha1.Service{}) || viewer.Spec.Service.VirtualService == (kubefloworgv1alpha1.VirtualService{}) {
		return nil
	}

	virtualService := &unstructured.Unstructured{
		Object: map[string]interface{}{
			"apiVersion": "networking.istio.io/v1alpha3",
			"kind":       "VirtualService",
			"metadata": map[string]interface{}{
				"name":      resourcePrefix + viewer.Name,
				"namespace": viewer.Namespace,
				"labels":    commonLabels,
			},
		},
	}
	createVirtualService := false
	if err := r.Get(ctx, types.NamespacedName{Name: virtualService.GetName(), Namespace: virtualService.GetNamespace()}, virtualService); err != nil {
		if !apierrs.IsNotFound(err) {
			return err
		}
		createVirtualService = true
	}

	prefix := fmt.Sprintf("%s/%s/%s/", viewer.Spec.Service.VirtualService.BasePrefix, viewer.Namespace, viewer.Name)
	rewrite := prefix
	if viewer.Spec.Service.VirtualService.Rewrite != "" {
		rewrite = viewer.Spec.Service.VirtualService.Rewrite
	}
	service := fmt.Sprintf("%s%s.%s.svc.cluster.local", resourcePrefix, viewer.Name, viewer.Namespace)
	var timeout *string = nil
	if viewer.Spec.Service.VirtualService.Timeout != "" {
		timeout = &viewer.Spec.Service.VirtualService.Timeout
	}

	virtualService.Object["spec"] = map[string]interface{}{
		"hosts": []string{"*"},
		"gateways": []string{
			istioGateway,
		},
		"http": []interface{}{
			map[string]interface{}{
				"match": []interface{}{
					map[string]interface{}{
						"uri": map[string]interface{}{
							"prefix": prefix,
						},
					},
				},
				"rewrite": map[string]interface{}{
					"uri": rewrite,
				},
				"route": []interface{}{
					map[string]interface{}{
						"destination": map[string]interface{}{
							"host": service,
							"port": map[string]interface{}{
								"number": int64(servicePort),
							},
						},
					},
				},
				"timeout": timeout,
			},
		},
	}

	if err := ctrl.SetControllerReference(viewer, virtualService, r.Scheme); err != nil {
		return err
	}

	if createVirtualService {
		log.Info("Creating Virtual Service")
		return r.Create(ctx, virtualService)
	}
	log.Info("Updating Virtual Service")
	return r.Update(ctx, virtualService)
}

// Computes and updates the status of the volumes viewer
func (r *VolumesViewerReconciler) reconcileStatus(ctx context.Context, log logr.Logger, viewerName string, viewerNamespace string, rwoVolumes []string) error {
	viewer := &kubefloworgv1alpha1.VolumesViewer{}
	if err := r.Get(ctx, types.NamespacedName{Name: viewerName, Namespace: viewerNamespace}, viewer); err != nil {
		return err
	}

	if rwoVolumes == nil {
		viewer.Status.RWOVolumes = []string{}
	} else {
		viewer.Status.RWOVolumes = rwoVolumes
	}

	if viewer.Spec.Service.VirtualService != (kubefloworgv1alpha1.VirtualService{}) {
		url := fmt.Sprintf("%s/%s/%s/", viewer.Spec.Service.VirtualService.BasePrefix, viewer.Namespace, viewer.Name)
		viewer.Status.URL = &url
	} else {
		viewer.Status.URL = nil
	}

	deployment := &appsv1.Deployment{}
	if err := r.Get(ctx, types.NamespacedName{Name: resourcePrefix + viewer.Name, Namespace: viewer.Namespace}, deployment); err != nil {
		log.Info("Could not find Deployment for status update")
		viewer.Status.Ready = false
		viewer.Status.ReadyReplicas = 0
	} else {
		viewer.Status.ReadyReplicas = deployment.Status.ReadyReplicas
		viewer.Status.Ready = *deployment.Spec.Replicas == deployment.Status.ReadyReplicas
	}

	log.Info("Updating status")
	return r.Client.Status().Update(ctx, viewer)
}

// Generates the affinity to be used for the deployment
// In case no affinity should be used (e.g. RWOScheduling is disabled) or updated, nil is returned
func (r *VolumesViewerReconciler) generateAffinity(ctx context.Context, log logr.Logger, viewer *kubefloworgv1alpha1.VolumesViewer) (*corev1.Affinity, map[string]bool, error) {
	// 1. Extract the referenced PVCs from the pod template
	volumes := make(map[string]bool)
	for _, volume := range viewer.Spec.PodTemplate.Volumes {
		if volume.PersistentVolumeClaim != nil && volume.PersistentVolumeClaim.ClaimName != "" {
			volumes[volume.PersistentVolumeClaim.ClaimName] = false
		}
	}

	if len(volumes) == 0 {
		log.Info("Viewer references no claims")
		return nil, nil, nil
	}

	// 2. Check which of those PVCs have RWO access mode by listing them
	// Note: directly selecting PVCs by names using FieldSelectors doesn't work (maybe only in testing env?)
	// Thus, get all PVCs in namespace and filter manually
	pvcList := &corev1.PersistentVolumeClaimList{}
	err := r.List(ctx, pvcList, client.InNamespace(viewer.Namespace))
	if err != nil {
		return nil, nil, err
	}
	referencesRWO := false
	for _, pvc := range pvcList.Items {
		if _, ok := volumes[pvc.Name]; ok {
			isRWO := len(pvc.Spec.AccessModes) == 1 && pvc.Spec.AccessModes[0] == corev1.ReadWriteOnce
			volumes[pvc.Name] = isRWO
			referencesRWO = referencesRWO || isRWO
		}
	}
	if !referencesRWO {
		log.Info("Viewer references no RWO volumes")
		return nil, nil, nil
	}

	// Delete all claims that are not RWO
	for volumeName, isRWO := range volumes {
		if !isRWO {
			delete(volumes, volumeName)
		}
	}

	// 3. Get all pods in namespace and filter by RWO PVCs
	podList := &corev1.PodList{}
	err = r.List(ctx, podList, client.InNamespace(viewer.Namespace))
	if err != nil {
		return nil, volumes, err
	}
	var nodeName *string
	for _, pod := range podList.Items {
		// Skip pods this controller created
		if partOf, ok := pod.Labels[partOfLabelKey]; ok && partOf == partOfLabelValue {
			continue
		}
		for _, volume := range pod.Spec.Volumes {
			if volume.PersistentVolumeClaim != nil && volume.PersistentVolumeClaim.ClaimName != "" {
				if isRWO, ok := volumes[volume.PersistentVolumeClaim.ClaimName]; ok && isRWO {
					if nodeName != nil {
						// Rather than throwing an error, we just omit the affinity, leaving the current deployment's affinity unchanged
						log.Info("Omitting Affinity: Viewer references RWO volumes on multiple nodes",
							"nodes", []string{*nodeName, pod.Spec.NodeName})
						return nil, volumes, nil
					}
					if pod.Spec.NodeName == "" {
						log.Info("Omitting Affinity: Viewer references RWO volume on pod without nodeName")
						return nil, volumes, nil
					}
					nodeName = &pod.Spec.NodeName
				}
			}
		}
	}

	if nodeName == nil {
		log.Info("Omitting Affinity: Viewer references no RWO volumes on pods")
		return nil, volumes, nil
	}

	// 4. Generate Affinity using the node name
	affinity := &corev1.Affinity{
		NodeAffinity: &corev1.NodeAffinity{
			PreferredDuringSchedulingIgnoredDuringExecution: []corev1.PreferredSchedulingTerm{
				{
					Weight: 100,
					Preference: corev1.NodeSelectorTerm{
						MatchExpressions: []corev1.NodeSelectorRequirement{
							{
								Key:      "kubernetes.io/hostname",
								Operator: "In",
								Values:   []string{*nodeName},
							},
						},
					},
				},
			},
		},
	}
	return affinity, volumes, nil
}

// Gets called for each Pod that changes and returns a list of VolumesViewer objects
// that need to be reconciled as these mount the same RWO PVCs that the Pod mounts
// We might night to recompute the affinity of these volumes viewers, leading to on correct nodes
func (r *VolumesViewerReconciler) findVolumeViewersForPod(pod client.Object) []reconcile.Request {
	// Ignore pods that are being deleted
	if pod.GetDeletionTimestamp() != nil {
		return []reconcile.Request{}
	}

	// Extract mounted volumes from pod
	pvcNames := make(map[string]bool)
	for _, volume := range pod.(*corev1.Pod).Spec.Volumes {
		if volume.PersistentVolumeClaim != nil {
			pvcNames[volume.PersistentVolumeClaim.ClaimName] = true
		}
	}

	// List all volume viewers in pod's namespace
	volumesViewerList := &kubefloworgv1alpha1.VolumesViewerList{}
	err := r.List(context.TODO(), volumesViewerList, client.InNamespace(pod.GetNamespace()))
	if err != nil {
		log.Log.Error(err, "Failed to list volumes viewers")
		return []reconcile.Request{}
	}

	// Check if any of the volumes viewers have restart=True and watches one of the pod's PVCs
	requests := make([]reconcile.Request, 0)
	for _, volumesViewer := range volumesViewerList.Items {
		// Ignore pods that are owned by this VolumesViewer
		if pod.GetLabels()[nameLabelKey] == volumesViewer.Name {
			continue
		}

		if !volumesViewer.Spec.RWOScheduling.Restart {
			// We only care about volumes viewers that have restart=True
			continue
		}

		log.Log.Info("Watch triggering reconcile", "pod", pod.GetName(), "volumesViewer", volumesViewer.GetName(), "namespace", pod.GetNamespace())

		// Trigger reconciliation of that volume viewer
		for pvcName := range pvcNames {
			if slices.Contains(volumesViewer.Status.RWOVolumes, pvcName) {
				requests = append(requests, reconcile.Request{
					NamespacedName: types.NamespacedName{
						Name:      volumesViewer.GetName(),
						Namespace: volumesViewer.GetNamespace(),
					},
				})
				break
			}
		}
	}

	return requests
}

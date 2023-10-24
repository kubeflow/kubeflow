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
	"os"

	"github.com/go-logr/logr"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	apierrs "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"

	kubefloworgv1alpha1 "github.com/kubeflow/kubeflow/components/pvc-viewer/api/v1alpha1"
)

// PVCViewerReconciler reconciles a PVCViewer object
type PVCViewerReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

const (
	// We use a resource prefix so that the names of generated resources like deployments are unique
	resourcePrefix = "pvcviewer-"

	nameLabelKey     = "app.kubernetes.io/name"
	instanceLabelKey = "app.kubernetes.io/instance"
	partOfLabelKey   = "app.kubernetes.io/part-of"
	partOfLabelValue = "pvc-viewer"

	servicePort         = int32(80)
	istioGatewayEnvKey  = "ISTIO_GATEWAY"
	defaultIstioGateway = "kubeflow/kubeflow-gateway"
)

var (
	virtualServiceTemplate = &unstructured.Unstructured{
		Object: map[string]interface{}{
			"apiVersion": "networking.istio.io/v1alpha3",
			"kind":       "VirtualService",
		},
	}
)

// Default permissions for the PVCViewer
// +kubebuilder:rbac:groups=kubeflow.org,resources=pvcviewers,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=kubeflow.org,resources=pvcviewers/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=kubeflow.org,resources=pvcviewers/finalizers,verbs=update

// Add permissions to create child resources
// +kubebuilder:rbac:groups=apps,resources=deployments,verbs=get;list;watch;create;update
// +kubebuilder:rbac:groups=core,resources=services,verbs=get;list;watch;create;update
// +kubebuilder:rbac:groups=networking.istio.io,resources=virtualservices,verbs=get;list;watch;create;update

// Add permissions to read external resources
// +kubebuilder:rbac:groups=core,resources=pods,verbs=get;list;watch
// +kubebuilder:rbac:groups=core,resources=persistentvolumeclaims,verbs=get;list;watch

// SetupWithManager sets up the controller with the Manager.
func (r *PVCViewerReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&kubefloworgv1alpha1.PVCViewer{}).
		// This controller manages, i.e. creates these kinds for a PVCViewer
		Owns(&appsv1.Deployment{}).
		Owns(&corev1.Service{}).
		Owns(virtualServiceTemplate).
		Complete(r)
}

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
func (r *PVCViewerReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)

	instance := &kubefloworgv1alpha1.PVCViewer{}
	if err := r.Get(ctx, req.NamespacedName, instance); err != nil {
		// Created objects are automatically garbage collected if parent is deleted
		return reconcile.Result{}, client.IgnoreNotFound(err)
	}

	if !instance.ObjectMeta.DeletionTimestamp.IsZero() {
		// The object is being deleted
		// Do nothing as the resources are automatically garbage collected
		log.Info("PVCViewer is being deleted")

		// Keep on reconciling status until the finalizer is removed
		if err := r.reconcileStatus(ctx, log, instance.Name, instance.Namespace); err != nil {
			log.Error(err, "Error while reconciling status")
			return ctrl.Result{}, err
		}

		return reconcile.Result{}, nil
	}

	commonLabels := map[string]string{
		nameLabelKey:     instance.Name,
		instanceLabelKey: resourcePrefix + instance.Name,
		partOfLabelKey:   partOfLabelValue,
	}

	if err := r.reconcileDeployment(ctx, log, instance, commonLabels); err != nil {
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

	if err := r.reconcileStatus(ctx, log, instance.Name, instance.Namespace); err != nil {
		log.Error(err, "Error while reconciling status")
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

// Creates or updates the deployment as defined by the viewer's podSpec
func (r *PVCViewerReconciler) reconcileDeployment(ctx context.Context, log logr.Logger, viewer *kubefloworgv1alpha1.PVCViewer, commonLabels map[string]string) error {
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
			return err
		}
		createDeployment = true
	}

	var (
		// Do not change affinity or rwoClaims by default
		affinity = deployment.Spec.Template.Spec.Affinity
		// Affinity is only to be set when rwo scheduling is enabled and the deployment is to be newly created
		determineAffinity = viewer.Spec.RWOScheduling && createDeployment
	)

	if determineAffinity {
		if newAffinity, err := r.generateAffinity(ctx, log, viewer); err != nil {
			return err
		} else if newAffinity != nil {
			// Only set the affinity if it is not nil - we wouldn't win anything by restarting without affinity
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
		Spec: viewer.Spec.PodSpec,
	}
	// We're using a recreate strategy to ensure that the pod is restarted when the affinity change.
	// Otherwise, we could be mounting the same PVC to multiple pods, preventing the pod from starting.
	deployment.Spec.Strategy = appsv1.DeploymentStrategy{
		Type: appsv1.RecreateDeploymentStrategyType,
	}
	deployment.Spec.Template.Spec.Affinity = affinity

	if err := ctrl.SetControllerReference(viewer, deployment, r.Scheme); err != nil {
		return err
	}

	if createDeployment {
		log.Info("Creating Deployment")
		return r.Create(ctx, deployment)
	}
	log.Info("Updating Deployment")
	return r.Update(ctx, deployment)
}

// Creates or updates the service as defined by the viewer's service
func (r *PVCViewerReconciler) reconcileService(ctx context.Context, log logr.Logger, viewer *kubefloworgv1alpha1.PVCViewer, commonLabels map[string]string) error {
	if viewer.Spec.Networking == (kubefloworgv1alpha1.Networking{}) {
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
		{
			Name:       "http",
			Port:       servicePort,
			TargetPort: viewer.Spec.Networking.TargetPort,
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

func (r *PVCViewerReconciler) reconcileVirtualService(ctx context.Context, log logr.Logger, viewer *kubefloworgv1alpha1.PVCViewer, commonLabels map[string]string) error {
	if viewer.Spec.Networking == (kubefloworgv1alpha1.Networking{}) {
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

	prefix := fmt.Sprintf("%s/%s/%s/", viewer.Spec.Networking.BasePrefix, viewer.Namespace, viewer.Name)
	rewrite := prefix
	if viewer.Spec.Networking.Rewrite != "" {
		rewrite = viewer.Spec.Networking.Rewrite
	}
	service := fmt.Sprintf("%s%s.%s.svc.cluster.local", resourcePrefix, viewer.Name, viewer.Namespace)
	var timeout *string = nil
	if viewer.Spec.Networking.Timeout != "" {
		timeout = &viewer.Spec.Networking.Timeout
	}

	// Get the istio gateway from the environment variable or use the default
	istioGateway := os.Getenv(istioGatewayEnvKey)
	if istioGateway == "" {
		istioGateway = defaultIstioGateway
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

// Computes and updates the status of the PVCViewer
func (r *PVCViewerReconciler) reconcileStatus(ctx context.Context, log logr.Logger, viewerName string, viewerNamespace string) error {
	viewer := &kubefloworgv1alpha1.PVCViewer{}
	if err := r.Get(ctx, types.NamespacedName{Name: viewerName, Namespace: viewerNamespace}, viewer); err != nil {
		return err
	}

	if viewer.Spec.Networking != (kubefloworgv1alpha1.Networking{}) {
		url := fmt.Sprintf("%s/%s/%s/", viewer.Spec.Networking.BasePrefix, viewer.Namespace, viewer.Name)
		viewer.Status.URL = &url
	} else {
		viewer.Status.URL = nil
	}

	deployment := &appsv1.Deployment{}
	if err := r.Get(ctx, types.NamespacedName{Name: resourcePrefix + viewer.Name, Namespace: viewer.Namespace}, deployment); err != nil {
		log.Info("Could not find Deployment for status update")
		viewer.Status.Ready = false
	} else {
		viewer.Status.Ready = *deployment.Spec.Replicas == deployment.Status.ReadyReplicas
		// Append the latest condition, if it is not already in the list
		if len(deployment.Status.Conditions) > 0 {
			clen := len(viewer.Status.Conditions)
			if clen == 0 || viewer.Status.Conditions[clen-1] != deployment.Status.Conditions[0] {
				viewer.Status.Conditions = append(viewer.Status.Conditions, deployment.Status.Conditions[0])
			}
		}
	}

	log.Info("Updating status")
	return r.Client.Status().Update(ctx, viewer)
}

// Generates the affinity to be used for the deployment
// In case no affinity should be used (e.g. RWOScheduling is disabled) or updated, nil is returned
func (r *PVCViewerReconciler) generateAffinity(ctx context.Context, log logr.Logger, viewer *kubefloworgv1alpha1.PVCViewer) (*corev1.Affinity, error) {
	// Check if the viewer's PVC is RWO access mode
	pvc := &corev1.PersistentVolumeClaim{}
	if err := r.Get(ctx, types.NamespacedName{Name: viewer.Spec.PVC, Namespace: viewer.Namespace}, pvc); err != nil {
		if apierrs.IsNotFound(err) {
			log.Info("Omitting Affinity: PVC not found")
			// Should we return an error here or suppress it and let the Deployment fail?
			// Latter might be better and more visible to the user
			return nil, nil
		}
		return nil, err
	}

	if len(pvc.Spec.AccessModes) != 1 || pvc.Spec.AccessModes[0] != corev1.ReadWriteOnce {
		log.Info("Omitting Affinity: PVC is not RWO")
		return nil, nil
	}

	// Get all pods in namespace and filter by RWO PVCs
	podList := &corev1.PodList{}
	if err := r.List(ctx, podList, client.InNamespace(viewer.Namespace)); err != nil {
		return nil, err
	}
	var nodeName *string
	for _, pod := range podList.Items {
		// Skip pods this controller created
		if partOf, ok := pod.Labels[partOfLabelKey]; ok && partOf == partOfLabelValue {
			continue
		}
		for _, volume := range pod.Spec.Volumes {
			if volume.PersistentVolumeClaim != nil && volume.PersistentVolumeClaim.ClaimName != "" {
				if volume.PersistentVolumeClaim.ClaimName == pvc.Name {
					if nodeName != nil {
						// Rather than throwing an error, we just omit the affinity, leaving the current deployment's affinity unchanged
						log.Info("Omitting Affinity: Viewer references RWO volumes on multiple nodes",
							"nodes", []string{*nodeName, pod.Spec.NodeName})
						return nil, nil
					}
					if pod.Spec.NodeName == "" {
						log.Info("Omitting Affinity: Viewer references RWO volume on pod without nodeName")
						return nil, nil
					}
					nodeName = &pod.Spec.NodeName
				}
			}
		}
	}

	if nodeName == nil {
		log.Info("Omitting Affinity: PVC not used by other Pods")
		return nil, nil
	}

	// Generate Affinity using the node name
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
	return affinity, nil
}

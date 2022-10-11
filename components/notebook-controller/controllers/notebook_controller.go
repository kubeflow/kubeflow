/*

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
	"encoding/json"
	"fmt"
	"os"
	"reflect"
	"strings"
	"time"

	"github.com/go-logr/logr"
	reconcilehelper "github.com/kubeflow/kubeflow/components/common/reconcilehelper"
	"github.com/kubeflow/kubeflow/components/notebook-controller/api/v1beta1"
	"github.com/kubeflow/kubeflow/components/notebook-controller/pkg/culler"
	"github.com/kubeflow/kubeflow/components/notebook-controller/pkg/metrics"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	apierrs "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/util/intstr"
	"k8s.io/client-go/tools/record"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/builder"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/event"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/predicate"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"
)

const DefaultContainerPort = 8888
const DefaultServingPort = 80
const AnnotationRewriteURI = "notebooks.kubeflow.org/http-rewrite-uri"
const AnnotationHeadersRequestSet = "notebooks.kubeflow.org/http-headers-request-set"

const PrefixEnvVar = "NB_PREFIX"

// The default fsGroup of PodSecurityContext.
// https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#podsecuritycontext-v1-core
const DefaultFSGroup = int64(100)

/*
We generally want to ignore (not requeue) NotFound errors, since we'll get a
reconciliation request once the object exists, and requeuing in the meantime
won't help.
*/
func ignoreNotFound(err error) error {
	if apierrs.IsNotFound(err) {
		return nil
	}
	return err
}

// NotebookReconciler reconciles a Notebook object
type NotebookReconciler struct {
	client.Client
	Log           logr.Logger
	Scheme        *runtime.Scheme
	Metrics       *metrics.Metrics
	EventRecorder record.EventRecorder
}

// +kubebuilder:rbac:groups=core,resources=pods,verbs=get;list;watch
// +kubebuilder:rbac:groups=core,resources=events,verbs=get;list;watch;create;patch
// +kubebuilder:rbac:groups=core,resources=services,verbs="*"
// +kubebuilder:rbac:groups=apps,resources=statefulsets,verbs="*"
// +kubebuilder:rbac:groups=kubeflow.org,resources=notebooks;notebooks/status;notebooks/finalizers,verbs="*"
// +kubebuilder:rbac:groups="networking.istio.io",resources=virtualservices,verbs="*"

func (r *NotebookReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := r.Log.WithValues("notebook", req.NamespacedName)

	// TODO(yanniszark): Can we avoid reconciling Events and Notebook in the same queue?
	event := &corev1.Event{}
	var getEventErr error
	getEventErr = r.Get(ctx, req.NamespacedName, event)
	if getEventErr == nil {
		log.Info("Found event for Notebook. Re-emitting...")

		// Find the Notebook that corresponds to the triggered event
		involvedNotebook := &v1beta1.Notebook{}
		nbName, err := nbNameFromInvolvedObject(r.Client, &event.InvolvedObject)
		if err != nil {
			return ctrl.Result{}, err
		}

		involvedNotebookKey := types.NamespacedName{Name: nbName, Namespace: req.Namespace}
		if err := r.Get(ctx, involvedNotebookKey, involvedNotebook); err != nil {
			log.Error(err, "unable to fetch Notebook by looking at event")
			return ctrl.Result{}, ignoreNotFound(err)
		}

		// re-emit the event in the Notebook CR
		log.Info("Emitting Notebook Event.", "Event", event)
		r.EventRecorder.Eventf(involvedNotebook, event.Type, event.Reason,
			"Reissued from %s/%s: %s", strings.ToLower(event.InvolvedObject.Kind), event.InvolvedObject.Name, event.Message)
		return ctrl.Result{}, nil
	}

	if getEventErr != nil && !apierrs.IsNotFound(getEventErr) {
		return ctrl.Result{}, getEventErr
	}
	// If not found, continue. Is not an event.

	instance := &v1beta1.Notebook{}
	if err := r.Get(ctx, req.NamespacedName, instance); err != nil {
		log.Error(err, "unable to fetch Notebook")
		return ctrl.Result{}, ignoreNotFound(err)
	}

	// jupyter-web-app deletes objects using foreground deletion policy, Notebook CR will stay until all owned objects are deleted
	// reconcile loop might keep on trying to recreate the resources that the API server tries to delete.
	// so when Notebook CR is terminating, reconcile loop should do nothing

	if !instance.DeletionTimestamp.IsZero() {
		return ctrl.Result{}, nil
	}

	// Reconcile StatefulSet
	ss := generateStatefulSet(instance)
	if err := ctrl.SetControllerReference(instance, ss, r.Scheme); err != nil {
		return ctrl.Result{}, err
	}
	// Check if the StatefulSet already exists
	foundStateful := &appsv1.StatefulSet{}
	justCreated := false
	err := r.Get(ctx, types.NamespacedName{Name: ss.Name, Namespace: ss.Namespace}, foundStateful)
	if err != nil && apierrs.IsNotFound(err) {
		log.Info("Creating StatefulSet", "namespace", ss.Namespace, "name", ss.Name)
		r.Metrics.NotebookCreation.WithLabelValues(ss.Namespace).Inc()
		err = r.Create(ctx, ss)
		justCreated = true
		if err != nil {
			log.Error(err, "unable to create Statefulset")
			r.Metrics.NotebookFailCreation.WithLabelValues(ss.Namespace).Inc()
			return ctrl.Result{}, err
		}
	} else if err != nil {
		log.Error(err, "error getting Statefulset")
		return ctrl.Result{}, err
	}
	// Update the foundStateful object and write the result back if there are any changes
	if !justCreated && reconcilehelper.CopyStatefulSetFields(ss, foundStateful) {
		log.Info("Updating StatefulSet", "namespace", ss.Namespace, "name", ss.Name)
		err = r.Update(ctx, foundStateful)
		if err != nil {
			log.Error(err, "unable to update Statefulset")
			return ctrl.Result{}, err
		}
	}

	// Reconcile service
	service := generateService(instance)
	if err := ctrl.SetControllerReference(instance, service, r.Scheme); err != nil {
		return ctrl.Result{}, err
	}
	// Check if the Service already exists
	foundService := &corev1.Service{}
	justCreated = false
	err = r.Get(ctx, types.NamespacedName{Name: service.Name, Namespace: service.Namespace}, foundService)
	if err != nil && apierrs.IsNotFound(err) {
		log.Info("Creating Service", "namespace", service.Namespace, "name", service.Name)
		err = r.Create(ctx, service)
		justCreated = true
		if err != nil {
			log.Error(err, "unable to create Service")
			return ctrl.Result{}, err
		}
	} else if err != nil {
		log.Error(err, "error getting Service")
		return ctrl.Result{}, err
	}
	// Update the foundService object and write the result back if there are any changes
	if !justCreated && reconcilehelper.CopyServiceFields(service, foundService) {
		log.Info("Updating Service\n", "namespace", service.Namespace, "name", service.Name)
		err = r.Update(ctx, foundService)
		if err != nil {
			log.Error(err, "unable to update Service")
			return ctrl.Result{}, err
		}
	}

	// Reconcile virtual service if we use ISTIO.
	if os.Getenv("USE_ISTIO") == "true" {
		err = r.reconcileVirtualService(instance)
		if err != nil {
			return ctrl.Result{}, err
		}
	}

	foundPod := &corev1.Pod{}
	podFound := true
	err = r.Get(ctx, types.NamespacedName{Name: ss.Name + "-0", Namespace: ss.Namespace}, foundPod)
	if err != nil && apierrs.IsNotFound(err) {
		log.Info("Pod not found...")
		podFound = false
	} else if err != nil {
		return ctrl.Result{}, err
	}

	// Update Notebook CR status
	err = updateNotebookStatus(r, instance, foundStateful, foundPod, req)
	if err != nil {
		return ctrl.Result{}, err
	}

	if !podFound {
		// Delete LAST_ACTIVITY_ANNOTATION annotations for CR objects
		// that do not have a pod.
		log.Info("Notebook has not Pod running. Will remove last-activity annotation")
		meta := instance.ObjectMeta
		if meta.GetAnnotations() == nil {
			log.Info("No annotations found")
			return ctrl.Result{}, nil
		}

		if _, ok := meta.GetAnnotations()[culler.LAST_ACTIVITY_ANNOTATION]; !ok {
			log.Info("No last-activity annotations found")
			return ctrl.Result{}, nil
		}

		log.Info("Removing last-activity annotation")
		delete(meta.GetAnnotations(), culler.LAST_ACTIVITY_ANNOTATION)
		err = r.Update(ctx, instance)
		if err != nil {
			return ctrl.Result{}, err
		}
		return ctrl.Result{}, nil

	}

	// Pod is found
	// Check if the Notebook needs to be stopped
	// Update the LAST_ACTIVITY_ANNOTATION
	if culler.UpdateNotebookLastActivityAnnotation(&instance.ObjectMeta) {
		err = r.Update(ctx, instance)
		if err != nil {
			return ctrl.Result{}, err
		}
	}

	// Check if the Notebook needs to be stopped
	if culler.NotebookNeedsCulling(instance.ObjectMeta) {
		log.Info(fmt.Sprintf(
			"Notebook %s/%s needs culling. Setting annotations",
			instance.Namespace, instance.Name))

		// Set annotations to the Notebook
		culler.SetStopAnnotation(&instance.ObjectMeta, r.Metrics)
		r.Metrics.NotebookCullingCount.WithLabelValues(instance.Namespace, instance.Name).Inc()
		err = r.Update(ctx, instance)
		if err != nil {
			return ctrl.Result{}, err
		}
	} else if !culler.StopAnnotationIsSet(instance.ObjectMeta) {
		// The Pod is either too fresh, or the idle time has passed and it has
		// received traffic. In this case we will be periodically checking if
		// it needs culling.
		return ctrl.Result{RequeueAfter: culler.GetRequeueTime()}, nil
	}
	return ctrl.Result{RequeueAfter: culler.GetRequeueTime()}, nil
}

func updateNotebookStatus(r *NotebookReconciler, nb *v1beta1.Notebook,
	sts *appsv1.StatefulSet, pod *corev1.Pod, req ctrl.Request) error {

	log := r.Log.WithValues("notebook", req.NamespacedName)
	ctx := context.Background()

	status, err := createNotebookStatus(r, nb, sts, pod, req)
	if err != nil {
		return err
	}

	log.Info("Updating Notebook CR Status", "status", status)
	nb.Status = status
	return r.Status().Update(ctx, nb)
}

func createNotebookStatus(r *NotebookReconciler, nb *v1beta1.Notebook,
	sts *appsv1.StatefulSet, pod *corev1.Pod, req ctrl.Request) (v1beta1.NotebookStatus, error) {

	log := r.Log.WithValues("notebook", req.NamespacedName)

	// Initialize Notebook CR Status
	log.Info("Initializing Notebook CR Status")
	status := v1beta1.NotebookStatus{
		Conditions:     make([]v1beta1.NotebookCondition, 0),
		ReadyReplicas:  sts.Status.ReadyReplicas,
		ContainerState: corev1.ContainerState{},
	}

	// Update the status based on the Pod's status
	if reflect.DeepEqual(pod.Status, corev1.PodStatus{}) {
		log.Info("No pod.Status found. Won't update notebook conditions and containerState")
		return status, nil
	}

	// Update status of the CR using the ContainerState of
	// the container that has the same name as the CR.
	// If no container of same name is found, the state of the CR is not updated.
	notebookContainerFound := false
	log.Info("Calculating Notebook's  containerState")
	for i := range pod.Status.ContainerStatuses {
		if pod.Status.ContainerStatuses[i].Name != nb.Name {
			continue
		}

		if pod.Status.ContainerStatuses[i].State == nb.Status.ContainerState {
			continue
		}

		// Update Notebook CR's status.ContainerState
		cs := pod.Status.ContainerStatuses[i].State
		log.Info("Updating Notebook CR state: ", "state", cs)

		status.ContainerState = cs
		notebookContainerFound = true
		break
	}

	if !notebookContainerFound {
		log.Error(nil, "Could not find container with the same name as Notebook "+
			"in containerStates of Pod. Will not update notebook's "+
			"status.containerState ")
	}

	// Mirroring pod condition
	notebookConditions := []v1beta1.NotebookCondition{}
	log.Info("Calculating Notebook's Conditions")
	for i := range pod.Status.Conditions {
		condition := PodCondToNotebookCond(pod.Status.Conditions[i])
		notebookConditions = append(notebookConditions, condition)
	}

	status.Conditions = notebookConditions

	return status, nil
}

func PodCondToNotebookCond(podc corev1.PodCondition) v1beta1.NotebookCondition {

	condition := v1beta1.NotebookCondition{}

	if len(podc.Type) > 0 {
		condition.Type = string(podc.Type)
	}

	if len(podc.Status) > 0 {
		condition.Status = string(podc.Status)
	}

	if len(podc.Message) > 0 {
		condition.Message = podc.Message
	}

	if len(podc.Reason) > 0 {
		condition.Reason = podc.Reason
	}

	// check if podc.LastProbeTime is null. If so initialize
	// the field with metav1.Now()
	check := podc.LastProbeTime.Time.Equal(time.Time{})
	if !check {
		condition.LastProbeTime = podc.LastProbeTime
	} else {
		condition.LastProbeTime = metav1.Now()
	}

	// check if podc.LastTransitionTime is null. If so initialize
	// the field with metav1.Now()
	check = podc.LastTransitionTime.Time.Equal(time.Time{})
	if !check {
		condition.LastTransitionTime = podc.LastTransitionTime
	} else {
		condition.LastTransitionTime = metav1.Now()
	}

	return condition
}

func setPrefixEnvVar(instance *v1beta1.Notebook, container *corev1.Container) {
	prefix := "/notebook/" + instance.Namespace + "/" + instance.Name

	for _, envVar := range container.Env {
		if envVar.Name == PrefixEnvVar {
			envVar.Value = prefix
			return
		}
	}

	container.Env = append(container.Env, corev1.EnvVar{
		Name:  PrefixEnvVar,
		Value: prefix,
	})
}

func generateStatefulSet(instance *v1beta1.Notebook) *appsv1.StatefulSet {
	replicas := int32(1)
	if culler.StopAnnotationIsSet(instance.ObjectMeta) {
		replicas = 0
	}

	ss := &appsv1.StatefulSet{
		ObjectMeta: metav1.ObjectMeta{
			Name:      instance.Name,
			Namespace: instance.Namespace,
		},
		Spec: appsv1.StatefulSetSpec{
			Replicas: &replicas,
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{
					"statefulset": instance.Name,
				},
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{Labels: map[string]string{
					"statefulset":   instance.Name,
					"notebook-name": instance.Name,
				}},
				Spec: *instance.Spec.Template.Spec.DeepCopy(),
			},
		},
	}
	// copy all of the Notebook labels to the pod including poddefault related labels
	l := &ss.Spec.Template.ObjectMeta.Labels
	for k, v := range instance.ObjectMeta.Labels {
		(*l)[k] = v
	}

	podSpec := &ss.Spec.Template.Spec
	container := &podSpec.Containers[0]
	if container.WorkingDir == "" {
		container.WorkingDir = "/home/jovyan"
	}
	if container.Ports == nil {
		container.Ports = []corev1.ContainerPort{
			{
				ContainerPort: DefaultContainerPort,
				Name:          "notebook-port",
				Protocol:      "TCP",
			},
		}
	}

	setPrefixEnvVar(instance, container)

	// For some platforms (like OpenShift), adding fsGroup: 100 is troublesome.
	// This allows for those platforms to bypass the automatic addition of the fsGroup
	// and will allow for the Pod Security Policy controller to make an appropriate choice
	// https://github.com/kubernetes-sigs/controller-runtime/issues/4617
	if value, exists := os.LookupEnv("ADD_FSGROUP"); !exists || value == "true" {
		if podSpec.SecurityContext == nil {
			fsGroup := DefaultFSGroup
			podSpec.SecurityContext = &corev1.PodSecurityContext{
				FSGroup: &fsGroup,
			}
		}
	}
	return ss
}

func generateService(instance *v1beta1.Notebook) *corev1.Service {
	// Define the desired Service object
	port := DefaultContainerPort
	containerPorts := instance.Spec.Template.Spec.Containers[0].Ports
	if containerPorts != nil {
		port = int(containerPorts[0].ContainerPort)
	}
	svc := &corev1.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name:      instance.Name,
			Namespace: instance.Namespace,
		},
		Spec: corev1.ServiceSpec{
			Type:     "ClusterIP",
			Selector: map[string]string{"statefulset": instance.Name},
			Ports: []corev1.ServicePort{
				{
					// Make port name follow Istio pattern so it can be managed by istio rbac
					Name:       "http-" + instance.Name,
					Port:       DefaultServingPort,
					TargetPort: intstr.FromInt(port),
					Protocol:   "TCP",
				},
			},
		},
	}
	return svc
}

func virtualServiceName(kfName string, namespace string) string {
	return fmt.Sprintf("notebook-%s-%s", namespace, kfName)
}

func generateVirtualService(instance *v1beta1.Notebook) (*unstructured.Unstructured, error) {
	name := instance.Name
	namespace := instance.Namespace
	clusterDomain := "cluster.local"
	prefix := fmt.Sprintf("/notebook/%s/%s/", namespace, name)

	// unpack annotations from Notebook resource
	annotations := make(map[string]string)
	for k, v := range instance.ObjectMeta.Annotations {
		annotations[k] = v
	}

	rewrite := fmt.Sprintf("/notebook/%s/%s/", namespace, name)
	// If AnnotationRewriteURI is present, use this value for "rewrite"
	if _, ok := annotations[AnnotationRewriteURI]; ok && len(annotations[AnnotationRewriteURI]) > 0 {
		rewrite = annotations[AnnotationRewriteURI]
	}

	if clusterDomainFromEnv, ok := os.LookupEnv("CLUSTER_DOMAIN"); ok {
		clusterDomain = clusterDomainFromEnv
	}
	service := fmt.Sprintf("%s.%s.svc.%s", name, namespace, clusterDomain)

	vsvc := &unstructured.Unstructured{}
	vsvc.SetAPIVersion("networking.istio.io/v1alpha3")
	vsvc.SetKind("VirtualService")
	vsvc.SetName(virtualServiceName(name, namespace))
	vsvc.SetNamespace(namespace)
	if err := unstructured.SetNestedStringSlice(vsvc.Object, []string{"*"}, "spec", "hosts"); err != nil {
		return nil, fmt.Errorf("Set .spec.hosts error: %v", err)
	}

	istioGateway := os.Getenv("ISTIO_GATEWAY")
	if len(istioGateway) == 0 {
		istioGateway = "kubeflow/kubeflow-gateway"
	}
	if err := unstructured.SetNestedStringSlice(vsvc.Object, []string{istioGateway},
		"spec", "gateways"); err != nil {
		return nil, fmt.Errorf("Set .spec.gateways error: %v", err)
	}

	headersRequestSet := make(map[string]string)
	// If AnnotationHeadersRequestSet is present, use its values in "headers.request.set"
	if _, ok := annotations[AnnotationHeadersRequestSet]; ok && len(annotations[AnnotationHeadersRequestSet]) > 0 {
		requestHeadersBytes := []byte(annotations[AnnotationHeadersRequestSet])
		if err := json.Unmarshal(requestHeadersBytes, &headersRequestSet); err != nil {
			// if JSON decoding fails, set an empty map
			headersRequestSet = make(map[string]string)
		}
	}
	// cast from map[string]string, as SetNestedSlice needs map[string]interface{}
	headersRequestSetInterface := make(map[string]interface{})
	for key, element := range headersRequestSet {
		headersRequestSetInterface[key] = element
	}

	// the http section of the istio VirtualService spec
	http := []interface{}{
		map[string]interface{}{
			"headers": map[string]interface{}{
				"request": map[string]interface{}{
					"set": headersRequestSetInterface,
				},
			},
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
							"number": int64(DefaultServingPort),
						},
					},
				},
			},
		},
	}

	// add http section to istio VirtualService spec
	if err := unstructured.SetNestedSlice(vsvc.Object, http, "spec", "http"); err != nil {
		return nil, fmt.Errorf("Set .spec.http error: %v", err)
	}

	return vsvc, nil

}

func (r *NotebookReconciler) reconcileVirtualService(instance *v1beta1.Notebook) error {
	log := r.Log.WithValues("notebook", instance.Namespace)
	virtualService, err := generateVirtualService(instance)
	if err := ctrl.SetControllerReference(instance, virtualService, r.Scheme); err != nil {
		return err
	}
	// Check if the virtual service already exists.
	foundVirtual := &unstructured.Unstructured{}
	justCreated := false
	foundVirtual.SetAPIVersion("networking.istio.io/v1alpha3")
	foundVirtual.SetKind("VirtualService")
	err = r.Get(context.TODO(), types.NamespacedName{Name: virtualServiceName(instance.Name,
		instance.Namespace), Namespace: instance.Namespace}, foundVirtual)
	if err != nil && apierrs.IsNotFound(err) {
		log.Info("Creating virtual service", "namespace", instance.Namespace, "name",
			virtualServiceName(instance.Name, instance.Namespace))
		err = r.Create(context.TODO(), virtualService)
		justCreated = true
		if err != nil {
			return err
		}
	} else if err != nil {
		return err
	}

	if !justCreated && reconcilehelper.CopyVirtualService(virtualService, foundVirtual) {
		log.Info("Updating virtual service", "namespace", instance.Namespace, "name",
			virtualServiceName(instance.Name, instance.Namespace))
		err = r.Update(context.TODO(), foundVirtual)
		if err != nil {
			return err
		}
	}

	return nil
}

func isStsOrPodEvent(event *corev1.Event) bool {
	return event.InvolvedObject.Kind == "Pod" || event.InvolvedObject.Kind == "StatefulSet"
}

func nbNameFromInvolvedObject(c client.Client, object *corev1.ObjectReference) (string, error) {
	name, namespace := object.Name, object.Namespace

	if object.Kind == "StatefulSet" {
		return name, nil
	}
	if object.Kind == "Pod" {
		pod := &corev1.Pod{}
		err := c.Get(
			context.TODO(),
			types.NamespacedName{
				Namespace: namespace,
				Name:      name,
			},
			pod,
		)
		if err != nil {
			return "", err
		}
		if nbName, ok := pod.Labels["notebook-name"]; ok {
			return nbName, nil
		}
	}
	return "", fmt.Errorf("object isn't related to a Notebook")
}

func nbNameExists(client client.Client, nbName string, namespace string) bool {
	if err := client.Get(context.Background(), types.NamespacedName{Namespace: namespace, Name: nbName}, &v1beta1.Notebook{}); err != nil {
		// If error != NotFound, trigger the reconcile call anyway to avoid loosing a potential relevant event
		return !apierrs.IsNotFound(err)
	}
	return true
}

// predNBPodIsLabeled filters pods not containing the "notebook-name" label key
func predNBPodIsLabeled() predicate.Funcs {
	// Documented at
	// https://github.com/kubernetes-sigs/controller-runtime/blob/ce8bdd3d81ab410ff23255e9ad3554f613c5183c/pkg/predicate/predicate_test.go#L884
	checkNBLabel := func() func(object client.Object) bool {
		return func(object client.Object) bool {
			_, labelExists := object.GetLabels()["notebook-name"]
			return labelExists
		}
	}

	return predicate.NewPredicateFuncs(checkNBLabel())
}

// predNBEvents filters events not coming from Pod or STS, and coming from
// unknown NBs
func predNBEvents(r *NotebookReconciler) predicate.Funcs {
	checkEvent := func() func(object client.Object) bool {
		return func(object client.Object) bool {
			event := object.(*corev1.Event)
			nbName, err := nbNameFromInvolvedObject(r.Client, &event.InvolvedObject)
			if err != nil {
				return false
			}
			return isStsOrPodEvent(event) && nbNameExists(r.Client, nbName, object.GetNamespace())
		}
	}

	predicates := predicate.NewPredicateFuncs(checkEvent())

	// Do not reconcile when an event gets deleted
	predicates.DeleteFunc = func(e event.DeleteEvent) bool {
		return false
	}

	return predicates
}

// SetupWithManager sets up the controller with the Manager.
func (r *NotebookReconciler) SetupWithManager(mgr ctrl.Manager) error {

	// Map function to convert pod events to reconciliation requests
	mapPodToRequest := func(object client.Object) []reconcile.Request {
		return []reconcile.Request{
			{NamespacedName: types.NamespacedName{
				Name:      object.GetLabels()["notebook-name"],
				Namespace: object.GetNamespace(),
			}},
		}
	}

	// Map function to convert namespace events to reconciliation requests
	mapEventToRequest := func(object client.Object) []reconcile.Request {
		return []reconcile.Request{
			{NamespacedName: types.NamespacedName{
				Name:      object.GetName(),
				Namespace: object.GetNamespace(),
			}},
		}
	}

	builder := ctrl.NewControllerManagedBy(mgr).
		For(&v1beta1.Notebook{}).
		Owns(&appsv1.StatefulSet{}).
		Owns(&corev1.Service{}).
		Watches(
			&source.Kind{Type: &corev1.Pod{}},
			handler.EnqueueRequestsFromMapFunc(mapPodToRequest),
			builder.WithPredicates(predNBPodIsLabeled())).
		Watches(
			&source.Kind{Type: &corev1.Event{}},
			handler.EnqueueRequestsFromMapFunc(mapEventToRequest),
			builder.WithPredicates(predNBEvents(r)))
	// watch Istio virtual service
	if os.Getenv("USE_ISTIO") == "true" {
		virtualService := &unstructured.Unstructured{}
		virtualService.SetAPIVersion("networking.istio.io/v1alpha3")
		virtualService.SetKind("VirtualService")
		builder.Owns(virtualService)
	}

	err := builder.Complete(r)
	if err != nil {
		return err
	}

	return nil
}

/*
Copyright 2019 The Kubeflow Authors.

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

package notebook

import (
	"context"
	"os"
	"strings"

	v1alpha1 "github.com/kubeflow/kubeflow/components/notebook-controller/pkg/apis/notebook/v1alpha1"
	"github.com/kubeflow/kubeflow/components/notebook-controller/pkg/util"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/util/intstr"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
	"sigs.k8s.io/controller-runtime/pkg/event"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/manager"
	"sigs.k8s.io/controller-runtime/pkg/predicate"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	logf "sigs.k8s.io/controller-runtime/pkg/runtime/log"
	"sigs.k8s.io/controller-runtime/pkg/source"
)

var log = logf.Log.WithName("controller")

const DefaultContainerPort = 8888

// The default fsGroup of PodSecurityContext.
// https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#podsecuritycontext-v1-core
const DefaultFSGroup = int64(100)

// Add creates a new Notebook Controller and adds it to the Manager with default RBAC. The Manager will set fields on the Controller
// and Start it when the Manager is Started.
func Add(mgr manager.Manager) error {
	return add(mgr, newReconciler(mgr))
}

// newReconciler returns a new reconcile.Reconciler
func newReconciler(mgr manager.Manager) reconcile.Reconciler {
	return &ReconcileNotebook{Client: mgr.GetClient(), scheme: mgr.GetScheme()}
}

// add adds a new Controller to mgr with r as the reconcile.Reconciler
func add(mgr manager.Manager, r reconcile.Reconciler) error {
	// Create a new controller
	c, err := controller.New("notebook-controller", mgr, controller.Options{Reconciler: r})
	if err != nil {
		return err
	}

	// Watch for changes to Notebook
	err = c.Watch(&source.Kind{Type: &v1alpha1.Notebook{}}, &handler.EnqueueRequestForObject{})
	if err != nil {
		return err
	}

	err = c.Watch(&source.Kind{Type: &appsv1.StatefulSet{}}, &handler.EnqueueRequestForOwner{
		IsController: true,
		OwnerType:    &v1alpha1.Notebook{},
	})
	if err != nil {
		return err
	}

	err = c.Watch(&source.Kind{Type: &corev1.Service{}}, &handler.EnqueueRequestForOwner{
		IsController: true,
		OwnerType:    &v1alpha1.Notebook{},
	})
	if err != nil {
		return err
	}

	// Watch underlying pod.
	// mapFn defines the mapping from object in event to reconcile request
	mapFn := handler.ToRequestsFunc(
		func(a handler.MapObject) []reconcile.Request {
			return []reconcile.Request{
				{NamespacedName: types.NamespacedName{
					Name:      a.Meta.GetLabels()["notebook-name"],
					Namespace: a.Meta.GetNamespace(),
				}},
			}
		})
	p := predicate.Funcs{
		UpdateFunc: func(e event.UpdateEvent) bool {
			if _, ok := e.MetaOld.GetLabels()["notebook-name"]; !ok {
				return false
			}
			return e.ObjectOld != e.ObjectNew
		},
		CreateFunc: func(e event.CreateEvent) bool {
			if _, ok := e.Meta.GetLabels()["notebook-name"]; !ok {
				return false
			}
			return true
		},
	}
	err = c.Watch(
		&source.Kind{Type: &corev1.Pod{}},
		&handler.EnqueueRequestsFromMapFunc{
			ToRequests: mapFn,
		},
		p)
	if err != nil {
		return err
	}

	return nil
}

var _ reconcile.Reconciler = &ReconcileNotebook{}

// ReconcileNotebook reconciles a Notebook object
type ReconcileNotebook struct {
	client.Client
	scheme *runtime.Scheme
}

// Reconcile reads that state of the cluster for a Notebook object and makes changes based on the state read
// and what is in the Notebook.Spec
// Automatically generate RBAC rules to allow the Controller to read and write StatefulSet
// +kubebuilder:rbac:groups=apps,resources=statefulsets,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=apps,resources=statefulsets/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=core,resources=services,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=core,resources=services/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=kubeflow.org,resources=notebooks,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=kubeflow.org,resources=notebooks/status,verbs=get;update;patch
func (r *ReconcileNotebook) Reconcile(request reconcile.Request) (reconcile.Result, error) {
	// Fetch the Notebook instance
	instance := &v1alpha1.Notebook{}
	err := r.Get(context.TODO(), request.NamespacedName, instance)
	if err != nil {
		if errors.IsNotFound(err) {
			// Object not found, return.  Created objects are automatically garbage collected.
			// For additional cleanup logic use finalizers.
			return reconcile.Result{}, nil
		}
		// Error reading the object - requeue the request.
		return reconcile.Result{}, err
	}

	// Reconcile StatefulSet
	ss := generateStatefulSet(instance)
	if err := controllerutil.SetControllerReference(instance, ss, r.scheme); err != nil {
		return reconcile.Result{}, err
	}
	// Check if the StatefulSet already exists
	foundStateful := &appsv1.StatefulSet{}
	justCreated := false
	err = r.Get(context.TODO(), types.NamespacedName{Name: ss.Name, Namespace: ss.Namespace}, foundStateful)
	if err != nil && errors.IsNotFound(err) {
		log.Info("Creating StatefulSet", "namespace", ss.Namespace, "name", ss.Name)
		err = r.Create(context.TODO(), ss)
		justCreated = true
		if err != nil {
			return reconcile.Result{}, err
		}
	} else if err != nil {
		return reconcile.Result{}, err
	}
	// Update the foundStateful object and write the result back if there are any changes
	if !justCreated && util.CopyStatefulSetFields(ss, foundStateful) {
		log.Info("Updating StatefulSet", "namespace", ss.Namespace, "name", ss.Name)
		err = r.Update(context.TODO(), foundStateful)
		if err != nil {
			return reconcile.Result{}, err
		}
	}

	// Reconcile service
	service := generateService(instance)
	if err := controllerutil.SetControllerReference(instance, service, r.scheme); err != nil {
		return reconcile.Result{}, err
	}
	// Check if the Service already exists
	foundService := &corev1.Service{}
	justCreated = false
	err = r.Get(context.TODO(), types.NamespacedName{Name: service.Name, Namespace: service.Namespace}, foundService)
	if err != nil && errors.IsNotFound(err) {
		log.Info("Creating Service", "namespace", service.Namespace, "name", service.Name)
		err = r.Create(context.TODO(), service)
		justCreated = true
		if err != nil {
			return reconcile.Result{}, err
		}
	} else if err != nil {
		return reconcile.Result{}, err
	}
	// Update the foundService object and write the result back if there are any changes
	if !justCreated && util.CopyServiceFields(service, foundService) {
		log.Info("Updating Service\n", "namespace", service.Namespace, "name", service.Name)
		err = r.Update(context.TODO(), foundService)
		if err != nil {
			return reconcile.Result{}, err
		}
	}

	// Update the status if previous condition is not "Ready"
	oldConditions := instance.Status.Conditions
	if len(oldConditions) == 0 || oldConditions[0].Type != "Ready" {
		newCondition := v1alpha1.NotebookCondition{
			Type: "Ready",
		}
		instance.Status.Conditions = append([]v1alpha1.NotebookCondition{newCondition}, oldConditions...)
		// Using context.Background as: https://book.kubebuilder.io/basics/status_subresource.html
		err = r.Status().Update(context.Background(), instance)
		if err != nil {
			return reconcile.Result{}, err
		}
	}
	// Update the readyReplicas if the status is changed
	if foundStateful.Status.ReadyReplicas != instance.Status.ReadyReplicas {
		log.Info("Updating Status", "namespace", instance.Namespace, "name", instance.Name)
		instance.Status.ReadyReplicas = foundStateful.Status.ReadyReplicas
		err = r.Status().Update(context.Background(), instance)
		if err != nil {
			return reconcile.Result{}, err
		}
	}

	// Check the pod status
	pod := &corev1.Pod{}
	err = r.Get(context.TODO(), types.NamespacedName{Name: ss.Name + "-0", Namespace: ss.Namespace}, pod)
	if err != nil && errors.IsNotFound(err) {
		// This should be reconcile by the StatefulSet
		log.Info("Pod not found...")
	} else if err != nil {
		return reconcile.Result{}, err
	} else {
		// Got the pod
		if len(pod.Status.ContainerStatuses) > 0 &&
			pod.Status.ContainerStatuses[0].State != instance.Status.ContainerState {
			log.Info("Updating container state: ", "namespace", instance.Namespace, "name", instance.Name)
			instance.Status.ContainerState = pod.Status.ContainerStatuses[0].State
			err = r.Status().Update(context.Background(), instance)
			if err != nil {
				return reconcile.Result{}, err
			}
		}
	}

	return reconcile.Result{}, nil
}

func generateStatefulSet(instance *v1alpha1.Notebook) *appsv1.StatefulSet {
	ss := &appsv1.StatefulSet{
		ObjectMeta: metav1.ObjectMeta{
			Name:      instance.Name,
			Namespace: instance.Namespace,
		},
		Spec: appsv1.StatefulSetSpec{
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
				Spec: instance.Spec.Template.Spec,
			},
		},
	}

	// Inject GCP credentials
	if labels := os.Getenv("POD_LABELS"); labels != "" {
		// labels should be comma separated labels, e.g. "k1=v1,k2=v2"
		l := &ss.Spec.Template.ObjectMeta.Labels
		labelList := strings.Split(labels, ",")
		for _, label := range labelList {
			// label is something like k1=v1
			s := strings.Split(label, "=")
			if len(s) != 2 {
				log.Info("Invalid env var POD_LABELS, skip..")
				continue
			}
			// s[0] = k1, s[1] = v1
			(*l)[s[0]] = s[1]
		}
	}

	podSpec := &ss.Spec.Template.Spec
	container := &podSpec.Containers[0]
	if container.WorkingDir == "" {
		container.WorkingDir = "/home/jovyan"
	}
	if container.Ports == nil {
		container.Ports = []corev1.ContainerPort{
			corev1.ContainerPort{
				ContainerPort: DefaultContainerPort,
				Name:          "notebook-port",
				Protocol:      "TCP",
			},
		}
	}
	container.Env = append(container.Env, corev1.EnvVar{
		Name:  "NB_PREFIX",
		Value: "/notebook/" + instance.Namespace + "/" + instance.Name,
	})
	if podSpec.SecurityContext == nil {
		fsGroup := DefaultFSGroup
		podSpec.SecurityContext = &corev1.PodSecurityContext{
			FSGroup: &fsGroup,
		}
	}
	return ss
}

func generateService(instance *v1alpha1.Notebook) *corev1.Service {
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
			Annotations: map[string]string{
				"getambassador.io/config": strings.Join(
					[]string{
						"---",
						"apiVersion: ambassador/v0",
						"kind:  Mapping",
						"name: notebook_" + instance.Namespace + "_" + instance.Name + "_mapping",
						"prefix: /notebook/" + instance.Namespace + "/" + instance.Name,
						"rewrite: /notebook/" + instance.Namespace + "/" + instance.Name,
						"timeout_ms: 300000",
						"service: " + instance.Name + "." + instance.Namespace,
						"use_websocket: true",
					}, "\n"),
			},
		},
		Spec: corev1.ServiceSpec{
			Type:     "ClusterIP",
			Selector: map[string]string{"statefulset": instance.Name},
			Ports: []corev1.ServicePort{
				corev1.ServicePort{
					Port:       80,
					TargetPort: intstr.FromInt(port),
					Protocol:   "TCP",
				},
			},
		},
	}
	return svc
}

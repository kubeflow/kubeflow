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
	"reflect"
	"strconv"
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
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/manager"
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
	if err = r.ReconcileStatefulSet(instance); err != nil {
		return reconcile.Result{}, err
	}
	if err = r.ReconcileService(instance); err != nil {
		return reconcile.Result{}, err
	}
	return reconcile.Result{}, nil
}

// ReconcileStatefulSet reconciles the StatefulSet object for the notebook.
func (r *ReconcileNotebook) ReconcileStatefulSet(instance *v1alpha1.Notebook) error {
	// Define the desired StatefulSet object
	ss := &appsv1.StatefulSet{
		ObjectMeta: metav1.ObjectMeta{
			Name:      instance.Name,
			Namespace: instance.Namespace,
		},
		Spec: appsv1.StatefulSetSpec{
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{"statefulset": instance.Name},
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{Labels: map[string]string{"statefulset": instance.Name}},
				Spec:       instance.Spec.Template.Spec,
			},
		},
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
	if podSpec.SecurityContext == nil {
		fsGroup := DefaultFSGroup
		podSpec.SecurityContext = &corev1.PodSecurityContext{
			FSGroup: &fsGroup,
		}
	}

	if err := controllerutil.SetControllerReference(instance, ss, r.scheme); err != nil {
		return err
	}

	// Check if the StatefulSet already exists
	found := &appsv1.StatefulSet{}
	err := r.Get(context.TODO(), types.NamespacedName{Name: ss.ObjectMeta.Name, Namespace: ss.ObjectMeta.Namespace}, found)
	if err != nil && errors.IsNotFound(err) {
		log.Info("Creating StatefulSet", "namespace", ss.ObjectMeta.Namespace, "name", ss.ObjectMeta.Name)
		err = r.Create(context.TODO(), ss)
		if err != nil {
			return err
		}
	} else if err != nil {
		return err
	}

	// Update the found object and write the result back if there are any changes
	if !reflect.DeepEqual(ss.Spec, found.Spec) {
		found.Spec = ss.Spec
		log.Info("Updating StatefulSet", "namespace", ss.Namespace, "name", ss.Name)
		err = r.Update(context.TODO(), found)
		if err != nil {
			return err
		}
	}
	return nil
}

// ReconcileService reconciles the Service object for the notebook.
func (r *ReconcileNotebook) ReconcileService(instance *v1alpha1.Notebook) error {
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
						"rewrite: /" + instance.Namespace + "/" + instance.Name,
						"timeout_ms: 300000",
						"service: " + instance.Name + "." + instance.Namespace + ":" + strconv.Itoa(port),
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
	if err := controllerutil.SetControllerReference(instance, svc, r.scheme); err != nil {
		return err
	}

	// Check if the Service already exists
	found := &corev1.Service{}
	err := r.Get(context.TODO(), types.NamespacedName{Name: svc.Name, Namespace: svc.Namespace}, found)
	if err != nil && errors.IsNotFound(err) {
		log.Info("Creating Service", "namespace", svc.Namespace, "name", svc.Name)
		err = r.Create(context.TODO(), svc)
		if err != nil {
			return err
		}
	} else if err != nil {
		return err
	}

	// Update the found object and write the result back if there are any changes
	if util.CopyServiceFields(svc, found) {
		log.Info("Updating Service", "namespace", svc.Namespace, "name", svc.Name)
		err = r.Update(context.TODO(), found)
		if err != nil {
			return err
		}
	}
	return nil
}

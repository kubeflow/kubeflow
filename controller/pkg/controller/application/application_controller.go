/*
Copyright 2018 kubeflow.

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

package application

import (
	"context"
	"fmt"
	appsv1alpha1 "github.com/kubeflow/kubeflow/controller/pkg/apis/apps/v1alpha1"
	sigsApp "github.com/kubernetes-sigs/application/pkg/apis/app/v1beta1"
	"github.com/spf13/afero"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"log"
	"reflect"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/manager"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"
)

// Add creates a new Application Controller and adds it to the Manager with default RBAC.
// The Manager will set fields on the Controller and Start it when the Manager is Started.
func Add(mgr manager.Manager) error {
	return add(mgr, newReconciler(mgr))
}

// newReconciler returns a new reconcile.Reconciler
func newReconciler(mgr manager.Manager) reconcile.Reconciler {
	return &ReconcileApplication{Client: mgr.GetClient(), scheme: mgr.GetScheme()}
}

// add adds a new Controller to mgr with r as the reconcile.Reconciler
func add(mgr manager.Manager, r reconcile.Reconciler) error {
	// Create a new controller
	c, err := controller.New("application-controller", mgr, controller.Options{Reconciler: r})
	if err != nil {
		return err
	}

	// Watch for changes to Application
	err = c.Watch(&source.Kind{Type: &appsv1alpha1.Application{}}, &handler.EnqueueRequestForObject{})
	if err != nil {
		return err
	}

	err = c.Watch(&source.Kind{Type: &sigsApp.Application{}}, &handler.EnqueueRequestForOwner{
		IsController: true,
		OwnerType:    &appsv1alpha1.Application{},
	})
	if err != nil {
		return err
	}

	return nil
}

type ksServer struct {
	// appsDir is the directory where apps should be stored.
	appsDir string
	// knownRegistries is a list of known registries
	// This can be used to map the name of a registry to info about the registry.
	// This allows apps to specify a registry by name without having to know any
	// other information about the regisry.
	knownRegistries map[string]appsv1alpha1.RegistryConfig

	//gkeVersionOverride allows overriding the GKE version specified in DM config. If not set the value in DM config is used.
	// https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.zones.clusters
	gkeVersionOverride string

	fs afero.Fs
}

func NewksServer(appsDir string, registries []appsv1alpha1.RegistryConfig, gkeVersionOverride string) (*ksServer, error) {
	if appsDir == "" {
		return nil, fmt.Errorf("appsDir can't be empty")
	}

	s := &ksServer{
		appsDir:            appsDir,
		knownRegistries:    make(map[string]appsv1alpha1.RegistryConfig),
		gkeVersionOverride: gkeVersionOverride,
		fs:                 afero.NewOsFs(),
	}

	for _, r := range registries {
		s.knownRegistries[r.Name] = r
		if r.RegUri == "" {
			return nil, fmt.Errorf("Known registry %v missing URI", r.Name)
		}
	}

	info, err := s.fs.Stat(appsDir)

	// TODO(jlewi): Should we create the directory if it doesn't exist?
	if err != nil {
		return nil, err
	}

	if !info.IsDir() {
		return nil, fmt.Errorf("appsDir %v is not a directory", appsDir)
	}

	return s, nil
}

var _ reconcile.Reconciler = &ReconcileApplication{}

// ReconcileApplication reconciles a Application object
type ReconcileApplication struct {
	client.Client
	scheme *runtime.Scheme
	server *ksServer
}

// Automatically generate RBAC rules to allow the Controller to read and write sigsApp.Applications
// +kubebuilder:rbac:groups=app.k8.io,resources=applications,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=apps.kubeflow.org,resources=applications,verbs=get;list;watch;create;update;patch;delete
func (r *ReconcileApplication) Reconcile(request reconcile.Request) (reconcile.Result, error) {
	// Fetch the Application instance
	instance := &appsv1alpha1.Application{}
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

	// Define a Application (applications.app.k8s.io/v1beta1) object
	sigsapp := &sigsApp.Application{
		ObjectMeta: metav1.ObjectMeta{
			Name:      instance.Name + "-application",
			Namespace: instance.Namespace,
		},
		Spec: sigsApp.ApplicationSpec{
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{"application": instance.Name + "-application"},
			},
			ComponentGroupKinds: []metav1.GroupKind{},
		},
	}
	if err := controllerutil.SetControllerReference(instance, sigsapp, r.scheme); err != nil {
		return reconcile.Result{}, err
	}

	// Check if the sigsApp.Application already exists
	found := &sigsApp.Application{}
	err = r.Get(context.TODO(), types.NamespacedName{Name: sigsapp.Name, Namespace: sigsapp.Namespace}, found)
	if err != nil && errors.IsNotFound(err) {
		log.Printf("Creating app.k8s.io/Application %s/%s\n", sigsapp.Namespace, sigsapp.Name)
		err = r.Create(context.TODO(), sigsapp)
		if err != nil {
			return reconcile.Result{}, err
		}
	} else if err != nil {
		return reconcile.Result{}, err
	}

	// Update the found object and write the result back if there are any changes
	if !reflect.DeepEqual(sigsapp.Spec, found.Spec) {
		found.Spec = sigsapp.Spec
		log.Printf("Updating sigsApp.Application %s/%s\n", sigsapp.Namespace, sigsapp.Name)
		err = r.Update(context.TODO(), found)
		if err != nil {
			return reconcile.Result{}, err
		}
	}
	return reconcile.Result{}, nil
}

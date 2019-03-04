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

package profile

import (
	"context"
	"reflect"

	kubeflowv1alpha1 "github.com/kubeflow/kubeflow/components/profile-controller/pkg/apis/kubeflow/v1alpha1"
	corev1 "k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
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

// Add creates a new Profile Controller and adds it to the Manager with default RBAC. The Manager will set fields on the Controller
// and Start it when the Manager is Started.
func Add(mgr manager.Manager) error {
	return add(mgr, newReconciler(mgr))
}

// newReconciler returns a new reconcile.Reconciler
func newReconciler(mgr manager.Manager) reconcile.Reconciler {
	return &ReconcileProfile{Client: mgr.GetClient(), scheme: mgr.GetScheme()}
}

// add adds a new Controller to mgr with r as the reconcile.Reconciler
func add(mgr manager.Manager, r reconcile.Reconciler) error {
	// Create a new controller
	c, err := controller.New("profile-controller", mgr, controller.Options{Reconciler: r})
	if err != nil {
		return err
	}

	// Watch for changes to Profile
	err = c.Watch(&source.Kind{Type: &kubeflowv1alpha1.Profile{}}, &handler.EnqueueRequestForObject{})
	if err != nil {
		return err
	}

	err = c.Watch(&source.Kind{Type: &corev1.Namespace{}}, &handler.EnqueueRequestForOwner{
		IsController: true,
		OwnerType:    &kubeflowv1alpha1.Profile{},
	})
	if err != nil {
		return err
	}
	err = c.Watch(&source.Kind{Type: &rbacv1.Role{}}, &handler.EnqueueRequestForOwner{
		IsController: true,
		OwnerType:    &kubeflowv1alpha1.Profile{},
	})
	if err != nil {
		return err
	}
	err = c.Watch(&source.Kind{Type: &rbacv1.RoleBinding{}}, &handler.EnqueueRequestForOwner{
		IsController: true,
		OwnerType:    &kubeflowv1alpha1.Profile{},
	})
	if err != nil {
		return err
	}

	return nil
}

var _ reconcile.Reconciler = &ReconcileProfile{}

// ReconcileProfile reconciles a Profile object
type ReconcileProfile struct {
	client.Client
	scheme *runtime.Scheme
}

// Reconcile reads that state of the cluster for a Profile object and makes changes based on the state read
// and what is in the Profile.Spec
// Automatically generate RBAC rules to allow the Controller to read and write Deployments
// +kubebuilder:rbac:groups=core,resources=namespaces,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=rbac,resources=roles,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=rbac,resources=rolebindings,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=kubeflow.org,resources=profiles,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=kubeflow.org,resources=profiles/status,verbs=get;update;patch
func (r *ReconcileProfile) Reconcile(request reconcile.Request) (reconcile.Result, error) {
	// Fetch the Profile instance
	instance := &kubeflowv1alpha1.Profile{}
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

	ns := &corev1.Namespace{
		ObjectMeta: metav1.ObjectMeta{
			Name: instance.Name,
		},
	}
	if err := controllerutil.SetControllerReference(instance, ns, r.scheme); err != nil {
		return reconcile.Result{}, err
	}
	foundNs := &corev1.Namespace{}
	err = r.Get(context.TODO(), types.NamespacedName{Name: ns.Name}, foundNs)
	if err != nil && errors.IsNotFound(err) {
		log.Info("Creating Namespace: " + ns.Name)
		err = r.Create(context.TODO(), ns)
		if err != nil {
			return reconcile.Result{}, err
		}
	} else if err != nil {
		return reconcile.Result{}, err
	}
	// No need to update namespace

	role := generateRole(instance)
	if err := controllerutil.SetControllerReference(instance, role, r.scheme); err != nil {
		return reconcile.Result{}, err
	}
	foundRole := &rbacv1.Role{}
	err = r.Get(context.TODO(), types.NamespacedName{Name: role.Name, Namespace: role.Namespace}, foundRole)
	if err != nil && errors.IsNotFound(err) {
		log.Info("Creating Role", "namespace", role.Namespace, "name", role.Name)
		err = r.Create(context.TODO(), role)
		if err != nil {
			return reconcile.Result{}, err
		}
	} else if err != nil {
		return reconcile.Result{}, err
	}
	if !reflect.DeepEqual(role.Rules, foundRole.Rules) {
		foundRole.Rules = role.Rules
		log.Info("Updating Role", "namespace", role.Namespace, "name", role.Name)
		err = r.Update(context.TODO(), foundRole)
		if err != nil {
			return reconcile.Result{}, err
		}
	}

	roleBinding := &rbacv1.RoleBinding{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "default",
			Namespace: instance.Name,
		},
		RoleRef: rbacv1.RoleRef{
			APIGroup: "rbac.authorization.k8s.io",
			Kind:     "Role",
			Name:     "edit",
		},
		Subjects: []rbacv1.Subject{
			instance.Spec.Owner,
		},
	}
	if err := controllerutil.SetControllerReference(instance, roleBinding, r.scheme); err != nil {
		return reconcile.Result{}, err
	}
	found := &rbacv1.RoleBinding{}
	err = r.Get(context.TODO(), types.NamespacedName{Name: roleBinding.Name, Namespace: roleBinding.Namespace}, found)
	if err != nil && errors.IsNotFound(err) {
		log.Info("Creating RoleBinding", "namespace", roleBinding.Namespace, "name", roleBinding.Name)
		err = r.Create(context.TODO(), roleBinding)
		if err != nil {
			return reconcile.Result{}, err
		}
	} else if err != nil {
		return reconcile.Result{}, err
	}
	if !(reflect.DeepEqual(roleBinding.RoleRef, found.RoleRef) && reflect.DeepEqual(roleBinding.Subjects, found.Subjects)) {
		found.RoleRef = roleBinding.RoleRef
		found.Subjects = roleBinding.Subjects
		log.Info("Updating RoleBinding", "namespace", roleBinding.Namespace, "name", roleBinding.Name)
		err = r.Update(context.TODO(), found)
		if err != nil {
			return reconcile.Result{}, err
		}
	}
	return reconcile.Result{}, nil
}

func generateRole(instance *kubeflowv1alpha1.Profile) *rbacv1.Role {
	role := &rbacv1.Role{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "edit",
			Namespace: instance.Name,
		},
		Rules: []rbacv1.PolicyRule{
			{
				APIGroups: []string{
					"metacontroller.k8s.io",
				},
				Resources: []string{
					"compositecontrollers",
					"decoratecontrollers",
				},
				Verbs: []string{
					"create",
					"delete",
					"get",
					"list",
					"patch",
					"update",
					"watch",
				},
			},
			{
				APIGroups: []string{
					"kubeflow.org",
				},
				Resources: []string{
					"notebooks",
				},
				Verbs: []string{
					"create",
					"delete",
					"get",
					"list",
					"patch",
					"update",
					"watch",
				},
			},
			{
				APIGroups: []string{
					"app.k8s.io",
				},
				Resources: []string{
					"applications",
					"apps",
				},
				Verbs: []string{
					"create",
					"delete",
					"get",
					"list",
					"patch",
					"update",
					"watch",
				},
			},
			{
				APIGroups: []string{
					"",
				},
				Resources: []string{
					"pods",
					"pods/attach",
					"pods/exec",
					"pods/portforward",
					"pods/proxy",
				},
				Verbs: []string{
					"create",
					"delete",
					"get",
					"list",
					"patch",
					"update",
					"watch",
				},
			},
			{
				APIGroups: []string{
					"",
				},
				Resources: []string{
					"configmaps",
					"endpoints",
					"persistentvolumeclaims",
					"replicationcontrollers",
					"replicationcontrollers/scale",
					"secrets",
					"serviceaccounts",
					"services",
					"services/proxy",
				},
				Verbs: []string{
					"create",
					"delete",
					"get",
					"list",
					"patch",
					"update",
					"watch",
				},
			},
			{
				APIGroups: []string{
					"",
				},
				Resources: []string{
					"bindings",
					"events",
					"limitranges",
					"pods/log",
					"pods/status",
					"replicationcontrollers/status",
					"resourcequotas",
					"resourcequotas/status",
				},
				Verbs: []string{
					"get",
					"list",
					"watch",
				},
			},
			{
				APIGroups: []string{
					"",
				},
				Resources: []string{
					"serviceaccounts",
				},
				Verbs: []string{
					"impersonate",
				},
			},
			{
				APIGroups: []string{
					"apps",
				},
				Resources: []string{
					"daemonsets",
					"deployments",
					"deployments/rollback",
					"deployments/scale",
					"replicasets",
					"replicasets/scale",
					"statefulsets",
				},
				Verbs: []string{
					"create",
					"delete",
					"get",
					"list",
					"patch",
					"update",
					"watch",
				},
			},
			{
				APIGroups: []string{
					"autoscaling",
				},
				Resources: []string{
					"horizontalpodautoscalers",
				},
				Verbs: []string{
					"create",
					"delete",
					"get",
					"list",
					"patch",
					"update",
					"watch",
				},
			},
			{
				APIGroups: []string{
					"batch",
				},
				Resources: []string{
					"cronjobs",
					"jobs",
				},
				Verbs: []string{
					"create",
					"delete",
					"get",
					"list",
					"patch",
					"update",
					"watch",
				},
			},
			{
				APIGroups: []string{
					"extensions",
				},
				Resources: []string{
					"daemonsets",
					"deployments",
					"deployments/rollback",
					"deployments/scale",
					"ingresses",
					"networkpolicies",
					"replicasets",
					"replicasets/scale",
					"replicationcontrollers/scale",
				},
				Verbs: []string{
					"create",
					"delete",
					"get",
					"list",
					"patch",
					"update",
					"watch",
				},
			},
			{
				APIGroups: []string{
					"policy",
				},
				Resources: []string{
					"poddistruptionbudgets",
				},
				Verbs: []string{
					"create",
					"delete",
					"get",
					"list",
					"patch",
					"update",
					"watch",
				},
			},
			{
				APIGroups: []string{
					"networking.k8s.io",
				},
				Resources: []string{
					"networkpolicies",
				},
				Verbs: []string{
					"create",
					"delete",
					"get",
					"list",
					"patch",
					"update",
					"watch",
				},
			},
		},
	}
	return role
}

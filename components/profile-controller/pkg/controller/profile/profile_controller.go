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
	"fmt"
	"reflect"

	istiorbac "github.com/kubeflow/kubeflow/components/profile-controller/pkg/apis/istiorbac/v1alpha1"
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

const USERIDHEADER = "userid-header"
const USERIDPREFIX = "userid-prefix"

const SERVICEROLEISTIO = "ns-access-istio"
const SERVICEROLEBINDINGISTIO = "owner-binding-istio"

// annotation key, consumed by kfam API
const USER = "user"
const ROLE = "role"
const ADMIN = "admin"

// Add creates a new Profile Controller and adds it to the Manager with default RBAC. The Manager will set fields on the Controller
// and Start it when the Manager is Started.
func Add(mgr manager.Manager, args map[string]string) error {
	if _, ok := args[USERIDHEADER]; !ok {
		return fmt.Errorf("%v not set!", USERIDHEADER)
	}
	if _, ok := args[USERIDPREFIX]; !ok {
		return fmt.Errorf("%v not set!", USERIDPREFIX)
	}
	return add(mgr, newReconciler(mgr, args[USERIDHEADER], args[USERIDPREFIX]))
}

// newReconciler returns a new reconcile.Reconciler
func newReconciler(mgr manager.Manager, userIdHeader string, userIdPrefix string) reconcile.Reconciler {
	return &ReconcileProfile{
		Client:       mgr.GetClient(),
		scheme:       mgr.GetScheme(),
		userIdHeader: userIdHeader,
		userIdPrefix: userIdPrefix,
	}
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

	err = c.Watch(&source.Kind{Type: &istiorbac.ServiceRole{}}, &handler.EnqueueRequestForOwner{
		IsController: true,
		OwnerType:    &kubeflowv1alpha1.Profile{},
	})
	if err != nil {
		return err
	}
	err = c.Watch(&source.Kind{Type: &istiorbac.ServiceRoleBinding{}}, &handler.EnqueueRequestForOwner{
		IsController: true,
		OwnerType:    &kubeflowv1alpha1.Profile{},
	})
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
	err = c.Watch(&source.Kind{Type: &corev1.ServiceAccount{}}, &handler.EnqueueRequestForOwner{
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
	scheme       *runtime.Scheme
	userIdHeader string
	userIdPrefix string
}

// Reconcile reads that state of the cluster for a Profile object and makes changes based on the state read
// and what is in the Profile.Spec
// Automatically generate RBAC rules to allow the Controller to read and write Deployments
// +kubebuilder:rbac:groups=core,resources=namespaces,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=core,resources=serviceaccount,verbs=get;list;watch;create;update;patch;delete
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

	// Update namespace
	ns := &corev1.Namespace{
		ObjectMeta: metav1.ObjectMeta{
			Annotations: map[string]string{"owner": instance.Spec.Owner.Name},
			// inject istio sidecar to all pods in target namespace by default.
			Labels: map[string]string{"istio-injection": "enabled"},
			Name:   instance.Name,
		},
	}
	if err := controllerutil.SetControllerReference(instance, ns, r.scheme); err != nil {
		return reconcile.Result{}, err
	}
	foundNs := &corev1.Namespace{}
	err = r.Get(context.TODO(), types.NamespacedName{Name: ns.Name}, foundNs)
	if err != nil {
		if errors.IsNotFound(err) {
			log.Info("Creating Namespace: " + ns.Name)
			err = r.Create(context.TODO(), ns)
			if err != nil {
				return reconcile.Result{}, err
			}
		} else {
			return reconcile.Result{}, err
		}
	} else {
		// Check exising namespace ownership before move forward
		val, ok := foundNs.Annotations["owner"]
		if (!ok) || val != instance.Spec.Owner.Name {
			log.Info(fmt.Sprintf("namespace already exist, but not owned by profile creator %v",
				instance.Spec.Owner.Name))
			instance.Status = kubeflowv1alpha1.ProfileStatus{
				Status: kubeflowv1alpha1.ProfileFailed,
				Message: fmt.Sprintf("namespace already exist, but not owned by profile creator %v",
					instance.Spec.Owner.Name),
			}
			if err := r.Update(context.TODO(), instance); err != nil {
				return reconcile.Result{}, err
			}
			return reconcile.Result{}, nil
		}
	}

	// Update Istio Rbac
	// Create Istio ServiceRole and ServiceRoleBinding in target namespace; which will give ns owner permission to access services in ns.
	if err = r.updateIstioRbac(instance); err != nil {
		log.Info("Failed Updating Istio rbac permission", "namespace", instance.Name, "error", err)
		return reconcile.Result{}, err
	}

	// Update service accounts
	// Create service account "default-editor" in target namespace.
	// "default-editor" would have k8s default "edit" permission: edit all resources in target namespace except rbac.
	if err = r.updateServiceAccount(instance, "default-editor", "edit"); err != nil {
		log.Info("Failed Updating ServiceAccount", "namespace", instance.Name, "name",
			"defaultEdittor", "error", err)
		return reconcile.Result{}, err
	}
	// Create service account "default-viewer" in target namespace.
	// "default-viewer" would have k8s default "view" permission: view all resources in target namespace.
	if err = r.updateServiceAccount(instance, "default-viewer", "view"); err != nil {
		log.Info("Failed Updating ServiceAccount", "namespace", instance.Name, "name",
			"defaultViewer", "error", err)
		return reconcile.Result{}, err
	}

	// TODO: add role for impersonate permission

	// Update owner rbac permission
	// When ClusterRole was referred by namespaced roleBinding, the result permission will be namespaced as well.
	roleBinding := &rbacv1.RoleBinding{
		ObjectMeta: metav1.ObjectMeta{
			Annotations: map[string]string{USER: instance.Spec.Owner.Name, ROLE: ADMIN},
			Name:      "namespaceAdmin",
			Namespace: instance.Name,
		},
		// Use default ClusterRole 'admin' for profile/namespace owner
		RoleRef: rbacv1.RoleRef{
			APIGroup: "rbac.authorization.k8s.io",
			Kind:     "ClusterRole",
			Name:     ADMIN,
		},
		Subjects: []rbacv1.Subject{
			instance.Spec.Owner,
		},
	}
	if err = r.updateRoleBinding(instance, roleBinding); err != nil {
		log.Info("Failed Updating Owner Rolebinding", "namespace", instance.Name, "name",
			"defaultEdittor", "error", err)
		return reconcile.Result{}, err
	}
	return reconcile.Result{}, nil
}

// updateIstioRbac create or update Istio rbac resources in target namespace owned by "profileIns". The goal is to allow service access for profile owner
func (r *ReconcileProfile) updateIstioRbac(profileIns *kubeflowv1alpha1.Profile) error {
	istioServiceRole := &istiorbac.ServiceRole{
		ObjectMeta: metav1.ObjectMeta{
			Annotations: map[string]string{USER: profileIns.Spec.Owner.Name, ROLE: ADMIN},
			Name:      SERVICEROLEISTIO,
			Namespace: profileIns.Name,
		},
		Spec: istiorbac.ServiceRoleSpec{
			Rules: []*istiorbac.AccessRule{
				{
					Services: []string{"*"},
				},
			},
		},
	}
	if err := controllerutil.SetControllerReference(profileIns, istioServiceRole, r.scheme); err != nil {
		return err
	}
	foundSr := &istiorbac.ServiceRole{}
	err := r.Get(context.TODO(), types.NamespacedName{Name: istioServiceRole.Name,
		Namespace: istioServiceRole.Namespace}, foundSr)
	if err != nil {
		if errors.IsNotFound(err) {
			log.Info("Creating Istio ServiceRole", "namespace", istioServiceRole.Namespace,
				"name", istioServiceRole.Name)
			err = r.Create(context.TODO(), istioServiceRole)
			if err != nil {
				return err
			}
		} else {
			return err
		}
	} else {
		if !reflect.DeepEqual(istioServiceRole.Spec, foundSr.Spec) {
			foundSr.Spec = istioServiceRole.Spec
			log.Info("Updating Istio ServiceRole", "namespace", istioServiceRole.Namespace,
				"name", istioServiceRole.Name)
			err = r.Update(context.TODO(), foundSr)
			if err != nil {
				return err
			}
		}
	}
	istioServiceRoleBinding := &istiorbac.ServiceRoleBinding{
		ObjectMeta: metav1.ObjectMeta{
			Annotations: map[string]string{USER: profileIns.Spec.Owner.Name, ROLE: ADMIN},
			Name:      SERVICEROLEBINDINGISTIO,
			Namespace: profileIns.Name,
		},
		Spec: istiorbac.ServiceRoleBindingSpec{
			Subjects: []*istiorbac.Subject{
				{
					Properties: map[string]string{fmt.Sprintf("request.headers[%v]", r.userIdHeader): r.userIdPrefix + profileIns.Spec.Owner.Name},
				},
			},
			RoleRef: &istiorbac.RoleRef{
				Kind: "ServiceRole",
				Name: SERVICEROLEISTIO,
			},
		},
	}
	if err := controllerutil.SetControllerReference(profileIns, istioServiceRoleBinding, r.scheme); err != nil {
		return err
	}
	foundSrb := &istiorbac.ServiceRoleBinding{}
	err = r.Get(context.TODO(), types.NamespacedName{Name: istioServiceRoleBinding.Name,
		Namespace: istioServiceRoleBinding.Namespace}, foundSrb)
	if err != nil {
		if errors.IsNotFound(err) {
			log.Info("Creating Istio ServiceRoleBinding", "namespace", istioServiceRoleBinding.Namespace,
				"name", istioServiceRoleBinding.Name)
			err = r.Create(context.TODO(), istioServiceRoleBinding)
			if err != nil {
				return err
			}
		} else {
			return err
		}
	} else {
		if !reflect.DeepEqual(istioServiceRoleBinding.Spec, foundSrb.Spec) {
			foundSrb.Spec = istioServiceRoleBinding.Spec
			log.Info("Updating Istio ServiceRoleBinding", "namespace", istioServiceRoleBinding.Namespace,
				"name", istioServiceRoleBinding.Name)
			err = r.Update(context.TODO(), foundSrb)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

// updateServiceAccount create or update service account "saName" with role "ClusterRoleName" in target namespace owned by "profileIns"
func (r *ReconcileProfile) updateServiceAccount(profileIns *kubeflowv1alpha1.Profile, saName string, ClusterRoleName string) error {
	serviceAccount := &corev1.ServiceAccount{
		ObjectMeta: metav1.ObjectMeta{
			Name:      saName,
			Namespace: profileIns.Name,
		},
	}
	if err := controllerutil.SetControllerReference(profileIns, serviceAccount, r.scheme); err != nil {
		return err
	}
	found := &corev1.ServiceAccount{}
	err := r.Get(context.TODO(), types.NamespacedName{Name: serviceAccount.Name, Namespace: serviceAccount.Namespace}, found)
	if err != nil {
		if errors.IsNotFound(err) {
			log.Info("Creating ServiceAccount", "namespace", serviceAccount.Namespace,
				"name", serviceAccount.Name)
			err = r.Create(context.TODO(), serviceAccount)
			if err != nil {
				return err
			}
		} else {
			return err
		}
	}
	roleBinding := &rbacv1.RoleBinding{
		ObjectMeta: metav1.ObjectMeta{
			Name:      saName,
			Namespace: profileIns.Name,
		},
		// Use default ClusterRole 'admin' for profile/namespace owner
		RoleRef: rbacv1.RoleRef{
			APIGroup: "rbac.authorization.k8s.io",
			Kind:     "ClusterRole",
			Name:     ClusterRoleName,
		},
		Subjects: []rbacv1.Subject{
			{
				Kind:      rbacv1.ServiceAccountKind,
				Name:      saName,
				Namespace: profileIns.Name,
			},
		},
	}
	return r.updateRoleBinding(profileIns, roleBinding)
}

// updateRoleBinding create or update roleBinding "roleBinding" in target namespace owned by "profileIns"
func (r *ReconcileProfile) updateRoleBinding(profileIns *kubeflowv1alpha1.Profile,
	roleBinding *rbacv1.RoleBinding) error {
	if err := controllerutil.SetControllerReference(profileIns, roleBinding, r.scheme); err != nil {
		return err
	}
	found := &rbacv1.RoleBinding{}
	err := r.Get(context.TODO(), types.NamespacedName{Name: roleBinding.Name, Namespace: roleBinding.Namespace}, found)
	if err != nil {
		if errors.IsNotFound(err) {
			log.Info("Creating RoleBinding", "namespace", roleBinding.Namespace, "name", roleBinding.Name)
			err = r.Create(context.TODO(), roleBinding)
			if err != nil {
				return err
			}
		} else {
			return err
		}
	} else {
		if !(reflect.DeepEqual(roleBinding.RoleRef, found.RoleRef) && reflect.DeepEqual(roleBinding.Subjects, found.Subjects)) {
			found.RoleRef = roleBinding.RoleRef
			found.Subjects = roleBinding.Subjects
			log.Info("Updating RoleBinding", "namespace", roleBinding.Namespace, "name", roleBinding.Name)
			err = r.Update(context.TODO(), found)
			if err != nil {
				return err
			}
		}
	}
	return nil
}

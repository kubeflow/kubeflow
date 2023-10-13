/*
Copyright 2022.

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
	"io/ioutil"
	"os"
	"reflect"
	"time"

	"github.com/cenkalti/backoff"
	"github.com/go-logr/logr"
	profilev1 "github.com/kubeflow/kubeflow/components/profile-controller/api/v1"
	"github.com/pkg/errors"
	"gopkg.in/fsnotify.v1"
	"gopkg.in/yaml.v2"
	istioSecurity "istio.io/api/security/v1beta1"
	istioSecurityClient "istio.io/client-go/pkg/apis/security/v1beta1"
	corev1 "k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
	"sigs.k8s.io/controller-runtime/pkg/event"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"
)

const AUTHZPOLICYISTIO = "ns-owner-access-istio"

// Istio constants
const ISTIOALLOWALL = "allow-all"

const KFQUOTA = "kf-resource-quota"
const PROFILEFINALIZER = "profile-finalizer"

// annotation key, consumed by kfam API
const USER = "user"
const ROLE = "role"
const ADMIN = "admin"

// Kubeflow default role names
// TODO: Make kubeflow roles configurable (krishnadurai)
// This will enable customization of roles.
const (
	kubeflowAdmin       = "kubeflow-admin"
	kubeflowEdit        = "kubeflow-edit"
	kubeflowView        = "kubeflow-view"
	istioInjectionLabel = "istio-injection"
)

const DEFAULT_EDITOR = "default-editor"
const DEFAULT_VIEWER = "default-viewer"

type Plugin interface {
	// Called when profile CR is created / updated
	ApplyPlugin(*ProfileReconciler, *profilev1.Profile) error
	// Called when profile CR is being deleted, to cleanup any non-k8s resources created via ApplyPlugin
	// RevokePlugin logic need to be IDEMPOTENT
	RevokePlugin(*ProfileReconciler, *profilev1.Profile) error
}

// ProfileReconciler reconciles a Profile object
type ProfileReconciler struct {
	client.Client
	Scheme                     *runtime.Scheme
	Log                        logr.Logger
	UserIdHeader               string
	UserIdPrefix               string
	WorkloadIdentity           string
	DefaultNamespaceLabelsPath string
}

// +kubebuilder:rbac:groups=core,resources=namespaces,verbs="*"
// +kubebuilder:rbac:groups=core,resources=serviceaccounts,verbs="*"
// +kubebuilder:rbac:groups=rbac.authorization.k8s.io,resources=rolebindings,verbs="*"
// +kubebuilder:rbac:groups=security.istio.io,resources=authorizationpolicies,verbs="*"
// +kubebuilder:rbac:groups=kubeflow.org,resources=profiles;profiles/status;profiles/finalizers,verbs="*"

// Reconcile reads that state of the cluster for a Profile object and makes changes based on the state read
// and what is in the Profile.Spec
// Automatically generate RBAC rules to allow the Controller to read and write Deployments
func (r *ProfileReconciler) Reconcile(ctx context.Context, request ctrl.Request) (ctrl.Result, error) {
	logger := r.Log.WithValues("profile", request.NamespacedName)
	defaultKubeflowNamespaceLabels := r.readDefaultLabelsFromFile(r.DefaultNamespaceLabelsPath)

	// Fetch the Profile instance
	instance := &profilev1.Profile{}
	logger.Info("Start to Reconcile.", "namespace", request.Namespace, "name", request.Name)
	err := r.Get(ctx, request.NamespacedName, instance)
	if err != nil {
		if apierrors.IsNotFound(err) {
			// Object not found, return.  Created objects are automatically garbage collected.
			// For additional cleanup logic use finalizers.
			IncRequestCounter("profile deletion")
			return reconcile.Result{}, nil
		}
		// Error reading the object - requeue the request.
		IncRequestErrorCounter("error reading the profile object", SEVERITY_MAJOR)
		logger.Error(err, "error reading the profile object")
		return reconcile.Result{}, err
	}

	// Update namespace
	ns := &corev1.Namespace{
		ObjectMeta: metav1.ObjectMeta{
			Annotations: map[string]string{"owner": instance.Spec.Owner.Name},
			// inject istio sidecar to all pods in target namespace by default.
			Labels: map[string]string{
				istioInjectionLabel: "enabled",
			},
			Name: instance.Name,
		},
	}
	setNamespaceLabels(ns, defaultKubeflowNamespaceLabels)
	logger.Info("List of labels to be added to namespace", "labels", ns.Labels)
	if err := controllerutil.SetControllerReference(instance, ns, r.Scheme); err != nil {
		IncRequestErrorCounter("error setting ControllerReference", SEVERITY_MAJOR)
		logger.Error(err, "error setting ControllerReference")
		return reconcile.Result{}, err
	}
	foundNs := &corev1.Namespace{}
	err = r.Get(ctx, types.NamespacedName{Name: ns.Name}, foundNs)
	if err != nil {
		if apierrors.IsNotFound(err) {
			logger.Info("Creating Namespace: " + ns.Name)
			err = r.Create(ctx, ns)
			if err != nil {
				IncRequestErrorCounter("error creating namespace", SEVERITY_MAJOR)
				logger.Error(err, "error creating namespace")
				return reconcile.Result{}, err
			}
			// wait 15 seconds for new namespace creation.
			err = backoff.Retry(
				func() error {
					return r.Get(ctx, types.NamespacedName{Name: ns.Name}, foundNs)
				},
				backoff.WithMaxRetries(backoff.NewConstantBackOff(3*time.Second), 5))
			if err != nil {
				IncRequestErrorCounter("error namespace create completion", SEVERITY_MAJOR)
				logger.Error(err, "error namespace create completion")
				return r.appendErrorConditionAndReturn(ctx, instance,
					"Owning namespace failed to create within 15 seconds")
			}
			logger.Info("Created Namespace: "+foundNs.Name, "status", foundNs.Status.Phase)
		} else {
			IncRequestErrorCounter("error reading namespace", SEVERITY_MAJOR)
			logger.Error(err, "error reading namespace")
			return reconcile.Result{}, err
		}
	} else {
		// Check exising namespace ownership before move forward
		owner, ok := foundNs.Annotations["owner"]
		if ok && owner == instance.Spec.Owner.Name {
			oldLabels := map[string]string{}
			for k, v := range foundNs.Labels {
				oldLabels[k] = v
			}
			setNamespaceLabels(foundNs, defaultKubeflowNamespaceLabels)
			logger.Info("List of labels to be added to found namespace", "labels", ns.Labels)
			if !reflect.DeepEqual(oldLabels, foundNs.Labels) {
				err = r.Update(ctx, foundNs)
				if err != nil {
					IncRequestErrorCounter("error updating namespace label", SEVERITY_MAJOR)
					logger.Error(err, "error updating namespace label")
					return reconcile.Result{}, err
				}
			}
		} else {
			logger.Info(fmt.Sprintf("namespace already exist, but not owned by profile creator %v",
				instance.Spec.Owner.Name))
			IncRequestCounter("reject profile taking over existing namespace")
			return r.appendErrorConditionAndReturn(ctx, instance, fmt.Sprintf(
				"namespace already exist, but not owned by profile creator %v", instance.Spec.Owner.Name))
		}
	}

	// Update Istio AuthorizationPolicy
	// Create Istio AuthorizationPolicy in target namespace, which will give ns owner permission to access services in ns.
	if err = r.updateIstioAuthorizationPolicy(instance); err != nil {
		logger.Error(err, "error Updating Istio AuthorizationPolicy permission", "namespace", instance.Name)
		IncRequestErrorCounter("error updating Istio AuthorizationPolicy permission", SEVERITY_MAJOR)
		return reconcile.Result{}, err
	}

	// Update service accounts
	// Create service account "default-editor" in target namespace.
	// "default-editor" would have kubeflowEdit permission: edit all resources in target namespace except rbac.
	if err = r.updateServiceAccount(instance, DEFAULT_EDITOR, kubeflowEdit); err != nil {
		logger.Error(err, "error Updating ServiceAccount", "namespace", instance.Name, "name",
			"defaultEditor")
		IncRequestErrorCounter("error updating ServiceAccount", SEVERITY_MAJOR)
		return reconcile.Result{}, err
	}
	// Create service account "default-viewer" in target namespace.
	// "default-viewer" would have k8s default "view" permission: view all resources in target namespace.
	if err = r.updateServiceAccount(instance, DEFAULT_VIEWER, kubeflowView); err != nil {
		logger.Error(err, "error Updating ServiceAccount", "namespace", instance.Name, "name",
			"defaultViewer")
		IncRequestErrorCounter("error updating ServiceAccount", SEVERITY_MAJOR)
		return reconcile.Result{}, err
	}

	// TODO: add role for impersonate permission

	// Update owner rbac permission
	// When ClusterRole was referred by namespaced roleBinding, the result permission will be namespaced as well.
	roleBinding := &rbacv1.RoleBinding{
		ObjectMeta: metav1.ObjectMeta{
			Annotations: map[string]string{USER: instance.Spec.Owner.Name, ROLE: ADMIN},
			Name:        "namespaceAdmin",
			Namespace:   instance.Name,
		},
		// Use default ClusterRole 'admin' for profile/namespace owner
		RoleRef: rbacv1.RoleRef{
			APIGroup: "rbac.authorization.k8s.io",
			Kind:     "ClusterRole",
			Name:     kubeflowAdmin,
		},
		Subjects: []rbacv1.Subject{
			instance.Spec.Owner,
		},
	}
	if err = r.updateRoleBinding(instance, roleBinding); err != nil {
		logger.Error(err, "error Updating Owner Rolebinding", "namespace", instance.Name, "name",
			"defaultEdittor")
		IncRequestErrorCounter("error updating Owner Rolebinding", SEVERITY_MAJOR)
		return reconcile.Result{}, err
	}
	// Create resource quota for target namespace if resources are specified in profile.
	if len(instance.Spec.ResourceQuotaSpec.Hard) > 0 {
		resourceQuota := &corev1.ResourceQuota{
			ObjectMeta: metav1.ObjectMeta{
				Name:      KFQUOTA,
				Namespace: instance.Name,
			},
			Spec: instance.Spec.ResourceQuotaSpec,
		}
		if err = r.updateResourceQuota(instance, resourceQuota); err != nil {
			logger.Error(err, "error Updating resource quota", "namespace", instance.Name)
			IncRequestErrorCounter("error updating resource quota", SEVERITY_MAJOR)
			return reconcile.Result{}, err
		}
	} else {
		found := &corev1.ResourceQuota{}
		err := r.Get(ctx, types.NamespacedName{Name: KFQUOTA, Namespace: instance.Name}, found)
		if err == nil {
			if err := r.Delete(ctx, found); err != nil {
				logger.Error(err, "error deleting resource quota", "namespace", instance.Name)
				return ctrl.Result{}, err
			}
		} else if !apierrors.IsNotFound(err) {
			logger.Error(err, "error getting resource quota", "namespace", instance.Name)
			return ctrl.Result{}, err
		} else {
			logger.Info("No update on resource quota", "spec", instance.Spec.ResourceQuotaSpec.String())
		}
	}
	if err := r.PatchDefaultPluginSpec(ctx, instance); err != nil {
		IncRequestErrorCounter("error patching DefaultPluginSpec", SEVERITY_MAJOR)
		logger.Error(err, "Failed patching DefaultPluginSpec", "namespace", instance.Name)
		return reconcile.Result{}, err
	}
	if plugins, err := r.GetPluginSpec(instance); err == nil {
		for _, plugin := range plugins {
			if err2 := plugin.ApplyPlugin(r, instance); err2 != nil {
				logger.Error(err2, "Failed applying plugin", "namespace", instance.Name)
				IncRequestErrorCounter("error applying plugin", SEVERITY_MAJOR)
				return reconcile.Result{}, err2
			}
		}
	}

	// examine DeletionTimestamp to determine if object is under deletion
	if instance.ObjectMeta.DeletionTimestamp.IsZero() {
		// The object is not being deleted, so if it does not have our finalizer,
		// then lets add the finalizer and update the object. This is equivalent
		// registering our finalizer.
		if !containsString(instance.ObjectMeta.Finalizers, PROFILEFINALIZER) {
			instance.ObjectMeta.Finalizers = append(instance.ObjectMeta.Finalizers, PROFILEFINALIZER)
			if err := r.Update(ctx, instance); err != nil {
				logger.Error(err, "error updating finalizer", "namespace", instance.Name)
				IncRequestErrorCounter("error updating finalizer", SEVERITY_MAJOR)
				return ctrl.Result{}, err
			}
		}
	} else {
		// The object is being deleted
		if containsString(instance.ObjectMeta.Finalizers, PROFILEFINALIZER) {
			// our finalizer is present, so lets revoke all Plugins to clean up any external dependencies
			if plugins, err := r.GetPluginSpec(instance); err == nil {
				for _, plugin := range plugins {
					if err := plugin.RevokePlugin(r, instance); err != nil {
						logger.Error(err, "error revoking plugin", "namespace", instance.Name)
						IncRequestErrorCounter("error revoking plugin", SEVERITY_MAJOR)
						return reconcile.Result{}, err
					}
				}
			}

			// remove our finalizer from the list and update it.
			instance.ObjectMeta.Finalizers = removeString(instance.ObjectMeta.Finalizers, PROFILEFINALIZER)
			if err := r.Update(ctx, instance); err != nil {
				logger.Error(err, "error removing finalizer", "namespace", instance.Name)
				IncRequestErrorCounter("error removing finalizer", SEVERITY_MAJOR)
				return ctrl.Result{}, err
			}
		}
	}
	IncRequestCounter("reconcile")
	return ctrl.Result{}, nil
}

// appendErrorConditionAndReturn append failure status to profile CR and mark Reconcile done. If update condition failed, request will be requeued.
func (r *ProfileReconciler) appendErrorConditionAndReturn(ctx context.Context, instance *profilev1.Profile,
	message string) (ctrl.Result, error) {
	instance.Status.Conditions = append(instance.Status.Conditions, profilev1.ProfileCondition{
		Type:    profilev1.ProfileFailed,
		Message: message,
	})
	if err := r.Update(ctx, instance); err != nil {
		return reconcile.Result{}, err
	}
	return reconcile.Result{}, nil
}

// mapEventToRequest maps an event to reconcile requests for all Profiles
func (r *ProfileReconciler) mapEventToRequest(o client.Object) []reconcile.Request {
	req := []reconcile.Request{}
	profileList := &profilev1.ProfileList{}
	err := r.Client.List(context.TODO(), profileList)
	if err != nil {
		r.Log.Error(err, "Failed to list profiles in order to trigger reconciliation")
		return req
	}
	for _, p := range profileList.Items {
		req = append(req, reconcile.Request{
			NamespacedName: types.NamespacedName{
				Name:      p.Name,
				Namespace: p.Namespace,
			}})
	}
	return req
}

func (r *ProfileReconciler) SetupWithManager(mgr ctrl.Manager) error {
	// Watch config file with namespace labels. If the file changes, trigger
	// a reconciliation for all Profiles.
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		return errors.Wrap(err, "Failed to start file watcher")
	}
	if err := watcher.Add(r.DefaultNamespaceLabelsPath); err != nil {
		return errors.Wrapf(err, "Failed to watch file %s", r.DefaultNamespaceLabelsPath)
	}
	events := make(chan event.GenericEvent)
	go func(watcher *fsnotify.Watcher, reconcileEvents chan event.GenericEvent) {
		defer watcher.Close()
		for {
			select {
			case fsEvent := <-watcher.Events:
				if fsEvent.Op != fsnotify.Remove && fsEvent.Op != fsnotify.Write {
					break
				}
				// ConfigMaps work with symlinks. See:
				// https://martensson.io/go-fsnotify-and-kubernetes-configmaps/
				if fsEvent.Op == fsnotify.Remove {
					watcher.Remove(fsEvent.Name)
					watcher.Add(r.DefaultNamespaceLabelsPath)
				}
				reconcileEvents <- event.GenericEvent{}
			case err := <-watcher.Errors:
				r.Log.Error(err, "Error while watching config file", "path",
					r.DefaultNamespaceLabelsPath)
			}
		}
	}(watcher, events)

	c := ctrl.NewControllerManagedBy(mgr).
		For(&profilev1.Profile{}).
		Owns(&corev1.Namespace{}).
		Owns(&istioSecurityClient.AuthorizationPolicy{}).
		Owns(&corev1.ServiceAccount{}).
		Owns(&rbacv1.RoleBinding{}).
		Watches(
			&source.Channel{Source: events},
			handler.EnqueueRequestsFromMapFunc(r.mapEventToRequest),
		)

	err = c.Complete(r)
	if err != nil {
		return err
	}
	return nil
}

func (r *ProfileReconciler) getAuthorizationPolicy(profileIns *profilev1.Profile) istioSecurity.AuthorizationPolicy {
	nbControllerPrincipal := GetEnvDefault(
		"NOTEBOOK_CONTROLLER_PRINCIPAL",
		"cluster.local/ns/kubeflow/sa/notebook-controller-service-account")

	istioIGWPrincipal := GetEnvDefault(
		"ISTIO_INGRESS_GATEWAY_PRINCIPAL",
		"cluster.local/ns/istio-system/sa/istio-ingressgateway-service-account")

	kfpUIPrincipal := GetEnvDefault(
		"KFP_UI_PRINCIPAL",
		"cluster.local/ns/kubeflow/sa/ml-pipeline-ui")

	return istioSecurity.AuthorizationPolicy{
		Action: istioSecurity.AuthorizationPolicy_ALLOW,
		// Empty selector == match all workloads in namespace
		Selector: nil,
		Rules: []*istioSecurity.Rule{
			{
				When: []*istioSecurity.Condition{
					{
						// Namespace Owner can access all workloads in the
						// namespace
						Key: fmt.Sprintf("request.headers[%v]", r.UserIdHeader),
						Values: []string{
							r.UserIdPrefix + profileIns.Spec.Owner.Name,
						},
					},
				},
				From: []*istioSecurity.Rule_From{{
					Source: &istioSecurity.Source{
						Principals: []string{
							istioIGWPrincipal,
							kfpUIPrincipal,
						},
					},
				}},
			},
			{
				When: []*istioSecurity.Condition{
					{
						// Workloads in the same namespace can access all other
						// workloads in the namespace
						Key:    fmt.Sprintf("source.namespace"),
						Values: []string{profileIns.Name},
					},
				},
			},
			{
				To: []*istioSecurity.Rule_To{
					{
						Operation: &istioSecurity.Operation{
							// Workloads pathes should be accessible for KNative's
							// `activator` and `controller` probes
							// See: https://knative.dev/docs/serving/istio-authorization/#allowing-access-from-system-pods-by-paths
							Paths: []string{
								"/healthz",
								"/metrics",
								"/wait-for-drain",
							},
						},
					},
				},
			},
			{
				// allow the notebook-controller in the kubeflow namespace to
				// access the api/kernels endpoint of the notebook servers.
				From: []*istioSecurity.Rule_From{
					{
						Source: &istioSecurity.Source{
							Principals: []string{nbControllerPrincipal},
						},
					},
				},
				To: []*istioSecurity.Rule_To{
					{
						Operation: &istioSecurity.Operation{
							Methods: []string{"GET"},
							Paths:   []string{"*/api/kernels"}, // wildcard for the name of the notebook server
						},
					},
				},
			},
		},
	}
}

// updateIstioAuthorizationPolicy create or update Istio AuthorizationPolicy
// resources in target namespace owned by "profileIns". The goal is to allow
// service access for profile owner.
func (r *ProfileReconciler) updateIstioAuthorizationPolicy(profileIns *profilev1.Profile) error {
	logger := r.Log.WithValues("profile", profileIns.Name)

	istioAuth := &istioSecurityClient.AuthorizationPolicy{
		ObjectMeta: metav1.ObjectMeta{
			Annotations: map[string]string{USER: profileIns.Spec.Owner.Name, ROLE: ADMIN},
			Name:        AUTHZPOLICYISTIO,
			Namespace:   profileIns.Name,
		},
		Spec: r.getAuthorizationPolicy(profileIns),
	}

	if err := controllerutil.SetControllerReference(profileIns, istioAuth, r.Scheme); err != nil {
		return err
	}
	foundAuthorizationPolicy := &istioSecurityClient.AuthorizationPolicy{}
	err := r.Get(
		context.TODO(),
		types.NamespacedName{
			Name:      istioAuth.ObjectMeta.Name,
			Namespace: istioAuth.ObjectMeta.Namespace,
		},
		foundAuthorizationPolicy,
	)
	if err != nil {
		if apierrors.IsNotFound(err) {
			logger.Info("Creating Istio AuthorizationPolicy", "namespace", istioAuth.ObjectMeta.Namespace,
				"name", istioAuth.ObjectMeta.Name)
			err = r.Create(context.TODO(), istioAuth)
			if err != nil {
				return err
			}
		} else {
			return err
		}
	} else {
		if !reflect.DeepEqual(*istioAuth.Spec.DeepCopy(), *foundAuthorizationPolicy.Spec.DeepCopy()) {
			foundAuthorizationPolicy.Spec = *istioAuth.Spec.DeepCopy()
			logger.Info("Updating Istio AuthorizationPolicy", "namespace", istioAuth.ObjectMeta.Namespace,
				"name", istioAuth.ObjectMeta.Name)
			err = r.Update(context.TODO(), foundAuthorizationPolicy)
			if err != nil {
				return err
			}
		}
	}
	return nil
}

// updateResourceQuota create or update ResourceQuota for target namespace
func (r *ProfileReconciler) updateResourceQuota(profileIns *profilev1.Profile,
	resourceQuota *corev1.ResourceQuota) error {
	ctx := context.Background()
	logger := r.Log.WithValues("profile", profileIns.Name)
	if err := controllerutil.SetControllerReference(profileIns, resourceQuota, r.Scheme); err != nil {
		return err
	}
	found := &corev1.ResourceQuota{}
	err := r.Get(ctx, types.NamespacedName{Name: resourceQuota.Name, Namespace: resourceQuota.Namespace}, found)
	if err != nil {
		if apierrors.IsNotFound(err) {
			logger.Info("Creating ResourceQuota", "namespace", resourceQuota.Namespace, "name", resourceQuota.Name)
			err = r.Create(ctx, resourceQuota)
			if err != nil {
				return err
			}
		} else {
			return err
		}
	} else {
		if !(reflect.DeepEqual(resourceQuota.Spec, found.Spec)) {
			found.Spec = resourceQuota.Spec
			logger.Info("Updating ResourceQuota", "namespace", resourceQuota.Namespace, "name", resourceQuota.Name)
			err = r.Update(ctx, found)
			if err != nil {
				return err
			}
		}
	}
	return nil
}

// updateServiceAccount create or update service account "saName" with role "ClusterRoleName" in target namespace owned by "profileIns"
func (r *ProfileReconciler) updateServiceAccount(profileIns *profilev1.Profile, saName string,
	ClusterRoleName string) error {
	logger := r.Log.WithValues("profile", profileIns.Name)
	serviceAccount := &corev1.ServiceAccount{
		ObjectMeta: metav1.ObjectMeta{
			Name:      saName,
			Namespace: profileIns.Name,
		},
	}
	if err := controllerutil.SetControllerReference(profileIns, serviceAccount, r.Scheme); err != nil {
		return err
	}
	found := &corev1.ServiceAccount{}
	err := r.Get(context.TODO(), types.NamespacedName{Name: serviceAccount.Name, Namespace: serviceAccount.Namespace}, found)
	if err != nil {
		if apierrors.IsNotFound(err) {
			logger.Info("Creating ServiceAccount", "namespace", serviceAccount.Namespace,
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
func (r *ProfileReconciler) updateRoleBinding(profileIns *profilev1.Profile,
	roleBinding *rbacv1.RoleBinding) error {
	logger := r.Log.WithValues("profile", profileIns.Name)
	if err := controllerutil.SetControllerReference(profileIns, roleBinding, r.Scheme); err != nil {
		return err
	}
	found := &rbacv1.RoleBinding{}
	err := r.Get(context.TODO(), types.NamespacedName{Name: roleBinding.Name, Namespace: roleBinding.Namespace}, found)
	if err != nil {
		if apierrors.IsNotFound(err) {
			logger.Info("Creating RoleBinding", "namespace", roleBinding.Namespace, "name", roleBinding.Name)
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
			logger.Info("Updating RoleBinding", "namespace", roleBinding.Namespace, "name", roleBinding.Name)
			err = r.Update(context.TODO(), found)
			if err != nil {
				return err
			}
		}
	}
	return nil
}

// GetPluginSpec will try to unmarshal the plugin spec inside profile for the specified plugin
// Returns an error if the plugin isn't defined or if there is a problem
func (r *ProfileReconciler) GetPluginSpec(profileIns *profilev1.Profile) ([]Plugin, error) {
	logger := r.Log.WithValues("profile", profileIns.Name)
	plugins := []Plugin{}
	for _, p := range profileIns.Spec.Plugins {
		var pluginIns Plugin
		switch p.Kind {
		case KIND_WORKLOAD_IDENTITY:
			pluginIns = &GcpWorkloadIdentity{}
		case KIND_AWS_IAM_FOR_SERVICE_ACCOUNT:
			pluginIns = &AwsIAMForServiceAccount{}
		default:
			logger.Info("Plugin not recgonized: ", "Kind", p.Kind)
			continue
		}

		// To deserialize it to a specific type we need to first serialize it to bytes
		// and then unserialize it.
		specBytes, err := json.Marshal(p.Spec)

		if err != nil {
			logger.Info("Could not marshal plugin ", p.Kind, "; error: ", err)
			return nil, err
		}

		err = json.Unmarshal(specBytes, pluginIns)
		if err != nil {
			logger.Info("Could not unmarshal plugin ", p.Kind, "; error: ", err)
			return nil, err
		}
		plugins = append(plugins, pluginIns)
	}
	return plugins, nil
}

// PatchDefaultPluginSpec patch default plugins to profile CR instance if user doesn't specify plugin of same kind in CR.
func (r *ProfileReconciler) PatchDefaultPluginSpec(ctx context.Context, profileIns *profilev1.Profile) error {
	// read existing plugins into map
	plugins := make(map[string]profilev1.Plugin)
	for _, p := range profileIns.Spec.Plugins {
		plugins[p.Kind] = p
	}
	// Patch default plugins if same kind doesn't exist yet.
	if r.WorkloadIdentity != "" {
		if _, ok := plugins[KIND_WORKLOAD_IDENTITY]; !ok {
			profileIns.Spec.Plugins = append(profileIns.Spec.Plugins, profilev1.Plugin{
				TypeMeta: metav1.TypeMeta{
					Kind: KIND_WORKLOAD_IDENTITY,
				},
				Spec: &runtime.RawExtension{
					Raw: []byte(fmt.Sprintf(`{"gcpServiceAccount": "%v"}`, r.WorkloadIdentity)),
				},
			})
		}
	}
	if err := r.Update(ctx, profileIns); err != nil {
		return err
	}
	return nil
}

func containsString(slice []string, s string) bool {
	for _, item := range slice {
		if item == s {
			return true
		}
	}
	return false
}

func removeString(slice []string, s string) (result []string) {
	for _, item := range slice {
		if item == s {
			continue
		}
		result = append(result, item)
	}
	return
}

func setNamespaceLabels(ns *corev1.Namespace, newLabels map[string]string) {
	if ns.Labels == nil {
		ns.Labels = make(map[string]string)
	}

	for k, v := range newLabels {
		_, ok := ns.Labels[k]
		if len(v) == 0 {
			// When there is an empty value, k should be removed.
			if ok {
				delete(ns.Labels, k)
			}
		} else {
			if !ok {
				// Add label if not exist, otherwise skipping update.
				ns.Labels[k] = v
			}
		}
	}
}

func (r *ProfileReconciler) readDefaultLabelsFromFile(path string) map[string]string {
	logger := r.Log.WithName("read-config-file").WithValues("path", path)
	dat, err := ioutil.ReadFile(path)
	if err != nil {
		logger.Error(err, "namespace labels properties file doesn't exist")
		os.Exit(1)
	}

	labels := map[string]string{}
	err = yaml.Unmarshal(dat, &labels)
	if err != nil {
		logger.Error(err, "Unable to parse default namespace labels.")
		os.Exit(1)
	}
	return labels
}

func GetEnvDefault(variable string, defaultVal string) string {
	envVar := os.Getenv(variable)
	if len(envVar) == 0 {
		return defaultVal
	}
	return envVar
}

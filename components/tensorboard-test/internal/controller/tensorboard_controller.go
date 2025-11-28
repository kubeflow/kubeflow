/*
Copyright 2025.

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

package controller

import (
	"context"
	"fmt"
	"os"
	"reflect"

	"github.com/go-logr/logr"
	"github.com/gogo/protobuf/proto"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	apierrs "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/util/intstr"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"

	reconcilehelper "github.com/kubeflow/kubeflow/components/common/reconcilehelper"
	tensorboardtestv1alpha1 "tensorboards.test/api/v1alpha1"
)

// TensorboardReconciler reconciles a Tensorboard object
type TensorboardReconciler struct {
	client.Client
	Log logr.Logger
}

// +kubebuilder:rbac:groups=tensorboard.test.tensorboards.test,resources=tensorboards,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=tensorboard.test.tensorboards.test,resources=tensorboards/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=tensorboard.test.tensorboards.test,resources=tensorboards/finalizers,verbs=update
// +kubebuilder:rbac:groups=apps,resources=deployments,verbs=get;list;watch;create;update
// +kubebuilder:rbac:groups=core,resources=services,verbs=get;list;watch;create;update
// +kubebuilder:rbac:groups=networking.istio.io,resources=virtualservices,verbs=get;list;watch;create;update
// +kubebuilder:rbac:groups=core,resources=persistentvolumeclaims,verbs=get;list;watch
// +kubebuilder:rbac:groups=core,resources=pods,verbs=get;list;watch

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the Tensorboard object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.22.4/pkg/reconcile
func (r *TensorboardReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := r.Log.WithValues("tensorboard", req.NamespacedName)

	instance := &tensorboardtestv1alpha1.Tensorboard{}
	err := r.Get(ctx, req.NamespacedName, instance)
	if err != nil {
		if errors.IsNotFound(err) {
			// Object not found, return.  Created objects are automatically garbage collected.
			// For additional cleanup logic use finalizers.
			return reconcile.Result{}, nil
		}
		// Error reading the object - requeue the request.
		return reconcile.Result{}, err
	}

	// tensorboards-web-app deletes objects using foreground deletion policy, Tensorboard CR will stay until all owned objects are deleted
	// reconcile loop might keep on trying to recreate the resources that the API server tries to delete.
	// so when Tensorboard CR is terminating, reconcile loop should do nothing

	if !instance.DeletionTimestamp.IsZero() {
		return ctrl.Result{}, nil
	}

	// Reconcile k8s deployment.
	deployment, err := generateDeployment(instance, logger, r)
	if err != nil {
		return ctrl.Result{}, err
	}
	if err := ctrl.SetControllerReference(instance, deployment, r.Scheme()); err != nil {
		return ctrl.Result{}, err
	}
	if err := Deployment(ctx, r, deployment, logger); err != nil {
		return ctrl.Result{}, err
	}

	// Reconcile k8s service.
	service := generateService(instance)
	if err := ctrl.SetControllerReference(instance, service, r.Scheme()); err != nil {
		return ctrl.Result{}, err
	}
	if err := reconcilehelper.Service(ctx, r, service, logger); err != nil {
		return ctrl.Result{}, err
	}

	// Reconcile istio virtual service.
	virtualService, err := generateVirtualService(instance)
	if err := ctrl.SetControllerReference(instance, virtualService, r.Scheme()); err != nil {
		return ctrl.Result{}, err
	}
	if err := reconcilehelper.VirtualService(ctx, r, virtualService.GetName(), virtualService.GetNamespace(), virtualService, logger); err != nil {
		return ctrl.Result{}, err
	}

	foundDeployment := &appsv1.Deployment{}
	//Update the instance.Status.ReadyReplicas if the foundDeployment.Status.ReadyReplicas
	//has changed.
	_err := r.Get(ctx, types.NamespacedName{Name: deployment.Name, Namespace: deployment.Namespace}, foundDeployment)

	if _err != nil {
		if apierrs.IsNotFound(err) {
			logger.Info("Deployment not found...", "deployment", deployment.Name)
		} else {
			return ctrl.Result{}, _err
		}
	} else {
		if len(foundDeployment.Status.Conditions) > 0 {
			condition := tensorboardtestv1alpha1.TensorboardCondition{
				DeploymentState: foundDeployment.Status.Conditions[0].Type,
				LastProbeTime:   foundDeployment.Status.Conditions[0].LastUpdateTime,
			}
			clen := len(instance.Status.Conditions)
			if clen == 0 || instance.Status.Conditions[clen-1].DeploymentState != condition.DeploymentState {
				instance.Status.Conditions = append(instance.Status.Conditions, condition)
			}
			logger.Info("instance condition..", "condition", instance)
		}

		if foundDeployment.Status.ReadyReplicas != instance.Status.ReadyReplicas {
			logger.Info("Updating Status", "namespace", instance.Namespace, "name", instance.Name)
			instance.Status.ReadyReplicas = foundDeployment.Status.ReadyReplicas
		}

		_err = r.Status().Update(ctx, instance)
		if _err != nil {
			return ctrl.Result{}, _err
		}
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *TensorboardReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&tensorboardtestv1alpha1.Tensorboard{}).
		Owns(&appsv1.Deployment{}).
		Complete(r)
}

func generateDeployment(tb *tensorboardtestv1alpha1.Tensorboard, log logr.Logger, r *TensorboardReconciler) (*appsv1.Deployment, error) {
	var volumeMounts []corev1.VolumeMount
	var volumes []corev1.Volume
	var affinity = &corev1.Affinity{}
	tensorboardImage := tb.Spec.Image
	volumeName := fmt.Sprintf("vol-vo-%s", tb.Name)
	// host path volume
	hostPathType := corev1.HostPathDirectoryOrCreate
	volume := corev1.Volume{
		Name: volumeName,
		VolumeSource: corev1.VolumeSource{
			HostPath: &corev1.HostPathVolumeSource{
				Path: tb.Spec.HostPath,
				Type: &hostPathType,
			},
		},
	}
	volumes = append(volumes, volume)

	// volumeMount
	volumeMount := corev1.VolumeMount{
		Name:      volumeName,
		MountPath: tb.Spec.MountPath,
		ReadOnly:  true,
	}
	volumeMounts = append(volumeMounts, volumeMount)
	// copy all of the CR labels to the pod which includes poddefault related labels
	podLabels := map[string]string{}
	for k, v := range tb.ObjectMeta.Labels {
		(podLabels)[k] = v
	}
	(podLabels)["app"] = tb.Name

	return &appsv1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name:      tb.Name,
			Namespace: tb.Namespace,
		},
		Spec: appsv1.DeploymentSpec{
			Replicas: proto.Int32(1),
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{
					"app": tb.Name,
				},
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: podLabels,
				},
				Spec: corev1.PodSpec{
					Affinity:      affinity,
					RestartPolicy: corev1.RestartPolicyAlways,
					NodeSelector:  tb.Spec.NodeSelector,
					Tolerations:   tb.Spec.Tolerations,
					Containers: []corev1.Container{
						{
							Name:            "tensorboard",
							Image:           tensorboardImage,
							ImagePullPolicy: "IfNotPresent",
							Command:         []string{"/usr/local/bin/tensorboard"},
							WorkingDir:      "/",
							Args: []string{
								"--logdir=" + tb.Spec.MountPath,
								"--bind_all",
							},
							Ports: []corev1.ContainerPort{
								{
									ContainerPort: 6006,
								},
							},
							VolumeMounts: volumeMounts,
						},
					},
					Volumes: volumes,
				},
			},
		},
	}, nil
}

func generateService(tb *tensorboardtestv1alpha1.Tensorboard) *corev1.Service {
	return &corev1.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name:      tb.Name,
			Namespace: tb.Namespace,
		},
		Spec: corev1.ServiceSpec{
			Type:     "ClusterIP",
			Selector: map[string]string{"app": tb.Name},
			Ports: []corev1.ServicePort{
				corev1.ServicePort{
					Name:       "http-" + tb.Name,
					Port:       80,
					TargetPort: intstr.FromInt(6006),
				},
			},
		},
	}
}

func generateVirtualService(tb *tensorboardtestv1alpha1.Tensorboard) (*unstructured.Unstructured, error) {
	prefix := fmt.Sprintf("/tensorboard/%s/%s/", tb.Namespace, tb.Name)
	rewrite := "/"
	service := fmt.Sprintf("%s.%s.svc.cluster.local", tb.Name, tb.Namespace)
	istioGateway, err := getEnvVariable("ISTIO_GATEWAY")
	if err != nil {
		return nil, err
	}

	istioHost, err := getEnvVariable("ISTIO_HOST")
	if err != nil {
		return nil, err
	}

	vsvc := &unstructured.Unstructured{}
	vsvc.SetAPIVersion("networking.istio.io/v1alpha3")
	vsvc.SetKind("VirtualService")
	vsvc.SetName(tb.Name)
	vsvc.SetNamespace(tb.Namespace)
	if err := unstructured.SetNestedStringSlice(vsvc.Object, []string{istioHost}, "spec", "hosts"); err != nil {
		return nil, fmt.Errorf("Set .spec.hosts error: %v", err)
	}
	if err := unstructured.SetNestedStringSlice(vsvc.Object, []string{istioGateway},
		"spec", "gateways"); err != nil {
		return nil, fmt.Errorf("Set .spec.gateways error: %v", err)
	}

	http := []interface{}{
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
							"number": int64(80),
						},
					},
				},
			},
			"timeout": "300s",
		},
	}
	if err := unstructured.SetNestedSlice(vsvc.Object, http, "spec", "http"); err != nil {
		return nil, fmt.Errorf("Set .spec.http error: %v", err)
	}

	return vsvc, nil
}

// Searches a corev1.PodList for running pods and returns
// a running corev1.Pod (if exists)
func findRunningPod(pods *corev1.PodList) corev1.Pod {
	for _, pod := range pods.Items {
		if pod.Status.Phase == "Running" {
			return pod
		}
	}

	return corev1.Pod{}
}

func extractNodeName(pod corev1.Pod) string {
	return pod.Spec.NodeName
}

func Deployment(ctx context.Context, r client.Client, deployment *appsv1.Deployment, log logr.Logger) error {
	foundDeployment := &appsv1.Deployment{}
	justCreated := false
	if err := r.Get(ctx, types.NamespacedName{Name: deployment.Name, Namespace: deployment.Namespace}, foundDeployment); err != nil {
		if apierrs.IsNotFound(err) {
			log.Info("Creating Deployment", "namespace", deployment.Namespace, "name", deployment.Name)
			if err := r.Create(ctx, deployment); err != nil {
				log.Error(err, "unable to create deployment")
				return err
			}
			justCreated = true
		} else {
			log.Error(err, "error getting deployment")
			return err
		}
	}
	if !justCreated && CopyDeploymentSetFields(deployment, foundDeployment) {
		log.Info("Updating Deployment", "namespace", deployment.Namespace, "name", deployment.Name)
		if err := r.Update(ctx, foundDeployment); err != nil {
			log.Error(err, "unable to update deployment")
			return err
		}
	}

	return nil
}

func CopyDeploymentSetFields(from, to *appsv1.Deployment) bool {
	requireUpdate := false
	for k, v := range to.Labels {
		if from.Labels[k] != v {
			requireUpdate = true
		}
	}
	to.Labels = from.Labels

	if *from.Spec.Replicas != *to.Spec.Replicas {
		to.Spec.Replicas = from.Spec.Replicas
		requireUpdate = true
	}

	if !reflect.DeepEqual(to.Spec.Template.Spec.Affinity, from.Spec.Template.Spec.Affinity) {
		requireUpdate = true
	}
	to.Spec.Template.Spec.Affinity = from.Spec.Template.Spec.Affinity

	return requireUpdate
}

func getEnvVariable(envVar string) (string, error) {
	if lookupEnv, exists := os.LookupEnv(envVar); exists {
		return lookupEnv, nil
	} else {
		return "", fmt.Errorf("environment variable %v is not set", envVar)
	}
}

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
	"fmt"
	"strings"

	"github.com/go-logr/logr"
	"github.com/gogo/protobuf/proto"
	"github.com/golang/gddo/log"
	appsv1 "k8s.io/api/apps/v1"
	"k8s.io/api/core/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/util/intstr"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"

	reconcilehelper "github.com/kubeflow/kubeflow/components/common/reconcilehelper"
	tensorboardv1alpha1 "github.com/kubeflow/kubeflow/components/tensorboard-controller/api/v1alpha1"
)

// TensorboardReconciler reconciles a Tensorboard object
type TensorboardReconciler struct {
	client.Client
	Log    logr.Logger
	Scheme *runtime.Scheme
}

// Reconcile reads that state of the cluster for a Tensorboard object and makes changes based on the state read
// and what is in the Tensorboard.Spec
// +kubebuilder:rbac:groups=tensorboard.kubeflow.org,resources=tensorboards,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=tensorboard.kubeflow.org,resources=tensorboards/status,verbs=get;update;patch
func (r *TensorboardReconciler) Reconcile(req ctrl.Request) (ctrl.Result, error) {
	ctx := context.Background()
	logger := r.Log.WithValues("tensorboard", req.NamespacedName)

	// your logic here
	instance := &tensorboardv1alpha1.Tensorboard{}
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

	// Reconcile k8s deployment.
	deployment := generateDeployment(instance, logger)
	if err := ctrl.SetControllerReference(instance, deployment, r.Scheme); err != nil {
		return ctrl.Result{}, err
	}
	if err := reconcilehelper.Deployment(ctx, r, deployment, logger); err != nil {
		return ctrl.Result{}, err
	}

	// Reconcile k8s service.
	service := generateService(instance)
	if err := ctrl.SetControllerReference(instance, service, r.Scheme); err != nil {
		return ctrl.Result{}, err
	}
	if err := reconcilehelper.Service(ctx, r, service, logger); err != nil {
		return ctrl.Result{}, err
	}

	// Reconcile istio virtual service.
	virtualService, err := generateVirtualService(instance)
	if err := ctrl.SetControllerReference(instance, virtualService, r.Scheme); err != nil {
		return ctrl.Result{}, err
	}
	if err := reconcilehelper.VirtualService(ctx, r, virtualService.GetName(), virtualService.GetNamespace(), virtualService, logger); err != nil {
		return ctrl.Result{}, err
	}

	foundDeployment := &appsv1.Deployment{}
	justCreated := false
	if err := r.Get(ctx, types.NamespacedName{Name: deployment.Name, Namespace: deployment.Namespace}, deployment); err != nil {
		if apierrs.IsNotFound(err) {
			log.Info("Deployment not found", "namespace", deployment.Namespace, "name", deployment.Name)
		} else {
			log.Error(err, "error getting deployment")
			return ctrl.Result{}, err
		}
	}

	return reconcile.Result{}, nil
}

func (r *TensorboardReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&tensorboardv1alpha1.Tensorboard{}).
		Complete(r)
}

func generateDeployment(tb *tensorboardv1alpha1.Tensorboard, log logr.Logger) *appsv1.Deployment {
	volumeMounts := []v1.VolumeMount{
		{
			Name:      "gcp-creds",
			ReadOnly:  true,
			MountPath: "/secret/gcp",
		},
	}
	volumes := []v1.Volume{
		{
			Name: "gcp-creds",
			VolumeSource: v1.VolumeSource{
				Secret: &v1.SecretVolumeSource{
					SecretName: "user-gcp-sa",
				},
			},
		},
	}
	// pvc is required for training metrics if logspath is a local directly(rather than cloudpath)
	if !isCloudPath(tb.Spec.LogsPath) {
		volumeMounts = append(volumeMounts,
			v1.VolumeMount{
				Name:      "tbpd",
				ReadOnly:  true,
				MountPath: tb.Spec.LogsPath,
			})
		volumes = append(volumes,
			v1.Volume{
				Name: "tbpd",
				VolumeSource: v1.VolumeSource{
					PersistentVolumeClaim: &v1.PersistentVolumeClaimVolumeSource{
						ClaimName: "tb-volume",
					},
				},
			})
	}

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
			Template: v1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{"app": tb.Name},
				},
				Spec: v1.PodSpec{
					RestartPolicy: v1.RestartPolicyAlways,
					Containers: []v1.Container{
						{
							Name:            "tensorboard",
							Image:           "tensorflow/tensorflow:1.8.0",
							ImagePullPolicy: "IfNotPresent",
							Command:         []string{"/usr/local/bin/tensorboard"},
							Args: []string{
								"--logdir=" + tb.Spec.LogsPath, //example: "--logdir=gs://tf_mnist_writebycode1/mnist_tutorial/",
								"--port=6006",
							},
							Ports: []v1.ContainerPort{
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
	}
}

func generateService(tb *tensorboardv1alpha1.Tensorboard) *corev1.Service {
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
					Port:       9000,
					TargetPort: intstr.FromInt(6006),
				},
			},
		},
	}
}

func generateVirtualService(tb *tensorboardv1alpha1.Tensorboard) (*unstructured.Unstructured, error) {
	prefix := "/tensorboard/" + tb.Name
	service := fmt.Sprintf("%s.%s.svc.cluster.local", tb.Name, tb.Namespace)

	vsvc := &unstructured.Unstructured{}
	vsvc.SetAPIVersion("networking.istio.io/v1alpha3")
	vsvc.SetKind("VirtualService")
	vsvc.SetName(tb.Name)
	vsvc.SetNamespace(tb.Namespace)
	if err := unstructured.SetNestedStringSlice(vsvc.Object, []string{"*"}, "spec", "hosts"); err != nil {
		return nil, fmt.Errorf("Set .spec.hosts error: %v", err)
	}
	if err := unstructured.SetNestedStringSlice(vsvc.Object, []string{"kubeflow/kubeflow-gateway"},
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
				"uri": "/",
			},
			"route": []interface{}{
				map[string]interface{}{
					"destination": map[string]interface{}{
						"host": service,
						"port": map[string]interface{}{
							"number": int64(9000),
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

func isCloudPath(path string) bool {
	return strings.HasPrefix(path, "gs://") || strings.HasPrefix(path, "s3://") || strings.HasPrefix(path, "/cns/")
}

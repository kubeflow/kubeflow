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

package v1alpha1

import (
	"fmt"
	"reflect"

	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	logf "sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/webhook"

	corev1 "k8s.io/api/core/v1"
)

// log is for logging in this package.
var pvcviewerlog = logf.Log.WithName("pvcviewer-resource")

func (r *PVCViewer) SetupWebhookWithManager(mgr ctrl.Manager) error {
	return ctrl.NewWebhookManagedBy(mgr).
		For(r).
		Complete()
}

//+kubebuilder:webhook:path=/mutate-kubeflow-org-v1alpha1-pvcviewer,mutating=true,failurePolicy=fail,sideEffects=None,groups=kubeflow.org,resources=pvcviewers,verbs=create;update,versions=v1alpha1,name=mpvcviewer.kb.io,admissionReviewVersions=v1

var _ webhook.Defaulter = &PVCViewer{}

// Default implements webhook.Defaulter so a webhook will be registered for the type
func (r *PVCViewer) Default() {
	pvcviewerlog.Info("default", "name", r.Name)

	if reflect.DeepEqual(r.Spec.PodSpec, corev1.PodSpec{}) {
		pvcviewerlog.Info("Inferring default podSpec", "name", r.Name)

		r.Spec.PodSpec.Volumes = []corev1.Volume{
			{
				Name: "viewer-volume",
				VolumeSource: corev1.VolumeSource{
					PersistentVolumeClaim: &corev1.PersistentVolumeClaimVolumeSource{
						ClaimName: r.Spec.PVC,
					},
				},
			},
		}
		r.Spec.PodSpec.Containers = []corev1.Container{
			{
				Name:  "pvcviewer",
				Image: "filebrowser/filebrowser:latest",
				Ports: []corev1.ContainerPort{
					{
						ContainerPort: 8080,
						Protocol:      corev1.ProtocolTCP,
					},
				},
				Env: []corev1.EnvVar{
					{
						Name:  "FB_ADDRESS",
						Value: "0.0.0.0",
					},
					{
						Name:  "FB_PORT",
						Value: "8080",
					},
					{
						Name:  "FB_DATABASE",
						Value: "/tmp/filebrowser.db",
					},
					{
						Name:  "FB_NOAUTH",
						Value: "true",
					},
					{
						Name:  "FB_BASEURL",
						Value: fmt.Sprintf("%s/%s/%s/", r.Spec.Networking.VirtualService.BasePrefix, r.Namespace, r.Name),
					},
				},
				WorkingDir: "/data",
				VolumeMounts: []corev1.VolumeMount{
					{
						Name:      "viewer-volume",
						MountPath: "/data",
					},
				},
			},
		}
	}
}

//+kubebuilder:webhook:path=/validate-kubeflow-org-v1alpha1-pvcviewer,mutating=false,failurePolicy=fail,sideEffects=None,groups=kubeflow.org,resources=pvcviewers,verbs=create;update,versions=v1alpha1,name=vpvcviewer.kb.io,admissionReviewVersions=v1

var _ webhook.Validator = &PVCViewer{}

func (r *PVCViewer) validate() error {
	if len(r.Spec.PVC) == 0 {
		return fmt.Errorf("PVC name must be specified")
	}

	return nil
}

// ValidateCreate implements webhook.Validator so a webhook will be registered for the type
func (r *PVCViewer) ValidateCreate() error {
	pvcviewerlog.Info("validate create", "name", r.Name)

	return r.validate()
}

// ValidateUpdate implements webhook.Validator so a webhook will be registered for the type
func (r *PVCViewer) ValidateUpdate(old runtime.Object) error {
	pvcviewerlog.Info("validate update", "name", r.Name)

	return r.validate()
}

// ValidateDelete implements webhook.Validator so a webhook will be registered for the type
func (r *PVCViewer) ValidateDelete() error {
	pvcviewerlog.Info("validate delete", "name", r.Name)

	// We have not registered our webhook to validate delete operations.
	return nil
}

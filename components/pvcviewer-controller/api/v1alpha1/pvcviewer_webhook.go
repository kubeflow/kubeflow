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
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
	"reflect"

	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	logf "sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/webhook"
	"sigs.k8s.io/controller-runtime/pkg/webhook/admission"

	"k8s.io/apimachinery/pkg/util/yaml"

	corev1 "k8s.io/api/core/v1"
)

const DefaultPodSpecPathEnvName = "DEFAULT_POD_SPEC_PATH"

// log is for logging in this package.
var pvcviewerlog = logf.Log.WithName("pvcviewer-resource")

func (r *PVCViewer) SetupWebhookWithManager(mgr ctrl.Manager) error {
	return ctrl.NewWebhookManagedBy(mgr).
		For(r).
		Complete()
}

//+kubebuilder:webhook:path=/mutate-kubeflow-org-v1alpha1-pvcviewer,mutating=true,failurePolicy=fail,sideEffects=None,groups=kubeflow.org,resources=pvcviewers,verbs=create;update,versions=v1alpha1,name=mpvcviewer.kb.io,admissionReviewVersions=v1

var _ webhook.Defaulter = &PVCViewer{}

// Loads a PodSpec from a filename
func loadPodSpecDefaultsFromFile(filename string) (corev1.PodSpec, error) {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		pvcviewerlog.Error(err, "Failed to read podSpec defaults from file "+filename)
		return corev1.PodSpec{}, err
	}

	var podSpec corev1.PodSpec
	if err := yaml.NewYAMLOrJSONDecoder(bytes.NewReader(data), 100).Decode(&podSpec); err != nil {
		pvcviewerlog.Error(err, "Failed to unmarshal podSpec defaults file "+filename)
		return corev1.PodSpec{}, err
	}

	return podSpec, nil
}

// Default implements webhook.Defaulter so a webhook will be registered for the type
func (r *PVCViewer) Default() {
	pvcviewerlog.Info("default", "name", r.Name)

	if reflect.DeepEqual(r.Spec.PodSpec, corev1.PodSpec{}) {
		pvcviewerlog.Info("Inferring default podSpec", "name", r.Name)

		// Load default podSpec from file if environment variable is set
		var defaultPodSpec corev1.PodSpec
		if defaultPodSpecPath := os.Getenv(DefaultPodSpecPathEnvName); defaultPodSpecPath != "" {
			var err error
			defaultPodSpec, err = loadPodSpecDefaultsFromFile(defaultPodSpecPath)
			if err != nil {
				// We can't throw an error here, so we return
				// This lets the validating webhook catch the error
				return
			}
		}
		// Check if a default podSpec was loaded from file
		// If so, set it as the default, otherwise set a predefined default
		if !reflect.DeepEqual(defaultPodSpec, corev1.PodSpec{}) {
			r.Spec.PodSpec = defaultPodSpec
		} else {
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
							Value: fmt.Sprintf("%s/%s/%s/", r.Spec.Networking.BasePrefix, r.Namespace, r.Name),
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

		// Always set the pod.spec.volume referred to by viewer.spec.pvc
		// This way, the default file can be used without having to know the pvc name in advance
		// Make sure to only append the volume so additional volumes may be defined
		r.Spec.PodSpec.Volumes = append(r.Spec.PodSpec.Volumes, corev1.Volume{
			Name: "viewer-volume",
			VolumeSource: corev1.VolumeSource{
				PersistentVolumeClaim: &corev1.PersistentVolumeClaimVolumeSource{
					ClaimName: r.Spec.PVC,
				},
			},
		})
	}
}

//+kubebuilder:webhook:path=/validate-kubeflow-org-v1alpha1-pvcviewer,mutating=false,failurePolicy=fail,sideEffects=None,groups=kubeflow.org,resources=pvcviewers,verbs=create;update,versions=v1alpha1,name=vpvcviewer.kb.io,admissionReviewVersions=v1

var _ webhook.Validator = &PVCViewer{}

func (r *PVCViewer) validate() error {
	if len(r.Spec.PVC) == 0 {
		return fmt.Errorf("PVC name must be specified")
	}

	// Should be set by defaulting webhook
	// However, it it throws an error, this needs to be caught here
	if reflect.DeepEqual(r.Spec.PodSpec, corev1.PodSpec{}) {
		return fmt.Errorf("PodSpec must be specified")
	}

	// Require the viewer.spec.PVC to be used in the podSpec.volumes
	found := false
	for _, volume := range r.Spec.PodSpec.Volumes {
		if volume.PersistentVolumeClaim != nil && volume.PersistentVolumeClaim.ClaimName == r.Spec.PVC {
			found = true
			break
		}
	}
	if !found {
		return fmt.Errorf("PVC %s must be used in the podSpec", r.Spec.PVC)
	}

	return nil
}

// ValidateCreate implements webhook.Validator so a webhook will be registered for the type
func (r *PVCViewer) ValidateCreate() (admission.Warnings, error) {
	pvcviewerlog.Info("validate create", "name", r.Name)

	return nil, r.validate()
}

// ValidateUpdate implements webhook.Validator so a webhook will be registered for the type
func (r *PVCViewer) ValidateUpdate(old runtime.Object) (admission.Warnings, error) {
	pvcviewerlog.Info("validate update", "name", r.Name)

	return nil, r.validate()
}

// ValidateDelete implements webhook.Validator so a webhook will be registered for the type
func (r *PVCViewer) ValidateDelete() (admission.Warnings, error) {
	pvcviewerlog.Info("validate delete", "name", r.Name)

	// We have not registered our webhook to validate delete operations.
	return nil, nil
}

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

package v1alpha1

import (
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!
// NOTE: json tags are required.  Any new fields you add must have json tags for the fields to be serialized.

// PodDefaultSpec defines the desired state of PodDefault
type PodDefaultSpec struct {
	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	// Selector is a label query over a set of resources, in this case pods.
	// Required.
	Selector metav1.LabelSelector `json:"selector"`

	// Human readable description of poddefault
	// todo: not sure if Spec is the right place for this (move to meta..)
	// Can be used by UI to show users avaialble options for poddefaults.
	// +optional
	Desc string `json:"desc,omitempty"`

	// Env defines the collection of EnvVar to inject into containers.
	// +optional
	Env []v1.EnvVar `json:"env,omitempty"`

	// EnvFrom defines the collection of EnvFromSource to inject into containers.
	// +optional
	EnvFrom []v1.EnvFromSource `json:"envFrom,omitempty"`

	// Volumes defines the collection of Volume to inject into the pod.
	// +optional
	Volumes []v1.Volume `json:"volumes,omitempty"`

	// VolumeMounts defines the collection of VolumeMount to inject into containers.
	// +optional
	VolumeMounts []v1.VolumeMount `json:"volumeMounts,omitempty"`
}

// PodDefaultStatus defines the observed state of PodDefault
type PodDefaultStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file
}

// +genclient
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// PodDefault is the Schema for the poddefaults API
// +k8s:openapi-gen=true
// +kubebuilder:resource:path=poddefaults
// +kubebuilder:rbac:groups=apps,resources=deployments,verbs=get;watch;list;update
// +kubebuilder:rbac:groups=,resources=events,verbs=create;patch;update
// +kubebuilder:informers:group=apps,version=v1,kind=Deployment
type PodDefault struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   PodDefaultSpec   `json:"spec,omitempty"`
	Status PodDefaultStatus `json:"status,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// PodDefaultList contains a list of PodDefault
type PodDefaultList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []PodDefault `json:"items"`
}

func init() {
	SchemeBuilder.Register(&PodDefault{}, &PodDefaultList{})
}

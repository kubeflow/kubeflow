/*
Copyright 2019 The Kubernetes Authors.

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
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!
// NOTE: json tags are required.  Any new fields you add must have json tags for the fields to be serialized.

// ServiceRoleBindingSpec defines the desired state of ServiceRoleBinding
type ServiceRoleBindingSpec struct {
	// Required. List of subjects that are assigned the ServiceRole object.
	Subjects []*Subject `protobuf:"bytes,1,rep,name=subjects,proto3" json:"subjects,omitempty"`
	// Required. Reference to the ServiceRole object.
	RoleRef *RoleRef `protobuf:"bytes,2,opt,name=roleRef,proto3" json:"roleRef,omitempty"`
}

// Subject defines an identity. The identity is either a user or identified by a set of `properties`.
// The supported keys in `properties` are listed in "constraint and properties" page.
type Subject struct {
	// Optional. The user name/ID that the subject represents.
	User       string            `protobuf:"bytes,1,opt,name=user,proto3" json:"user,omitempty"`
	Properties map[string]string `protobuf:"bytes,3,rep,name=properties,proto3" json:"properties,omitempty" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"bytes,2,opt,name=value,proto3"`
}

// RoleRef refers to a role object.
type RoleRef struct {
	// Required. The type of the role being referenced.
	// Currently, "ServiceRole" is the only supported value for "kind".
	Kind string `protobuf:"bytes,1,opt,name=kind,proto3" json:"kind,omitempty"`
	// Required. The name of the ServiceRole object being referenced.
	// The ServiceRole object must be in the same namespace as the ServiceRoleBinding object.
	Name string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
}

// ServiceRoleBindingStatus defines the observed state of ServiceRoleBinding
type ServiceRoleBindingStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file
}

// +genclient
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// ServiceRoleBinding is the Schema for the servicerolebindings API
// +k8s:openapi-gen=true
type ServiceRoleBinding struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   ServiceRoleBindingSpec   `json:"spec,omitempty"`
	Status ServiceRoleBindingStatus `json:"status,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// ServiceRoleBindingList contains a list of ServiceRoleBinding
type ServiceRoleBindingList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []ServiceRoleBinding `json:"items"`
}

func init() {
	SchemeBuilder.Register(&ServiceRoleBinding{}, &ServiceRoleBindingList{})
}

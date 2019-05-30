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

// ServiceRoleSpec defines the desired state of ServiceRole
type ServiceRoleSpec struct {
	// Required. The set of access rules (permissions) that the role has.
	Rules []*AccessRule `protobuf:"bytes,1,rep,name=rules,proto3" json:"rules,omitempty"`
}

// AccessRule defines a permission to access a list of services.
type AccessRule struct {
	// Required. A list of service names.
	// Exact match, prefix match, and suffix match are supported for service names.
	// For example, the service name "bookstore.mtv.cluster.local" matches
	// "bookstore.mtv.cluster.local" (exact match), or "bookstore*" (prefix match),
	// or "*.mtv.cluster.local" (suffix match).
	// If set to ["*"], it refers to all services in the namespace.
	Services []string `protobuf:"bytes,1,rep,name=services,proto3" json:"services,omitempty"`
}

// ServiceRoleStatus defines the observed state of ServiceRole
type ServiceRoleStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file
}

// +genclient
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// ServiceRole is the Schema for the serviceroles API
// +k8s:openapi-gen=true
type ServiceRole struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   ServiceRoleSpec   `json:"spec,omitempty"`
	Status ServiceRoleStatus `json:"status,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// ServiceRoleList contains a list of ServiceRole
type ServiceRoleList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []ServiceRole `json:"items"`
}

func init() {
	SchemeBuilder.Register(&ServiceRole{}, &ServiceRoleList{})
}

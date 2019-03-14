// Copyright 2018 The Kubeflow Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package v1alpha1

import (
	client "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/client/v1alpha1"
	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// GcpSpec defines the desired state of Gcp
type GcpSpec struct {
	client.ClientSpec `json:",inline"`
	Project           string `json:"project,omitempty"`
	Email             string `json:"email,omitempty"`
	IpName            string `json:"ipName,omitempty"`
	Hostname          string `json:"hostname,omitempty"`
	Zone              string `json:"zone,omitempty"`
	BasicAuthUsername string `json:"basicAuthUsername,omitempty"`
	BasicAuthPassword string `json:"basicAuthPassword,omitempty"`
	UseBasicAuth      bool   `json:"useBasicAuth"`
	SkipInitProject   bool   `json:"skipInitProject,omitempty"`
}

// GcpStatus defines the observed state of Gcp
type GcpStatus struct {
	Conditions []GcpCondition `json:"conditions,omitempty" patchStrategy:"merge" patchMergeKey:"type" protobuf:"bytes,6,rep,name=conditions"`
}

type GcpConditionType string

type GcpCondition struct {
	// Type of deployment condition.
	Type GcpConditionType `json:"type" protobuf:"bytes,1,opt,name=type,casttype=GcpConditionType"`
	// Status of the condition, one of True, False, Unknown.
	Status v1.ConditionStatus `json:"status" protobuf:"bytes,2,opt,name=status,casttype=k8s.io/api/core/v1.ConditionStatus"`
	// The last time this condition was updated.
	LastUpdateTime metav1.Time `json:"lastUpdateTime,omitempty" protobuf:"bytes,6,opt,name=lastUpdateTime"`
	// Last time the condition transitioned from one status to another.
	LastTransitionTime metav1.Time `json:"lastTransitionTime,omitempty" protobuf:"bytes,7,opt,name=lastTransitionTime"`
	// The reason for the condition's last transition.
	Reason string `json:"reason,omitempty" protobuf:"bytes,4,opt,name=reason"`
	// A human readable message indicating details about the transition.
	Message string `json:"message,omitempty" protobuf:"bytes,5,opt,name=message"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// Gcp is the Schema for the applications API
// +k8s:openapi-gen=true
type Gcp struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   GcpSpec   `json:"spec,omitempty"`
	Status GcpStatus `json:"status,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// GcpList contains a list of Gcp
type GcpList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []Gcp `json:"items"`
}

func init() {
	SchemeBuilder.Register(&Gcp{}, &GcpList{})
}

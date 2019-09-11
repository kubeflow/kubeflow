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
	"github.com/ghodss/yaml"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

type KfUpdateSpec struct {
	CurrentVersion *VersionConfig `json:"currentVersion,omitempty"`
	UpdateVersion  *VersionConfig `json:"updateVersion,omitempty"`
}

type VersionConfig struct {
	ConfigPath string `json:"configPath,omitempty"`
}

// KfUpdateStatus defines the observed state of KfUpdate
type KfUpdateStatus struct {
	Conditions []KfUpdateCondition `json:"conditions,omitempty" patchStrategy:"merge" patchMergeKey:"type" protobuf:"bytes,6,rep,name=conditions"`
}

type KfUpdateConditionType string

const (
	// KfDeploying means Kubeflow is in the process of being deployed.
	KfUpdateInProgress KfUpdateConditionType = "InProgress"

	// KfSucceeded means Kubeflow was successfully deployed.
	KfUpdateSucceeded KfUpdateConditionType = "Succeeded"

	// KfFailed meansthere was a problem deploying Kubeflow.
	KfUpdateFailed KfUpdateConditionType = "Failed"

	// Reasons for conditions

	// InvalidKfUpdateSpecReason indicates the KfUpdate was not valid.
	InvalidKfUpdateSpecReason = "InvalidKfUpdateSpec"
)

type KfUpdateCondition struct {
	// Type of deployment condition.
	Type KfUpdateConditionType `json:"type" protobuf:"bytes,1,opt,name=type,casttype=KfDefConditionType"`
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

// KfUpdate is the Schema for the applications API
// +k8s:openapi-gen=true
type KfUpdate struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   KfUpdateSpec   `json:"spec,omitempty"`
	Status KfUpdateStatus `json:"status,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KfUpdateList contains a list of KfUpdate
type KfUpdateList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []KfUpdate `json:"items"`
}

// WriteToFile write the KfUpdate to a file.
func (u *KfUpdate) WriteToFile(path string) error {
	// Write app.yaml
	buf, bufErr := yaml.Marshal(u)
	if bufErr != nil {
		log.Errorf("Error marshaling kfdev; %v", bufErr)
		return bufErr
	}
	log.Infof("Writing KfUpdate to %v", path)
	return ioutil.WriteFile(path, buf, 0644)
}

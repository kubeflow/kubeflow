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
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/intstr"
)

// VolumesViewerSpec defines the desired state of VolumesViewer
type VolumesViewerSpec struct {
	// Specifies the deployment's pod spec that will be created	by the operator.
	PodTemplate corev1.PodSpec `json:"podTemplate"`

	// If defined, a service is created for the deployment.
	Service Service `json:"service,omitempty"`

	// Defines the strategy for handling RWO-PVCs defined in the PodTemplate.
	RWOScheduling RWOScheduling `json:"rwoScheduling,omitempty"`
}

type RWOScheduling struct {
	// If true, the controller will monitor other Pods that use the same 'ReadWriteOnce'-PVCs
	// as defined by this VolumeViewer's PodTemplate. It will set the deployment's
	// NodeAffinity so that the VolumesViewer is preferably scheduled on the same node as
	// the other Pods mounting the volume. Therefore, the VolumesViewer will be able to
	// access RWO-PVCs which are already mounted.
	Enabled bool `json:"enabled,omitempty"`
	// Instructs the controller to restart generated deployments after they have been created
	// in case the mounted RWO-PVC's node changes.
	// Therefore, the newly started Pod won't be blocked by the viewer.
	// This feature only works reliably when used with one RWO-PVC, as the viewer cannot
	// be simultaneously mount RWO-PVCs from different nodes.
	Restart bool `json:"restart,omitempty"`
}

type Service struct {
	// Specifies the deployment's target port that's used by the containers' PodTemplate.
	TargetPort intstr.IntOrString `json:"targetPort"`

	// If defined, a virtual service will be created for the service.
	VirtualService VirtualService `json:"virtualService,omitempty"`
}

type VirtualService struct {
	// Specifies the prefix to the virtual service's 'prefix' field.
	// The controller will suffix '/namespace/name' to this prefix.
	BasePrefix string `json:"basePrefix"`

	// Specifies the virtual service's 'rewrite' field.
	// If omitted, the controller will set the 'rewrite' field to the same value as the 'prefix' field.
	Rewrite string `json:"rewrite,omitempty"`

	// The timeout for the virtual service's 'timeout' field.
	Timeout string `json:"timeout,omitempty"`
}

// VolumesViewerCondition defines the observed state of VolumesViewer Status
type VolumesViewerCondition struct {
	// Deployment status, 'Available', 'Progressing', 'ReplicaFailure' .
	DeploymentState appsv1.DeploymentConditionType `json:"deploymentState,omitempty"`

	// Last time the condition was probed
	LastProbeTime metav1.Time `json:"lastProbeTime,omitempty"`
}

// VolumesViewerStatus defines the observed state of VolumesViewer
type VolumesViewerStatus struct {
	// ReadyReplicas defines the number of PVCViewer Servers
	// that are available to connect
	ReadyReplicas int32 `json:"readyReplicas,omitempty"`
	// Ready defines if the PVCViewer is ready to be used,
	// e.g. Replicas==ReadyReplicas
	Ready bool `json:"ready,omitempty"`
	// RWOVolumes defines the RWO-PVCs that are referenced by the PodTemplate.
	// These values are only set if the RWOScheduling.restart is enabled.
	// The controller will reconcile the deployment's (and its affinity) if another Pod mounts one of these RWO-PVC.
	RWOVolumes []string `json:"rwoVolumes,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

// VolumesViewer is the Schema for the volumesviewers API
type VolumesViewer struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   VolumesViewerSpec   `json:"spec,omitempty"`
	Status VolumesViewerStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

// VolumesViewerList contains a list of VolumesViewer
type VolumesViewerList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []VolumesViewer `json:"items"`
}

func init() {
	SchemeBuilder.Register(&VolumesViewer{}, &VolumesViewerList{})
}

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

package v1beta1

import (
	"fmt"
	"github.com/ghodss/yaml"
	kfapis "github.com/kubeflow/kfctl/v3/pkg/apis"
	log "github.com/sirupsen/logrus"
	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"strings"
)

const (
	KfConfigFile = "app.yaml"

	// Used for populating plugin missing errors and identifying those
	// errors.
	pluginNotFoundErrPrefix = "Missing plugin"

	// Used for populating plugin missing errors and identifying those
	// errors.
	conditionNotFoundErrPrefix = "Missing condition"
)

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KfDef is the Schema for the applications API
// +k8s:openapi-gen=true
type KfDef struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   KfDefSpec   `json:"spec,omitempty"`
	Status KfDefStatus `json:"status,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KfDefList contains a list of KfDef
type KfDefList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []KfDef `json:"items"`
}

type KfDefSpec struct {
	Applications []Application `json:"applications,omitempty"`
	Plugins      []Plugin      `json:"plugins,omitempty"`
	Secrets      []Secret      `json:"secrets,omitempty"`
	Repos        []Repo        `json:"repos,omitempty"`
}

// Application defines an application to install
type Application struct {
	Name            string           `json:"name,omitempty"`
	KustomizeConfig *KustomizeConfig `json:"kustomizeConfig,omitempty"`
}

type KustomizeConfig struct {
	RepoRef    *RepoRef    `json:"repoRef,omitempty"`
	Overlays   []string    `json:"overlays,omitempty"`
	Parameters []NameValue `json:"parameters,omitempty"`
}

type RepoRef struct {
	Name string `json:"name,omitempty"`
	Path string `json:"path,omitempty"`
}

type NameValue struct {
	Name  string `json:"name,omitempty"`
	Value string `json:"value,omitempty"`
}

type PluginKindType string

// Plugin kind used starting from v1beta1
const (
	AWS_PLUGIN_KIND              PluginKindType = "KfAwsPlugin"
	GCP_PLUGIN_KIND              PluginKindType = "KfGcpPlugin"
	MINIKUBE_PLUGIN_KIND         PluginKindType = "KfMinikubePlugin"
	EXISTING_ARRIKTO_PLUGIN_KIND PluginKindType = "KfExistingArriktoPlugin"
)

// Plugin can be used to customize the generation and deployment of Kubeflow
type Plugin struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec *runtime.RawExtension `json:"spec,omitempty"`
}

// Secret provides information about secrets needed to configure Kubeflow.
// Secrets can be provided via references.
type Secret struct {
	Name         string        `json:"name,omitempty"`
	SecretSource *SecretSource `json:"secretSource,omitempty"`
}

type SecretSource struct {
	LiteralSource *LiteralSource `json:"literalSource,omitempty"`
	EnvSource     *EnvSource     `json:"envSource,omitempty"`
}

type LiteralSource struct {
	Value string `json:"value,omitempty"`
}

type EnvSource struct {
	Name string `json:"Name,omitempty"`
}

// SecretRef is a reference to a secret
type SecretRef struct {
	// Name of the secret
	Name string `json:"name,omitempty"`
}

// Repo provides information about a repository providing config (e.g. kustomize packages,
// Deployment manager configs, etc...)
type Repo struct {
	// Name is a name to identify the repository.
	Name string `json:"name,omitempty"`
	// URI where repository can be obtained.
	// Can use any URI understood by go-getter:
	// https://github.com/hashicorp/go-getter/blob/master/README.md#installation-and-usage
	URI string `json:"uri,omitempty"`
}

// KfDefStatus defines the observed state of KfDef
type KfDefStatus struct {
	Conditions []KfDefCondition `json:"conditions,omitempty" patchStrategy:"merge" patchMergeKey:"type"`
	// ReposCache is used to cache information about local caching of the URIs.
	ReposCache []RepoCache `json:"reposCache,omitempty"`
}

type RepoCache struct {
	Name      string `json:"name,omitempty"`
	LocalPath string `json:"localPath,string"`
}

type KfDefConditionType string

const (
	// KfAvailable means Kubeflow is serving.
	KfAvailable KfDefConditionType = "Available"

	// KfDegraded means functionality of Kubeflow is limited.
	KfDegraded KfDefConditionType = "Degraded"
)

// Define plugin related conditions to be the format:
// - conditions for successful plugins: ${PluginKind}Succeeded
// - conditions for failed plugins: ${PluginKind}Failed
func GetPluginSucceededCondition(pluginKind PluginKindType) KfDefConditionType {
	return KfDefConditionType(fmt.Sprintf("%vSucceeded", pluginKind))
}
func GetPluginFailedCondition(pluginKind PluginKindType) KfDefConditionType {
	return KfDefConditionType(fmt.Sprintf("%vFailed", pluginKind))
}

type KfDefConditionReason string

const (
	// InvalidKfDefSpecReason indicates the KfDef was not valid.
	InvalidKfDefSpecReason KfDefConditionReason = "InvalidKfDefSpec"
)

type KfDefCondition struct {
	// Type of deployment condition.
	Type KfDefConditionType `json:"type"`
	// Status of the condition, one of True, False, Unknown.
	Status v1.ConditionStatus `json:"status"`
	// The last time this condition was updated.
	LastUpdateTime metav1.Time `json:"lastUpdateTime,omitempty"`
	// Last time the condition transitioned from one status to another.
	LastTransitionTime metav1.Time `json:"lastTransitionTime,omitempty"`
	// The reason for the condition's last transition.
	Reason string `json:"reason,omitempty"`
	// A human readable message indicating details about the transition.
	Message string `json:"message,omitempty"`
}

// GetPluginSpec will try to unmarshal the spec for the specified plugin to the supplied
// interface. Returns an error if the plugin isn't defined or if there is a problem
// unmarshaling it.
func (d *KfDef) GetPluginSpec(pluginKind PluginKindType, s interface{}) error {
	for _, p := range d.Spec.Plugins {
		if p.Kind != string(pluginKind) {
			continue
		}

		// To deserialize it to a specific type we need to first serialize it to bytes
		// and then unserialize it.
		specBytes, err := yaml.Marshal(p.Spec)

		if err != nil {
			msg := fmt.Sprintf("Could not marshal plugin %v args; error %v", pluginKind, err)
			log.Errorf(msg)
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: msg,
			}
		}

		err = yaml.Unmarshal(specBytes, s)

		if err != nil {
			msg := fmt.Sprintf("Could not unmarshal plugin %v to the provided type; error %v", pluginKind, err)
			log.Errorf(msg)
			return &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: msg,
			}
		}
		return nil
	}

	return &kfapis.KfError{
		Code:    int(kfapis.NOT_FOUND),
		Message: fmt.Sprintf("%v %v", pluginNotFoundErrPrefix, pluginKind),
	}
}

// Sets condition and status to KfDef.
func (d *KfDef) SetCondition(condType KfDefConditionType,
	status v1.ConditionStatus,
	reason string,
	message string) {
	now := metav1.Now()
	cond := KfDefCondition{
		Type:               condType,
		Status:             status,
		LastUpdateTime:     now,
		LastTransitionTime: now,
		Reason:             reason,
		Message:            message,
	}

	for i := range d.Status.Conditions {
		if d.Status.Conditions[i].Type != condType {
			continue
		}
		if d.Status.Conditions[i].Status == status {
			cond.LastTransitionTime = d.Status.Conditions[i].LastTransitionTime
		}
		d.Status.Conditions[i] = cond
		return
	}
	d.Status.Conditions = append(d.Status.Conditions, cond)
}

// Gets condition from KfDef.
func (d *KfDef) GetCondition(condType KfDefConditionType) (*KfDefCondition, error) {
	for i := range d.Status.Conditions {
		if d.Status.Conditions[i].Type == condType {
			return &d.Status.Conditions[i], nil
		}
	}
	return nil, &kfapis.KfError{
		Code:    int(kfapis.NOT_FOUND),
		Message: fmt.Sprintf("%v %v", conditionNotFoundErrPrefix, condType),
	}
}

// Check if a plugin is finished.
func (d *KfDef) IsPluginFinished(pluginKind PluginKindType) bool {
	condType := GetPluginSucceededCondition(pluginKind)
	cond, err := d.GetCondition(condType)
	if err != nil {
		log.Warnf("error when getting condition info: %v", err)
		return false
	}
	return cond.Status == v1.ConditionTrue
}

// Set a plugin as finished.
func (d *KfDef) SetPluginFinished(pluginKind PluginKindType, msg string) {
	succeededCond := GetPluginSucceededCondition(pluginKind)
	failedCond := GetPluginFailedCondition(pluginKind)
	if _, err := d.GetCondition(failedCond); err == nil {
		d.SetCondition(failedCond, v1.ConditionFalse,
			"", "Reset to false as the plugin is set to be finished.")
	}

	d.SetCondition(succeededCond, v1.ConditionTrue, "", msg)
}

func (d *KfDef) IsPluginFailed(pluginKind PluginKindType) bool {
	condType := GetPluginFailedCondition(pluginKind)
	cond, err := d.GetCondition(condType)
	if err != nil {
		if IsConditionNotFound(err) {
			return false
		}
		log.Warnf("error when getting condition info: %v", err)
		return false
	}
	return cond.Status == v1.ConditionTrue
}

func (d *KfDef) SetPluginFailed(pluginKind PluginKindType, msg string) {
	succeededCond := GetPluginSucceededCondition(pluginKind)
	failedCond := GetPluginFailedCondition(pluginKind)
	if _, err := d.GetCondition(succeededCond); err == nil {
		d.SetCondition(succeededCond, v1.ConditionFalse,
			"", "Reset to false as the plugin is set to be failed.")
	}

	d.SetCondition(failedCond, v1.ConditionTrue, "", msg)
}

// SetPluginSpec sets the requested parameter. The plugin is added if it doesn't already exist.
func (d *KfDef) SetPluginSpec(pluginKind PluginKindType, spec interface{}) error {
	// Convert spec to RawExtension
	r := &runtime.RawExtension{}

	// To deserialize it to a specific type we need to first serialize it to bytes
	// and then unserialize it.
	specBytes, err := yaml.Marshal(spec)

	if err != nil {
		msg := fmt.Sprintf("Could not marshal spec; error %v", err)
		log.Errorf(msg)
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: msg,
		}
	}

	err = yaml.Unmarshal(specBytes, r)

	if err != nil {
		msg := fmt.Sprintf("Could not unmarshal plugin to RawExtension; error %v", err)
		log.Errorf(msg)
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: msg,
		}
	}

	index := -1

	for i, p := range d.Spec.Plugins {
		if p.Kind == string(pluginKind) {
			index = i
			break
		}
	}

	if index == -1 {
		// Plugin in doesn't exist so add it
		log.Infof("Adding plugin %v", pluginKind)

		p := Plugin{}
		p.Name = string(pluginKind)
		p.Kind = string(pluginKind)
		d.Spec.Plugins = append(d.Spec.Plugins, p)

		index = len(d.Spec.Plugins) - 1
	}

	d.Spec.Plugins[index].Spec = r
	return nil
}

func IsPluginNotFound(e error) bool {
	if e == nil {
		return false
	}
	err, ok := e.(*kfapis.KfError)
	return ok && err.Code == int(kfapis.NOT_FOUND) && strings.HasPrefix(err.Message, pluginNotFoundErrPrefix)
}

func IsConditionNotFound(e error) bool {
	if e == nil {
		return false
	}
	err, ok := e.(*kfapis.KfError)
	return ok && err.Code == int(kfapis.NOT_FOUND) &&
		strings.HasPrefix(err.Message, conditionNotFoundErrPrefix)
}

package kfctlconfig

import (
	"fmt"
	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
)

// Internal data structure to hold app related info.
type KfctlConfig struct {
	// Shared fields among all components. should limit this list.
	// TODO(gabrielwen): Deprecate AppDir and move it to cache in Status.
	AppDir       string
	UseBasicAuth bool

	Applications []Application
	Plugins      []Plugin
	Secrets      []Secret
	Repos        []Repo
}

type Platform struct {
	Name string
	Spec *runtime.RawExtension
}

// Application defines an application to install
type Application struct {
	Name            string
	KustomizeConfig *KustomizeConfig
}

type KustomizeConfig struct {
	RepoRef    *RepoRef
	Overlays   []string
	Parameters []NameValue
}

type RepoRef struct {
	Name string
	Path string
}

type NameValue struct {
	Name  string
	Value string
}

type Plugin struct {
	Name      string
	Namespace string
	Spec      *runtime.RawExtension
}

// Secret provides information about secrets needed to configure Kubeflow.
// Secrets can be provided via references.
type Secret struct {
	Name         string
	SecretSource *SecretSource
}

type SecretSource struct {
	LiteralSource *LiteralSource
	EnvSource     *EnvSource
}

type LiteralSource struct {
	Value string
}

type EnvSource struct {
	Name string
}

// SecretRef is a reference to a secret
type SecretRef struct {
	// Name of the secret
	Name string
}

// Repo provides information about a repository providing config (e.g. kustomize packages,
// Deployment manager configs, etc...)
type Repo struct {
	// Name is a name to identify the repository.
	Name string
	// URI where repository can be obtained.
	// Can use any URI understood by go-getter:
	// https://github.com/hashicorp/go-getter/blob/master/README.md#installation-and-usage
	URI string
}

type Status struct {
	Conditions []Condition
	Caches     []Cache
}

type Condition struct {
	// Type of deployment condition.
	Type ConditionType
	// Status of the condition, one of True, False, Unknown.
	Status v1.ConditionStatus
	// The last time this condition was updated.
	LastUpdateTime metav1.Time
	// Last time the condition transitioned from one status to another.
	LastTransitionTime metav1.Time
	// The reason for the condition's last transition.
	Reason string
	// A human readable message indicating details about the transition.
	Message string
}

type ConditionType string

const (
	// KfAvailable means Kubeflow is serving.
	Available ConditionType = "Available"

	// KfDegraded means functionality of Kubeflow is limited.
	Degraded ConditionType = "Degraded"
)

// Define plugin related conditions to be the format:
// - conditions for successful plugins: ${PluginKind}Succeeded
// - conditions for failed plugins: ${PluginKind}Failed
func GetPluginSucceededCondition(pluginKind PluginKindType) ConditionType {
	return ConditionType(fmt.Sprintf("%vSucceeded", pluginKind))
}
func GetPluginFailedCondition(pluginKind PluginKindType) ConditionType {
	return ConditionType(fmt.Sprintf("%vFailed", pluginKind))
}

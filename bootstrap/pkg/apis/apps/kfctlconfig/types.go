package kfctlconfig

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

// Internal data structure to hold app related info.
type KfctlConfig struct {
	// Shared fields among all components. should limit this list.
	// TODO(gabrielwen): Deprecate AppDir and move it to cache in Status.
	AppDir string
	// TODO(gabrielwen): Can we infer this from Applications?
	UseBasicAuth bool

	Applications []Application
	Plugins      []Plugin
	Secrets      []Secret
	Repos        []Repo
	Status       Status
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
	Kind      string
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

type PluginKindType string

const (
	// Used for populating plugin missing errors and identifying those
	// errors.
	pluginNotFoundErrPrefix = "Missing plugin"

	// Used for populating plugin missing errors and identifying those
	// errors.
	conditionNotFoundErrPrefix = "Missing condition"
)

// Plugin kind used starting from v1beta1
const (
	AWS_PLUGIN_KIND              PluginKindType = "KfAwsPlugin"
	GCP_PLUGIN_KIND              PluginKindType = "KfGcpPlugin"
	MINIKUBE_PLUGIN_KIND         PluginKindType = "KfMinikubePlugin"
	EXISTING_ARRIKTO_PLUGIN_KIND PluginKindType = "KfExistingArriktoPlugin"
)

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

type Cache struct {
	Name      string
	LocalPath string
}

func (c *KfctlConfig) GetPluginSpec(pluginKind PluginKindType, s interface{}) error {
	for _, p := range c.Plugins {
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

// Sets condition and status to KfctlConfig.
func (c *KfctlConfig) SetCondition(condType ConditionType,
	status v1.ConditionStatus,
	reason string,
	message string) {
	now := metav1.Now()
	cond := Condition{
		Type:               condType,
		Status:             status,
		LastUpdateTime:     now,
		LastTransitionTime: now,
		Reason:             reason,
		Message:            message,
	}

	for i := range c.Status.Conditions {
		if c.Status.Conditions[i].Type != condType {
			continue
		}
		if c.Status.Conditions[i].Status == status {
			cond.LastTransitionTime = c.Status.Conditions[i].LastTransitionTime
		}
		c.Status.Conditions[i] = cond
		return
	}
	c.Status.Conditions = append(c.Status.Conditions, cond)
}

// Gets condition from KfctlConfig.
func (c *KfctlConfig) GetCondition(condType ConditionType) (*Condition, error) {
	for i := range c.Status.Conditions {
		if c.Status.Conditions[i].Type == condType {
			return &c.Status.Conditions[i], nil
		}
	}
	return nil, &kfapis.KfError{
		Code:    int(kfapis.NOT_FOUND),
		Message: fmt.Sprintf("%v %v", conditionNotFoundErrPrefix, condType),
	}
}

func (c *KfctlConfig) IsPluginFinished(pluginKind PluginKindType) bool {
	condType := GetPluginSucceededCondition(pluginKind)
	cond, err := c.GetCondition(condType)
	if err != nil {
		if IsConditionNotFound(err) {
			return false
		}
		log.Warnf("error when getting condition info: %v", err)
		return false
	}
	return cond.Status == v1.ConditionTrue
}

func (c *KfctlConfig) SetPluginFinished(pluginKind PluginKindType, msg string) {
	succeededCond := GetPluginSucceededCondition(pluginKind)
	failedCond := GetPluginFailedCondition(pluginKind)
	if _, err := c.GetCondition(failedCond); err == nil {
		c.SetCondition(failedCond, v1.ConditionFalse, "",
			"Reset to false as the plugin is set to be finished.")
	}

	c.SetCondition(succeededCond, v1.ConditionTrue, "", msg)
}

func (c *KfctlConfig) IsPluginFailed(pluginKind PluginKindType) bool {
	condType := GetPluginFailedCondition(pluginKind)
	cond, err := c.GetCondition(condType)
	if err != nil {
		if IsConditionNotFound(err) {
			return false
		}
		log.Warnf("error when getting condition info: %v", err)
		return false
	}
	return cond.Status == v1.ConditionTrue
}

func (c *KfctlConfig) SetPluginFailed(pluginKind PluginKindType, msg string) {
	succeededCond := GetPluginSucceededCondition(pluginKind)
	failedCond := GetPluginFailedCondition(pluginKind)
	if _, err := c.GetCondition(succeededCond); err == nil {
		c.SetCondition(succeededCond, v1.ConditionFalse,
			"", "Reset to false as the plugin is set to be failed.")
	}

	c.SetCondition(failedCond, v1.ConditionTrue, "", msg)
}

// SetPluginSpec sets the requested parameter. The plugin is added if it doesn't already exist.
func (c *KfctlConfig) SetPluginSpec(pluginKind PluginKindType, spec interface{}) error {
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

	for i, p := range c.Plugins {
		if p.Kind == string(pluginKind) {
			index = i
			break
		}
	}

	if index == -1 {
		// Plugin doesn't exist so add it
		log.Infof("Adding plugin %v", pluginKind)

		p := Plugin{}
		p.Name = string(pluginKind)
		p.Kind = string(pluginKind)
		c.Plugins = append(c.Plugins, p)

		index = len(c.Plugins) - 1
	}

	c.Plugins[index].Spec = r
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

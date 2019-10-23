package kfconfig

import (
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"strings"

	"github.com/ghodss/yaml"
	gogetter "github.com/hashicorp/go-getter"
	"github.com/hashicorp/go-getter/helper/url"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
)

const (
	DefaultCacheDir = ".cache"
)

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// Internal data structure to hold app related info.
// +k8s:openapi-gen=true
type KfConfig struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   KfConfigSpec `json:"spec,omitempty"`
	Status Status       `json:"status,omitempty"`
}

// The spec of kKfConfig
type KfConfigSpec struct {
	// Shared fields among all components. should limit this list.
	// TODO(gabrielwen): Deprecate AppDir and move it to cache in Status.
	AppDir string `json:"appDir,omitempty"`
	// The filename of the config, e.g. app.yaml.
	// Base name only, as the directory is AppDir above.
	ConfigFileName string `json:"configFileName,omitempty"`

	Version string `json:"version,omitempty"`

	// TODO(gabrielwen): Can we infer this from Applications?
	UseBasicAuth bool `json:"useBasicAuth,omitempty"`

	Platform string `json:"platform,omitempty"`

	// TODO(gabrielwen): Deprecate these fields as they only makes sense to GCP.
	Project         string `json:"project,omitempty"`
	Email           string `json:"email,omitempty"`
	IpName          string `json:"ipName,omitempty"`
	Hostname        string `json:"hostname,omitempty"`
	SkipInitProject bool   `json:"skipInitProject,omitempty"`
	Zone            string `json:"zone,omitempty"`

	DeleteStorage bool `json:"deleteStorage,omitempty"`
	UseIstio      bool `json:"useIstio"`

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

type Plugin struct {
	Name      string                `json:"name,omitempty"`
	Namespace string                `json:"namespace,omitempty"`
	Kind      PluginKindType        `json:"kind,omitempty"`
	Spec      *runtime.RawExtension `json:"spec,omitempty"`
}

// Secret provides information about secrets needed to configure Kubeflow.
// Secrets can be provided via references.
type Secret struct {
	Name         string        `json:"name,omitempty"`
	SecretSource *SecretSource `json:"secretSource,omitempty"`
}

type SecretSource struct {
	LiteralSource *LiteralSource `json:"literalSource,omitempty"`
	HashedSource  *HashedSource  `json:"hashedSource,omitempty"`
	EnvSource     *EnvSource     `json:"envSource,omitempty"`
}

type LiteralSource struct {
	Value string `json:"value,omitempty"`
}

type HashedSource struct {
	HashedValue string `json:"value,omitempty"`
}

type EnvSource struct {
	Name string `json:"name,omitempty"`
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

type Status struct {
	Conditions []Condition `json:"conditions,omitempty"`
	Caches     []Cache     `json:"caches,omitempty"`
}

type Condition struct {
	// Type of deployment condition.
	Type ConditionType `json:"type,omitempty"`
	// Status of the condition, one of True, False, Unknown.
	Status v1.ConditionStatus `json:"status,omitempty"`
	// The last time this condition was updated.
	LastUpdateTime metav1.Time `json:"lastUpdateTime,omitempty"`
	// Last time the condition transitioned from one status to another.
	LastTransitionTime metav1.Time `json:"lastTransitionTime,omitempty"`
	// The reason for the condition's last transition.
	Reason string `json:"reason,omitempty"`
	// A human readable message indicating details about the transition.
	Message string `json:"message,omitempty"`
}

type Cache struct {
	Name      string `json:"name,omitempty"`
	LocalPath string `json:"localPath,omitempty"`
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

// Returns the repo with the name and true if repo exists.
// nil and false otherwise.
func (c *KfConfig) GetRepoCache(repoName string) (Cache, bool) {
	for _, r := range c.Status.Caches {
		if r.Name == repoName {
			return r, true
		}
	}
	return Cache{}, false
}

func (c *KfConfig) GetPluginSpec(pluginKind PluginKindType, s interface{}) error {
	for _, p := range c.Spec.Plugins {
		if p.Kind != pluginKind {
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

// SetPluginSpec sets the requested parameter. The plugin is added if it doesn't already exist.
func (c *KfConfig) SetPluginSpec(pluginKind PluginKindType, spec interface{}) error {
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

	for i, p := range c.Spec.Plugins {
		if p.Kind == pluginKind {
			index = i
			break
		}
	}

	if index == -1 {
		// Plugin in doesn't exist so add it
		log.Infof("Adding plugin %v", pluginKind)

		p := Plugin{}
		p.Name = string(pluginKind)
		p.Kind = pluginKind
		c.Spec.Plugins = append(c.Spec.Plugins, p)

		index = len(c.Spec.Plugins) - 1
	}

	c.Spec.Plugins[index].Spec = r
	return nil
}

// Sets condition and status to KfConfig.
func (c *KfConfig) SetCondition(condType ConditionType,
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

// Gets condition from KfConfig.
func (c *KfConfig) GetCondition(condType ConditionType) (*Condition, error) {
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

func (c *KfConfig) IsPluginFinished(pluginKind PluginKindType) bool {
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

func (c *KfConfig) SetPluginFinished(pluginKind PluginKindType, msg string) {
	succeededCond := GetPluginSucceededCondition(pluginKind)
	failedCond := GetPluginFailedCondition(pluginKind)
	if _, err := c.GetCondition(failedCond); err == nil {
		c.SetCondition(failedCond, v1.ConditionFalse, "",
			"Reset to false as the plugin is set to be finished.")
	}

	c.SetCondition(succeededCond, v1.ConditionTrue, "", msg)
}

func (c *KfConfig) IsPluginFailed(pluginKind PluginKindType) bool {
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

func (c *KfConfig) SetPluginFailed(pluginKind PluginKindType, msg string) {
	succeededCond := GetPluginSucceededCondition(pluginKind)
	failedCond := GetPluginFailedCondition(pluginKind)
	if _, err := c.GetCondition(succeededCond); err == nil {
		c.SetCondition(succeededCond, v1.ConditionFalse,
			"", "Reset to false as the plugin is set to be failed.")
	}

	c.SetCondition(failedCond, v1.ConditionTrue, "", msg)
}

// SyncCache will synchronize the local cache of any repositories.
// On success the status is updated with pointers to the cache.
//
// TODO(jlewi): I'm not sure this handles head references correctly.
// e.g. suppose we have a URI like
// https://github.com/kubeflow/manifests/tarball/pull/189/head?archive=tar.gz
// This gets unpacked to: kubeflow-manifests-e2c1bcb where e2c1bcb is the commit.
// I don't think the code is currently setting the local directory for the cache correctly in
// that case.
//
//
// Using tarball vs. archive in github links affects the download path
// e.g.
// https://github.com/kubeflow/manifests/tarball/master?archive=tar.gz
//    unpacks to  kubeflow-manifests-${COMMIT}
// https://github.com/kubeflow/manifests/archive/master.tar.gz
//    unpacks to manifests-master
// Always use archive format so that the path is predetermined.
//
// Instructions: https://github.com/hashicorp/go-getter#protocol-specific-options
//
// What is the correct syntax for downloading pull requests?
// The following doesn't seem to work
// https://github.com/kubeflow/manifests/archive/master.tar.gz?ref=pull/188
//   * Appears to download master
//
// This appears to work
// https://github.com/kubeflow/manifests/tarball/pull/188/head?archive=tar.gz
// But unpacks it into
// kubeflow-manifests-${COMMIT}
//
func (c *KfConfig) SyncCache() error {
	if c.Spec.AppDir == "" {
		return fmt.Errorf("AppDir must be specified")
	}

	appDir := c.Spec.AppDir
	// Loop over all the repos and download them.
	// TODO(https://github.com/kubeflow/kubeflow/issues/3545): We should check if we already have a local copy and
	// not redownload it.

	baseCacheDir := path.Join(appDir, DefaultCacheDir)
	if _, err := os.Stat(baseCacheDir); os.IsNotExist(err) {
		log.Infof("Creating directory %v", baseCacheDir)
		appdirErr := os.MkdirAll(baseCacheDir, os.ModePerm)
		if appdirErr != nil {
			log.Errorf("couldn't create directory %v Error %v", baseCacheDir, appdirErr)
			return appdirErr
		}
	}

	for _, r := range c.Spec.Repos {
		cacheDir := path.Join(baseCacheDir, r.Name)

		// Can we use a checksum or other mechanism to verify if the existing location is good?
		// If there was a problem the first time around then removing it might provide a way to recover.
		if _, err := os.Stat(cacheDir); err == nil {
			// Check if the cache is up to date.
			shouldSkip := false
			for _, cache := range c.Status.Caches {
				if cache.Name == r.Name && cache.LocalPath != "" {
					shouldSkip = true
					break
				}
			}
			if shouldSkip {
				log.Infof("%v exists; not resyncing ", cacheDir)
				continue
			}

			log.Infof("Deleting cachedir %v because Status.ReposCache is out of date", cacheDir)

			// TODO(jlewi): The reason the cachedir might exist but not be stored in KfDef.status
			// is because of a backwards compatibility path in which we download the cache to construct
			// the KfDef. Specifically coordinator.CreateKfDefFromOptions is calling kftypes.DownloadFromCache
			// We don't want to rely on that method to set the cache because we have logic
			// below to set LocalPath that we don't want to duplicate.
			// Unfortunately this means we end up fetching the repo twice which is very inefficient.
			if err := os.RemoveAll(cacheDir); err != nil {
				log.Errorf("There was a problem deleting directory %v; error %v", cacheDir, err)
				return errors.WithStack(err)
			}
		}

		u, err := url.Parse(r.URI)

		if err != nil {
			log.Errorf("Could not parse URI %v; error %v", r.URI, err)
			return errors.WithStack(err)
		}

		log.Infof("Fetching %v to %v", r.URI, cacheDir)
		tarballUrlErr := gogetter.GetAny(cacheDir, r.URI)
		if tarballUrlErr != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't download URI %v Error %v", r.URI, tarballUrlErr),
			}
		}

		// This is a bit of a hack to deal with the fact that GitHub tarballs
		// can unpack to a directory containing the commit.
		localPath := cacheDir
		if u.Scheme == "http" || u.Scheme == "https" {
			files, filesErr := ioutil.ReadDir(cacheDir)
			if filesErr != nil {
				log.Errorf("Error reading cachedir; error %v", filesErr)
				return errors.WithStack(filesErr)
			}
			subdir := files[0].Name()
			localPath = path.Join(cacheDir, subdir)
		}

		c.Status.Caches = append(c.Status.Caches, Cache{
			Name:      r.Name,
			LocalPath: localPath,
		})

		log.Infof("Fetch succeeded; LocalPath %v", localPath)
	}
	return nil
}

// GetSecret returns the specified secret or an error if the secret isn't specified.
func (c *KfConfig) GetSecret(name string) (string, error) {
	for _, s := range c.Spec.Secrets {
		if s.Name != name {
			continue
		}
		if s.SecretSource.LiteralSource != nil {
			return s.SecretSource.LiteralSource.Value, nil
		}
		if s.SecretSource.HashedSource != nil {
			return s.SecretSource.HashedSource.HashedValue, nil
		}
		if s.SecretSource.EnvSource != nil {
			return os.Getenv(s.SecretSource.EnvSource.Name), nil
		}

		return "", fmt.Errorf("No secret source provided for secret %v", name)
	}
	return "", NewSecretNotFound(name)
}

// GetApplicationParameter gets the desired application parameter.
func (c *KfConfig) GetApplicationParameter(appName string, paramName string) (string, bool) {
	// First we check applications for an application with the specified name.
	if c.Spec.Applications != nil {
		for _, a := range c.Spec.Applications {
			if a.Name == appName {
				return getParameter(a.KustomizeConfig.Parameters, paramName)
			}
		}
	}

	return "", false
}

// SetApplicationParameter sets the desired application parameter.
func (c *KfConfig) SetApplicationParameter(appName string, paramName string, value string) error {
	// First we check applications for an application with the specified name.
	if c.Spec.Applications != nil {
		appIndex := -1
		for i, a := range c.Spec.Applications {
			if a.Name == appName {
				appIndex = i
			}
		}

		if appIndex >= 0 {

			if c.Spec.Applications[appIndex].KustomizeConfig == nil {
				return errors.WithStack(fmt.Errorf("Application %v doesn't have KustomizeConfig", appName))
			}

			c.Spec.Applications[appIndex].KustomizeConfig.Parameters = setParameter(
				c.Spec.Applications[appIndex].KustomizeConfig.Parameters, paramName, value)

			return nil
		}
		log.Warnf("Application %v not found", appName)
		return nil
	}

	return &AppNotFound{Name: appName}
}

// SetSecret sets the specified secret; if a secret with the given name already exists it is overwritten.
func (c *KfConfig) SetSecret(newSecret Secret) {
	for i, s := range c.Spec.Secrets {
		if s.Name == newSecret.Name {
			c.Spec.Secrets[i] = newSecret
			return
		}
	}

	c.Spec.Secrets = append(c.Spec.Secrets, newSecret)
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

type SecretNotFound struct {
	Name string
}

func (e *SecretNotFound) Error() string {
	return fmt.Sprintf("Missing secret %v", e.Name)
}

func NewSecretNotFound(n string) *SecretNotFound {
	return &SecretNotFound{
		Name: n,
	}
}

func IsSecretNotFound(e error) bool {
	if e == nil {
		return false
	}
	_, ok := e.(*SecretNotFound)
	return ok
}

type AppNotFound struct {
	Name string
}

func (e *AppNotFound) Error() string {
	return fmt.Sprintf("Application %v is missing", e.Name)
}

func IsAppNotFound(e error) bool {
	if e == nil {
		return false
	}
	_, ok := e.(*AppNotFound)
	return ok
}

func getParameter(parameters []NameValue, paramName string) (string, bool) {
	for _, p := range parameters {
		if p.Name == paramName {
			return p.Value, true
		}
	}

	return "", false
}

func setParameter(parameters []NameValue, paramName string, value string) []NameValue {
	pIndex := -1

	for i, p := range parameters {
		if p.Name == paramName {
			pIndex = i
		}
	}

	if pIndex < 0 {
		parameters = append(parameters, NameValue{})
		pIndex = len(parameters) - 1
	}

	parameters[pIndex].Name = paramName
	parameters[pIndex].Value = value

	return parameters
}

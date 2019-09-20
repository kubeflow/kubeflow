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
	"fmt"
	"github.com/ghodss/yaml"
	gogetter "github.com/hashicorp/go-getter"
	"github.com/hashicorp/go-getter/helper/url"
	"github.com/kubeflow/kubeflow/bootstrap/v3/config"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"k8s.io/api/core/v1"
	valid "k8s.io/apimachinery/pkg/api/validation"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	netUrl "net/url"
        "os"
	"path"
	"strings"
)

const (
	KfConfigFile = "app.yaml"
)

// KfDefSpec holds common attributes used by each platform
type KfDefSpec struct {
	config.ComponentConfig `json:",inline"`
	// TODO(jlewi): Why is AppDir a part of the spec? AppDir is currently used
	// to refer to the location on disk where all the manifests are stored.
	// But that should be treated as a local cache and not part of the spec.
	// For example, if the app is checked out on a different machine the AppDir will change.
	// AppDir. AppDir is stored in KfDefSpec because we pass a KfDef around to
	// as a way to pass the information to all the KfApps that need to know the local AppDir.
	// A better solution might be to store AppDir in KfDef.Status to better reflect its
	// ephemeral nature and match K8s semantics.
	AppDir     string `json:"appdir,omitempty"`
	Version    string `json:"version,omitempty"`
	MountLocal bool   `json:"mountLocal,omitempty"`

	// TODO(jlewi): Project, Email, IpName, Hostname, Zone and other
	// GCP specific values should be moved into GCP plugin.
	Project            string   `json:"project,omitempty"`
	Email              string   `json:"email,omitempty"`
	IpName             string   `json:"ipName,omitempty"`
	Hostname           string   `json:"hostname,omitempty"`
	Zone               string   `json:"zone,omitempty"`
	UseBasicAuth       bool     `json:"useBasicAuth"`
	SkipInitProject    bool     `json:"skipInitProject,omitempty"`
	UseIstio           bool     `json:"useIstio"`
	EnableApplications bool     `json:"enableApplications"`
	ServerVersion      string   `json:"serverVersion,omitempty"`
	DeleteStorage      bool     `json:"deleteStorage,omitempty"`
	PackageManager     string   `json:"packageManager,omitempty"`
	Repos              []Repo   `json:"repos,omitempty"`
	Secrets            []Secret `json:"secrets,omitempty"`
	Plugins            []Plugin `json:"plugins,omitempty"`

	// Applications defines a list of applications to install
	Applications []Application `json:"applications,omitempty"`
}

var DefaultRegistry = RegistryConfig{
	Name: "kubeflow",
	Repo: "https://github.com/kubeflow/kubeflow.git",
	Path: "kubeflow",
}

// Application defines an application to install
type Application struct {
	Name            string           `json:"name,omitempty"`
	KustomizeConfig *KustomizeConfig `json:"kustomizeConfig,omitempty"`
}

type KustomizeConfig struct {
	RepoRef    *RepoRef           `json:"repoRef,omitempty"`
	Overlays   []string           `json:"overlays,omitempty"`
	Parameters []config.NameValue `json:"parameters,omitempty"`
}

type RepoRef struct {
	Name string `json:"name,omitempty"`
	Path string `json:"path,omitempty"`
}

// Plugin can be used to customize the generation and deployment of Kubeflow
// TODO(jlewi): Should Plugin contain K8s TypeMeta so that we can use ApiVersion and Kind
// to identify what it refers to?
type Plugin struct {
	Name string `json:"name,omitempty"`
	// TODO(jlewi): Should we be using runtime.Object or runtime.RawExtension
	Spec *runtime.RawExtension `json:"spec,omitempty"`
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
	Uri string `json:"uri,omitempty"`

	// Root is the relative path to use as the root.
	// TODO(jlewi): Get rid of this field. SyncCache now takes care of setting the directory
	// as needed.
	Root string `json:"root,omitempty"`
}

// Secret provides information about secrets needed to configure Kubeflow.
// Secrets can be provided via references e.g. a URI so that they won't
// be serialized as part of the KfDefSpec which is intended to be written into source control.
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
	Name string `json:"Name,omitempty"`
}

// RegistryConfig is used for two purposes:
// 1. used during image build, to configure registries that should be baked into the bootstrapper docker image.
//  (See: https://github.com/kubeflow/kubeflow/blob/master/bootstrap/image_registries.yaml)
// 2. used during app create rpc call, specifies a registry to be added to an app.
//      required info for registry: Name, Repo, Version, Path
//  Additionally if any of required fields is blank we will try to map with one of
//  the registries baked into the Docker image using the name.
type RegistryConfig struct {
	Name    string `json:"name,omitempty"`
	Repo    string `json:"repo,omitempty"`
	Version string `json:"version,omitempty"`
	Path    string `json:"path,omitempty"`
	RegUri  string `json:"reguri,omitempty"`
}

type KsComponent struct {
	Name      string `json:"name,omitempty"`
	Prototype string `json:"prototype,omitempty"`
}

type KsLibrary struct {
	Name     string `json:"name"`
	Registry string `json:"registry"`
	Version  string `json:"version"`
}

type KsParameter struct {
	// nested components are referenced as "a.b.c" where "a" or "b" may be a module name
	Component string `json:"component,omitempty"`
	Name      string `json:"name,omitempty"`
	Value     string `json:"value,omitempty"`
}

type KsModule struct {
	Name       string         `json:"name"`
	Components []*KsComponent `json:"components,omitempty"`
	Modules    []*KsModule    `json:"modules,omitempty"`
}

type KsPackage struct {
	Name string `json:"name,omitempty"`
	// Registry should be the name of the registry containing the package.
	Registry string `json:"registry,omitempty"`
}

type Registry struct {
	// Name is the user defined name of a registry.
	Name string `json:"-"`
	// Protocol is the registry protocol for this registry. Currently supported
	// values are `github`, `fs`, `helm`.
	Protocol string `json:"protocol"`
	// URI is the location of the registry.
	URI string `json:"uri"`
}

type LibrarySpec struct {
	Version string
	Path    string
}

// KsRegistry corresponds to ksonnet.io/registry
// which is the registry.yaml file found in every registry.
type KsRegistry struct {
	ApiVersion string
	Kind       string
	Libraries  map[string]LibrarySpec
}

// RegistriesConfigFile corresponds to a YAML file specifying information
// about known registries.
type RegistriesConfigFile struct {
	// Registries provides information about known registries.
	Registries []*RegistryConfig
}

type AppConfig struct {
	Registries []*RegistryConfig `json:"registries,omitempty"`
	Packages   []KsPackage       `json:"packages,omitempty"`
	Components []KsComponent     `json:"components,omitempty"`
	Parameters []KsParameter     `json:"parameters,omitempty"`
	// Parameters to apply when creating the ksonnet components
	ApplyParameters []KsParameter `json:"applyParameters,omitempty"`
}

// KfDefStatus defines the observed state of KfDef
type KfDefStatus struct {
	Conditions []KfDefCondition `json:"conditions,omitempty" patchStrategy:"merge" patchMergeKey:"type" protobuf:"bytes,6,rep,name=conditions"`
	// ReposCache is used to cache information about local caching of the URIs.
	ReposCache map[string]RepoCache `json:"reposCache,omitempty"`
}

type RepoCache struct {
	LocalPath string `json:"localPath,string"`
}

type KfDefConditionType string

const (
	// KfCreated means the KfDef spec has been created.
	KfCreated KfDefConditionType = "Created"

	// KfDeploying means Kubeflow is in the process of being deployed.
	KfDeploying KfDefConditionType = "Deploying"

	// KfSucceeded means Kubeflow was successfully deployed.
	KfSucceeded KfDefConditionType = "Succeeded"

	// KfFailed meansthere was a problem deploying Kubeflow.
	KfFailed KfDefConditionType = "Failed"

	// Reasons for conditions

	// InvalidKfDefSpecReason indicates the KfDef was not valid.
	InvalidKfDefSpecReason = "InvalidKfDefSpec"
)

type KfDefCondition struct {
	// Type of deployment condition.
	Type KfDefConditionType `json:"type" protobuf:"bytes,1,opt,name=type,casttype=KfDefConditionType"`
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

// GetDefaultRegistry return reference of a newly copied Default Registry
func GetDefaultRegistry() *RegistryConfig {
	newReg := DefaultRegistry
	return &newReg
}

const DefaultCacheDir = ".cache"
func isValidUrl(toTest string) bool {
        _, err := netUrl.ParseRequestURI(toTest)
        if err != nil {
                return false
        } else {
                return true
        }
}
// LoadKFDefFromURI constructs a KfDef given the path to a YAML file
// specifying a YAML config file.
// configFile is the path to the YAML file containing the KfDef spec. Can be any URI supported by hashicorp
// go-getter.
func LoadKFDefFromURI(configFile string) (*KfDef, error) {
	if configFile == "" {
		return nil, fmt.Errorf("config file must be the URI of a KfDef spec")
	}

	// TODO(jlewi): We should check if configFile doesn't specify a protocol or the protocol
	// is file:// then we can just read it rather than fetching with go-getter.
	appDir, err := ioutil.TempDir("", "")
	if err != nil {
		return nil, fmt.Errorf("Create a temporary directory to copy the file to.")
	}
	// Open config file
	//
	// TODO(jlewi): Should we use hashicorp go-getter.GetAny here? We use that to download
	// the tarballs for the repos. Maybe we should use that here as well to be consistent.
	appFile := path.Join(appDir, KfConfigFile)

	log.Infof("Downloading %v to %v", configFile, appFile)
        configFileUri, err:= netUrl.Parse(configFile)
        if err != nil {
            log.Errorf("could not parse configFile url")
        }
        if isValidUrl(configFile) {
          errGet := gogetter.GetFile(appFile, configFile)
          if errGet != nil {
                return nil, &kfapis.KfError{
                        Code:    int(kfapis.INVALID_ARGUMENT),
                        Message: fmt.Sprintf("could not fetch specified config %s: %v", configFile, err),
                }
          }
        }else{
        g := new(gogetter.FileGetter)
        g.Copy = true
        errGet :=  g.GetFile(appFile, configFileUri)
         if errGet != nil {
                return nil, &kfapis.KfError{
                        Code:    int(kfapis.INVALID_ARGUMENT),
                        Message: fmt.Sprintf("could not fetch specified config %s: %v", configFile, err),
                }
          }
        }

	// Read contents
	configFileBytes, err := ioutil.ReadFile(appFile)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not read from config file %s: %v", configFile, err),
		}
	}
	// Unmarshal content onto KfDef struct
	kfDef := &KfDef{}
	if err := yaml.Unmarshal(configFileBytes, kfDef); err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not unmarshal config file onto KfDef struct: %v", err),
		}
	}

	return kfDef, nil
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
func (d *KfDef) SyncCache() error {
	if d.Spec.AppDir == "" {
		return fmt.Errorf("AppDir must be specified")
	}

	if d.Status.ReposCache == nil {
		d.Status.ReposCache = make(map[string]RepoCache)
	}
	appDir := d.Spec.AppDir
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

	for _, r := range d.Spec.Repos {
		cacheDir := path.Join(baseCacheDir, r.Name)

		// Can we use a checksum or other mechanism to verify if the existing location is good?
		// If there was a problem the first time around then removing it might provide a way to recover.
		if _, err := os.Stat(cacheDir); err == nil {
			if _, ok := d.Status.ReposCache[r.Name]; ok && d.Status.ReposCache[r.Name].LocalPath != "" {
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

		u, err := url.Parse(r.Uri)

		if err != nil {
			log.Errorf("Could not parse URI %v; error %v", r.Uri, err)
			return errors.WithStack(err)
		}

		log.Infof("Fetching %v to %v", r.Uri, cacheDir)
		tarballUrlErr := gogetter.GetAny(cacheDir, r.Uri)
		if tarballUrlErr != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't download URI %v Error %v", r.Uri, tarballUrlErr),
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

		d.Status.ReposCache[r.Name] = RepoCache{
			LocalPath: localPath,
		}

		log.Infof("Fetch succeeded; LocalPath %v", d.Status.ReposCache[r.Name].LocalPath)
	}
	return nil
}

// GetSecret returns the specified secret or an error if the secret isn't specified.
func (d *KfDef) GetSecret(name string) (string, error) {
	for _, s := range d.Spec.Secrets {
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

// SetSecret sets the specified secret; if a secret with the given name already exists it is overwritten.
func (d *KfDef) SetSecret(newSecret Secret) {
	for i, s := range d.Spec.Secrets {
		if s.Name == newSecret.Name {
			d.Spec.Secrets[i] = newSecret
			return
		}
	}

	d.Spec.Secrets = append(d.Spec.Secrets, newSecret)
}

// GetPluginSpec will try to unmarshal the spec for the specified plugin to the supplied
// interface. Returns an error if the plugin isn't defined or if there is a problem
// unmarshaling it.
func (d *KfDef) GetPluginSpec(pluginName string, s interface{}) error {
	for _, p := range d.Spec.Plugins {
		if p.Name != pluginName {
			continue
		}

		// To deserialize it to a specific type we need to first serialize it to bytes
		// and then unserialize it.
		specBytes, err := yaml.Marshal(p.Spec)

		if err != nil {
			log.Errorf("Could not marshal plugin %v args; error %v", pluginName, err)
			return err
		}

		err = yaml.Unmarshal(specBytes, s)

		if err != nil {
			log.Errorf("Could not unmarshal plugin %v to the provided type; error %v", pluginName, err)
		}
		return nil
	}

	return NewPluginNotFound(pluginName)
}

// SetPluginSpec sets the requested parameter. The plugin is added if it doesn't already exist.
func (d *KfDef) SetPluginSpec(pluginName string, spec interface{}) error {
	// Convert spec to RawExtension

	r := &runtime.RawExtension{}

	// To deserialize it to a specific type we need to first serialize it to bytes
	// and then unserialize it.
	specBytes, err := yaml.Marshal(spec)

	if err != nil {
		log.Errorf("Could not marshal spec; error %v", err)
		return err
	}

	err = yaml.Unmarshal(specBytes, r)

	if err != nil {
		log.Errorf("Could not unmarshal plugin to RawExtension; error %v", err)
	}

	index := -1

	for i, p := range d.Spec.Plugins {
		if p.Name == pluginName {
			index = i
			break
		}
	}

	if index == -1 {
		// Plugin in doesn't exist so add it
		log.Infof("Adding plugin %v", pluginName)

		d.Spec.Plugins = append(d.Spec.Plugins, Plugin{
			Name: pluginName,
		})

		index = len(d.Spec.Plugins) - 1
	}

	d.Spec.Plugins[index].Spec = r
	return nil
}

// IsValid returns true if the spec is a valid and complete spec.
// If false it will also return a string providing a message about why its invalid.
func (d *KfDef) IsValid() (bool, string) {
	// TODO(jlewi): Add more validation and a unittest.
	// Validate kfDef
	errs := valid.NameIsDNSLabel(d.Name, false)
	if errs != nil && len(errs) > 0 {
		return false, fmt.Sprintf("invalid name due to %v", strings.Join(errs, ","))
	}

	// PackageManager is currently required because we will try to load the package manager and get an error if
	// none is specified.
	if d.Spec.PackageManager == "" {
		return false, fmt.Sprintf("KfDef.Spec.PackageManager is required")
	}

	return true, ""
}

// WriteToFile write the KfDef to a file.
// WriteToFile will strip out any literal secrets before writing it
func (d *KfDef) WriteToFile(path string) error {
	stripped := d.DeepCopy()

	secrets := make([]Secret, 0)

	for _, s := range stripped.Spec.Secrets {
		if s.SecretSource.LiteralSource != nil {
			log.Warnf("Stripping literal secret %v from KfDef before serializing it", s.Name)
			continue
		}
		secrets = append(secrets, s)
	}

	stripped.Spec.Secrets = secrets

	// Rewrite app.yaml
	buf, bufErr := yaml.Marshal(stripped)
	if bufErr != nil {
		log.Errorf("Error marshaling kfdev; %v", bufErr)
		return bufErr
	}
	log.Infof("Writing stripped KfDef to %v", path)
	return ioutil.WriteFile(path, buf, 0644)
}

// WriteToConfigFile writes the config to ${APPDIR}/${KFCONFIGFILE}
func (d *KfDef) WriteToConfigFile() error {
	return d.WriteToFile(path.Join(d.Spec.AppDir, KfConfigFile))
}

type PluginNotFound struct {
	Name string
}

func (e *PluginNotFound) Error() string {
	return fmt.Sprintf("Missing plugin %v", e.Name)
}

func NewPluginNotFound(n string) *PluginNotFound {
	return &PluginNotFound{
		Name: n,
	}
}

func IsPluginNotFound(e error) bool {
	if e == nil {
		return false
	}
	_, ok := e.(*PluginNotFound)
	return ok
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

func getParameter(parameters []config.NameValue, paramName string) (string, bool) {
	for _, p := range parameters {
		if p.Name == paramName {
			return p.Value, true
		}
	}

	return "", false
}

func setParameter(parameters []config.NameValue, paramName string, value string) []config.NameValue {
	pIndex := -1

	for i, p := range parameters {
		if p.Name == paramName {
			pIndex = i
		}
	}

	if pIndex < 0 {
		parameters = append(parameters, config.NameValue{})
		pIndex = len(parameters) - 1
	}

	parameters[pIndex].Name = paramName
	parameters[pIndex].Value = value

	return parameters
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

// GetApplicationParameter gets the desired application parameter.
func (d *KfDef) GetApplicationParameter(appName string, paramName string) (string, bool) {
	// First we check applications for an application with the specified name.
	if d.Spec.Applications != nil {
		for _, a := range d.Spec.Applications {
			if a.Name == appName {
				return getParameter(a.KustomizeConfig.Parameters, paramName)
			}
		}
	}

	// Since an application with the specified name wasn't found check the deprecated componentParams
	if _, ok := d.Spec.ComponentParams[appName]; ok {
		return getParameter(d.Spec.ComponentParams[appName], paramName)
	}

	return "", false
}

// SetApplicationParameter sets the desired application parameter.
func (d *KfDef) SetApplicationParameter(appName string, paramName string, value string) error {
	// First we check applications for an application with the specified name.
	if d.Spec.Applications != nil {
		appIndex := -1
		for i, a := range d.Spec.Applications {
			if a.Name == appName {
				appIndex = i
			}
		}

		if appIndex >= 0 {

			if d.Spec.Applications[appIndex].KustomizeConfig == nil {
				return errors.WithStack(fmt.Errorf("Application %v doesn't have KustomizeConfig", appName))
			}

			d.Spec.Applications[appIndex].KustomizeConfig.Parameters = setParameter(
				d.Spec.Applications[appIndex].KustomizeConfig.Parameters, paramName, value)

			return nil
		}
	}

	// Since an application with the specified name wasn't found check the deprecated componentParams
	if _, ok := d.Spec.ComponentParams[appName]; ok {
		d.Spec.ComponentParams[appName] = setParameter(d.Spec.ComponentParams[appName], paramName, value)
		return nil
	}

	return &AppNotFound{Name: appName}
}

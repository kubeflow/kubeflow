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
	"github.com/kubeflow/kubeflow/bootstrap/config"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/pkg/apis"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"k8s.io/api/v2/core/v1"
	metav1 "k8s.io/apimachinery/v2/pkg/apis/meta/v1"
	"os"
	"path"
)

const KfConfigFile = "app.yaml"

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
	AppDir             string `json:"appdir,omitempty"`
	Version            string `json:"version,omitempty"`
	MountLocal         bool   `json:"mountLocal,omitempty"`
	Project            string `json:"project,omitempty"`
	Email              string `json:"email,omitempty"`
	IpName             string `json:"ipName,omitempty"`
	Hostname           string `json:"hostname,omitempty"`
	Zone               string `json:"zone,omitempty"`
	UseBasicAuth       bool   `json:"useBasicAuth"`
	SkipInitProject    bool   `json:"skipInitProject,omitempty"`
	UseIstio           bool   `json:"useIstio"`
	EnableApplications bool   `json:"enableApplications"`
	ServerVersion      string `json:"serverVersion,omitempty"`
	DeleteStorage      bool   `json:"deleteStorage,omitempty"`
	PackageManager     string `json:"packageManager,omitempty"`
	ManifestsRepo      string `json:"manifestsRepo,omitempty"`
	Repos              []Repo `json:"Repos,omitempty"`
}

var DefaultRegistry = RegistryConfig{
	Name: "kubeflow",
	Repo: "https://github.com/kubeflow/kubeflow.git",
	Path: "kubeflow",
}

type Repo struct {
	// Name is a name to identify the repository.
	Name string `json:"name,omitempty"`
	// URI where repository can be obtained.
	// Can use any URI understood by go-getter:
	// https://github.com/hashicorp/go-getter/blob/master/README.md#installation-and-usage
	Uri string `json:"uri,omitempty"`

	// Root is the relative path to use as the root.
	Root string `json:"root,omitempty"`
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

type KfDefCondition struct {
	// Type of deployment condition.
	Type KfDefConditionType `json:"type" protobuf:"bytes,1,opt,name=type,casttype=KfDefConditionType"`
	// Status of the condition, one of True, False, Unknown.
	Status v1.ConditionStatus `json:"status" protobuf:"bytes,2,opt,name=status,casttype=k8s.io/api/v2/core/v1.ConditionStatus"`
	// The last time this condition was updated.
	LastUpdateTime metav1.Time `json:"lastUpdateTime,omitempty" protobuf:"bytes,6,opt,name=lastUpdateTime"`
	// Last time the condition transitioned from one status to another.
	LastTransitionTime metav1.Time `json:"lastTransitionTime,omitempty" protobuf:"bytes,7,opt,name=lastTransitionTime"`
	// The reason for the condition's last transition.
	Reason string `json:"reason,omitempty" protobuf:"bytes,4,opt,name=reason"`
	// A human readable message indicating details about the transition.
	Message string `json:"message,omitempty" protobuf:"bytes,5,opt,name=message"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/v2/pkg/runtime.Object

// KfDef is the Schema for the applications API
// +k8s:openapi-gen=true
type KfDef struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   KfDefSpec   `json:"spec,omitempty"`
	Status KfDefStatus `json:"status,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/v2/pkg/runtime.Object

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

// DownalodAndLoadConfigFile constructs a kfApp given the path to a YAML file
// specifying a YAML config file.
// configFile is the path to the YAML file containing the KfDef spec. Can be an URI supported by hashicorp
// go-getter.
// appDir is the directory to use as the application dir. It is also the directory to download
// the config to.
func DownloadAndLoadConfigFile(configFile string, appDir string) (*KfDef, error) {
	if configFile == "" {
		return nil, fmt.Errorf("config file must be the URI of a KfDef spec")
	}

	if appDir == "" {
		return nil, fmt.Errorf("appdir must be the directory where the app should be stored")
	}

	if _, err := os.Stat(appDir); os.IsNotExist(err) {
		log.Infof("Creating directory %v", appDir)
		appdirErr := os.MkdirAll(appDir, os.ModePerm)
		if appdirErr != nil {
			log.Errorf("couldn't create directory %v Error %v", appDir, appdirErr)
			return nil, appdirErr
		}
	} else {
		log.Infof("App directory exists %v", appDir)
	}


	// Open config file
	//
	// TODO(jlewi): Should we use hashicorp go-getter.GetAny here? We use that to download
	// the tarballs for the repos. Maybe we should use that here as well to be consistent.
	appFile := path.Join(appDir, KfConfigFile)

	if _, err:= os.Stat(appFile); err == nil {
		log.Infof("%v exists not refetching", appFile)
	} else {
		log.Infof("Downloading %v to %v", configFile, appFile)
		err := gogetter.GetFile(appFile, configFile)
		if err != nil {
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

	// appDir should be stored in the resulting KfDef
	kfDef.Spec.AppDir = appDir
	return kfDef, nil
}

// SyncCache will synchronize the local cache of any repositories.
// On success the status is updated with pointers to the cache.
func (d *KfDef) SyncCache() error {
	if d.Spec.AppDir == "" {
		return fmt.Errorf("AppDir must be specified")
	}

	if d.Status.ReposCache == nil {
		d.Status.ReposCache = make(map[string]RepoCache)
	}
	appDir := d.Spec.AppDir
	// Loop over all the repos and download them.
	// TODO(jlewi): We should check if we already have a local copy and not redownload it.

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
		// idempotency
		// TODO(jlewi): Why do we remove the directory if it exists?
		// Can we use a checksum or other mechanism to verify if the existing location is good?
		// If there was a problem the first time around then removing it might provide a way to recover.
		if _, err := os.Stat(cacheDir); !os.IsNotExist(err) {
			log.Infof("Removing %v", cacheDir)
			_ = os.RemoveAll(cacheDir)
		}

		log.Infof("Fetching %v to %v", r.Uri, cacheDir)
		tarballUrlErr := gogetter.GetAny(cacheDir, r.Uri)
		if tarballUrlErr != nil {
			return &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("couldn't download URI %v Error %v", r.Uri, tarballUrlErr),
			}
		}

		log.Infof("Fetch succeeded")
		d.Status.ReposCache[r.Name] = RepoCache{
			LocalPath: path.Join(cacheDir, r.Root),
		}
	}

	return nil
}

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
	"k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"math/rand"
)

const (
	KsName    = "ks_app"
	KsEnvName = "default"
)

func QuoteItems(items []string) []string {
	withQuotes := []string{}
	for _, item := range items {
		withQuote := "\"" + item + "\""
		withQuotes = append(withQuotes, withQuote)
	}
	return withQuotes
}

func RemoveItem(defaults []string, name string) []string {
	pkgs := []string{}
	for _, pkg := range defaults {
		if pkg != name {
			pkgs = append(pkgs, pkg)
		}
	}
	return pkgs
}

func RemoveItems(defaults []string, names ...string) []string {
	pkgs := make([]string, len(defaults))
	copy(pkgs, defaults)
	for _, name := range names {
		pkgs = RemoveItem(pkgs, name)
	}
	return pkgs
}

var DefaultRegistry = &RegistryConfig{
	Name: "kubeflow",
	Repo: "https://github.com/kubeflow/kubeflow.git",
	Path: "kubeflow",
}

var DefaultPackages = []string{
	"application",
	"argo",
	"common",
	"examples",
	"jupyter",
	"katib",
	"metacontroller",
	"modeldb",
	"mpi-job",
	"openvino",
	"pipeline",
	"profiles",
	"pytorch-job",
	"seldon",
	"tensorboard",
	"tf-serving",
	"tf-training",
}
var DefaultComponents = []string{
	"ambassador",
	"application",
	"argo",
	"centraldashboard",
	"jupyter",
	"jupyter-web-app",
	"katib",
	"metacontroller",
	"notebooks",
	"notebook-controller",
	"openvino",
	"pipeline",
	"profiles",
	"pytorch-operator",
	"spartakus",
	"tensorboard",
	"tf-job-operator",
}

var DefaultParameters = map[string][]NameValue{
	"spartakus": {
		NameValue{
			Name:  "usageId",
			Value: fmt.Sprintf("%08d", 10000000+rand.Intn(90000000)),
		},
		NameValue{
			Name:  "reportUsage",
			Value: "true",
		},
	},
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
	Registries      []*RegistryConfig `json:"registries,omitempty"`
	Packages        []KsPackage       `json:"packages,omitempty"`
	Components      []KsComponent     `json:"components,omitempty"`
	Parameters      []KsParameter     `json:"parameters,omitempty"`
	// Parameters to apply when creating the ksonnet components
	ApplyParameters []KsParameter     `json:"applyParameters,omitempty"`
}

type NameValue struct {
	Name  string `json:"name,omitempty"`
	Value string `json:"value,omitempty"`
}

// KsonnetSpec defines the desired state of Ksonnet
type KsonnetSpec struct {
	AppDir     string                 `json:"appdir,omitempty"`
	Platform   string                 `json:"platform,omitempty"`
	Version    string                 `json:"version,omitempty"`
	Repo       string                 `json:"repo,omitempty"`
	Components []string               `json:"components,omitempty"`
	Packages   []string               `json:"packages,omitempty"`
	Parameters map[string][]NameValue `json:"parameters,omitempty"`
}

// KsonnetStatus defines the observed state of Ksonnet
type KsonnetStatus struct {
	Conditions []KsonnetCondition `json:"conditions,omitempty" patchStrategy:"merge" patchMergeKey:"type" protobuf:"bytes,6,rep,name=conditions"`
}

type KsonnetConditionType string

type KsonnetCondition struct {
	// Type of deployment condition.
	Type KsonnetConditionType `json:"type" protobuf:"bytes,1,opt,name=type,casttype=KsonnetConditionType"`
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

// Ksonnet is the Schema for the applications API
// +k8s:openapi-gen=true
type Ksonnet struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   KsonnetSpec   `json:"spec,omitempty"`
	Status KsonnetStatus `json:"status,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KsAppList contains a list of Ksonnet
type KsAppList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items []Ksonnet `json:"items"`
}

func init() {
	SchemeBuilder.Register(&Ksonnet{}, &KsAppList{})
}

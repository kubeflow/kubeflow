package kfctlconfig

import (
	"k8s.io/apimachinery/pkg/runtime"
)

// Internal data structure to hold app related info.
type KfctlConfig struct {
	// Shared fields among all components. should limit this list.
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

# kfctl golang client

## Overview

The kfctl golang client will provide the same CLI as kfctl.sh but will
be implemented in golang. The port to golang is because:

1. The UI (gcp-click-to-deploy) and kfctl should share the same ksonnet code when creating a kubeflow application.
2. This common code will serve as a base for later efforts like migrating to ksonnet modules.
3. New kfctl subcommands should be done in golang rather than bash so they can also be easily called by the UI.

## Usage

The initial version of kfctl will seek parity with kfctl.sh by implementing the following subcommands:
- `init`            Initialize a kubeflow application.
- `generate`        Generate the k8 manifests of the kubeflow application.
- `apply`           Submit the k8 manifests to the api-server
- `delete`          Delete the kubeflow application

Typical usage of `kfctl.sh` is as follows:

```sh
kfctl.sh init myapp --platform generatic
cd myapp
kfctl.sh generate all
kfctl.sh apply all
```

This will be implemented by the golang version (ie: remove .sh).

## Requirements

### 1. Create a common library for the UI and kfctl

### 2. Do not include GCP/IAM related types or functions within the common library.

### 3. Do not change existing REST entrypoints or the KsService interface in ksServer.go.

### 4. Isolate the common interface and types in the library so that they can be easily used by kfctl.

### 5. Avoid including extraneous dependencies in the library.


## Current Design

### UI REST Entry Points

Current golang functions to build a ksonnet application are in ksServer.go and are called
by the UI. These functions are invoked from REST entrypoints bound in [ksServer.go](https://github.com/kubeflow/kubeflow/blob/master/bootstrap/cmd/bootstrap/app/ksServer.go#L1291) and are shown below:

```
	http.Handle("/", optionsHandler(healthzHandler))
	http.Handle("/kfctl/apps/apply", optionsHandler(applyAppHandler))
	http.Handle("/kfctl/apps/create", optionsHandler(createAppHandler))
	http.Handle("/kfctl/iam/apply", optionsHandler(applyIamHandler))

	http.Handle("/kfctl/initProject", optionsHandler(initProjectHandler))
	http.Handle("/kfctl/e2eDeploy", optionsHandler(deployHandler))
```

These functions mostly call a [KsService Interface](https://github.com/kubeflow/kubeflow/blob/master/bootstrap/cmd/bootstrap/app/ksServer.go#L60) to build a ksonnet application.
The KsService Interface as is cannot be leveraged by kfctl since it includes specific GCP/IAM parameters
The interface is implemented by [ksServer](https://github.com/kubeflow/kubeflow/blob/master/bootstrap/cmd/bootstrap/app/ksServer.go#L80) which also binds additional methods like [appGenerate](https://github.com/kubeflow/kubeflow/blob/master/bootstrap/cmd/bootstrap/app/ksServer.go#L566)
that are relevant to kfctl but cannot be easily separated. It turns out the primary flow
of interest is createAppHandler. This calls an [anonymous function](https://github.com/kubeflow/kubeflow/blob/master/bootstrap/cmd/bootstrap/app/ksServer.go#L1038) that ends up making all the ksonnet calls required by kfctl.
The other entrypoints are either not relevent to kfctl or implement part of what is done in
this anonymous function.

### Analysis

Methods from ksServer that are relevant to kfctl are:
- ksServer.CreateApp
- ksServer.GetApp
- ksServer.appGenerate
- ksServer.createComponent

Within these methods there are direct calls to ksonnet
- Load
- RunEnvSet
- RunInit
- RunRegistryAdd
- RunPkgInstall
- RunPrototypeUse
- RunParamSet
- RunApply

The primary type of interest to kfctl is AppConfig (see appendix).

The createAppHandler call sequence is below (only relevant calls are shown):

createAppHandler
```
Calls KsService.CreateApp(Context, CreateRequest, Deployment) //not relevant to kfctl
  Calls KsService.GetProjectLock //not relevant to kfctl
  Calls KsService.GetApp //not relevant to kfctl
    Calls kApp.Load //RELEVENT
    Returns appInfo, repoDir //RELEVENT
  If ksonnet application exists
    Calls kApp.RunEnvSet //`ks env set` RELEVANT
  Else
    Calls kApp.RunInit //`ks init <app>` RELEVANT
  Calls kApp.Load //RELEVANT

  //RELEVANT
  for CreateRequest.AppConfig.Registries //AppConfig is RELEVANT
    Calls kApp.RunRegistryAdd //`ks registry add` RELEVANT

  Calls KsService.appGenerate(kApp, AppConfig)  //RELEVANT
    Calls kApp.Libraries //RELEVANT
    for AppConfig.Registries
      Calls kApp.RunPkgInstall //RELEVANT
    for AppConfig.Packages
      Calls kApp.RunPkgInstall //RELEVANT
    for AppConfig.Components //RELEVANT
      Calls KsService.createComponent //RELEVANT

  Calls KsService.Apply //RELEVANT
```

- Note: Where there is a RELEVENT comment indicates where we need to insert a shared Interface that kfctl can use.
- Note: kApp refers to the ksonnet interface.

## Proposed Design

### 1. Move the common interface and types required for the library to a pkg directory under bootstrap
       This will allow the library to be easily built and used by kfctl. See the MOVE annotations in the Appendix.

### 2. Create a KfApi object in the library that wraps ksonnet calls
    - Load
    - RunEnvSet
    - RunInit
    - RunRegistryAdd
    - RunPkgInstall
    - RunPrototypeUse
    - RunParamSet
    - RunApply

### 3. Call KfApi from kfctl, ksServer.go

## Appendix

### Existing Interfaces and Types


- Note: MOVE annotations will also result in a KfApi object being created that uses these types

```
type KsService interface {
	// CreateApp creates a ksonnet application.
	CreateApp(context Context, request CreateRequest, deployment *deploymentmanager.Deployment) error
	// Apply ksonnet app to target GKE cluster
	Apply(context Context, request ApplyRequest) error
	ConfigCluster(Context, CreateRequest) error
	BindRole(context context.Context, project string, token string, iamaccount string) error
	InsertDeployment(context.Context, CreateRequest) (*deploymentmanager.Deployment, error)
	GetDeploymentStatus(context.Context, CreateRequest) (string, error)
	ApplyIamPolicy(context.Context, ApplyIamRequest) error
	GetProjectLock(string) *sync.Mutex
// Additional Methods used by ksServer
        GetApp(project string, appName string, kfVersion string, token string) (*appInfo, string, error)
        CloneRepoToLocal(project string, token string) (string, error)
        SaveAppToRepo(project string, email string, repoDir string) error
        // non-exportable
        appGenerate(kfApp kApp.App, appConfig *AppConfig)
        autoConfigureApp
        createComponent
        getRegistryUri
}

type CreateRequest struct {
	// Name for the app.
	Name string `json:"name,omitempty"`
	// AppConfig is the config for the app.
	AppConfig AppConfig `json:"appconfig,omitempty"`

	// Namespace for the app.
	Namespace string `json:"namespace,omitempty"`

	// Whether to try to autoconfigure the app.
	AutoConfigure bool `json:"autoConfigure,omitempty"`

	// target GKE cLuster info
	Cluster       string `json:"cluster,omitempty"`
	Project       string `json:"project,omitempty"`
	ProjectNumber string `json:"projectNumber,omitempty"`
	Zone          string `json:"zone,omitempty"`

	// Access token, need to access target cluster in order for AutoConfigure
	Token string `json:"token,omitempty"`
	Apply bool   `json:"apply,omitempty"`
	Email string `json:"email,omitempty"`
	// temporary
	ClientId     string `json:"clientId,omitempty"`
	ClientSecret string `json:"clientSecret,omitempty"`
	IpName       string `json:"ipName,omitempty"`

	// For test: GCP service account client id
	SAClientId string `json:"saClientId,omitempty"`
}

//MOVE to subdir under pkg
type AppConfig struct {
	Registries []RegistryConfig `json:"registries,omitempty"`
	Packages   []KsPackage      `json:"packages,omitempty"`
	Components []KsComponent    `json:"components,omitempty"`
	Parameters []KsParameter    `json:"parameters,omitempty"`
}

//MOVE to subdir under pkg
type RegistryConfig struct {
	Name    string `json:"name,omitempty"`
	Repo    string `json:"repo,omitempty"`
	Version string `json:"version,omitempty"`
	Path    string `json:"path,omitempty"`
	RegUri  string `json:"reguri,omitempty"`
}

//MOVE to subdir under pkg
type KsComponent struct {
	Name      string `json:"name"`
	Prototype string `json:"prototype"`
}

//MOVE to subdir under pkg
type KsParameter struct {
	Component string `json:"component,omitempty"`
	Name      string `json:"name,omitempty"`
	Value     string `json:"value:omitempty"`
}

//MOVE to subdir under pkg
type KsRegistry struct {
	ApiVersion string
	Kind       string
	Libraries  map[string]LibrarySpec
}

type ApplyRequest struct {
	// Name of the app to apply
	Name string

	// kubeflow version
	KfVersion string

	// Environment is the environment to use.
	Environment string

	// Components is a list of the names of the components to apply.
	Components []string

	// target GKE cLuster info
	Cluster string
	Project string
	Zone    string

	// Token is an authorization token to use to authorize to the K8s API Server.
	// Leave blank to use the pods service account.
	Token string
	Email string

	// For test: GCP service account client id
	SAClientId string

	// pass *appInfo if ks app is already on disk.
	AppInfo *appInfo
}

//MOVE to subdir under pkg
type appInfo struct {
        // kApp.App is the ksonnet interface
	App kApp.App
}

// App is a ksonnet application in the ksonnet library.
type App interface {
	// AddEnvironment adds an environment.
	AddEnvironment(spec *EnvironmentConfig, k8sSpecFlag string, isOverride bool) error
	// AddRegistry adds a registry.
	AddRegistry(spec *RegistryConfig, isOverride bool) error
	// CurrentEnvironment returns the current environment name or an empty string.
	CurrentEnvironment() string
	// Environment finds an environment by name.
	Environment(name string) (*EnvironmentConfig, error)
	// Environments returns all environments.
	Environments() (EnvironmentConfigs, error)
	// EnvironmentParams returns params for an environment.
	EnvironmentParams(name string) (string, error)
	// Fs is the app's afero Fs.
	Fs() afero.Fs
	// HTTPClient is the app's http client
	HTTPClient() *http.Client
	// IsEnvOverride returns whether the specified environment has overriding configuration
	IsEnvOverride(name string) bool
	// IsRegistryOverride returns whether the specified registry has overriding configuration
	IsRegistryOverride(name string) bool
	// LibPath returns the path of the lib for an environment.
	LibPath(envName string) (string, error)
	// Libraries returns all environments.
	Libraries() (LibraryConfigs, error)
	// Registries returns all registries.
	Registries() (RegistryConfigs, error)
	// RemoveEnvironment removes an environment from the main configuration or an override.
	RemoveEnvironment(name string, override bool) error
	// RenameEnvironment renames an environment in the main configuration or an override.
	RenameEnvironment(from, to string, override bool) error
	// Root returns the root path of the application.
	Root() string
	// SetCurrentEnvironment sets the current environment.
	SetCurrentEnvironment(name string) error
	// UpdateTargets sets the targets for an environment.
	UpdateTargets(envName string, targets []string, isOverride bool) error
	// UpdateLib adds, updates or removes a library reference.
	// env is optional - if provided the reference is scoped under the environment,
	// otherwise it is globally scoped.
	// If spec if nil, the library reference will be removed.
	// Returns the previous reference for the named library, if one existed.
	UpdateLib(name string, env string, spec *LibraryConfig) (*LibraryConfig, error)
	// UpdateRegistry updates a registry.
	UpdateRegistry(spec *RegistryConfig) error
	// Upgrade upgrades an application (app.yaml) to the current version.
	Upgrade(bool) error
	// VendorPath returns the root of the vendor path.
	VendorPath() string
}
```

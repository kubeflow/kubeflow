# kfctl golang client

TL;DR
- remaining work
  - add viper for kfctl config
  - test kfapi integrated calls in gcp-click-to-deploy
  - generate, delete, apply subcommands need to call the same methods in KfApi
  - brew packaging
  - completion for bash/zsh

## Overview

The kfctl golang client provides the same CLI as kfctl.sh but is implemented in golang. 
The move to golang is because:

1. The UI (gcp-click-to-deploy) and kfctl should share the same ksonnet code when creating a kubeflow application.
2. This common code will serve as a base for later efforts like migrating to ksonnet modules.
3. New kfctl subcommands should be done in golang rather than bash so they can also be easily called by the UI as well.

## Requirements

### 1. Create a common API for the UI and kfctl (KfApi)

### 2. Do not include GCP/IAM related types or functions in KfApi.

### 3. Do not change existing REST entrypoints or the KsService interface in ksServer.go.

### 4. Package the KfApi interface and related types so that they can easily be used by kfctl.

### 5. Isolate all ksonnet operations within the KfApi package.


## API and Packaging

New directories (cmd/kfctl, pkg):

```bash
* bootstrap/cmd/kfctl
* bootstrap/cmd/kfctl/cmd
* bootstrap/pkg
* bootstrap/pkg/apis
* bootstrap/pkg/apis/apps
* bootstrap/pkg/apis/apps/v1alpha1
* bootstrap/pkg/utils
* bootstrap/pkg/client
* bootstrap/pkg/client/kfapi
* bootstrap/pkg/client/kfapi/scheme
* bootstrap/pkg/client/kfapi/typed
* bootstrap/pkg/client/kfapi/typed/apps
* bootstrap/pkg/client/kfapi/typed/apps/v1alpha1
```

### KfApi Interface (github/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1/kfapi.go)

The KfApi golang Interface used by both gcp-click-to-deploy and kfctl is shown below:

```golang
type KfApi interface {
	Apply(components []string, cfg clientcmdapi.Config) error
	ComponentAdd(component string, args []string) error
	Components() (map[string]*v1alpha1.KsComponent, error)
	EnvSet(env string, host string) error
	Init(name string, envName string, k8sSpecFlag string, serverURI string, namespace string) error
	Libraries() (map[string]*v1alpha1.KsLibrary, error)
	ParamSet(component string, name string, value string) error
	PkgInstall(full string, pkgName string) error
	PrototypeUse(m map[string]interface{}) error
	Registries() (map[string]*v1alpha1.Registry, error)
	RegistryAdd(name string, reguri string) error
	RegistryConfigs() (map[string]v1alpha1.RegistryConfig, error)
	Root() string
}
```

### Related Types in github/kubeflow/kubeflow/bootstrap/pkg/apis/apps/v1alpha1/application_types.go

- AppConfig
- Application
- ApplicationCondition
- ApplicationConditionType
- ApplicationList
- ApplicationSpec
- ApplicationStatus
- KsComponent
- KsLibrary
- KsModule
- KsPackage
- KsParameter
- KsRegistry
- LibrarySpec
- RegistriesConfigFile
- Registry
- RegistryConfig

### Usage

The initial version of kfctl will provide equivalent functionality as kfctl.sh by implementing 
the following subcommands:

- `init`            Initialize a kubeflow application.
- `generate`        Generate the k8 manifests of the kubeflow application.
- `apply`           Submit the k8 manifests to the api-server
- `delete`          Delete the kubeflow application

Typical usage of `kfctl.sh` is:

```sh
kfctl.sh init myapp --platform generatic
cd myapp
kfctl.sh generate all
kfctl.sh apply all
```

### Config files (default.yaml, env.sh)

The configuration file that kfctl.sh used was env.sh and persisted 
a set of environment variables. Because kfctl will live in /usr/local/bin
and not necessarily expect the kubeflow repo to be on disk, it will 
also create a default.yaml file in the same directory as env.sh that 
is similar to the bootstrap/config/ yaml files. The yaml files 
under bootstrap/config are now defined as a golang type in
application_types.go and this type (Application) is shown below:

```
type AppConfig struct {
	Registries []RegistryConfig `json:"registries,omitempty"`
	Packages   []KsPackage      `json:"packages,omitempty"`
	Components []KsComponent    `json:"components,omitempty"`
	Parameters []KsParameter    `json:"parameters,omitempty"`
}

type ApplicationSpec struct {
	App AppConfig `json:"app,omitempty"`
}

type ApplicationStatus struct {
	Conditions []ApplicationCondition `json:"conditions,omitempty" patchStrategy:"merge" patchMergeKey:"type" protobuf:"bytes,6,rep,name=conditions"`
}

type Application struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   ApplicationSpec   `json:"spec,omitempty"`
	Status ApplicationStatus `json:"status,omitempty"`
}
```

```
apiVersion: {{.apiVersion}}
kind: {{.kind}}
app:
  registries:
{{range $registry := .Registries }}  
    - name: {{$registry.Name}}
      repo: {{$registry.Repo}}
      version: {{$registry.Version}}
      path: {{$registry.Path}}
      RegUri: {{$registry.RegUri}}
{{end}}
  packages:
{{range $package := .Packages }}  
    - name: {{$package.Name}}
      registry: {{$package.Registry}}
{{end}}
  components:
{{range $component := .Components }}  
    - name: {{$component.Name}}
      prototype: {{$component.Prototype}}
{{end}}
  parameters:
{{range $parameter := .Parameters }}  
    - component: {{$parameter.Component}}
      name: {{$parameter.Name}}
      value: {{$parameter.Value}}
{{end}}
```

#### env.sh

The default.yaml file will reflect changes in environment variables in env.sh in the same way as kfctl.sh,
for example DEFAULT_KUBEFLOW_COMPONENTS is an env override and will used to update the components in default.yaml.

The set of environment variables that kfctl will create is the same as kfctl.sh

```
PLATFORM
KUBEFLOW_REPO
KUBEFLOW_VERSION
KUBEFLOW_COMPONENTS
KUBEFLOW_EXTENDEDINFO
KUBEFLOW_KS_DIR
KUBEFLOW_DOCKER_REGISTRY
DOCKER_REGISTRY_KATIB_NAMESPACE
K8S_NAMESPACE
KUBEFLOW_PLATFORM
MOUNT_LOCAL
DEPLOYMENT_NAME
# platform
PROJECT
ZONE
EMAIL
PROJECT_NUMBER
KUBEFLOW_DM_DIR
KUBEFLOW_SECRETS_DIR
KUBEFLOW_K8S_MANIFESTS_DIR
KUBEFLOW_K8S_CONTEXT
KUBEFLOW_IP_NAME
KUBEFLOW_ENDPOINT_NAME
KUBEFLOW_HOSTNAME
CONFIG_FILE
GKE_API_VERSION
```

### Subcommands

- #### init subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/init.go)
  The init subcommand calls the following
  - NewKfApiWithConfig(appName string, appsDir string, kfctlConfig *viper.Viper) (KfApi, error)
  - KfApi.Init(name string, envName string, k8sSpecFlag string, serverURI string, namespace string) error
  - KfApi.RegistryAdd(name string, reguri string) error

- #### generate subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/generate.go)
  TBD

- #### apply subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/apply.go)
  TBD

- #### delete subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/delete.go)
  TBD
  

--- 

## gcp-click-to-deploy


### UI REST Entry Points (no changes)

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

Methods from ksServer.go that need are relevant to KfApi
- ksServer.CreateApp
- ksServer.GetApp
- ksServer.appGenerate
- ksServer.createComponent

Within the above methods there are direct calls to ksonnet 
- Load
- RunEnvSet
- RunInit
- RunRegistryAdd
- RunPkgInstall
- RunPrototypeUse
- RunParamSet
- RunApply

This have been replaced with method in KfApi.


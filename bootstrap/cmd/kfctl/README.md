# kfctl golang client

TL;DR

## Remaining work
  - Test `kfapi` integrated calls in `gcp-click-to-deploy`
  - `brew` packaging
  - Command completion for `bash/zsh`

## Overview

The new `kfctl` client provides the same CLI as `kfctl.sh` but it is implemented in golang.
The move to golang is based on:

- The UI (`gcp-click-to-deploy`) and `kfctl` should share the same `ksonnet` code when creating a `kubeflow` application.
- This common code will serve as a base for later efforts like migrating to `ksonnet` modules.
- New `kfctl` subcommands should be done in `golang` rather than `bash` so they can also be easily called by the UI as well.

## Requirements

 - Create a common API for the UI and `kfctl` (`KfApi`)

 - Do not include `GCP/IAM` related types or functions in `KfApi`

 - Do not change existing `REST` entrypoints or the `KsService` interface in `ksServer.go`

 - Package `KfApi` interface and related types for ease of use by `kfctl`

 - Isolate all `ksonnet` operations in kfctl and gcp-click-to-deploy to call within the `pkg/client/kfapi` package


## API and Packaging

New directories (`cmd/kfctl, pkg`):

```sh
bootstrap/cmd/kfctl
bootstrap/cmd/kfctl/cmd
bootstrap/pkg
bootstrap/pkg/apis
bootstrap/pkg/apis/apps
bootstrap/pkg/apis/apps/v1alpha1
bootstrap/pkg/utils
bootstrap/pkg/client
bootstrap/pkg/client/kfapi
bootstrap/pkg/client/kfapi/scheme
bootstrap/pkg/client/kfapi/typed
bootstrap/pkg/client/kfapi/typed/apps
bootstrap/pkg/client/kfapi/typed/apps/v1alpha1
```

### KfApi Interface (github/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1/kfapi.go)

The `KfApi` golang Interface used by both `gcp-click-to-deploy` and `kfctl` is shown below:

```golang
type KfApi interface {
	Application() *v1alpha1.Application
	Apply(components []string, cfg clientcmdapi.Config) error
	ComponentAdd(ksComponent v1alpha1.KsComponent, args []string) error
	Components() (map[string]*v1alpha1.KsComponent, error)
	EnvSet(env string, host string) error
	Init(envName string, k8sSpecFlag string, host string, namespace string) error
	Libraries() (map[string]*v1alpha1.KsLibrary, error)
	ParamSet(component string, name string, value string) error
	PkgInstall(pkg v1alpha1.KsPackage) error
	PrototypeUse(m map[string]interface{}) error
	Registries() (map[string]*v1alpha1.Registry, error)
	RegistryAdd(registry *v1alpha1.RegistryConfig) error
	RegistryConfigs() map[string]*v1alpha1.RegistryConfig
	Root() string
	Show(components []string) error
}
```

## Usage

The initial version of `kfctl` will provide equivalent functionality as `kfctl.sh` by implementing
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

## Config files (default.yaml, env.toml)

The configuration file that `kfctl.sh` used was `env.sh` and persisted
a set of environment variables. Because `kfctl` will live in `/usr/local/bin`
and not necessarily expect the kubeflow repo to be on disk, it will 
also create a `default.yaml` file in the same directory as `env.sh` that
is similar to the `bootstrap/config/` YAML files. The default.yaml file 
will be reified into to the golang type Application shown below.

```golang
type Application struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   ApplicationSpec   `json:"spec,omitempty"`
	Status ApplicationStatus `json:"status,omitempty"`
}

type ApplicationSpec struct {
	App AppConfig `json:"app,omitempty"`
}

type AppConfig struct {
	Registries []*RegistryConfig `json:"registries,omitempty"`
	Packages   []KsPackage       `json:"packages,omitempty"`
	Components []KsComponent     `json:"components,omitempty"`
	Parameters []KsParameter     `json:"parameters,omitempty"`
}

type RegistriesConfigFile struct {
	// Registries provides information about known registries.
	Registries []*RegistryConfig
}

type KsPackage struct {
	Name string `json:"name,omitempty"`
	// Registry should be the name of the registry containing the package.
	Registry string `json:"registry,omitempty"`
}

type KsComponent struct {
	Name      string `json:"name,omitempty"`
	Prototype string `json:"prototype,omitempty"`
}

type KsParameter struct {
	// nested components are referenced as "a.b.c" where "a" or "b" may be a module name
	Component string `json:"component,omitempty"`
	Name      string `json:"name,omitempty"`
	Value     string `json:"value,omitempty"`
}
```

Generating the default.yaml file will leverage golang's template language.
Give an instance of Application, the YAML generation template is shown below:

```yaml
apiVersion: {{.APIVersion}}
kind: {{.Kind}}
spec:
  app:
    registries:
{{range $registry := .Spec.App.Registries }}
      - name: {{$registry.Name}}
        repo: {{$registry.Repo}}
        version: {{$registry.Version}}
        path: {{$registry.Path}}
        RegUri: {{$registry.RegUri}}
{{end}}
    packages:
{{range $package := .Spec.App.Packages }}
      - name: {{$package.Name}}
        registry: {{$package.Registry}}
{{end}}
    components:
{{range $component := .Spec.App.Components }}
      - name: {{$component.Name}}
        prototype: {{$component.Prototype}}
{{end}}
    parameters:
{{range $parameter := .Spec.App.Parameters }}
      - component: {{$parameter.Component}}
        name: {{$parameter.Name}}
        value: {{$parameter.Value}}
{{end}}
```

### env.sh => env.toml

The `env.sh` file will move to a [toml](https://github.com/toml-lang/toml) file - `env.toml`.
The `default.yaml` file will reflect changes in environment variables in `env.toml`.
For example `DEFAULT_KUBEFLOW_COMPONENTS` is an env override and will used to update the components in `default.yaml`.

The set of environment variables that `kfctl` will use is similar as `kfctl.sh`.

`env.toml`

```conf
[default]
PLATFORM = ""
KUBEFLOW_REPO = "$GOPATH/src/github.com/kubeflow/kubeflow"
KUBEFLOW_VERSION = "master"
KUBEFLOW_COMPONENTS = [ "ambassador","jupyter","centraldashboard","tf-job-operator","pytorch-operator","spartakus","argo","pipeline" ]
KUBEFLOW_EXTENDEDINFO = "false"
KUBEFLOW_KS_DIR = "$HOME/kf_app/ks_app"
KUBEFLOW_DOCKER_REGISTRY = ""
DOCKER_REGISTRY_KATIB_NAMESPACE = ""
K8S_NAMESPACE = "kubeflow"
KUBEFLOW_PLATFORM = ""
MOUNT_LOCAL = ""
DEPLOYMENT_NAME = "kubeflow"
[gcp]
PROJECT = ""
ZONE = ""
EMAIL = ""
PROJECT_NUMBER = ""
KUBEFLOW_DM_DIR = ""
KUBEFLOW_SECRETS_DIR = ""
KUBEFLOW_K8S_MANIFESTS_DIR = ""
KUBEFLOW_K8S_CONTEXT = ""
KUBEFLOW_IP_NAME = ""
KUBEFLOW_ENDPOINT_NAME = ""
KUBEFLOW_HOSTNAME = ""
CONFIG_FILE = ""
GKE_API_VERSION = ""
[minikube]
KUBEFLOW_COMPONENTS = [ "ambassador","jupyter","centraldashboard","tf-job-operator","pytorch-operator","spartakus","argo","pipeline","katib" ]
[docker-for-desktop]
KUBEFLOW_COMPONENTS = [ "ambassador","jupyter","centraldashboard","tf-job-operator","pytorch-operator","spartakus","argo","pipeline","katib" ]
```

## Subcommands

#### root subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/root.go)
- if `default.yaml` and `env.toml` exist in the current directory then instantiates `kfctlConfig` and `kfctlEnv` Viper instances
#### init subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/init.go)
- Upon successful creation of the app directory, creates `default.yaml` and `env.toml` within the app directory

#### generate subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/generate.go)
- Calls `NewKfApiWithConfig(appName string, appsDir string, init *viper.Viper, env *viper.Viper) (KfApi, error)`
- Calls `KfApi.Init(envName string, k8sSpecFlag string, serverURI string, namespace string) error`
- Calls `KfApi.RegistryAdd(reg *RegistryConfig) error`
- Calls `KfApi.PkgInstall(pkg KsPackage) error`
- Calls `KfApi.ComponentAdd(cmp KsComponent) error`

#### apply subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/apply.go)
- Creates a `namespace`
- Calls `KfApi.EnvSet(name string, host string)`
- Calls `KfApi.ParamSet("application", "name", ${DEPLOYMENT_NAME})`
- Calls `KfApi.ParamSet("application", "extendedInfo", ${KUBEFLOW_EXTENDEDINFO})`
- Calls KfApi.Show(...)

#### delete subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/delete.go)
  TBD


---

## gcp-click-to-deploy


### UI REST Entry Points (no changes)

Current golang functions to build a `ksonnet` application are in `ksServer.go` and are called
by the UI. These functions are invoked from `REST` entrypoints bound in [ksServer.go](https://github.com/kubeflow/kubeflow/blob/master/bootstrap/cmd/bootstrap/app/ksServer.go#L1291) and are shown below:

```golang
http.Handle("/", optionsHandler(healthzHandler))
http.Handle("/kfctl/apps/apply", optionsHandler(applyAppHandler))
http.Handle("/kfctl/apps/create", optionsHandler(createAppHandler))
http.Handle("/kfctl/iam/apply", optionsHandler(applyIamHandler))
http.Handle("/kfctl/initProject", optionsHandler(initProjectHandler))
http.Handle("/kfctl/e2eDeploy", optionsHandler(deployHandler))
```

These functions mostly call a [KsService Interface](https://github.com/kubeflow/kubeflow/blob/master/bootstrap/cmd/bootstrap/app/ksServer.go#L60) to build a `ksonnet` application.
The `KsService` Interface as is cannot be leveraged by `kfctl` since it includes specific `GCP/IAM` parameters.
The interface is implemented by [ksServer](https://github.com/kubeflow/kubeflow/blob/master/bootstrap/cmd/bootstrap/app/ksServer.go#L80) which also binds additional methods like [appGenerate](https://github.com/kubeflow/kubeflow/blob/master/bootstrap/cmd/bootstrap/app/ksServer.go#L566) 
that are relevant to `kfctl` but cannot be easily separated. It turns out the primary flow
of interest is `createAppHandler`. This calls an [anonymous function](https://github.com/kubeflow/kubeflow/blob/master/bootstrap/cmd/bootstrap/app/ksServer.go#L1038) that ends up making all the `ksonnet` calls required by `kfctl`.
The other entrypoints are either not relevent to `kfctl` or implement part of what is done in this anonymous function.

Methods needed from `ksServer.go` that are relevant to `KfApi`
- `ksServer.CreateApp`
- `ksServer.GetApp`
- `ksServer.appGenerate`
- `ksServer.createComponent`

Within the above methods there are direct calls to `ksonnet`
- `Load`
- `RunEnvSet`
- `RunInit`
- `RunRegistryAdd`
- `RunPkgInstall`
- `RunPrototypeUse`
- `RunParamSet`
- `RunApply`

This have been replaced with method in KfApi.


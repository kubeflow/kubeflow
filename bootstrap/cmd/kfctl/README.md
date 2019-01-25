# kfctl golang client

## Overview

The new `kfctl` client replaces `kfctl.sh` and is implemented in golang.

## Requirements

 - Create a common API for the UI (gcp-click-to-deploy) and `kfctl` (`KfApp`)

 - All different implementations of the KfApp Interface
   - ksApp for kfctl
   - gcpApp for gcp-click-to-deploy (subsequent issue/PR)

 - Do not change existing `REST` entrypoints or the `KsService` interface in `ksServer.go` at this time

 - Package `KfApp` interface and related types for ease of use by kfctl and gcp-click-to-deploy

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

### KfApp Interface (github/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1/kfapi.go)

The `KfApp` golang Interface used by both `gcp-click-to-deploy` and `kfctl` is shown below:

```golang
type KfApp interface {
	Apply() error
	Delete() error
	Generate() error
	Init(envName string, k8sSpecFlag string, namespace string) error
}
```

## Usage

`kfctl` has the following usage

- `init <[path/]name> --platform=<gcp|microk8s|minikube` Initialize a kubeflow application.
- `generate [--all|--component=<component> ...`          Generate one or more components or all components.
- `apply`                                                Deploy generated components to the api-server.
- `delete`                                               Delete the kubeflow application

Typical use-case

```sh
kfctl init <[path/]name> --platform none
cd myapp
kfctl generate --all
kfctl apply 
```

## Config file (app.yaml)

`kfctl` will be install in `/usr/local/bin`
and not necessarily expect the kubeflow repo to be on disk. 
It will create an `app.yaml` file in current directory if <name> is 
not a path or in the parent directory if <name> is a path.
The app.yaml file will include fields that are used either for 
kfctl or gcp-click-to-deploy.

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

Generating the app.yaml file will leverage golang's template language.
Give an instance of Application, the YAML generation template is shown below:

```yaml
apiVersion: {{.APIVersion}}
kind: {{.Kind}}
metadata: 
  name: {{.ObjectMeta.Name}}
  namespace: {{.ObjectMeta.Namespace}}
spec:
  repo: {{.Repo}}
  components: 
{{range $component := .Spec.Components }}
    - name: {{$component.Name}}
      prototype: {{$component.Prototype}}
{{end}}
```

## Subcommands

#### root subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/root.go)
- Set the kfctlConfig Viper instance's config name and type to 'app' and 'yaml' resp.

#### init subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/init.go)
- Upon successful creation of the app directory, creates `app.yaml` within the app directory

#### generate subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/generate.go)
- Using app.yaml
  - generates a ksonnet application with components specified in app.yaml

#### apply subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/apply.go)
- Creates a `namespace`
- Apply's the ksonnet application by deploying it to the api-server

#### delete subcommand (kubeflow/bootstrap/cmd/kfctl/cmd/delete.go)
  TBD

---

## gcp-click-to-deploy (no changes)

Ksonnet types have been moved to `github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/v1alpha1`


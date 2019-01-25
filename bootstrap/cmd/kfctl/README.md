# kfctl golang client

## Overview

The new `kfctl` client replaces `kfctl.sh` and is implemented in golang.

## Requirements

 - Create a common API for the UI (gcp-click-to-deploy) and `kfctl` (`KfApp`)

 - Separate different implementations of the KfApp Interface
   - bootstrap/pkg/client/ksApp for `kfctl init --platform none`
   - bootstrap/pkg/client/gcpApp for `kfctl init --platform gcp`

 - Do not change existing `REST` entrypoints or the `KsService` interface in `ksServer.go` at this time

 - Package `KfApp` interface and related types for ease of use by kfctl and gcp-click-to-deploy

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
bootstrap/pkg/client/ksapp
bootstrap/pkg/client/gcpapp
```

### KfApp Interface (github/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/v1alpha1/kfapi.go)

The `KfApp` golang Interface used by both 

```sh
kfctl init <[path/]name> --platform gcp
```

and

```sh
kfctl init <[path/]name> --platform none
```

is:

```golang
type KfApp interface {
	Apply() error
	Delete() error
	Generate() error
	Init() error
}
```

Implementations of the interface are in 

```sh
bootstrap/pkg/client/ksapp/ksapp.go
bootstrap/pkg/client/gcpapp/gcpapp.go
```

## Usage

`kfctl` has the following usage

- `init <[path/]name> --platform <gcp|microk8s|minikube|none>` Initialize a kubeflow application.
- `generate [--all|--component <component> ...`                Generate one or more components or all components.
- `apply`                                                      Deploy generated components to the api-server.
- `delete`                                                     Delete the kubeflow application

Typical use-case

```sh
kfctl init <[path/]name> --platform none
cd myapp
kfctl generate --all
kfctl apply 
```

## Config file (app.yaml)

`kfctl` will be installed in `/usr/local/bin`
and not necessarily expect the kubeflow repo to be on disk. 
It will create an `app.yaml` file in current directory if <name> is 
not a path or in a new directory created under the parent directory 
if <name> is a path. The app.yaml file will include fields that are used for 
different platforms that kfctl will generate and deploy.

```golang
type KsApp struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   KsAppSpec   `json:"spec,omitempty"`
	Status KsAppStatus `json:"status,omitempty"`
}

type KsAppSpec struct {
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
For example, given an instance of KsApp, the YAML generation template is shown below:

```yaml
apiVersion: {{.APIVersion}}
kind: {{.Kind}}
metadata:
  name: {{.Name}}
  namespace: {{.Namespace}}
spec:
  platform: {{.Spec.Platform}}
  repo: {{.Spec.Repo}}
  version: {{.Spec.Version}}
  components: {{.Spec.Components}}
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


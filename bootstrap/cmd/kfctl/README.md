# kfctl golang client

## Overview

The new `kfctl` client replaces `kfctl.sh` and is implemented in golang.

## Requirements

 - Create a common API for the UI (gcp-click-to-deploy) and `kfctl` (`KfApp`)

 - Separate different platform implementations of the KfApp Interface
   - ksonnet
     - `kfctl init <[path/]name> --platform none`
     - implementation: bootstrap/pkg/client/ksapp
   - gcp
     - `kfctl init <[path/]name> --platform gcp`
     - implementation: bootstrap/pkg/client/gcpapp 

 - Allow new platforms to be added to kfctl without rebuilding or reshipping kfctl (see [Extending kfctl](#extending-kfctl) below).

 - Do not change existing `REST` entrypoints or the `KsService` interface in `ksServer.go` at this time

 - Package `KfApp` interface and related types for ease of use by kfctl and (later) gcp-click-to-deploy

## API and Packaging

New directories (`cmd/kfctl, pkg`):

```sh
bootstrap/cmd/kfctl
bootstrap/cmd/kfctl/cmd
bootstrap/pkg
bootstrap/pkg/apis
bootstrap/pkg/apis/apps
bootstrap/pkg/apis/apps/ksapp/v1alpha1
bootstrap/pkg/utils
bootstrap/pkg/client
bootstrap/pkg/client/ksapp
bootstrap/pkg/client/gcpapp
bootstrap/plugins
```

### KfApp Interface 

Definition: github/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/group.go

The `KfApp` golang Interface 

```golang
type ResourceEnum string
const (
	ALL      ResourceEnum = "all"
	E8S      ResourceEnum = "e8s"
	PLATFORM ResourceEnum = "platform"
)
type KfApp interface {
	Apply() error
	Delete() error
	Generate(ResourceEnum) error
	Init() error
}
```

kfctl includes 5 platforms that implement the KfApp interface.

- platform: **none** 
  - bootstrap/pkg/client/ksapp/ksapp.go
- platform: **minikube** 
  - bootstrap/pkg/client/ksapp/ksapp.go
- platform: **docker-for-desktop** 
  - bootstrap/pkg/client/ksapp/ksapp.go
- platform: **ack** 
  - bootstrap/pkg/client/ksapp/ksapp.go
- platform: **gcp**
  - bootstrap/pkg/client/gcpapp/gcpapp.go

## Usage

```man
kubeflow client tool

Usage:
  kfctl [command]

Available Commands:
  apply       Deploy a generated kubeflow application.
  delete      Delete a kubeflow application.
  generate    Generate a kubeflow application where resources is one of 'platform | k8s | all'.
  help        Help about any command
  init        Create a kubeflow application under <[path/]name>
  version     Prints the version of kfctl.

Flags:
  -h, --help   help for kfctl

Use "kfctl [command] --help" for more information about a command.
```

Typical use-case, non-platform specific. 

```sh
kfctl init ~/myapp 
cd ~/myapp
kfctl generate 
kfctl apply 
```

## Subcommands

#### _init_ (kubeflow/bootstrap/cmd/kfctl/cmd/init.go)

```
kfctl init -h
Create a kubeflow application under <[path/]name>. The <[path/]name> argument can either be a full path
or a name where the kubeflow application will be initialized in $PWD/name if <name> is not a path or in the parent
directory is name is a path.

Usage:
  kfctl init <[path/]name> [flags]

Flags:
  -h, --help              help for init
  -p, --platform string   one of 'gcp|minikube|docker-for-desktop|ack' (default "none")
      --project string    name of the gcp project if --platform gcp
  -r, --repo string       local github kubeflow repo  (default "$GOPATH/src/github.com/kubeflow/kubeflow/kubeflow")
  -v, --version string    desired version Kubeflow or latest tag if not provided by user  (default "v0.4.1")
```

#### _generate_ (kubeflow/bootstrap/cmd/kfctl/cmd/generate.go)

- Using app.yaml created by init
  - generates a platform specific application with specifics specified in app.yaml

```
Generate a kubeflow application where resources is one of 'platform | k8s | all'.

  platform: non kubernetes resources (eg --platform gcp)
  k8s: kubernetes resources
  all: both platform and k8s

The default is 'all' for any selected platform.

Usage:
  kfctl generate [resources] [flags]

Flags:
  -c, --components strings   provide a comma delimited list of component names (default [all])
  -h, --help                 help for generate
  -n, --namespace string     namespace where kubeflow will be deployed (default "kubeflow")
  -p, --packages strings     provide a comma delimited list of package names (default [all])
```

#### _apply_ (kubeflow/bootstrap/cmd/kfctl/cmd/apply.go)

- Creates a `namespace`
- Applys the ksonnet application by deploying it to the api-server

```
kfctl apply -h
Deploy a generated kubeflow application.

Usage:
  kfctl apply [flags]

Flags:
  -h, --help   help for apply
```

#### _delete_ (kubeflow/bootstrap/cmd/kfctl/cmd/delete.go)
  TBD

--- 

## Extending kfctl

`kfctl` can be extended to work with new platforms without requiring recompilation. 
An example is under bootstrap/cmd/plugins/fooapp.go. A particular platform 
provides a shared library (.so) under the env var `PLUGINS_ENVIRONMENT` 
that kfctl would load and execute. This shared library would implement 
the [KfApp Interface](#kfapp-interface). In this case running

```
kfctl init ~/foo-app --platform foo
```

will result in kfctl loading $PLUGINS_ENVIRONMENT/fooapp.so and calling its methods that 
implement the KfApp Interface.

### Building the sample plugin

```
make build-foo-plugin
```

## Testing 

### Testing init for all platforms including the `foo` platform plugin

```
make test-known-platforms-init
```

### Testing generate for all platforms including the `foo` platform plugin

```
make test-known-platforms-generate
```

## Debugging

In order to debug in goland, the plugin code must be disabled. 
See https://github.com/golang/go/issues/23733. 
This is expected to be resolved with golang 1.12.
You'll need to comment out a section in bootstrap/cmd/kfctl/cmd/root.go 
so that the plugin package is not imported. 
Change root.go (~#45) to look like below and goland debug should work.

```golang
	default:
/*
		plugindir := os.Getenv("PLUGINS_ENVIRONMENT")
		pluginpath := filepath.Join(plugindir, platform+".so")
		p, err := plugin.Open(pluginpath)
		if err != nil {
			return nil, fmt.Errorf("could not load plugin %v for platform %v Error %v", pluginpath, platform, err)
		}
		symName := "Get" + strings.ToUpper(platform[0:1]) + platform[1:] + "App"
		symbol, symbolErr := p.Lookup(symName)
		if symbolErr != nil {
			return nil, fmt.Errorf("could not find symbol %v for platform %v Error %v", symName, platform, symbolErr)
		}
		return symbol.(func(map[string]interface{}) kftypes.KfApp)(options), nil
*/
		return nil, fmt.Errorf("unknown platform %v", platform)
	}
```

## Different KfApp SubTypes

### ksonnet related types (under pkg/apis/apps/ksapp/v1alpha1)

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

Generating the app.yaml file leverages golang's template language.
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
  packages: {{.Spec.Packages}}
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

### gcp related types 

TBD

---

## gcp-click-to-deploy (no changes)

Ksonnet types have been moved to `github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksapp/v1alpha1`


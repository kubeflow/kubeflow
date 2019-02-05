# kfctl golang client

## Overview

The new `kfctl` client replaces `kfctl.sh` and is implemented in golang.

## Requirements

 - Create a common API for the UI (gcp-click-to-deploy) and `kfctl` (`KfApp`).

 - Separate different platform implementations of the [KfApp Interface](#kfapp-interface).

 - Allow new platforms to be added to kfctl without rebuilding or reshipping kfctl (see [Extending kfctl](#extending-kfctl) below).

 - Do not change existing `REST` entrypoints or the `KsService` interface in `ksServer.go` at this time.

 - Package `KfApp` interface and related types for ease of use by kfctl and (later) gcp-click-to-deploy.

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
bootstrap/pkg/client/minikube
bootstrap/plugins
```

### KfApp Interface 

Definition: github/kubeflow/kubeflow/bootstrap/pkg/client/kfapi/typed/apps/group.go

The `KfApp` golang Interface 

```golang
type ResourceEnum string
const (
	ALL      ResourceEnum = "all"
	K8S      ResourceEnum = "k8s"
	PLATFORM ResourceEnum = "platform"
)
//
// KfApp is used by commands under bootstrap/cmd/{bootstrap,kfctl}. KfApp provides a common
// API for different implementations like KsApp, GcpApp, MinikubeApp, etc.
//
type KfApp interface {
	Apply(resources ResourceEnum, options map[string]interface{}) error
	Delete(resources ResourceEnum, options map[string]interface{}) error
	Generate(resources ResourceEnum, options map[string]interface{}) error
	Init(options map[string]interface{}) error
}
```

kfctl includes platforms that implement the KfApp interface. (gcp will be added in the next phase)

- platform: **none** 
  - bootstrap/pkg/client/ksapp/ksapp.go
- platform: **minikube** 
  - bootstrap/pkg/client/minikube/minikube.go
- platform: **docker-for-desktop** (in progress)
  - bootstrap/pkg/client/dockerfordesktop/dockerfordesktop.go
- platform: **ack** (in progress)
  - bootstrap/pkg/client/ack/ack.go

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

### **init** (kubeflow/bootstrap/cmd/kfctl/cmd/init.go)

```
Create a kubeflow application under <[path/]name>. The <[path/]name> argument can either be a full path
or a name where the kubeflow application will be initialized in $PWD/name if <name> is not a path or in the parent
directory is name is a path.

Usage:
  kfctl init <[path/]name> [flags]

Flags:
  -h, --help               help for init
  -n, --namespace string   namespace where kubeflow will be deployed (default "kubeflow")
  -p, --platform string    one of 'gcp|minikube|docker-for-desktop|ack' (default "none")
      --project string     name of the gcp project if --platform gcp
  -r, --repo string        local github kubeflow repo  (default "$GOPATH/src/github.com/kubeflow/kubeflow/kubeflow")
  -V, --verbose            verbose output default is false
  -v, --version string     desired version Kubeflow or latest tag if not provided by user  (default "v0.4.1")
```

### **generate** (kubeflow/bootstrap/cmd/kfctl/cmd/generate.go)

```
Generate a kubeflow application where resources is one of 'platform | k8s | all'.

  platform: non kubernetes resources (eg --platform gcp)
  k8s: kubernetes resources
  all: both platform and k8s

The default is 'all' for any selected platform.

Usage:
  kfctl generate [all(=default)|k8s|platform] [flags]

Flags:
      --email string    email if '--platform gcp'
  -h, --help            help for generate
      --ipName string   ipName if '--platform gcp'
      --mount-local     mount-local if '--platform minikube || --platform docker-for-desktop'
  -V, --verbose         verbose output default is false
```

### **apply** (kubeflow/bootstrap/cmd/kfctl/cmd/apply.go)

```
Deploy a generated kubeflow application.

Usage:
  kfctl apply [all(=default)|k8s|platform] [flags]

Flags:
  -h, --help      help for apply
  -V, --verbose   verbose output default is false
```

### **delete** (kubeflow/bootstrap/cmd/kfctl/cmd/delete.go)

```
Delete a kubeflow application.

Usage:
  kfctl delete [all(=default)|k8s|platform] [flags]

Flags:
  -h, --help      help for delete
  -V, --verbose   verbose output default is false
```

--- 

## Extending kfctl

`kfctl` can be extended to work with new platforms without requiring recompilation. 
An example is under bootstrap/cmd/plugins/fooapp.go. A particular platform 
provides a shared library (.so) under the env var `PLUGINS_ENVIRONMENT` 
that kfctl would load and execute. The shared library needs to define 

```
func GetKfApp(options map[string]interface{}) kftypes.KfApp 
```

where the return type implements the [KfApp Interface](#kfapp-interface). 

In this sample, running

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

## KfApp Types used in app.yaml

### ksonnet related types (originally under bootstrap/cmd/bootstrap, moved to pkg/apis/apps/ksapp/v1alpha1)

```golang
type KsApp struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   KsAppSpec   `json:"spec,omitempty"`
	Status KsAppStatus `json:"status,omitempty"`
}

type NameValue struct {
	Name  string `json:"name,omitempty"`
	Value string `json:"value,omitempty"`
}

// KsAppSpec defines the desired state of KsApp
type KsAppSpec struct {
	Platform   string                 `json:"platform,omitempty"`
	Version    string                 `json:"version,omitempty"`
	Repo       string                 `json:"repo,omitempty"`
	Components []string               `json:"components,omitempty"`
	Packages   []string               `json:"packages,omitempty"`
	Parameters map[string][]NameValue `json:"parameters,omitempty"`
}
```

#### app.yaml example for --platform none --namespace kubeflow

```
apiVersion: ksapp.apps.kubeflow.org/v1alpha1
kind: KsApp
metadata:
  creationTimestamp: null
  name: ks-app
  namespace: kubeflow
spec:
  platform: none
  repo: /Users/kdkasrav/go/src/github.com/kubeflow/kubeflow/kubeflow
  version: v0.4.1
status: {}
```

## gcp-click-to-deploy (no changes)

Ksonnet types have been moved to `github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksapp/v1alpha1`


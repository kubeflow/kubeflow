# kfctl golang client

## Overview

The new `kfctl` client replaces `kfctl.sh` and is implemented in golang.

Note: Additional issues have been opened so this README.md will have additional updates.

## Requirements

 - Create a common API for the UI (gcp-click-to-deploy) and `kfctl` (`KfApp`).

 - Separate different platform implementations of the [KfApp Interface](#kfapp-interface).

 - Allow new platforms to be added to kfctl without rebuilding or reshipping kfctl (see [Extending kfctl](#extending-kfctl) below).

 - Do not change existing `REST` entrypoints or the `KsService` interface in `ksServer.go` at this time.

 - Package `KfApp` interface and related types for ease of use by kfctl and (later) gcp-click-to-deploy.

## API and Packaging

New directories

```sh
bootstrap/cmd/kfctl
bootstrap/cmd/kfctl/cmd
bootstrap/cmd/plugins/dockerfordesktop
bootstrap/pkg/apis/apps
bootstrap/pkg/apis/apps/ksonnet/v1alpha1
bootstrap/pkg/utils
bootstrap/pkg/client/dockerfordesktop
bootstrap/pkg/client/ksonnet
bootstrap/pkg/client/minikube
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
	NONE     ResourceEnum = "none"
)

//
// KfApp is used by commands under bootstrap/cmd/{bootstrap,kfctl}. KfApp provides a common
// API for different implementations like gcp and minikube
//
type KfApp interface {
	Apply(resources ResourceEnum, options map[string]interface{}) error
	Delete(resources ResourceEnum, options map[string]interface{}) error
	Generate(resources ResourceEnum, options map[string]interface{}) error
	Init(options map[string]interface{}) error
}
```

kfctl will statically include platforms that implement the KfApp interface. 
These include:

- platform: **none**
  - bootstrap/pkg/client/ksonnet/ksonnet.go
- platform: **minikube**
  - bootstrap/pkg/client/minikube/minikube.go
- platform: **gcp** 
  - bootstrap/pkg/client/gcp/gcp.go

kfctl can also dynamically load platforms that are not statically linked, as 
described below in [Extending kfctl](#extending-kfctl).

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

### **init** 

(kubeflow/bootstrap/cmd/kfctl/cmd/init.go)

```
Create a kubeflow application under <[path/]name>. The <[path/]name> argument can either be a full path
or a <name>. If just <name> a directory <name> will be created in the current directory.

Usage:
  kfctl init <[path/]name> [flags]

Flags:
  -h, --help               help for init
  -n, --namespace string   namespace where kubeflow will be deployed (default "kubeflow")
  -p, --platform string    one of 'gcp|minikube' (default "none")
      --project string     name of the gcp project if --platform gcp
  -r, --repo string        local github kubeflow repo
  -V, --verbose            verbose output default is false
  -v, --version string     desired version Kubeflow or latest tag if not provided by user  (default "master")
```

### **generate**

(kubeflow/bootstrap/cmd/kfctl/cmd/generate.go)

```
Generate a kubeflow application where resources is one of 'platform|k8s|all'.

  platform: non kubernetes resources (eg --platform gcp)
  k8s: kubernetes resources
  all: both platform and k8s

The default is 'all' for any selected platform.

Usage:
  kfctl generate [all(=default)|k8s|platform] [flags]

Flags:
      --email string      email if '--platform gcp'
  -h, --help              help for generate
      --hostname string   hostname if '--platform gcp'
      --ipName string     ipName if '--platform gcp'
      --mount-local       mount-local if '--platform minikube'
  -V, --verbose           verbose output default is false
      --zone string       zone if '--platform gcp' (default "us-east1-d")
```

### **apply** 

(kubeflow/bootstrap/cmd/kfctl/cmd/apply.go)

```
Deploy a generated kubeflow application.

Usage:
  kfctl apply [all(=default)|k8s|platform] [flags]

Flags:
  -h, --help      help for apply
  -V, --verbose   verbose output default is false
```

### **delete** 

(kubeflow/bootstrap/cmd/kfctl/cmd/delete.go)

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
An example is under bootstrap/cmd/plugins/dockerfordesktop/dockerfordesktop.go. A particular platform
provides a shared library (.so) under the env var `PLUGINS_ENVIRONMENT`
that kfctl would load and execute. The shared library needs to define

```
func GetKfApp(options map[string]interface{}) kftypes.KfApp
```

where the return type implements the [KfApp Interface](#kfapp-interface).

In this sample, running

```
kfctl init ~/dockerfordesktop --platform docker-for-desktop
```

will result in kfctl loading $PLUGINS_ENVIRONMENT/dockerfordesktop.so and calling its methods that
implement the KfApp Interface.

### Building the sample plugin

```
make build-dockerfordesktop-plugin
```

## Testing

### Testing kfctl (tests plugin functionality, `kfctl init`, `kfctl generate`)

```
make test-kfctl
```

### Testing `kfctl init` for all platforms 

```
make test-known-platforms-init
```

### Testing `kfctl generate` for all platforms 

```
make test-known-platforms-generate
```

## Debugging

In order to debug in goland, the plugin code must be disabled.
See https://github.com/golang/go/issues/23733.
This is expected to be resolved with golang 1.12.X
To disable the plugin code (which will cause dockerfordesktop.go to be linked statically in kfctl)
and allow debugging in goland run:

```
make static
```

otherwise run

```
make plugins
```

Note: the default is `make static`. Do not checkin code after doing `make plugins`.

Note: static and plugins make targets result in 2 files being changed:
- pkg/apis/apps/group.go
- cmd/kfctl/cmd/root.go

These files have comments that are toggled (effectively a golang macro hack).
This will go away when the fix noted above is available and we've moved to
this version of go.


## KfApp Types used in app.yaml

### ksonnet related types (originally under bootstrap/cmd/bootstrap, moved to pkg/apis/apps/ksonnet/v1alpha1)

```golang
type Ksonnet struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   KsonnetSpec `json:"spec,omitempty"`
	Status KsonnetStatus `json:"status,omitempty"`
}

type NameValue struct {
	Name  string `json:"name,omitempty"`
	Value string `json:"value,omitempty"`
}

// KsonnetSpec defines the desired state of Ksonnet
type KsonnetSpec struct {
	Platform   string                 `json:"platform,omitempty"`
	Version    string                 `json:"version,omitempty"`
	Repo       string                 `json:"repo,omitempty"`
	Components []string               `json:"components,omitempty"`
	Packages   []string               `json:"packages,omitempty"`
	Parameters map[string][]NameValue `json:"parameters,omitempty"`
}
```

#### app.yaml example for --platform minikube 

```
apiVersion: ksonnet.apps.kubeflow.org/v1alpha1
kind: Ksonnet
metadata:
  creationTimestamp: null
  name: minikube
  namespace: kubeflow
spec:
  appdir: /Users/kdkasrav/go/src/github.com/kubeflow/kubeflow/bootstrap/ksonnet
  platform: minikube
  repo: /Users/kdkasrav/go/src/github.com/kubeflow/kubeflow/bootstrap/ksonnet/.cache/master/kubeflow
  version: master
status: {}
```

## gcp-click-to-deploy (no changes)

Ksonnet types have been moved to `github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksonnet/v1alpha1`


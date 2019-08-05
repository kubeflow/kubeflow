<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [kfctl golang client](#kfctl-golang-client)
  - [Overview](#overview)
  - [Requirements](#requirements)
  - [API and Packaging](#api-and-packaging)
    - [KfApp Interface](#kfapp-interface)
  - [Usage](#usage)
  - [Subcommands](#subcommands)
    - [**init**](#init)
    - [**generate**](#generate)
    - [**apply**](#apply)
    - [**delete**](#delete)
  - [Extending kfctl](#extending-kfctl)
    - [Building the sample plugin](#building-the-sample-plugin)
  - [Testing](#testing)
    - [Testing kfctl (tests plugin functionality, `kfctl init`, `kfctl generate`)](#testing-kfctl-tests-plugin-functionality-kfctl-init-kfctl-generate)
    - [Testing `kfctl init` for all platforms](#testing-kfctl-init-for-all-platforms)
    - [Testing `kfctl generate` for all platforms](#testing-kfctl-generate-for-all-platforms)
  - [gcp-click-to-deploy (no changes)](#gcp-click-to-deploy-no-changes)
  - [golang modules and versioned packages](#golang-modules-and-versioned-packages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# kfctl golang client

## Overview

The new `kfctl` client replaces `kfctl.sh` and is implemented in golang.

**Note**: This README.md will be updated on an ongoing basis to reflect features, bug fixes.

## Requirements

 - Create a common API for the UI (gcp-click-to-deploy) and `kfctl` (`KfApp`).

 - Separate different platform implementations of the [KfApp Interface](#kfapp-interface).

 - Separate different package manager implementations of the [KfApp Interface](#kfapp-interface).
 
 - Allow new platforms to be added to kfctl without rebuilding or reshipping kfctl (see [Extending kfctl](#extending-kfctl) below).

 - Do not change existing `REST` entrypoints or the `KsService` interface in `ksServer.go` at this time.

 - Package `KfApp` interface and related types for ease of use by kfctl and (later) gcp-click-to-deploy.

## API and Packaging

### KfApp Interface

The `KfApp` golang Interface is defined below:

```golang
type ResourceEnum string

const (
	ALL      ResourceEnum = "all"
	K8S      ResourceEnum = "k8s"
	PLATFORM ResourceEnum = "platform"
)

//
// KfApp is used by commands under bootstrap/cmd/{bootstrap,kfctl}. KfApp provides a common
// API for different platforms implementations like gcp and minikube. 
// KfApp is also implemented by different package managers (ksonnet, kustomize).
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

- platform: **minikube**
  - bootstrap/v3/pkg/client/minikube/minikube.go
- platform: **gcp** 
  - bootstrap/v3/pkg/client/gcp/gcp.go

kfctl also statically links package managers that are used by the platforms.
This includes:

- package manager: **kustomize** 
  - bootstrap/v3/pkg/client/kustomize/kustomize.go

kfctl can dynamically load platforms and package managers that are not statically linked, as 
described below in [Extending kfctl](#extending-kfctl).

## Usage

```
A client CLI to create kubeflow applications for specific platforms or 'on-prem'
to an existing k8s cluster.

Usage:
  kfctl [command]

Available Commands:
  apply       Deploy a generated kubeflow application.
  completion  Generate shell completions
  delete      Delete a kubeflow application.
  generate    Generate a kubeflow application where resources is one of 'platform|k8s|all'.
  help        Help about any command
  init        Create a kubeflow application under <[path/]name>
  show        Show a generated kubeflow application.
  version     Print the version of kfctl.

Flags:
  -h, --help   help for kfctl

Use "kfctl [command] --help" for more information about a command.
```

Typical use-case, non-platform specific.

```sh
kfctl init ~/myapp && \
cd ~/myapp && \
kfctl generate all && \
kfctl apply all
```

## Subcommands

### **init** 

(kubeflow/bootstrap/cmd/kfctl/cmd/init.go)

```
Create a kubeflow application under <[path/]name>. The <[path/]name> argument can either be a full path
or a <name>. If just <name>, a directory <name> will be created in the current directory.

Usage:
  kfctl init <[path/]name> [flags]

Flags:
      --config string            Static config file to use. Can be either a local path or a URL.
                                 For example:
                                 --config=https://raw.githubusercontent.com/kubeflow/kubeflow/master/bootstrap/config/kfctl_platform_existing.yaml
                                 --config=kfctl_platform_gcp.yaml
      --disable_usage_report     disable_usage_report disable anonymous usage reporting.
  -h, --help                     help for init
  -n, --namespace string         namespace where kubeflow will be deployed (default "kubeflow")
      --package-manager string   'kustomize[@version]' (default "kustomize")
  -p, --platform string          one of 'aws|gcp|minikube'
      --project string           name of the gcp project if --platform gcp
  -r, --repo string              local github kubeflow repo
      --skip-init-gcp-project    Set if you want to skip project initialization. Only meaningful if --platform gcp. Default to false
      --use_basic_auth           use_basic_auth use basic auth service instead of IAP.
      --use_istio                use_istio use istio for auth and traffic routing. (default true)
  -V, --verbose                  verbose output default is false
  -v, --version string           desired version of Kubeflow or master if not specified. Version can be master (eg --version master) or a git tag (eg --version=v0.5.0), or a PR (eg --version pull/<id>). (default "master")
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
$ ☞
$ ☞
$ ☞
$ ☞
$ ☞  kfctl help apply
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

`kfctl` can be extended to work with new platforms or package managers without requiring recompilation.
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
make test-init
```

### Testing `kfctl generate` for all platforms 

```
make test-generate
```

## gcp-click-to-deploy (no changes)

References to Ksonnet types have been removed

## golang modules and versioned packages

kustomize leverages golang modules by declaring a 'v3' version in go.mod 


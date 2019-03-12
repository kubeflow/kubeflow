# kfctl golang client

## Overview

The new `kfctl` client replaces `kfctl.sh` and is implemented in golang.

Note: This README.md will be updated on an ongoing basis to reflect features, bug fixes.

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
  - bootstrap/pkg/client/minikube/minikube.go
- platform: **gcp** 
  - bootstrap/pkg/client/gcp/gcp.go

kfctl also statically links package managers that are used by the platforms
These include:

- package manager: **ksonnet**
  - bootstrap/pkg/client/ksonnet/ksonnet.go
- package manager: **kustomize** 
  - bootstrap/v2/pkg/client/kustomize/kustomize.go

kfctl can dynamically load platforms and package managers that are not statically linked, as 
described below in [Extending kfctl](#extending-kfctl).

## Usage

```kubeflow client tool
   
   Usage:
     kfctl [command]
   
   Available Commands:
     apply       Deploy a generated kubeflow application.
     delete      Delete a kubeflow application.
     generate    Generate a kubeflow application where resources is one of 'platform|k8s|all'.
     help        Help about any command
     init        Create a kubeflow application under <[path/]name>
     show        Deploy a generated kubeflow application.
     version     Prints the version of kfctl.
   
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
      --zone string       zone if '--platform gcp' (default "us-east1-d")```
```

### **apply** 

(kubeflow/bootstrap/cmd/kfctl/cmd/apply.go)

```
Deploy a generated kubeflow application.

Usage:
  kfctl apply [all(=default)|k8s|platform] [flags]

Flags:
  -h, --help                  help for apply
      --oauth_id string       OAuth Client ID, GCP only. Required if ENV CLIENT_ID is not set. Value passed will take precedence to ENV.
      --oauth_secret string   OAuth Client ID, GCP only. Required if ENV CLIENT_SECRET is not set. Value passed will take precedence to ENV.
  -V, --verbose               verbose output default is false```

### **delete** 

(kubeflow/bootstrap/cmd/kfctl/cmd/delete.go)

```
Delete a kubeflow application.

Usage:
  kfctl delete [all(=default)|k8s|platform] [flags]

Flags:
  -h, --help      help for delete
  -V, --verbose   verbose output default is false```

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

#### app.yaml example for --platform gcp 

```
apiVersion: client.apps.kubeflow.org/v1alpha1
kind: Client
metadata:
  creationTimestamp: null
  name: gcp
  namespace: kubeflow
spec:
  appdir: /Users/kdkasrav/go/src/github.com/kubeflow/kubeflow/bootstrap/test/gcp
  componentParams:
    application:
    - name: components
      value: <list-of-components>
    cert-manager:
    - initRequired: true
      name: acmeEmail
      value: gcp-deploy@constant-cubist-173123.iam.gserviceaccount.com
    cloud-endpoints:
    - name: secretName
      value: admin-gcp-sa
    iap-ingress:
    - initRequired: true
      name: ipName
      value: gcp-ip
    - initRequired: true
      name: hostname
      value: gcp.endpoints.constant-cubist-173123.cloud.goog
    jupyter:
    - name: jupyterHubAuthenticator
      value: iap
    - name: platform
      value: gke
    pipeline:
    - name: mysqlPd
      value: gcp-storage-metadata-store
    - name: minioPd
      value: gcp-storage-artifact-store
  components:
    - ambassador
    - application
    - argo
    - centraldashboard
    - cert-manager
    - cloud-endpoints
    - iap-ingress
    - jupyter
    - jupyter-web-app
    - katib
    - metacontroller
    - notebook-controller
    - pipeline
    - pytorch-operator
    - tensorboard
    - tf-job-operator
    email: gcp-deploy@constant-cubist-173123.iam.gserviceaccount.com
    hostname: gcp.endpoints.constant-cubist-173123.cloud.goog
    ipName: gcp-ip
    packages:
    - application
    - argo
    - common
    - examples
    - gcp
    - jupyter
    - katib
    - metacontroller
    - modeldb
    - mpi-job
    - pipeline
    - pytorch-job
    - seldon
    - tensorboard
    - tf-serving
    - tf-training
    platform: gcp
      project: XXXXXX
      repo: /Users/kdkasrav/go/src/github.com/kubeflow/kubeflow/bootstrap/test/gcp/.cache/2673/kubeflow
      useBasicAuth: false
      version: "2673"
      zone: us-east1-d
    status: {}
  ```

## gcp-click-to-deploy (no changes)

Ksonnet types have been moved to `github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksonnet/v1alpha1`

## golang modules and versioned packages

Both ksonnet and kustomize package managers are loaded as .so's.
(They will be statically linked soon see [#2635](https://github.com/kubeflow/kubeflow/issues/2635))
The complication is that ksonnet and kustomize do not have an overlap of kubernetes versions as well 
as client-go, and controller-runtime.

- **ksonnet** (highest version)
  - k8s.io/api kubernetes-1.10.4
  - k8s.io/apimachinery kubernetes-1.10.4
  - k8s.io/client-go v7.0.0
  - sigs.k8s.io/controller-runtime v0.1.1

- **kustomize** (cannot downgrade to kubernetes-1.10.4, client-go v7.0.0)
  - k8s.io/api kubernetes-1.13.4
  - k8s.io/apimachinery kubernetes-1.13.4
  - k8s.io/client-go v10.0.0
  - sigs.k8s.io/controller-runtime v0.1.10

kustomize leverages golang modules by using 'v2' versions of 
the above libraries.

We insert golang package versioning for these libraries despite the fact that kubernetes has yet to move to golang modules. Updating these libraries to use golang modules is straight-forward and can be done using local git clones. Background information on how this is done can be found [here](https://github.com/golang/go/wiki/Modules#releasing-modules-v2-or-higher).

Currently a build artifact was hand built and checked into PR #2548 as bootstrap/hack/v2.zip.
This build artifact holds versioned packages for the above libraries. This hand-built artifact needs to be removed and replaced with a golang tool such as [mod](https://github.com/marwan-at-work/mod) that can do this algorithmically and as part of building kfctl.  

The  [mod](https://github.com/marwan-at-work/mod) tool needs to be modified in the following ways:
1. Update literal references to versioned packages as found [here](https://github.com/kubernetes/api/blob/kubernetes-1.13.4/apps/v1/generated.pb.go#L62) and [here](https://github.com/kubernetes/api/blob/kubernetes-1.13.4/apps/v1/generated.pb.go#L63).
2. Move a subset of libraries tagged as [+incompatible](https://groups.google.com/forum/#!topic/golang-codereviews/t-xcPhCn3FI) within the go.mod file, instead of all of them.
3. Create a local archive of these versioned packages 
4. Update go.mod files that reference the versioned packages with a replace directive pointing to the the local archive location. 
5. Do not update the git repos or push changes back to git

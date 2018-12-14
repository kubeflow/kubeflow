# kfctl golang client

## Overview

The kfctl golang client will provide a CLI similar to kfctl.sh but will 
address the following deficits in the current tool

1. No longer require a local install of ks (ksonnet)
2. No longer require knowledge of the ks CLI 
3. No longer save a ksonnet application to the user's filesystem
4. Work in a similar way as the kubeflow UI [gcp-click-to-deploy](https://github.com/kubeflow/kubeflow/tree/master/components/gcp-click-to-deploy):
  - Execution of subcommands `init`, `generate`, `apply` and `delete` are done by the bootstrapper.
  - A local `<kf_app>.yaml` defines a kubeflow application. 
  - This yaml file is submitted to the bootstrapper which will then generate the ksonnet application.

## Usage

The initial version of kfctl will seek parity with kfctl.sh by implementing the following subcommands:
- `init`            Initialize a kubeflow application.
- `generate`        Generate the k8 manifests of the kubeflow application.
- `apply`           Submit the k8 manifests to the api-server
- `delete`          Delete the kubeflow application

The current usage of `kfctl.sh` is as follows:

```sh
kfctl.sh init myapp --platform generatic
cd myapp
kfctl.sh generate all
kfctl.sh apply all
```

kfctl (golang) basic usage is similar:

```sh
kfctl init myapp 
# edit myapp.yaml to set the appAddress and optionally add components and/or parameters
kfctl generate -f myapp.yaml all
kfctl apply -n myapp all
```

### Differences with kfctl.sh

The `init` subcommand will create a `<name>.yaml` file that is used as input to the `generate` subcommand.
The user modifies `<name>.yaml` to set the address of the bootstrapper service and optionally add 
additional components and/or parameters. The `<name>.yaml` will use a similar field structure as what 
the UI uses in [kf_app.yaml](https://github.com/kubeflow/kubeflow/blob/master/components/gcp-click-to-deploy/manifest/kf_app.yaml). This type will have a golang definition that is a kubernetes kind within the group `app.kubeflow.org`. 

```golang
type Application struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty" 

	AppAddress string     `json:"appaddress,omitempty"`
	DefaultApp DefaultApp `json:"defaultapp:omitempty"`
}

type DefaultApp struct {
	Components []KsComponent `json:"components,omitempty"`
	Parameters []KsParameter `json:"parameters,omitempty"`
	Registries []KsRegistry  `json:"registries,omitempty"`
}

type KsComponent struct {
	Name      string `json:"name"`
	Prototype string `json:"prototype"`
}

type KsParameter struct {
	Component string `json:"component,omitempty"`
	Name      string `json:"name,omitempty"`
	Value     string `json:"value:omitempty"`
}

type KsRegistry struct {
	ApiVersion string
	Kind       string
	Libraries  map[string]LibrarySpec
}
```

## Use cases

### Initialize a kubeflow application

```sh
kfctl init myapp 
```

The generated `myapp.yaml` will contain the following:

```yaml
apiVersion: app.kubeflow.org/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: kubeflow
appaddress: # address of bootstrapper service
defaultapp:
  components:
  - name: ambassador
    prototype: ambassador
  - name: centraldashboard
    prototype: centraldashboard
  - name: jupyter
    prototype: jupyter
  parameters:
  - component: ambassador
    name: ambassadorServiceType
    value: LoadBalancer
  registries:
  - name: kubeflow
    repo: https://github.com/kubeflow/kubeflow
    version: github.com/kubeflow/kubeflow@v0.3.4
    path: kubeflow
```

The user will then edit this file and provide the URL of the bootstrapper

### Generate a kubeflow application

```sh
kfctl generate -f myapp.yaml all
```

### Deploy a kubeflow application

```sh
kfctl apply --name myapp all
```

# kfctl golang client

## Overview

The kfctl golang client will provide the same CLI as kfctl.sh but will 
be implemented in golang. The port to golang is because:

1. The UI (gcp-click-to-deploy) and kfctl should share the same ksonnet code when creating a kubeflow application.
2. This common code will serve as a base for later efforts like migrating to ksonnet modules.
3. New subcommands should be done in golang rather than bash so they can also be used by the UI.

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

kfctl (golang) usage is identical:

```sh
kfctl init myapp 
cd myapp
kfctl generate all
kfctl apply all
```


## Golang Types

```
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

### Generate a kubeflow application

```sh
kfctl generate -f myapp.yaml all
```


### Deploy a kubeflow application

```sh
kfctl apply --name myapp all
```



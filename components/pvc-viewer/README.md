# PVCViewer
Using this component, PVCViewers can easily be created. PVCViewers enable users to open a filebrowser on arbitrary persistent volume claims, letting them inspect, download, upload and manipulate data. 

The PVCViewer API is meant to be extensible and can easily be user for other use-cases, such as launching user-tailored apps (e.g. tensorboards or notebooks).

Find the [Pull Request for more info here](https://github.com/kubeflow/kubeflow/pull/6876).

## Description
The component is meant to be used in interaction with other components, such as the volumes web app. These are to create an instance of the custom resource.
The controller will then generate deployments, services and virtualservices base on the spec.

A resource starting a filebrowser might look like this:

```yaml
apiVersion: kubeflow.org/v1alpha1
kind: PVCViewer
metadata:
  name: pvcviewer-sample
  namespace: kubeflow-user-example-com
spec:
  # The podSpec is applied to the deployment.Spec.Template.Spec
  # and thus, represents the core viewer's application
  podSpec:
    # Your pod spec here
  networking:
    # Specifies the application's target port used by the Service
    targetPort: 8080
    # If defined, an istio VirtualService is created, pointing to the Service
    virtualService:
      # The base prefix is suffixed by '/namespace/name' to create the
      # VirtualService's prefix and a unique URL for each started viewer
      basePrefix: "/pvcviewer"
      # You may specify the VirtualService's rewrite.
      # If not set, the prefix's value is used
      rewrite: "/"
      # By default, no timeout is set
      # timeout: 30s
  rwoScheduling:
    # If set to true, the controller detects RWO-Volumes referred to by the
    # podSpec and uses affinities to schedule the viewer to nodes
    # where the volume is currently mounted. This enables the viewer to
    # access RWO-Volumes, even though they might already be mounted.
    enabled: true
    # Using the rwoScheduling feature, the viewer might block other application
    # from (re-starting). Setting restart to true instructs the controller to
    # re-compute the affinity in case Pods start using the viewer's RWO-Volumes.
    # Thus, the viewer might restart on another node without blocking new Pods.
    restart: true
```

## Getting Started
You’ll need a Kubernetes cluster to run against. You can use [KIND](https://sigs.k8s.io/kind) to get a local cluster for testing, or run against a remote cluster.
**Note:** Your controller will automatically use the current context in your kubeconfig file (i.e. whatever cluster `kubectl cluster-info` shows).

### Running on the cluster
1. Install Instances of Custom Resources:

```sh
kubectl apply -f config/samples/
```

2. Build and push your image to the location specified by `IMG`:
	
```sh
make docker-build docker-push IMG=<some-registry>/pvc-viewer:tag
```
	
3. Deploy the controller to the cluster with the image specified by `IMG`:

```sh
make deploy IMG=<some-registry>/pvc-viewer:tag
```

### Uninstall CRDs
To delete the CRDs from the cluster:

```sh
make uninstall
```

### Undeploy controller
UnDeploy the controller to the cluster:

```sh
make undeploy
```

## Contributing
See the parent repository for more info on how to contribute.

### How it works
This project aims to follow the Kubernetes [Operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)

It uses [Controllers](https://kubernetes.io/docs/concepts/architecture/controller/) 
which provides a reconcile function responsible for synchronizing resources untile the desired state is reached on the cluster 

### Test It Out
1. Install the CRDs into the cluster:

```sh
make install
```

2. Run your controller (this will run in the foreground, so switch to a new terminal if you want to leave it running):

```sh
make run
```

**NOTE:** You can also run this in one step by running: `make install run`

### Modifying the API definitions
If you are editing the API definitions, generate the manifests such as CRs or CRDs using:

```sh
make manifests
```

**NOTE:** Run `make --help` for more information on all potential `make` targets

More information can be found via the [Kubebuilder Documentation](https://book.kubebuilder.io/introduction.html)

## License

Copyright 2023.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


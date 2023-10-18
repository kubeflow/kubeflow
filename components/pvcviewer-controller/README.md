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
  # The PVC we are watching
  pvc: pvcviewer-sample
  # The podSpec is applied to the deployment.Spec.Template.Spec
  # and thus, represents the core viewer's application
  # Gets set to a default PodSpec, if not specified
  # podSpec: {}
  # If defined, the viewer will be exposed via a Service and a VirtualService
  networking:
    # Specifies the application's target port used by the Service
    targetPort: 8080
    # The base prefix is suffixed by '/namespace/name' to create the
    # VirtualService's prefix and a unique URL for each started viewer
    basePrefix: "/pvcviewer"
    # You may specify the VirtualService's rewrite.
    # If not set, the prefix's value is used
    rewrite: "/"
    # By default, no timeout is set
    # timeout: 30s
  # If set to true, the controller detects RWO-Volumes referred to by the
  # podSpec and uses affinities to schedule the viewer to nodes
  # where the volume is currently mounted. This enables the viewer to
  # access RWO-Volumes, even though they might already be mounted.
  rwoScheduling: true
```

## Configuring Default values

You may set a `spec.podSpec` to gain control over the started filebrowser. 

In case the podSpec is omitted, a default podSpec is inferred.
You may change the defaults by having the manager mount a config file with defaults and setting the env-variable `DEFAULT_POD_SPEC_PATH`. 

This is especially useful, when you can't control the creation of the `PVCViewer` object, e.g. since it's automatically created by another component such as the volumes UI.

## How it works
This project aims to follow the Kubernetes [Operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/).

It uses [controllers](https://kubernetes.io/docs/concepts/architecture/controller/) to watch all changes to viewer objects and react accordingly. 
Technically, this is implemented by the reconcile loop: it syncs resources until the desired state is reached on the cluster.

## Modifying the API definitions
If you are editing the API definitions, generate the manifests such as CRs or CRDs using:

```sh
make manifests
```

## Testing 

In order to test the controller, simply execute:

```sh
make test
```

## Installing the Controller

You’ll need a Kubernetes cluster to run against.

Also, Istio and Cert-Manager need to be installed. 
We recommend installing Kubeflow as it bundles all required components.

1. Install the default config using Kustomize:

```sh
kubectl apply -k config/default
```

2. Build the controller image:
	
```sh
docker build -t kubeflow-pvc-viewer:test .
```
	
3. Set the controller to use the image:

```sh
kubectl -n kubeflow set image deployment pvc-viewer-controller-manager manager=kubeflow-pvc-viewer:test
```

4. Deploy the example:

```sh
kubectl apply -k config/samples
```

After the viewer has been launched, you should be able to open the filebrowser in your browser at `/pvcviewer/kubeflow-user-example-com/pvcviewer-sample/files/`.
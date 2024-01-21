# Notebook Controller

The controller allows users to create a custom resource "Notebook" (jupyter
notebook).

It has been developed using **Golang** and
**[Kubebuilder](https://book.kubebuilder.io/quick-start.html)**.

## Spec

The user needs to specify the PodSpec for the Jupyter notebook.
For example:

```yaml
apiVersion: kubeflow.org/v1
kind: Notebook
metadata:
  name: my-notebook
spec:
  template:
    spec:
      containers:
        - name: my-notebook
          image: kubeflownotebookswg/jupyter:master
```

The required fields are `containers[0].image` and (`containers[0].command` and/or `containers[0].args`).
That is, the user should specify what and how to run.

All other fields will be filled in with default value if not specified.

## Environment parameters
|Parameter | Description |
| --- | --- |
|ADD_FSGROUP| If the value is true or unset, fsGroup: 100 will be included in the pod's security context. If this value is present and set to false, it will suppress the automatic addition of fsGroup: 100 to the security context of the pod.|
|DEV| If the value is false or unset, then the default implementation of the Notebook Controller will be used. If the admins want to use a custom implementation from their local machine, they should set this value to true.|



## Commandline parameters

`metrics-addr`: The address the metric endpoint binds to. The default value is `:8080`.

`probe-addr`: The address the health endpoint binds to. The default value is `:8081`.

`enable-leader-election`: Enable leader election for controller manager. Enabling this will ensure there is only one active controller manager. The default value is `false`.

## Implementation detail

This part is WIP as we are still developing.

Under the hood, the controller creates a StatefulSet to run the notebook instance, and a Service for it.

## Build, Run, Deploy

You’ll need a Kubernetes cluster to run against. You can use [KIND](https://sigs.k8s.io/kind) to get a local cluster for testing, or run against a remote cluster.

**Note:** Your controller will automatically use the current context in your kubeconfig file (i.e. whatever cluster `kubectl cluster-info` shows).

### Create a Docker image and deploy it (Suggested)

The Makefile will use the `notebook-controller:<commit-hash>`, if you want to use a different image name of tag then simply change that line in the beginning of the makefile. Build and push your image to the location specified by `IMG` and `TAG`:
	
```sh
make docker-build docker-push IMG=<some-registry>/notebook-controller TAG=<some-tag>
```
	
The Makefile has a `deploy` rule that will build and push the Docker image, create a `notebook-controller-system` namespace and finally generate and apply the necessary YAMLs. Deploy the controller to the cluster with the image specified by `IMG` and `TAG`:

```sh
make deploy IMG=<some-registry>/notebook-controller TAG=<some-tag>
```

Verify that the controller is running in the `notebook-controller-system` namespace:

```
$ kubectl get pods -l app=notebook-controller -n notebook-controller-system
NAME                                             READY   STATUS    RESTARTS   AGE
notebook-controller-deployment-564d76877-mqsm8   1/1     Running   0          16s
```

### Build and Run the Controller locally
In order to build the controller you will need to use Go 1.17 and up in order to have Go Modules support. You will also need to have a k8s cluster.

1. Install the CRDs into the cluster:

```sh
make install
```

2. Run your controller (this will run in the foreground, so switch to a new terminal if you want to leave it running):

```sh
make run
```

3. To run with culling first you need:

i) Proxy requests from localhost to NotebookPod Service (this will run in the foreground, so switch to a new terminal:
```sh
kubectl proxy
```

ii) Apply an AuthorizationPolicy to grant appropriate access privileges for the /api/kernels endpoint:
```sh
kubectl apply -f hack/dev_culling_authorization_policy.yaml
```

iii) run the controller locally:
```sh
make run-culling
```

### Clean-up

Uninstall the notebook controller manager:

```
make undeploy
```

Uninstall the `notebooks.kubeflow.org` CRD:

```
make uninstall
```



## Contributing

[https://www.kubeflow.org/docs/about/contributing/](https://www.kubeflow.org/docs/about/contributing/)

### Development Environment

To develop on `notebook-controller`, your environment must have the following:

- [go](https://golang.org/dl/) version v1.17+.
- [docker](https://docs.docker.com/install/) version 20.10+.
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) version 1.22.0+.
- [kustomize](https://sigs.k8s.io/kustomize/docs/INSTALL.md) version 3.8.7+.
- [kubernetes](https://github.com/kubernetes-sigs/kind) Access to a Kubernetes v1.22.0+ cluster.
- [kubebuilder](https://book.kubebuilder.io/quick-start.html#installation) version 3.3.0+.

In order for the custom Notebook Controller to be functional from your local machine,
the admins must:

1. Set the number of replicas to zero:
   ```
   kubectl edit deployment notebook-controller-deployment -n=kubeflow
   ```
2. Allow the controller to proxy the traffic to the Notebook Services by executing on your local machine:
   ```
   kubectl proxy
   ```
3. Start the manager locally in developer mode:
   ```
   export DEV="true"
   make run
   ```

### Testing

Make sure all the tests are passing after you add a new feature:

```
make test
```

## TODO

- e2e test (we have one testing the jsonnet-metacontroller one, we should make it run on this one)
- `status` field should reflect the error if there is any. See [#2269](https://github.com/kubeflow/kubeflow/issues/2269).
- Istio integration (controller will generate istio resources to secure each user's notebook)
- CRD [validation](https://github.com/kubeflow/kubeflow/blob/master/kubeflow/jupyter/notebooks.schema)
- `ttlSecondsAfterFinished`: This is in the original jsonnet controller spec, but not being used yet. I think we want to cleanup the notebook after idle?
- Add more instructions on contributing like build,deploy and test locally.
- A script for installing all deps.

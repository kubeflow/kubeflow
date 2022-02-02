# Notebook Controller

The controller allows users to create a custom resource "Notebook" (jupyter notebook).
We originally wrote the controller using jsonnet and metacontroller, but are migrating to golang and
Kubebuilder here. See [discussion](https://github.com/kubeflow/kubeflow/issues/2269).

## Spec

The user needs to specify the PodSpec for the jupyter notebook.
For example:

```
apiVersion: kubeflow.org/v1alpha1
kind: Notebook
metadata:
  name: my-notebook
  namespace: test
spec:
  template:
    spec:  # Your PodSpec here
      containers:
      - image: gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.3.0
        args: ["start.sh", "lab", "--LabApp.token=''", "--LabApp.allow_remote_access='True'",
               "--LabApp.allow_root='True'", "--LabApp.ip='*'",
               "--LabApp.base_url=/test/my-notebook/",
               "--port=8888", "--no-browser"]
        name: notebook
      ...
```

The required fields are `containers[0].image` and (`containers[0].command` and/or `containers[0].args`).
That is, the user should specify what and how to run.

All other fields will be filled in with default value if not specified.

## Environment parameters

ADD_FSGROUP: If the value is true or unset, fsGroup: 100 will be included
in the pod's security context. If this value is present and set to false, it will suppress the
automatic addition of fsGroup: 100 to the security context of the pod.

## Commandline parameters

`metrics-addr`: The address the metric endpoint binds to. The default value is `:8080`.

`enable-leader-election`: Enable leader election for controller manager. Enabling this will ensure there is only one active controller manager. The default value is `false`.

## Implementation detail

This part is WIP as we are still developing.

Under the hood, the controller creates a StatefulSet to run the notebook instance, and a Service for it.

## Contributing

[https://www.kubeflow.org/docs/about/contributing/](https://www.kubeflow.org/docs/about/contributing/)

### Development Environment

To develop on `notebook-controller`, your environment must have the following:

- [go](https://golang.org/dl/) version v1.15+.
- [docker](https://docs.docker.com/install/) version 17.03+.
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) version v1.11.3+.
- [kustomize](https://sigs.k8s.io/kustomize/docs/INSTALL.md) v3.1.0+
- Access to a Kubernetes v1.11.3+ cluster.
- [kubebuilder](https://book.kubebuilder.io/quick-start.html#installation)

## TODO

- e2e test (we have one testing the jsonnet-metacontroller one, we should make it run on this one)
- `status` field should reflect the error if there is any. See [#2269](https://github.com/kubeflow/kubeflow/issues/2269).
- Istio integration (controller will generate istio resources to secure each user's notebook)
- CRD [validation](https://github.com/kubeflow/kubeflow/blob/master/kubeflow/jupyter/notebooks.schema)
- `ttlSecondsAfterFinished`: This is in the original jsonnet controller spec, but not being used yet. I think we want to cleanup the notebook after idle?
- Add more instructions on contributing like build,deploy and test locally.
- A script for installing all deps.

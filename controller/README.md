# Kubeflow Controller

## Goals

- Have a common client API (gcp-click-to-deploy and kfctl.sh)
- Define and manipulate ksonnet apps without requiring ksonnet installation on the client
- CRUD operations on an Application CRD which results in modifications to the underlying ksonnet app
- Use ksonnet modules which can nest ksonnet components
- Migrate kfctl.sh to kfctl (golang)

## Use Cases

- Openvino use case - need to add the openvino component within it’s pipeline. Since the dls.pipeline is static, the ContainerOp will need to add a new component to the current kubeflow application. Is it possible to have a dynamic dag in the pipeline dsl?
- Seldon use case where seldon was deployed as a new component after the initial deployment
- Coach RL use case (TBD)


## Changes

- Define an Application kind for kubeflow using existing types from bootstrapper
- Migrate bootstrapper to this controller



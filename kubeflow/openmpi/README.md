# Open MPI

Prototypes for running Open MPI jobs with Kubernetes.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Quickstart](#quickstart)
- [GPU Training](#gpu-training)
- [Running Horovod](#running-horovod)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quickstart

1. Create a Kubernetes cluster and install the ksonnet CLI (see root-level [README](https://github.com/kubeflow/kubeflow/blob/master/README.md)).

1. Build and push your docker image containing [Open MPI](https://www.open-mpi.org/). 

1. Run the following commands to generate and deploy the openmpi component.

```
# Create a namespace for kubeflow deployment.
NAMESPACE=kubeflow
kubectl create namespace ${NAMESPACE}

# Generate one-time ssh keys used by Open MPI.
SECRET=openmpi-secret
mkdir -p .tmp
yes | ssh-keygen -N "" -f .tmp/id_rsa
kubectl delete secret ${SECRET} -n ${NAMESPACE} || true
kubectl create secret generic ${SECRET} -n ${NAMESPACE} --from-file=id_rsa=.tmp/id_rsa --from-file=id_rsa.pub=.tmp/id_rsa.pub --from-file=authorized_keys=.tmp/id_rsa.pub

# Which version of Kubeflow to use.
# For a list of releases refer to:
# https://github.com/kubeflow/kubeflow/releases
VERSION=master

# Initialize a ksonnet app. Set the namespace for it's default environment.
APP_NAME=openmpi
ks init ${APP_NAME}
cd ${APP_NAME}
ks env set default --namespace ${NAMESPACE}

# Install Kubeflow components.
ks registry add kubeflow github.com/kubeflow/kubeflow/tree/${VERSION}/kubeflow
ks pkg install kubeflow/openmpi@${VERSION}

# See the list of supported parameters.
ks prototype describe openmpi

# Generate openmpi components.
COMPONENT=openmpi
IMAGE=YOUR_IMAGE_HERE
WORKERS=4
GPU=0
EXEC="mpiexec -n ${WORKERS} --hostfile /kubeflow/openmpi/assets/hostfile --allow-run-as-root --display-map --tag-output --timestamp-output sh -c 'echo hello world'"
ks generate openmpi ${COMPONENT} --image ${IMAGE} --secret ${SECRET} --workers ${WORKERS} --gpu ${GPU} --exec "${EXEC}" 

# Deploy to your cluster. 
ks apply default

# Inspect the pod status.
kubectl get pod -n ${NAMESPACE} -o wide
kubectl logs -n ${NAMESPACE} -f ${COMPONENT}-master

# Clean up.
ks delete default
```

## GPU Training
It is recommended to set up a auto-scaling node pool to host your GPUs so that GPU nodes can be provisioned and released
based on the demands of the workloads. To account for longer time to provision the GPU nodes, you may need to increase
`--initTimeout`. If you have more than one node pool with different types of GPUs, specify `--nodeSelector` to assign
the workloads to the correct pool. You may also set cpu and memory limit to further restrict the resource limits of your workloads.   
```
ks prototype describe openmpi
  --gpu=<gpu>                               Number of GPUs per worker. [default: 0, type: number]
  --cpu=<cpu>                               CPU limits per worker. [default: null, type: string]
  --memory=<memory>                         Memory limits per worker. [default: null, type: string]
  --nodeSelector=<nodeSelector>             Comma-delimited list of "key=value" pairs to select the worker nodes. e.g. "cloud.google.com/gke-accelerator=nvidia-tesla-k80" [default: null, type: string]
  --initTimeout=<initTimeout>               Timeout in seconds to abort the initialization. [default: 300, type: number]
```

## Running Horovod

[Horovod](https://github.com/uber/horovod) is a distributed training framework for TensorFlow/Keras/PyTorch. You may use this package to run Horovod on Open MPI.

1. Create a cluster with GPUs (see [here](https://cloud.google.com/kubernetes-engine/docs/concepts/gpus) for Google Cloud instructions).

1. Build and push the Horovod docker image (see [docker.md](https://github.com/uber/horovod/blob/master/docs/docker.md)).

1. Follow the steps in [Quickstart](#quickstart) and use a different entry point.

```
# See https://hub.docker.com/r/uber/horovod/tags/ for available tags.
IMAGE=uber/horovod:0.13.0-tf1.8.0-torch0.4.0-py2.7

# Use one CPU per worker.
GPU=1

# Run the MNIST example.
EXEC="mpiexec -n ${WORKERS} --hostfile /kubeflow/openmpi/assets/hostfile --allow-run-as-root --display-map --tag-output --timestamp-output sh -c 'python /examples/tensorflow_mnist.py'"

# If you're running Horovod in a cluster without GPUs, you may need to set LD_LIBRARY_PATH to use CUDA stub drivers.
EXEC="mpiexec -n ${WORKERS} --hostfile /kubeflow/openmpi/assets/hostfile --allow-run-as-root --display-map --tag-output --timestamp-output sh -c 'LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda-9.0/targets/x86_64-linux/lib/stubs python /examples/tensorflow_mnist.py'"
```

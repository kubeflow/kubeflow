# openmpi

> Prototypes for running Open MPI jobs with Kubernetes.

* [Quickstart](#quickstart)
* [Running Horovod](#running-horovod)

## Quickstart

First, create a cluster and install the ksonnet CLI (see root-level [README.md](https://github.com/kubeflow/kubeflow/blob/master/README.md)).

Next, build a docker image with Open MPI installed. See [Horovod docker](https://github.com/uber/horovod/blob/master/docs/docker.md) for an example to run distributed TensorFlow training using Open MPI.

Then, run the following commands to generate Kubernetes YAML for openmpi, and then deploys it to your Kubernetes cluster.

```
# Create a namespace for kubeflow deployment
NAMESPACE=kubeflow
kubectl create namespace ${NAMESPACE}

# Which version of Kubeflow to use
# For a list of releases refer to:
# https://github.com/kubeflow/kubeflow/releases
VERSION=v0.1.0

# Initialize a ksonnet app. Set the namespace for it's default environment.
APP_NAME=openmpi
ks init ${APP_NAME}
cd ${APP_NAME}
ks env set default --namespace ${NAMESPACE}

# Install Kubeflow components
ks registry add kubeflow github.com/kubeflow/kubeflow/tree/${VERSION}/kubeflow
ks pkg install kubeflow/openmpi@${VERSION}

# Generate one-time ssh keys used by Open MPI
SECRET=openmpi-secret
mkdir -p .tmp
yes | ssh-keygen -N "" -f .tmp/id_rsa
kubectl delete secret ${SECRET} -n ${NAMESPACE} || true
kubectl create secret generic ${SECRET} -n ${NAMESPACE} --from-file=id_rsa=.tmp/id_rsa --from-file=id_rsa.pub=.tmp/id_rsa.pub --from-file=authorized_keys=.tmp/id_rsa.pub

# Generate openmpi components
COMPONENT=openmpi
IMAGE=YOUR_IMAGE_HERE
EXEC="mpiexec -n 4 --hostfile /kubeflow/openmpi/assets/hostfile --allow-run-as-root --display-map --tag-output --timestamp-output sh -c 'echo hello world'"
ks generate openmpi ${COMPONENT} --image ${IMAGE} --secret ${SECRET} --exec "${EXEC}"

# Apply to your cluster. 
ks apply default

# Inspect the pod status.
kubectl get pod -n ${NAMESPACE}
kubectl logs -n ${NAMESPACE} -f openmpi-master
```

## Running Horovod

Use the following command to run the [Horovod](https://github.com/uber/horovod) examples.

```
# You may run the Horovod examples if you're running the Horovod docker image.
EXEC="mpiexec -n 4 --hostfile /kubeflow/openmpi/assets/hostfile --allow-run-as-root --display-map --tag-output --timestamp-output sh -c 'python /examples/keras_mnist_advanced.py'"

# If you're running Horovod in a cluster without GPUs, you may need to set LD_LIBRARY_PATH to use CUDA stub drivers.
EXEC="mpiexec -n 4 --hostfile /kubeflow/openmpi/assets/hostfile --allow-run-as-root --display-map --tag-output --timestamp-output sh -c 'LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda-9.0/targets/x86_64-linux/lib/stubs python /examples/keras_mnist_advanced.py'"
```

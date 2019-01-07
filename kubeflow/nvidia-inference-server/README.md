# nvidia-inference-server

> NVIDIA Inference Server is a REST and GRPC service for deep-learning
inferencing of TensorRT, TensorFlow and Caffe2 models. The server is
optimized deploy machine and deep learning algorithms on both GPUs and
CPUs at scale.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Setup](#setup)
  - [Google Cloud and Ksonnet](#google-cloud-and-ksonnet)
- [Create Cluster](#create-cluster)
- [Google Cloud Console](#google-cloud-console)
- [Enable CUDA on the GPU Nodes](#enable-cuda-on-the-gpu-nodes)
- [NVIDIA Inference Server Image](#nvidia-inference-server-image)
- [Model Repository](#model-repository)
- [Kubernetes Generation and Deploy](#kubernetes-generation-and-deploy)
- [Using the Inference Server](#using-the-inference-server)
- [Cleanup](#cleanup)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

These instructions detail how to set up a GKE cluster suitable for
running the NVIDIA Inference server and how to use the
`io.ksonnet.pkg.nvidia-inference-server` prototype to generate
Kubernetes YAML and deploy to that cluster.

For more information on the NVIDIA Inference Server see the [NVIDIA
Inference Server User
Guide](https://docs.nvidia.com/deeplearning/sdk/inference-user-guide/index.html)
and the [NVIDIA Inference Server
Clients](https://github.com/NVIDIA/dl-inference-server) open-source
repository.

## Setup

Currently the `io.ksonnet.pkg.nvidia-inference-server` prototype
described here is only valid for the 18.08.1 version of the NVIDIA
Inference Server. The prototype will be updated to support 18.09 and
future containers when those come available.

### Google Cloud and Ksonnet

Before starting you must first install the gcloud and ksonnet.
- [ksonnet](https://github.com/ksonnet/ksonnet/releases). Be sure to
  put the `ks` executable on your path.
- [Local GCloud SDK](https://cloud.google.com/sdk/docs/quickstarts)

Use `gcloud init` to log-in to Google Cloud. Use `gcloud config list`
to see your current configuration.

```shell
$ gcloud init
...
$ gcloud config list
[compute]
region = us-west1
zone = us-west1-b
[core]
account = me@me.com
project = myproject
```

Make sure your zone contains the type of GPU nodes that you want to
use for inferencing. If not use `gcloud config set` to change the
region and zone. You can see which regions have which GPUs by using
`gcloud compute accelerator-types list`.

## Create Cluster

Next create a cluster that the inference server will be deployed
to. You need two node-pools within the cluster, one containing CPU
node(s) and one containing GPU node(s). The cluster creation creates a
default CPU pool which you should specify to have 2 nodes for this
example. You must use the --cluster-version flag to select a recent
version of Kubernetes as the default 1.9 version does not work
correctly with the NVIDIA GPU Cloud registry.

```shell
$ gcloud container clusters create myinferenceserver --num-nodes=2 --cluster-version=1.10.6-gke.2
```

Set the cluster in your configuration so that it is used for following
commands.

```shell
$ gcloud config set container/cluster myinferenceserver
```

Now add the GPU node-pool to the cluster. For this example you should
specify a single node which has 8 CPUs and 1 V100 GPU:

```shell
$ gcloud container node-pools create gpu-pool --num-nodes=1 --machine-type=n1-standard-8 --accelerator type=nvidia-tesla-v100,count=1
```

Lastly, set credentials so that local kubectl is configured to control
the cluster.

```shell
$ gcloud container clusters get-credentials myinferenceserver
```

## Google Cloud Console

Google Cloud Console provides a nice view of your Kubernetes nodes,
pods, services, etc. You can use your web browser to view at a URL
formed from your zone, cluster and project. For example,
`https://console.cloud.google.com/kubernetes/workload_/dashboard/us-west1-b/myinferenceserver?project=myproject`.

## Enable CUDA on the GPU Nodes

You need to explicitly install CUDA driver onto the GPU nodes. There
is a daemonset that can do this for you.

```shell
$ kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/container-engine-accelerators/stable/nvidia-driver-installer/cos/daemonset-preloaded.yaml
```

## NVIDIA Inference Server Image

The docker image for the NVIDIA Inference Server is available on the
[NVIDIA GPU Cloud](https://ngc.nvidia.com). Below you will add a
Kubernetes secret to allow you to pull this image. As initialization
you must first register at NVIDIA GPU Cloud and follow the directions
to obtain your API key. You can confirm the key is correct by
attempting to login to the registry and checking that you can pull the
inference server image. See [Pull an Image from a Private
Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry)
for more information about using a private registry.

```shell
$ docker login nvcr.io
Username: $oauthtoken
Password: <your-api-key>
```

Now use the NVIDIA GPU Cloud API key from above to create a kubernetes
secret called `ngc`. This secret allows Kubernetes to pull the
inference server image from the NVIDIA GPU Cloud registry. Replace
<api-key> with your API key and <ngc-email> with your NVIDIA GPU Cloud
email. Make sure that for `docker-username` you specify the value
exactly as shown, including the backslash.

```shell
$ kubectl create secret docker-registry ngc --docker-server=nvcr.io --docker-username=\$oauthtoken --docker-password=<api-key> --docker-email=<ngc-email>
```

## Model Repository

The inference server needs a repository of models that it will make
available for inferencing. You can find an example repository in the
[open-source repo](https://github.com/NVIDIA/dl-inference-server) and
instructions on how to create your own model repository in the [NVIDIA
Inference Server User
Guide](https://docs.nvidia.com/deeplearning/sdk/inference-user-guide/index.html).

For this example you will place the model repository in a Google Cloud
Storage bucket.

```shell
$ gsutil mb gs://inference-server-model-store
```

Following these
[instructions](https://github.com/NVIDIA/dl-inference-server) download
the example model repository to your system and copy it into the GCS
bucket.

```shell
$ gsutil cp -r model_store gs://inference-server-model-store
```

## Kubernetes Generation and Deploy

Next use ksonnet to generate Kubernetes configuration for the NVIDIA
Inference Server deployment and service. The --image option points to
the NVIDIA Inference Server container in the [NVIDIA GPU Cloud
Registry](https://ngc.nvidia.com). For the current implementation you
must use the 18.08.1 container. The --modelRepositoryPath option
points to our GCS bucket that contains the model repository that you
set up earlier.

```shell
$ ks init my-inference-server
$ cd my-inference-server
$ ks registry add kubeflow https://github.com/kubeflow/kubeflow/tree/master/kubeflow
$ ks pkg install kubeflow/nvidia-inference-server
$ ks generate nvidia-inference-server iscomp --name=inference-server --image=nvcr.io/nvidia/inferenceserver:18.08.1-py2 --modelRepositoryPath=gs://inference-server-model-store/tf_model_store
```

Next deploy the service.

```shell
$ ks apply default -c iscomp
```

## Using the Inference Server

Now that the inference server is running you can send HTTP or GRPC
requests to it to perform inferencing. By default the inferencing
service is exposed with a LoadBalancer service type. Use the following
to find the external IP for the inference service. In this case it is
35.232.176.113.

```shell
$ kubectl get services
NAME         TYPE           CLUSTER-IP    EXTERNAL-IP      PORT(S)                                        AGE
inference-se LoadBalancer   10.7.241.36   35.232.176.113   8000:31220/TCP,8001:32107/TCP,8002:31682/TCP   1m
kubernetes   ClusterIP      10.7.240.1    <none>           443/TCP                                        1h
```

The inference server exposes an HTTP endpoint on port 8000, and GRPC
endpoint on port 8001 and a Prometheus metrics endpoint on port
8002. You can use curl to get the status of the inference server from
the HTTP endpoint.

```shell
$ curl 35.232.176.113:8000/api/status
```

Follow the
[instructions](https://github.com/NVIDIA/dl-inference-server) to build
the inference server example image and performance clients. You can
then use these examples to send requests to the server. For example,
for an image classification model use the image\_client example to
perform classification of an image.

```shell
$ image_client -u 35.232.176.113:8000 -m resnet50_netdef -c3 mug.jpg
Output probabilities:
batch 0: 504 (COFFEE MUG) = 0.777365267277
batch 0: 968 (CUP) = 0.213909029961
batch 0: 967 (ESPRESSO) = 0.00294389552437
```

## Cleanup

When done use `ks` to remove the deployment.

```shell
$ ks delete default -c iscomp
```

If you create a cluster then make sure to also delete that.

```shell
$ gcloud container clusters delete myinferenceserver
```

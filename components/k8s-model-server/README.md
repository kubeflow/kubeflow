# Kubernetes TensorFlow Model Server
This repository contains docker files and manifests to deploy a generic 
[TensorFlow model server](https://www.tensorflow.org/serving/) on a [Kubernetes](https://kubernetes.io/) cluster. 
Rather them baking the served model into the image, as the TensorFlow inception example demonstrates, this 
example demonstrates how to serve a model from distributed storage.  [GKE](https://cloud.google.com/kubernetes-engine/) 
(Google Kubernetes Engine) and [GCS](https://cloud.google.com/storage/) (Google Cloud Storage) are used here, 
but the example is trivially adaptable to an on-premises (on-prem) cluster using NFS (Network File System) or 
HDFS (Hadoop Distributed File System), or an AWS (Amazon Web Services)cluster using S3 (Simple Storage Service).

## Create Google Cloud Platform (GCP) Project 
This tutorial uses [GCP](https://cloud.google.com/).
[This documentation](https://cloud.google.com/resource-manager/docs/creating-managing-projects) demonstrates how to 
create and manage a new Project on GCP. There is a [free tier](https://cloud.google.com/free/) available that you can 
use to try it out.

## Build a Model Server Docker Image
The [docker file](docker/Dockerfile) builds a docker image containing default the TensorFlow model server tuned for 
amd64 architecture. You can modify this file to support the architecture of your choice.

### Set the User (Optional)
Note the line at the beginning of the Dockerfile.

```
ENV MS_USER=model-server
```

This is the user that the model-server process will run as. You can modify this user to change the name. This user 
will be used in the Kubernetes Deployment's PodSecurityContext so that the container is not run with root privileges
(This is considered to be a best practice).

### Build the Image
A [Makefile](docker/Makefile) is included that will build the image and push it to private hosting inside your project. 

Download and install the [Google Cloud SDK](https://cloud.google.com/sdk/downloads) (Software Development Kit).

Make sure that the `gcloud` command line tool is [configured to use the desired
project](https://cloud.google.com/sdk/docs/managing-properties).

Enable the [GCR](https://cloud.google.com/container-registry/docs/quickstart) (Google Container Registry) API in 
your project. You can do this directly from the command line:

```commandline
gcloud services enable containerregistry.googleapis.com
```

The command below will build the docker image.

```commandline
make PROJECT_ID=$(gcloud config get-value project) all
```

The command below will push the docker image to your project's GCR.

```commandline
make PROJECT_ID=$(gcloud config get-value project) push
```

You can learn more about [building a TensorFlow model server](https://www.tensorflow.org/serving/serving_advanced) and 
running a [TensorFlow model server in docker](https://www.tensorflow.org/serving/docker) in the TensorFlow Serving 
documentation.

## Create a Bucket
You are going to serve the model from [GCS](https://cloud.google.com/storage/). 

Download and install the [Google Cloud SDK](https://cloud.google.com/sdk/downloads) (Software Development Kit).

Use the [gsutil mb](https://cloud.google.com/storage/docs/gsutil/commands/mb) command to create a bucket. Note that 
the bucket name must be globally unique.
```commandline
gsutil mb gs://<bucket-name>
``` 


## Upload a Model
You can train an inception model using the instructions from the 
[TensorFlow documentation](https://www.tensorflow.org/tutorials/image_retraining), or you can download the pre-trained
[example](http://download.tensorflow.org/models/inception_v3_2016_08_28.tar.gz), or you can use the pre-uploaded,
pre-trained [gcs bucket](gs://kubeflow-models/inception) directly.

If you downloaded the example decompress it.
```commandline
tar -zxpf inception.tar.gz
```

Use [gsutil cp](https://cloud.google.com/storage/docs/gsutil/commands/cp) to upload the inception model to the cloud 
storage bucket you created above.
```commandline
gsutil cp -r inception gs://<bucket-name>
```

Use [gsutil ls](https://cloud.google.com/storage/docs/gsutil/commands/ls) to view the contents of your bucket. You 
will see that the contents of the model are stored in the `gs://<bucket-name>/inception/1` directory. This is the 
first version of the model that we will serve.

```commandline
gsutil ls -r gs://<bucket-name>/ 
gs://<bucket-name>/inception/:
gs://<bucket-name>/inception/

gs://<bucket-name>/inception/1/:
gs://<bucket-name>/inception/1/
gs://<bucket-name>/inception/1/saved_model.pb

gs://<bucket-name>/inception/1/variables/:
gs://<bucket-name>/inception/1/variables/variables.data-00000-of-00001
gs://<bucket-name>/inception/1/variables/variables.index
```

## Create a Kubernetes Cluster

Use [gcloud container clusters create](https://cloud.google.com/sdk/gcloud/reference/container/clusters/create) to turn 
up a new Kubernetes cluster. 
```commandline
gcloud container clusters create model-serving --machine-type=n1-standard-4
```
This will create a 3 Node cluster using the n1-standard-4 machine shape for each Node.

After creation is complete, you can use 
[gcloud container clusters describe](https://cloud.google.com/sdk/gcloud/reference/container/clusters/describe) to view 
your cluster.

## Configure kubectl 
In order to create Kubernetes workloads, you need to configure [kubectl](https://kubernetes.io/docs/user-guide/kubectl/) 
to communicate with your cluster. Use 
[gcloud container clusters get-credentials](https://cloud.google.com/sdk/gcloud/reference/container/clusters/describe) 
to configure kubectl.

```commandline
gcloud container clusters get-credentials model-serving --zone <your-zone> --project <your-project>
```


### Create a ksonnet component for your model

We treat each deployed model as a [component](https://ksonnet.io/docs/tutorial#2-generate-and-deploy-an-app-component) in your APP.

Create a component for your model inside your ksonnet app (refer to the [user_guide](../../user_guide.md) for instructions on creating an APP)

```commandline
MODEL_COMPONENT=serveInception
MODEL_NAME=inception
MODEL_PATH=gs://cloud-ml-dev_jlewi/tmp/inception
ks generate tf-serving ${MODEL_COMPONENT} --name=${MODEL_NAME} --namespace=default --model_path=${MODEL_PATH}
```

Deploy it in a particular environment. The deployment will pick up environment parmameters (e.g. cloud) and customize the deployment appropriately

```
ks apply cloud -c ${MODEL_COMPONENT}
```

You can use [kubectl get](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#get) to view the 
status of the Deployment.

```commandline
kubectl get deployment model-server
NAME           DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
model-server   3         3         3            3           20s

```

You can learn more about [updating a Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#updating-a-deployment), 
[scaling a Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#scaling-a-deployment), and 
[Pod Resources](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/) in the 
Kubernetes documentation.



### Use the served model

The [inception-client](./inception-client) directory contains a Python script you can use to make a call against the deployed model.

This script is intended to be run externally to the kubernetes cluster as a demonstration that the inception model is correctly being served.
You can run the script either directly from a Python2 environment or in a Docker container.

#### Setup

You will require the external IP for the inception service as well as the port it is being hosted on. The inception service should be
listed under the value you used for the `MODEL_NAME` parameter in the ksonnet component. You can find this information using
```commandline
kubectl get services
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)			 AGE
$MODEL_NAME  LoadBalancer   <INTERNAL IP>   <SERVICE IP>     <SERVICE PORT>:<NODE PORT>  <TIME SINCE DEPLOYMENT>
```

We will feed the `<SERVICE IP>` and `<SERVICE PORT>` to the labelling script. We will use it to label the following image of a
cat sleeping on a comforter atop a sofa:

![Cat on comforter on sofa](./inception-client/images/sleeping-pepper.jpg)

You can also use to to label your own images.

#### Running the script directly

You can run the script directly in your local environment if Python2 is available to you. You will not be able to use the script with Python3
as the [`tensorflow-serving-api` package](https://pypi.python.org/pypi/tensorflow-serving-api)
is not yet Python3-capable ([Issue #117](https://github.com/google/kubeflow/issues/117)).

If you would like to use a virtual environment, begin by activating your desired environment with your favorite environment manager. Then,
```commandline
pip install -r requirements.txt
```

Run the script as follows:

```commandline
python label.py -s <SERVICE IP> -p <SERVICE PORT> images/sleeping-pepper.jpg
```

#### Run in Docker container with publicly exposed service

The [inception-client](./inception-client) directory also contains a [Dockerfile](./inception-client/Dockerfile) that will allow you to
call out to the inception service from a container. You can run this container on your local machine if you publicly exposed your
`inception` service. If you would like to do this on GKE, simply run

```commandline
kubectl edit service inception
```

and change the service type to `NodePort` or `LoadBalancer`.

From that directory, start by building the image:

```commandline
docker build -t inception-client .
```

You can optionally specify a directory containing the JPEG files you would like to label using the
```commandline
--build-arg IMAGES_DIR=<path-to-image-directory>
```

By default, this build uses [inception-client/images](./inception-client/images).

Then run the container with the appropriate cluster information:

```commandline
docker run -v $(pwd):/data inception-client <SERVICE IP> <SERVICE PORT>
```

#### Run container on your kubernetes cluster

If your inception service is not publicly exposed, you can also run the client container directly on the kubernetes cluster on which the
inception model is being served. To do this:

1. Build the docker image as specified above. From the [inception-client](./inception-client) directory:
```commandline
docker build -t inception-client .
```

1. Prefix the tag with your GCR registry:
```commandline
GCR_TAG=gcr.io/$(gcloud config get-value project)/inception-client:latest
docker image tag inception-client:latest $GCR_TAG
```

1. Push the image to your project's container registry:
```commandline
gcloud docker -- push $GCR_TAG
```

1. Run a container built from that image on your GKE cluster:
```commandline
kubectl run -it inception-client --image $GCR_TAG --restart=OnFailure
```

#### Output

No matter how you run the script, you should see the following output:

```
outputs {
  key: "classes"
  value {
    dtype: DT_STRING
    tensor_shape {
      dim {
        size: 1
      }
      dim {
        size: 5
      }
    }
    string_val: "sleeping bag"
    string_val: "Border terrier"
    string_val: "tabby, tabby cat"
    string_val: "quilt, comforter, comfort, puff"
    string_val: "studio couch, day bed"
  }
}
outputs {
  key: "scores"
  value {
    dtype: DT_FLOAT
    tensor_shape {
      dim {
        size: 1
      }
      dim {
        size: 5
      }
    }
    float_val: 8.5159368515
    float_val: 7.85043668747
    float_val: 5.88767671585
    float_val: 5.706138134
    float_val: 5.55422878265
  }
}
```

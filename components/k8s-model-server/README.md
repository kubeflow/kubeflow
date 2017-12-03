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

Enable the [GCR](https://cloud.google.com/container-registry/docs/quickstart) (Google Container Registry) API in 
your project.

Set the name of your project at the top of the Makefile ```PROJECT_ID=<your-project>```.

The command below will build the docker image.

```commandline
make all
```

The command below will push the docker image to your project's GCR.

```commandline
make push
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
gsutil mb gs://<ucket-name>
``` 


## Upload a Model
You can train an inception model using the instructions from the 
[TensorFlow documentation](https://www.tensorflow.org/tutorials/image_retraining), or you can download the pre-trained
[example](inception.tar.gz).

If you downloaded the example decompress it.
```commandline
tar -zxpf inception.tar.gz
```

Use [gsutil cp](https://cloud.google.com/storage/docs/gsutil/commands/cp) to upload the inception model to the cloud 
storage bucket you created above.
```commandline
gsutil cp -r inception gs://<bucket-name>
```

Use [gsutil_ls](https://cloud.google.com/storage/docs/gsutil/commands/ls) to view the contents of your bucket. You 
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

## Modify the Deployment
The Kubernetes Deployment in this [manifest](manifests/model-server.yaml).

You need to update the Deployment's `spec.template.spec.containers[0].image` to point the image you pushed to GCR above.

```yaml
containers:
      - name: model-server
        image: gcr.io/<your-project>/model-server:1.0
```

You need to update the Deployment's `spec.template.spec.containers[0].command.args` to point the GCS bucket you created  
above.

```yaml
 args:
        - /usr/bin/tensorflow_model_server
          --port=9000 --model_name=inception --model_base_path=gs://<your-bucket>/inception/
```

## Create the Deployment

You can use [kubectl apply](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#apply) to create the 
[Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/). 
This will create three Pods that serve the inception model, and a Service that load balances requests across them.
```commandline
kubectl apply -f manifests/model-serveryaml 
deployment "model-server" created
service "model-service" created
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
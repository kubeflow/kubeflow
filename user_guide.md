# Using KubeFlow 

If you are unfamiliar with ksonnet you may want to start by reading the [tutorial](https://ksonnet.io/docs/tutorial)

## Build ks

You need a version of ksonnet newer than the [0.7.0 release](https://github.com/ksonnet/ksonnet/releases).

As of this writing, Heptio hasn't released any newer prebuilt binaries so you will need to [build from source](https://ksonnet.io/docs/build-install).

```
# Clone the ksonnet repo into your GOPATH
go get github.com/ksonnet/ksonnet
cd ${GOPATH}/src/github.com/ksonnet/ksonnet
make install
```

## Deploy Kubeflow

Initialize a directory to contain your deployment
```
ks init my-kubeflow
```

Install the Kubeflow packages

```
cd my-kubeflow
ks registry add kubeflow github.com/google/kubeflow/tree/master/kubeflow
ks pkg install kubeflow/core
ks pkg install kubeflow/tf-serving
ks pkg install kubeflow/tf-job
```


Create the KubeFlow core component. The core component includes 
  * JupyterHub
  * TensorFlow job controller


```
ks generate core kubeflow-core --name=kubeflow-core --namespace=${NAMESPACE}
```
  * namespace is optional
  * TODO(jlewi): There's an open github [issue](https://github.com/ksonnet/ksonnet/issues/222) to allow components to pull
    the namespace from the environment namespace parameter.


Define an environment that doesn't use any Cloud features
  * This environment could be used for minikube or a full K8s cluster that doesn't depend on a cloud features.

```
ks env add nocloud
```

The default KubeFlow deployment will be suitable for this no cloud environment so you can just deploy the core components

```
ks apply nocloud -c kubeflow-core
```

If the user is running on a Cloud they could create an environment for this.

```
ks env add cloud
ks param set --cloud=gke
```
   * The cloud parameter triggers a set of curated cloud configs.

They can then deploy to this environment

```
ks apply cloud -c kubeflow-core
```

### Bringing up a Notebook

Once you've deployed JupyterHub, a load balancer service is created. You can check its existence using the kubectl commandline.

```commandline
kubectl get svc

NAME         TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)        AGE
kubernetes   ClusterIP      10.11.240.1    <none>         443/TCP        1h
tf-hub-0     ClusterIP      None           <none>         8000/TCP       1m
tf-hub-lb    LoadBalancer   10.11.245.94   xx.yy.zz.ww    80:32481/TCP   1m
```

If you're using minikube, you can run the following to get the URL for the notebook.

```
minikube service tf-hub-lb --url

http://xx.yy.zz.ww:31942
``` 

For some cloud deployments, the LoadBalancer service may take up to five minutes display an external IP address. Re-executing `kubectl get svc` repeatedly will eventually show the external IP field populated.

Once you have an external IP, you can proceed to visit that in your browser. The hub by default is configured to take any username/password combination. After entering the username and password, you can start a single-notebook server,
request any resources (memory/CPU/GPU), and then proceed to perform single node training.

We also ship standard docker images that you can use for training Tensorflow models with Jupyter.

* gcr.io/KubeFlow/tensorflow-notebook-cpu
* gcr.io/KubeFlow/tensorflow-notebook-gpu

In the spawn window, when starting a new Jupyter instance, you can supply one of the above images to get started, depending on whether 
you want to run on CPUs or GPUs. The images include all the requisite plugins, including [Tensorboard](https://www.tensorflow.org/get_started/summaries_and_tensorboard) that you can use for rich visualizations and insights into your models. 
Note that GPU-based image is several gigabytes in size and may take a few minutes to localize. 

Also, when running on Google Kubernetes Engine, the public IP address will be exposed to the internet and is an 
unsecured endpoint by default. For a production deployment with SSL and authentication, refer to the [documentation](components/jupyterhub). 


### Serve a model

We treat each deployed model as a [component](https://ksonnet.io/docs/tutorial#2-generate-and-deploy-an-app-component) in your APP.

Create a component for your model

```
MODEL_COMPONENT=serveInception
MODEL_NAME=inception
MODEL_PATH=gs://cloud-ml-dev_jlewi/tmp/inception
ks generate tf-serving ${MODEL_COMPONENT} --name=${MODEL_NAME} --namespace=default --model_path=${MODEL_PATH}
```

Deploy it in a particular environment. The deployment will pick up environment parmameters (e.g. cloud) and customize the deployment appropriately

```
ks apply cloud -c ${MODEL_COMPONENT}
```

### Submiting a TensorFlow training job

We treat each TensorFlow job as a [component](https://ksonnet.io/docs/tutorial#2-generate-and-deploy-an-app-component) in your APP.

Create a component for your job.

```
ks generate tf-job ${JOB_NAME} --name=${JOB_NAME}
```

To configure your job you need to set a bunch of parameters. To see a list of parameters run

```
ks prototype describe tf-job
```

Parameters can be set using `ks param` e.g. to set the Docker image used

```
ks param set ${JOB_NAME} image ${IMAGE}
```

You can also edit the `params.libsonnet` files directly to set parameters.

**Warning** Currently setting args via the command line doesn't work because of escaping issues (see [ksonnet/ksonnet/issues/235](https://github.com/ksonnet/ksonnet/issues/235)). So to set the parameters you will need
to directly edit the `params.libsonnet` file directly.

To run your job

```
ks apply ${ENVIRONMENT} -c ${JOB_NAME}
```

For information on monitoring your job please refer to the [TfJob docs](https://github.com/tensorflow/k8s#monitoring-your-job).

#### Run the TfCnn example

KubeFlow ships with a [ksonnet prototype](https://ksonnet.io/docs/concepts#prototype) suitable for running the [TensorFlow CNN Benchmarks](https://github.com/tensorflow/benchmarks/tree/master/scripts/tf_cnn_benchmarks).

Create the component

```
ks generate tf-cnn ${CNN_JOB_NAME} --name=${CNN_JOB_NAME}
```

Submit it

```
ks apply ${ENVIRONMENT} -c ${CNN_JOB_NAME}
```

The prototype provides a bunch of parameters to control how the job runs (e.g. use GPUs run distributed etc...). To see a list of paramets

```
ks prototype describe tf-cnn
```

## Advanced Customization

* Often times datascientists require a POSIX compliant filesystem 
   * For example, most HDF5 libraries require POSIX and don't work with an object store like GCS or S3
* When working with teams you might want a shared POSIX filesystem to be mounted into your notebook environments
  so that datascientists can work collaboratively on the same datasets.
* Here we show how to customize your Kubeflow deployment to achieve this.


Set the disks parameter to a comma separated list of the Google persistent disks you want to mount
  * These disks should be in the same zone as your cluster
  * These disks need to be created manually via gcloud or the Cloud console e.g.
  * These disks can't be attached to any existing VM or POD.
  * TODO(jlewi): Can we rely on the default storage class to create the backing for store for NFS? Would that be portable across clouds
    and avoid users having to create the disks manually?
Create the disks

```
  gcloud --project=${PROJECT} compute disks create  --zone=${ZONE} ${PD_DISK1} --description="PD to back NFS storage on GKE." --size=1TB
  gcloud --project=${PROJECT} compute disks create  --zone=${ZONE} ${PD_DISK2} --description="PD to back NFS storage on GKE." --size=1TB
```

Configure the environment to use the disks.

```
ks param set --env=cloud nfs disks ${PD_DISK1},${PD_DISK2}
```

Deploy the environment

```
ks apply cloud
```

Start Juptyer
You should see your NFS volumes mounted as `/mnt/${DISK_NAME}`

In a Juptyer cell you can run

```
!df
```

You should see output like the following

```
https://github.com/jlewi/deepvariant_on_k8s
Filesystem                                                     1K-blocks    Used  Available Use% Mounted on
overlay                                                         98884832 8336440   90532008   9% /
tmpfs                                                           15444244       0   15444244   0% /dev
tmpfs                                                           15444244       0   15444244   0% /sys/fs/cgroup
10.11.254.34:/export/pvc-d414c86a-e0db-11e7-a056-42010af00205 1055841280   77824 1002059776   1% /mnt/jlewi-kubeflow-test1
10.11.242.82:/export/pvc-33f0a5b3-e0dc-11e7-a056-42010af00205 1055841280   77824 1002059776   1% /mnt/jlewi-kubeflow-test2
/dev/sda1                                                       98884832 8336440   90532008   9% /etc/hosts
shm                                                                65536       0      65536   0% /dev/shm
tmpfs                                                           15444244       0   15444244   0% /sys/firmware
```
  * Here `jlewi-kubeflow-test1` and `jlewi-kubeflow-test2` are the names of the PDs.
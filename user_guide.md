# Using Kubeflow

This guide will walk you through the basics of deploying and interacting with Kubeflow. Some understanding of Kubernetes, Tensorflow, and Ksonnet are useful in completing the contents of this guide.

* [Kubernetes](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
* [Tensorflow](https://www.tensorflow.org/get_started/)
* [Ksonnet](https://ksonnet.io/docs/tutorial)

## Requirements
 * Kubernetes >= 1.8 [see here](https://github.com/kubeflow/tf-operator#requirements)
 * ksonnet version [0.8.0](https://ksonnet.io/#get-started) or later. (See [below](#why-kubeflow-uses-ksonnet) for an explanation of why we use ksonnet)

## Deploy Kubeflow

We will be using Ksonnet to deploy kubeflow into your cluster.

Initialize a directory to contain your ksonnet application.

```
ks init my-kubeflow
```

Install the Kubeflow packages into your application.

```
cd my-kubeflow
ks registry add kubeflow github.com/kubeflow/kubeflow/tree/master/kubeflow
ks pkg install kubeflow/core
ks pkg install kubeflow/tf-serving
ks pkg install kubeflow/tf-job
```

Create the Kubeflow core component. The core component includes:
  * [JupyterHub](https://jupyterhub.readthedocs.io/en/latest/)
  * TensorFlow job controller


```
NAMESPACE=kubeflow
kubectl create namespace ${NAMESPACE}
ks generate core kubeflow-core --name=kubeflow-core --namespace=${NAMESPACE}

# Enable collection of anonymous usage metrics
# Skip this step if you don't want to enable collection.
# Or set reportUsage to false (the default).
ks param set kubeflow-core reportUsage true
ks param set kubeflow-core usageId $(uuidgen)
```
  * Feel free to change the namespace to a value that better suits your kubernetes cluster.


Ksonnet allows us to parameterize the Kubeflow deployment according to our needs. We will define two environments: nocloud, and cloud.


```
ks env add nocloud
ks env add cloud
```

The `nocloud` environment can be used for minikube or other basic k8s clusters, the `cloud` environment will be used for GKE in this guide.

If using GKE, we can configure our cloud environment to use GCP features with a single parameter:

```
ks param set kubeflow-core cloud gke --env=cloud
```

Now let's set `${KF_ENV}` to `cloud` or `nocloud` to reflect our environment for the rest of the guide:

```
$ KF_ENV=cloud|nocloud
```

And apply the components to our Kubernetes cluster

```
ks apply ${KF_ENV} -c kubeflow-core
```

At any time you can inspect the kubernetes objects definitions for a particular ksonnet component using `ks show` e.g

```
ks show ${KF_ENV} -c kubeflow-core
```

### Usage Reporting

When enabled, Kubeflow will report **anonymous** usage data using [spartakus](https://github.com/kubernetes-incubator/spartakus), Kubernetes' reporting tool. Spartakus **does not report any personal information**. See [here](https://github.com/kubernetes-incubator/spartakus) for more detail.
This is entirely voluntary and you can opt out by doing the following

```
ks param set kubeflow-core reportUsage false

# Delete any existing deployments of spartakus
kubectl delete -n ${NAMESPACE} deploy spartakus-volunteer
```

To explictly enable usage reporting repeat the above steps setting reportUsage to `true`

```
ks param set kubeflow-core reportUsage true

# Delete any existing deployments of spartakus
kubectl delete -n ${NAMESPACE} deploy spartakus-volunteer
```

**Reporting usage data is one of the most signifcant contributions you can make to Kubeflow; so please consider turning it on.** This data
allows us to improve the project and helps the many companies working on Kubeflow justify continued investement. 

You can improve the quality of the data by giving each Kubeflow deployment a unique id

```
ks param set kubeflow-core usageId $(uuidgen)
```

### Bringing up a Jupyter Notebook

The kubeflow-core component deployed JupyterHub and a corresponding load balancer service. You can check its status using the kubectl command line.

```commandline
kubectl get svc -n=${NAMESPACE}

NAME               TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
tf-hub-0           ClusterIP      None            <none>        8000/TCP       1m
tf-hub-lb          ClusterIP      10.11.245.94    <none>        80/TCP         1m
tf-job-dashboard   ClusterIP      10.11.240.151   <none>        80/TCP         1m
```

By default we are using ClusterIPs for the JupyterHub UI. This can be changed to a LoadBalancer by issuing `ks param set kubeflow-core jupyterHubServiceType LoadBalancer`, however this will leave your Jupyter Notebook open to the Internet.

To connect to your [Jupyter Notebook](http://jupyter.org/index.html):

```
PODNAME=`kubectl get pods --namespace=${NAMESPACE} --selector="app=tf-hub" --output=template --template="{{with index .items 0}}{{.metadata.name}}{{end}}"`
kubectl port-forward --namespace=${NAMESPACE} $PODNAME 8000:8000
```

Then, open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.

You should see a sign in prompt.

1. Sign in using any username/password
1. Click the "Start My Server" button, and you will be greeted by a dialog screen.
1. Select a CPU or GPU image from the Image dropdown menu depending on whether you are doing CPU or GPU training, or whether or not you have GPUs in your cluster. The current defaults offered for both are `gcr.io/kubeflow-images-staging/tensorflow-notebook-cpu` and `gcr.io/kubeflow-images-staging/tensorflow-notebook-gpu` respectively. Or you can type in the name of any TF image you want to run.
1. Allocate memory, CPU, GPU, or other resources according to your need (1 CPU and 2Gi of Memory are good starting points)
    * To allocate GPUs, make sure that you have GPUs available in your cluster
    * Run the following command to check if there are any nvidia gpus available: 
    `kubectl get nodes "-o=custom-columns=NAME:.metadata.name,GPU:.status.allocatable.nvidia\.com/gpu"`
    * If you have GPUs available, you can schedule your server on a GPU node by specifying the following json in `Extra Resource Limits` section: `{"nvidia.com/gpu": "1"}`
  1. Click Spawn
1. You should now be greeted with a Jupyter Notebook interface. Note that the GPU image is several gigabytes in size and may take a few minutes to download and start.

The image supplied above can be used for training Tensorflow models with Jupyter. The images include all the requisite plugins, including [Tensorboard](https://www.tensorflow.org/get_started/summaries_and_tensorboard) that you can use for rich visualizations and insights into your models.

To test the install, we can run a basic hello world (adapted from [mnist_softmax.py](https://github.com/tensorflow/tensorflow/blob/r1.4/tensorflow/examples/tutorials/mnist/mnist_softmax.py) )

```
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)

import tensorflow as tf

x = tf.placeholder(tf.float32, [None, 784])

W = tf.Variable(tf.zeros([784, 10]))
b = tf.Variable(tf.zeros([10]))

y = tf.nn.softmax(tf.matmul(x, W) + b)

y_ = tf.placeholder(tf.float32, [None, 10])
cross_entropy = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y), reduction_indices=[1]))

train_step = tf.train.GradientDescentOptimizer(0.05).minimize(cross_entropy)

sess = tf.InteractiveSession()
tf.global_variables_initializer().run()

for _ in range(1000):
  batch_xs, batch_ys = mnist.train.next_batch(100)
  sess.run(train_step, feed_dict={x: batch_xs, y_: batch_ys})

correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
print(sess.run(accuracy, feed_dict={x: mnist.test.images, y_: mnist.test.labels}))
```

Paste the example into a new Python 3 Jupyter notebook and execute the code. This should result in a 0.9014 accuracy result against the test data.

Please note that when running on most cloud providers, the public IP address will be exposed to the internet and is an
unsecured endpoint by default. For a production deployment with SSL and authentication, refer to the [documentation](components/jupyterhub).

### Serve a model using TensorFlow Serving

We treat each deployed model as a [component](https://ksonnet.io/docs/tutorial#2-generate-and-deploy-an-app-component) in your APP.

Create a component for your model

```
MODEL_COMPONENT=serveInception
MODEL_NAME=inception
MODEL_PATH=gs://kubeflow-models/inception
ks generate tf-serving ${MODEL_COMPONENT} --name=${MODEL_NAME} 
ks param set ${MODEL_COMPONENT} namespace ${NAMESPACE} 
ks param set ${MODEL_COMPONENT} modelPath ${MODEL_PATH}
```

Deploy the model component. Ksonnet will pick up existing parameters for your environment (e.g. cloud, nocloud) and customize the resulting deployment appropriately

```
ks apply ${KF_ENV} -c ${MODEL_COMPONENT}
```

As before, a few pods and services have been created in your cluster. You can get the inception serving endpoint by querying kubernetes:

```
kubectl get svc inception -n=${NAMESPACE}
NAME        TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)          AGE
inception   LoadBalancer   10.35.255.136   ww.xx.yy.zz   9000:30936/TCP   28m
```

In this example, you should be able to use the inception_client to hit ww.xx.yy.zz:9000

### Serve a model using Seldon
[Seldon-core](https://github.com/SeldonIO/seldon-core) provides deployment for any machine learning runtime that can be [packaged in a Docker container](https://github.com/SeldonIO/seldon-core/blob/master/docs/wrappers/readme.md).

Install the seldon package 

```
ks pkg install kubeflow/seldon
```
Generate the core components

```
ks generate seldon seldon
```
Seldon allows complex runtime graphs for model inference to be deployed. For an example end-to-end integration see the [kubeflow-seldon example](https://github.com/kubeflow/example-seldon). For more details see the [seldon-core documentation](https://github.com/SeldonIO/seldon-core).

### Submitting a TensorFlow training job

**Note:** Before submitting a training job, you should have [deployed kubeflow to your cluster](#deploy-kubeflow). Doing so ensures that
the [`TFJob` custom resource](https://github.com/kubeflow/tf-operator) is available when you submit the training job.

We treat each TensorFlow job as a [component](https://ksonnet.io/docs/tutorial#2-generate-and-deploy-an-app-component) in your APP.

Create a component for your job.

```
JOB_NAME=myjob
ks generate tf-job ${JOB_NAME} --name=${JOB_NAME} --namespace=${NAMESPACE}
```

To configure your job you need to set a bunch of parameters. To see a list of parameters run

```
ks prototype describe tf-job
```

Parameters can be set using `ks param` e.g. to set the Docker image used

```
IMAGE=gcr.io/tf-on-k8s-dogfood/tf_sample:d4ef871-dirty-991dde4
ks param set ${JOB_NAME} image ${IMAGE}
```

You can also edit the `params.libsonnet` files directly to set parameters.

**Warning** Currently setting args via the command line doesn't work because of escaping issues (see [ksonnet/ksonnet/issues/235](https://github.com/ksonnet/ksonnet/issues/235)). So to set the parameters you will need
to directly edit the `params.libsonnet` file directly.

To run your job

```
ks apply ${KF_ENV} -c ${JOB_NAME}
```

For information on monitoring your job please refer to the [TfJob docs](https://github.com/kubeflow/tf-operator#monitoring-your-job).

To delete your job

```
ks delete ${KF_ENV} -c ${JOB_NAME}
```


#### Run the TfCnn example

Kubeflow ships with a [ksonnet prototype](https://ksonnet.io/docs/concepts#prototype) suitable for running the [TensorFlow CNN Benchmarks](https://github.com/tensorflow/benchmarks/tree/master/scripts/tf_cnn_benchmarks).

Create the component

```
CNN_JOB_NAME=mycnnjob
ks generate tf-cnn ${CNN_JOB_NAME} --name=${CNN_JOB_NAME} --namespace=${NAMESPACE}
```

Submit it

```
ks apply ${KF_ENV} -c ${CNN_JOB_NAME}
```

Monitor it (Noted that tf-cnn job is also a tfjobs. Please refer to the [TfJob docs](https://github.com/kubeflow/tf-operator#monitoring-your-job))

```
kubectl get -o yaml tfjobs ${CNN_JOB_NAME}
```

Delete it

```
ks delete ${KF_ENV} -c ${CNN_JOB_NAME}
```

The prototype provides a bunch of parameters to control how the job runs (e.g. use GPUs run distributed etc...). To see a list of paramets

```
ks prototype describe tf-cnn
```

## Advanced Customization

* Often times data scientists require a POSIX compliant filesystem
   * For example, most HDF5 libraries require POSIX and don't work with an object store like GCS or S3
* When working with teams you might want a shared POSIX filesystem to be mounted into your notebook environments
  so that data scientists can work collaboratively on the same datasets.
* Here we show how to customize your Kubeflow deployment to achieve this.


Set the disks parameter to a comma separated list of the Google persistent disks you want to mount
  * These disks should be in the same zone as your cluster
  * These disks need to be created manually via gcloud or the Cloud console e.g.
  * These disks can't be attached to any existing VM or POD.

Create the disks

```
  gcloud --project=${PROJECT} compute disks create  --zone=${ZONE} ${PD_DISK1} --description="PD to back NFS storage on GKE." --size=1TB
  gcloud --project=${PROJECT} compute disks create  --zone=${ZONE} ${PD_DISK2} --description="PD to back NFS storage on GKE." --size=1TB
```

Configure the environment to use the disks.

```
ks param set --env=cloud kubeflow-core disks ${PD_DISK1},${PD_DISK2}
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


## Troubleshooting

### Minikube

On [Minikube](https://github.com/kubernetes/minikube) the Virtualbox/VMware drivers for Minikube are recommended as there is a known
issue between the KVM/KVM2 driver and TensorFlow Serving. The issue is tracked in [kubernetes/minikube#2377](https://github.com/kubernetes/minikube/issues/2377).

### RBAC clusters

If you are running on a K8s cluster with [RBAC enabled](https://kubernetes.io/docs/admin/authorization/rbac/#command-line-utilities), you may get an error like the following when deploying Kubeflow:

```
ERROR Error updating roles kubeflow-test-infra.jupyter-role: roles.rbac.authorization.k8s.io "jupyter-role" is forbidden: attempt to grant extra privileges: [PolicyRule{Resources:["*"], APIGroups:["*"], Verbs:["*"]}] user=&{your-user@acme.com  [system:authenticated] map[]} ownerrules=[PolicyRule{Resources:["selfsubjectaccessreviews"], APIGroups:["authorization.k8s.io"], Verbs:["create"]} PolicyRule{NonResourceURLs:["/api" "/api/*" "/apis" "/apis/*" "/healthz" "/swagger-2.0.0.pb-v1" "/swagger.json" "/swaggerapi" "/swaggerapi/*" "/version"], Verbs:["get"]}] ruleResolutionErrors=[]
```

This error indicates you do not have sufficient permissions. In many cases you can resolve this just by creating an appropriate
clusterrole binding like so and then redeploying kubeflow

```commandline
kubectl create clusterrolebinding default-admin --clusterrole=cluster-admin --user=your-user@acme.com
```

  * Replace `your-user@acme.com` with the user listed in the error message.

If you're using GKE, you may want to refer to [GKE's RBAC docs](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control) to understand
how RBAC interacts with IAM on GCP.

### OpenShift
If you are deploying kubeflow in an [OpenShift](https://github.com/openshift/origin) environment which encapsulates kubernetes, you will need to adjust the security contexts for the ambassador and jupyter-hub deployments in order to get the pods to run.

```commandline
oc adm policy add-scc-to-user anyuid -z ambassador
oc adm policy add-scc-to-user anyuid -z jupyter-hub
```
Once the anyuid policy has been set, you must delete the failing pods and allow them to be recreated in the project deployment.

### Docker for Mac
The [Docker for Mac](https://www.docker.com/docker-mac) Community Edition now ships with Kubernetes support (1.9.2) which can be enabled from their edge channel. If you decide to use this as your Kubernetes environment on Mac, you may encounter the following error when deploying Kubeflow:

```commandline
ks apply default -c kubeflow-core
ERROR Attempting to deploy to environment 'default' at 'https://127.0.0.1:8443', but cannot locate a server at that address
```

This error is due to the fact that the default cluster installed by Docker for Mac is actually set to `https://localhost:6443`. One option is to directly edit the generated `environments/default/spec.json` file to set the "server" variable to the correct location, then retry the deployment. However, it is preferable to initialize your ksonnet app using the desired kube config:

```commandline
export KUBECONFIG=~/.kube/config
ks init my-kubeflow
```

## Why Kubeflow Uses Ksonnet

[Ksonnet](https://ksonnet.io/) is a command line tool that makes it easier to manage complex deployments consisting of multiple components. It is designed to
work side by side with kubectl.

Ksonnet allows us to generate Kubernetes manifests from parameterized templates. This makes it easy to customize Kubernetes manifests for your
particular use case. In the examples above we used this functionality to generate manifests for TfServing with a user supplied URI for the model.

One of the reasons we really like ksonnet is because it treats [environment](https://ksonnet.io/docs/concepts#environment) as in (dev, test, staging, prod) as a first class concept. For each environment we can easily deploy the same components but with slightly different parameters
to customize it for a particular environments. We think this maps really well to common workflows. For example, this feature makes it really
easy to run a job locally without GPUs for a small number of steps to make sure the code doesn't crash, and then easily move that to the
Cloud to run at scale with GPUs.

# Using Ksonnet 

Kubeflow is currently evaluating different strategies for allowing deployments to be customized ([google/kubeflow/issues/23](https://github.com/google/kubeflow/issues/23)).

This directory contains a prototype for using ksonnet to help us evaluate ksonnet.

## Expected UserExperience

* Based on the [tutorial](https://ksonnet.io/docs/tutorial) we think ksonnet could eventually deliver the following experience.

Initialize a directory to contain the user's deployments.
```
ks init my-kubeflow
```

Generate manifests using the published Kubeflow packages.
```
cd my-kubeflow
ks generate kubeflow-deployment ${COMPONENT-NAME}
```
	* kubeflow-deployment is the published name for the prototype
	* ${COMPONENT-NAME} is a user defined name for the component


Define an environment that doesn't use any Cloud features
  * This environment could be used for minikube or a full K8s cluster that doesn't depend on a cloud features.

```
ks env add nocloud
```

The default Kubeflow deployment will be suitable for this no cloud environment so they can just deploy it.

```
ks apply nocloud
```

If the user is running on a Cloud they could create an environment for this.

```
ks env add cloud
ks param set --cloud=gke
```
   * The cloud parameter triggers a set of curated cloud configs.

They can then deploy this environment

```
ks apply cloud
```

### Serve a model

We treat each deployed model as a [component app](https://ksonnet.io/docs/tutorial#2-generate-and-deploy-an-app-component)

Create a component for your model

```
  ks generate tf-model mymodel-server \
   --image gcr.io/heptio-images/ks-guestbook-demo:0.1 \   
```

Deploy it in a particular environment. The deployment will pick up environment parmameters (e.g. cloud) and customize the deployment appropriately

```
ks apply cloud -c mymodel-server 
```

## Kubeflow and ksonnet limitations.

ks doesn't support adding registries yet [ksonnet/ksonnet/issues/38](https://github.com/ksonnet/ksonnet/issues/38); so we can't
define Kubeflow prototypes and a Kubeflow package which the user can use to initialize their config.


* So for now we check in a ksonnet app "my-kubeflow"
* libsonnet files corresponding to Kubeflow protoypes are in the lib/ directory

* The expectation is we will eventually 
   * Have a Kubeflow ksonnet [registry](https://ksonnet.io/docs/concepts#registry) with multiple packages
   * Some of these component packages will be for individual components (e.g. JupyterHub, Airflow etc...)
   * We will probably have one or more packages corresponding to the Kubeflow deployment as a whole.

## Using what exists today

Clone the kubeflow repo

```
git clone https://github.com/google/kubeflow.git git_kubeflow
cd git_kubeflow/ksonnet/my-kubeflow
```

Define your environments as described above.

```
ks env add cloud
ks param set --env=cloud kubeflow namespace $NAMESPACE
ks param set --env=cloud kubeflow cloud gke
```

  * TODO(jlewi): Figure out how we define environment variables that can be set when we create the environment.

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
ks apply cloud -c nfs
```
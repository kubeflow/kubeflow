# Kubeflow Bootstrap

Bootstrap is a tool to create a ksonnet application configured to take advantage
of a user's cluster.

The tool collects information from a variety of sources

- Kubeconfig file
- K8s master
- User input
- Cloud environment

and based on the results chooses good values for various Kubeflow parameters.

**Requires** ksonnet 0.10.0

  - The app generated won't work with earlier versions (0.9) of ksonnet
  - You can use the version of ksonnet built in the docker container as illustrated below.

## Usage

Interactive use 

```
TAG=latest
APP_DIR=<Directory for the ksonnet app>
GITHUB_TOKEN=<Get a [GitHub Token](https://github.com/kubeflow/kubeflow/blob/master/user_guide.md#403-api-rate-limit-exceeded-error) to avoid API Limits>

docker run -ti \
  -e GITHUB_TOKEN=${GITHUB_TOKEN} \
  -e GROUP_ID=`id -g ${GROUP}` \
  -e USER_ID=`id -u ${USER}` \
  -e USER=${USER} \
	-v ${HOME}:/home/${USER} gcr.io/kubeflow-images-staging/bootstraper:latest

/opt/kubeflow/bootstraper --app-dir=${APP_DIR}

# (Optional) enable usage reporting
ks param set kubeflow-core reportUsage true
ks param set kubeflow-core usageId $(uuidgen)

# To deploy it
cd ${APP_DIR}
ks apply default
```

* After the tool runs the ksonnet app for deploying Kubeflow will be available in `${HOST_DIR}/${APP_NAME}`
* The user's home directory is mapped into the container so that
  config files like kubeconfig and gcloud config are accessible.

## Explanation
For Kubeflow we want a **low bar and a high ceiling**.

Low bar means we want Kubeflow to be easily accessible.

High ceiling means we want to allow advanced users to customize Kubeflow in complex ways to meet their needs.

Ksonnet creates a high ceiling that allows Kubeflow users to manage Kubeflow declaratively.

However ksonnet creates a bar to getting started with Kubeflow

1. Users have to download and install the ksonnet tool chain.
1. Users have to learn how to use ksonnet to deploy Kubeflow
1. We lack a mechanism for auto-configuring the ksonnet app based on a user's K8s setup

The config manager aims to solve this by providing a binary/server that can be used to generate
the Kubeflow ksonnet app.

Goals
  1. Provide a tool to auto-generate and deploy Kubeflow

  1. Optimize the initial Kubeflow config for the user's K8s setup

  	* Eventually we'd like to provide a web-ui to allow for a guided onboarding experience

  1. Allow advanced customization by emitting the resulting ksonnet application so that users can do arbitrary
     manipulations

Non Goals

  1. Kubeflow lifecycle management

  	* The current thinking is that lifecycle management should be handled using the application CRD ([KEP](SIG apps repo https://github.com/kubernetes/community/pull/1629) [PR](https://github.com/kubernetes/community/pull/1629)) that sig-apps is developing

  1. wrap or replace ks/kubectl


## Background

Here are some of the current difficulties with deploying Kubeflow today.

### ksonnet is a barrier

As mentioned above, learning and setting up ksonnet is a barrier.

### No mechanism for auto-configure

Kubeflow is adding options to control how Kubeflow is deployed; examples include

- Using persistent storage to back Jupyter notebooks
- How Jupyter auth is handled
- Ingress

While these options raise the ceiling, they make it difficult to get started.

Ksonnet supports default values but finding defaults that work across all K8s deployments is difficult.
[kubeflow/kubeflow#336](https://github.com/kubeflow/kubeflow/issues/336) is one example where relying on a default
storage class caused problems for some users.

We need a mechanism to auto-configure Kubeflow for a particular K8s setup so that we don't end up defaulting
to the lowest common denominator.

### Non K8s dependencies

Another problem is what to do about non-k8s dependencies. For example, as part of deploying Kubeflow users may want to reserve
an ip address to use for ingress.

Some options for dealing with this

1. Create the resources in the bootstrapper

- Downside of this is that it violates the K8s philosophy of managing infrastructure
  declaratively
- It also means salient details about the deployment aren't stored in the configs 
  (ksonnet application) and versioned in source controle

1. Wrap the resource creation/management in a CRD using kube-metacontroller

  - Example: [A CRD for managing Google Cloud Endpoints](https://github.com/danisla/cloud-endpoints-controller)
  
  - One potential downside is that this may require extra permissions.

### No ordering to deployments

There's currently no explicit mechanism in K8s to control the order in which resources are created. Phase ordering is one problem
highlighted in Brian Grant's [doc](https://goo.gl/T66ZcD) about declarative application management in K8s.

Potential solutions

1. implicit phase ordering

  - e.g. if a pod depends on a volume or ConfigMap that pod won't be scheduled
    until the config map exists

## References

[Declarative Application Management in K8s](https://goo.gl/T66ZcD)

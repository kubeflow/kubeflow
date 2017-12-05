# Kubeflow

The Kubeflow project is dedicated to making Machine Learning on Kubernetes easy, portable and scalable. Our goal is **not** to recreate other services, but to provide a straightforward way for spinning up best of breed OSS solutions. Contained in this repository are manifests for creating:

* A JupyterHub to create & manage interactive Jupyter notebooks
* A Tensorflow Custom Resource (CRD) that can be configured to use CPUs or GPUs, and adjusted to the size of a cluster with a single setting
* A Tensorboard instance
* A TF Serving container

This document details the steps needed to run the kubeflow project in any environment in which Kubernetes runs.

## The Kubeflow Mission

Our goal is to help folks use ML more easily, by letting Kubernetes to do what it's great at:
- Easy, repeatable, portable deployments on a diverse infrastructure (laptop <-> ML rig <-> training cluster <-> production cluster)
- Deploying and managing loosely-coupled microservices
- Scaling based on demand

Because ML practitioners use so many different types of tools, it is a key goal that you can customize the stack to whatever your requirements (within reason), and let the system take care of the "boring stuff." While we have started with a narrow set of technologies, we are working with many different projects to include additional tooling.

Ultimately, we want to have a set of simple manifests that give you an easy to use ML stack _anywhere_ Kubernetes is already running and can self configure based on the cluster it deploys into.

## Quick Start

In order to quickly set up all components of the stack, run:

```commandline
kubectl apply -f components/ -R
```

The above command sets up JupyterHub, an API for training using Tensorflow, and a set of deployment files for serving. 
Used together, these serve as configuration that can help a user go from training to serving using Tensorflow with minimal
effort in a portable fashion between different environments. You can refer to the instructions for using each of these components below. 

## Setup

This documentation assumes you have a Kubernetes cluster already available. For specific Kubernetes installations, additional configuration may be necessary.

### Minikube

[Minikube](https://github.com/kubernetes/minikube) is a tool that makes it easy to run Kubernetes locally. Minikube runs a
single-node Kubernetes cluster inside a VM on your laptop for users looking to try out Kubernetes or develop with it day-to-day. 
The below steps apply to a minikube cluster - the latest version as of writing this documentation is 0.23.0. You must also have 
kubectl configured to access minikube.

### Google Kubernetes Engine

[Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/) is a managed environment for deploying Kubernetes applications powered by Google Cloud.
If you're using Google Kubernetes Engine, prior to creating the manifests, you must grant your own user the requisite RBAC role to create/edit other RBAC roles.

```commandline
kubectl create clusterrolebinding default-admin --clusterrole=cluster-admin --user=user@gmail.com
```
## Tutorial

### Bringing up a Notebook

Once you create all the manifests needed for JupyterHub, a load balancer service is created. You can check its existence using the kubectl commandline.

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

Note that when running on Google Kubernetes Engine, the public IP address will be exposed to the internet and is an 
unsecured endpoint. For a production deployment, refer to the [detailed documentation](jupyterhub/README.md) on 
how to set up SSL and authentication for your Hub. 

### Training

Please refer to the README in the [tensorflow/k8s](https://github.com/tensorflow/k8s) repository for more information on
using the TfJob controller to run TensorFlow jobs on K8s.

### Serve Model

TODO(owensk)

## Components

### JupyterHub

JupyterHub allows users to create, and manage multiple single-user Jupyter notebooks. Note that the configuration provided 
aims at simplicity. If you want to configure it for production scenarios, including SSL, authentication, etc, refer to the [detailed documentation](jupyterhub/README.md) on Jupyterhub.

### Tensorflow Serving

TODO(owensk)

## Roadmap

TBD

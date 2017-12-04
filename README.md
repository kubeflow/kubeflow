# Kubeflow Anywhere

The Kubeflow project is a new open source Github repo dedicated to reducing friction in doing Machine Learning on Kubernetes. Contained in this repository are:

* JupyterHub to create & manage interactive Jupyter notebooks
* A Tensorflow Custom Resource (CRD) that can be configured to use CPUs or GPUs, and adjusted to the size of a cluster with a single setting
* A Tensorboard instance
* A TF Serving container

This document details the steps needed to run the Kubeflow project in different environments, such as Minikube (local laptop). Google Kubernetes Engine, etc. 

## Quick Start

In order to quickly set up all components of the stack, run:

```commandline
kubectl apply -f manifests/ -R
```

The above command sets up JupyterHub, an API for training using Tensorflow, and a set of deployment files for serving. 
Used together, these serve as configuration that can help a user go from training to serving using Tensorflow with minimal
effort in a portable fashion between different environments. You can refer to the instructions for using each of these components below. 

## Setup

### Minikube

[Minikube](https://github.com/kubernetes/minikube) is a tool that makes it easy to run Kubernetes locally. Minikube runs a single-node Kubernetes cluster inside a VM on your laptop for users looking to try out Kubernetes or develop with it day-to-day. 
The below steps apply to a minikube cluster - the latest version as of writing this documentation is 0.23.0. You must also have 
kubectl configured to access minikube.

### Google Kubernetes Engine

[Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/) is a managed environment for deploying Kubernetes applications powered by Google Cloud.
TODO(foxish): rbac role binding goes here.

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

If you're on Google Kubernetes engine, the LoadBalancer service should get an external IP address associated with 
it automatically in a minute. `kubectl get svc` should have the external IP field populated after that. 
Once you have an external IP, you can proceed to visit that in your browser. The hub by default is configured to take any username/password combination. After entering the username and password, you can start a single-notebook server,
request any resources (memory/CPU/GPU), and then proceed to perform single node training.

Note that when running on Google Kubernetes Engine, the public IP address will be exposed to the internet and is an 
unsecured endpoint. For a production deployment, refer to the [detailed documentation](jupyterhub/README.md) on 
how to set up SSL and authentication for your Hub. 

###  Single node Training

TODO(vishh)

### Distributed Training

Please refer to the README in the [tensorflow/k8s](https://github.com/tensorflow/k8s) repository for more information on
using the TfJob controller to run distributed TensorFlow jobs on K8s.

### Serve Model

TODO(owensk)

## Components

### JupyterHub

JupyterHub allows users to create, and manage multiple single-user Jupyter notebooks. Note that the configuration provided 
aims at simplicity. If you want to configure it for production scenarios, including SSL, authentication, etc, refer to the [detailed documentation](jupyterhub/README.md) on Jupyterhub.

### Tensorflow Training Operator

TODO(jlewi)

### Tensorflow Serving

TODO(owensk)

## The Kubeflow Mission

TODO(aronchick)

## Roadmap

TODO(aronchick)

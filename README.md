<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Kubeflow](#kubeflow)
  - [Quick Links](#quick-links)
  - [The Kubeflow Mission](#the-kubeflow-mission)
  - [Who should consider using Kubeflow?](#who-should-consider-using-kubeflow)
  - [Setup](#setup)
  - [Quick Start](#quick-start)
    - [Requirements](#requirements)
    - [Steps](#steps)
  - [Troubleshooting](#troubleshooting)
  - [Resources](#resources)
  - [Get Involved](#get-involved)
    - [Who should consider contributing to Kubeflow?](#who-should-consider-contributing-to-kubeflow)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Kubeflow

The Kubeflow project is dedicated to making **deployments** of machine learning (ML) workflows on [Kubernetes](https://kubernetes.io/) simple, portable and scalable. Our goal is **not** to recreate other services, but to provide a straightforward way to deploy best-of-breed open-source systems **for ML** to diverse infrastructures. Anywhere you are running Kubernetes, you should be able to run Kubeflow.

****

This repository contains the manifests for creating:

* A [**JupyterHub**](https://jupyterhub.readthedocs.io/en/latest/) to create
  and manage interactive [Jupyter notebooks](http://jupyter.org).
  [Project Jupyter](http://jupyter.org/about) is a non-profit, open-source
  project to support interactive data science and scientific computing across
  all programming languages.
* A [**TensorFlow Training Controller**](https://github.com/kubeflow/tf-operator) that can be configured to use either CPUs or GPUs and dynamically adjusted to the size of a cluster with a single setting
* A **TensorFlow Serving** container to export trained TensorFlow models to Kubernetes

This document details the steps needed to run the Kubeflow project in any environment in which Kubernetes runs.

## Quick Links
* [Prow test dashboard](https://k8s-testgrid.appspot.com/sig-big-data)
* [Prow jobs dashboard](https://prow.k8s.io/?repo=kubeflow%2Fkubeflow)
* [Argo UI for E2E tests](http://testing-argo.kubeflow.org)

## The Kubeflow Mission

Our goal is to make scaling machine learning (ML) models and deploying them to production as simple as possible, by letting Kubernetes do what it's great at:
- Easy, repeatable, portable deployments on a diverse infrastructure (laptop <-> ML rig <-> training cluster <-> production cluster)
- Deploying and managing loosely-coupled microservices
- Scaling based on demand

Because ML practitioners use a diverse set of tools, one of the key goals is to customize the stack based on user requirements (within reason) and let the system take care of the "boring stuff". While we have started with a narrow set of technologies, we are working with many different projects to include additional tooling.

Ultimately, we want to have a set of simple manifests that give you an easy to use ML stack _anywhere_ Kubernetes is already running, and can self configure based on the cluster it deploys into.

## Who should consider using Kubeflow?

Based on the current functionality you should consider using Kubeflow if:

  * You want to train/serve TensorFlow models in different environments (e.g. local, on prem, and cloud)
  * You want to use Jupyter notebooks to manage TensorFlow training jobs
  * You want to launch training jobs that use resources -- such as additional
    CPUs or GPUs -- that aren't available on your personal computer
  * You want to combine TensorFlow with other processes
       * For example, you may want to use [tensorflow/agents](https://github.com/tensorflow/agents) to run simulations to generate data for training reinforcement learning models.

This list is based ONLY on current capabilities. We are investing significant resources to expand the
functionality and actively soliciting help from companies and individuals interested in contributing (see [below](README.md#who-should-consider-contributing-to-kubeflow)).

## Setup

This documentation assumes you have a Kubernetes cluster already available. If you need help setting up a Kubernetes cluster please refer to [Kubernetes Setup](https://kubernetes.io/docs/setup/). Minikube users please check these [instructions](user_guide.md#minikube). If you want to use GPUs, be sure to follow the Kubernetes [instructions for enabling GPUs](https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/).

## Quick Start

### Requirements

  * ksonnet version [0.9.2](https://ksonnet.io/#get-started).
  * Kubernetes >= 1.8 [see here](https://github.com/kubeflow/tf-operator#requirements)

### Github Tokens

It is HIGHLY likely you'll overload Github's API if you are unauthenticated. To get around this, do the following steps:

* Go to https://github.com/settings/tokens and generate a new token. You don't have to give it any access at all as you are simply authenticating.
* Make sure you save that token someplace because you can't see it again. If you lose it you'll have to delete and create a new one.
* Set an environment variable in your shell: export GITHUB_TOKEN=<token>. You may want to do this as part of your shell startup scripts (i.e. .profile).

```
echo "export GITHUB_TOKEN=${GITHUB_TOKEN}" >> ~/.bashrc
```

### Steps

In order to quickly set up all components, execute the following commands:

```commandline
# Create a namespace for kubeflow deployment
NAMESPACE=kubeflow
kubectl create namespace ${NAMESPACE}

# Which version of Kubeflow to use
# For a list of releases refer to:
# https://github.com/kubeflow/kubeflow/releases
VERSION=v0.1.2

# Initialize a ksonnet app. Set the namespace for it's default environment.
APP_NAME=my-kubeflow
ks init ${APP_NAME}
cd ${APP_NAME}
ks env set default --namespace ${NAMESPACE}

# Install Kubeflow components
ks registry add kubeflow github.com/kubeflow/kubeflow/tree/${VERSION}/kubeflow

ks pkg install kubeflow/core@${VERSION}
ks pkg install kubeflow/tf-serving@${VERSION}
ks pkg install kubeflow/tf-job@${VERSION}

# Create templates for core components
ks generate kubeflow-core kubeflow-core

# If your cluster is running on Azure you will need to set the cloud parameter.
# If the cluster was created with AKS or ACS choose aks, it if was created
# with acs-engine, choose acsengine
# PLATFORM=<aks|acsengine>
# ks param set kubeflow-core cloud ${PLATFORM}

# Enable collection of anonymous usage metrics
# Skip this step if you don't want to enable collection.
ks param set kubeflow-core reportUsage true
ks param set kubeflow-core usageId $(uuidgen)

# Deploy Kubeflow
ks apply default -c kubeflow-core
```

The above commands are used to setup JupyterHub and a custom resource for running TensorFlow training jobs. Furthermore, the ksonnet packages provide prototypes that can be used to configure TensorFlow jobs and deploy TensorFlow models.
Used together, these make it easy for a user to transition from training to model serving using Tensorflow with minimal
effort, and in a portable fashion across different environments.

For more detailed instructions about how to use Kubeflow, including testing the Jupyter Notebook, please refer to the [user guide](user_guide.md).

**Important**: The commands above will enable collection of **anonymous** user data to help us improve Kubeflow; for more information including instructions for explictly
disabling it please refer to the [Usage Reporting section](user_guide.md#usage-reporting) of the user guide.

## Troubleshooting
For detailed troubleshooting instructions, please refer to [this section of the user guide](user_guide.md#troubleshooting).

## Resources

* The [kubeflow user guide](user_guide.md) provides in-depth instructions for using Kubeflow
* Katacoda has produced a [self-paced scenario](https://www.katacoda.com/kubeflow) for learning and trying out Kubeflow

## Get Involved

* [Slack Channel](https://join.slack.com/t/kubeflow/shared_invite/enQtMjgyMzMxNDgyMTQ5LWUwMTIxNmZlZTk2NGU0MmFiNDE4YWJiMzFiOGNkZGZjZmRlNTExNmUwMmQ2NzMwYzk5YzQxOWQyODBlZGY2OTg)
* [Twitter](http://twitter.com/kubeflow)
* [Mailing List](https://groups.google.com/forum/#!forum/kubeflow-discuss)

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

The Kubeflow community is guided by our [Code of Conduct](https://github.com/kubeflow/community/blob/master/CODE_OF_CONDUCT.md), which we encourage everybody to read before participating.

### Who should consider contributing to Kubeflow?

* Folks who want to add support for other ML frameworks (e.g. PyTorch, XGBoost, scikit-learn, etc...)
* Folks who want to bring more Kubernetes magic to ML (e.g. ISTIO integration for prediction)
* Folks who want to make Kubeflow a richer ML platform (e.g. support for ML pipelines, hyperparameter tuning)
* Folks who want to tune Kubeflow for their particular Kubernetes distribution or Cloud
* Folks who want to write tutorials/blog posts showing how to use Kubeflow to solve ML problems

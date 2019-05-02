# Deploying Kubeflow

Authors:

  * jlewi@google.com

Status:

  * 2018-07-08 Created

## TL;DR

This document describes how we are approaching the problem of deploying Kubeflow.

This document is primarily intended for Kubeflow contributors and in particular
contributors interested in

- Improving the user experience
- Creating an optimized experience for a particular platform.

## Goals For Deploying Kubeflow

Kubeflow is a Kubernetes native platform for machine learning.
When it comes to deploying Kubeflow the primary goals are

1. Creating a very simple getting started experience
1. Allow Kubeflow to be customized and optimized for different platforms

## Glossary

Platform - We use platform to refer to the entirety of a user's solution. This
  includes not only Kubeflow and Kubernetes distribution but supporting services
  that may be external to Kubernetes (e.g. S3/GCS).

## Getting Started Experience: one click or one command

With our 0.3 release we'd like to offer users a one command or one click
experience.

1. User deploys Kubeflow on their platform using one click or one command

   * Using the command line (with required tools preinstalled) the experience should
     be something like

     ```
     curl https://github.com/kubeflow/kubeflow/blob/master/scripts/gke/deploy.sh | bash
     ```


   * Alternatively, we'd like to offer a web-app that allows deployments with one click

     * A web-app creates an opportunity to offer a wizard that can help walk users through
       the setup process

     * A web-app can also eliminate the need to install any tools client side


   * We'd like to offer scripts for various platforms including major clouds as well
     as solutions for deploying Kubeflow locally on one's machine (e.g. docker, minikube, microk8s)

   * The script should take care of setting up Kubernetes and supporting services
     for each platform

1. Scripts/users use standard K8s patterns to determine when Kubeflow is ready

   ```
   kubectl get application kubeflow
   ```

   * We use the sig apps [application resource](https://github.com/kubernetes-sigs/application)
     to represent Kubeflow and provide status information

   * K8s events will be used to surface information about the deployment process.

1. Users can easily navigate to JupyterLab after deploying Kubeflow

   * JupyterLab provides a suitable environment for running Kubeflow codelabs
   * Jupyter provides a notebook solution, a text editor, and command line shell.
   * We will provide a curated Jupyter notebook for running Kubeflow codelabs.

1. Users clone Kubeflow codelabs in JupyterLab and go through them

1. Users can easily transition to managing/customizing Kubeflow from their local
   machine

   * If they deployed via script the ksonnet app should already be on their local
     machine

   * If they deployed by webapp they can easily clone the app to their local machine; e.g.

     ```
     kubectl cp kubeflow-admin/kubeflow-bootstrapper-0:/opt/bootstrap/default ~/my-kubeflow
     ```

## Customizing & Optimizing Kubeflow For Different Platforms

One of the goals of Kubeflow is to run anywhere Kubernetes runs.
**However we also want to optimize Kubeflow to take advantage of features in
different K8s versions and platforms.**

We've tried a variety of approaches but the approach that is gaining traction
is

1. We provide simple, platform deployment scripts like this [one for GKE](https://github.com/kubeflow/kubeflow/blob/master/scripts/gke/deploy.sh)

1. A corresponding platform specific getting started page ([see here](https://github.com/kubeflow/website/tree/master/content/docs/started) provides platform specific instructions

Here are some **guidelines (not requirements)** for creating the above scripts and instructions

* Platform scripts should assume users are starting from scratch

  * Scripts should create K8s clusters and supporting services as needed

  * This is based on anecdotal evidence that most Kubeflow users to date
    are creating infrastructure specific for Kubeflow rather than deploying on
    existing infrastructure.

  * New features for ML (e.g. GPU support advanced, job scheduling) are landing
    in each K8s release. So spinning up a new K8s cluster with appropriate
    features enabled is often advantageous.

* Declarative approaches to managing infrastructure (e.g. Terraform) are preferred

  * Kubeflow aims to adopt K8s patterns; managing infrastructure declaratively
    is one such pattern

  * Another Kubeflow principle is low bar high ceiling

  	* Declarative configs help this by providing a starting point for users
  	  looking to customize the deployment further

* Scripts should tend toward simplicity and readability

  * Scripts should primarily be sugar that prevent users from having to
    copy and paste a bunch of commands.

  * Scripts should be readable

* Scripts should have a linear flow e.g.

   * Create non K8s resources (including K8s cluster if appropriate)

   * Create Kubeflow K8s resources

* To avoid hitting GitHub API limits and requiring users to create a GitHub token
  the recommended approach is

  1. Fetch and unpack an archive copy of the repository.

  	 ```
  	 curl -L -O /tmp/source.tar.gz https://github.com/kubeflow/kubeflow/archive/v0.2.0.tar.gz
     tar -zxvf /tmp/source.tar.gz
	 ```

  1. Add the registry as a file path and not a git registry

  	 ```
  	 ks registry add kubeflow $/tmp/source
  	 ```

  * Since the registry is added from a local file and not Git the registry will only
    be valid on that machine. To mitigate the effects of moving the ksonnet app to other machines you can install any packages you think users might want

  * Installed packages are stored in the ksonnet app vendor directory; they will be
    valid on other machines provided you preserve the vendor directory (e.g. check it in to source control).

  * There is an open issue [ksonnet/ksonnet#64](https://github.com/ksonnet/ksonnet/issues/641) to support this pattern
    natively in ksonnet and address these limitations.

## Open Question: Ensuring a common experience

An open question is finding the right balance between ensuring a common experience across all platforms
while still giving maintainers of a particular platform the ability to customize that experience.

I think we'd like to have a well defined concept of base Kubeflow which consists of a good set of components
that we think all users will want. Platform maintainers should be discouraged from removing components in base.
If users want to remove certain base components they are free to do so and can easily do so.

We have yet to find a good method for defining the base components. Currently, the base components
is defined by the components generated in the deploy script. This works but will probably be difficult
to avoid fragmentation as scripts are added for more platforms.

We had previously tried defining a ksonnet core prototype consisting of all the components that should be
installed by default. This had some unfortunate side effects and I think we want to avoid creating a single prototype
for multiple components going forward

   * A user should be able to manage the components individually; e.g. updating JupyterHub without updating other components
   * We end up combining the parameters for all the components into a single prototype file which is a bit unwieldy
   * It limits our ability to organize components into ksonnet packages by application (e.g. TensorFlow, PyTorch, Jupyter)

## Monitoring Kubeflow Deployment

Monitoring deployment is an open area. The initial focus is:

  1. Informing the user when Kubeflow is fully deployed and ready to use
  1. Surfacing relevant events (e.g. as K8s events)

For more info please take a look at some of the open issues and consider
opening more.

The current thinking is to follow the guidance of sig-apps and use an [application resource](https://github.com/kubernetes-sigs/application)
to represent Kubeflow and attach events, status, and other metrics to that application as appropriate.


* [kubeflow/kubeflow#1106](https://github.com/kubeflow/kubeflow/issues/1106) Use Application CRD to describe Kubeflow
* [kubeflow/kubeflow#1142](https://github.com/kubeflow/kubeflow/issues/1142) - Report K8s events to indicate when Kubeflow is ready
* [kubeflow/kubeflow#955](https://github.com/kubeflow/kubeflow/issues/955) - Determine when ingress to Kubeflow is ready

## Testing

Continuous testing of deploy scripts is critical. When our test infrastructure
is sufficiently mature CI will likely be a requirement in order to be an officially
recommended solution on kubeflow.org.

For more information on testing

* Refer to [docs](https://github.com/kubeflow/testing) for our test infrastructure

# References

* [kubeflow/kubeflow#105](https://github.com/kubeflow/kubeflow/issues/105) - Make it
  easy to get started with Kubeflow
* [kubeflow/kubeflow#23](https://github.com/kubeflow/kubeflow/issues/23) - Original issue about tooling and configuration.
* [kubeflow/kubeflow#376](https://github.com/kubeflow/kubeflow/issues/376) - Discussion of ksonnet patterns

# Appendix: Other Approaches to Customization

## Auto Configuration

One of the ideas we considered was creating a simple program (originally called bootstrapper) that could automatically optimize a
Kubeflow configuration
based on a user's setup. For example, if the K8s cluster has a default storage
class the program would automatically configure JupyterHub to use persistent
volumes for notebook storage.

So far this idea hasn't gained much traction.

Most of the setup to date has focused on users starting from scratch. In this situation we
have complete control of the setup so there's no reason to optimize with respect to an
existing deployment.

The scaffolding/prototype for this (bootstrapper) is still in place and we haven't
rejected this idea completely. So contributions pursuing this idea further would
be welcome.

## Cloud ksonnet parameter

An early idea was to have a simple ksonnet/template parameter
(originally called cloud). This parameter would correspond to different
platforms (e.g. GKE or Azure or minikube).

This idea has largely proven to be unworkable and abandoned.

* We need more customizability such as the ability to install different
  components based on the user's setup.

* It lead to really complex jsonnet e.g. using late binding to inject different
  types of credentials. The current thinking is to find better patterns (e.g. Admission controllers) that avoid complex jsonnet
  see [kubeflow/kubeflow#376](https://github.com/kubeflow/kubeflow/issues/376).

## YAML manifests

For a while we tried to get an experience that was the equivalent of

```
kubectl create -f https://.../kubeflow_manifests.yaml
```

We are moving away from this approach in favor of deploy.sh for a variety of reasons

* Some amount of customization of the YAML was always needed and a deploy script
  can help automate this

* This approach worked by creating a bootstrapper that ran on the cluster and then
  deployed the app. This had the following drawbacks

  1. You had to grant the pod elevated permissions
  1. We still needed a deploy.sh script to create the cluster itself at which point
     it just made sense to run all the logic on the client.

* A click to deploy web app provides a better experience in the case where users
  don't want to install any command line tools to get started.

# Kubeflow 2019 roadmap

The roadmap provides a high level overview of key areas that will likely span multiple releases.

The roadmap provides links to critical user journeys(CUJs) that we want to deliver.
A CUJ shows how a user would accomplish some critical task (for example build, train, and deploy a model).

Kubeflow does a major release at the end of every quarter. Minor releases occur as needed to fix important bugs.

For detailed information about what will be in a release look
for the issues tagged "area/X.Y.Z".

If you are a member of the Kubeflow org you can use these search queries
  * Issues for [0.4.0](https://github.com/issues?utf8=%E2%9C%93&q=org%3Akubeflow+label%3Aarea%2F0.4.0)

## Kubeflow 0.6

0.6 was released in mid-july; [blog post](https://medium.com/kubeflow/kubeflow-v0-6-a-robust-foundation-for-artifact-tracking-data-versioning-multi-user-support-9896d329412c)

Deployment

  * kustomize replaced ksonnet for application configuration
  * kfctl can now take a single YAML file specifying a KFDef describing Kubeflow ([example](https://github.com/kubeflow/kubeflow/blob/master/bootstrap/config/kfctl_gcp_iap.yaml))
  * ISTIO used as the service mesh

Metadata

   * Introduced support for artifact tracking via a UI and python SDK
   * Predefined schemas for models, datasets, and evaluation metrics

Multi-user support

   * ISTIO and RBAC for AuthZ
   * Dex provides a reference implementation for AuthN
   * Integration with GCP and AWS AuthN services
   * Profile resource to manage per-team namespaces
   * Kubeflow identity management API to manage multiple users/teams     

Training

   * TFJob and PyTorch to 1.0

Pipelines
   * UI improvements: 
     * 10x Perf improvement (e.g. load list of runs) 
   * API performance optimization
   * streamlined run creation
   * stackdriver integration for logs (better debugging)
   * better visualization of metadata outputs
   * Tensorboard CRD
   * versioning for data volumes


## Kubeflow 0.7

Following Kubeflow's quarterly relese schedule Kubeflow 0.7 will be released in October 2019.

Notebooks

  * Notebook infrastructure to beta quality in 0.7 
    * 1.0 in the following release
  * The notebook infrastructure has 2 primary pieces; the jupyter notebook controller
    and web application for managing notebooks
  * [Kanban board](https://github.com/orgs/kubeflow/projects/11)

Deployment

   * kfctl to beta quality in 0.7
     * 1.0 in the following release
   * v1beta1 for KfDef
     * Create a more consistent and clean API for describing Kubeflow deployments
     * Handle plugins and platforms consistently
   * Clean up kfctl flags and semantics
   * Upgradability between minor and major releases ([issue](https://github.com/kubeflow/kubeflow/issues/3727))
   * [Kanban board](https://github.com/orgs/kubeflow/projects/28)

Monitoring

   * Kubernetes' [applications](https://github.com/kubernetes-sigs/application)
     provide a unified view of the deployed Kubeflow applications and their state

Metadata

   * Generic logger to auto log K8s resources to metadata store
   * [Kanban board](https://github.com/orgs/kubeflow/projects/12)

Enterprise support

   * Restrict kubeflow access to subset of namespaces ([kubeflow/kubeflow#3623](https://github.com/orgs/kubeflow/projects/18))
   * Profile controller to beta
   * Kubeflow identity management API and UI to beta

Onpremise support

   * E2E CI for setup and multi-user support in on premise environments   
   * [Kanban board](https://github.com/orgs/kubeflow/projects/18)

Data management

   * Persistent volume management via a central dashboard UI

Engprod

   * Remove ksonnet from E2E testing
   * CI for applications in scope for 1.0 (notebooks, job operators, central dashboard etc..)
   * [Kanban board](https://github.com/orgs/kubeflow/projects/13)

Support for hardware accelerated training and inference

   * Automatic injection of device configuration needed to use hardware accelerators
     for training and inference

## Kubeflow 1.0

We are targeting a 1.0 release in January 2020. Our 1.0 release consists of the following key pieces

1. A core set of applications targeting the critical user journey of build-train-deploy
1. Scaffolding to securely deploy and manage multi-user Kubeflow environments on-prem and in the cloud.

We are currently targeting the following applications to graduate to 1.0 as part of the initial Kubeflow release

* kfctl for deployment and upgrades
* TFJob and PyTorch for distributed training (already 1.0)
* Jupyter notebook controller and web app
* Profile controller and UI for multiuser management

The following applications will likely be of beta quality for the 1.0 release with a goal of graduating to 1.0 in Q1 2020

* Katib for hyper-parameter tuning
* fairing SDK to facilite use of notebooks for build-train-deploy
* Metadata SDK, UI, and backend
* KFServing for model deployment and inference

Here is a preliminary list of limitations and requirements that will be part of our 1.0 release

* ISTIO will be required as a service mesh and for AuthN and AuthZ support
* We will only support a single shared Kubeflow deployment per Kubernetes cluster
  * Users can consume Kubeflow in their own, isolated namespace
* Upgrades will require downtime
* Upgradability will not support advanced customization (e.g. custom overlays) for Kustomize packages

  * We expect application to expose a list of parameters that can be customized without breaking upgradability
  * Customization beyond these parameters will require manual configuration on upgrade

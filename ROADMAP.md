# Kubeflow 2019 roadmap

The roadmap provides a high level overview of key areas that will likely span multiple releases.

The roadmap provides links to critical user journeys(CUJs) that we want to deliver.
A CUJ shows how a user would accomplish some critical task (for example build, train, and deploy a model).

Kubeflow does a major release at the end of every quarter. Minor releases occur as needed to fix important bugs.

For detailed information about what will be in a release look
for the issues taged "area/X.Y.Z".

If you are a member of the Kubeflow org you can use these search queries
  * Issues for [0.4.0](https://github.com/issues?utf8=%E2%9C%93&q=org%3Akubeflow+label%3Aarea%2F0.4.0)

## Kubeflow 1.0

We are working diligently to get Kubeflow to its first major version release 1.0 and plan to have this ready in early half of 2019. This will be a significant milestone for the project. Here are some critical areas for the release:


*   Stabilized APIs for training (TFJob/PyTorch operators) and serving.

	* [PyTorch issues](https://github.com/issues?utf8=%E2%9C%93&q=org%3Akubeflow+label%3Aarea%2Fpytorch)
	* [TFJob issues](https://github.com/issues?utf8=%E2%9C%93&q=org%3Akubeflow+label%3Aarea%2Ftfjob+)
*   Robust support for monitoring and logging.
*   Scale and load testing.
*   Integration with hyperparameter tuning with Katib.
	* [Katib Issues](https://github.com/issues?utf8=%E2%9C%93&q=org%3Akubeflow+label%3Aarea%2Fkatib+)
*   A new [dashboard experience](http://bit.ly/kf-landing-page-cuj)
    *   [Tracker Issue](https://github.com/kubeflow/kubeflow/issues/2359)

## Enterprise Readiness

The features in this enterprise readiness theme focus on better integration with existing enterprise infrastructure and support for secure data access. Some of the highlights in the area include:

*   Multi User Kubeflow Deployments
	* [CUJ](http://bit.ly/kubeflow_cuj_multi_user)
	* [Design Doc for Jupyter](http://bit.ly/kf_jupyter_design_doc)
*   Isolation of environments within a cluster.
*   RBAC and IAM integrations.
*   Support for multi-tenancy.
*   Hybrid/Multi-cluster deployments.
*   Support for POSIX filesystems.
*   [Issues](https://github.com/issues?utf8=%E2%9C%93&q=org%3Akubeflow+label%3Aarea%2Fenterprise_readiness+)

## Deployment Experience

We have heard from our users and based on the feedback we are continuing to improve the deployment experience of Kubeflow. Here are some areas we are working on:

*   A uniform CLI / UI based deployment experience based on a common backend [kubeflow/kubeflow#1419](https://github.com/kubeflow/kubeflow/issues/1419).
*   Simplified UI Driven deployment.
*   Support for upgrading existing Kubeflow deployments.
*   Simplified deployment for local Kubeflow using Minikube and Microk8s.
	* [Minikube Issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+org%3Akubeflow+label%3Aplatform%2Fminikube)
	* [MicroK8s Issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+org%3Akubeflow+label%3Aplatform%2Fmicrok8s+)
*   [Deployment related issues](https://github.com/kubeflow/kubeflow/issues?q=is%3Aopen+is%3Aissue+label%3Aarea%2Fbootstrap)

## Development Experience

Continue to improve development experience for Data Scientists and ML Practitioners using Kubeflow.

*   Notebooks driven interface for developing ML workflows and pipelines.
    * [CUJ](http://bit.ly/cuj_train_deploy_notebook) illustrating Build/Train/Deploy from Notebook
	* [Jupyter related issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+org%3Akubeflow+label%3Aarea%2Fjupyter)
	* [Fairing project](https://github.com/kubeflow/fairing)
*   Minimize the need for switching contexts out of the notebook / development environment for launching / tracking jobs.
*   Provide a seamless experience for local development connected with cloud/on-prem execution environment.


## Advanced ML Platform

Continue to build and incorporate additional components enabling advanced ML workflows.


*   Katib integration to work with TFJob or PyTorch operators for hyperparameter tuning [kubeflow/katib#39](https://github.com/kubeflow/katib/issues/39).
*   Make all new and updated TFX components available.
*   Feature engineering and feature management support.
*   Model management and deployment support.
	* [Issues](https://github.com/issues?utf8=%E2%9C%93&q=org%3Akubeflow+label%3Aarea%2Fmodel-management)


## Test Release Infrastructure

With a growing community of developers across Kubeflow there is a need to build/support tools and engineering practices that will enable faster development and reliable releases.

*   Support for release workflows.
*   Scalable testing across platforms: GPU Testing, Different base images, multiple H/W and Cloud platforms.
*   Upgrade testing.
*   [Testing Issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+org%3Akubeflow+label%3Aarea%2Ftesting)
*   [Build/Release issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+org%3Akubeflow+label%3Aarea%2Fbuild-release+)

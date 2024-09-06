# Kubeflow

[![Join Kubeflow Slack](https://img.shields.io/badge/slack-join_chat-white.svg?logo=slack&style=social)](https://www.kubeflow.org/docs/about/community/#kubeflow-slack-channels)
[![CLOMonitor](https://img.shields.io/endpoint?url=https://clomonitor.io/api/projects/cncf/kubeflow/badge)](https://clomonitor.io/projects/cncf/kubeflow)

<img src="./logo/icon.svg" width="120">

## About Kubeflow

[Kubeflow](https://www.kubeflow.org/) makes artificial intelligence and machine learning simple, portable, and scalable.

We are an _ecosystem_ of [Kubernetes](https://kubernetes.io/) based components for each stage in the [AI/ML Lifecycle](https://www.kubeflow.org/docs/started/architecture/#kubeflow-components-in-the-ml-lifecycle) with support for best-in-class open source [tools and frameworks](https://www.kubeflow.org/docs/started/architecture/#kubeflow-ecosystem).
Please refer to the official [documentation](https://www.kubeflow.org/docs/) for more information.

## Kubeflow Components

The [Kubeflow Ecosystem](https://www.kubeflow.org/docs/started/architecture/#kubeflow-ecosystem) is composed of several projects known as _Kubeflow Components_.

The following table lists the components and their respective source code repositories:

| Component                                                                                   | Source Code                                                                   |
|---------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| [KServe](https://www.kubeflow.org/docs/external-add-ons/kserve/)                            | [`kserve/kserve`](https://github.com/kserve/kserve)                           |
| [Kubeflow Katib](https://www.kubeflow.org/docs/components/katib/)                           | [`kubeflow/katib`](https://github.com/kubeflow/katib)                         |
| [Kubeflow Model Registry](https://www.kubeflow.org/docs/components/model-registry/)         | [`kubeflow/model-registry`](https://github.com/kubeflow/model-registry)       |
| [Kubeflow MPI Operator](https://www.kubeflow.org/docs/components/training/user-guides/mpi/) | [`kubeflow/mpi-operator`](https://github.com/kubeflow/mpi-operator)           |
| [Kubeflow Notebooks](https://www.kubeflow.org/docs/components/notebooks/)                   | [`kubeflow/notebooks`](https://github.com/kubeflow/notebooks)                 |
| [Kubeflow Pipelines](https://www.kubeflow.org/docs/components/pipelines/)                   | [`kubeflow/pipelines`](https://github.com/kubeflow/pipelines)                 |
| [Kubeflow Spark Operator](https://www.kubeflow.org/docs/components/spark-operator/)         | [`kubeflow/spark-operator`](https://github.com/kubeflow/spark-operator)       |
| [Kubeflow Training Operator](https://www.kubeflow.org/docs/components/training/)            | [`kubeflow/training-operator`](https://github.com/kubeflow/training-operator) |

## Kubeflow Platform

The [Kubeflow Platform](https://www.kubeflow.org/docs/started/introduction/#what-is-kubeflow-platform) refers to the full suite of Kubeflow Components bundled together with additional integration and management tools.

The following table lists the platform components and their respective source code repositories:

| Component                                                                                           | Source Code                                                   |
|-----------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| [Central Dashboard](https://www.kubeflow.org/docs/components/central-dash/)                         | [`kubeflow/dashboard`](https://github.com/kubeflow/dashboard) |
| [Profile Controller](https://www.kubeflow.org/docs/components/central-dash/profiles/)               | [`kubeflow/dashboard`](https://github.com/kubeflow/dashboard) |
| [Kubeflow Manifests](https://www.kubeflow.org/docs/started/installing-kubeflow/#kubeflow-manifests) | [`kubeflow/manifests`](https://github.com/kubeflow/manifests) |

## Kubeflow Community & Contributing

Kubeflow is a community-lead project maintained by the [Kubeflow Working Groups](https://www.kubeflow.org/docs/about/community/#kubeflow-working-groups) under the guidance of the [Kubeflow Steering Committee](https://github.com/kubeflow/community/blob/master/KUBEFLOW-STEERING-COMMITTEE.md).

We encourage you to learn about the [Kubeflow Community](https://www.kubeflow.org/docs/about/community/) and how to [contribute](https://www.kubeflow.org/docs/about/contributing/) to the project!

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Kubeflow Docker Images](#kubeflow-docker-images)
  - [Continuous Integration](#continuous-integration)
  - [Releases](#releases)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Kubeflow Docker Images

This page contains information about how Kubeflow builds and maintains
docker images.

## Continuous Integration

Our prow jobs can be used to build docker images on every pre/postsubmit.

We currently do this by using docker in docker to run docker build.

Our test jobs can use gcr.io/kubeflow-ci to publish the images.

This registry is not public.

## Releases

Our releases also publish images using Argo workflows; for more info see [releasing.md](./releasing.md).

We currently use the registry gcr.io/kubeflow-images-public.

There are open issues to

- Publish images to Dockerhub as well [kubeflow/kubeflow#211](https://github.com/kubeflow/kubeflow/issues/211)
- Create registry gcr.io/kubeflow-images [kubeflow/kubeflow#534](https://github.com/kubeflow/kubeflow/issues/534)

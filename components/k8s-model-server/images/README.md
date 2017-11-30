<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Building and testing the TF serving image.](#building-and-testing-the-tf-serving-image)
  - [Checkout](#checkout)
  - [Build and Push](#build-and-push)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Building and testing the TF serving image.

The workflow will checkout the source code from kubeflow/kubeflow, then build and push the image.

Deploy the workflow by:
```
ks apply prow -c workflows
```

## Checkout
The version of kubeflow is determined by the parameters such as `PULL_NUMBER` or `PULL_BASE_SHA`.
See [checkout.sh](https://github.com/kubeflow/testing/blob/master/images/checkout.sh) for more detail,
and [prow environment variables](https://github.com/kubernetes/test-infra/tree/master/prow#job-environment-variables).

## Build and Push
Set the gcr registry to be published to by `ks set param workflows serving_image gcr.io/xxx/xxx:xx`.

The TF version that the workflow is currently using is TF1.4 CPU. See the Dockerfile at `components/k8s-model-server/docker`.

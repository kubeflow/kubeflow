# TF Serving in Kubeflow

Status:

- 2018-07-10 Created

## TF Serving
[Tensorflow Serving](https://github.com/tensorflow/serving)
is a high-performance serving system for ML models.

It provides gRPC [apis](https://github.com/tensorflow/serving/tree/master/tensorflow_serving/apis)
for prediction and model service.

Starting in TF 1.8, TF Serving also provides a REST [api](https://github.com/tensorflow/serving/blob/master/tensorflow_serving/g3doc/api_rest.md).

## Kubeflow TF Serving component

In Kubeflow, we have a TF Serving [component](https://github.com/kubeflow/kubeflow/tree/master/kubeflow/tf-serving).

#### HTTP proxy
The http proxy provides an REST api, which is the same as TF Serving's built-in REST api.

#### TF serving images
We build TF serving images for different TF versions, and for both cpu and gpu.
For example, gcr.io/kubeflow-images-public/tensorflow-serving-1.6gpu:v20180604-0da89b8a.

#### Istio integration
We can optionally deploy [Istio](https://istio.io/) and get additional features, such as
rpc metrics (request count, error count, latencies), and traffic routing / rollout out
(e.g. 95% to version 1, 5% to version 2).
See [detail](https://github.com/kubeflow/kubeflow/blob/master/components/k8s-model-server/istio-integration.md).

## Usage
To use the TF Serving component, see document [here](https://github.com/kubeflow/kubeflow/blob/master/components/k8s-model-server/README.md).

## Next steps
- [kubeflow/kubeflow#1000](https://github.com/kubeflow/kubeflow/issues/1000): Support logging request and response
to enable continuous training and skew detection
- [kubeflow/kubeflow#136](https://github.com/kubeflow/kubeflow/issues/136): Model management feature
- [kubeflow/kubeflw#1004](https://github.com/kubeflow/kubeflow/issues/1004): Examples showcasing CUJ
- [kubeflow/kubebench#30](https://github.com/kubeflow/kubebench/issues/30): Benchmark
- [kubeflow/kubeflow#1036](https://github.com/kubeflow/kubeflow/issues/1036): metrics
- Issues related to REST api:
  - Improve current http proxy [issue](https://github.com/kubeflow/kubeflow/issues/198)
  - Use the new TF Serving REST api [issue](https://github.com/kubeflow/kubeflow/issues/896)

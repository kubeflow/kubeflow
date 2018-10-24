# TF Serving in Kubeflow

Authors:

- lunkai@google.com

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

### HTTP proxy
The [http proxy](https://github.com/kubeflow/kubeflow/tree/master/components/k8s-model-server/http-proxy)
provides an REST api, which is the same as TF Serving's built-in REST api.

We initially implemented this because TF Serving only supported gRPC api (until
TF 1.8). Going forward, we will still maintain and support this http proxy as
it has the ability to provide additional features such as:
- exporting metrics, [kubeflow/kubeflow#1036](https://github.com/kubeflow/kubeflow/issues/1036).
- request logging. See
  [kubeflow/kubeflow#1000](https://github.com/kubeflow/kubeflow/issues/1000)

Users can choose between TF Serving's built-in http server or this http proxy.

### TF serving images

We build TF serving images for different TF versions, and for both cpu and gpu.
For example, gcr.io/kubeflow-images-public/tensorflow-serving-1.6gpu:v20180604-0da89b8a.
Check out gcr.io/kubeflow-images-public registry for other versions.

### Monitoring

Currently we can get rpc metrics (request count, error count, latencies) if we
deploy [Istio](https://istio.io/).
See [detail](https://github.com/kubeflow/kubeflow/blob/master/components/k8s-model-server/istio-integration.md).

We are working on surfacing those metrics and other TF Serving specific metrics and integrating with Prometheus.
See [kubeflow/kubeflow#1036](https://github.com/kubeflow/kubeflow/issues/1036).

Also, there will be liveness and health check. See
[issue](https://github.com/kubeflow/kubeflow/issues/368).

## Usage
To use the TF Serving component, see document [here](https://github.com/kubeflow/kubeflow/blob/master/components/k8s-model-server/README.md).

## SeldonIO
[SeldonIO](https://github.com/SeldonIO/seldon-core) is a platform for serving ML
models. It's an open question how we should integrate TF Serving with
Seldon to get nice features like routing and model management.

## Next steps
- [kubeflow/kubeflow#1000](https://github.com/kubeflow/kubeflow/issues/1000): Support logging request and response
to enable continuous training and skew detection
- [kubeflow/kubeflow#136](https://github.com/kubeflow/kubeflow/issues/136): Model management feature
- [kubeflow/kubeflow#1004](https://github.com/kubeflow/kubeflow/issues/1004): Examples showcasing CUJ
- [kubeflow/kubeflow#1219](https://github.com/kubeflow/kubeflow/issues/1219): Autoscaling
- [kubeflow/kubebench#30](https://github.com/kubeflow/kubebench/issues/30): Benchmark to understand performance, like
  autoscaling.
- [kubeflow/kubeflow#1036](https://github.com/kubeflow/kubeflow/issues/1036): metrics
- Issues related to REST api:
  - Improve current http proxy [issue](https://github.com/kubeflow/kubeflow/issues/198)
  - Use the new TF Serving REST api [issue](https://github.com/kubeflow/kubeflow/issues/896)

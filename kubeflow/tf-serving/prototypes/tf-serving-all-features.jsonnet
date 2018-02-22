// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving
// @description TensorFlow serving
// @shortDescription A TensorFlow serving deployment
// @param name string Name to give to each of the components
// @optionalParam namespace string default Namespace
// @param model_path string Path to the model. This can be a GCS path.
// @optionalParam model_server_image string gcr.io/kubeflow/model-server:1.0 Container for TF model server
// @optionalParam http_proxy_image string gcr.io/kubeflow/http-proxy:1.0 Container for http_proxy of TF model server

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local tfServing = import 'kubeflow/tf-serving/tf-serving.libsonnet';

local name = import 'param://name';
local namespace = import 'param://namespace';
local modelPath = import 'param://model_path';
local modelServerImage = import 'param://model_server_image';
local httpProxyImage = import 'param://http_proxy_image';

std.prune(k.core.v1.list.new([
  tfServing.parts.deployment.modelServer(name, namespace, modelPath, modelServerImage, httpProxyImage),
  tfServing.parts.deployment.modelService(name, namespace),
]))

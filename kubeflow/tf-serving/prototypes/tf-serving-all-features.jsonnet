// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving
// @description TensorFlow serving
// @shortDescription A TensorFlow serving deployment
// @param name string Name to give to each of the components
// @param namespace string Namespace
// @param modelPath string Path to the model. This can be a GCS path.

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local tfServing = import 'kubeflow/tf-serving/tf-serving.libsonnet';

local name = import 'param://name';
local namespace = import 'param://namespace';
local modelPath = import 'param://modelPath';

std.prune(k.core.v1.list.new([
  tfServing.parts.deployment.modelServer(name, namespace, modelPath),
  tfServing.parts.deployment.modelService(name, namespace),
]))

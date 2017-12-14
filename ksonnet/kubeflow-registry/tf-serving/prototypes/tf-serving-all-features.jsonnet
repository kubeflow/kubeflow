// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving
// @description TensorFlow serving
// @shortDescription A TensorFlow serving deployment
// @param name string Name to give to each of the components

local k = import 'k.libsonnet';
local tfServing = import 'kubeflow/tf-serving/tf-serving.libsonnet';

local name = import 'param://name';

std.prune(k.core.v1.list.new([
  tfServing.parts.deployment.modelServer(name),
]))

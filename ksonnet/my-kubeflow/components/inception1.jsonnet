local params = std.extVar("__ksonnet/params").components["inception1"];
local k = import 'k.libsonnet';
local tfServing = import 'kubeflow/tf-serving/tf-serving.libsonnet';

local name = params.name;
local namespace = params.namespace;
local modelPath = params.modelPath;

std.prune(k.core.v1.list.new([
  tfServing.parts.deployment.modelServer(name, namespace, modelPath),
  tfServing.parts.deployment.modelService(name, namespace, modelPath),
]))

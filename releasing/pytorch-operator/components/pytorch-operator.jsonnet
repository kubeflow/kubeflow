local env = std.extVar("__ksonnet/environments");
local params = std.extVar("__ksonnet/params").components["pytorch-operator"];
local k = import "k.libsonnet";
local release = import "kubeflow/automation/release.libsonnet";

std.prune(k.core.v1.list.new(release.parts(params.namespace, params.name, overrides=params).release))

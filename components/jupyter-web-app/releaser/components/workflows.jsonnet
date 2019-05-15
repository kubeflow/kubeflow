local env = std.extVar("__ksonnet/environments");
local params = std.extVar("__ksonnet/params").components.workflows;

local k = import "k.libsonnet";
local release = import "kubeflow/automation/release.libsonnet";
local updatedParams = params {
  extra_args: if params.extra_args == "null" then "" else " " + params.extra_args,
};

std.prune(k.core.v1.list.new(release.parts(updatedParams.namespace, updatedParams.name, overrides=updatedParams).release))

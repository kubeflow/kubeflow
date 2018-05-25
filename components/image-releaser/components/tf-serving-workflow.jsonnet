local params = std.extVar("__ksonnet/params").components["tf-serving-workflow"];

local k = import "k.libsonnet";
local tf_serving_workflow = import "tf-serving-workflow.libsonnet";

std.prune(k.core.v1.list.new(
  [tf_serving_workflow.parts(params.namespace, params.name, overrides=params).e2e]
))

local params = std.extVar("__ksonnet/params").components["tf-notebook-workflow"];

local k = import "k.libsonnet";
local tf_notebook_workflow = import "tf-notebook-workflow.libsonnet";

std.prune(k.core.v1.list.new(
  [tf_notebook_workflow.parts(params.namespace, params.name, overrides=params).e2e]
))

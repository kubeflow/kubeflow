local params = std.extVar("__ksonnet/params").components.workflows;

local k = import "k.libsonnet";
local workflows = import "workflows.libsonnet";

std.prune(k.core.v1.list.new([workflows.parts(params.namespace, params.name, overrides=params).e2e]))

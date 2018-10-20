local params = std.extVar("__ksonnet/params").components.tfserving;

local k = import "k.libsonnet";
local workflows = import "tfserving.libsonnet";

std.prune(k.core.v1.list.new([workflows.parts(params.namespace, params.name, overrides=params).e2e]))

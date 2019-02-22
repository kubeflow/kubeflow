// @apiVersion 0.1
// @name io.ksonnet.pkg.pipeline
// @description a Kubeflow pipeline deployment.
// @shortDescription Kubeflow pipeline
// @param name string Name to give to each of the components

local k = import "k.libsonnet";
local pipelineBase = import "kubeflow/pipeline/pipeline.libsonnet";

// updatedParams includes the namespace from env by default.
local updatedParams = params + env;

local pipeline = pipelineBase {
	params+: updatedParams,
};

std.prune(k.core.v1.list.new(pipeline.parts.all))

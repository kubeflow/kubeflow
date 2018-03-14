// @apiVersion 0.1
// @name io.ksonnet.pkg.argo
// @description Deploy Argo workflow engine
// @shortDescription Argo workflow engine
// @param name string Name to give to the component

local k = import "k.libsonnet";
local argo = import "kubeflow/argo/argo.libsonnet";

// updatedParams includes the namespace from env by default.
// We can override namespace in params if needed
local updatedParams = env + params;
local namespace = updatedParams.namespace;

std.prune(k.core.v1.list.new(argo.parts(namespace).all))

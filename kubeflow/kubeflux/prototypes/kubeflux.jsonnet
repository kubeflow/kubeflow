// @apiVersion 0.1
// @name io.ksonnet.pkg.kubeflux
// @description WeaveWorks Flux integration with Kubeflow
// @shortDescription A Flux meets Kubeflow
// @param name string Name to give to each of the components

local k = import "k.libsonnet";
local flux = import "kubeflow/kubeflux/kubeflux.jsonnet"

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};

local namespace = updatedParams.namespace;
local imageTag = import "param://imageTag";

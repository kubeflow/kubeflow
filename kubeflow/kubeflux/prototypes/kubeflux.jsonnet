// @apiVersion 0.1
// @name io.ksonnet.pkg.kubeflux
// @description WeaveWorks Flux integration with Kubeflow
// @shortDescription A Flux meets Kubeflow
// @param name string Name to give to each of the components
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.

local k = import "k.libsonnet";
local kubeflux = import "kubeflow/kubeflux/all.libsonnet";

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};

local namespace = updatedParams.namespace;
//local imageTag = import "param://imageTag";

std.prune(k.core.v1.list.new(all.kubeflux(updatedParams)))

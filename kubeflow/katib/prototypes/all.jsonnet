// @apiVersion 0.1
// @name katib
// @description Kubeflow hyperparameter tuning component
// @shortDescription hp-tuning
// @param name string Name to give to each of the components
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.

local k = import "k.libsonnet";

local vizier = import "kubeflow/katib/vizier.libsonnet";
local modeldb = import "kubeflow/katib/modeldb.libsonnet";
local suggestion = import "kubeflow/katib/suggestion.libsonnet";

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};


std.prune(k.core.v1.list.new(vizier.all(updatedParams)))
  + std.prune(k.core.v1.list.new(modeldb.all(updatedParams)))
  + std.prune(k.core.v1.list.new(suggestion.all(updatedParams)))

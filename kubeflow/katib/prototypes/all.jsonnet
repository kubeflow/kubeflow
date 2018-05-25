// @apiVersion 0.1
// @name katib
// @description Kubeflow hyperparameter tuning component
// @shortDescription hp-tuning
// @param name string Name to give to each of the components

local k = import "k.libsonnet";

local vizier = import "kubeflow/katib/vizier.libsonnet";
local modeldb = import "kubeflow/katib/modeldb.libsonnet";
local suggestion = import "kubeflow/katib/suggestion.libsonnet";

std.prune(k.core.v1.list.new(vizier.all(params))),
std.prune(k.core.v1.list.new(modeldb.all(params))),
std.prune(k.core.v1.list.new(suggestion.all(params))),

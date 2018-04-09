// @apiVersion 0.1
// @name io.ksonnet.pkg.pachyderm
// @description Pachyderm enables reproducible data science.
// @shortDescription Pachyderm components.
// @param name string Name to give to each of the components

local k = import "k.libsonnet";

local all = import "kubeflow/pachyderm/all.libsonnet";

std.prune(k.core.v1.list.new(all.all(params, env)))

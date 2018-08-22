// @apiVersion 0.1
// @name io.ksonnet.pkg.spark-operator
// @param name string Name for the component


local k = import "k.libsonnet";
local operator = import "kubeflow/spark/all.libsonnet";

std.prune(
    k.core.v1.list.new(operator.all(params, params.name, env)))

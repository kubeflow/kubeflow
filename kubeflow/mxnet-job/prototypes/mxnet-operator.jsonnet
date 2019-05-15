// @apiVersion 0.1
// @name io.ksonnet.pkg.mxnet-operator
// @description MXNet Operator
// @shortDescription MXNet Operator for distributed mxnet on Kubernetes
// @param name string Name to give to each of the components
// @optionalParam image string mxjob/mxnet-operator:v1beta1 The image for the MXNet Operator.

local k = import "k.libsonnet";
local operator = import "kubeflow/mxnet-job/mxnet-operator.libsonnet";

std.prune(k.core.v1.list.new(operator.all(params, env)))

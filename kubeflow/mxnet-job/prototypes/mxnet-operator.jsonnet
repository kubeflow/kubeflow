// @apiVersion 0.1
// @name io.ksonnet.pkg.mxnet-operator
// @description MXNet Operator
// @shortDescription MXNet Operator for distributed mxnet on Kubernetes
// @param name string Name to give to each of the components
// @optionalParam disks string null Comma separated list of Google persistent disks to attach to jupyter environments.
// @optionalParam cloud string null String identifying the cloud to customize the deployment for.
// @optionalParam mxnetJobImage string mxjob/mxnet-operator:v1 The image for the MXNetJob controller
// @optionalParam mxnetDefaultImage string null The default image to use for mxnet

local k = import "k.libsonnet";
local operator = import "kubeflow/mxnet-job/mxnet-operator.libsonnet";

std.prune(k.core.v1.list.new(operator.all(params, env)))

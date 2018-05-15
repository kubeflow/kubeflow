// @apiVersion 0.1
// @name io.ksonnet.pkg.pytorch-job
// @description A PyTorch job (could be training or evaluation).
// @shortDescription A PyTorch job.
// @param name string Name to give to each of the components
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam args string null Comma separated list of arguments to pass to the job
// @optionalParam image string null The docker image to use for the job.
// @optionalParam image_gpu string null The docker image to use when using GPUs.
// @optionalParam num_masters number 1 The number of masters to use
// @optionalParam num_ps number 0 The number of ps to use
// @optionalParam num_workers number 0 The number of workers to use
// @optionalParam num_gpus number 0 The number of GPUs to attach to workers.

local k = import "k.libsonnet";

local all = import "kubeflow/pytorch-job/pytorch-job.libsonnet";

std.prune(k.core.v1.list.new(all.pyTorchJobPrototype(params, env)))

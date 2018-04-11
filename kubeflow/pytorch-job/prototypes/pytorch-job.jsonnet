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

// TODO(https://github.com/ksonnet/ksonnet/issues/235): ks param set args won't work if the arg starts with "--".

local k = import "k.libsonnet";
local pytorchJob = import "kubeflow/pytorch-job/pytorch-job.libsonnet";
// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};

local name = import "param://name";
local namespace = updatedParams.namespace;

local argsParam = import "param://args";
local args =
  if argsParam == "null" then
    []
  else
    std.split(argsParam, ",");

local image = import "param://image";
local imageGpu = import "param://image_gpu";
local numMasters = import "param://num_masters";
local numWorkers = import "param://num_workers";
local numGpus = import "param://num_gpus";

local workerSpec = if numGpus > 0 then
  pytorchJob.parts.pytorchJobReplica("WORKER", numWorkers, args, imageGpu, numGpus)
else
  pytorchJob.parts.pytorchJobReplica("WORKER", numWorkers, args, image);

std.prune(k.core.v1.list.new([
  pytorchJob.parts.pytorchJob(
    name,
    namespace,
    [
      pytorchJob.parts.pytorchJobReplica("MASTER", numMasters, args, image),
      workerSpec
    ],
  ),
]))

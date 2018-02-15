// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-job
// @description A TensorFlow job (could be training or evaluation).
// @shortDescription A TensorFlow job.
// @param name string Name to give to each of the components
// @optionalParam namespace string default Namespace
// @optionalParam args string null Comma separated list of arguments to pass to the job
// @optionalParam image string null The docker image to use for the job.
// @optionalParam image_gpu string null The docker image to use when using GPUs.
// @optionalParam num_masters number 1 The number of masters to use
// @optionalParam num_ps number 0 The number of ps to use
// @optionalParam num_workers number 0 The number of workers to use
// @optionalParam num_gpus number 0 The number of GPUs to attach to workers.

// TODO(https://github.com/ksonnet/ksonnet/issues/235): ks param set args won't work if the arg starts with "--".

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local tfJob = import 'kubeflow/tf-job/tf-job.libsonnet';

local name = import 'param://name';
local namespace = import 'param://namespace';

local argsParam = import 'param://args';
local args =
  if argsParam == "null" then
    []
  else
    std.split(argsParam, ',');

local image = import 'param://image';
local imageGpu = import 'param://image_gpu';
local numMasters = import 'param://num_masters';
local numPs = import 'param://num_ps';
local numWorkers = import 'param://num_workers';
local numGpus = import 'param://num_gpus';

local workerSpec = if numGpus > 0 then
  tfJob.parts.tfJobReplica("WORKER", numWorkers, args, imageGpu, numGpus)
else
  tfJob.parts.tfJobReplica("WORKER", numWorkers, args, image);

std.prune(k.core.v1.list.new([
  tfJob.parts.tfJob(name, namespace, [
    tfJob.parts.tfJobReplica("MASTER", numMasters, args, image),
    workerSpec,
    tfJob.parts.tfJobReplica("PS", numPs, args, image),
  ]),
]))

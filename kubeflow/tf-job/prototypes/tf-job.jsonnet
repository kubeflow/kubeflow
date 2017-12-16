// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-job
// @description A TensorFlow job (could be training or evaluation).
// @shortDescription A TensorFlow jjob.
// @param name string Name to give to each of the components
// @optionalParam namespace string default Namespace
// @optionalParam args string null Comma separated list of arguments to pass to the job
// @optionalParam image string null The docker image to use for the job.
// @optionalParam imageGpu string null The docker image to use when using GPUs.
// @optionalParam numMasters number 1 The number of masters to use
// @optionalParam numPs number 0 The number of ps to use
// @optionalParam numWorkers number 0 The number of workers to use
// @optionalParam numGpus number 0 The number of GPUs to attach to workers.

// TODO(https://github.com/ksonnet/ksonnet/issues/235): ks param set args won't work if the arg starts with "--".

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local tfJob = import 'kubeflow/tf-job/tf-job.libsonnet';

local name = import 'param://name';
local namespace = import 'param://namespace';

local argsParam = import 'param://namespace';
local args = 
    if argsParam == "null" then
    []
    else
	std.split(argsParam, ',');

local image = import 'param://image';
local imageGpu = import 'param://imageGpu';
local numMasters = import 'param://numMasters';
local numPs = import 'param://numPs';
local numWorkers = import 'param://numWorkers';
local numGpus = import 'param://numGpus';

local workerSpec = if numGpus > 0 then
  	tfJob.parts.tfJobReplica("WORKER", numWorkers, args, imageGpu, numGpus)
  	else
  	tfJob.parts.tfJobReplica("WORKER", numWorkers, args, image);

std.prune(k.core.v1.list.new([
  tfJob.parts.tfJob(name, namespace, [
  	tfJob.parts.tfJobReplica("MASTER", numMasters, args, image),
	workerSpec,  	
  	tfJob.parts.tfJobReplica("PS", numPs, args, image)
  ]),
]))

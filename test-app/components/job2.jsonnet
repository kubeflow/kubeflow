local params = std.extVar("__ksonnet/params").components["job2"];
// TODO(https://github.com/ksonnet/ksonnet/issues/235): ks param set args won't work if the arg starts with "--".

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local tfJob = import 'kubeflow/tf-job/tf-job.libsonnet';

local name = params.name;
local namespace = params.namespace;

local argsParam = params.namespace;
local args = 
    if argsParam == "null" then
    []
    else
	std.split(argsParam, ',');

local image = params.image;
local imageGpu = params.image_gpu;
local numMasters = params.num_masters;
local numPs = params.num_ps;
local numWorkers = params.num_workers;
local numGpus = params.num_gpus;

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

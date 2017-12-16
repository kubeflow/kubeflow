local params = std.extVar("__ksonnet/params").components["myjob4"];
// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local tfJob = import 'kubeflow/tf-job/tf-job.libsonnet';

local name = params.name;
local namespace = params.namespace;

local args = std.split(params.namespace, ',');

local image = params.image;
local imageGpu = params.imageGpu;
local numMasters = params.numMasters;
local numPs = params.numPs;
local numWorkers = params.numWorkers;
local numGpus = params.numGpus;

local workerSpec = if numGpus > 0 then
  	tfJob.parts.ReplicaSpec("WORKER", numWorkers, args, imageGpu)
  	else
  	tfJob.parts.ReplicaSpec("WORKER", numWorkers, args, image);

std.prune(k.core.v1.list.new([
  tfJob.parts.tfJob(name, namespace, [
  	tfJob.parts.ReplicaSpec("MASTER", numMasters, args, image),
	workerSpec,  	
  	tfJob.parts.ReplicaSpec("PS", numPs, args, image)
  ]),
]))

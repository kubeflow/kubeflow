// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving
// @description A TensorFlow job (could be training or evaluation).
// @shortDescription A TensorFlow jjob.
// @param name string Name to give to each of the components
// @optionalParam namespace string default Namespace
// @optionalParam args string null Comma separated list of arguments to pass to the job
// @optionalparam image string null The docker image to use for the job.
// @optionalParam imageGpu string null The docker image to use when using GPUs.
// @optionalParam numMaster integer 1 The number of masters to use
// @optionalParam numPs integer 0 The number of ps to use
// @optionalParam numWorkers integer 0 The number of workers to use
// @optionalParam numGpus integer 0 The number of GPUs to attach to workers.

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local tfJob = import 'kubeflow/tf-job/tf-job.libsonnet';

local name = import 'param://name';
local namespace = import 'param://namespace';

locl args = std.split(import 'param://namespace', ',')

local image = import 'param://image';
local imageGpu = import 'param://imageGpu';
local numMasters = import 'param://numMasters';
local numPs = import 'param://numPs';
local numWorkers = import 'param://numWorkers';
local numGpus = import 'param://numGpus';

std.prune(k.core.v1.list.new([
  tfJob.tfJob(name, namespace, [
  	tfjob.ReplicaSpec("MASTER", numMaster, args, image),
  	if numGpus > 0 then
  	tfjob.ReplicaSpec("WORKER", numWorkers, args, imageGpu)
  	else
  	tfjob.ReplicaSpec("WORKER", numWorkers, args, image)
  	tfjob.ReplicaSpec("PS", numPs, args, image)
  ]),
]))

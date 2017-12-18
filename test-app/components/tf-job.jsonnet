local params = std.extVar("__ksonnet/params").components["tf-job"];
// TODO(jlewi): Should we move this into an examples package?

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local deployment = k.extensions.v1beta1.deployment;
local container = deployment.mixin.spec.template.spec.containersType;
local podTemplate = k.extensions.v1beta1.podTemplate;

local tfJob = import 'kubeflow/tf-job/tf-job.libsonnet';

local name = params.name;
local namespace = params.namespace;

local numGpus = params.num_gpus;
local batchSize = params.batch_size;
local model = params.model;

local args = [
	"python",
	"tf_cnn_benchmarks.py",
	"--batch_size=" + batchSize,
	"--model=" + model,
    "--variable_update=parameter_server",
    "--flush_stdout=true",
    "--num_gpus=" + numGpus,
]; 

local image = params.image;
local imageGpu = params.imageGpu;
local numMasters = params.numMasters;
local numPs = params.numPs;
local numWorkers = params.numWorkers;
local numGpus = params.numGpus;

local masterSpec = if numGpus > 0 then
  	tfJob.parts.tfJobReplica("MASTER", numMasters, args, imageGpu, numGpus)
  	else
  	tfJob.parts.tfJobReplica("MASTER", numMasters, args, image);

local workerSpec = if numGpus > 0 then
  	tfJob.parts.tfJobReplica("WORKER", numWorkers, args, imageGpu, numGpus)
  	else
  	tfJob.parts.tfJobReplica("WORKER", numWorkers, args, image);

// TODO(jlewi): Look at how the redis prototype modifies a container by
// using mapContainersWithName. Can we do something similar?
// https://github.com/ksonnet/parts/blob/9d78d6bb445d530d5b927656d2293d4f12654608/incubator/redis/redis.libsonnet
local replicas = std.map(function(s)   
  s + {
    template+: {
      spec+:  {
        // TODO(jlewi): Does this overwrite containers? 
        containers: [
          s.template.spec.containers[0] + {
            workingDir: "/opt/tf-benchmarks/scripts/tf_cnn_benchmarks",
          },
        ]
      }
    },
  },
  std.prune([masterSpec, workerSpec, tfJob.parts.tfJobReplica("PS", numPs, args, image)]));

local job = tfJob.parts.tfJob(name, namespace, replicas) + { tfImage: image};

std.prune(k.core.v1.list.new([job]))

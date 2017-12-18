local params = std.extVar("__ksonnet/params").components["cnn-test8"];
// We always need at least 1 worker because the job doesn't actually use the master.
// We also need at least 1 parameter server.

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
] +
if numGpus == 0 then  
  # We need to set num_gpus=1 even if not using GPUs because otherwise the devie list
  # is empty because of this code
  # https://github.com/tensorflow/benchmarks/blob/master/scripts/tf_cnn_benchmarks/benchmark_cnn.py#L775  
  # We won't actually use GPUs because based on other flags no ops will be assigned to GPus.  
  ["--num_gpus=1",
   "--local_parameter_device=cpu",
   "--device=cpu",
   "--data_format=NHWC",]
else
  ["--num_gpus=" + numGpus,
  ]
 ; 

local image = params.image;
local imageGpu = params.imageGpu;
// The Tf CNN code doesn't actually use masters but we need 1 to satisfy TfJob requirements.
// We should be able to get rid of this once TfJob supports using Worker 0 as the chief.
local numMasters = 1;
local numPs = params.num_ps;
local numWorkers = params.num_workers;
local numGpus = params.num_gpus;

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

local job = 
	if numWorkers < 1 then
	error "num_workers must be >= 1"
	else 
	tfJob.parts.tfJob(name, namespace, replicas) + { tfImage: image};

std.prune(k.core.v1.list.new([job]))

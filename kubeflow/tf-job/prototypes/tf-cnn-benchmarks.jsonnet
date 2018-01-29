// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-cnn
// @description A TensorFlow CNN Benchmarking job
// @shortDescription Run the TensorFlow CNN benchmarking job.
// @param name string Name for the job.
// @optionalParam namespace string default Namespace
// @optionalParam batch_size number 32 The batch size
// @optionalParam model string resnet50 Which model to use
// @optionalParam num_gpus number 0 The number of GPUs to attach to workers.
// @optionalParam image string gcr.io/kubeflow/tf-benchmarks-cpu:v20171202-bdab599-dirty-284af3 The docker image to use for the job.
// @optionalParam image_gpu string gcr.io/kubeflow/tf-benchmarks-gpu:v20171202-bdab599-dirty-284af3 The docker image to use when using GPUs.
// @optionalParam num_ps number 1 The number of ps to use
// @optionalParam num_workers number 1 The number of workers to use

// We need at least 1 parameter server.

// TODO(jlewi): Should we move this into an examples package?

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local deployment = k.extensions.v1beta1.deployment;
local container = deployment.mixin.spec.template.spec.containersType;
local podTemplate = k.extensions.v1beta1.podTemplate;

local tfJob = import 'kubeflow/tf-job/tf-job.libsonnet';

local name = import 'param://name';
local namespace = import 'param://namespace';

local numGpus = import 'param://num_gpus';
local batchSize = import 'param://batch_size';
local model = import 'param://model';

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
               [
                 "--num_gpus=1",
                 "--local_parameter_device=cpu",
                 "--device=cpu",
                 "--data_format=NHWC",
               ]
             else
               [
                 "--num_gpus=" + numGpus,
               ]
;

local image = import 'param://image';
local imageGpu = import 'param://image_gpu';
local numPs = import 'param://num_ps';
local numWorkers = import 'param://num_workers';
local numGpus = import 'param://num_gpus';

local workerSpec = if numGpus > 0 then
  tfJob.parts.tfJobReplica("WORKER", numWorkers, args, imageGpu, numGpus)
else
  tfJob.parts.tfJobReplica("WORKER", numWorkers, args, image);

// TODO(jlewi): Look at how the redis prototype modifies a container by
// using mapContainersWithName. Can we do something similar?
// https://github.com/ksonnet/parts/blob/9d78d6bb445d530d5b927656d2293d4f12654608/incubator/redis/redis.libsonnet
local replicas = std.map(function(s)
                           s {
                             template+: {
                               spec+: {
                                 // TODO(jlewi): Does this overwrite containers?
                                 containers: [
                                   s.template.spec.containers[0] {
                                     workingDir: "/opt/tf-benchmarks/scripts/tf_cnn_benchmarks",
                                   },
                                 ],
                               },
                             },
                           },
                         std.prune([workerSpec, tfJob.parts.tfJobReplica("PS", numPs, args, image)]));

local job =
  if numWorkers < 1 then
    error "num_workers must be >= 1"
  else
    if numPs < 1 then
      error "num_ps must be >= 1"
    else
      tfJob.parts.tfJob(name, namespace, replicas) + {
        spec+: {
          tfImage: image,
          terminationPolicy: { chief: { replicaName: "WORKER", replicaIndex: 0 } },
        },
      };

std.prune(k.core.v1.list.new([job]))

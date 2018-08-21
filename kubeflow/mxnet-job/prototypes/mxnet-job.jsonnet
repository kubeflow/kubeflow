// @apiVersion 0.1
// @name io.ksonnet.pkg.mxnet-job
// @description A MXNet job (could be training or evaluation).
// @shortDescription A MXNet job.
// @param name string Name to give to each of the components
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam args string null Comma separated list of arguments to pass to the job
// @optionalParam image string null The docker image to use for the job.
// @optionalParam image_gpu string mxjob/mxnet:gpu The docker image to use when using GPUs.
// @optionalParam num_schedulers number 1 The number of scheduler to use
// @optionalParam num_servers number 1 The number of servers to use
// @optionalParam num_workers number 1 The number of workers to use
// @optionalParam num_gpus number 0 The number of GPUs to attach to workers.

local k = import "k.libsonnet";

local util = {
  mxnetJobReplica(replicaType, number, args, image, numGpus=0)::
    local baseContainer = {
      image: image,
      name: "mxnet",
    };
    local containerArgs = if std.length(args) > 0 then
      {
        args: args,
      }
    else {};
    local resources = if numGpus > 0 then {
      resources: {
        limits: {
          "nvidia.com/gpu": numGpus,
        },
      },
    } else {};
    if number > 0 then
      {
        replicas: number,
        template: {
          spec: {
            containers: [
              baseContainer + containerArgs + resources,
            ],
            restartPolicy: "OnFailure",
          },
        },
        replicaType: replicaType,
      }
    else {},
};

local namespace = env.namespace;
local name = params.name;

local argsParam = params.args;
local args =
  if argsParam == "null" then
    []
  else
    std.split(argsParam, ",");

local image = params.image;
local imageGpu = params.image_gpu;
local numSchedulers = params.num_schedulers;
local numServers = params.num_servers;
local numWorkers = params.num_workers;
local numGpus = params.num_gpus;

local schedulerSpec = util.mxnetJobReplica("SCHEDULER", numSchedulers, args, image);

local workerSpec = if numGpus > 0 then
  util.mxnetJobReplica("WORKER", numWorkers, args, imageGpu, numGpus)
else
  util.,xmetJobReplica("WORKER", numWorkers, args, image);

local serverSpec = util.mxnetJobReplica("SERVER", numServers, args, image);

local replicas = [schedulerSpec, serverSpec, workerSpec];


local job = {
  apiVersion: "kubeflow.org/v1alpha1",
  kind: "MXJob",
  metadata: {
    name: name,
    namespace: namespace,
  },
  spec: {
    replicaSpecs: replicas,
  },
};

std.prune(k.core.v1.list.new([job]))


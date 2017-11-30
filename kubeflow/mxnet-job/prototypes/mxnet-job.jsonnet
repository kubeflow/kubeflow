// @apiVersion 0.1
// @name io.ksonnet.pkg.mxnet-job
// @description A MXNet job (could be training or evaluation).
// @shortDescription A MXNet job.
// @param name string Name to give to each of the components
// @optionalParam args string null Comma separated list of arguments to pass to the job
// @optionalParam image string null The docker image to use for the job.
// @optionalParam imageGpu string mxjob/mxnet:gpu The docker image to use when using GPUs.
// @optionalParam numSchedulers number 1 The number of scheduler to use
// @optionalParam numServers number 1 The number of servers to use
// @optionalParam numWorkers number 1 The number of workers to use
// @optionalParam numGpus number 0 The number of GPUs to attach to workers.

local k = import "k.libsonnet";

local util = {
  mxnetJobReplica(replica_type, number, args, image, num_gpus=0)::
    local baseContainer = {
      image: image,
      name: "mxnet",
    };
    local containerArgs = if std.length(args) > 0 then
      {
        args: args,
      }
    else {};
    local resources = if num_gpus > 0 then {
      resources: {
        limits: {
          "nvidia.com/gpu": num_gpus,
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
        replicaType: replica_type,
      }
    else {},
};

local namespace = env.namespace;
local name = params.name;

local args_param = params.args;
local args =
  if args_param == "null" then
    []
  else
    std.split(args_param, ",");

local image = params.image;
local image_gpu = params.imageGpu;
local num_schedulers = params.numSchedulers;
local num_servers = params.numServers;
local num_workers = params.numWorkers;
local num_gpus = params.numGpus;

local schedulerSpec = util.mxnetJobReplica("SCHEDULER", num_schedulers, args, image);

local workerSpec = if num_gpus > 0 then
  util.mxnetJobReplica("WORKER", num_workers, args, imagw_gpu, num_gpus)
else
  util.mxnetJobReplica("WORKER", num_workers, args, image);

local serverSpec = util.mxnetJobReplica("SERVER", num_servers, args, image);

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

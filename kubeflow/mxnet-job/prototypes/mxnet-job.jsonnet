// @apiVersion 0.1
// @name io.ksonnet.pkg.mxnet-job
// @description A MXNet job (could be training or evaluation).
// @shortDescription A MXNet job.
// @param name string Name to give to each of the components
// @optionalParam image string mxjob/mxnet:gpu The docker image to use for the job.
// @optionalParam command string null Command to pass to the job
// @optionalParam args string null Comma separated list of arguments to pass to the job
// @optionalParam numServers number 1 The number of servers to use
// @optionalParam numWorkers number 1 The number of workers to use
// @optionalParam numGpus number 1 The number of GPUs to attach to workers.

local k = import "k.libsonnet";

local util = {
  mxnetJobReplica(replica_type, number, cmd, args, image, num_gpus=0)::
    local baseContainer = {
      image: image,
      name: "mxnet",
    };
    local containerCommand = if std.length(cmd) > 0 then {
      command: cmd,
    } else {};
    local containerArgs = if std.length(args) > 0 then {
      args: args,
    } else {};
    local resources = if num_gpus > 0 then {
      resources: {
        limits: {
          "nvidia.com/gpu": num_gpus,
        },
      },
    } else {};
    if number > 0 then {
      replicas: number,
      restartPolicy: "Never",
      template: {
        spec: {
          containers: [
            baseContainer + containerCommand + containerArgs + resources,
          ],
        },
      },
    } else {},
};

local namespace = env.namespace;
local name = params.name;
local jobVersion = "v1beta1";
local args_param = params.args;
local command = params.command;

local cmd = 
  if command == "null" then []
  else std.split(command, ",");
local args =
  if args_param == "null" then []
  else std.split(args_param, ",");

local image = params.image;
local num_schedulers = 1;
local num_servers = params.numServers;
local num_workers = params.numWorkers;
local num_gpus = params.numGpus;

local schedulerSpec = util.mxnetJobReplica("SCHEDULER", num_schedulers, cmd, args, image);

local workerSpec = if num_gpus > 0 then
  util.mxnetJobReplica("WORKER", num_workers, cmd, args, image, num_gpus)
else
  util.mxnetJobReplica("WORKER", num_workers, cmd, args, image);

local serverSpec = util.mxnetJobReplica("SERVER", num_servers, cmd, args, image);

local job = if jobVersion == "v1beta1" then {
  apiVersion: "kubeflow.org/" + jobVersion,
  kind: "MXJob",
  metadata: {
    name: name,
    namespace: namespace,
  },
  spec: {
    jobMode: "MXTrain",
    mxReplicaSpecs: {
      SCHEDULER: schedulerSpec,
      SERVER: serverSpec,
      WORKER: workerSpec,
    },
  },
} else {};

std.prune(k.core.v1.list.new([job]))

// @apiVersion 0.1
// @name io.ksonnet.pkg.pytorch-job
// @description A PyTorch job (could be training or evaluation).
// @shortDescription A PyTorch job.
// @param name string Name to give to each of the components
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam args string null Comma separated list of arguments to pass to the job
// @optionalParam image string gcr.io/kubeflow-examples/pytorch-dist-mnist:v20180702-a57993c The docker image to use for the job.
// @optionalParam numMasters number 1 The number of masters to use
// @optionalParam numWorkers number 1 The number of workers to use
// @optionalParam numGpus number 0 The number of GPUs to attach to workers.
// @optionalParam jobVersion string v1alpha2 The pytorch operator version to use

local k = import "k.libsonnet";

local util = {
  pytorchJobReplica(replica_type, number, args, image, num_gpus=0)::
    local baseContainer = {
      image: image,
      name: "pytorch",
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

  pytorchJobReplicaV1alpha2(replica_type, number, args, image, num_gpus=0)::
    local baseContainer = {
      image: image,
      name: "pytorch",
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
    if number > 0 then {
      replicas: number,
      template: {
        spec: {
          containers: [
            baseContainer + containerArgs + resources,
          ],
        },
      },
    } else {},
};

local namespace = env.namespace;
local name = params.name;
local jobVersion = params.jobVersion;
local argsParam = params.args;
local args =
  if argsParam == "null" then
    []
  else
    std.split(argsParam, ",");

local image = params.image;
local image_gpu = params.imageGpu;
local num_masters = params.numMasters;
local num_workers = params.numWorkers;
local num_gpus = params.numGpus;

local replicaSpec = if jobVersion == "v1alpha1" then
  util.pytorchJobReplica
else
  util.pytorchJobReplicaV1alpha2;

local workerSpec = if num_gpus > 0 then
  replicaSpec("WORKER", num_workers, args, image, num_gpus)
else
  replicaSpec("WORKER", num_workers, args, image);

local masterSpec = replicaSpec("MASTER", num_masters, args, image);

local job = if jobVersion == "v1alpha1" then {
  apiVersion: "kubeflow.org/v1alpha1",
  kind: "PyTorchJob",
  metadata: {
    name: name,
    namespace: namespace,
  },
  spec: {
    replicaSpecs: [masterSpec, workerSpec],
  },

} else {
  apiVersion: "kubeflow.org/v1alpha2",
  kind: "PyTorchJob",
  metadata: {
    name: name,
    namespace: namespace,
  },
  spec: {
    pytorchReplicaSpecs: {
      Master: masterSpec,
      Worker: workerSpec,
    },
  },
};

std.prune(k.core.v1.list.new([job]))

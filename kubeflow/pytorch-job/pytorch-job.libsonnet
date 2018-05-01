local k = import "k.libsonnet";

local util = {
  pytorchJobReplica(replicaType, number, args, image, numGpus=0)::
    local baseContainer = {
      image: image,
      name: "pytorch",
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

{
  pyTorchJobPrototype(params, env):: [
    $.parts(params, env).PyTorchJob,
  ],

  parts(params, env):: {
    local namespace = if params.namespace != "null" then params.namespace else env.namespace,
    local name = params.name,

    local argsParam = params.args,
    local args =
      if argsParam == "null" then
        []
      else
        std.split(argsParam, ","),

    local image = params.image,
    local imageGpu = params.image_gpu,
    local numMasters = params.num_masters,
    local numWorkers = params.num_workers,
    local numGpus = params.num_gpus,

    local workerSpec = if numGpus > 0 then
      util.pytorchJobReplica("WORKER", numWorkers, args, imageGpu, numGpus)
    else
      util.pytorchJobReplica("WORKER", numWorkers, args, image),
    local masterSpec = util.pytorchJobReplica("MASTER", numMasters, args, image),
    local replicas = [masterSpec, workerSpec],


    PyTorchJob:: {
      apiVersion: "kubeflow.org/v1alpha1",
      kind: "PyTorchJob",
      metadata: {
        name: name,
        namespace: namespace,
      },
      spec: {
        replicaSpecs: replicas,
      },
    },
  },
}

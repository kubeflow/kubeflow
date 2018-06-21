// @apiVersion 0.1
// @name io.ksonnet.pkg.mpi-job-custom
// @description A custom MPI Job.
// @shortDescription A custom MPI Job that allows you to specify number of replicas and GPUs per replica.
// @param name string Name to give to each of the components
// @optionalParam replicas number 1 Total number of replicas for the job
// @optionalParam gpusPerReplica number 1 Total number of GPUs per replica
// @optionalParam image string mpioperator/tensorflow-benchmarks:latest The image to use for the job
// @optionalParam command string null Command to pass to the job
// @optionalParam args string null Comma separated list of arguments to pass to the job

local k = import "k.libsonnet";

local namespace = env.namespace;  // namespace is inherited from the environment
local name = param.name;
local replicas = param.replicas;
local gpusPerReplica = param.gpusPerReplica;
local image = param.image;
local command = param.command;
local args = param.args;

local mpiJobCustom = {
  apiVersion: "kubeflow.org/v1alpha1",
  kind: "MPIJob",
  metadata: {
    name: name,
    namespace: namespace,
  },
  spec: {
    replicas: replicas,
    template: {
      spec: {
        containers: [
          {
            name: name,
            image: image,
            [if command != "null" then "command"]: [command],
            [if args != "null" then "args"]: std.split(args, ","),
            resources: {
              limits: {
                "nvidia.com/gpu": gpusPerReplica,
              },
            },
          },
        ],
      },
    },
  },
};

std.prune(k.core.v1.list.new([
  mpiJobCustom,
]))

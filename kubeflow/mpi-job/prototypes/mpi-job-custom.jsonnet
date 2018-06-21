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
local name = params.name;
local replicas = params.replicas;
local gpusPerReplica = params.gpusPerReplica;
local image = params.image;
local command = params.command;
local args = params.args;

local containerCommand =
  if command != "null" then
    {
      command: command,
    }
  else {};
local containerArgs =
  if args != "null" then
    {
      args: std.split(args, ","),
    }
  else {};

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
            resources: {
              limits: {
                "nvidia.com/gpu": gpusPerReplica,
              },
            },
          } + containerCommand + containerArgs,
        ],
      },
    },
  },
};

std.prune(k.core.v1.list.new([
  mpiJobCustom,
]))

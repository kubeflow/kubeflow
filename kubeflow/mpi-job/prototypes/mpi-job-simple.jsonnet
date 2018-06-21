// @apiVersion 0.1
// @name io.ksonnet.pkg.mpi-job-simple
// @description A simple MPI Job.
// @shortDescription A simply MPI Job that allows you to specify the total number of GPUs.
// @param name string Name to give to each of the components
// @optionalParam gpus number 1 Total number of GPUs for the job; default to 1
// @optionalParam image string mpioperator/tensorflow-benchmarks:latest The image to use for the job
// @optionalParam command string null Command to pass to the job
// @optionalParam args string null Comma separated list of arguments to pass to the job

local k = import "k.libsonnet";

local namespace = env.namespace;  // namespace is inherited from the environment
local name = params.name;
local gpus = params.gpus;
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

local mpiJobSimple = {
  apiVersion: "kubeflow.org/v1alpha1",
  kind: "MPIJob",
  metadata: {
    name: name,
    namespace: namespace,
  },
  spec: {
    gpus: gpus,
    template: {
      spec: {
        containers: [
          {
            name: name,
            image: image,
          } + containerCommand + containerArgs,
        ],
      },
    },
  },
};

std.prune(k.core.v1.list.new([
  mpiJobSimple,
]))

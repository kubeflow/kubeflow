// @apiVersion 0.1
// @name io.ksonnet.pkg.mpi-job-simple
// @description A simple MPI Job.
// @shortDescription A simply MPI Job that allows you to specify the total number of GPUs.
// @param name string Name to give to each of the components
// @param gpus number Total number of GPUs for the job
// @param image string The image to use for the job
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam command string null Command to pass to the job
// @optionalParam args string null Comma separated list of arguments to pass to the job

local k = import "k.libsonnet";
local mpi = import "kubeflow/mpi-job/mpi-job.libsonnet";

local namespace = if params.namespace != "null" then params.namespace else env.namespace;
local name = import "param://name";
local gpus = import "param://gpus";
local image = import "param://image";
local command = import "param://command";
local args = import "param://args";

std.prune(k.core.v1.list.new([
  mpi.parts.simple(namespace, name, gpus, image, command, args)
]))

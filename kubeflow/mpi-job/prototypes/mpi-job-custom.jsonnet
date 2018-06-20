// @apiVersion 0.1
// @name io.ksonnet.pkg.mpi-job-custom
// @description A custom MPI Job.
// @shortDescription A custom MPI Job that allows you to specify number of replicas and GPUs per replica.
// @param name string Name to give to each of the components
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam replicas number 1 Total number of replicas for the job
// @optionalParam gpusPerReplica number 1 Total number of GPUs per replica
// @optionalParam image string mpioperator/tensorflow-benchmarks:latest The image to use for the job
// @optionalParam command string null Command to pass to the job
// @optionalParam args string null Comma separated list of arguments to pass to the job

local k = import "k.libsonnet";
local mpi = import "kubeflow/mpi-job/mpi-job.libsonnet";

local namespace = if params.namespace != "null" then params.namespace else env.namespace;
local name = import "param://name";
local replicas = import "param://replicas";
local gpusPerReplica = import "param://gpusPerReplica";
local image = import "param://image";
local command = import "param://command";
local args = import "param://args";

std.prune(k.core.v1.list.new([
  mpi.parts.custom(namespace, name, replicas, gpusPerReplica, image, command, args),
]))

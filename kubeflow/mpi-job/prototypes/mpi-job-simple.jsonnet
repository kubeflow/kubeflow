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
local mpiJob = import "kubeflow/mpi-job/mpi-job.libsonnet";
local mpiJobSimple = mpiJob.parts(env, params).mpiJobSimple;

std.prune(k.core.v1.list.new([
  mpiJobSimple,
]))

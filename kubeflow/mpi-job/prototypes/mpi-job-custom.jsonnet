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
// @optionalParam pvcName string null claim PersistentVolumeClaim name for training data
// @optionalParam volumeMountPath string null /data PersistentVolume mount path for training data

local k = import "k.libsonnet";
local mpiJob = import "kubeflow/mpi-job/mpi-job.libsonnet";
local mpiJobCustom = mpiJob.parts(env, params).mpiJobCustom;

std.prune(k.core.v1.list.new([
  mpiJobCustom,
]))

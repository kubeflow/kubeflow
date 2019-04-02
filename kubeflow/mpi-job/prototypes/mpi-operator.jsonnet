// @apiVersion 0.1
// @name io.ksonnet.pkg.mpi-operator
// @description MPI Operator.
// @shortDescription MPI Operator for running MPI jobs.
// @param name string Name to give to each of the components.
// @optionalParam image string mpioperator/mpi-operator:latest The image for the MPI Operator.
// @optionalParam kubectlDeliveryImage string mpioperator/kubectl-delivery:latest The image for delivering kubectl.
// @optionalParam gpusPerNode number 8 The maximum number of GPUs per node.

local mpiOperator = import "kubeflow/mpi-job/mpi-operator.libsonnet";
local instance = mpiOperator.new(env, params);
instance.list(instance.all)

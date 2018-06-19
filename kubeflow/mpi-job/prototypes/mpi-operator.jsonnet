// @apiVersion 0.1
// @name io.ksonnet.pkg.mpi-operator
// @description MPI Operator.
// @shortDescription MPI Operator for running MPI jobs.
// @param name string Name to give to each of the components.
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam image string mpioperator/mpi-operator:latest The image for the MPI Operator.
// @optionalParam kubectlDeliveryImage string mpioperator/kubectl-delivery:latest The image for delivering kubectl.
// @optionalParam gpusPerNode number 8 The maximum number of GPUs per node.

local k = import "k.libsonnet";
local operator = import "kubeflow/mpi-job/mpi-operator.libsonnet";

local namespace = if params.namespace != "null" then params.namespace else env.namespace;
local name = import "param://name";
local image = import "param://image";
local kubectlDeliveryImage = import "param://kubectlDeliveryImage";
local gpusPerNode = import "param://gpusPerNode";

std.prune(k.core.v1.list.new([
  operator.parts.crd,
  operator.parts.clusterRole(name),
  operator.parts.serviceAccount(namespace, name),
  operator.parts.clusterRoleBinding(namespace, name),
  operator.parts.deploy(namespace, name, image, kubectlDeliveryImage, gpusPerNode),
]))

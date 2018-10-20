// @apiVersion 0.1
// @name io.ksonnet.pkg.chainer-operator
// @description Chainer Operator.
// @shortDescription Chainer Operator which manages ChainerJob resources.
// @param name string Name to give to each of the components.
// @optionalParam image string gcr.io/kubeflow-images-public/chainer-operator:v0.3.0 The image for the chainer operator.
// @optionalParam createRbac string true If true (default), create ServiceAccount, ClusterRole and ClusterRoleBinding for the operator.  Otherwise, you have to create them manually.  Please see https://github.com/kubeflow/chainer-operator for required authorization for the operator.
// @optionalParam serviceAccountName string null you can set your custom service account for running the operator.  The value is used only when 'createRbac' is false.
// @optionalParam v number 2 log level of the operator which is passed with '-v' option to the operator.
// @optionalParam stderrthreshold string INFO log severity of the operator which is passed with '-stderrthreshold' to the operator.

local k = import "k.libsonnet";
local operator = import "kubeflow/chainer-job/chainer-operator.libsonnet";

local namespace = env.namespace;  // namespace is inherited from the environment
local name = params.name;
local image = params.image;
local serviceAccountName = if params.createRbac != "true" then params.serviceAccountName else name;
local v = params.v;
local stderrthreshold = params.stderrthreshold;

if params.createRbac == "true" then
  std.prune(k.core.v1.list.new([
    operator.parts.crd,
    operator.parts.clusterRole(name),
    operator.parts.serviceAccount(namespace, name),
    operator.parts.clusterRoleBinding(namespace, name),
    operator.parts.deploy(namespace, name, image, serviceAccountName, v, stderrthreshold),
  ]))
else
  std.prune(k.core.v1.list.new([
    operator.parts.crd,
    operator.parts.deploy(namespace, name, image, serviceAccountName, v, stderrthreshold),
  ]))

// @apiVersion 0.1
// @name io.ksonnet.pkg.argo
// @description Deploy Argo workflow engine
// @shortDescription Argo workflow engine
// @param name string Name to give to the component
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam workflowControllerImage string argoproj/workflow-controller:v2.1.1 workflowControllerImage
// @optionalParam uiImage string argoproj/argoui:v2.1.1 uiImage
// @optionalParam executorImage string argoproj/argoexec:v2.1.1 executorImage

local k = import "k.libsonnet";
local argo = import "kubeflow/argo/argo.libsonnet";

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};

local namespace = updatedParams.namespace;

std.prune(k.core.v1.list.new(argo.parts(updatedParams).all))

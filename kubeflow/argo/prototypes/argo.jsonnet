// @apiVersion 0.1
// @name io.ksonnet.pkg.argo
// @description Deploy Argo workflow engine
// @shortDescription Argo workflow engine
// @param name string Name to give to the component
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam workflowControllerImage string argoproj/workflow-controller:v2.1.1 workflowControllerImage
// @optionalParam uiImage string argoproj/argoui:v2.1.1 uiImage
// @optionalParam executorImage string argoproj/argoexec:v2.1.1 executorImage

local params = {
  workflowControllerImage: 'argoproj/workflow-controller:v2.1.1',
  uiImage: 'argoproj/argoui:v2.1.1',
  executorImage: 'argoproj/argoexec:v2.1.1',
};
local env = {
  namespace: 'foo',
};

local argo = import "kubeflow/argo/argo.libsonnet";
argo.all(env+params).list


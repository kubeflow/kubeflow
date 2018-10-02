// @apiVersion 0.1
// @name io.ksonnet.pkg.argo
// @description Deploy Argo workflow engine
// @shortDescription Argo workflow engine
// @param name string Name to give to the component
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam workflowControllerImage string argoproj/workflow-controller:v2.2.0 workflowControllerImage
// @optionalParam uiImage string argoproj/argoui:v2.2.0 uiImage
// @optionalParam executorImage string argoproj/argoexec:v2.2.0 executorImage

local argo = import "kubeflow/argo/argo.libsonnet";
local instance = argo.new(env, params);
instance.list(instance.all)

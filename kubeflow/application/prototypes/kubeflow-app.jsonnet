// @apiVersion 0.1
// @name io.ksonnet.pkg.kubeflow-app
// @description kubeflow-app Component
// @shortDescription kubeflow-app Component
// @param name string Name
// @optionalParam type string null Type of application.
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam projectNamespace string null Name of the project namespace
// @optionalParam components array [] Array of arrays

local ambassador = import "kubeflow/core/ambassador.libsonnet";
local centraldashboard = import "kubeflow/core/centraldashboard.libsonnet";
local jupyterhub = import "kubeflow/core/jupyterhub.libsonnet";
local tfjoboperator = import "kubeflow/core/tf-job-operator.libsonnet";
local params = {
  deploymentScope: "namespace",
  deploymentNamespace: "kf-100-user",
  components: [
    ["ambassador", ambassador],
    ["centraldashboard", centraldashboard],
    ["jupyterhub", jupyterhub],
    ["tf-job-operator", tfjoboperator],
  ],
  name: "kubeflow-app",
};
local env = {
  namespace: "kf-100-user",
};

local application = import "kubeflow/application/application.libsonnet";
local applicationInstance = application.new(env, params);
applicationInstance.list(applicationInstance.all)

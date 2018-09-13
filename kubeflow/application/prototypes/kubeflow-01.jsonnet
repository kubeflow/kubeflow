// @apiVersion 0.1
// @name io.ksonnet.pkg.kubeflow-01
// @description kubeflow-01 Component
// @shortDescription kubeflow-01 Component
// @param name string Name
// @optionalParam type string null Type of application.
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam components array [] Array of arrays

local ambassador = import "kubeflow/core/ambassador.libsonnet";
local jupyterhub = import "kubeflow/core/jupyterhub.libsonnet";
local centraldashboard = import "kubeflow/core/centraldashboard.libsonnet";
local params = {
  components:  [
    ["ambassador", ambassador],
    ["jupyterhub", jupyterhub], 
    ["centraldashboard", centraldashboard],
  ],
  name: 'kubeflow-01',
};
local env = {
  namespace: 'kubeflow-01',
};

local application = import "kubeflow/application/application.libsonnet";
local applicationInstance = application.new(env, params);
applicationInstance.list(applicationInstance.all)

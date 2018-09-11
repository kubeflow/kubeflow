// @apiVersion 0.1
// @name io.ksonnet.pkg.application
// @description application Component
// @shortDescription application Component
// @param name string Name
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam components array null 

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
  namespace: 'foo',
};

local application = import "kubeflow/application/application.libsonnet";
local applicationInstance = application.new(env, params);
applicationInstance.list(applicationInstance.all)

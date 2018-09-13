// @apiVersion 0.1
// @name io.ksonnet.pkg.kubeflow-02
// @description kubeflow-02 Component
// @shortDescription kubeflow-02 Component
// @param name string Name
// @optionalParam type string null Type of application.
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam components array [] Array of arrays

local ambassador = import "kubeflow/core/ambassador.libsonnet";
local jupyterhub = import "kubeflow/core/jupyterhub.libsonnet";
local spartakus = import "kubeflow/core/spartakus.libsonnet";
local params = {
  components:  [
    ["ambassador", ambassador],
    ["jupyterhub", jupyterhub], 
    ["spartakus", spartakus],
  ],
  name: 'kubeflow-02',
};
local env = {
  namespace: 'kubeflow-02',
};

local application = import "kubeflow/application/application.libsonnet";
local applicationInstance = application.new(env, params);
applicationInstance.list(applicationInstance.all)

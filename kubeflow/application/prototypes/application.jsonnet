// @apiVersion 0.1
// @name io.ksonnet.pkg.application
// @description application Component
// @shortDescription application Component
// @param name string Name
// @optionalParam type string kubeflow Type of application.
// @optionalParam version string 0.3 Version of kubeflow
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam bootstrap string false install cluster-level resources for application

local application = import "kubeflow/application/application.libsonnet";
local instance = application.new(env, params);
instance.list(instance.all)

// @apiVersion 0.1
// @name io.ksonnet.pkg.kubeflow-app
// @description kubeflow-app Component
// @shortDescription kubeflow-app Component
// @param name string Name
// @optionalParam type string kubeflow Type of application.
// @optionalParam version string 0.3 Version of kubeflow
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam install-metacontroller string true Create the metacontroller manifests
// @optionalParam components array [] names of components or empty for all components
// @optionalParam owner string null name of owner

local application = import "kubeflow/application/application.libsonnet";
local applicationInstance = application.new(env, params);
applicationInstance.list(applicationInstance.all)

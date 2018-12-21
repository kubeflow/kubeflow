// @apiVersion 0.1
// @name io.ksonnet.pkg.application
// @description application Component
// @shortDescription application Component
// @param name string Name
// @optionalParam type string kubeflow Type of application.
// @optionalParam version string 0.4 Version of kubeflow
// @optionalParam components array '["ambassador","jupyter","centraldashboard","tf-job-operator","spartakus","argo","pipeline"]' names of components or empty for all components
// @optionalParam emitCRD string true Whether to emit the CustomResourceDefinition for Application
// @optionalParam emitController string false Whether to emit the controller for the Application

local application = import "kubeflow/application/application.libsonnet";
local instance = application.new(env, params);
instance.list(instance.all)

// @apiVersion 0.1
// @name io.ksonnet.pkg.notebook-controller
// @description notebook controller
// @shortDescription notebooks
// @param name string Name
// @optionalParam controllerImage string gcr.io/kubeflow-images-public/notebook-controller:v20190325-v0.4.0-rc.1-258-g1728f05f-dirty-8c2dab The image to use for the notebook controller
// @optionalParam injectGcpCredentials string false Whether to inject gcp credentials

local notebooks = import "kubeflow/jupyter/notebook_controller.libsonnet";
local instance = notebooks.new(env, params);
instance.list(instance.all)

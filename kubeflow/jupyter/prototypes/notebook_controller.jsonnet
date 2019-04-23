// @apiVersion 0.1
// @name io.ksonnet.pkg.notebook-controller
// @description notebook controller
// @shortDescription notebooks
// @param name string Name
// @optionalParam controllerImage string gcr.io/kubeflow-images-public/notebook-controller:v20190401-v0.4.0-rc.1-308-g33618cc9-e3b0c4 The image to use for the notebook controller
// @optionalParam injectGcpCredentials string true Whether to inject gcp credentials

local notebooks = import "kubeflow/jupyter/notebook_controller.libsonnet";
local instance = notebooks.new(env, params);
instance.list(instance.all)

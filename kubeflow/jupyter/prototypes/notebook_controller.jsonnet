// @apiVersion 0.1
// @name io.ksonnet.pkg.notebook-controller
// @description notebook controller
// @shortDescription notebooks
// @param name string Name
// @optionalParam controllerImage string gcr.io/kubeflow-images-public/notebook-controller:v20190212-v0.4.0-rc.1-120-gc0710d93-dirty-94a2e9 The image to use for the notebook controller

local notebooks = import "kubeflow/jupyter/notebook_controller.libsonnet";
local instance = notebooks.new(env, params);
instance.list(instance.all)

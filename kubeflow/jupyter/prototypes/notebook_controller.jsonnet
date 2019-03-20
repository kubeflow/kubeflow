// @apiVersion 0.1
// @name io.ksonnet.pkg.notebook-controller
// @description notebook controller
// @shortDescription notebooks
// @param name string Name
// @optionalParam controllerImage string gcr.io/kubeflow-images-public/notebook-controller:v20190320-v0.4.0-rc.1-238-gb90dddb0-dirty-dcf6c4 The image to use for the notebook controller

local notebooks = import "kubeflow/jupyter/notebook_controller.libsonnet";
local instance = notebooks.new(env, params);
instance.list(instance.all)

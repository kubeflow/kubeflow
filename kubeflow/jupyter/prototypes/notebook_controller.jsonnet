// @apiVersion 0.1
// @name io.ksonnet.pkg.notebook-controller
// @description notebook controller
// @shortDescription notebooks
// @param name string Name
// @optionalParam controllerImage string gcr.io/kubeflow-images-public/notebook-controller:v20190528-v0-169-g4ab2dc13-dirty-bfc67c The image to use for the notebook controller
// @optionalParam injectGcpCredentials string true Whether to inject gcp credentials

local notebooks = import "kubeflow/jupyter/notebook_controller.libsonnet";
local instance = notebooks.new(env, params);
instance.list(instance.all)

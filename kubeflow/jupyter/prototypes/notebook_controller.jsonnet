// @apiVersion 0.1
// @name io.ksonnet.pkg.notebook-controller
// @description notebook controller
// @shortDescription notebooks
// @param name string Name
// @optionalParam controllerImage string gcr.io/kubeflow-images-public/notebook-controller:v20190603-v0-168-gf9f04fcc-dirty-5a8772 The image to use for the notebook controller
// @optionalParam injectGcpCredentials string true Whether to inject gcp credentials
// @optionalParam injectIstio string false Whether to inject istio sidecar; should be true or false.

local notebooks = import "kubeflow/jupyter/notebook_controller.libsonnet";
local instance = notebooks.new(env, params);
instance.list(instance.all)

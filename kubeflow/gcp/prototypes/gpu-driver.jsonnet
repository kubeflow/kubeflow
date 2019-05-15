// @apiVersion 0.1
// @name io.ksonnet.pkg.gpu-driver
// @description Provides gpu-driver prototype in kubeflow gcp package
// @shortDescription Gpu Driver.
// @param name string Name for the component

local gpuDriver = import "kubeflow/gcp/gpu-driver.libsonnet";
local instance = gpuDriver.new(env, params);
instance.list(instance.all)

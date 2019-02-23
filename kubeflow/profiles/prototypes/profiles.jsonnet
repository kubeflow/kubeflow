// @apiVersion 0.1
// @name io.ksonnet.pkg.profiles
// @description profiles Component
// @shortDescription profiles Component
// @param name string Name
// @optionalParam image string gcr.io/kubeflow-images-public/notebook-controller:v20190222-v0.4.0-rc.1-151-g3d6f6656-dirty-4eb6ff The image to use for controller

local profile = import "kubeflow/profiles/profiles.libsonnet";
local instance = profile.new(env, params);
instance.list(instance.all)

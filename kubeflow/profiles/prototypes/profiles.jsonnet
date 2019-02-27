// @apiVersion 0.1
// @name io.ksonnet.pkg.profiles
// @description profiles Component
// @shortDescription profiles Component
// @param name string Name
// @optionalParam image string gcr.io/kubeflow-images-public/notebook-controller:v20190227-v0.4.0-rc.1-168-gc99152ac-dirty-9de0df The image to use for controller

local profile = import "kubeflow/profiles/profiles.libsonnet";
local instance = profile.new(env, params);
instance.list(instance.all)

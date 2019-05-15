// @apiVersion 0.1
// @name io.ksonnet.pkg.profiles
// @description profiles Component
// @shortDescription profiles Component
// @param name string Name
// @optionalParam image string gcr.io/kubeflow-images-public/profile-controller:v20190228-v0.4.0-rc.1-192-g1a802656-dirty-f95773 The image to use for controller

local profile = import "kubeflow/profiles/profiles.libsonnet";
local instance = profile.new(env, params);
instance.list(instance.all)

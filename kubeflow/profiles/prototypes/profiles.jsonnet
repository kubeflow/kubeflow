// @apiVersion 0.1
// @name io.ksonnet.pkg.profiles
// @description profiles Component
// @shortDescription profiles Component
// @param name string Name

local profile = import "kubeflow/profiles/profiles.libsonnet";
local instance = profile.new(env, params);
instance.list(instance.all)

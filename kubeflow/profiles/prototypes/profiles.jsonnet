// @apiVersion 0.1
// @name io.ksonnet.pkg.profiles
// @description profiles Component
// @shortDescription profiles Component
// @param name string Name
// @optionalParam image string metacontroller/jsonnetd@sha256:25c25f217ad030a0f67e37078c33194785b494569b0c088d8df4f00da8fd15a0 The image to use for jsonnet

local profile = import "kubeflow/profiles/profiles.libsonnet";
local instance = profile.new(env, params);
instance.list(instance.all)

// @apiVersion 0.1
// @name io.ksonnet.pkg.knative-build
// @description knative-build Component
// @shortDescription knative-build for in-cluster image building
// @param name string Name

local knative_build = import "kubeflow/knative-build/knative-build.libsonnet";
local instance = knative_build.new(env, params);
instance.list(instance.all)

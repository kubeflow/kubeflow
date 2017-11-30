// @apiVersion 0.1
// @name io.ksonnet.pkg.metacontroller
// @description metacontroller Component
// @shortDescription metacontroller Component
// @param name string Name
// @optionalParam image string metacontroller/metacontroller:v0.3.0 The metacontroller image

local metacontroller = import "kubeflow/metacontroller/metacontroller.libsonnet";
local instance = metacontroller.new(env, params);
instance.list(instance.all)

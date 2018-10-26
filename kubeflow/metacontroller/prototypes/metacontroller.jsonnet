// @apiVersion 0.1
// @name io.ksonnet.pkg.metacontroller
// @description metacontroller Component
// @shortDescription metacontroller Component
// @param name string Name
// @optionalParam image string metacontroller/metacontroller@sha256:f5af46268676e869b14dd54e37189ea3483ca27126f9f4425cf22ce7d7779a2d

local metacontroller = import "kubeflow/metacontroller/metacontroller.libsonnet";
local instance = metacontroller.new(env, params);
instance.list(instance.all)

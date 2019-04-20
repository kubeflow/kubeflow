// @apiVersion 0.1
// @name io.ksonnet.pkg.podpreset-controller
// @description This prototype creates a crd for podpreset kind
// @shortDescription This prototype creates a crd for podpreset kind
// @param name string Name to give to each of the components

local podpreset_controller = import "kubeflow/admission-webhook/podpreset_controller.libsonnet";
local instance = podpreset_controller.new(env, params);
instance.list(instance.all)

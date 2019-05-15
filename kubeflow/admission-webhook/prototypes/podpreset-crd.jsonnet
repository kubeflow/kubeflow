// @apiVersion 0.1
// @name io.ksonnet.pkg.podpreset-crd
// @description This prototype creates a crd for podpreset kind
// @shortDescription This prototype creates a crd for podpreset kind
// @param name string Name to give to each of the components

local podpreset_controller = import "kubeflow/admission-webhook/podpreset-crd.libsonnet";
local instance = podpreset-crd.new(env, params);
instance.list(instance.all)

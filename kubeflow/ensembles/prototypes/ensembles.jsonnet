// @apiVersion 0.1
// @name io.ksonnet.pkg.ensembles
// @description ensembles Component
// @shortDescription ensembles Component
// @param name string Name

local ensemble = import "kubeflow/ensembles/ensembles.libsonnet";
local instance = ensemble.new(env, params);
instance.list(instance.all)

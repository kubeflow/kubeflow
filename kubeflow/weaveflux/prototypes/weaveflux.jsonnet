// @apiVersion 0.1
// @name io.ksonnet.pkg.weaveflux
// @description Weaveworks Flux integration with Kubeflow
// @shortDescription A Flux meets Kubeflow
// @param name string Name to give to each of the components
// @optionalParam gitUrl string null Your default git URL.
// @optionalParam serviceType string ClusterIP The service type for WeaveFlux.

local k = import "k.libsonnet";
local all = import "kubeflow/weaveflux/all.libsonnet";


std.prune(k.core.v1.list.new(all.weaveflux(params, env)))

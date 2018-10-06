// @apiVersion 0.1
// @name io.ksonnet.pkg.prometheus
// @description Provides prometheus prototype in kubeflow core.
// @shortDescription Prometheus Service.
// @param name string Name for the component
// @optionalParam projectId string GCP project id.
// @optionalParam clusterName string GKE cluster name.
// @optionalParam zone string GKE cluster zone.

local prometheus = import "kubeflow/core/prometheus.libsonnet";
local instance = prometheus.new(env, params);
instance.list(instance.all)

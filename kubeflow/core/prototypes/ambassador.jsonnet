// @apiVersion 0.1
// @name io.ksonnet.pkg.ambassador
// @description Ambassador Component
// @shortDescription Ambassador
// @param name string Name
// @optionalParam cloud string null Cloud
// @optionalParam ambassadorServiceType string ClusterIP The service type for the API Gateway.
// @optionalParam ambassadorImage string quay.io/datawire/ambassador:0.37.0 The image for the API Gateway.
// @optionalParam statsdImage string quay.io/datawire/statsd:0.37.0 The image for the Stats and Monitoring.
// @optionalParam statsdSinkImage string prom/statsd-exporter:v0.6.0 The image for the Statsd exporter.

local ambassador = import "kubeflow/core/ambassador.libsonnet";
local instance = ambassador.new(env, params);
instance.list(instance.all)

// @apiVersion 0.1
// @name io.ksonnet.pkg.ambassador
// @description Ambassador Component
// @shortDescription Ambassador
// @param name string Name
// @optionalParam cloud string null Cloud
// @optionalParam ambassadorServiceType string ClusterIP The service type for the API Gateway.
// @optionalParam ambassadorImage string quay.io/datawire/ambassador:0.37.0 The image for the API Gateway.
// @optionalParam statsdImage string quay.io/datawire/statsd:0.37.0 The image for the Stats and Monitoring.
// @optionalParam statsdExporterImage string prom/statsd-exporter:v0.6.0 The image for the Statsd exporter.

local params = {
  cloud: 'null',
  ambassadorServiceType: 'ClusterIP',
  ambassadorImage: 'quay.io/datawire/ambassador:0.37.0',
  statsdImage: 'quay.io/datawire/statsd:0.37.0',
  statsdExporterImage: 'prom/statsd-exporter:v0.6.0',
};
local env = {
  namespace: 'foo',
};

local ambassador = import "kubeflow/core/ambassador.libsonnet";
ambassador.new(env+params).list

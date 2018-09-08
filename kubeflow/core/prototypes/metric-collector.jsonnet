// @apiVersion 0.1
// @name io.ksonnet.pkg.metric-collector
// @description Provides metric-collector prototypes for monitoring kubeflow availability on GCP.
// @shortDescription Service monitor for kubeflow on GCP.
// @param name string Name for the component
// @param targetUrl string Https url of kubeflow service on GCP; target of monitoring.
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam metricImage string gcr.io/kubeflow-images-public/metric-collector:latest Image for running metric exporter of kubeflow availability.
// @optionalParam oauthSecretName string kubeflow-oauth The name of the secret containing the OAuth client_id and client_secret.

local metricCollector = import "kubeflow/core/metric-collector.libsonnet";
local instance = metricCollector.new(env, params);
instance.list(instance.all)

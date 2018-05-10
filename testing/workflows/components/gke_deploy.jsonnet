// E2E test for deploying Kubeflow on GKE.
// The test ensures we can probably setup GKE using deployment manager.
local params = std.extVar("__ksonnet/params").components.gke_deploy;

local k = import "k.libsonnet";
local gke_deploy = import "gke_deploy.libsonnet";

local prowEnv = gke_deploy.parseEnv(params.prow_env);
local bucket = params.bucket;
std.prune(k.core.v1.list.new([gke_deploy.parts(params).e2e(prowEnv, bucket, params.platform)]))

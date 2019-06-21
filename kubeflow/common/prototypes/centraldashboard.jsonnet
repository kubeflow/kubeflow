// @apiVersion 0.1
// @name io.ksonnet.pkg.centraldashboard
// @description centraldashboard Component
// @shortDescription centraldashboard
// @param name string Name
// @optionalParam image string gcr.io/kubeflow-images-public/centraldashboard:v20190614-v0-208-g17ef0ecd Image for the central dashboard
// @optionalParam injectIstio string false Whether to inject istio sidecar; should be true or false.
// @optionalParam clusterDomain string cluster.local DNS config to cluster domain.

local centraldashboard = import "kubeflow/common/centraldashboard.libsonnet";
local instance = centraldashboard.new(env, params);
instance.list(instance.all)

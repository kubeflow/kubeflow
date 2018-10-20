// @apiVersion 0.1
// @name io.ksonnet.pkg.centraldashboard
// @description centraldashboard Component
// @shortDescription centraldashboard
// @param name string Name
// @optionalParam image string gcr.io/kubeflow-images-public/centraldashboard:v0.3.0 Image for the central dashboard

local centraldashboard = import "kubeflow/core/centraldashboard.libsonnet";
local instance = centraldashboard.new(env, params);
instance.list(instance.all)

// @apiVersion 0.1
// @name io.ksonnet.pkg.centraldashboard
// @description centraldashboard Component
// @shortDescription centraldashboard
// @param name string Name
// @optionalParam image string gcr.io/kubeflow-images-public/centraldashboard:v0.2.1 Image for the central dashboard

local centraldashboard = (import "kubeflow/core/centraldashboard.libsonnet").new(env, params);
centraldashboard.list

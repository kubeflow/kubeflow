// @apiVersion 0.1
// @name io.ksonnet.pkg.centraldashboard
// @description centraldashboard Component
// @shortDescription centraldashboard
// @param name string Name
// @optionalParam image string gcr.io/kubeflow-images-public/centraldashboard:v0.2.1 Image for the central dashboard

local params = {
  name: 'Name',
  image: 'gcr.io/kubeflow-images-public/centraldashboard:v0.2.1',
};
local env = {
  namespace: 'foo',
};

local centraldashboard = import "kubeflow/core/centraldashboard.libsonnet";
centraldashboard.new(env+params).list


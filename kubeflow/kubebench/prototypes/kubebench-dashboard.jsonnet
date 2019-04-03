// @apiVersion 0.1
// @name io.ksonnet.pkg.kubebench-dashboard
// @description Kubebench dashboard installer
// @shortDescription Kubebench dashboard installer
// @param name string Name for the component
// @optionalParam image string gcr.io/kubeflow-images-public/kubebench/kubebench-dashboard:v0.4.0-13-g262c593 Image for kubebench dashboard

local k = import "k.libsonnet";

local kubebenchDashboard = import "kubebench/kubebench-dashboard/kubebench-dashboard.libsonnet";

local kubebenchDashboardInstance = kubebenchDashboard.new(env, params);
kubebenchDashboardInstance.list(kubebenchDashboardInstance.all)

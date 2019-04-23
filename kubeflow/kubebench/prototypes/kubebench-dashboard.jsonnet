// @apiVersion 0.1
// @name io.ksonnet.pkg.kubebench-dashboard
// @description Kubebench dashboard installer
// @shortDescription Kubebench dashboard installer
// @param name string Name for the component
// @optionalParam image string gcr.io/kubeflow-images-public/kubebench/kubebench-dashboard:v0.4.0-13-g262c593 Image for kubebench dashboard
// @optionalParam injectIstio string false Whether to inject istio sidecar; should be true or false.
// @optionalParam clusterDomain string cluster.local DNS config to cluster domain.

local k = import "k.libsonnet";

local kubebenchDashboard = import "kubeflow/kubebench/kubebench-dashboard.libsonnet";

local kubebenchDashboardInstance = kubebenchDashboard.new(env, params);
kubebenchDashboardInstance.list(kubebenchDashboardInstance.all)

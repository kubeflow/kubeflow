// @apiVersion 0.1
// @name io.ksonnet.pkg.echo-server
// @description Provides a simple server for testing connections; primarily IAP.
// @shortDescription A simple echo server.
// @param name string Name for the component
// @optionalParam image string gcr.io/kubeflow-images-staging/echo-server:v20180628-44f08d31 The image to use.
// @optionalParam injectIstio string false Whether to inject istio sidecar; should be true or false.
// @optionalParam clusterDomain string cluster.local DNS config to cluster domain.

local echoserver = import "kubeflow/common/echo-server.libsonnet";
local instance = echoserver.new(env, params);
instance.list(instance.all)

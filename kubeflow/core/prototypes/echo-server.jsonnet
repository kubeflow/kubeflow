// @apiVersion 0.1
// @name io.ksonnet.pkg.echo-server
// @description Provides a simple server for testing connections; primarily IAP.
// @shortDescription A simple echo server.
// @param name string Name for the component
// @optionalParam image string gcr.io/kubeflow-images-staging/echo-server:v20180628-44f08d31 The image to use.

local echoserver = import "kubeflow/core/echo-server.libsonnet";
local instance = echoserver.new(env, params);
instance.list(instance.all)

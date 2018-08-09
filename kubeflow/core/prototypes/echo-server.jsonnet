// @apiVersion 0.1
// @name io.ksonnet.pkg.echo-server
// @description Provides a simple server for testing connections; primarily IAP.
// @shortDescription A simple echo server.
// @param name string Name for the component
// @optionalParam image string gcr.io/kubeflow-images-staging/echo-server:v20180628-44f08d31 The image to use.

local k = import "k.libsonnet";

// TODO(https://github.com/ksonnet/ksonnet/issues/670) If we don't import the service
// from a libsonnet file the annotation doesn't end up being escaped/represented in a way that
// Ambassador can understand.
local echoParts = import "kubeflow/core/echo-server.libsonnet";
local namespace = env.namespace;

std.prune(k.core.v1.list.new([echoParts.service(namespace, params.name), echoParts.deploy(namespace, params.name, params.image)]))

// @apiVersion 0.0.1
// @name io.ksonnet.pkg.nginx-server-block
// @description Deploys a simple, stateless nginx server with server blocks (roughly equivalent
//   to nginx virtual hosts). The nginx container is deployed using a
//   Kubernetes deployment, and is exposed to a network with a service.
// @shortDescription A simple, stateless nginx server with server blocks.
// @param namespace string Namespace in which to put the application
// @param name string Name to give to all components.

// TODO: How should the ServerBlockConf be exposed to the user? Not quite sure what the default does except for setting web server to port 80.

local k = import 'k.libsonnet';
local nginx = import 'incubator/nginx/nginx.libsonnet';

local namespace = import 'param://namespace';
local appName = import 'param://name';

k.core.v1.list.new([
  nginx.parts.deployment.withServerBlock(namespace, appName),
  nginx.parts.service(namespace, appName),
  nginx.parts.serverBlockConfigMap(namespace, appName),
])

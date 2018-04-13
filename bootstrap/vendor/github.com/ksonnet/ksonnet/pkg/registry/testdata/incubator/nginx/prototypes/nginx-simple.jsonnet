// @apiVersion 0.0.1
// @name io.ksonnet.pkg.nginx-simple
// @description Deploys a simple, stateless nginx server. The nginx container is
//   deployed using a Kubernetes deployment, and is exposed to a network with a
//   service.
// @shortDescription A simple, stateless nginx server.
// @optionalParam namespace string default Namespace in which to put the application
// @param name string Name to give to each of the components


local k = import 'k.libsonnet';
local nginx = import 'incubator/nginx/nginx.libsonnet';

local namespace = import 'param://namespace';
local appName = import 'param://name';

k.core.v1.list.new([
  nginx.parts.deployment.simple(namespace, appName),
  nginx.parts.service(namespace, appName),
])

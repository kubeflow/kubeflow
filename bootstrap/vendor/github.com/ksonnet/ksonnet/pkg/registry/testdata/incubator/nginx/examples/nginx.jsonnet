local k = import 'k.libsonnet';
local nginx = import '../nginx.libsonnet';

local namespace = "dev-alex";
local appName = "nginx-app";

k.core.v1.list.new([
  nginx.parts.deployment.withServerBlock(namespace, appName),
  nginx.parts.service(namespace, appName),
  nginx.parts.serverBlockConfigMap(namespace, appName),
])

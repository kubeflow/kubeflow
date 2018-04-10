local k = import 'k.libsonnet';
local memcached = import '../memcached.libsonnet';

local myNamespace = "dev-alex";
local appName = "memcached";

k.core.v1.list.new([
  memcached.parts.pbd(myNamespace, appName),
  memcached.parts.statefulset.withHardAntiAffinity(myNamespace, appName),
  memcached.parts.service(myNamespace, appName)
])

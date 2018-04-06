// @apiVersion 0.1
// @name io.ksonnet.pkg.redis-all-features
// @description Redis with all the features supported by redis.libsonnet
//   (e.g. secret, metrics, ingress, PVC)
// @shortDescription A Redis deployment with metrics, ingress, and persistent storage.
// @param name string Name to give to each of the components
// @optionalParam redisPassword string null User password to supply to redis

local k = import 'k.libsonnet';
local redis = import 'incubator/redis/redis.libsonnet';

local name = import 'param://name';
local redisPassword = import 'param://redisPassword';

local secretName =
  if redisPassword != "null" then name else null;

local optionalSecret =
  if redisPassword != "null"
  then redis.parts.secret(name, redisPassword)
  else null;

std.prune(k.core.v1.list.new([
  redis.parts.deployment.persistent(name, secretName),
  redis.parts.networkPolicy.allowExternal(name, true, true),
  redis.parts.pvc(name),
  redis.parts.svc.metricEnabled(name),
  optionalSecret,
]))

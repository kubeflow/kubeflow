// @apiVersion 0.0.1
// @name io.ksonnet.pkg.redis-stateless
// @description Stateless redis, backed with NO persistent volume claim. Redis is deployed
//   using a Kubernetes deployment, exposed to the network with a service, with
//   a password stored in a secret.
// @shortDescription A simple, stateless Redis deployment,
// @param name string Name to give to each of the components.
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
  redis.parts.deployment.nonPersistent(name, secretName),
  redis.parts.svc.metricDisabled(name),
  optionalSecret,
]))

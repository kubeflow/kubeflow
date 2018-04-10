local k = import 'k.libsonnet';
local redis = import '../redis.libsonnet';

k.core.v1.list.new([
redis.parts.deployment.persistent("dev-alex", "redis-app","redis-app", true),
  redis.parts.networkPolicy.allowExternal('dev-alex', "redis-app", true, true),
  redis.parts.pvc('dev-alex', "redis-app", "-"),
  redis.parts.secret('dev-alex', "redis-app", 'Zm9vYmFy'),
  redis.parts.svc.metricEnabled("dev-alex", "redis-app"),
])

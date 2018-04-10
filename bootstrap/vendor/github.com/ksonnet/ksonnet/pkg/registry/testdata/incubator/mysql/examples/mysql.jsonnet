local k = import 'k.libsonnet';
local mql = import "../mysql.libsonnet";


k.core.v1.list.new([
  mql.parts.configMap("dev-hoot", "mysql"),
  mql.parts.deployment.persistent("dev-hoot", "mysql", "mysql", "claimName"),
  mql.parts.pvc("dev-hoot", "mysql"),
  mql.parts.secret("dev-hoot", "mysql", "foo", "bar"),
  mql.parts.svc("dev-hoot", "mysql")
])

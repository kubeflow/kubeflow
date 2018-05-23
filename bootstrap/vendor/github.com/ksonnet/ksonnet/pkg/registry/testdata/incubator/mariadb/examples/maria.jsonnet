local k = import 'k.libsonnet';
local maria = import '../maria.libsonnet';

k.core.v1.list.new([
  maria.parts.configMap("dev-hoot", "mariadb-app"),
  maria.parts.deployment.persistent("dev-hoot", "mariadb-app", "passwordSecret"),
  maria.parts.pvc("dev-hoot", "mariadb-app"),
  maria.parts.secret("dev-hoot", "mariadb-app", "mariaRootPassword", "mariadbPassword"),
  maria.parts.svc("dev-hoot", "mariadb-app")
])

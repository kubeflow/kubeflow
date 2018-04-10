local k = import 'k.libsonnet';
local tc = import '../tomcat.libsonnet';



k.core.v1.list.new([
  tc.parts.deployment.persistent("hoot-dev","tomcat-app", "mockUser", "mockSecretName", "mockClaimName"),
  tc.parts.pvc("hoot-dev", "tomcat-app"),
  tc.parts.secret("hoot-dev", "tomcat-app", "boots"),
  tc.parts.svc("hoot-dev","tomcat-app")
  ])


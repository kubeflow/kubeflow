local k = import 'k.libsonnet';
local service = k.core.v1.service.mixin;
local psg = import '../postgres.libsonnet';

k.core.v1.list.new([
  psg.parts.deployment.persistent('dev-alex', "postgress-app"),
  psg.parts.networkPolicy.allowExternal('dev-alex', true),
  psg.parts.pvc('dev-alex', "postgress-app"),
  psg.parts.secrets('dev-alex', "postgress-app", "GOODPASSWORD"),
  psg.parts.service('dev-alex', "postgress-app", false),
])

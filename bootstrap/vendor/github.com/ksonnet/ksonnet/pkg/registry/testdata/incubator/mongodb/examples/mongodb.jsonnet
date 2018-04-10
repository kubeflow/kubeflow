local k = import 'k.libsonnet';
local mongo = import '../mongodb.libsonnet';

local namespace = "dev-alex";
local appName = "mongo";
local rootPassword = "foobar";
local password = "bar";


k.core.v1.list.new([
  mongo.parts.deployment.persistent(namespace, appName),
  mongo.parts.pvc(namespace, appName),
  mongo.parts.secrets(namespace, appName, rootPassword, password),
  mongo.parts.service(namespace, appName),
])

// @apiVersion 0.1
// @name io.ksonnet.pkg.simple-mysql
// @description Deploys MySQL backed by a persistent volume. The MySQL container is deployed
//   using a deployment and exposed to the network with a service. The
//   passwords are stored in a secret.
// @shortDescription A simple MySQL deployment, backed by persistent storage.
// @param namespace string Namespace in which to put the application
// @param name string Name to give to each of the components
// @param mysqlRootPassword string Password for root user
// @param mysqlPassword string Password for new user

local k = import 'k.libsonnet';
local mysql = import '../mysql.libsonnet';

local namespace = import 'param://namespace';
local name = import 'param://name';
local mysqlRootPassword = import 'param://mysqlRootPassword';
local mysqlPassword = import 'param://mysqlPassword';

k.core.v1.list.new([
  mysql.parts.configMap(namespace, name),
  mysql.parts.deployment.persistent(namespace, name, name, name),
  mysql.parts.pvc(namespace, name),
  mysql.parts.secret(namespace, name, mysqlPassword, mysqlRootPassword),
  mysql.parts.svc(namespace, name)
])

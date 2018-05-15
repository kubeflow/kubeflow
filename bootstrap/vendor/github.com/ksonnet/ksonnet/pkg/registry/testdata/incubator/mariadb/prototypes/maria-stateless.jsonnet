// @apiVersion 0.1
// @name io.ksonnet.pkg.stateless-maria
// @description Deploy stateless instance of MariaDB. This is NOT backed by a persistent volume.
//   The MariaDB container is deployed using a deployment and exposed to the
//   network as a service. The password is stored as a secret.
// @shortDescription A simple, stateless MariaDB deployment.
// @param namespace string Namespace in which to put the application
// @param name string Metadata name for each of the deployment components
// @param mariaRootPassword string Password for root user

local k = import 'k.libsonnet';
local maria = import 'incubator/mariadb/maria.libsonnet';

local namespace = import 'param://namespace';
local name = import 'param://name';
local mariaRootPassword = import 'param://mariaRootPassword';

k.core.v1.list.new([
  maria.parts.deployment.nonPersistent(namespace, name, name),
  maria.parts.secret(namespace, name, mariaRootPassword),
  maria.parts.svc(namespace, name)
  ])

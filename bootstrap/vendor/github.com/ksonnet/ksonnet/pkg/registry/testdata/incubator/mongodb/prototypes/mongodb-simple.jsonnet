// @apiVersion 0.0.1
// @name io.ksonnet.pkg.mongodb-simple
// @description Deploys a simple instance of mongodb, backed by a persistent volume claim. The
//   mongodb container is deployed using a Kubernetes deployment, and exposed
//   to the network using a service. Passwords are stored in a secret.
// @shortDescription A simple MongoDB deployment, backed by persistent storage.
// @param namespace string Namespace to specify destination in cluster; default is 'default'
// @param name string Name of app to attach as identifier to all components
// @param rootPassword string RootPassword for db admin password
// @param password string Password for db user password

local k = import 'k.libsonnet';
local mongo = import 'incubator/mongodb/mongodb.libsonnet';

local namespace = import 'param://namespace/';
local appName = import 'param://name';
local rootPassword = import 'param://rootPassword';
local password = import 'param://password';

k.core.v1.list.new([
  mongo.parts.deployment.persistent(namespace, appName),
  mongo.parts.pvc(namespace, appName),
  mongo.parts.secrets(namespace, appName, rootPassword, password),
  mongo.parts.service(namespace, appName)
])

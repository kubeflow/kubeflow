// @apiVersion 0.0.1
// @name io.ksonnet.pkg.nodejs-nonpersistent
// @description Deploy a node.js server with no persistent volumes. The node container is
//   deployed using a deployment, and exposed to the network using a service.
// @shortDescription A simple, stateless NodeJS app server.
// @param namespace string Namespace to specify location of app; default is 'default'
// @param name string Name of app to identify all K8s objects in this prototype

local k = import 'k.libsonnet';
local nodeJS = import 'incubator/node/nodejs.libsonnet';

local namespace = "import 'param://namespace'";
local appName = "import 'param://name'";

k.core.v1.list.new([
  nodeJS.parts.deployment.nonPersistent(namespace, appName),
  nodeJS.parts.svc(namespace, appName)
])

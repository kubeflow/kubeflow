// @apiVersion 0.0.1
// @name io.ksonnet.pkg.nodejs-simple
// @description Deploy a node.js server with persistent volumes. The node container is
//   deployed using a deployment, and exposed to the network using a service.
// @shortDescription A simple NodeJS app server with persistent storage.
// @param namespace string Namespace to specify location of app; default is 'default'
// @param name string Name of app to identify all K8s objects in this prototype


local k = import 'k.libsonnet';
local nodeJS = import 'incubator/node/nodejs.libsonnet';

local appName = import 'param://name';
local namespace = import 'param://namespace';

k.core.v1.list.new([
  nodeJS.parts.deployment.persistent(namespace, appName),
  nodeJS.parts.pvc(namespace, appName),
  nodeJS.parts.svc(namespace, appName)
])

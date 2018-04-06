// @apiVersion 0.0.1
// @name io.ksonnet.pkg.apache-simple
// @description Apache HTTP Server. Apache is deployed using a deployment, and exposed to the
//   network using a service.
// @shortDescription A simple, stateless Apache HTTP server.
// @param namespace string Namespace to divvy up your cluster; default is 'default'
// @param name string Name to identify all Kubernetes objects in this prototype

local k = import 'k.libsonnet';
local apache = import 'incubator/apache/apache.libsonnet';

local namespace = import 'param://namespace';
local appName = import 'param://name';

k.core.v1.list.new([
  apache.parts.deployment(namespace, appName),
  apache.parts.svc(namespace, appName)
])

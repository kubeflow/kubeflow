// @apiVersion 0.0.1
// @name io.ksonnet.pkg.memcached-simple
// @description Deploys Memcached on a your Kubernetes cluster through a stateful set with 3
//   replicas, pod distribution budget (pdb), and service. Memcached
//   can be accessed via port 11211 within the cluster.
// @shortDescription Simple Memcached instance with 3 replicas.
// @param namespace string Namespace in which to put the application
// @param name string Name to give to each of the components

// TODO: Add MaxItemMemory=64 as a param like the k8s/charts?

local k = import 'k.libsonnet';
local memcached = import 'incubator/memcached/memcached.libsonnet';

local namespace = import 'param://namespace';
local appName = import 'param://name';

k.core.v1.list.new([
  memcached.parts.pdb(namespace, appName),
  memcached.parts.statefulset.withHardAntiAffinity(namespace, appName),
  memcached.parts.service(namespace, appName)
])

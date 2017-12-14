// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving
// @description TensorFlow serving
// @shortDescription A TensorFlow serving deployment
// @param name string Name to give to each of the components

local k = import 'k.libsonnet';
local tfServing = import 'kubeflow/tf-serving/tf-serving.libsonnet';

local name = import 'param://name';
//local redisPassword = import 'param://redisPassword';

//local secretName =
//  if redisPassword != "null" then name else null;

//local optionalSecret =
//  if redisPassword != "null"
//  then redis.parts.secret(name, redisPassword)
//  else null;

std.prune(k.core.v1.list.new([
  tfServing.parts.deployment.persistent(name, secretName),
  //redis.parts.networkPolicy.allowExternal(name, true, true),
  //redis.parts.pvc(name),
  //redis.parts.svc.metricEnabled(name),
  //optionalSecret,
]))

// @apiVersion 0.1
// @name io.ksonnet.pkg.seldon-serve
// @description A prototype to serve a seldon model
// @shortDescription A prototype to serve a seldon model
// @param name string Name to give this deployment
// @param image string Docker image which contains this model
// @optionalParam namespace string default Namespace
// @optionalParam replicas number 1 Number of replicas

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import "k.libsonnet";
local serve = import "kubeflow/seldon/serve.libsonnet";

local name = import "param://name";
local image = import "param://image";
local namespace = import "param://namespace";
local replicas = import "param://replicas";

k.core.v1.list.new(serve.parts(namespace).serve(name, image, replicas))

// @apiVersion 0.1
// @name io.ksonnet.pkg.seldon-serve-simple
// @description A prototype to serve a single seldon model
// @shortDescription A prototype to serve a single seldon model
// @param name string Name to give this deployment
// @param image string Docker image which contains this model
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam replicas number 1 Number of replicas
// @optionalParam endpoint string REST The endpoint type: REST or GRPC
// @optionalParam pvcName string null Name of PVC


local k = import "k.libsonnet";
local serve = import "kubeflow/seldon/serve-simple.libsonnet";

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};

local name = import "param://name";
local image = import "param://image";
local namespace = updatedParams.namespace;
local replicas = import "param://replicas";
local endpoint = import "param://endpoint";
local pvcName = import "param://pvcName";

local serveComponents = [
  serve.parts(namespace).serve(name, image, replicas, endpoint, pvcName),
];

local pvcComponent = [
  serve.parts(namespace).createPVC(pvcName),
];

if pvcName != "null" && pvcName != "" then
  k.core.v1.list.new(serveComponents + pvcComponent)
else
  k.core.v1.list.new(serveComponents)

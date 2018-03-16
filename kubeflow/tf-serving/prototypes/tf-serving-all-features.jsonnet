// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving
// @description TensorFlow serving
// @shortDescription A TensorFlow serving deployment
// @param name string Name to give to each of the components

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import "k.libsonnet";

// ksonnet appears to require name be a parameter of the prototype which is why we handle it differently.
local name = import "param://name";

local tfServingBase = import "kubeflow/tf-serving/tf-serving.libsonnet";
local tfServing = tfServingBase {
  // Override parameters with user supplied parameters.
  params+: params {
    name: name,
  },
};

std.prune(k.core.v1.list.new(tfServing.components))

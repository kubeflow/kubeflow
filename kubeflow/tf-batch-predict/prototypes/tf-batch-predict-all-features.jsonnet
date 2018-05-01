// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-batch-predict
// @description TensorFlow batch-predict
// @shortDescription A TensorFlow batch-predictdeployment
// @param name string Name to give to each of the components

local k = import "k.libsonnet";

// ksonnet appears to require name be a parameter of the prototype which is why we handle it differently.
local name = import "param://name";

// updatedParams includes the namespace from env by default.
// We can override namespace in params if needed
local updatedParams = env + params;

local tfBatchPredictBase = import "kubeflow/tf-batch-predict/tf-batch-predict.libsonnet";
local tfBatchPredict = tfBatchPredictBase {
  // Override parameters with user supplied parameters.
  params+: updatedParams {
    name: name,
  },
};

std.prune(k.core.v1.list.new(tfBatchPredict.components))

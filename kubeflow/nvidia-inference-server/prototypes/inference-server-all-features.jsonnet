// @apiVersion 0.1
// @name io.ksonnet.pkg.nvidia-inference-server
// @description NVIDIA Inference Server
// @shortDescription An NVIDIA Inference Server deployment
// @param name string Name to give to each of the components
// @param image string Docker image for inference server
// @param modelRepositoryPath string Path to model repository. Can be absolute file system path (starting with '/') or Google Cloud Storage path (starting with 'gs://').
// @optionalParam namespace string default Kubernetes namespace for deployment and service
// @optionalParam numGpus number 1 Number of GPUs required for inference server node
// @optionalParam serviceType string LoadBalancer The Kubernetes service type for the inference server

local k = import "k.libsonnet";

// ksonnet appears to require name be a parameter of the prototype
// which is why we handle it differently.
local name = import "param://name";

// updatedParams includes the namespace from env by default.
// We can override namespace in params if needed
local updatedParams = env + params;

local inferenceServerBase = import "kubeflow/nvidia-inference-server/nvidia-inference-server.libsonnet";
local inferenceServer = inferenceServerBase {
  // Override parameters with user supplied parameters.
  params+: updatedParams {
    name: name,
  },
};

std.prune(k.core.v1.list.new(inferenceServer.components))

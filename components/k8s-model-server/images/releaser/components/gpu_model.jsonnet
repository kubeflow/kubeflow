local params = std.extVar("__ksonnet/params").components.gpu_model;
// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import "k.libsonnet";
local tfServing = import "kubeflow/tf-serving/tf-serving.libsonnet";

local name = params.name;
local namespace = params.namespace;
local modelPath = params.model_path;
local modelServerImage = params.model_server_image;
local httpProxyImage = params.http_proxy_image;
local serviceType = params.service_type;


// TODO(jlewi): This is awful. We need to find a better way to structure our configs to
// make it easy to override the resources.
local containers = tfServing.parts.deployment.modelServer(name, namespace, modelPath, modelServerImage, httpProxyImage).spec.template.spec.containers;

local tfServingContainer = containers[0] {
  resources+: {
    limits+: {
      "nvidia.com/gpu": 1,
    },
  },
};

local httpProxyContainer = containers[1];
local server = tfServing.parts.deployment.modelServer(name, namespace, modelPath, modelServerImage, httpProxyImage)
               + {
                 spec+: {
                   template+: {
                     spec+: {
                       containers: std.prune([tfServingContainer, httpProxyContainer]),
                       // TODO(jlewi): For the CPU image we set the user and group to 1000 which are defined within the Docker container.
                       // But we don't do the same for the GPU image.
                       securityContext: null,
                     },
                   },
                 },
               };
std.prune(k.core.v1.list.new([
  server,
  tfServing.parts.deployment.modelService(name, namespace, serviceType),
]))

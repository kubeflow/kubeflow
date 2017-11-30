local tfservingService = import "kubeflow/tf-serving/tf-serving-service-template.libsonnet";
local tfserving = import "kubeflow/tf-serving/tf-serving-template.libsonnet";

local params = {
  name: "m",
  serviceType: "ClusterIP",
  modelName: "mnist",
  trafficRule: "v1:100",
  injectIstio: false,
};

local istioParams = params {
  injectIstio: true,
};

local env = {
  namespace: "kubeflow",
};

local deploymentParam = {
  name: "m",
  modelName: "mnist",
  versionName: "v1",
  modelBasePath: "gs://abc",
  numGpus: 0,
  defaultCpuImage: "gcr.io/abc",
  defaultGpuImage: "gcr.io/abc",
  injectIstio: false,
  enablePrometheus: true,
};

local gpuParam1 = {
  name: "m",
  modelName: "mnist",
  versionName: "v1",
  modelBasePath: "gs://abc",
  numGpus: 1,
  defaultCpuImage: "gcr.io/abc",
  defaultGpuImage: "gcr.io/abc",
  injectIstio: false,
  enablePrometheus: true,
};

local gpuParamString0 = {
  name: "m",
  modelName: "mnist",
  versionName: "v1",
  modelBasePath: "gs://abc",
  numGpus: "0",
  defaultCpuImage: "gcr.io/abc",
  defaultGpuImage: "gcr.io/abc",
  injectIstio: false,
  enablePrometheus: true,
};

local gpuParamString1 = {
  name: "m",
  modelName: "mnist",
  versionName: "v1",
  modelBasePath: "gs://abc",
  numGpus: "1",
  defaultCpuImage: "gcr.io/abc",
  defaultGpuImage: "gcr.io/abc",
  injectIstio: false,
  enablePrometheus: true,
};

local serviceInstance = tfservingService.new(env, params);
local istioServiceInstance = tfservingService.new(env, istioParams);

local deploymentInstance = tfserving.new(env, deploymentParam);

local gpuInstance = tfserving.new(env, gpuParam1);
local gpuString0Instance = tfserving.new(env, gpuParamString0);
local gpuString1Instance = tfserving.new(env, gpuParamString1);

// This one should only have tfService
std.assertEqual(
  std.length(serviceInstance.all.items),
  1,
) &&

// This one should have tfService, virtualService, and DestinationRule
std.assertEqual(
  std.length(istioServiceInstance.all.items),
  3
) &&

std.startsWith(
  deploymentInstance.tfDeployment.spec.template.spec.containers[0].args[4],
  "--monitoring_config_file"
) &&

std.assertEqual(
  deploymentInstance.tfDeployment.spec.template.spec.containers[0].resources.limits,
  { cpu: "4", memory: "4Gi" }
) &&

std.assertEqual(
  gpuInstance.tfDeployment.spec.template.spec.containers[0].resources.limits,
  { cpu: "4", memory: "4Gi", "nvidia.com/gpu": 1 }
) &&

std.assertEqual(
  gpuString0Instance.tfDeployment.spec.template.spec.containers[0].resources.limits,
  { cpu: "4", memory: "4Gi" }
) &&

std.assertEqual(
  gpuString1Instance.tfDeployment.spec.template.spec.containers[0].resources.limits,
  { cpu: "4", memory: "4Gi", "nvidia.com/gpu": 1 }
)

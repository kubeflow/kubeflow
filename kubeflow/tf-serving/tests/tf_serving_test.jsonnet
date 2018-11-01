local tfservingService = import "kubeflow/tf-serving/tf-serving-service-template.libsonnet";

local params = {
  name: "m",
  serviceType: "ClusterIP",
  modelName: "mnist",
  trafficRule: "v1:100",
  injectIstio: false,
};

local istioParams = params + {
  injectIstio: true,
};

local env = {
  namespace: "kubeflow",
};

local instance = tfservingService.new(env, params);
local istioInstance = tfservingService.new(env, istioParams);

// This one should only have tfService
std.assertEqual(
  std.length(instance.all.items),
  1,
) &&

// This one should have tfService, virtualService, and DestinationRule
std.assertEqual(
  std.length(istioInstance.all.items),
  3
)
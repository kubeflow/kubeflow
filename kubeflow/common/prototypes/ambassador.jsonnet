// @apiVersion 0.1
// @name io.ksonnet.pkg.ambassador
// @description Ambassador Component
// @shortDescription Ambassador
// @param name string Name
// @optionalParam platform string none supported platforms {none|gke|minikube}
// @optionalParam ambassadorServiceType string ClusterIP The service type for the API Gateway.
// @optionalParam ambassadorImage string quay.io/datawire/ambassador:0.37.0 The image for the API Gateway.

local ambassador = import "kubeflow/common/ambassador.libsonnet";
local instance = ambassador.new(env, params);
instance.list(instance.all)

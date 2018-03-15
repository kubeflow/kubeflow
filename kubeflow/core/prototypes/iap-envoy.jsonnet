// @apiVersion 0.1
// @name io.ksonnet.pkg.iap-envoy
// @description Envoy proxies to handle ingress for IAP.
// @shortDescription Envoy proxies to handle ingress and IAP.
// @param name string Name to give to each of the components
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam envoyImage string gcr.io/kubeflow-images-staging/envoy:v20180309-0fb4886b463698702b6a08955045731903a18738 The image for envoy.
// @optionalParam disableJwtChecking string false Disable JWT checking.
// @param audiences string Comma separated list of JWT audiences to accept

local k = import "k.libsonnet";
local iap = import "kubeflow/core/iap.libsonnet";
local util = import "kubeflow/core/util.libsonnet";

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace
};

local name = import "param://name";
local namespace = updatedParams.namespace;

local envoyImage = import "param://envoyImage";
local audiencesParam = import "param://audiences";
local audiences = std.split(audiencesParam, ",");
local disableJwtCheckingParam = import "param://disableJwtChecking";
local disableJwtChecking = util.toBool(disableJwtCheckingParam);

iap.parts(namespace).envoy(envoyImage, audiences, disableJwtChecking)

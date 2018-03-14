// @apiVersion 0.1
// @name io.ksonnet.pkg.iap-envoy
// @description Envoy proxies to handle ingress for IAP.
// @shortDescription Envoy proxies to handle ingress and IAP.
// @param name string Name to give to each of the components
// @optionalParam envoyImage string gcr.io/kubeflow-images-staging/envoy:v20180309-0fb4886b463698702b6a08955045731903a18738 The image for envoy.
// @optionalParam disableJwtChecking string false Disable JWT checking.
// @param audiences string Comma separated list of JWT audiences to accept

local k = import "k.libsonnet";
local iap = import "kubeflow/core/iap.libsonnet";
local util = import "kubeflow/core/util.libsonnet";

// updatedParams includes the namespace from env by default.
// We can override namespace in params if needed
local updatedParams = env + params;

local name = import "param://name";
local namespace = updatedParams.namespace;

local envoyImage = import "param://envoyImage";
local audiencesParam = import "param://audiences";
local audiences = std.split(audiencesParam, ",");
local disableJwtCheckingParam = import "param://disableJwtChecking";
local disableJwtChecking = util.toBool(disableJwtCheckingParam);

iap.parts(namespace).envoy(envoyImage, audiences, disableJwtChecking)

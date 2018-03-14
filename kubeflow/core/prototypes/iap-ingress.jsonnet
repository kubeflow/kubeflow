// @apiVersion 0.1
// @name io.ksonnet.pkg.iap-ingress
// @description Provides ingress prototypes for setting up IAP on GKE.
// @shortDescription Ingress for IAP on GKE.
// @param name string Name for the component
// @param secretName string The name of the secret containing the SSL certificates.
// @param ipName string The name of the global ip address to use.

local k = import "k.libsonnet";
local iap = import "kubeflow/core/iap.libsonnet";

// updatedParams includes the namespace from env by default.
// We can override namespace in params if needed
local updatedParams = env + params;

local name = import "param://name";
local namespace = updatedParams.namespace;
local secretName = import "param://secretName";
local ipName = import "param://ipName";

iap.parts(namespace).ingressParts(secretName, ipName)

// @apiVersion 0.1
// @name io.ksonnet.pkg.cert-manager
// @description Provides cert-manager prototypes for generating SSL certificates.
// @shortDescription Certificate generation on GKE.
// @param name string Name for the component
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @param acmeEmail string The Lets Encrypt account email address
// @optionalParam acmeUrl string https://acme-v01.api.letsencrypt.org/directory The ACME server URL, set to https://acme-staging.api.letsencrypt.org/directory for staging API.
// @optionalParam certManagerImage string quay.io/jetstack/cert-manager-controller:v0.2.4 certManagerImage
// @optionalParam certManagerIngressShimImage string quay.io/jetstack/cert-manager-ingress-shim:v0.2.4 certManagerIngressShimImage

local k = import "k.libsonnet";
local certManager = import "kubeflow/core/cert-manager.libsonnet";

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};

certManager.parts(updatedParams).certManagerParts()

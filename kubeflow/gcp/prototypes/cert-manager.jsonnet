// @apiVersion 0.1
// @name io.ksonnet.pkg.cert-manager
// @description Provides cert-manager prototypes for generating SSL certificates.
// @shortDescription Certificate generation on GKE.
// @param name string Name for the component
// @param acmeEmail string The Lets Encrypt account email address
// @optionalParam acmeUrl string https://acme-v02.api.letsencrypt.org/directory The ACME server URL, set to https://acme-staging-v02.api.letsencrypt.org/directory for staging API.
// @optionalParam certManagerImage string quay.io/jetstack/cert-manager-controller:v0.4.0 certManagerImage

local certManager = import "kubeflow/gcp/cert-manager.libsonnet";
local instance = certManager.new(env, params);
instance.list(instance.all)

// @apiVersion 0.1
// @name io.ksonnet.pkg.cert-manager
// @description Provides cert-manager prototypes for generating SSL certificates.
// @shortDescription Certificate generation on GKE.
// @param name string Name for the component
// @optionalParam namespace string default Namespace
// @param acmeEmail string The Lets Encrypt account email address
// @optionalParam acmeUrl string https://acme-v01.api.letsencrypt.org/directory The Lets Encrypt account email address, set to https://acme-staging.api.letsencrypt.org/directory for staging API.

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import "k.libsonnet";
local certManager = import "kubeflow/core/cert-manager.libsonnet";

local name = import "param://name";
local namespace = import "param://namespace";
local acmeEmail = import "param://acmeEmail";
local acmeUrl = import "param://acmeUrl";

certManager.parts(namespace).certManagerParts(acmeEmail, acmeUrl)

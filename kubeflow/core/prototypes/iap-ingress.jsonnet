// @apiVersion 0.1
// @name io.ksonnet.pkg.iap-ingress
// @description Provides ingress prototypes for setting up IAP on GKE.
// @shortDescription Ingress for IAP on GKE.
// @param name string Name for the component
// @param ipName string The name of the global ip address to use.
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.
// @optionalParam secretName string envoy-ingress-tls The name of the secret containing the SSL certificates.
// @optionalParam hostname string null The hostname associated with this ingress. Eg: mykubeflow.example.com
// @optionalParam issuer string letsencrypt-prod The cert-manager issuer name.
// @optionalParam envoyImage string gcr.io/kubeflow-images-public/envoy:v20180309-0fb4886b463698702b6a08955045731903a18738 The image for envoy.
// @optionalParam disableJwtChecking string false Disable JWT checking.
// @optionalParam oauthSecretName string kubeflow-oauth The name of the secret containing the OAuth CLIENT_ID and CLIENT_SECRET.

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
local secretName = import "param://secretName";
local ipName = import "param://ipName";
local hostname = import "param://hostname";
local issuer = import "param://issuer";
local envoyImage = import "param://envoyImage";
local disableJwtCheckingParam = import "param://disableJwtChecking";
local disableJwtChecking = util.toBool(disableJwtCheckingParam);
local oauthSecretName = import "param://oauthSecretName";

iap.parts(namespace).ingressParts(secretName, ipName, hostname, issuer, envoyImage, disableJwtChecking, oauthSecretName)

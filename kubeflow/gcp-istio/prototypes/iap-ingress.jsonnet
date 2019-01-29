// @apiVersion 0.1
// @name io.ksonnet.pkg.iap-ingress
// @description Provides ingress prototypes for setting up IAP on GKE.
// @shortDescription Ingress for IAP on GKE.
// @param name string Name for the component
// @param ipName string The name of the global ip address to use.
// @optionalParam istioName string istio-system The namespace of istio resources
// @optionalParam secretName string envoy-ingress-tls The name of the secret containing the SSL certificates.
// @optionalParam hostname string null The hostname associated with this ingress. Eg: mykubeflow.example.com
// @optionalParam issuer string letsencrypt-prod The cert-manager issuer name.
// @optionalParam ingressSetupImage string gcr.io/kubeflow-images-public/ingress-setup:latest The image for setting up ingress.
// @optionalParam disableJwtChecking string false Disable JWT checking.
// @optionalParam oauthSecretName string kubeflow-oauth The name of the secret containing the OAuth client_id and client_secret.
// @optionalParam privateGKECluster string false Is the k8s cluster a private GKE cluster
// @optionalParam istioNamespace string istio-system The namespace where Istio is installed

local iap = import "kubeflow/gcp-istio/iap.libsonnet";
local instance = iap.new(env, params);
instance.list(instance.all)

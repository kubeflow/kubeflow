// @apiVersion 0.1
// @name io.ksonnet.pkg.iap-ingress
// @description Provides ingress prototypes for setting up IAP on GKE.
// @shortDescription Ingress for IAP on GKE.
// @param name string Name for the component
// @param ipName string The name of the global ip address to use.
// @optionalParam secretName string envoy-ingress-tls The name of the secret containing the SSL certificates.
// @optionalParam hostname string null The hostname associated with this ingress. Eg: mykubeflow.example.com
// @optionalParam issuer string letsencrypt-prod The cert-manager issuer name.
// @optionalParam envoyImage string gcr.io/kubeflow-images-public/envoy:v20180309-0fb4886b463698702b6a08955045731903a18738 The image for envoy.
// @optionalParam ingressSetupImage string gcr.io/kubeflow-images-public/ingress-setup:latest The image for setting up ingress.
// @optionalParam disableJwtChecking string false Disable JWT checking.
// @optionalParam oauthSecretName string kubeflow-oauth The name of the secret containing the OAuth client_id and client_secret.
// @optionalParam privateGKECluster string false Is the k8s cluster a private GKE cluster
// @optionalParam injectIstio string false The namespace where Istio is installed
// @optionalParam istioNamespace string istio-system The namespace where Istio is installed
// @optionalParam espSampleAppImage string gcr.io/cloud-solutions-group/esp-sample-app:1.0.0 The sample app used with IAP

local iap = import "kubeflow/gcp/iap.libsonnet";
local instance = iap.new(env, params);
instance.list(instance.all)

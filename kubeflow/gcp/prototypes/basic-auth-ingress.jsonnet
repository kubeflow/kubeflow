// @apiVersion 0.1
// @name io.ksonnet.pkg.basic-auth-ingress
// @description Provides ingress prototypes for setting up basic auth on GKE.
// @shortDescription Ingress for IAP on GKE.
// @param name string Name for the component
// @param ipName string The name of the global ip address to use.
// @optionalParam secretName string envoy-ingress-tls The name of the secret containing the SSL certificates.
// @optionalParam hostname string null The hostname associated with this ingress. Eg: mykubeflow.example.com
// @optionalParam issuer string letsencrypt-prod The cert-manager issuer name.
// @optionalParam ingressSetupImage string gcr.io/kubeflow-images-public/ingress-setup:latest The image for setting up ingress.
// @optionalParam privateGKECluster string false Is the k8s cluster a private GKE cluster
// @optionalParam injectIstio string false The namespace where Istio is installed
// @optionalParam istioNamespace string istio-system The namespace where Istio is installed

local basicauth = import "kubeflow/gcp/basic-auth-ingress.libsonnet";
local instance = basicauth.new(env, params);
instance.list(instance.all)

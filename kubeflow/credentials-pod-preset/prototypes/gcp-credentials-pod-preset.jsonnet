// @apiVersion 0.1
// @name io.ksonnet.pkg.gcp-credentials-pod-preset
// @description This prototype deploys a pod preset which injects credentials into pods
// @shortDescription This prototype deploys a pod preset which injects credentials into pods
// @param name string Name to give to each of the components
// @param serviceAccountName string Name of the service account
// @param secretName string Name of the secret containing the credentials
// @optionalParam namespace string null Namespace to use for the pod preset. It is automatically inherited from the environment if not set.

local k = import "k.libsonnet";

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};

local podPreset = {
  apiVersion: "settings.k8s.io/v1alpha1",
  kind: "PodPreset",
  metadata: {
    name: "inject-" + updatedParams.serviceAccountName + "-credentials",
    namespace: updatedParams.namespace,
  },
  spec: {
    selector: {
      matchLabels: {
        inject_gcp_service_account: updatedParams.serviceAccountName,
      },
    },
    env: [
      {
        name: "GOOGLE_APPLICATION_CREDENTIALS",
        value: "/secrets/gcp-service-account-credentials/" + updatedParams.serviceAccountName + "-key.json",
      },
    ],
    volumeMounts: [
      {
        mountPath: "/secrets/gcp-service-account-credentials",
        readOnly: true,
        name: updatedParams.serviceAccountName + "-credentials",
      },
    ],
    volumes: [
      {
        name: updatedParams.serviceAccountName + "-credentials",
        secret: {
          secretName: updatedParams.secretName,
        },
      },
    ],
  },
};  // podPreset

k.core.v1.list.new(
  podPreset
)

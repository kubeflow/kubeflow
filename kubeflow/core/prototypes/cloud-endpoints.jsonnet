// @apiVersion 0.1
// @name io.ksonnet.pkg.cloud-endpoints
// @description Provides cloud-endpoints prototypes for creating Cloud Endpoints services and DNS records.
// @shortDescription Cloud Endpoint domain creation.
// @param name string Name for the component
// @param secretName string Name of secret containing the json service account key.
// @optionalParam secretKey string cloudep-sa.json Name of the key in the secret containing the JSON service account key.
// @optionalParam namespace string null Namespace to use for the components. It is automatically inherited from the environment if not set.

local k = import "k.libsonnet";
local cloudEndpoints = import "kubeflow/core/cloud-endpoints.libsonnet";

local secretKey = import "param://secretKey";
local secretName = import "param://secretName";

// updatedParams uses the environment namespace if
// the namespace parameter is not explicitly set
local updatedParams = params {
  namespace: if params.namespace == "null" then env.namespace else params.namespace,
};

cloudEndpoints.parts(updatedParams.namespace).cloudEndpointsParts(secretName, secretKey)

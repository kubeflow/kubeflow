// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving-deployment-gcp
// @description TensorFlow serving
// @shortDescription A TensorFlow serving deployment
// @param name string Name to give to each of the components
// @optionalParam numGpus string 0 Number of gpus to use
// @optionalParam deployHttpProxy string false Whether to deploy http proxy
// @optionalParam modelBasePath string gs://kubeflow-examples-data/mnist The model path
// @optionalParam modelName string null The model name
// @optionalParam versionName string v1 The version name
// @optionalParam defaultCpuImage string tensorflow/serving:1.11.1 The default model server image (cpu)
// @optionalParam defaultGpuImage string tensorflow/serving:1.11.1-gpu The default model server image (gpu)
// @optionalParam httpProxyImage string gcr.io/kubeflow-images-public/tf-model-server-http-proxy:v20180723 Http proxy image
// @optionalParam gcpCredentialSecretName string null If not empty, insert the secret credential
// @optionalParam injectIstio string false Whether to inject istio sidecar; should be true or false.
// @optionalParam enablePrometheus string true Whether to enable prometheus endpoint (requires TF 1.11)

local k = import "k.libsonnet";
local deployment = k.apps.v1beta1.deployment;
local container = deployment.mixin.spec.template.spec.containersType;

local util = import "kubeflow/tf-serving/util.libsonnet";
local tfserving = import "kubeflow/tf-serving/tf-serving-template.libsonnet";

local base = tfserving.new(env, params);
local tfDeployment = base.tfDeployment +
                     deployment.mixin.spec.template.spec.withVolumesMixin(
                       if params.gcpCredentialSecretName != "null" then (
                         [{
                           name: "gcp-credentials",
                           secret: {
                             secretName: params.gcpCredentialSecretName,
                           },
                         }]
                       ) else [],
                     ) +
                     deployment.mapContainers(
                       function(c) {
                         result::
                           c + container.withEnvMixin(
                             if params.gcpCredentialSecretName != "null" then (
                               [{
                                 name: "GOOGLE_APPLICATION_CREDENTIALS",
                                 value: "/secret/gcp-credentials/user-gcp-sa.json",
                               }]
                             ) else [],
                           ) +
                           container.withVolumeMountsMixin(
                             if params.gcpCredentialSecretName != "null" then (
                               [{
                                 name: "gcp-credentials",
                                 mountPath: "/secret/gcp-credentials",
                               }]
                             ) else [],
                           ),
                       }.result,
                     );
util.list([
  tfDeployment,
  base.tfservingConfig,
],)

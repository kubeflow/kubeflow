// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving-gcp
// @description TensorFlow serving
// @shortDescription A TensorFlow serving deployment
// @param name string Name to give to each of the components
// @optionalParam namespace string kubeflow The namespace
// @optionalParam serviceType string ClusterIP The k8s service type for tf serving.
// @optionalParam numGpus string 0 Number of gpus to use
// @optionalParam deployHttpProxy string false Whether to deploy http proxy
// @optionalParam modelBasePath string gs://kubeflow-examples-data/mnist The model path
// @optionalParam modelName string mnist The model name
// @optionalParam defaultCpuImage string tensorflow/serving:1.8.0 The default model server image (cpu)
// @optionalParam defaultGpuImage string tensorflow/serving:1.10.0-gpu The default model server image (gpu)
// @optionalParam httpProxyImage string gcr.io/kubeflow-images-public/tf-model-server-http-proxy:v20180723 Http proxy image
// @optionalParam gcpCredentialSecretName string null If not empty, insert the secret credential

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
                                 value: "/secret/gcp-credentials/key.json",
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
  base.tfService,
],)

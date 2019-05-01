// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving-deployment-aws
// @description TensorFlow serving
// @shortDescription A TensorFlow serving deployment
// @param name string Name to give to each of the components
// @optionalParam numGpus string 0 Number of gpus to use
// @optionalParam deployHttpProxy string false Whether to deploy http proxy
// @optionalParam injectIstio string false Whether to inject istio sidecar; should be true or false.
// @optionalParam enablePrometheus string true Whether to enable prometheus endpoint (requires TF 1.11)
// @optionalParam modelBasePath string s3://kubeflow-examples-data/mnist The model path
// @optionalParam modelName string null The model name
// @optionalParam versionName string v1 The version name
// @optionalParam defaultCpuImage string tensorflow/serving:1.11.1 The default model server image (cpu)
// @optionalParam defaultGpuImage string tensorflow/serving:1.11.1-gpu The default model server image (gpu)
// @optionalParam httpProxyImage string gcr.io/kubeflow-images-public/tf-model-server-http-proxy:v20180723 Http proxy image
// @optionalParam s3Enable string false Whether to enable S3
// Following parameters are needed only if s3Enable is true
// @optionalParam s3SecretName string null Name of the k8s secrets containing S3 credentials
// @optionalParam s3SecretAccesskeyidKeyName string AWS_ACCESS_KEY_ID Name of the key in the k8s secret containing AWS_ACCESS_KEY_ID
// @optionalParam s3SecretSecretaccesskeyKeyName string AWS_SECRET_ACCESS_KEY Name of the key in the k8s secret containing AWS_SECRET_ACCESS_KEY
// @optionalParam s3AwsRegion string us-west-1 S3 region
// @optionalParam s3UseHttps string true Whether or not to use https
// @optionalParam s3VerifySsl string true Whether or not to verify https certificates for S3 connections
// @optionalParam s3Endpoint string s3.us-west-1.amazonaws.com URL for your s3-compatible endpoint

local k = import "k.libsonnet";
local deployment = k.apps.v1beta1.deployment;
local container = deployment.mixin.spec.template.spec.containersType;

local util = import "kubeflow/tf-serving/util.libsonnet";
local tfserving = import "kubeflow/tf-serving/tf-serving-template.libsonnet";

local base = tfserving.new(env, params);
local tfDeployment = base.tfDeployment +
                     deployment.mapContainers(
                       function(c) {
                         result::
                           c + container.withEnvMixin(
                             if util.toBool(params.s3Enable) then (
                               [
                                 {
                                   name: "AWS_ACCESS_KEY_ID",
                                   valueFrom: { secretKeyRef: { name: params.s3SecretName, key: params.s3SecretAccesskeyidKeyName } },
                                 },
                                 {
                                   name: "AWS_SECRET_ACCESS_KEY",
                                   valueFrom: { secretKeyRef: { name: params.s3SecretName, key: params.s3SecretSecretaccesskeyKeyName } },
                                 },
                                 { name: "AWS_REGION", value: params.s3AwsRegion },
                                 { name: "S3_USE_HTTPS", value: std.toString(params.s3UseHttps) },
                                 { name: "S3_VERIFY_SSL", value: std.toString(params.s3VerifySsl) },
                                 { name: "S3_ENDPOINT", value: params.s3Endpoint },
                               ]
                             ) else [],
                           ),
                       }.result,
                     );
util.list([
  tfDeployment,
  base.tfservingConfig,
],)

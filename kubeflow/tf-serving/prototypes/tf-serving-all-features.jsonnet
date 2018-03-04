// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving
// @description TensorFlow serving
// @shortDescription A TensorFlow serving deployment
// @param name string Name to give to each of the components
// @optionalParam namespace string default Namespace
// @param model_path string Path to the model. This can be a GCS path.
// @optionalParam model_server_image string gcr.io/kubeflow-images-staging/tf-model-server:v20180227-master Container for TF model server
// @optionalParam http_proxy_image string gcr.io/kubeflow/http-proxy:1.0 Container for http_proxy of TF model server
// @optionalParam service_type string ClusterIP The service type for TFServing deployment.
// @optionalParam s3_create_secret string true Whether or not to create a secret containing aws-access-key-id and aws-secret-access-key. Otherwise will use provided secret.
// @optionalParam s3_secret_name string s3-credentials Name of the k8s secrets containing S3 credentials.
// @optionalParam s3_secret_accesskeyid_key_name string aws-access-key-id Name of the key in the k8s secret containing AWS_ACCESS_KEY_ID.
// @optionalParam s3_secret_secretaccesskey_key_name string aws-secret-access-key Name of the key in the k8s secret containing AWS_SECRET_ACCESS_KEY.
// @optionalParam s3_aws_access_key_id string key_id S3 access key id
// @optionalParam s3_aws_secret_access_key string secret_key S3 secret access key
// @optionalParam s3_aws_region string us-west-1 S3 Region
// @optionalParam s3_use_https string true Whether or not to use https for S3 connections
// @optionalParam s3_verify_ssl string true Whether or not to verify https certificates for S3 connections
// @optionalParam s3_endpoint string http://s3.us-west-1.amazonaws.com URL for your s3-compatible endpoint.

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import "k.libsonnet";
local tfServing = import "kubeflow/tf-serving/tf-serving.libsonnet";

local name = import "param://name";
local namespace = import "param://namespace";
local modelPath = import "param://model_path";
local modelServerImage = import "param://model_server_image";
local httpProxyImage = import "param://http_proxy_image";
local serviceType = import "param://service_type";
local s3CreateSecret = import "param://s3_create_secret";
local s3SecretName = import "param://s3_secret_name";
local s3SecretAccesskeyidKeyName = import "param://s3_secret_accesskeyid_key_name";
local s3SecretSecretaccesskeyKeyName = import "param://s3_secret_secretaccesskey_key_name";
local s3awsAccessKeyID = import "param://s3_aws_access_key_id";
local s3awsSecretAccessKey = import "param://s3_aws_secret_access_key";
local s3awsRegion = import "param://s3_aws_region";
local s3UseHTTPS = import "param://s3_use_https";
local s3VerifySSL = import "param://s3_verify_ssl";
local s3Endpoint = import "param://s3_endpoint";


local modelServerEnv = [
  { name: "AWS_ACCESS_KEY_ID", valueFrom: { secretKeyRef: { name: s3SecretName, key: s3SecretAccesskeyidKeyName }, }, },
  { name: "AWS_SECRET_ACCESS_KEY", valueFrom: { secretKeyRef: { name: s3SecretName, key: s3SecretSecretaccesskeyKeyName }, }, },
  { name: "AWS_REGION", value: s3awsRegion },
  { name: "S3_REGION", value: s3awsRegion },
  { name: "S3_USE_HTTPS", value: s3UseHTTPS },
  { name: "S3_VERIFY_SSL", value: s3VerifySSL },
  { name: "S3_ENDPOINT", value: s3Endpoint },
];

local objects = [
  tfServing.parts.deployment.modelService(name, namespace, serviceType),
  tfServing.parts.deployment.modelServer(name, namespace, modelPath, modelServerImage, modelServerEnv, httpProxyImage),
  if s3CreateSecret == "true" then
    tfServing.parts.deployment.modelSecret(s3SecretName, namespace, s3awsAccessKeyID, s3awsSecretAccessKey),
];

std.prune(k.core.v1.list.new(objects))

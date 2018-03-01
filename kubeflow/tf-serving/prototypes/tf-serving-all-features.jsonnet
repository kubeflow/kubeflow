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
// @optionalParam aws_access_key_id string key_id S3 access key id
// @optionalParam aws_secret_access_key string secret_key S3 secret access key
// @optionalParam aws_region string us-west-1 S3 Region
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
local awsAccessKeyID = import "param://aws_access_key_id";
local awsSecretAccessKey = import "param://aws_secret_access_key";
local awsRegion = import "param://aws_region";
local s3UseHTTPS = import "param://s3_use_https";
local s3VerifySSL = import "param://s3_verify_ssl";
local s3Endpoint = import "param://s3_endpoint";


local modelServerEnv = [
  { name: "AWS_ACCESS_KEY_ID", valueFrom: { secretKeyRef: { name: name, key: "aws-access-key-id" }, }, },
  { name: "AWS_SECRET_ACCESS_KEY", valueFrom: { secretKeyRef: { name: name, key: "aws-secret-access-key" }, }, },
  { name: "AWS_REGION", value: awsRegion },
  { name: "S3_REGION", value: awsRegion },
  { name: "S3_USE_HTTPS", value: s3UseHTTPS },
  { name: "S3_VERIFY_SSL", value: s3VerifySSL },
  { name: "S3_ENDPOINT", value: s3Endpoint },
];

std.prune(k.core.v1.list.new([
  tfServing.parts.deployment.modelSecret(name, namespace, awsAccessKeyID, awsSecretAccessKey),
  tfServing.parts.deployment.modelServer(name, namespace, modelPath, modelServerImage, modelServerEnv, httpProxyImage),
  tfServing.parts.deployment.modelService(name, namespace, serviceType),
]))

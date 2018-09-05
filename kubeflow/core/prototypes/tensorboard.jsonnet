// @apiVersion 1
// @name io.ksonnet.pkg.tensorboard
// @description Tensorboard components
// @shortDescription ksonnet components for Tensorboard
// @param name string Name to give to each of the components

local params = {
  name: "baz",
  serviceType: "ClusterIP",
  logDir: "/foo/bar",
  defaultTbImage: "gcr.io/tensorflow/tensorflow:latest",
  s3Enable: true,
  cloud: "gcp",
  targetPort: 9000,
  gcpCredentialSecretName: "voodoo",
  s3SecretName: "blah",
  // Name of the key in the k8s secret containing AWS_ACCESS_KEY_ID.
  s3SecretAccesskeyidKeyName: "blahblah",
  // Name of the key in the k8s secret containing AWS_SECRET_ACCESS_KEY.
  s3SecretSecretaccesskeyKeyName: "bazblah",
  // S3 region
  s3AwsRegion: "us-west-1",
  // true Whether or not to use https for S3 connections
  s3UseHttps: "true",
  // Whether or not to verify https certificates for S3 connections
  s3VerifySsl: "true",
  // URL for your s3-compatible endpoint.
  s3Endpoint: "http://s3.us-west-1.amazonaws.com",
};
local env = {
  namespace: "foo",
};

local tensorboard = import "kubeflow/core/tensorboard.libsonnet";
tensorboard.new(env, params).list

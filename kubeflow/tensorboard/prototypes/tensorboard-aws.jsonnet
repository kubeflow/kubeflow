// @apiVersion 1
// @name io.ksonnet.pkg.tensorboard-aws
// @description Tensorboard components
// @shortDescription ksonnet components for Tensorboard
// @param name string Name to give to each of the components
// @optionalParam logDir string logs Name of the log directory holding the TF events file
// @optionalParam targetPort number 6006 Name of the targetPort
// @optionalParam servicePort number 9000 Name of the servicePort
// @optionalParam serviceType string ClusterIP The service type for Jupyterhub.
// @optionalParam defaultTbImage string tensorflow/tensorflow:1.8.0 default tensorboard image to use
// @optionalParam s3SecretName string null Name of the k8s secrets containing S3 credentials
// @optionalParam s3SecretAccesskeyidKeyName string null Name of the key in the k8s secret containing AWS_ACCESS_KEY_ID
// @optionalParam s3SecretSecretaccesskeyKeyName string null Name of the key in the k8s secret containing AWS_SECRET_ACCESS_KEY
// @optionalParam s3AwsRegion string us-west-1 S3 region
// @optionalParam s3UseHttps string true Whether or not to use https
// @optionalParam s3VerifySsl string true Whether or not to verify https certificates for S3 connections

local tensorboard = {
  local k = import "k.libsonnet",
  local util = import "kubeflow/core/util.libsonnet",
  local deployment = k.apps.v1beta1.deployment,

  new(_env, _params):: {
    local params = _env + _params {
      namespace:
        if std.objectHas(_params, "namespace") &&
           _params.namespace != "null" then
          _params.namespace else _env.namespace,
      labels: {
        app: _params.name,
      },
    },

    local base = import "kubeflow/tensorboard/tensorboard.libsonnet",
    local tensorboard = base.new(_env, _params),

    tbService:: tensorboard.tbService,

    local tbDeployment =
      tensorboard.tbDeployment +
        deployment.mapContainers(
          function(c) {
            result:: c + c.withEnvMixin(
              [
                {
                  name: "AWS_ACCESS_KEY_ID",
                  valueFrom: {
                    secretKeyRef: {
                      name: params.s3SecretName,
                      key: params.s3SecretAccesskeyidKeyName,
                    },
                  },
                },
                {
                  name: "AWS_SECRET_ACCESS_KEY",
                  valueFrom: {
                    secretKeyRef: {
                      name: params.s3SecretName,
                      key: params.s3SecretSecretaccesskeyKeyName,
                    },
                  },
                },
                {
                  name: "AWS_REGION",
                  value: params.s3AwsRegion,
                },
                {
                  name: "S3_REGION",
                  value: params.s3AwsRegion,
                },
                {
                  name: "S3_USE_HTTPS",
                  value: params.s3UseHttps,
                },
                {
                  name: "S3_VERIFY_SSL",
                  value: params.s3VerifySsl,
                },
                {
                  name: "S3_ENDPOINT",
                  value: params.s3Endpoint,
                },
              ]
            ),
          }.result,
        ),
    tbDeployment:: tbDeployment,

    all:: [
      self.tbService,
      self.tbDeployment,
    ],

    list(obj=self.all):: util.list(obj),

  },
};
local instance = tensorboard.new(env, params);
instance.list(instance.all)

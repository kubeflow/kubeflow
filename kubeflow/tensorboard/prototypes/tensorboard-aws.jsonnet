// @apiVersion 1
// @name io.ksonnet.pkg.tensorboard
// @description Tensorboard components
// @shortDescription ksonnet components for Tensorboard
// @param name string Name to give to each of the components

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

    local tensorboard = (import "kubeflow/tensorboard/tensorboard.libsonnet").new(_env, _params),

    tbService:: tensorboard.tbService,

    local tbDeployment =
      tensorboard.tbDeployment +
      deployment.mapContainers(
        function(c) {
          result:: c.withEnvMixin(
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

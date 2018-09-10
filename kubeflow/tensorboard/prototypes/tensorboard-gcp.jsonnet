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
      deployment.mixin.spec.template.spec.withVolumesMixin(
        if params.gcpCredentialSecretName != "" then (
          [{
            name: "gcp-credentials",
            secret: {
              secretName: params.gcpCredentialSecretName,
            },
          }]
        )
      ) +
      deployment.mapContainers(
        function(c) {
          result::
            c.withEnvMixin(
              if params.gcpCredentialSecretName != "" then (
                [{
                  name: "GOOGLE_APPLICATION_CREDENTIALS",
                  value: "/secret/gcp-credentials/key.json",
                }]
              )
            ) +
            c.withVolumeMountsMixin(
              if params.gcpCredentialSecretName != "" then (
                [{
                  name: "gcp-credentials",
                  mountPath: "/secret/gcp-credentials",
                }]
              )
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

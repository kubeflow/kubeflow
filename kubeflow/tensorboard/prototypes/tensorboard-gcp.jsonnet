// @apiVersion 1
// @name io.ksonnet.pkg.tensorboard-gcp
// @description Tensorboard components
// @shortDescription ksonnet components for Tensorboard
// @param name string Name to give to each of the components
// @optionalParam logDir string logs Name of the log directory holding the TF events file
// @optionalParam targetPort number 6006 Name of the targetPort
// @optionalParam servicePort number 9000 Name of the servicePort
// @optionalParam serviceType string ClusterIP The service type for Jupyterhub.
// @optionalParam defaultTbImage string tensorflow/tensorflow:1.8.0 default tensorboard image to use
// @optionalParam gcpCredentialSecretName string null Name of the k8s secrets containing gcp credentials

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
      deployment.mixin.spec.template.spec.withVolumesMixin(
        if params.gcpCredentialSecretName != "" then (
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
            c + c.withEnvMixin(
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

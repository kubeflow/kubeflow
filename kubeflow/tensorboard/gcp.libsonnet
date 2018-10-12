{
  local k = import "k.libsonnet",
  local util = import "kubeflow/core/util.libsonnet",
  local deployment = k.apps.v1beta1.deployment,
  local params = super.params,

  tbService:: super.tbService,

  local tbDeployment =
    super.tbDeployment +
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
}

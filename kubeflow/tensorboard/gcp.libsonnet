{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  local deployment = k.apps.v1beta1.deployment,
  // super resolves to any object which has a params field.
  local params = super.params,

  // super resolves to any object which has a tbService field
  tbService:: super.tbService,

  tbDeployment::
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

  parts:: self,
  all:: [
    self.tbService,
    self.tbDeployment,
  ],

  list(obj=self.all):: util.list(obj),
}

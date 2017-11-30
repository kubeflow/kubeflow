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

  parts:: self,
  all:: [
    self.tbService,
    self.tbDeployment,
  ],

  list(obj=self.all):: util.list(obj),
}

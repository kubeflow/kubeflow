{
local k = import "k.libsonnet",
local util = import "kubeflow/core/util.libsonnet",
local service = k.core.v1.service,
local deployment = k.apps.v1beta1.deployment,
local container = deployment.mixin.spec.template.spec.containersType,
  new(_env, _params):: {
    local params = _env + _params {
      namespace: if std.objectHas(_params, "namespace") &&
                    _params.namespace != "null" then
        _params.namespace else _env.namespace,
      labels: {
        app: _params.name,
      },
      s3UseHttps: util.toBool(_params.s3UseHttps),
      s3VerifySsl: util.toBool(_params.s3VerifySsl),
    },

    local tbContainer =
      container.
        new(params.name, params.defaultTbImage) +
      container.withImagePullPolicy("IfNotPresent") +
      container.withArgs([params.logDir, "--port=9000"]) +
      container.withPorts(container.portsType.new(params.targetPort)) +
      container.withCommand(["/usr/local/bin/tensorboard"]) +
      container.mixin.resources.withLimits({
        memory: "4Gi",
        cpu: "4",
      }) +
      container.mixin.resources.withRequests({
        memory: "1Gi",
        cpu: "1",
      }),

    local mapContainers(c) = {
      out:: c.withEnvMixin(
              if params.s3Enable then (
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
              )
            ) +
            c.withEnvMixin(
              if params.cloud == "gcp" &&
                 params.gcpCredentialSecretName != "" then (
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
    }.out,

    local tfDeployment =
      deployment.new(
        name=params.name,
        replicas=1,
        containers=tbContainer,
        podLabels=params.labels,
      ) +
      deployment.mixin.metadata.
        withNamespace(params.namespace).
        withLabels(params.labels) +
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
        mapContainers
      ),

    local tbService =
      service.new(
        name=params.name,
        selector=params.labels,
        ports=service.mixin.spec.portsType.newNamed("tb", 9000, params.targetPort)
      ).
        withType(params.serviceType) +
      service.mixin.metadata.
        withNamespace(params.namespace).
        withLabels(params.labels).
        withAnnotations({
        "getambassador.io/config":
          std.join("\n", [
            "---",
            "apiVersion: ambassador/v0",
            "kind:  Mapping",
            "name: tb-mapping-" + params.name + "-get",
            "prefix: /tensorboard/ " + params.name + "/",
            "rewrite: /",
            "method: GET",
            "service: " + params.name + "." + params.namespace + ":9000",
          ]),
      }),

    list:: util.list([
        tbService,
        tfDeployment,
    ]),
  },

}

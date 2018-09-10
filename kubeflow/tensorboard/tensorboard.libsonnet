{
  local k = import "k.libsonnet",
  local util = import "kubeflow/core/util.libsonnet",
  local service = k.core.v1.service,
  local deployment = k.apps.v1beta1.deployment,
  local container = deployment.mixin.spec.template.spec.containersType,

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

    local tbService =
      service.new(
        name=params.name,
        selector=params.labels,
        ports=service.mixin.spec.portsType.newNamed("tb", 9000, params.targetPort),
      ).withType(params.serviceType) +
      service.mixin.metadata.
        withNamespace(params.namespace).
        withLabelsMixin(params.labels).
        withAnnotationsMixin({
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
    tbService:: tbService,

    local tbContainer =
      container.new(
        params.name, params.defaultTbImage
      ).withImagePullPolicy("IfNotPresent").
        withArgs([params.logDir, "--port=9000"]).
        withPorts(container.portsType.new(params.targetPort)).
        withCommand(["/usr/local/bin/tensorboard"]) +
      container.mixin.resources.withLimitsMixin({
        memory: "4Gi",
        cpu: "4",
      }).withRequestsMixin({
        memory: "1Gi",
        cpu: "1",
      }),

    local tbDeployment =
      deployment.new(
        name=params.name,
        replicas=1,
        containers=container,
        podLabels=params.labels,
      ) +
      deployment.mixin.metadata.
        withNamespace(params.namespace).
        withLabelsMixin(params.labels),
    tbDeployment:: tbDeployment,
  },
}

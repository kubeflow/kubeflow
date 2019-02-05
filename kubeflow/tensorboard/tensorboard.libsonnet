{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  local service = k.core.v1.service,
  local deployment = k.apps.v1beta1.deployment,
  local container = deployment.mixin.spec.template.spec.containersType,

  new(_env, _params):: {
    local params = _params + _env {
      labels: {
        app: _params.name,
      },
    },
    params:: params,

    local tbService =
      service.new(
        name=params.name,
        selector=params.labels,
        ports=service.mixin.spec.portsType.newNamed("tb", params.servicePort, params.targetPort),
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
            "service: " + params.name + "." + params.namespace + ":" + params.servicePort,
          ]),
      }),
    tbService:: tbService,

    local tbContainer =
      container.new(
        params.name, params.defaultTbImage
      ).withImagePullPolicy("IfNotPresent").
        withArgs(["--logdir=" + params.logDir, "--port=" + params.targetPort]).
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
        containers=tbContainer,
        podLabels=params.labels,
      ) +
      deployment.mixin.metadata.
        withNamespace(params.namespace).
        withLabelsMixin(params.labels),
    tbDeployment:: tbDeployment,

    parts:: self,
    all:: [
      self.tbService,
      self.tbDeployment,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  local service = k.core.v1.service,
  local deployment = k.apps.v1beta1.deployment,
  local container = deployment.mixin.spec.template.spec.containersType,

  new(_env, _params):: {
    local params = _env + _params {
      labels: {
        role: _params.name,
      },
      imageURL: _params.registry + "/" + _params.repoPath + "/" + _params.image,
    },
    params:: params,

    local ovService =
      service.new(
        name=params.name,
        selector=params.labels,
        ports=service.mixin.spec.portsType.newNamed("ov", params.servicePort, params.targetPort),
      ).withType(params.serviceType) +
      service.mixin.metadata.
        withNamespace(params.namespace).
        withAnnotationsMixin({
        "getambassador.io/config":
          std.join("\n", [
            "---",
            "apiVersion: ambassador/v0",
            "kind:  Mapping",
            "name: openvino-mapping",
            "prefix: /openvino/",
            "rewrite: /",
            "service: " + params.name + "." + params.namespace + ":" + params.servicePort,
          ]),
      }),
    ovService:: ovService,

    local ovContainer =
      container.new(
        params.name, params.imageURL
      ).withImagePullPolicy("IfNotPresent").
        withArgs([
        "ie_serving",
        "model",
        "--model_path",
        params.pvcMount + "/" + params.modelName,
        "--model_name",
        params.modelName,
        "--port",
        std.toString(params.targetPort),
      ]).
        withPorts(container.portsType.new(params.targetPort)).
        withCommand(["/ie-serving-py/start_server.sh"]) +
      container.withVolumeMountsMixin([
        {
          name: "nfs",
          mountPath: params.pvcMount,
        },
      ]) +
      container.mixin.resources.withLimitsMixin({
        memory: "4Gi",
        cpu: "4",
      }).withRequestsMixin({
        memory: "1Gi",
        cpu: "1",
      }),

    local ovDeployment =
      deployment.new(
        name=params.name,
        replicas=params.replicas,
        containers=ovContainer,
        podLabels=params.labels,
      ) +
      deployment.mixin.metadata.
        withNamespace(params.namespace).
        withLabelsMixin(params.labels) +
      deployment.mixin.spec.template.spec.
        withVolumesMixin(
        if params.modelStorageType == "nfs" then
          [{
            name: "nfs",
            persistentVolumeClaim: {
              claimName: params.pvc,
            },
          }]
        else [],
      ),
    ovDeployment:: ovDeployment,

    parts:: self,
    all:: [
      self.ovService,
      self.ovDeployment,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

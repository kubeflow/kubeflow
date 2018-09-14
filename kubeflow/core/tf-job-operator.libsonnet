{
  local k = import "k.libsonnet",
  local util = import "kubeflow/core/util.libsonnet",
  local deployment = k.apps.v1beta1.deployment,
  local container = deployment.mixin.spec.template.spec.containersType,
  local configMap = k.core.v1.configMap,
  local crd = k.apiextensions.v1beta1.customResourceDefinition,
  local role = k.rbac.v1beta1.role,
  local roleBinding = k.rbac.v1beta1.roleBinding,
  local rule = role.rulesType,
  local service = k.core.v1.service,
  local serviceAccount = k.core.v1.serviceAccount,
  new(_env, _params):: {
    local params = _env + _params {
      namespace: if std.objectHas(_params, "namespace") && _params.namespace != "null" then
        _params.namespace else _env.namespace,
    },

    local roleType(deploymentScope) = {
      return:: if deploymentScope == "cluster" then [
        k.rbac.v1beta1.clusterRole,
        k.rbac.v1beta1.clusterRoleBinding,
      ] else [
        k.rbac.v1beta1.role,
        k.rbac.v1beta1.roleBinding,
      ],
    }.return,
    local roles = roleType(params.deploymentScope),
    local operatorRole = roles[0],
    local operatorRoleBinding = roles[1],
    local rules = {
      tfJobsRule:: rule.new() + rule.
        withApiGroupsMixin([
        "tensorflow.org",
        "kubeflow.org",
        ],).
        withResourcesMixin([
        "tfjobs",
        ],).
        withVerbsMixin([
        "*",
        ],),
      tfCrdRule:: rule.new() + rule.
        withApiGroupsMixin([
        "apiextensions.k8s.io",
        ],).
        withResourcesMixin([
        "customresourcedefinitions",
        ],).
        withVerbsMixin([
        "*",
        ],),
      tfStorageRule:: rule.new() + rule.
        withApiGroupsMixin([
        "storage.k8s.io",
        ],).
        withResourcesMixin([
        "storageclasses",
        ],).
        withVerbsMixin([
        "*",
        ],),
      tfBatchRule:: rule.new() + rule.
        withApiGroupsMixin([
        "batch",
        ],).
        withResourcesMixin([
        "jobs",
        ],).
        withVerbsMixin([
        "*",
        ],),
      tfCoreRule:: rule.new() + rule.
        withApiGroupsMixin([
        "",
        ],).
        withResourcesMixin([
        "configmaps",
        "pods",
        "services",
        "endpoints",
        "persistentvolumeclaims",
        "events",
        ],).
        withVerbsMixin([
        "*",
        ],),
      tfAppsRule:: rule.new() + rule.
        withApiGroupsMixin([
        "apps",
        "extensions",
        ],).
        withResourcesMixin([
        "deployments",
        ],).
        withVerbsMixin([
        "*",
        ],),
    },

    local openApiV3Schema = {
      properties: {
        spec: {
          properties: {
            tfReplicaSpecs: {
              properties: {
                // The validation works when the configuration contains
                // `Worker`, `PS` or `Chief`. Otherwise it will not be validated.
                Worker: {
                  properties: {
                    // We do not validate pod template because of
                    // https://github.com/kubernetes/kubernetes/issues/54579
                    replicas: {
                      type: "integer",
                      minimum: 1,
                    },
                  },
                },
                PS: {
                  properties: {
                    replicas: {
                      type: "integer",
                      minimum: 1,
                    },
                  },
                },
                Chief: {
                  properties: {
                    replicas: {
                      type: "integer",
                      minimum: 1,
                      maximum: 1,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    local tfJobCrd =
      crd.new() + crd.mixin.metadata.
        withName("tfjobs.kubeflow.org").
        withNamespace(params.namespace) + crd.mixin.spec.
        withGroup("kubeflow.org").
        withVersion("v1alpha1").
        withScope("Namespaced") + crd.mixin.spec.names.
        withKind("TFJob").
        withPlural("tfjobs").
        withSingular("tfjob"),
    tfJobCrd:: tfJobCrd,

    local tfJobContainer = container.new(
      name="tf-job-operator",
      image=params.tfJobImage,
    ).
      withCommand("/opt/mlkube/tf-operator").
      withArgs([
      "--controller-config-file=/etc/config/controller_config_file.yaml",
      "--alsologtostderr",
      "-v=1",
    ]).
      withVolumeMountsMixin([{
      mountPath: "/etc/config",
      name: "config-volume",
    }],).
      withEnvMixin(
      [
        {
          name: "MY_POD_NAMESPACE",
          valueFrom: {
            fieldRef: {
              fieldPath: "metadata.namespace",
            },
          },
        },
        {
          name: "MY_POD_NAME",
          valueFrom: {
            fieldRef: {
              fieldPath: "metadata.name",
            },
          },
        },
      ],
    ),
    tfJobContainer:: tfJobContainer,

    local tfJobDeploy =
      deployment.new(
        name=params.name,
        replicas=1,
        containers=tfJobContainer,
      ) + deployment.mixin.spec.template.metadata.
        withNamespace(params.namespace).
        withLabelsMixin({
        name: "tf-job-operator",
      }) +
      deployment.mixin.spec.template.spec.
        withServiceAccountName("tf-job-operator").
        withVolumesMixin([{
        configMap: {
          name: "tf-job-operator-config",
        },
        name: "config-volume",
      }],),
    tfJobDeploy:: tfJobDeploy,

    local tfConfigMap = configMap.new(
      name="tf-job-operator-config",
      data={
        "controller_config_file.yaml": std.manifestJson({
          grpcServerFilePath: "/opt/mlkube/grpc_tensorflow_server/grpc_tensorflow_server.py",
        } + if params.tfDefaultImage != "" &&
               params.tfDefaultImage != "null" then {
          tfImage: params.tfDefaultImage,
        } else {},),
      },
    ).withName("tf-job-operator-config").
      withNamespace(params.namespace),
    tfConfigMap:: tfConfigMap,

    local tfServiceAccount =
      serviceAccount.new(name="tf-job-operator").
        withLabelsMixin({
        app: "tf-job-operator",
      }).
        withNamespace(params.namespace),
    tfServiceAccount:: tfServiceAccount,

    local tfOperatorRole =
      operatorRole.new() +
      operatorRole.mixin.metadata.
        withLabelsMixin({
        app: "tf-job-operator",
      },).
        withName("tf-job-operator") +
      operatorRole.withRulesMixin([
        rules.tfJobsRule,
        rules.tfCrdRule,
        rules.tfStorageRule,
        rules.tfBatchRule,
        rules.tfCoreRule,
        rules.tfAppsRule,
      ],) +
      if params.deploymentScope == "namespace" then
        operatorRole.mixin.metadata.withNamespace(params.deploymentNamespace),
    tfOperatorRole:: tfOperatorRole,

    local tfOperatorRoleBinding =
      operatorRoleBinding.new() + operatorRoleBinding.
        withSubjectsMixin({
        kind: tfServiceAccount.kind,
        name: tfServiceAccount.name,
        namespace: tfServiceAccount.namespace,
      }).mixin.metadata.
        withLabels({ app: "tf-job-operator" }).
        withName("tf-job-operator") +
      operatorRoleBinding.mixin.roleRef.
        withName(tfOperatorRole.metadata.name).
        withApiGroup("rbac.authorization.k8s.io").
        withKind(tfOperatorRole.kind) +
      if params.deploymentScope == "namespace" then
        operatorRoleBinding.mixin.metadata.withNamespace(params.deploymentNamespace),
    tfOperatorRoleBinding:: tfOperatorRoleBinding,

    local tfUiService = service.new(
      name="tf-job-dashboard",
      selector={
        name: "tf-job-dashboard",
      },
      ports={
        port: 80,
        targetPort: 8080,
      },
    ) + service.mixin.metadata.
      withNamespace(params.namespace).
      withAnnotations({
      "getambassador.io/config":
        std.join("\n", [
          "---",
          "apiVersion: ambassador/v0",
          "kind:  Mapping",
          "name: tfjobs-ui-mapping",
          "prefix: /tfjobs/",
          "rewrite: /tfjobs/",
          "service: tf-job-dashboard." + params.namespace,
        ]),
    },) + service.mixin.spec.
      withType(params.tfJobUiServiceType),
    tfUiService:: tfUiService,

    local tfUiServiceAccount = serviceAccount.new(
      name="tf-job-dashboard",
    ).withLabelsMixin({
      app: "tf-job-dashboard",
    }).withNamespace(params.namespace),
    tfUiServiceAccount:: tfUiServiceAccount,


    local tfUiContainer = container.new(
      name="tf-job-operator",
      image=params.tfJobImage,
    ).
      withCommand("/opt/tensorflow_k8s/dashboard/backend").
      withEnvMixin({
      name: "KUBEFLOW_NAMESPACE",
      valueFrom: {
        fieldRef: {
          fieldPath: "metadata.namespace",
        },
      },
    },).
      withPorts({
      containerPort: 8080,
    },),

    local tfUiDeployment =
      deployment.new(
        name="tf-job-dashboard",
        replicas=1,
        containers=tfUiContainer,
        podLabels={
          name: "tf-job-dashboard",
        },
      ) + deployment.mixin.spec.template.metadata.
        withNamespace(params.namespace).
        withLabelsMixin({
        name: "tf-job-dashboard",
      }) + deployment.mixin.spec.template.spec.
        withServiceAccountName("tf-job-dashboard"),
    tfUiDeployment:: tfUiDeployment,

    local tfUiRole =
      role.new() +
      role.mixin.metadata.
        withLabelsMixin({
        app: "tf-job-dashboard",
      },).
        withName("tf-job-dashboard") +
      role.withRulesMixin([
        rules.tfJobsRule,
        rules.tfCrdRule,
        rules.tfStorageRule,
        rules.tfBatchRule,
        rules.tfCoreRule.withResourcesMixin([
          "pods/log",
          "namespaces",
        ]),
        rules.tfAppsRule,
      ],),
    tfUiRole:: tfUiRole,

    local tfUiRoleBinding =
      roleBinding.new() + roleBinding.
        withSubjectsMixin({
        kind: tfServiceAccount.kind,
        name: tfServiceAccount.name,
        namespace: tfServiceAccount.namespace,
      }).mixin.metadata.
        withLabels({ app: "tf-job-operator" }).
        withName("tf-job-operator") +
      roleBinding.mixin.roleRef.
        withName(tfUiRole.metadata.name).
        withApiGroup("rbac.authorization.k8s.io").
        withKind(tfUiRole.kind),
    tfUiRoleBinding:: tfUiRoleBinding,

    all:: if params.tfJobVersion == "v1alpha1" then [
      self.tfJobCrd,
      self.tfJobDeploy,
    ] else [
      self.tfJobCrd + crd.mixin.spec.
        withVersion("v1alpha2").validation.
        withOpenApiV3SchemaMixin(openApiV3Schema),
      self.tfJobDeploy + deployment.mixin.metadata.
        withName("tf-job-operator-v1alpha2") +
      deployment.mapContainers(
        function(c) {
          result:: c.withEnvMixin([
            if params.deploymentScope == "namespace" then {
              name: "KUBEFLOW_NAMESPACE",
              valueFrom: {
                fieldRef: {
                  fieldPath: "metadata.namespace",
                },
              },
            },
          ],).
            withCommand("/opt/kubeflow/tf-operator.v2").
            withArgs([
            "--alsologtostderr",
            "-v=1",
            if params.deploymentScope == "namespace" then (
              "--namespace=" + params.deploymentNamespace
            ),
          ],),
        }.result,
      ),
    ] + [
      self.tfConfigMap,
      self.tfServiceAccount,
      self.tfOperatorRole,
      self.tfOperatorRoleBinding,
      self.tfUiService,
      self.tfUiServiceAccount,
      self.tfUiDeployment,
      self.tfUiRole,
      self.tfUiRoleBinding,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

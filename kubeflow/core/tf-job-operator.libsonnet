{
  local k = import "k.libsonnet",
  local util = import "kubeflow/core/util.libsonnet",
  local deployment = k.apps.v1beta1.deployment,
  local container = deployment.mixin.spec.template.spec.containersType,
  local configMap = k.core.v1.configMap,
  local crd = k.apiextensions.v1beta1.customResourceDefinition,
  local service = k.core.v1.service,
  local serviceAccount = k.core.v1.serviceAccount,
  new(_env, _params):: {
    local params = _env + _params {
      namespace: if std.objectHas(_params, "namespace") && _params.namespace != "null" then
        _params.namespace else _env.namespace,
    },

    local operatorRole = if params.deploymentScope == "cluster" then
      k.rbac.v1beta1.clusterRole
    else
      k.rbac.v1beta1.role,
    local operatorRoleBinding = if params.deploymentScope == "cluster" then
      k.rbac.v1beta1.clusterRoleBinding
    else
      k.rbac.v1beta1.roleBinding,

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

    local tfServiceAccount =
      serviceAccount.new(name="tf-job-operator").
        withLabelsMixin({
        app: "tf-job-operator",
      }).
        withNamespace(params.namespace),

    local tfOperatorRole =
      operatorRole.new() +
      operatorRole.mixin.metadata.
        withLabelsMixin({
        app: "tf-job-operator",
      },).
        withName("tf-job-operator") + operatorRole.withRulesMixin([
        {
          apiGroups: [
            "tensorflow.org",
            "kubeflow.org",
          ],
          resources: [
            "tfjobs",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "apiextensions.k8s.io",
          ],
          resources: [
            "customresourcedefinitions",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "storage.k8s.io",
          ],
          resources: [
            "storageclasses",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "batch",
          ],
          resources: [
            "jobs",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "configmaps",
            "pods",
            "services",
            "endpoints",
            "persistentvolumeclaims",
            "events",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "apps",
            "extensions",
          ],
          resources: [
            "deployments",
          ],
          verbs: [
            "*",
          ],
        },
      ]) +
      if params.deploymentScope == "namespace" then
        operatorRole.mixin.metadata.withNamespace(params.deploymentNamespace),

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
        withApiGroup("rbac.authorization.k8s.io").
        withKind(tfOperatorRole.kind) +
      if params.deploymentScope == "namespace" then
        operatorRoleBinding.mixin.metadata.withNamespace(params.deploymentNamespace),

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

    local tfUiServiceAccount = serviceAccount.new(
      name="tf-job-dashboard",
    ).withLabelsMixin({
      app: "tf-job-dashboard",
    }).withNamespace(params.namespace),


    /*
        local tfUiDeployment = deployment.new
        ui(image):: {
          apiVersion: "extensions/v1beta1",
          kind: "Deployment",
          metadata: {
            name: "tf-job-dashboard",
            namespace: namespace,
          },
          spec: {
            template: {
              metadata: {
                labels: {
                  name: "tf-job-dashboard",
                },
              },
              spec: {
                containers: [
                  {
                    command: [
                      "/opt/tensorflow_k8s/dashboard/backend",
                    ],
                    env: [
                      {
                        name: "KUBEFLOW_NAMESPACE",
                        valueFrom: {
                          fieldRef: {
                            fieldPath: "metadata.namespace",
                          },
                        },
                      },
                    ],
                    image: image,
                    name: "tf-job-dashboard",
                    ports: [
                      {
                        containerPort: 8080,
                      },
                    ],
                  },
                ],
                serviceAccountName: "tf-job-dashboard",
              },
            },
          },
        },  // ui
    */


    all:: if params.tfJobVersion == "v1alpha1" then [
      tfJobCrd,
      tfJobDeploy,
    ] else [
      tfJobCrd + crd.mixin.spec.
        withVersion("v1alpha2").validation.
        withOpenApiV3SchemaMixin(openApiV3Schema),
      tfJobDeploy + deployment.mixin.metadata.
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
      tfConfigMap,
      tfServiceAccount,
      tfOperatorRole,
      tfOperatorRoleBinding,
      tfUiService,
      tfUiServiceAccount,
    ],

    list(obj=self.all):: util.list(obj),
  },
}


/*
{
  all(params):: [

                  $.parts(params.namespace).configMap(params.tfDefaultImage),
                  $.parts(params.namespace).serviceAccount,
                  $.parts(params.namespace).operatorRole(params.deploymentScope, params.deploymentNamespace),
                  $.parts(params.namespace).operatorRoleBinding(params.deploymentScope, params.deploymentNamespace),
                  $.parts(params.namespace).uiRole,
                  $.parts(params.namespace).uiRoleBinding,
                  $.parts(params.namespace).uiService(params.tfJobUiServiceType),
                  $.parts(params.namespace).uiServiceAccount,
                  $.parts(params.namespace).ui(params.tfJobImage),
                ] +

                if params.tfJobVersion == "v1alpha2" then
                  [
                    $.parts(params.namespace).crdv1alpha2,
                    $.parts(params.namespace).tfJobDeployV1Alpha2(params.tfJobImage, params.deploymentScope, params.deploymentNamespace),
                  ]
                else
                  [
                    $.parts(params.namespace).crd,
                    $.parts(params.namespace).tfJobDeploy(params.tfJobImage),
                  ],

  parts(namespace):: {



    uiRole:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "tf-job-dashboard",
        },
        name: "tf-job-dashboard",
      },
      rules: [
        {
          apiGroups: [
            "tensorflow.org",
            "kubeflow.org",
          ],
          resources: [
            "tfjobs",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "apiextensions.k8s.io",
          ],
          resources: [
            "customresourcedefinitions",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "storage.k8s.io",
          ],
          resources: [
            "storageclasses",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "batch",
          ],
          resources: [
            "jobs",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "configmaps",
            "pods",
            "pods/log",
            "services",
            "endpoints",
            "persistentvolumeclaims",
            "events",
            "namespaces",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "apps",
            "extensions",
          ],
          resources: [
            "deployments",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },  // uiRole

    uiRoleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "tf-job-dashboard",
        },
        name: "tf-job-dashboard",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "tf-job-dashboard",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "tf-job-dashboard",
          namespace: namespace,
        },
      ],
    },  // uiRoleBinding
  },
}
*/




{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  local deployment = k.apps.v1beta1.deployment,

  new(_env, _params):: {
    local params = _params + _env,

    // tfJobCrd schema
    local openAPIV3Schema = {
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

    local tfJobCrd = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "tfjobs.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        scope: "Namespaced",
        version: "v1beta1",
        names: {
          kind: "TFJob",
          singular: "tfjob",
          plural: "tfjobs",
        },
        subresources: {
          status: {},
        },
        additionalPrinterColumns: [
          {
            JSONPath: ".status.conditions[-1:].type",
            name: "State",
            type: "string",
          },
          {
            JSONPath: ".metadata.creationTimestamp",
            name: "Age",
            type: "date",
          },
        ],
        validation: { openAPIV3Schema: openAPIV3Schema },
        versions: [
          {
            name: "v1beta1",
            served: true,
            storage: true,
          },
          {
            name: "v1beta2",
            served: true,
            storage: false,
          },
        ],
      },
    },
    tfJobCrd:: tfJobCrd,

    local tfJobContainer = {
      command: [
        "/opt/kubeflow/tf-operator.v1beta2",
        "--alsologtostderr",
        "-v=1",
      ] + if params.deploymentScope == "namespace" &&
             params.deploymentNamespace != null then [
        "--namespace=" + params.deploymentNamespace,
      ] else [],
      env:
        if params.deploymentScope == "namespace" && params.deploymentNamespace != null then [{
          name: "KUBEFLOW_NAMESPACE",
          valueFrom: {
            fieldRef: {
              fieldPath: "metadata.namespace",
            },
          },
        }] else [
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

      image: params.tfJobImage,
      name: "tf-job-operator",
      volumeMounts: [
        {
          mountPath: "/etc/config",
          name: "config-volume",
        },
      ],
    },
    tfJobContainer:: tfJobContainer,

    local tfJobDeployment = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "tf-job-operator",
        namespace: params.namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              name: "tf-job-operator",
            },
          },
          spec: {
            containers: [
              tfJobContainer,
            ],
            serviceAccountName: "tf-job-operator",
            volumes: [
              {
                configMap: {
                  name: "tf-job-operator-config",
                },
                name: "config-volume",
              },
            ],
          },
        },
      },
    },
    tfJobDeployment:: tfJobDeployment,

    local tfConfigMap = {
      apiVersion: "v1",
      data: {
        "controller_config_file.yaml": std.manifestJson({
          grpcServerFilePath: "/opt/mlkube/grpc_tensorflow_server/grpc_tensorflow_server.py",
        } + if params.tfDefaultImage != "" &&
               params.tfDefaultImage != "null" then {
          tfImage: params.tfDefaultImage,
        } else {},),
      },
      kind: "ConfigMap",
      metadata: {
        name: "tf-job-operator-config",
        namespace: params.namespace,
      },
    },
    tfConfigMap:: tfConfigMap,

    local tfServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "tf-job-operator",
        },
        name: "tf-job-operator",
        namespace: params.namespace,
      },
    },
    tfServiceAccount:: tfServiceAccount,

    // set the right roleTypes
    local roleType(deploymentScope) = {
      return:: if deploymentScope == "namespace" && params.deploymentNamespace != null then [
        k.rbac.v1beta1.role,
        k.rbac.v1beta1.roleBinding,
      ] else [
        k.rbac.v1beta1.clusterRole,
        k.rbac.v1beta1.clusterRoleBinding,
      ],
    }.return,
    local roles = roleType(params.deploymentScope),
    local operatorRole = roles[0],
    local operatorRoleBinding = roles[1],

    // consolidated rules shared between tfOperatorRole and tfUiRole
    local rule = k.rbac.v1beta1.role.rulesType,
    local rules = {
      tfJobsRule:: rule.new() + rule.
        withApiGroupsMixin([
        "tensorflow.org",
        "kubeflow.org",
      ],).
        withResourcesMixin([
        "tfjobs",
        "tfjobs/status",
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
    local role(inst) = {
      local ns =
        inst + if params.deploymentScope == "namespace" && params.deploymentNamespace != null then
          operatorRole.mixin.metadata.withNamespace(params.deploymentNamespace)
        else
          {},
      return:: ns,
    }.return,
    local tfOperatorRole = role(
      {
        apiVersion: "rbac.authorization.k8s.io/v1beta1",
        kind: operatorRole.new().kind,
        metadata: {
          labels: {
            app: "tf-job-operator",
          },
          name: "tf-job-operator",
        },
      } + k.rbac.v1beta1.role.withRulesMixin([
        rules.tfJobsRule,
        rules.tfCrdRule,
        rules.tfStorageRule,
        rules.tfBatchRule,
        rules.tfCoreRule,
        rules.tfAppsRule,
      ],),
    ),
    tfOperatorRole:: tfOperatorRole,

    local tfOperatorRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: operatorRoleBinding.new().kind,
      metadata: {
        labels: {
          app: "tf-job-operator",
        },
        name: "tf-job-operator",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: tfOperatorRole.kind,
        name: "tf-job-operator",
      },
      subjects: [
        {
          kind: tfServiceAccount.kind,
          name: tfServiceAccount.metadata.name,
          namespace: params.namespace,
        },
      ],
    } + if params.deploymentScope == "namespace" && params.deploymentNamespace != null then
      operatorRoleBinding.mixin.metadata.withNamespace(params.deploymentNamespace)
    else
      {},
    tfOperatorRoleBinding:: tfOperatorRoleBinding,

    local tfUiService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "tf-job-dashboard",
        namespace: params.namespace,
        annotations: {
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
        },  //annotations
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 8080,
          },
        ],
        selector: {
          name: "tf-job-dashboard",
        },
        type: params.tfJobUiServiceType,
      },
    },
    tfUiService:: tfUiService,

    local tfUiServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "tf-job-dashboard",
        },
        name: "tf-job-dashboard",
        namespace: params.namespace,
      },
    },
    tfUiServiceAccount:: tfUiServiceAccount,

    local tfUiContainer = {
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
      image: params.tfJobImage,
      name: "tf-job-dashboard",
      ports: [
        {
          containerPort: 8080,
        },
      ],
    },

    local tfUiDeployment = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "tf-job-dashboard",
        namespace: params.namespace,
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
              tfUiContainer,
            ],
            serviceAccountName: "tf-job-dashboard",
          },
        },
      },
    },
    tfUiDeployment:: tfUiDeployment,

    local tfUiRole = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: operatorRole.new().kind,
      metadata: {
        labels: {
          app: "tf-job-dashboard",
        },
        name: "tf-job-dashboard",
      },
    } + k.rbac.v1beta1.role.withRulesMixin([
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

    local tfUiRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: operatorRoleBinding.new().kind,
      metadata: {
        labels: {
          app: "tf-job-dashboard",
        },
        name: "tf-job-dashboard",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: tfUiRole.kind,
        name: tfUiRole.metadata.name,
      },
      subjects: [
        {
          kind: tfUiServiceAccount.kind,
          name: tfUiServiceAccount.metadata.name,
          namespace: tfUiServiceAccount.metadata.namespace,
        },
      ],
    },
    tfUiRoleBinding:: tfUiRoleBinding,

    parts:: self,
    all:: [
      self.tfJobCrd,
      self.tfJobDeployment,
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

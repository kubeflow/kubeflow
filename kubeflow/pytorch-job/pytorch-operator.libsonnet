{
  all(params, env):: [
    $.parts(params, env).crd,
    $.parts(params, env).serviceAccount,
    $.parts(params, env).operatorRole(params.deploymentScope, params.deploymentNamespace, params.enableGangScheduling),
    $.parts(params, env).operatorRoleBinding(params.deploymentScope, params.deploymentNamespace),
    $.parts(params, env).pytorchJobDeploy(params.pytorchJobImage,
                                          params.deploymentScope,
                                          params.deploymentNamespace,
                                          params.enableGangScheduling,
                                          params.monitoringPort),
    $.parts(params, env).pytorchJobService(params.monitoringPort),
  ],

  parts(params, env):: {
    local namespace = env.namespace,

    crd: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "pytorchjobs.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        scope: "Namespaced",
        version: "v1",
        names: {
          kind: "PyTorchJob",
          singular: "pytorchjob",
          plural: "pytorchjobs",
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
        versions: [
          {
            name: "v1",
            served: true,
            storage: true,
          },
          {
            name: "v1beta2",
            served: true,
            storage: false,
          },
        ],
        validation: {
          openAPIV3Schema: {
            properties: {
              spec: {
                properties: {
                  pytorchReplicaSpecs: {
                    properties: {
                      Worker: {
                        properties: {
                          replicas: {
                            type: "integer",
                            minimum: 1,
                          },
                        },
                      },
                      Master: {
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
        },
      },
    },

    pytorchJobDeploy(image, deploymentScope, deploymentNamespace, enableGangScheduling, monitoringPort): {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "pytorch-operator",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              name: "pytorch-operator",
            },
          },
          spec: {
            containers: [
              {
                command: std.prune([
                  "/pytorch-operator.v1",
                  "--alsologtostderr",
                  "-v=1",
                  if deploymentScope == "namespace" then ("--namespace=" + deploymentNamespace),
                  if enableGangScheduling == "true" then (
                    "--enable-gang-scheduling"
                  ),
                  if monitoringPort != null then (
                    "--monitoring-port=" + monitoringPort
                  ),
                ]),
                env: std.prune([
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
                  if deploymentScope == "namespace" then {
                    name: "KUBEFLOW_NAMESPACE",
                    valueFrom: {
                      fieldRef: {
                        fieldPath: "metadata.namespace",
                      },
                    },
                  },
                ]),
                image: image,
                name: "pytorch-operator",
              },
            ],
            serviceAccountName: "pytorch-operator",
          },
        },
      },
    },  // pytorchJobDeploy

    pytorchJobService(monitoringPort): {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        annotations: {
          "prometheus.io/scrape": "true",
          "prometheus.io/path": "/metrics",
          "prometheus.io/port": monitoringPort,
        },
        labels: {
          app: "pytorch-operator",
        },
        name: "pytorch-operator",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "monitoring-port",
            port: std.parseInt(monitoringPort),
            targetPort: std.parseInt(monitoringPort),
          },
        ],
        selector: {
          name: "pytorch-operator",
        },
        type: "ClusterIP",
      },
    },

    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "pytorch-operator",
        },
        name: "pytorch-operator",
        namespace: namespace,
      },
    },

    operatorRole(deploymentScope, deploymentNamespace, enableGangScheduling): {
      local roleType = if deploymentScope == "cluster" then "ClusterRole" else "Role",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: roleType,
      metadata: {
        labels: {
          app: "pytorch-operator",
        },
        name: "pytorch-operator",
        [if deploymentScope == "namespace" then "namespace"]: deploymentNamespace,
      },
      rules: [
               {
                 apiGroups: [
                   "kubeflow.org",
                 ],
                 resources: [
                   "pytorchjobs",
                   "pytorchjobs/status",
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
                   "pods",
                   "services",
                   "endpoints",
                   "events",
                 ],
                 verbs: [
                   "*",
                 ],
               },
             ]
             + if enableGangScheduling == "true" then (
               [{
                 apiGroups: [
                   "scheduling.incubator.k8s.io",
                 ],
                 resources: [
                   "podgroups",
                 ],
                 verbs: [
                   "*",
                 ],
               }]
             ) else (
               []
             ),
    },  // operator-role

    operatorRoleBinding(deploymentScope, deploymentNamespace): {
      local bindingType = if deploymentScope == "cluster" then "ClusterRoleBinding" else "RoleBinding",
      local roleType = if deploymentScope == "cluster" then "ClusterRole" else "Role",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: bindingType,
      metadata: {
        labels: {
          app: "pytorch-operator",
        },
        name: "pytorch-operator",
        [if deploymentScope == "namespace" then "namespace"]: deploymentNamespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: roleType,
        name: "pytorch-operator",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "pytorch-operator",
          namespace: namespace,
        },
      ],
    },  // operator-role binding
  },
}

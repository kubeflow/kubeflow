{
  all(params, env):: [
                       $.parts(params, env).configMap(params.paddleDefaultImage),
                       $.parts(params, env).serviceAccount,
                       $.parts(params, env).operatorRole(params.deploymentScope, params.deploymentNamespace),
                       $.parts(params, env).operatorRoleBinding(params.deploymentScope, params.deploymentNamespace),
                     ] +

                     if params.paddleJobVersion == "Fluid" then
                       [
                         $.parts(params, env).crdFluid,
                         $.parts(params, env).paddleJobDeployFluid(params.paddleJobImage, params.deploymentScope, params.deploymentNamespace),
                       ]
                     else
                       [
                         $.parts(params, env).crdV2,
                         $.parts(params, env).paddleJobDeployV2(params.paddleJobImage, params.deploymentScope, params.deploymentNamespace),
                       ],

  parts(params, env):: {
    local namespace = env.namespace,

    crdV2: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "paddlejobs.paddlepaddle.org",
      },
      spec: {
        group: "paddlepaddle.org",
        scope: "Namespaced",
        version: "v1",
        names: {
          kind: "PaddleJob",
          singular: "paddlejob",
          plural: "paddlejobs",
        },
        validation: {
          openAPIV3Schema: {
            properties: {
              spec: {
                properties: {
                  paddleReplicaSpecs: {
                    properties: {
                      trainer: {
                        properties: {
                          replicas: {
                            type: "integer",
                            minimum: 1,
                          },
                        },
                      },
                      pserver: {
                        properties: {
                          replicas: {
                            type: "integer",
                            minimum: 1,
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

    crdFluid: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "paddlejobs.paddlepaddle.org",
      },
      spec: {
        group: "paddlepaddle.org",
        version: "v1",
        scope: "Namespaced",
        names: {
          kind: "PaddleJob",
          singular: "paddlejob",
          plural: "paddlejobs",
        },
        validation: {
          openAPIV3Schema: {
            properties: {
              spec: {
                properties: {
                  paddleReplicaSpecs: {
                    properties: {
                      trainer: {
                        properties: {
                          replicas: {
                            type: "integer",
                            minimum: 1,
                          },
                        },
                      },
                      pserver: {
                        properties: {
                          replicas: {
                            type: "integer",
                            minimum: 1,
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

    paddleJobDeployV2(image, deploymentScope, deploymentNamespace): {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "paddle-operator",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              name: "paddle-operator",
            },
          },
          spec: {
            containers: [
              {
                command: std.prune([
                  "paddlejob",
                  "--alsologtostderr",
                  if deploymentScope == "namespace" then ("--namespace=" + deploymentNamespace),
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
                name: "paddle-operator",
                volumeMounts: [
                  {
                    mountPath: "/etc/config",
                    name: "config-volume",
                  },
                ],
              },
            ],
            serviceAccountName: "paddle-operator",
            volumes: [
              {
                configMap: {
                  name: "paddle-operator-config",
                },
                name: "config-volume",
              },
            ],
          },
        },
      },
    },  // paddleJobDeployV2

    paddleJobDeployFluid(image, deploymentScope, deploymentNamespace): {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "paddle-operator",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              name: "paddle-operator",
            },
          },
          spec: {
            containers: [
              {
                command: std.prune([
                  "paddlejob",
                  "--alsologtostderr",
                  if deploymentScope == "namespace" then ("--namespace=" + deploymentNamespace),
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
                name: "paddle-operator",
                volumeMounts: [
                  {
                    mountPath: "/etc/config",
                    name: "config-volume",
                  },
                ],
              },
            ],
            serviceAccountName: "paddle-operator",
            volumes: [
              {
                configMap: {
                  name: "paddle-operator-config",
                },
                name: "config-volume",
              },
            ],
          },
        },
      },
    },  // paddleJobDeployFluid

    // Default value for
    defaultControllerConfig(paddleDefaultImage):: if paddleDefaultImage != "" && paddleDefaultImage != "null" then
      {
        paddleImage: paddleDefaultImage,
      }
    else
      {},

    configMap(paddleDefaultImage): {
      apiVersion: "v1",
      data: {
        "controller_config_file.yaml": std.manifestJson($.parts(params, env).defaultControllerConfig(paddleDefaultImage)),
      },
      kind: "ConfigMap",
      metadata: {
        name: "paddle-operator-config",
        namespace: namespace,
      },
    },

    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "paddle-operator",
        },
        name: "paddle-operator",
        namespace: namespace,
      },
    },

    operatorRole(deploymentScope, deploymentNamespace): {
      local roleType = if deploymentScope == "cluster" then "ClusterRole" else "Role",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: roleType,
      metadata: {
        labels: {
          app: "paddle-operator",
        },
        name: "paddle-operator",
        [if deploymentScope == "namespace" then "namespace"]: deploymentNamespace,
      },
      rules: [
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "paddlejobs",
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
      ],
    },  // operator-role

    operatorRoleBinding(deploymentScope, deploymentNamespace): {
      local bindingType = if deploymentScope == "cluster" then "ClusterRoleBinding" else "RoleBinding",
      local roleType = if deploymentScope == "cluster" then "ClusterRole" else "Role",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: bindingType,
      metadata: {
        labels: {
          app: "paddle-operator",
        },
        name: "paddle-operator",
        [if deploymentScope == "namespace" then "namespace"]: deploymentNamespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: roleType,
        name: "paddle-operator",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "paddle-operator",
          namespace: namespace,
        },
      ],
    },  // operator-role binding
  },
}

{
  all(params, env):: [
                       $.parts(params, env).configMap(params.pytorchDefaultImage),
                       $.parts(params, env).serviceAccount,
                       $.parts(params, env).operatorRole(params.deploymentScope, params.deploymentNamespace),
                       $.parts(params, env).operatorRoleBinding(params.deploymentScope, params.deploymentNamespace),
                     ] +

                     if params.pytorchJobVersion == "v1beta2" then
                       [
                         $.parts(params, env).crdV1beta2,
                         $.parts(params, env).pytorchJobDeployV1beta2(params.pytorchJobImage, params.deploymentScope, params.deploymentNamespace),
                       ]
                     else
                       [
                         $.parts(params, env).crdV1beta1,
                         $.parts(params, env).pytorchJobDeployV1beta1(params.pytorchJobImage, params.deploymentScope, params.deploymentNamespace),
                       ],

  parts(params, env):: {
    local namespace = env.namespace,

    crdV1beta2: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "pytorchjobs.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        scope: "Namespaced",
        version: "v1beta2",
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

    crdV1beta1: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "pytorchjobs.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1beta1",
        scope: "Namespaced",
        names: {
          kind: "PyTorchJob",
          singular: "pytorchjob",
          plural: "pytorchjobs",
        },
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

    pytorchJobDeployV1beta2(image, deploymentScope, deploymentNamespace): {
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
                  "/pytorch-operator.v1beta2",
                  "--alsologtostderr",
                  "-v=1",
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
                name: "pytorch-operator",
                volumeMounts: [
                  {
                    mountPath: "/etc/config",
                    name: "config-volume",
                  },
                ],
              },
            ],
            serviceAccountName: "pytorch-operator",
            volumes: [
              {
                configMap: {
                  name: "pytorch-operator-config",
                },
                name: "config-volume",
              },
            ],
          },
        },
      },
    },  // pytorchJobDeployV1beta2

    pytorchJobDeployV1beta1(image, deploymentScope, deploymentNamespace): {
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
                  "/pytorch-operator.v1beta1",
                  "--alsologtostderr",
                  "-v=1",
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
                name: "pytorch-operator",
                volumeMounts: [
                  {
                    mountPath: "/etc/config",
                    name: "config-volume",
                  },
                ],
              },
            ],
            serviceAccountName: "pytorch-operator",
            volumes: [
              {
                configMap: {
                  name: "pytorch-operator-config",
                },
                name: "config-volume",
              },
            ],
          },
        },
      },
    },  // pytorchJobDeployV1beta1

    // Default value for
    defaultControllerConfig(pytorchDefaultImage):: if pytorchDefaultImage != "" && pytorchDefaultImage != "null" then
      {
        pytorchImage: pytorchDefaultImage,
      }
    else
      {},

    configMap(pytorchDefaultImage): {
      apiVersion: "v1",
      data: {
        "controller_config_file.yaml": std.manifestJson($.parts(params, env).defaultControllerConfig(pytorchDefaultImage)),
      },
      kind: "ConfigMap",
      metadata: {
        name: "pytorch-operator-config",
        namespace: namespace,
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

    operatorRole(deploymentScope, deploymentNamespace): {
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

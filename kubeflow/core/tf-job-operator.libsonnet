{
  all(params):: [

                  $.parts(params.namespace).configMap(params.cloud, params.tfDefaultImage),
                  $.parts(params.namespace).serviceAccount,
                  $.parts(params.namespace).operatorRole,
                  $.parts(params.namespace).operatorRoleBinding,
                  $.parts(params.namespace).uiRole,
                  $.parts(params.namespace).uiRoleBinding,
                  $.parts(params.namespace).uiService(params.tfJobUiServiceType),
                  $.parts(params.namespace).uiServiceAccount,
                  $.parts(params.namespace).ui(params.tfJobImage),
                ] +

                if params.tfJobVersion == "v1alpha2" then
                  [
                    $.parts(params.namespace).crdv1alpha2,
                    $.parts(params.namespace).tfJobDeployV1Alpha2(params.tfJobImage),
                  ]
                else
                  [
                    $.parts(params.namespace).crd,
                    $.parts(params.namespace).tfJobDeploy(params.tfJobImage),
                  ],

  parts(namespace):: {
    crd: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "tfjobs.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        names: {
          kind: "TFJob",
          singular: "tfjob",
          plural: "tfjobs",
        },
      },
    },

    crdv1alpha2: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "tfjobs.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha2",
        names: {
          kind: "TFJob",
          singular: "tfjob",
          plural: "tfjobs",
        },
        validation: {
          openAPIV3Schema: {
            properties: {
              spec: {
                properties: {
                  tfReplicaSpecs: {
                    properties: {
                      // The validation works when the configuration contains
                      // `Worker`, `PS` or `Chief`. Otherise it will not be validated.
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
        },
      },
    },

    tfJobDeploy(image): {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "tf-job-operator",
        namespace: namespace,
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
              {
                command: [
                  "/opt/mlkube/tf-operator",
                  "--controller-config-file=/etc/config/controller_config_file.yaml",
                  "--alsologtostderr",
                  "-v=1",
                ],
                env: [
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
                image: image,
                name: "tf-job-operator",
                volumeMounts: [
                  {
                    mountPath: "/etc/config",
                    name: "config-volume",
                  },
                ],
              },
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
    },  // tfJobDeploy

    tfJobDeployV1Alpha2(image): {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "tf-job-operator-v1alpha2",
        namespace: namespace,
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
              {
                command: [
                  "/opt/kubeflow/tf-operator.v2",
                  "--alsologtostderr",
                  "-v=1",
                ],
                env: [
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
                image: image,
                name: "tf-job-operator",
                volumeMounts: [
                  {
                    mountPath: "/etc/config",
                    name: "config-volume",
                  },
                ],
              },
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
    },  // tfJobDeploy

    // Default value for
    defaultControllerConfig(tfDefaultImage):: {
                                                grpcServerFilePath: "/opt/mlkube/grpc_tensorflow_server/grpc_tensorflow_server.py",
                                              }
                                              + if tfDefaultImage != "" && tfDefaultImage != "null" then
                                                {
                                                  tfImage: tfDefaultImage,
                                                }
                                              else
                                                {},

    aksAccelerators:: {
      accelerators: {
        "alpha.kubernetes.io/nvidia-gpu": {
          volumes: [
            {
              name: "nvidia",
              mountPath: "/usr/local/nvidia",
              hostPath: "/usr/local/nvidia",
            },
          ],
        },
      },
    },

    acsEngineAccelerators:: {
      accelerators: {
        "alpha.kubernetes.io/nvidia-gpu": {
          volumes: [
            {
              name: "nvidia",
              mountPath: "/usr/local/nvidia",
              hostPath: "/usr/local/nvidia",
            },
          ],
        },
      },
    },

    configData(cloud, tfDefaultImage):: self.defaultControllerConfig(tfDefaultImage) +
                                        if cloud == "aks" then
                                          self.aksAccelerators
                                        else if cloud == "acsengine" then
                                          self.acsEngineAccelerators
                                        else
                                          {},

    configMap(cloud, tfDefaultImage): {
      apiVersion: "v1",
      data: {
        "controller_config_file.yaml": std.manifestJson($.parts(namespace).configData(cloud, tfDefaultImage)),
      },
      kind: "ConfigMap",
      metadata: {
        name: "tf-job-operator-config",
        namespace: namespace,
      },
    },

    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "tf-job-operator",
        },
        name: "tf-job-operator",
        namespace: namespace,
      },
    },

    operatorRole: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "tf-job-operator",
        },
        name: "tf-job-operator",
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

    operatorRoleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "tf-job-operator",
        },
        name: "tf-job-operator",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "tf-job-operator",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "tf-job-operator",
          namespace: namespace,
        },
      ],
    },  // operator-role binding

    uiService(serviceType):: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "tf-job-dashboard",
        namespace: namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: tfjobs-ui-mapping",
              "prefix: /tfjobs/",
              "rewrite: /tfjobs/",
              "service: tf-job-dashboard." + namespace,
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
        type: serviceType,
      },
    },  // uiService

    uiServiceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "tf-job-dashboard",
        },
        name: "tf-job-dashboard",
        namespace: namespace,
      },
    },  // uiServiceAccount

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

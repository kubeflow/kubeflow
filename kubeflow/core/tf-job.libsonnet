{
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.
  parts(namespace):: {
    all(params):: [
      $.parts(params.namespace).tfJobDeploy(params.tfJobImage),
      $.parts(params.namespace).configMap(params.cloud, params.tfDefaultImage),
      $.parts(params.namespace).serviceAccount,
      $.parts(params.namespace).operatorRole,
      $.parts(params.namespace).operatorRoleBinding,
      $.parts(params.namespace).crd,
    ],
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
                  "/opt/mlkube/tf_operator",
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

    azureAccelerators:: {
      accelerators: {
        "alpha.kubernetes.io/nvidia-gpu": {
          volumes: [
            {
              name: "lib",
              mountPath: "/usr/local/nvidia/lib64",
              hostPath: "/usr/lib/nvidia-384",
            },
            {
              name: "bin",
              mountPath: "/usr/local/nvidia/bin",
              hostPath: "/usr/lib/nvidia-384/bin",
            },
            {
              name: "libcuda",
              mountPath: "/usr/lib/x86_64-linux-gnu/libcuda.so.1",
              hostPath: "/usr/lib/x86_64-linux-gnu/libcuda.so.1",
            },
          ],
        },
      },
    },

    configData(cloud, tfDefaultImage):: self.defaultControllerConfig(tfDefaultImage) +
                                        if cloud == "azure" then
                                          self.azureAccelerators
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
              "prefix: /tfjobs/ui/",
              "rewrite: /",
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

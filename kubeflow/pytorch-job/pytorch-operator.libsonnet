{
  all(params, env):: [
    $.parts(params, env).pytorchJobDeploy(params.pytorchJobImage),
    $.parts(params, env).configMap(params.cloud, params.pytorchDefaultImage),
    $.parts(params, env).serviceAccount,
    $.parts(params, env).operatorRole,
    $.parts(params, env).operatorRoleBinding,
    $.parts(params, env).crd,
  ],

  parts(params, env):: {
    local namespace = if params.namespace != "null" then params.namespace else env.namespace,
    crd: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "pytorchjobs.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        names: {
          kind: "PyTorchJob",
          singular: "pytorchjob",
          plural: "pytorchjobs",
        },
      },
    },

    pytorchJobDeploy(image): {
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
                command: [
                  "/pytorch-operator",
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
    },  // pytorchJobDeploy

    // Default value for
    defaultControllerConfig(pytorchDefaultImage):: if pytorchDefaultImage != "" && pytorchDefaultImage != "null" then
      {
        pytorchImage: pytorchDefaultImage,
      }
    else
      {},

    aksAccelerators:: {
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

    configData(cloud, pytorchDefaultImage):: self.defaultControllerConfig(pytorchDefaultImage) +
                                             if cloud == "aks" then
                                               self.aksAccelerators
                                             else if cloud == "acsengine" then
                                               self.acsEngineAccelerators
                                             else
                                               {},

    configMap(cloud, pytorchDefaultImage): {
      apiVersion: "v1",
      data: {
        "controller_config_file.yaml": std.manifestJson($.parts(params, env).configData(cloud, pytorchDefaultImage)),
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

    operatorRole: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "pytorch-operator",
        },
        name: "pytorch-operator",
      },
      rules: [
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "pytorchjobs",
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
          app: "pytorch-operator",
        },
        name: "pytorch-operator",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
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

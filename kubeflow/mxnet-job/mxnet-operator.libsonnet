{
  all(params, env):: [
    $.parts(params, env).mxnetJobDeploy(params.mxnetJobImage),
    $.parts(params, env).configMap(params.mxnetDefaultImage),
    $.parts(params, env).serviceAccount,
    $.parts(params, env).operatorRole,
    $.parts(params, env).operatorRoleBinding,
    $.parts(params, env).crd,
  ],

  parts(params, env):: {
    local namespace = env.namespace,
    crd: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "mxjobs.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        names: {
          kind: "MXJob",
          singular: "mxjob",
          plural: "mxjobs",
        },
      },
    },

    mxnetJobDeploy(image): {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "mxnet-operator",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              name: "mxnet-operator",
            },
          },
          spec: {
            containers: [
              {
                command: [
                  "/opt/mlkube/mxnet-operator",
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
                name: "mxnet-operator",
                imagePullPolicy: "Always",
                volumeMounts: [
                  {
                    mountPath: "/etc/config",
                    name: "config-volume",
                  },
                ],
              },
            ],
            serviceAccountName: "mxnet-operator",
            volumes: [
              {
                configMap: {
                  name: "mxnet-operator-config",
                },
                name: "config-volume",
              },
            ],
          },
        },
      },
    },  // mxnetJobDeploy

    // Default value for
    defaultControllerConfig(mxnetDefaultImage):: if mxnetDefaultImage != "" && mxnetDefaultImage != "null" then
      {
        mxnetImage: mxnetDefaultImage,
      }
    else
      {},

    configMap(mxnetDefaultImage): {
      apiVersion: "v1",
      data: {
        "controller_config_file.yaml": std.manifestJson($.parts(params, env).defaultControllerConfig(mxnetDefaultImage)),
      },
      kind: "ConfigMap",
      metadata: {
        name: "mxnet-operator-config",
        namespace: namespace,
      },
    },

    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "mxnet-operator",
        },
        name: "mxnet-operator",
        namespace: namespace,
      },
    },

    operatorRole: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "mxnet-operator",
        },
        name: "mxnet-operator",
      },
      rules: [
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "mxjobs",
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
          app: "mxnet-operator",
        },
        name: "mxnet-operator",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "mxnet-operator",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "mxnet-operator",
          namespace: namespace,
        },
      ],
    },  // operator-role binding
  },
}

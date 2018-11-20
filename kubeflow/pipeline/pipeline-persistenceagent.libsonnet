{
  all(namespace, persistenceAgentImage):: [
    $.parts(namespace).serviceAccount,
    $.parts(namespace).roleBinding,
    $.parts(namespace).role,
    $.parts(namespace).deploy(persistenceAgentImage),
  ],

  parts(namespace):: {
    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "ml-pipeline-persistenceagent",
        namespace: namespace,
      },
    },  // service account

    roleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "ml-pipeline-persistenceagent",
        },
        name: "ml-pipeline-persistenceagent",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        // TODO: These permissions are too broad. This must be fixed.
        name: "cluster-admin",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "ml-pipeline-persistenceagent",
          namespace: namespace,
        },
      ],
    },  // role binding

    role: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "ml-pipeline-persistenceagent",
        },
        name: "ml-pipeline-persistenceagent",
        namespace: namespace,
      },
      rules: [
        {
          apiGroups: [
            "argoproj.io",
          ],
          resources: [
            "workflows",
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "scheduledworkflows",
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
      ],
    },  // role

    deploy(image): {
      apiVersion: "apps/v1beta2",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "ml-pipeline-persistenceagent",
        },
        name: "ml-pipeline-persistenceagent",
        namespace: namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "ml-pipeline-persistenceagent",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "ml-pipeline-persistenceagent",
            },
          },
          spec: {
            containers: [
              {
                name: "ml-pipeline-persistenceagent",
                image: image,
                imagePullPolicy: "Always",
                env: [
                  {
                    name: "POD_NAMESPACE",
                    valueFrom: {
                      fieldRef: {
                        fieldPath: "metadata.namespace",
                      },
                    },
                  },
                ],
              },
            ],
            serviceAccountName: "ml-pipeline-persistenceagent",
          },
        },
      },
    },  // deploy
  },  // parts
}

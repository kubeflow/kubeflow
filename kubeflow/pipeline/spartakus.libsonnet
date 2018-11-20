{
  all(namespace, usageId):: [
    $.parts(namespace).serviceAccount,
    $.parts(namespace).clusterRole,
    $.parts(namespace).clusterRoleBinding,
    $.parts(namespace).deployVolunteer(usageId),
  ],

  parts(namespace):: {
    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "spartakus",
        namespace: namespace,
      },
    },  // service account
    clusterRole: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        name: "spartakus",
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "nodes",
          ],
          verbs: [
            "get",
            "list",
          ],
        },
      ],
    },  // clusterRole
    clusterRoleBinding: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "spartakus",
      },
      roleRef: {
        kind: "ClusterRole",
        name: "spartakus",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "spartakus",
          namespace: namespace,
        },
      ],
    },  // clusterRoleBinding
    deployVolunteer(usageId): {
      apiVersion: "apps/v1beta2",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "pipeline-spartakus-volunteer",
        },
        name: "pipeline-spartakus-volunteer",
        namespace: namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "pipeline-spartakus-volunteer",
          },
        },
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "pipeline-spartakus-volunteer",
            },
          },
          spec: {
            containers: [
              {
                name: "pipeline-spartakus-volunteer",
                image: "gcr.io/google_containers/spartakus-amd64:v1.0.0",
                imagePullPolicy: "IfNotPresent",
                args: [
                  "volunteer",
                  "--cluster-id=" + usageId,
                  "--database=https://ml-pipeline-reporting.appspot.com/",
                ],
              },
            ],
            serviceAccountName: "spartakus",
          },
        },
      },
    },  // deployVolunteer
  },  // parts
}

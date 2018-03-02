{
  local util = import "kubeflow/core/util.libsonnet",

  all(params):: {
    local reportUsageBool = util.toBool(params.reportUsage),
    result:: if reportUsageBool then
      [
        $.parts(params.namespace).role,
        $.parts(params.namespace).roleBinding,
        $.parts(params.namespace).serviceAccount,
        $.parts(params.namespace).deployment(params.usageId),
      ]
    else [],
  }.result,

  parts(namespace):: {

    // Spartakus needs to be able to get information about the cluster in order to create a report.
    role: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "spartakus",
        },
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
    },  // role

    roleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "spartakus",
        },
        name: "spartakus",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
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
    },  // operator-role binding


    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "spartakus",
        },
        name: "spartakus",
        namespace: namespace,
      },
    },

    deployment(usageId):: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "spartakus-volunteer",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "spartakus-volunteer",
            },
          },
          spec: {
            containers: [
              {
                image: "gcr.io/google_containers/spartakus-amd64:v1.0.0",
                name: "volunteer",
                args: [
                  "volunteer",
                  "--cluster-id=" + usageId,
                  "--database=https://stats-collector.kubeflow.org",
                ],
              },
            ],
            serviceAccountName: "spartakus",
          },  // spec
        },
      },
    },  // deployment
  },
}

// @apiVersion 0.1
// @name io.ksonnet.pkg.spartakus
// @description spartakus component for usage collection
// @shortDescription spartakus component for usage collection
// @param name string Name
// @optionalParam usageId string unknown_cluster Optional id to use when reporting usage to kubeflow.org
// @optionalParam reportUsage string false Whether or not to report Kubeflow usage to kubeflow.org.

local util = import "kubeflow/core/util.libsonnet";
local reportUsageBool = util.toBool(params.reportUsage);

if reportUsageBool then [
  // Spartakus needs to be able to get information about the cluster in order to create a report.
  {
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

  {
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
        namespace: env.namespace,
      },
    ],
  },  // operator-role binding

  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      labels: {
        app: "spartakus",
      },
      name: "spartakus",
      namespace: env.namespace,
    },
  },

  {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "spartakus-volunteer",
      namespace: env.namespace,
      labels: {
        app: "spartakus",
      },
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
                "--cluster-id=" + params.usageId,
                "--database=https://stats-collector.kubeflow.org",
              ],
            },
          ],
          serviceAccountName: "spartakus",
        },  // spec
      },
    },
  },  // deployment
] else []

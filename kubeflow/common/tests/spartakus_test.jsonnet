local spartakus = import "kubeflow/common/spartakus.libsonnet";

local params = {
  name: "spartakus",
  usageId: "unknown_cluster",
  reportUsage: "false",
};
local env = {
  namespace: "kubeflow",
};

local instance = spartakus.new(env, params);

std.assertEqual(
  instance.parts.clusterRole,
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
  }
) &&

std.assertEqual(
  instance.parts.clusterRoleBinding,
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
        namespace: "kubeflow",
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.serviceAccount,
  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      labels: {
        app: "spartakus",
      },
      name: "spartakus",
      namespace: "kubeflow",
    },
  }
) &&

std.assertEqual(
  instance.parts.volunteer,
  {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      labels: {
        app: "spartakus",
      },
      name: "spartakus-volunteer",
      namespace: "kubeflow",
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
              args: [
                "volunteer",
                "--cluster-id=unknown_cluster",
                "--database=https://stats-collector.kubeflow.org",
              ],
              image: "gcr.io/google_containers/spartakus-amd64:v1.1.0",
              name: "volunteer",
            },
          ],
          serviceAccountName: "spartakus",
        },
      },
    },
  }
)

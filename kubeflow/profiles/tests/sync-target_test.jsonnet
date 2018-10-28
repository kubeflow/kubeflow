local params = {
  user: "chloe",
  target: "iris",
};

local env = {
  namespace: "kubeflow",
};

local request = {
  parent: {
    apiVersion: "kubeflow.org/v1alpha1",
    kind: "Target",
    metadata: {
      name: env.namespace + "-" + params.user,
      namespace: env.namespace,
    },
    spec: {
      namespace: params.target,
      owner: params.user,
    },
  },
  children: {
    "Namespace.v1": {},
    "Permission.kubeflow.org/v1alpha1": {},
  },
};

local syncTarget = import "kubeflow/profiles/sync-target.jsonnet";

std.assertEqual(
  syncTarget(request),
  {
    children: [
      {
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          labels: {
            app: "iris",
          },
          name: "iris",
        },
        status: {
          phase: "Pending",
        },
      },
      {
        apiVersion: "kubeflow.org/v1alpha1",
        kind: "Permission",
        metadata: {
          name: "default",
          namespace: "iris",
        },
        spec: {
          owner: "chloe",
        },
      },
    ],
    status: {
      conditions: [
        {
          type: "Ready",
        },
      ],
      created: true,
      phase: "Active",
    },
  }
)

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
    kind: "Profile",
    metadata: {
      name: params.target + "-" + params.user,
      namespace: env.namespace,
    },
    spec: {
      template: {
        metadata: {
          name: params.target,
        },
        spec: {
          namespace: params.target,
          owner: params.user,
        },
      },
    },
  },
  children: {
    "Target.kubeflow.org/v1alpha1": {},
  },
};

local syncProfile = import "kubeflow/profiles/sync-profile.libsonnet";

std.assertEqual(
  syncTarget(request),
  {
    children: [
      {
        apiVersion: "kubeflow.org/v1alpha1",
        kind: "Target",
        metadata: {
          name: "iris",
          namespace: "kubeflow",
        },
        spec: {
          namespace: "iris",
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
      request_children: {
        "Target.kubeflow.org/v1alpha1": {},
      },
      request_parent: {
        apiVersion: "kubeflow.org/v1alpha1",
        kind: "Profile",
        metadata: {
          name: "iris-chloe",
          namespace: "kubeflow",
        },
        spec: {
          template: {
            metadata: {
              name: "iris",
            },
            spec: {
              namespace: "iris",
              owner: "chloe",
            },
          },
        },
      },
    },
  }
)

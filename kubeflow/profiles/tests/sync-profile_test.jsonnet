local params = {
  user: {
    kind: "ServiceAccount",
    name: "chloe",
    namespace: "kubeflow",
  },
  protectedNamespace: "iris",
};

local env = {
  namespace: "kubeflow",
};

local request = {
  parent: {
    apiVersion: "kubeflow.org/v1alpha1",
    kind: "Profile",
    metadata: {
      name: params.protectedNamespace,
      namespace: env.namespace,
    },
    spec: {
      template: {
        metadata: {
          namespace: params.protectedNamespace,
        },
        spec: {
          owner: params.user,
        },
      },
    },
  },
  children: {
    "Namespace.v1": {},
    "Permission.kubeflow.org/v1alpha1": {},
  },
};

local syncProfile = import "kubeflow/profiles/sync-profile.jsonnet";

std.assertEqual(
  syncProfile(request),
  {
    children: [
      {
        apiVersion: "v1",
        kind: "Namespace",
        metadata: {
          name: "iris",
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
          owner: {
            kind: "ServiceAccount",
            name: "chloe",
            namespace: "kubeflow",
          },
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

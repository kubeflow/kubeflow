local params = {
  users: {
    stan: {
      kind: "ServiceAccount",
      name: "stan",
      namespace: "kubeflow",
    },
    jackie: {
      kind: "User",
      name: "jackie",
      apiGroup: "rbac.authorization.k8s.io",
    },
  },
  quota: {
    requests: {
      cpu: "1",
      memory: "1Gi",
      gpu: "1",
    },
    limits: {
      cpu: "2",
      memory: "2Gi",
    },
  },
  protectedNamespace: "iris",
  protectedNamespaceQuota: "default",
};

local env = {
  namespace: "kubeflow",
};

local syncProfile = import "kubeflow/profiles/sync-profile.jsonnet";
local requestsCpu = "requests.cpu";
local requestsMemory = "requests.memory";
local requestsGpu = "requests.nvidia.com/gpu";
local limitsCpu = "limits.cpu";
local limitsMemory = "limits.memory";

local request1 = {
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
          quota: {
            name: params.protectedNamespaceQuota,
            requests: params.quota.requests,
            limits: params.quota.limits,
          },
        },
        spec: {
          owner: params.users.stan,
        },
      },
    },
  },
  children: {
    "Namespace.v1": {},
    "Permission.kubeflow.org/v1alpha1": {},
  },
};

local request2 = {
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
          quota: {
            name: params.protectedNamespaceQuota,
            requests: params.quota.requests,
            limits: params.quota.limits,
          },
        },
        spec: {
          owner: params.users.jackie,
        },
      },
    },
  },
  children: {
    "Namespace.v1": {},
    "Permission.kubeflow.org/v1alpha1": {},
  },
};

std.assertEqual(
  syncProfile(request1),
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
        apiVersion: "v1",
        kind: "ResourceQuota",
        metadata: {
          name: "default",
          namespace: "iris",
        },
        spec: {
          hard: {
            [requestsCpu]: "1",
            [requestsMemory]: "1Gi",
            [requestsGpu]: "1",
            [limitsCpu]: "2",
            [limitsMemory]: "2Gi",
          },
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
            name: "stan",
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
) &&

std.assertEqual(
  syncProfile(request2),
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
        apiVersion: "v1",
        kind: "ResourceQuota",
        metadata: {
          name: "default",
          namespace: "iris",
        },
        spec: {
          hard: {
            [requestsCpu]: "1",
            [requestsMemory]: "1Gi",
            [requestsGpu]: "1",
            [limitsCpu]: "2",
            [limitsMemory]: "2Gi",
          },
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
            apiGroup: "rbac.authorization.k8s.io",
            kind: "User",
            name: "jackie",
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

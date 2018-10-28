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
    kind: "Permission",
    metadata: {
      name: env.namespace + "-" + params.user,
      namespace: env.namespace,
    },
    spec: {
      owner: params.user,
    },
  },
  children: {
    "Role.rbac.authorization.k8s.io/v1": {},
    "RoleBindings.rbac.authorization.k8s.io/v1": {},
  },
};

local syncPermission = import "kubeflow/profiles/sync-permission.jsonnet";

std.assertEqual(
  syncPermission(request),
  {
    children: [
      {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "Role",
        metadata: {
          name: "edit",
          namespace: "kubeflow",
        },
        rules: [
          {
            apiGroups: [
              "metacontroller.k8s.io",
            ],
            resources: [
              "compositecontrollers",
              "decoratecontrollers",
            ],
            verbs: [
              "create",
              "delete",
              "get",
              "list",
              "patch",
              "update",
              "watch",
            ],
          },
          {
            apiGroups: [
              "kubeflow.org",
            ],
            resources: [
              "profiles",
              "targets",
              "permissions",
            ],
            verbs: [
              "get",
              "list",
              "watch",
              "create",
            ],
          },
          {
            apiGroups: [
              "app.k8s.io",
            ],
            resources: [
              "applications",
              "apps",
            ],
            verbs: [
              "create",
              "delete",
              "deletecollection",
              "get",
              "list",
              "patch",
              "update",
              "watch",
            ],
          },
          {
            apiGroups: [
              "",
            ],
            resources: [
              "pods",
              "pods/attach",
              "pods/exec",
              "pods/portforward",
              "pods/proxy",
            ],
            verbs: [
              "create",
              "delete",
              "deletecollection",
              "get",
              "list",
              "patch",
              "update",
              "watch",
            ],
          },
          {
            apiGroups: [
              "",
            ],
            resources: [
              "configmaps",
              "endpoints",
              "persistentvolumeclaims",
              "replicationcontrollers",
              "replicationcontrollers/scale",
              "secrets",
              "serviceaccounts",
              "services",
              "services/proxy",
            ],
            verbs: [
              "create",
              "delete",
              "deletecollection",
              "get",
              "list",
              "patch",
              "update",
              "watch",
            ],
          },
          {
            apiGroups: [
              "",
            ],
            resources: [
              "bindings",
              "events",
              "limitranges",
              "namespaces/status",
              "pods/log",
              "pods/status",
              "replicationcontrollers/status",
              "resourcequotas",
              "resourcequotas/status",
            ],
            verbs: [
              "get",
              "list",
              "watch",
            ],
          },
          {
            apiGroups: [
              "",
            ],
            resources: [
              "namespaces",
            ],
            verbs: [
              "get",
              "list",
              "watch",
            ],
          },
          {
            apiGroups: [
              "",
            ],
            resources: [
              "serviceaccounts",
            ],
            verbs: [
              "impersonate",
            ],
          },
          {
            apiGroups: [
              "apps",
            ],
            resources: [
              "daemonsets",
              "deployments",
              "deployments/rollback",
              "deployments/scale",
              "replicasets",
              "replicasets/scale",
              "statefulsets",
            ],
            verbs: [
              "create",
              "delete",
              "deletecollection",
              "get",
              "list",
              "patch",
              "update",
              "watch",
            ],
          },
          {
            apiGroups: [
              "autoscaling",
            ],
            resources: [
              "horizontalpodautoscalers",
            ],
            verbs: [
              "create",
              "delete",
              "deletecollection",
              "get",
              "list",
              "patch",
              "update",
              "watch",
            ],
          },
          {
            apiGroups: [
              "batch",
            ],
            resources: [
              "cronjobs",
              "jobs",
            ],
            verbs: [
              "create",
              "delete",
              "deletecollection",
              "get",
              "list",
              "patch",
              "update",
              "watch",
            ],
          },
          {
            apiGroups: [
              "extensions",
            ],
            resources: [
              "daemonsets",
              "deployments",
              "deployments/rollback",
              "deployments/scale",
              "ingresses",
              "networkpolicies",
              "replicasets",
              "replicasets/scale",
              "replicationcontrollers/scale",
            ],
            verbs: [
              "create",
              "delete",
              "deletecollection",
              "get",
              "list",
              "patch",
              "update",
              "watch",
            ],
          },
          {
            apiGroups: [
              "policy",
            ],
            resources: [
              "poddisruptionbudgets",
            ],
            verbs: [
              "create",
              "delete",
              "deletecollection",
              "get",
              "list",
              "patch",
              "update",
              "watch",
            ],
          },
          {
            apiGroups: [
              "networking.k8s.io",
            ],
            resources: [
              "networkpolicies",
            ],
            verbs: [
              "create",
              "delete",
              "deletecollection",
              "get",
              "list",
              "patch",
              "update",
              "watch",
            ],
          },
        ],
      },
      {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "RoleBinding",
        metadata: {
          name: "chloe",
          namespace: "kubeflow",
        },
        roleRef: {
          apiGroup: "rbac.authorization.k8s.io",
          kind: "Role",
          name: "edit",
        },
        subjects: [
          {
            kind: "ServiceAccount",
            name: "chloe",
            namespace: "kubeflow",
          },
        ],
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

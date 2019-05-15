local centraldashboard = import "../centraldashboard.libsonnet";
local testSuite = import "kubeflow/common/testsuite.libsonnet";

local params = {
  image: "gcr.io/kubeflow-images-public/centraldashboard:v0.3.0",
};
local env = {
  namespace: "kftest",
};
local centraldash = centraldashboard.new(params, env);

local testCases = [
  {
    actual: centraldash.centralDashboardDeployment,
    expected: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: "kftest",
      },
      spec: {
        template: {
          metadata: {
            labels: {
              app: "centraldashboard",
            },
          },
          spec: {
            containers: [
              {
                image: "gcr.io/kubeflow-images-public/centraldashboard:v0.3.0",
                name: "centraldashboard",
                ports: [
                  {
                    containerPort: 8082,
                  },
                ],
              },
            ],
            serviceAccountName: "centraldashboard",
          },
        },
      },
    },
  },
  {
    actual: centraldash.centralDashboardService,
    expected: {
      local annotations = function(namespace) {
        "getambassador.io/config":
          std.join("\n", [
            "---",
            "apiVersion: ambassador/v0",
            "kind:  Mapping",
            "name: centralui-mapping",
            "prefix: /",
            "rewrite: /",
            "service: centraldashboard." + namespace,
          ]),
      },
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: "kftest",
        annotations: annotations("kftest"),
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 8082,
          },
        ],
        selector: {
          app: "centraldashboard",
        },
        sessionAffinity: "None",
        type: "ClusterIP",
      },
    },
  },
  {
    actual: centraldash.centralDashboardServiceAccount,
    expected: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "centraldashboard",
        namespace: "kftest",
      },
    },
  },
  {
    actual: centraldash.centralDashboardRole,
    expected: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: "kftest",
      },
      rules: [
        {
          apiGroups: [
            "",
            "app.k8s.io"
          ],
          resources: [
            "applications",
            "pods",
            "pods/exec",
            "pods/log",
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [""],
          resources: [
            "secrets",
          ],
          verbs: [
            "get",
          ],
        },
      ],
    },
  },
  {
    actual: centraldash.centralDashboardRoleBinding,
    expected: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: "kftest",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "Role",
        name: "centraldashboard",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "centraldashboard",
          namespace: "kftest",
        },
      ],
    },
  },
  {
    actual: centraldash.centralDashboardClusterRole,
    expected: {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
      },
      rules: [
        {
          apiGroups: [""],
          resources: [
            "namespaces",
            "nodes",
            "events"
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
      ],
    },
  },
  {
    actual: centraldash.centralDashboardClusterRoleBinding,
    expected: {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "centraldashboard",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "centraldashboard",
          namespace: "kftest",
        },
      ],
    },
  },
];

testSuite.run(testCases)

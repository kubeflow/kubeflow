local centraldashboard = import "../centraldashboard.libsonnet";
local params = {
  namespace:: "kubeflow",
  cloud:: "gke",
};

std.assertEqual(
  centraldashboard.parts(params.namespace).deployUi,
  {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      labels: {
        app: "centraldashboard",
      },
      name: "centraldashboard",
      namespace: "kubeflow",
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
              image: "gcr.io/kubeflow-images-public/centraldashboard:latest",
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
  }
) &&

std.assertEqual(
  centraldashboard.parts(params.namespace).uiService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      labels: {
        app: "centraldashboard",
      },
      name: "centraldashboard",
      namespace: "kubeflow",
      annotations: {
        "getambassador.io/config":
          std.join("\n", [
            "---",
            "apiVersion: ambassador/v0",
            "kind:  Mapping",
            "name: centralui-mapping",
            "prefix: /",
            "rewrite: /",
            "service: centraldashboard." + "kubeflow",
          ]),
      },
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
) &&

std.assertEqual(
  centraldashboard.parts(params.namespace).uiServiceAccount,
  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "centraldashboard",
      namespace: "kubeflow",
    },
  },
) &&

std.assertEqual(
  centraldashboard.parts(params.namespace).uiRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRole",
    metadata: {
      labels: {
        app: "centraldashboard",
      },
      name: "centraldashboard",
      namespace: "kubeflow",
    },
    rules: [
      {
        apiGroups: [""],
        resources: [
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
) &&

std.assertEqual(
  centraldashboard.parts(params.namespace).uiRoleBinding,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRoleBinding",
    metadata: {
      labels: {
        app: "centraldashboard",
      },
      name: "centraldashboard",
      namespace: "kubeflow",
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
        namespace: "kubeflow",
      },
    ],
  }
)

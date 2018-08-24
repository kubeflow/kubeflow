// @apiVersion 0.1
// @name io.ksonnet.pkg.centraldashboard
// @description centraldashboard Component
// @shortDescription centraldashboard
// @param name string Name
// @optionalParam image string gcr.io/kubeflow-images-public/centraldashboard:v0.2.1 Image for the central dashboard
local centraldashboard = import "kubeflow/core/centraldashboard.libsonnet";

[
  {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      labels: {
        app: "centraldashboard",
      },
      name: "centraldashboard",
      namespace: env.namespace,
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
              image: params.image,
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
  },  // deployUi

  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      labels: {
        app: "centraldashboard",
      },
      name: "centraldashboard",
      namespace: env.namespace,
      annotations: centraldashboard.annotations(env.namespace),
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
  },  //service

  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "centraldashboard",
      namespace: env.namespace,
    },
  },  // service account

  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRole",
    metadata: {
      labels: {
        app: "centraldashboard",
      },
      name: "centraldashboard",
      namespace: env.namespace,
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
  },  // operator-role

  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRoleBinding",
    metadata: {
      labels: {
        app: "centraldashboard",
      },
      name: "centraldashboard",
      namespace: env.namespace,
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
        namespace: env.namespace,
      },
    ],
  },  // role binding
]

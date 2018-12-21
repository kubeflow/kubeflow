local ambassador = import "kubeflow/common/ambassador.libsonnet";

local params = {
  name: "ambassador",
  platform: "gke",
  ambassadorServiceType: "ClusterIP",
  ambassadorImage: "quay.io/datawire/ambassador:0.37.0",
};
local env = {
  namespace: "kubeflow",
};

local instance = ambassador.new(env, params);

std.assertEqual(
  instance.parts.ambassadorService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      labels: {
        service: "ambassador",
      },
      name: "ambassador",
      namespace: "kubeflow",
    },
    spec: {
      ports: [
        {
          name: "ambassador",
          port: 80,
          targetPort: 80,
        },
      ],
      selector: {
        service: "ambassador",
      },
      type: "ClusterIP",
    },
  }
) &&

std.assertEqual(
  instance.parts.adminService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      labels: {
        service: "ambassador-admin",
      },
      name: "ambassador-admin",
      namespace: "kubeflow",
    },
    spec: {
      ports: [
        {
          name: "ambassador-admin",
          port: 8877,
          targetPort: 8877,
        },
      ],
      selector: {
        service: "ambassador",
      },
      type: "ClusterIP",
    },
  }
) &&

std.assertEqual(
  instance.parts.ambassadorRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRole",
    metadata: {
      name: "ambassador",
    },
    rules: [
      {
        apiGroups: [
          "",
        ],
        resources: [
          "services",
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
          "configmaps",
        ],
        verbs: [
          "create",
          "update",
          "patch",
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
          "secrets",
        ],
        verbs: [
          "get",
          "list",
          "watch",
        ],
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.ambassadorServiceAccount,
  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "ambassador",
      namespace: "kubeflow",
    },
  }
) &&

std.assertEqual(
  instance.parts.ambassadorRoleBinding,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRoleBinding",
    metadata: {
      name: "ambassador",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "ClusterRole",
      name: "ambassador",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "ambassador",
        namespace: "kubeflow",
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.ambassadorDeployment,
  {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "ambassador",
      namespace: "kubeflow",
    },
    spec: {
      replicas: 3,
      template: {
        metadata: {
          labels: {
            service: "ambassador",
          },
          namespace: "kubeflow",
        },
        spec: {
          containers: [
            {
              env: [
                {
                  name: "AMBASSADOR_NAMESPACE",
                  valueFrom: {
                    fieldRef: {
                      fieldPath: "metadata.namespace",
                    },
                  },
                },
              ],
              image: "quay.io/datawire/ambassador:0.37.0",
              livenessProbe: {
                httpGet: {
                  path: "/ambassador/v0/check_alive",
                  port: 8877,
                },
                initialDelaySeconds: 30,
                periodSeconds: 30,
              },
              name: "ambassador",
              readinessProbe: {
                httpGet: {
                  path: "/ambassador/v0/check_ready",
                  port: 8877,
                },
                initialDelaySeconds: 30,
                periodSeconds: 30,
              },
              resources: {
                limits: {
                  cpu: 1,
                  memory: "400Mi",
                },
                requests: {
                  cpu: "200m",
                  memory: "100Mi",
                },
              },
            },
          ],
          restartPolicy: "Always",
          serviceAccountName: "ambassador",
        },
      },
    },
  }
)

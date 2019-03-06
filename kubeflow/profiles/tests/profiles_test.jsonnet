local profiles = import "kubeflow/profiles/profiles.libsonnet";

local params = {
  name: "profiles",
  image: "gcr.io/kubeflow-images-public/notebook-controller:latest",
};
local env = {
  namespace: "kf-001",
};

local instance = profiles.new(env, params);

std.assertEqual(
  instance.parts.profilesCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "profiles.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      names: {
        kind: "Profile",
        plural: "profiles",
        shortNames: [
          "prf",
        ],
        singular: "profile",
      },
      scope: "Cluster",
      validation: {
        openAPIV3Schema: {
          properties: {
            apiVersion: {
              type: "string",
            },
            kind: {
              type: "string",
            },
            metadata: {
              type: "object",
            },
            spec: {
              type: "object",
              properties: {
                namespace: {
                  type: "string",
                },
                owner: {
                  type: "object",
                  required: [
                    "kind",
                    "name",
                  ],
                  properties: {
                    apiGroup: {
                      type: "string",
                    },
                    kind: {
                      enum: [
                        "ServiceAccount",
                        "User",
                      ],
                    },
                    namespace: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                  },
                },
              },
            },
            status: {
              properties: {
                observedGeneration: {
                  type: "integer",
                  format: "int64",
                },
              },
              type: "object",
            },
          },
        },
      },
      version: "v1alpha1",
    },
  }
) &&

std.assertEqual(
  instance.parts.profilesService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "profiles",
      namespace: "kf-001",
    },
    spec: {
      ports: [
        {
          port: 443,
        },
      ],
      selector: {
        app: "profiles",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.profilesRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1",
    kind: "Role",
    metadata: {
      name: "profiles",
      namespace: "kf-001",
    },
    rules: [
      {
        apiGroups: [
          "",
        ],
        resources: [
          "namespaces",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "rbac.authorization.k8s.io",
        ],
        resources: [
          "roles",
          "rolebindings",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "kubeflow.org",
        ],
        resources: [
          "profiles",
        ],
        verbs: [
          "*",
        ],
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.profilesDeployment,
  {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "profiles",
      namespace: "kf-001",
    },
    spec: {
      selector: {
        matchLabels: {
          app: "profiles",
        },
      },
      template: {
        metadata: {
          labels: {
            app: "profiles",
          },
        },
        spec: {
          serviceAccountName: "profiles",
          containers: [
            {
              name: "manager",
              image: params.image,
              imagePullPolicy: "Always",
              command: [
                "/manager",
              ],
            },
          ],
        },
      },
    },
  }
)

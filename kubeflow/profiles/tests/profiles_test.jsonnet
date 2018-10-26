local profiles = import "kubeflow/profiles/profiles.libsonnet";

local params = {
  name: "profiles",
  image: "metacontroller/jsonnetd@sha256:25c25f217ad030a0f67e37078c33194785b494569b0c088d8df4f00da8fd15a0",
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
          "prj",
        ],
        singular: "profile",
      },
      scope: "Namespaced",
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
              properties: {
                selector: {
                  type: "object",
                },
                template: {
                  properties: {
                    metadata: {
                      properties: {
                        name: {
                          type: "string",
                        },
                      },
                      type: "object",
                    },
                    spec: {
                      properties: {
                        namespace: {
                          type: "string",
                        },
                        owner: {
                          type: "string",
                        },
                      },
                      type: "object",
                    },
                  },
                  type: "object",
                },
              },
              type: "object",
            },
            status: {
              properties: {
                observedGeneration: {
                  type: "int64",
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
  instance.parts.targetsCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "targets.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      names: {
        kind: "Target",
        plural: "targets",
        singular: "target",
      },
      scope: "Namespaced",
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
              properties: {
                namespace: {
                  type: "string",
                },
                owner: {
                  type: "string",
                },
                selector: {
                  type: "object",
                },
              },
              type: "object",
            },
            status: {
              properties: {
                observedGeneration: {
                  type: "int64",
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
  instance.parts.permissionsCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "permissions.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      names: {
        kind: "Permission",
        plural: "permissions",
        singular: "permission",
      },
      scope: "Namespaced",
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
              properties: {
                owner: {
                  type: "string",
                },
                selector: {
                  type: "object",
                },
              },
              type: "object",
            },
            status: {
              properties: {
                observedGeneration: {
                  type: "int64",
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
          port: 80,
          targetPort: 8080,
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
      name: "view",
      namespace: "kf-001",
    },
    rules: [
      {
        apiGroups: [
          "kubeflow.org",
        ],
        resources: [
          "profiles",
          "targets",
        ],
        verbs: [
          "create",
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
          "get",
        ],
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.profilesConfigMap,
  {
    apiVersion: "v1",
    data: {
      "sync-permission.jsonnet": importstr "../sync-permission.libsonnet",
      "sync-profile.jsonnet": importstr "../sync-profile.libsonnet",
      "sync-target.jsonnet": importstr "../sync-target.libsonnet",
    },
    kind: "ConfigMap",
    metadata: {
      name: "profiles",
      namespace: "kf-001",
    },
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
          containers: [
            {
              image: "metacontroller/jsonnetd@sha256:25c25f217ad030a0f67e37078c33194785b494569b0c088d8df4f00da8fd15a0",
              imagePullPolicy: "Always",
              name: "hooks",
              volumeMounts: [
                {
                  mountPath: "/opt/profiles/hooks",
                  name: "hooks",
                },
              ],
              workingDir: "/opt/profiles/hooks",
            },
          ],
          volumes: [
            {
              configMap: {
                name: "profiles",
              },
              name: "hooks",
            },
          ],
        },
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.profilesController,
  {
    apiVersion: "metacontroller.k8s.io/v1alpha1",
    kind: "CompositeController",
    metadata: {
      name: "profiles-controller",
    },
    spec: {
      childResources: [
        {
          apiVersion: "kubeflow.org/v1alpha1",
          resource: "targets",
        },
      ],
      generateSelector: true,
      hooks: {
        sync: {
          webhook: {
            url: "http://profiles.kf-001/sync-profile",
          },
        },
      },
      parentResource: {
        apiVersion: "kubeflow.org/v1alpha1",
        resource: "profiles",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.targetsController,
  {
    apiVersion: "metacontroller.k8s.io/v1alpha1",
    kind: "CompositeController",
    metadata: {
      name: "targets-controller",
    },
    spec: {
      childResources: [
        {
          apiVersion: "v1",
          resource: "namespaces",
        },
        {
          apiVersion: "kubeflow.org/v1alpha1",
          resource: "permissions",
        },
      ],
      generateSelector: true,
      hooks: {
        sync: {
          webhook: {
            url: "http://profiles.kf-001/sync-target",
          },
        },
      },
      parentResource: {
        apiVersion: "kubeflow.org/v1alpha1",
        resource: "targets",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.permissionsController,
  {
    apiVersion: "metacontroller.k8s.io/v1alpha1",
    kind: "CompositeController",
    metadata: {
      name: "permissions-controller",
    },
    spec: {
      childResources: [
        {
          apiVersion: "rbac.authorization.k8s.io/v1",
          resource: "roles",
        },
        {
          apiVersion: "rbac.authorization.k8s.io/v1",
          resource: "rolebindings",
        },
      ],
      generateSelector: true,
      hooks: {
        sync: {
          webhook: {
            url: "http://profiles.kf-001/sync-permission",
          },
        },
      },
      parentResource: {
        apiVersion: "kubeflow.org/v1alpha1",
        resource: "permissions",
      },
    },
  }
)

local ensembles = import "kubeflow/ensembles/ensembles.libsonnet";

local params = {
  name: "ensembles",
};
local env = {
  namespace: "kf-001",
};

local instance = ensembles.new(env, params);

std.assertEqual(
  instance.parts.ensemblesCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "ensembles.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      names: {
        kind: "Ensemble",
        plural: "ensembles",
        shortNames: [
          "prj",
        ],
        singular: "ensemble",
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
  instance.parts.compositionsCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "compositions.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      names: {
        kind: "Composition",
        plural: "compositions",
        singular: "composition",
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
  instance.parts.ensemblesService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "ensembles",
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
        app: "ensembles",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.ensemblesRole,
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
          "ensembles",
          "compositions",
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
          "ensembles",
        ],
        verbs: [
          "get",
        ],
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.ensemblesConfigMap,
  {
    apiVersion: "v1",
    data: {
      "sync-permission.jsonnet": importstr "../sync-permission.jsonnet",
      "sync-ensemble.jsonnet": importstr "../sync-ensemble.jsonnet",
      "sync-composition.jsonnet": importstr "../sync-composition.jsonnet",
    },
    kind: "ConfigMap",
    metadata: {
      name: "ensembles",
      namespace: "kf-001",
    },
  }
) &&

std.assertEqual(
  instance.parts.ensemblesDeployment,
  {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "ensembles",
      namespace: "kf-001",
    },
    spec: {
      selector: {
        matchLabels: {
          app: "ensembles",
        },
      },
      template: {
        metadata: {
          labels: {
            app: "ensembles",
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
                  mountPath: "/opt/ensembles/hooks",
                  name: "hooks",
                },
              ],
              workingDir: "/opt/ensembles/hooks",
            },
          ],
          volumes: [
            {
              configMap: {
                name: "ensembles",
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
  instance.parts.ensemblesController,
  {
    apiVersion: "metacontroller.k8s.io/v1alpha1",
    kind: "CompositeController",
    metadata: {
      name: "ensembles-controller",
    },
    spec: {
      childResources: [
        {
          apiVersion: "kubeflow.org/v1alpha1",
          resource: "compositions",
        },
      ],
      generateSelector: true,
      hooks: {
        sync: {
          webhook: {
            url: "http://ensembles.kf-001/sync-ensemble",
          },
        },
      },
      parentResource: {
        apiVersion: "kubeflow.org/v1alpha1",
        resource: "ensembles",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.compositionsController,
  {
    apiVersion: "metacontroller.k8s.io/v1alpha1",
    kind: "CompositeController",
    metadata: {
      name: "compositions-controller",
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
            url: "http://ensembles.kf-001/sync-composition",
          },
        },
      },
      parentResource: {
        apiVersion: "kubeflow.org/v1alpha1",
        resource: "compositions",
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
            url: "http://ensembles.kf-001/sync-permission",
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

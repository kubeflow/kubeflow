local application = import "kubeflow/application/application.libsonnet";

local params = {
  name: "application",
  components: [],
  emitCRD: false,
};
local env = {
  namespace:: "test-kf-001",
};

local instance = application.new(env, params);

std.assertEqual(
  instance.applicationCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      labels: {
        api: "default",
      },
      name: "applications.app.k8s.io",
    },
    spec: {
      group: "app.k8s.io",
      names: {
        kind: "Application",
        plural: "applications",
        singular: "application",
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
                components: {
                  items: {
                    type: "object",
                  },
                  type: "array",
                },
                dependencies: {
                  items: {
                    type: "string",
                  },
                  type: "array",
                },
                description: {
                  type: "string",
                },
                healthCheck: {
                  type: "string",
                },
                info: {
                  items: {
                    type: "object",
                  },
                  type: "array",
                },
                keywords: {
                  items: {
                    type: "string",
                  },
                  type: "array",
                },
                links: {
                  items: {
                    type: "object",
                  },
                  type: "array",
                },
                maintainers: {
                  items: {
                    type: "string",
                  },
                  type: "array",
                },
                owners: {
                  items: {
                    type: "string",
                  },
                  type: "array",
                },
                selector: {
                  type: "object",
                },
                type: {
                  type: "string",
                },
                version: {
                  type: "string",
                },
              },
              type: "object",
            },
            status: {
              properties: {
                installed: {
                  items: {
                    type: "string",
                  },
                  type: "array",
                },
                observedGeneration: {
                  format: "int64",
                  type: "string",
                },
                ready: {
                  type: "string",
                },
              },
              type: "object",
            },
          },
        },
      },
      version: "v1beta1",
    },
  }
)

// TBD - may need to add --ext-code-file <var>=<file> for __ksonnet/components
/*
std.assertEqual(
  instance.application,
)
*/




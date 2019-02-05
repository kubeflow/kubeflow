local application = import "kubeflow/application/application.libsonnet";

local params = {
  name: "kubeflow",
  components: '["ambassador","centraldashboard"]',
  emitCRD: true,
  emitController: true,
};
local env = {
  namespace: "test-kf-001",
};

local instance = application.new(env, params);

/*
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
                assemblyPhase: {
                  type: "string",
                },
                componentKinds: {
                  items: {
                    type: "object",
                  },
                  type: "array",
                },
                descriptor: {
                  properties: {
                    description: {
                      type: "string",
                    },
                    icons: {
                      items: {
                        properties: {
                          size: {
                            type: "string",
                          },
                          src: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        required: [
                          "src",
                        ],
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
                        properties: {
                          description: {
                            type: "string",
                          },
                          url: {
                            type: "string",
                          },
                        },
                        type: "object",
                      },
                      type: "array",
                    },
                    maintainers: {
                      items: {
                        properties: {
                          email: {
                            type: "string",
                          },
                          name: {
                            type: "string",
                          },
                          url: {
                            type: "string",
                          },
                        },
                        type: "object",
                      },
                      type: "array",
                    },
                    notes: {
                      type: "string",
                    },
                    owners: {
                      items: {
                        properties: {
                          email: {
                            type: "string",
                          },
                          name: {
                            type: "string",
                          },
                          url: {
                            type: "string",
                          },
                        },
                        type: "object",
                      },
                      type: "array",
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
                info: {
                  items: {
                    properties: {
                      name: {
                        type: "string",
                      },
                      type: {
                        type: "string",
                      },
                      value: {
                        type: "string",
                      },
                      valueFrom: {
                        properties: {
                          configMapKeyRef: {
                            properties: {
                              apiVersion: {
                                type: "string",
                              },
                              fieldPath: {
                                type: "string",
                              },
                              key: {
                                type: "string",
                              },
                              kind: {
                                type: "string",
                              },
                              name: {
                                type: "string",
                              },
                              namespace: {
                                type: "string",
                              },
                              resourceVersion: {
                                type: "string",
                              },
                              uid: {
                                type: "string",
                              },
                            },
                            type: "object",
                          },
                          ingressRef: {
                            properties: {
                              apiVersion: {
                                type: "string",
                              },
                              fieldPath: {
                                type: "string",
                              },
                              host: {
                                type: "string",
                              },
                              kind: {
                                type: "string",
                              },
                              name: {
                                type: "string",
                              },
                              namespace: {
                                type: "string",
                              },
                              path: {
                                type: "string",
                              },
                              resourceVersion: {
                                type: "string",
                              },
                              uid: {
                                type: "string",
                              },
                            },
                            type: "object",
                          },
                          secretKeyRef: {
                            properties: {
                              apiVersion: {
                                type: "string",
                              },
                              fieldPath: {
                                type: "string",
                              },
                              key: {
                                type: "string",
                              },
                              kind: {
                                type: "string",
                              },
                              name: {
                                type: "string",
                              },
                              namespace: {
                                type: "string",
                              },
                              resourceVersion: {
                                type: "string",
                              },
                              uid: {
                                type: "string",
                              },
                            },
                            type: "object",
                          },
                          serviceRef: {
                            properties: {
                              apiVersion: {
                                type: "string",
                              },
                              fieldPath: {
                                type: "string",
                              },
                              kind: {
                                type: "string",
                              },
                              name: {
                                type: "string",
                              },
                              namespace: {
                                type: "string",
                              },
                              path: {
                                type: "string",
                              },
                              port: {
                                format: "int32",
                                type: "integer",
                              },
                              resourceVersion: {
                                type: "string",
                              },
                              uid: {
                                type: "string",
                              },
                            },
                            type: "object",
                          },
                          type: {
                            type: "string",
                          },
                        },
                        type: "object",
                      },
                    },
                    type: "object",
                  },
                  type: "array",
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
                  format: "int64",
                  type: "integer",
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
) &&

std.assertEqual(
  instance.applicationConfigMap,
) &&
*/

std.assertEqual(
  instance.applicationDeployment,
  {
    apiVersion: "apps/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "kubeflow-controller",
      namespace: "test-kf-001",
    },
    spec: {
      selector: {
        matchLabels: {
          app: "kubeflow-controller",
        },
      },
      template: {
        metadata: {
          labels: {
            app: "kubeflow-controller",
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
                  mountPath: "/opt/isolation/operator/hooks",
                  name: "hooks",
                },
              ],
              workingDir: "/opt/isolation/operator/hooks",
            },
          ],
          volumes: [
            {
              configMap: {
                name: "kubeflow-controller-hooks",
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
  instance.applicationService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "kubeflow-controller",
      namespace: "test-kf-001",
    },
    spec: {
      ports: [
        {
          port: 80,
          targetPort: 8080,
        },
      ],
      selector: {
        app: "kubeflow-controller",
      },
    },
  }
)

/*
std.assertEqual(
  instance.applicationController,
) &&

std.assertEqual(
  instance.application,
)
*/




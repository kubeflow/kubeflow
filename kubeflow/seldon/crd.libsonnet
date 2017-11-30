local podTemplateValidation = import "json/pod-template-spec-validation.json";
local k = import "k.libsonnet";

{

  crd1()::
    {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "seldondeployments.machinelearning.seldon.io",
      },
      spec: {
        group: "machinelearning.seldon.io",
        names: {
          kind: "SeldonDeployment",
          plural: "seldondeployments",
          shortNames: [
            "sdep",
          ],
          singular: "seldondeployment",
        },
        scope: "Namespaced",
        validation: {
          openAPIV3Schema: {
            properties: {
              spec: {
                properties: {
                  annotations: {
                    description: "The annotations to be updated to a deployment",
                    type: "object",
                  },
                  name: {
                    type: "string",
                  },
                  oauth_key: {
                    type: "string",
                  },
                  oauth_secret: {
                    type: "string",
                  },
                  predictors: {
                    description: "List of predictors belonging to the deployment",
                    items: {
                      properties: {
                        annotations: {
                          description: "The annotations to be updated to a predictor",
                          type: "object",
                        },
                        graph: {
                          properties: {
                            children: {
                              items: {
                                properties: {
                                  children: {
                                    items: {
                                      properties: {
                                        children: {
                                          items: {},
                                          type: "array",
                                        },
                                        endpoint: {
                                          properties: {
                                            service_host: {
                                              type: "string",
                                            },
                                            service_port: {
                                              type: "integer",
                                            },
                                            type: {
                                              enum: [
                                                "REST",
                                                "GRPC",
                                              ],
                                              type: "string",
                                            },
                                          },
                                        },
                                        name: {
                                          type: "string",
                                        },
                                        implementation: {
                                          enum: [
                                            "UNKNOWN_IMPLEMENTATION",
                                            "SIMPLE_MODEL",
                                            "SIMPLE_ROUTER",
                                            "RANDOM_ABTEST",
                                            "AVERAGE_COMBINER",
                                          ],
                                          type: "string",
                                        },
                                        type: {
                                          enum: [
                                            "UNKNOWN_TYPE",
                                            "ROUTER",
                                            "COMBINER",
                                            "MODEL",
                                            "TRANSFORMER",
                                            "OUTPUT_TRANSFORMER",
                                          ],
                                          type: "string",
                                        },
                                        methods: {
                                          type: "array",
                                          items: {
                                            enum: [
                                              "TRANSFORM_INPUT",
                                              "TRANSFORM_OUTPUT",
                                              "ROUTE",
                                              "AGGREGATE",
                                              "SEND_FEEDBACK",
                                            ],
                                            type: "string",
                                          },
                                        },
                                      },
                                    },
                                    type: "array",
                                  },
                                  endpoint: {
                                    properties: {
                                      service_host: {
                                        type: "string",
                                      },
                                      service_port: {
                                        type: "integer",
                                      },
                                      type: {
                                        enum: [
                                          "REST",
                                          "GRPC",
                                        ],
                                        type: "string",
                                      },
                                    },
                                  },
                                  name: {
                                    type: "string",
                                  },
                                  implementation: {
                                    enum: [
                                      "UNKNOWN_IMPLEMENTATION",
                                      "SIMPLE_MODEL",
                                      "SIMPLE_ROUTER",
                                      "RANDOM_ABTEST",
                                      "AVERAGE_COMBINER",
                                    ],
                                    type: "string",
                                  },
                                  type: {
                                    enum: [
                                      "UNKNOWN_TYPE",
                                      "ROUTER",
                                      "COMBINER",
                                      "MODEL",
                                      "TRANSFORMER",
                                      "OUTPUT_TRANSFORMER",
                                    ],
                                    type: "string",
                                  },
                                  methods: {
                                    type: "array",
                                    items: {
                                      enum: [
                                        "TRANSFORM_INPUT",
                                        "TRANSFORM_OUTPUT",
                                        "ROUTE",
                                        "AGGREGATE",
                                        "SEND_FEEDBACK",
                                      ],
                                      type: "string",
                                    },
                                  },
                                },
                              },
                              type: "array",
                            },
                            endpoint: {
                              properties: {
                                service_host: {
                                  type: "string",
                                },
                                service_port: {
                                  type: "integer",
                                },
                                type: {
                                  enum: [
                                    "REST",
                                    "GRPC",
                                  ],
                                  type: "string",
                                },
                              },
                            },
                            name: {
                              type: "string",
                            },
                            implementation: {
                              enum: [
                                "UNKNOWN_IMPLEMENTATION",
                                "SIMPLE_MODEL",
                                "SIMPLE_ROUTER",
                                "RANDOM_ABTEST",
                                "AVERAGE_COMBINER",
                              ],
                              type: "string",
                            },
                            type: {
                              enum: [
                                "UNKNOWN_TYPE",
                                "ROUTER",
                                "COMBINER",
                                "MODEL",
                                "TRANSFORMER",
                                "OUTPUT_TRANSFORMER",
                              ],
                              type: "string",
                            },
                            methods: {
                              type: "array",
                              items: {
                                enum: [
                                  "TRANSFORM_INPUT",
                                  "TRANSFORM_OUTPUT",
                                  "ROUTE",
                                  "AGGREGATE",
                                  "SEND_FEEDBACK",
                                ],
                                type: "string",
                              },
                            },
                          },
                        },
                        name: {
                          type: "string",
                        },
                        componentSpec: podTemplateValidation,
                        replicas: {
                          type: "integer",
                        },
                        labels: {
                          description: "labels to be attached to entry deplyment for this predictor",
                          type: "object",
                        },
                      },
                    },
                    type: "array",
                  },
                },
              },
            },
          },
        },
        version: "v1alpha1",
        subresources: {
          status: {},
        },
      },
    },


  crd2()::
    {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "seldondeployments.machinelearning.seldon.io",
      },
      spec: {
        group: "machinelearning.seldon.io",
        names: {
          kind: "SeldonDeployment",
          plural: "seldondeployments",
          shortNames: [
            "sdep",
          ],
          singular: "seldondeployment",
        },
        scope: "Namespaced",
        validation: {
          openAPIV3Schema: {
            properties: {
              spec: {
                properties: {
                  annotations: {
                    description: "The annotations to be updated to a deployment",
                    type: "object",
                  },
                  name: {
                    type: "string",
                  },
                  oauth_key: {
                    type: "string",
                  },
                  oauth_secret: {
                    type: "string",
                  },
                  predictors: {
                    description: "List of predictors belonging to the deployment",
                    items: {
                      properties: {
                        annotations: {
                          description: "The annotations to be updated to a predictor",
                          type: "object",
                        },
                        graph: {
                          properties: {
                            children: {
                              items: {
                                properties: {
                                  children: {
                                    items: {
                                      properties: {
                                        children: {
                                          items: {},
                                          type: "array",
                                        },
                                        endpoint: {
                                          properties: {
                                            service_host: {
                                              type: "string",
                                            },
                                            service_port: {
                                              type: "integer",
                                            },
                                            type: {
                                              enum: [
                                                "REST",
                                                "GRPC",
                                              ],
                                              type: "string",
                                            },
                                          },
                                        },
                                        name: {
                                          type: "string",
                                        },
                                        implementation: {
                                          enum: [
                                            "UNKNOWN_IMPLEMENTATION",
                                            "SIMPLE_MODEL",
                                            "SIMPLE_ROUTER",
                                            "RANDOM_ABTEST",
                                            "AVERAGE_COMBINER",
                                          ],
                                          type: "string",
                                        },
                                        type: {
                                          enum: [
                                            "UNKNOWN_TYPE",
                                            "ROUTER",
                                            "COMBINER",
                                            "MODEL",
                                            "TRANSFORMER",
                                            "OUTPUT_TRANSFORMER",
                                          ],
                                          type: "string",
                                        },
                                        methods: {
                                          type: "array",
                                          items: {
                                            enum: [
                                              "TRANSFORM_INPUT",
                                              "TRANSFORM_OUTPUT",
                                              "ROUTE",
                                              "AGGREGATE",
                                              "SEND_FEEDBACK",
                                            ],
                                            type: "string",
                                          },
                                        },
                                      },
                                    },
                                    type: "array",
                                  },
                                  endpoint: {
                                    properties: {
                                      service_host: {
                                        type: "string",
                                      },
                                      service_port: {
                                        type: "integer",
                                      },
                                      type: {
                                        enum: [
                                          "REST",
                                          "GRPC",
                                        ],
                                        type: "string",
                                      },
                                    },
                                  },
                                  name: {
                                    type: "string",
                                  },
                                  implementation: {
                                    enum: [
                                      "UNKNOWN_IMPLEMENTATION",
                                      "SIMPLE_MODEL",
                                      "SIMPLE_ROUTER",
                                      "RANDOM_ABTEST",
                                      "AVERAGE_COMBINER",
                                    ],
                                    type: "string",
                                  },
                                  type: {
                                    enum: [
                                      "UNKNOWN_TYPE",
                                      "ROUTER",
                                      "COMBINER",
                                      "MODEL",
                                      "TRANSFORMER",
                                      "OUTPUT_TRANSFORMER",
                                    ],
                                    type: "string",
                                  },
                                  methods: {
                                    type: "array",
                                    items: {
                                      enum: [
                                        "TRANSFORM_INPUT",
                                        "TRANSFORM_OUTPUT",
                                        "ROUTE",
                                        "AGGREGATE",
                                        "SEND_FEEDBACK",
                                      ],
                                      type: "string",
                                    },
                                  },
                                },
                              },
                              type: "array",
                            },
                            endpoint: {
                              properties: {
                                service_host: {
                                  type: "string",
                                },
                                service_port: {
                                  type: "integer",
                                },
                                type: {
                                  enum: [
                                    "REST",
                                    "GRPC",
                                  ],
                                  type: "string",
                                },
                              },
                            },
                            name: {
                              type: "string",
                            },
                            implementation: {
                              enum: [
                                "UNKNOWN_IMPLEMENTATION",
                                "SIMPLE_MODEL",
                                "SIMPLE_ROUTER",
                                "RANDOM_ABTEST",
                                "AVERAGE_COMBINER",
                              ],
                              type: "string",
                            },
                            type: {
                              enum: [
                                "UNKNOWN_TYPE",
                                "ROUTER",
                                "COMBINER",
                                "MODEL",
                                "TRANSFORMER",
                                "OUTPUT_TRANSFORMER",
                              ],
                              type: "string",
                            },
                            methods: {
                              type: "array",
                              items: {
                                enum: [
                                  "TRANSFORM_INPUT",
                                  "TRANSFORM_OUTPUT",
                                  "ROUTE",
                                  "AGGREGATE",
                                  "SEND_FEEDBACK",
                                ],
                                type: "string",
                              },
                            },
                          },
                        },
                        name: {
                          type: "string",
                        },
                        componentSpecs:
                          {
                            description: "List of pods belonging to the predictor",
                            type: "array",
                            items: podTemplateValidation,
                          },
                        replicas: {
                          type: "integer",
                        },
                        labels: {
                          description: "labels to be attached to entry deplyment for this predictor",
                          type: "object",
                        },
                        svcOrchSpec: {
                          description: "Configuration for the service orchestrator",
                          type: "object",
                          properties: {
                            resources: {
                              description: "ResourceRequirements describes the compute resource requirements.",
                              properties: {
                                requests: {
                                  additionalProperties: true,
                                  type: "object",
                                  description: "Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/",
                                },
                                limits: {
                                  additionalProperties: true,
                                  type: "object",
                                  description: "Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/",
                                },
                              },
                            },
                            env: {
                              items: {
                                required: [
                                  "name",
                                ],
                                description: "EnvVar represents an environment variable present in a Container.",
                                properties: {
                                  valueFrom: {
                                    description: "EnvVarSource represents a source for the value of an EnvVar.",
                                    properties: {
                                      secretKeyRef: {
                                        required: [
                                          "key",
                                        ],
                                        description: "SecretKeySelector selects a key of a Secret.",
                                        properties: {
                                          optional: {
                                            type: "boolean",
                                            description: "Specify whether the Secret or it's key must be defined",
                                          },
                                          name: {
                                            type: "string",
                                            description: "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                          },
                                          key: {
                                            type: "string",
                                            description: "The key of the secret to select from.  Must be a valid secret key.",
                                          },
                                        },
                                      },
                                      fieldRef: {
                                        required: [
                                          "fieldPath",
                                        ],
                                        description: "ObjectFieldSelector selects an APIVersioned field of an object.",
                                        properties: {
                                          fieldPath: {
                                            type: "string",
                                            description: "Path of the field to select in the specified API version.",
                                          },
                                          apiVersion: {
                                            type: "string",
                                            description: 'Version of the schema the FieldPath is written in terms of, defaults to "v1".',
                                          },
                                        },
                                      },
                                      resourceFieldRef: {
                                        required: [
                                          "resource",
                                        ],
                                        description: "ResourceFieldSelector represents container resources (cpu, memory) and their output format",
                                        properties: {
                                          containerName: {
                                            type: "string",
                                            description: "Container name: required for volumes, optional for env vars",
                                          },
                                          resource: {
                                            type: "string",
                                            description: "Required: resource to select",
                                          },
                                          divisor: {
                                            type: "string",
                                          },
                                        },
                                      },
                                      configMapKeyRef: {
                                        required: [
                                          "key",
                                        ],
                                        description: "Selects a key from a ConfigMap.",
                                        properties: {
                                          optional: {
                                            type: "boolean",
                                            description: "Specify whether the ConfigMap or it's key must be defined",
                                          },
                                          name: {
                                            type: "string",
                                            description: "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                          },
                                          key: {
                                            type: "string",
                                            description: "The key to select.",
                                          },
                                        },
                                      },
                                    },
                                  },
                                  name: {
                                    type: "string",
                                    description: "Name of the environment variable. Must be a C_IDENTIFIER.",
                                  },
                                  value: {
                                    type: "string",
                                    description: 'Variable references $(VAR_NAME) are expanded using the previous defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to "".',
                                  },
                                },
                              },
                              type: "array",
                              description: "List of environment variables to set in the container. Cannot be updated.",
                              "x-kubernetes-patch-strategy": "merge",
                              "x-kubernetes-patch-merge-key": "name",
                            },
                          },
                        },
                      },
                    },
                    type: "array",
                  },
                },
              },
            },
          },
        },
        version: "v1alpha2",
        subresources: {
          status: {},
        },
      },
    },

}

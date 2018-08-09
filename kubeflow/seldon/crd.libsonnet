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
                        replicas: {
                          type: "integer",
                        },
                      },
                    },
                    type: "array",
                  },
                  componentSpec: podTemplateValidation,

                },
              },
            },
          },
        },
        version: "v1alpha1",
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
                        replicas: {
                          type: "integer",
                        },
                      },
                    },
                    type: "array",
                  },
                  componentSpecs:
                    {
                      description: "List of pods belonging to the predictor",
                      type: "array",
                      items: podTemplateValidation,
                    },
                },
              },
            },
          },
        },
        version: "v1alpha2",
      },
    },

}

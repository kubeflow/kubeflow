{
  local util = import "kubeflow/core/util.libsonnet",

  new(_env, _params):: {
    local params = _env + _params,

    local ensemblesCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "ensembles.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "ensembles",
          singular: "ensemble",
          kind: "Ensemble",
          shortNames: [
            "prj",
          ],
        },
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
                  selector: {
                    type: "object",
                  },
                  template: {
                    type: "object",
                    properties: {
                      metadata: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                        },
                      },
                      spec: {
                        type: "object",
                        properties: {
                          namespace: {
                            type: "string",
                          },
                          owner: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
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
      },
    },
    ensemblesCRD:: ensemblesCRD,

    local compositionsCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "compositions.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "compositions",
          singular: "composition",
          kind: "Composition",
        },
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
                  selector: {
                    type: "object",
                  },
                  namespace: {
                    type: "string",
                  },
                  owner: {
                    type: "string",
                  },
                },
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
      },
    },
    compositionsCRD:: compositionsCRD,

    local permissionsCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "permissions.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "permissions",
          singular: "permission",
          kind: "Permission",
        },
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
                  selector: {
                    type: "object",
                  },
                  owner: {
                    type: "string",
                  },
                },
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
      },
    },
    permissionsCRD:: permissionsCRD,

    local ensemblesService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "ensembles",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          app: "ensembles",
        },
        ports: [
          {
            port: 80,
            targetPort: 8080,
          },
        ],
      },
    },
    ensemblesService:: ensemblesService,

    local ensemblesRole = {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "Role",
      metadata: {
        name: "view",
        namespace: params.namespace,
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
    },
    ensemblesRole:: ensemblesRole,

    local ensemblesConfigMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "ensembles",
        namespace: params.namespace,
      },
      data: {
        "sync-ensemble.jsonnet": importstr "sync-ensemble.jsonnet",
        "sync-composition.jsonnet": importstr "sync-composition.jsonnet",
        "sync-permission.jsonnet": importstr "sync-permission.jsonnet",
      },
    },
    ensemblesConfigMap:: ensemblesConfigMap,

    local ensemblesDeployment = {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: "ensembles",
        namespace: params.namespace,
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
                name: "hooks",
                //freeze latest
                image: "metacontroller/jsonnetd@sha256:25c25f217ad030a0f67e37078c33194785b494569b0c088d8df4f00da8fd15a0",
                imagePullPolicy: "Always",
                workingDir: "/opt/ensembles/hooks",
                volumeMounts: [
                  {
                    name: "hooks",
                    mountPath: "/opt/ensembles/hooks",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "hooks",
                configMap: {
                  name: "ensembles",
                },
              },
            ],
          },
        },
      },
    },
    ensemblesDeployment:: ensemblesDeployment,

    local ensemblesController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "ensembles-controller",
      },
      spec: {
        generateSelector: true,
        parentResource: {
          apiVersion: "kubeflow.org/v1alpha1",
          resource: "ensembles",
        },
        childResources: [
          {
            apiVersion: "kubeflow.org/v1alpha1",
            resource: "compositions",
          },
        ],
        hooks: {
          sync: {
            webhook: {
              url: "http://ensembles." + params.namespace + "/sync-ensemble",
            },
          },
        },
      },
    },
    ensemblesController:: ensemblesController,

    local compositionsController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "compositions-controller",
      },
      spec: {
        generateSelector: true,
        parentResource: {
          apiVersion: "kubeflow.org/v1alpha1",
          resource: "compositions",
        },
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
        hooks: {
          sync: {
            webhook: {
              url: "http://ensembles." + params.namespace + "/sync-composition",
            },
          },
        },
      },
    },
    compositionsController:: compositionsController,

    local permissionsController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "permissions-controller",
      },
      spec: {
        generateSelector: true,
        parentResource: {
          apiVersion: "kubeflow.org/v1alpha1",
          resource: "permissions",
        },
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
        hooks: {
          sync: {
            webhook: {
              url: "http://ensembles." + params.namespace + "/sync-permission",
            },
          },
        },
      },
    },
    permissionsController:: permissionsController,

    parts:: self,
    local all = [
      self.ensemblesCRD,
      self.compositionsCRD,
      self.permissionsCRD,
      self.ensemblesService,
      self.ensemblesRole,
      self.ensemblesConfigMap,
      self.ensemblesDeployment,
      self.ensemblesController,
      self.compositionsController,
      self.permissionsController,
    ],
    all:: all,

    list(obj=self.all):: util.list(obj),
  },
}

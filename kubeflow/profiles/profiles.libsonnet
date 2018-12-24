{
  local util = import "kubeflow/common/util.libsonnet",

  new(_env, _params):: {
    local params = _params + _env,

    local profilesCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "profiles.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "profiles",
          singular: "profile",
          kind: "Profile",
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
                          namespace: {
                            type: "string",
                          },
                        },
                      },
                      spec: {
                        type: "object",
                        properties: {
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
    profilesCRD:: profilesCRD,

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

    local profilesService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "profiles",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          app: "profiles",
        },
        ports: [
          {
            port: 80,
            targetPort: 8080,
          },
        ],
      },
    },
    profilesService:: profilesService,

    local profilesRole = {
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
            "profiles",
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
    },
    profilesRole:: profilesRole,

    local profilesConfigMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "profiles",
        namespace: params.namespace,
      },
      data: {
        "sync-profile.jsonnet": importstr "sync-profile.jsonnet",
        "sync-permission.jsonnet": importstr "sync-permission.jsonnet",
      },
    },
    profilesConfigMap:: profilesConfigMap,

    local profilesDeployment = {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: "profiles",
        namespace: params.namespace,
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
                name: "hooks",
                //freeze latest
                image: params.image,
                imagePullPolicy: "Always",
                workingDir: "/opt/profiles/hooks",
                volumeMounts: [
                  {
                    name: "hooks",
                    mountPath: "/opt/profiles/hooks",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "hooks",
                configMap: {
                  name: "profiles",
                },
              },
            ],
          },
        },
      },
    },
    profilesDeployment:: profilesDeployment,

    local profilesController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "profiles-controller",
      },
      spec: {
        generateSelector: true,
        parentResource: {
          apiVersion: "kubeflow.org/v1alpha1",
          resource: "profiles",
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
              url: "http://profiles." + params.namespace + "/sync-profile",
            },
          },
        },
      },
    },
    profilesController:: profilesController,

    local permissionsController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "permissions-controller",
        annotations: params,
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
              url: "http://profiles." + params.namespace + "/sync-permission",
            },
          },
        },
      },
    },
    permissionsController:: permissionsController,

    parts:: self,
    local all = [
      self.profilesCRD,
      self.permissionsCRD,
      self.profilesService,
      self.profilesRole,
      self.profilesConfigMap,
      self.profilesDeployment,
      self.profilesController,
      self.permissionsController,
    ],
    all:: all,

    list(obj=self.all):: util.list(obj),
  },
}

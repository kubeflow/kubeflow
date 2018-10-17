{
  // Implements [Kubernetes Application API draft-20180115](https://github.com/kow3ns/community/blob/8cb87419883197032f4e5cce8d5518c9c5792f6c/keps/sig-apps/0003-kubernetes-application-api.md)
  local k8s = import "k8s.libsonnet",
  local util = import "kubeflow/core/util.libsonnet",
  local crd = k8s.apiextensions.v1beta1.customResourceDefinition,

  new(_env, _params):: {
    local params = _env + _params {
      namespace:
        if std.objectHas(_params, "namespace") &&
           _params.namespace != "null" then
          _params.namespace else _env.namespace,
      labels: {
        app: _params.name,
      },
      bootstrap: util.toBool(_params.bootstrap),
    },

    // see [API](https://github.com/kow3ns/community/blob/8cb87419883197032f4e5cce8d5518c9c5792f6c/keps/sig-apps/0003-kubernetes-application-api.md#api)
    local openApiV3Schema = {
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
            componentKinds: {
              items: {
                type: "object",
              },
              type: "array",
            },
            description: {
              type: "string",
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
                          key: {
                            type: "string",
                          },
                        },
                        type: "object",
                      },
                      ingressRef: {
                        properties: {
                          host: {
                            type: "string",
                          },
                          path: {
                            type: "string",
                          },
                        },
                        type: "object",
                      },
                      secretKeyRef: {
                        properties: {
                          key: {
                            type: "string",
                          },
                        },
                        type: "object",
                      },
                      serviceRef: {
                        properties: {
                          path: {
                            type: "string",
                          },
                          port: {
                            type: "int32",
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
            descriptor: {
              type: "object",
              properties: {
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
                    type: "string",
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
            },
          },
        },
        status: {
          properties: {
            observedGeneration: {
              type: "string",
              format: "int64",
            },
            assemblyPhase: {
              type: "string",
            },
            installed: {
              items: {
                type: "string",
              },
              type: "array",
            },
            ready: {
              type: "string",
            },
          },
          type: "object",
        },
      },
    },

    local applicationCRD =
      crd.new() + crd.mixin.metadata.
        withName("applications.app.k8s.io").
        withLabelsMixin({ api: "default" }) +
      crd.mixin.spec.
        withGroup("app.k8s.io").
        withVersion("v1beta1").
        withScope("Namespaced") +
      crd.mixin.spec.names.
        withKind("Application").
        withPlural("applications").
        withSingular("application") +
      crd.mixin.spec.validation.
        withOpenApiV3Schema(openApiV3Schema),
    applicationCRD:: applicationCRD,

    local application = {
      apiVersion: "app.k8s.io/v1beta1",
      kind: "Application",
      metadata: {
        name: params.name,
        labels: {
          app: params.name,
          "app.kubernetes.io/name": params.name,
        },
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            "app.kubernetes.io/name": params.name,
          },
        },
        componentKinds+: std.map(byComponent, tuples),
        descriptor: {
          type: params.type,
          version: params.version,
          description: "",
          icons: [],
          maintainers: [],
          owners: [],
          keywords: [],
          links: [],
          notes: "",
        },
        info: [],
        assemblyPhase: "Succeeded",
      },
    },
    application:: application,

    local generateComponentTuples(resource) = {
      local name =
        if std.objectHas(resource.metadata, "name") then
          resource.metadata.name
        else null,
      local gname = std.split(resource.apiVersion, "/")[0],
      local groupKindAndResource = {
        tuple: [
          { name: name },
          if gname != "v1" then {
            group: gname,
            kind: resource.kind,
          } else {
            kind: resource.kind,
          },
          resource,
        ],
      },
      return:: groupKindAndResource,
    }.return,

    local perComponent(name) = {
      local list = std.extVar("__ksonnet/components"),
      return::
        if std.objectHas(list, name) &&
           std.objectHas(list[name], "items") &&
           std.type(list[name].items) == "array" then
          std.filter(byPrivileged(params.bootstrap), 
            std.map(generateComponentTuples, list[name].items))
        else
          [],
    }.return,

    local byResource(wrapper) = {
      local tuple = wrapper.tuple,
      local resource = tuple[2],
      return:: resource {
        metadata+: {
          annotations+: {
            "kubernetes.io/application": params.name,
          },
          labels+: {
            "app.kubernetes.io/name": params.name,
            "app.kubernetes.io/component": resource.metadata.name,
            app: params.name,
            component: resource.metadata.name,
          },
        },
      },
    }.return,

    local byComponent(wrapper) = {
      local tuple = wrapper.tuple,
      local name = tuple[0].name,
      local groupKind = tuple[1],
      local component = {
        [name]: groupKind,
      },
      return:: component,
    }.return,

    local getComponents = {
      local exclude(name) = {
        return::
          if name == params.name then
            false
          else
            true,
      }.return,
      return::
        std.filter(exclude, std.objectFields(std.extVar("__ksonnet/components"))),
    }.return,

    local tuples = std.flattenArrays(std.map(perComponent, getComponents)),
    local components = std.map(byResource, tuples),

    local byPrivileged(yesorno) = {
      local privileged(maybeWrapper) = {
        local resource = 
          if std.objectHas(maybeWrapper, "tuple") then 
            maybeWrapper.tuple[2]
          else
            maybeWrapper,
        return::
          if std.objectHas(resource, "metadata") &&
             !std.objectHas(resource.metadata, "namespace") then
            yesorno
          else
            !yesorno,
      }.return,
      return:: privileged,
    }.return,

    local all = components + [
      self.applicationCRD,
      self.application,
    ],
    all:: std.filter(byPrivileged(params.bootstrap), all),

    list(obj=self.all):: util.list(obj),
  },
}

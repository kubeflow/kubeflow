{
  // Implements [Kubernetes Application API draft-20180115](https://github.com/kow3ns/community/blob/8cb87419883197032f4e5cce8d5518c9c5792f6c/keps/sig-apps/0003-kubernetes-application-api.md)
  local k8s = import "k8s.libsonnet",
  local util = import "kubeflow/core/util.libsonnet",
  local crd = k8s.apiextensions.v1beta1.customResourceDefinition,

  new(_env, _params):: {
    local params = _env + _params {
      labels: {
        app: _params.name,
      },
      emitCRD: util.toBool(_params.emitCRD),
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
            type: {
              type: "string",
            },
            components: {
              type: "array",
              items: {
                type: "object",
              },
            },
            dependencies: {
              type: "array",
              items: {
                type: "string",
              },
            },
            selector: {
              type: "object",
            },
            healthCheck: {
              type: "string",
            },
            version: {
              type: "string",
            },
            description: {
              type: "string",
            },
            maintainers: {
              type: "array",
              items: {
                type: "string",
              },
            },
            owners: {
              type: "array",
              items: {
                type: "string",
              },
            },
            keywords: {
              type: "array",
              items: {
                type: "string",
              },
            },
            links: {
              type: "array",
              items: {
                type: "object",
              },
            },
            info: {
              type: "array",
              items: {
                type: "object",
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

    local applicationCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "applications.app.k8s.io",
        labels: {
          api: "default",
        },
      },
      spec: {
        group: "app.k8s.io",
        version: "v1beta1",
        scope: "Namespaced",
        names: {
          plural: "applications",
          singular: "application",
          kind: "Application",
        },
        validation: {
          openAPIV3Schema: openApiV3Schema,
        },
      },
    },
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
        type: params.type,
        components+: std.map(byComponent, tuples),
        dependencies: [],
        selector: {
          matchLabels: {
            "app.kubernetes.io/name": params.name,
          },
        },
        healthCheck: "",
        version: params.version,
        description: "",
        maintainers: [],
        owners: [],
        keywords: [],
        links: [],
        info: [],
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
          std.map(generateComponentTuples, list[name].items)
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
      local isEmpty =
        if std.length(params.components) == 0 then
          true
        else
          false,
      local exclude(name) = {
        return::
          if name == params.name then
            false
          else
            true,
      }.return,
      return::
        if isEmpty then
          std.filter(exclude, std.objectFields(std.extVar("__ksonnet/components")))
        else
          params.components,
    }.return,

    local tuples = std.flattenArrays(std.map(perComponent, getComponents)),
    local components = std.map(byResource, tuples),

    parts:: self,
    all:: [
      if params.emitCRD then
        self.applicationCRD,
      self.application,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

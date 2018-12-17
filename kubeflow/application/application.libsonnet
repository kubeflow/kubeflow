{
  // Implements [Kubernetes Application API 
  local k8s = import "k8s.libsonnet",
  local util = import "kubeflow/core/util.libsonnet",
  local crd = k8s.apiextensions.v1beta1.customResourceDefinition,

  new(_env, _params):: {
    local params = _params + _env {
      labels: {
        app: _params.name,
      },
      emitCRD: util.toBool(_params.emitCRD),
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
          openAPIV3Schema: (import "application.schema"),
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
        if std.type(list) == "object" &&
           std.objectHas(list, name) &&
           std.type(list[name]) == "object" &&
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

    local groupByName(resources) = {
      [resource.name]+: resource
      for resource in resources
    },

    local groupByResource(tuples) = {
      local getKey(wrapper) = {
        local tuple = wrapper.tuple,
        local resource = tuple[2],
        return::
          resource.kind + "." + resource.apiVersion,
      }.return,
      local getValue(wrapper) = {
        local tuple = wrapper.tuple,
        return::
          { [tuple[0].name]+: tuple[2] },
      }.return,
      return:: util.foldl(getKey, getValue, tuples),
    }.return,

    local tuples = std.flattenArrays(std.map(perComponent, getComponents)) + 
      [ generateComponentTuples(self.applicationController) ],
    local components = std.map(byResource, tuples),
    local resources = groupByResource(tuples),

    local applicationConfigMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "application-controller-hooks",
        namespace: params.namespace,
      },
      data: {
        "sync-application.jsonnet": importstr "sync-application.jsonnet",
        "util.libsonnet": importstr "kubeflow/core/util.libsonnet",
      },
    },
    applicationConfigMap:: applicationConfigMap,

    local applicationDeployment = {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "application-controller",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "application-controller",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "application-controller",
            },
          },
          spec: {
            containers: [
              {
                name: "hooks",
                image: "metacontroller/jsonnetd:0.1",
                imagePullPolicy: "Always",
                workingDir: "/opt/isolation/operator/hooks",
                volumeMounts: [
                  {
                    name: "hooks",
                    mountPath: "/opt/isolation/operator/hooks",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "hooks",
                configMap: {
                  name: "application-controller-hooks",
                },
              },
            ],
          },
        },
      },
    },
    applicationDeployment:: applicationDeployment,

    local applicationService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "application-controller",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          app: "application-controller",
        },
        ports: [
          {
            port: 80,
            targetPort: 8080,
          },
        ],
      },
    },
    applicationService:: applicationService,

    local forChildResources(wrapper) = {
      local tuple = wrapper.tuple,
      local resource = tuple[2],
      local childResource = {
        apiVersion: resource.apiVersion,
        resource: util.lower(resource.kind) + "s",
      },
      return:: childResource,
    }.return,

    local applicationController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "application-controller",
        annotations: {
          resources: resources,
          components: components,
        },
      },
      spec: {
        generateSelector: true,
        parentResource: {
          apiVersion: "app.k8s.io/v1beta1",
          resource: "applications",
        },
        local getKey(resource) = resource.resource + "." + resource.apiVersion,
        local getValue(resource) = resource,
        local childResources = std.map(forChildResources, tuples),
        local childResourcesMap = util.foldl(getKey, getValue, childResources),
        childResources: [childResourcesMap[key] for key in std.objectFields(childResourcesMap)],
        hooks: {
          sync: {
            webhook: {
              url: "http://application-controller." + params.namespace + "/sync-application",
            },
          },
        },
      },
    },
    applicationController:: applicationController,

    parts:: self,
    all:: [
      if params.emitCRD then
        self.applicationCRD,
      self.applicationConfigMap,
      self.applicationDeployment,
      self.applicationService,
      self.application,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

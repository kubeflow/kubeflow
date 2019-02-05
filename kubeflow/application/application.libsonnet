{
  // Implements Kubernetes Application API
  local k8s = import "k8s.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  local crd = k8s.apiextensions.v1beta1.customResourceDefinition,

  new(_env, _params):: {
    local params = _params + _env {
      labels: {
        app: _params.name,
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
          "app.kubernetes.io/name": params.name,
          "app.kubernetes.io/version": params.version,
        },
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            "app.kubernetes.io/name": params.name,
          },
        },
        local getKey(resource) = resource.key,
        local getValue(resource) = resource.groupkind,
        local componentKindResources = std.filterMap(namespacedScope, forComponentKinds, tuples),
        local componentKindMap = util.foldl(getKey, getValue, componentKindResources),
        componentKinds+: [componentKindMap[key] for key in std.objectFields(componentKindMap)],
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
      local label = {
        metadata+: {
          labels+: {
            "app.kubernetes.io/name": params.name,
          },
        },
      },
      local childLabel(resource) = {
        return::
          if std.type(resource) == "object" &&
            std.objectHas(resource, "spec") &&
            std.type(resource.spec) == "object" &&
            std.objectHas(resource.spec, "template") &&
            std.type(resource.spec.template) == "object" &&
            std.objectHas(resource.spec.template, "metadata") then {
            spec+: {
              template+: {
                metadata+: {
                  labels+: {
                    "app.kubernetes.io/name": params.name,
                  },
                },
              },
            }
          } else {},
      }.return,
      return:: resource + label + childLabel(resource),
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

    local groupByResource(resources) = {
      local getKey(resource) = {
        return::
          resource.kind,
      }.return,
      local getValue(resource) = {
        return::
          { [resource.metadata.name]+: resource },
      }.return,
      return:: util.foldl(getKey, getValue, resources),
    }.return,

    local clusterScope(wrapper) = {
      local tuple = wrapper.tuple,
      local resource = tuple[2],
      return::
        if (std.objectHas(resource, "metadata") &&
            !std.objectHas(resource.metadata, "namespace")) then
          true
        else
          false,
    }.return,

    local namespacedScope(wrapper) = {
      return:: clusterScope(wrapper) == false,
    }.return,

    local tuples = std.flattenArrays(std.map(perComponent, getComponents)),
    local clusterResources = std.filterMap(clusterScope, byResource, tuples),
    local namespacedResources = std.filterMap(namespacedScope, byResource, tuples),

    local simplifiedResources = std.map(util.getApiVersionKindAndMetadata, namespacedResources),
    local groupedSimplifiedResources = groupByResource(simplifiedResources),

    local syncApplicationTemplate = importstr "sync-application.template",
    local syncApplication = syncApplicationTemplate % {
      resources: std.manifestJsonEx(simplifiedResources, "  "),
      groupedResources: std.manifestJsonEx(groupedSimplifiedResources, "  "),
      extendedInfo: params.extendedInfo,
    },

    local applicationConfigMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: params.name + "-controller-hooks",
        namespace: params.namespace,
      },
      data: {
        "sync-application.jsonnet": syncApplication,
        "util.libsonnet": importstr "kubeflow/common/util.libsonnet",
      },
    },
    applicationConfigMap:: applicationConfigMap,

    local applicationDeployment = {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: params.name + "-controller",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: params.name + "-controller",
          },
        },
        template: {
          metadata: {
            labels: {
              app: params.name + "-controller",
            },
          },
          spec: {
            containers: [
              {
                name: "hooks",
                image: "metacontroller/jsonnetd@sha256:25c25f217ad030a0f67e37078c33194785b494569b0c088d8df4f00da8fd15a0",
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
                  name: params.name + "-controller-hooks",
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
        name: params.name + "-controller",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          app: params.name + "-controller",
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

    local getApiVersion(resource) = {
      local kindMapping = {
        Deployment: "apps/v1",
        Batch: "batch/v1",
        Role: "rbac.authorization.k8s.io/v1",
        RoleBinding: "rbac.authorization.k8s.io/v1",
      },
      return::
        if std.objectHas(kindMapping, resource.kind) then
          kindMapping[resource.kind]
        else
          resource.apiVersion,
    }.return,

    local forChildResources(wrapper) = {
      local tuple = wrapper.tuple,
      local resource = tuple[2],
      local childResource = {
        apiVersion: getApiVersion(resource),
        resource: std.asciiLower(resource.kind) + "s",
        updateStrategy: {
          method: "InPlace",
        },
      },
      return:: childResource,
    }.return,

    local forComponentKinds(wrapper) = {
      local tuple = wrapper.tuple,
      local resource = tuple[2],
      local componentKind = {
        key: std.asciiLower(resource.kind) + "s." + getApiVersion(resource),
        groupkind: {
          group: getApiVersion(resource),
          kind: resource.kind,
        },
      },
      return:: componentKind,
    }.return,

    local applicationController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: params.name + "-controller",
      },
      spec: {
        resyncPeriodSeconds: 10,
        parentResource: {
          apiVersion: "app.k8s.io/v1beta1",
          resource: "applications",
        },
        local getKey(resource) = resource.resource + "." + resource.apiVersion,
        local getValue(resource) = resource,
        local childResources = std.filterMap(namespacedScope, forChildResources, tuples),
        local childResourcesMap = util.foldl(getKey, getValue, childResources),
        childResources: [childResourcesMap[key] for key in std.objectFields(childResourcesMap)],
        hooks: {
          sync: {
            webhook: {
              url: "http://" + params.name + "-controller." + params.namespace + "/sync-application",
            },
          },
        },
      },
    },
    applicationController:: applicationController,

    parts:: self,
    all:: std.flattenArrays(
      [
        clusterResources,
        namespacedResources,
        [
          self.applicationCRD,
          self.applicationConfigMap,
          self.applicationDeployment,
          self.applicationService,
          self.applicationController,
          self.application,
        ],
      ],
    ),

    list(obj=self.all):: util.list(obj),
  },
}

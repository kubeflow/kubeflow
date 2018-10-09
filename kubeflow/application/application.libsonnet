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
      metacontroller: util.toBool(_params["install-metacontroller"]),
      labels: {
        app: _params.name,
      },
    },

    local compositeControllerCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "compositecontrollers.metacontroller.k8s.io",
        annotations: {
          group: "metacontroller",
        },
      },
      spec: {
        group: "metacontroller.k8s.io",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "compositecontrollers",
          singular: "compositecontroller",
          kind: "CompositeController",
          shortNames: [
            "cc",
            "cctl",
          ],
        },
      },
    },
    compositeControllerCRD:: compositeControllerCRD,

    local decoratorControllerCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "decoratorcontrollers.metacontroller.k8s.io",
        annotations: {
          group: "metacontroller",
        },
      },
      spec: {
        group: "metacontroller.k8s.io",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "decoratorcontrollers",
          singular: "decoratorcontroller",
          kind: "DecoratorController",
          shortNames: [
            "dec",
            "decorators",
          ],
        },
      },
    },
    decoratorControllerCRD:: decoratorControllerCRD,

    local controllerRevisionsCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "controllerrevisions.metacontroller.k8s.io",
        annotations: {
          group: "metacontroller",
        },
      },
      spec: {
        group: "metacontroller.k8s.io",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "controllerrevisions",
          singular: "controllerrevision",
          kind: "ControllerRevision",
        },
      },
    },
    controllerRevisionsCRD:: controllerRevisionsCRD,

    local metaControllerServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "meta-controller-service",
        namespace: params.namespace,
        annotations: {
          group: "metacontroller",
        },
      },
    },
    metaControllerServiceAccount:: metaControllerServiceAccount,

    local metaControllerClusterRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "meta-controller-cluster-role-binding",
        annotations: {
          group: "metacontroller",
        },
      },
      roleRef: {
        kind: "ClusterRole",
        name: "cluster-admin",
        apiGroup: "rbac.authorization.k8s.io",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "meta-controller-service",
          namespace: params.namespace,
        },
      ],
    },
    metaControllerClusterRoleBinding:: metaControllerClusterRoleBinding,

    local metaControllerStatefulSet = {
      apiVersion: "apps/v1beta2",
      kind: "StatefulSet",
      metadata: {
        name: "metacontroller",
        namespace: params.namespace,
        labels: {
          app: "metacontroller",
        },
        annotations: {
          group: "metacontroller",
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: "metacontroller",
          },
        },
        serviceName: "",
        template: {
          metadata: {
            labels: {
              app: "metacontroller",
            },
          },
          spec: {
            serviceAccountName: "meta-controller-service",
            containers: [
              {
                name: "metacontroller",
                command: [
                  "/usr/bin/metacontroller",
                  "--logtostderr",
                  "-v=4",
                  "--discovery-interval=20s",
                ],
                image: "metacontroller/metacontroller:0.2.0",
                ports: [
                  {
                    containerPort: 2345,
                  },
                ],
                imagePullPolicy: "Always",
                resources: {
                  limits: {
                    cpu: "4",
                    memory: "4Gi",
                  },
                  requests: {
                    cpu: "500m",
                    memory: "1Gi",
                  },
                },
                securityContext: {
                  privileged: true,
                  allowPrivilegeEscalation: true,
                },
              },
            ],
          },
        },
      },
    },
    metaControllerStatefulSet:: metaControllerStatefulSet,

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
        withNamespace(params.namespace).
        withLabelsMixin({
        api: "default",
        "kubebuilder.k8s.io": "0.1.10",
      }).
        withAnnotationsMixin({
        group: "metacontroller",
      }) +
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
        },
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            "app.kubernetes.io/name": params.type,
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

    local groupByName(components) = {
      [resource.name]+: resource
      for resource in components
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

    local tuples = std.flattenArrays(std.map(perComponent, getComponents)),
    local components = std.map(byResource, tuples),
    local resources = groupByResource(tuples),

    local syncApplication =
      |||
        function(request) {
          local util = import "util.libsonnet",
          local resources = %(resources)s,
          local components = %(components)s,
          local filteredComponents = std.filter(validateResource, %(components)s),
          local validateResource(resource) = {
            return::
              if std.type(resource) == "object" &&
              std.objectHas(resource, 'kind') &&
              std.objectHas(resource, 'apiVersion') &&
              std.objectHas(resource, 'metadata') &&
              std.objectHas(resource.metadata, 'name') &&
              std.objectHas(resource.metadata, 'namespace') &&
              resource.metadata.namespace == request.parent.metadata.namespace then
                true
              else
                false
          }.return,
          local existingGroups(obj) =
            if std.type(obj) == "object" then
              [ obj[key] for key in std.objectFields(obj) ]
            else
              [],
          local existingResources(group) =
            if std.type(group) == "object" then
              [ group[key] for key in std.objectFields(group) ]
            else
              [],
          local continuation(resources) = {
            local existingResource(resource) = {
              local resourceExists(kindAndResource, name) = {
                return::
                  if std.objectHas(resources, kindAndResource) &&
                  std.objectHas(resources[kindAndResource], name) then
                    true
                  else
                    false,
              }.return,
              return::
                if validateResource(resource) then 
                  resourceExists(resource.kind + "." + resource.apiVersion, resource.metadata.name)
                else
                  false,
            }.return,
            return:: existingResource,
          }.return,
          local foundChildren = 
            std.filter(continuation(resources), 
              std.flattenArrays(std.map(existingResources, existingGroups(request.children)))),
          local comparator(a, b) = {
            return::
              if a.metadata.name == b.metadata.name then
                0
              else if a.metadata.name < b.metadata.name then
                -1
              else
                1,
          }.return,
          local missingChildren = {
            return::
              if std.type(filteredComponents) == "array" &&
              std.type(foundChildren) == "array" then
                util.setDiff(util.sort(filteredComponents, comparator), 
                  util.sort(foundChildren, comparator), comparator)
              else
                [],
          }.return,
          local initialized = {
            return::
              if std.objectHas(request.parent, "status") &&
                 std.objectHas(request.parent.status, "created") &&
                 request.parent.status.created == true then
                true
              else
                false,
          }.return,
          local desired =
            if std.length(foundChildren) == 0 then
              if initialized == false then
                components
              else
                []
            else
              foundChildren,
          local assemblyPhase = {
            return::
              if std.length(foundChildren) == std.length(filteredComponents) then
                "Succeeded"
              else
                "Pending",
          }.return,
          local installedName(resource) = {
            return::
             util.lower(resource.kind) + "s" + "/" + resource.metadata.name,
          }.return,
          children: desired,
          status: {
            observedGeneration: '1',
            assemblyPhase: assemblyPhase,
            installed: std.map(installedName, foundChildren),
            ready: "True",
            created: true,
            //debug
            request_children_length: std.length(request.children),
            found_children_length: std.length(foundChildren),
            components_length: std.length(components),
            filtered_components_length: std.length(filteredComponents),
            missing_children_length: std.length(missingChildren),
            missing_children: missingChildren,
          },
        }
      ||| %
      {
        components: std.manifestJsonEx(components, "  "),
        resources: std.manifestJsonEx(resources, "  "),
      },

    local applicationConfigmap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "application-operator-hooks",
        namespace: params.namespace,
      },
      data: {
        "sync-application.jsonnet": syncApplication,
        "util.libsonnet": importstr "kubeflow/core/util.libsonnet",
      },
    },
    applicationConfigmap:: applicationConfigmap,

    local applicationDeployment = {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "application-operator",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "application-operator",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "application-operator",
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
                  name: "application-operator-hooks",
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
        name: "application-operator",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          app: "application-operator",
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
              url: "http://application-operator." + params.namespace + "/sync-application",
            },
          },
        },
      },
    },
    applicationController:: applicationController,

    local all = [
      //should be separate component, requires cluster-admin
      self.applicationCRD,
      self.compositeControllerCRD,
      self.controllerRevisionsCRD,
      self.decoratorControllerCRD,
      self.metaControllerServiceAccount,
      self.metaControllerClusterRoleBinding,
      self.metaControllerStatefulSet,
      //application
      self.applicationConfigmap,
      self.applicationDeployment,
      self.applicationService,
      self.applicationController,
      self.application,
    ],

    all:: std.filter(function(resource) {
      return::
        if params.metacontroller == false &&
           std.objectHas(resource, "metadata") &&
           std.objectHas(resource.metadata, "annotations") &&
           std.objectHas(resource.metadata.annotations, "group") &&
           resource.metadata.annotations.group == "metacontroller" then
          false
        else
          true,
    }.return, all),

    list(obj=self.all):: util.list(obj),
  },
}

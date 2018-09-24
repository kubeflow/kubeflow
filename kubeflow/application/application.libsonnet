{
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
    },

    local applicationCrd =
      crd.new() + crd.mixin.metadata.
        withName("applications.app.k8s.io").
        withNamespace(params.namespace).
        withLabelsMixin({
        api: "default",
        "kubebuilder.k8s.io": "0.1.10",
      }) +
      crd.mixin.spec.
        withGroup("app.k8s.io").
        withVersion("v1beta1").
        withScope("Namespaced") +
      crd.mixin.spec.names.
        withKind("Application").
        withPlural("applications").
        withSingular("application"),
    applicationCrd:: applicationCrd,

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
      rest:: groupKindAndResource,
    }.rest,

    local perComponent(pair) = {
      local name = pair[0],
      local componentlib = pair[1],
      local cparams = std.extVar("__ksonnet/params").components[name],
      local instance = componentlib.new(_env, cparams),
      rest:: std.map(generateComponentTuples, instance.all),
    }.rest,

    local byResource(wrapper) = {
      local tuple = wrapper.tuple,
      local resource = tuple[2],
      rest:: resource {
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
    }.rest,

    local byComponent(wrapper) = {
      local tuple = wrapper.tuple,
      local name = tuple[0].name,
      local groupKind = tuple[1],
      local component = {
        [name]: groupKind,
      },
      rest:: component,
    }.rest,

    local tuples = std.flattenArrays(std.map(perComponent, params.components)),

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
        type: "kubeflow",
        selector: {
          matchLabels: {
            "app.kubernetes.io/name": "kubeflow-02",
          },
        },
        components+: std.map(byComponent, tuples),
        version: "0.3",
      },
    },
    application:: application,

    components+: std.map(byResource, tuples),

    local applicationDeployment = {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "application-operator",
        namespace: params.projectNamespace,
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
        namespace: params.projectNamespace,
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
        resource: std.asciiLower(resource.kind) + "s",
      },
      rest:: childResource,
    }.rest,

    local makeKey(resource) =
      resource.resource + "." + resource.apiVersion,

    local applicationController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "application-controller",
        namespace: params.namespace,
      },
      spec: {
        generateSelector: true,
        parentResource: {
          apiVersion: "app.k8s.io/v1beta1",
          resource: "applications",
        },
        local childResources = std.map(forChildResources, tuples),
        local childResourcesMap = util.foldl(makeKey, childResources),
        childResources: [childResourcesMap[key] for key in std.objectFields(childResourcesMap)],
        hooks: {
          sync: {
            webhook: {
              url: "http://application-operator." + params.projectNamespace + "/sync-application",
            },
          },
        },
      },
    },
    applicationController:: applicationController,

    local all = [
      self.applicationCrd,
      self.application,
      self.applicationDeployment,
      self.applicationService,
      self.applicationController,
    ] + self.components,

    all:: all,

    list(obj=self.all):: util.list(obj),
  },
}

{
  local k8s = import "kubeflow/core/k8s.libsonnet",
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
      }) + crd.mixin.spec.
        withGroup("app.k8s.io").
        withVersion("v1beta1").
        withScope("Namespaced") + crd.mixin.spec.names.
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
            "app.kubernetes.io/name": "kubeflow-01",
          },
        },
        components+: std.map(byComponent, tuples),
        version: "0.3",
      },
    },
    application:: application,

/*
---
apiVersion: metacontroller.k8s.io/v1alpha1
kind: CompositeController
metadata:
  name: application-controller
  namespace: isolation-admin
spec:
  generateSelector: true
  parentResource:
    apiVersion: app.k8s.io/v1beta1
    resource: applications
  childResources:
  - apiVersion: app.intelai.org/v1alpha1
    resource: apps
  hooks:
    sync:
      webhook:
        url: http://isolation-operator.isolation-admin/sync-application
---
*/

    components+: std.map(byResource, tuples),

    local all = [
      self.applicationCrd,
      self.application,
    ] + self.components,
    
    all:: all,

    list(obj=self.all):: util.list(obj),
  },
}

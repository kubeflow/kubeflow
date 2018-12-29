// Controller for resource: notebooks
// Creates 2 child resources
// - Service
// - Pod
function(request) {
  local util = import "util.libsonnet",
  local sharedNamespace = request.controller.metadata.annotations.namespace,
  local templateSpec = request.parent.spec.template.spec,
  local podTemplateSpec = {
    containers: [
      {
        args: [
          "start.sh",
          "jupyter",
          "lab",
          "--LabApp.token=''",
          "--LabApp.allow_remote_access='True'",
          "--LabApp.allow_root='True'",
          "--LabApp.ip='*'",
          "--LabApp.base_url=/" + request.parent.metadata.namespace + "/" + request.parent.metadata.name + "/",
          "--port=8888",
          "--no-browser",
        ],
        env: [
          {
            name: "JUPYTER_ENABLE_LAB",
            value: "true",
          },
        ],
        image: "gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.3.0",
        imagePullPolicy: "IfNotPresent",
        name: "notebook",
        ports: [
          {
            containerPort: 8888,
            name: "notebook-port",
            protocol: "TCP",
          },
        ],
        resources: {
          requests: {
            cpu: "500m",
            memory: "1Gi",
          },
        },
        workingDir: "/home/jovyan",
      },
    ],
    restartPolicy: "Always",
    serviceAccount:: {},
    // TODO serviceAccount could be the user in the kubeflow namespace
    // But should probably be the similar to jupyter.
    serviceAccountName:: {},
    automountServiceAccountToken: false,
  },

  local children = [
    {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: " + request.parent.metadata.namespace + "_" + request.parent.metadata.name + "_mapping",
              "prefix: /" + request.parent.metadata.namespace + "/" + request.parent.metadata.name,
              "rewrite: /" + request.parent.metadata.namespace + "/" + request.parent.metadata.name,
              "timeout_ms: 300000",
              "service: " + request.parent.metadata.name + "." + request.parent.metadata.namespace,
            ]),
        },
        name: request.parent.metadata.name,
        namespace: request.parent.metadata.namespace,
      },
      spec: {
        selector: {
          app: request.parent.metadata.name,
        },
        ports: [
          {
            port: 80,
            protocol: "TCP",
            targetPort: 8888,
          },
        ],
        type: "ClusterIP",
      },
    },
    {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: request.parent.metadata.name,
        namespace: request.parent.metadata.namespace,
        labels: {
          app: request.parent.metadata.name,
        },
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: request.parent.metadata.name,
            },
          },
          spec: {
            containers: [
              templateSpec.containers[0] + podTemplateSpec.containers[0],
            ],
          },
        },
      },
    },
  ],
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
  local comparator(a, b) = {
    return::
      if a.metadata.name == b.metadata.name then
        0
      else
        if a.metadata.name < b.metadata.name then
          -1
        else
          1,
  }.return,
  local validateResource(resource) = {
    return::
      if std.type(resource) == "object" &&
         std.objectHas(resource, "kind") &&
         std.objectHas(resource, "apiVersion") &&
         std.objectHas(resource, "metadata") &&
         std.objectHas(resource.metadata, "name") then
        true
      else
        false,
  }.return,
  local validatedChildren = util.sort(std.filter(validateResource, children), comparator),
  local extractGroups(obj) =
    if std.type(obj) == "object" then
      [obj[key] for key in std.objectFields(obj)]
    else
      [],
  local extractResources(group) =
    if std.type(group) == "object" then
      [group[key] for key in std.objectFields(group)]
    else
      [],
  local curryResources(resources, exists) = {
    local existingResource(resource) = {
      local resourceExists(kind, name) = {
        return::
          if std.objectHas(resources, kind) &&
             std.objectHas(resources[kind], name) then
            true
          else
            false,
      }.return,
      return::
        if validateResource(resource) then
          resourceExists(resource.kind, resource.metadata.name)
        else
          false,
    }.return,
    local missingResource(resource) = {
      return::
        existingResource(resource) == false,
    }.return,
    return::
      if exists == true then
        existingResource
      else
        missingResource,
  }.return,
  local requestedChildren = std.flattenArrays(std.map(extractResources, extractGroups(request.children))),
  local groupedRequestedChildren = groupByResource(requestedChildren),
  local missingChildren = util.sort(std.filter(curryResources(groupedRequestedChildren, false), validatedChildren), comparator),
  local desired = requestedChildren + missingChildren,
  children: desired,
  status: {
    phase: "Active",
    conditions: [{
      type: "Ready",
    }],
    created: true,
  },
}

function(request) {
  local params = %(params)s,
  local podTemplateSpec = request.parent.spec.template,
  local existingGroups =
    if std.type(request.children) == "object" then
      [ request.children[key] for key in std.objectFields(request.children) ]
    else
      [],
  local existingResources(group) =
    if std.type(group) == "object" then
      [ group[key] for key in std.objectFields(group) ]
    else
      [],
  local existingResource(resource) = {
    return::
      if std.type(resource) == "object" &&
      std.objectHas(resource, 'metadata') &&
      std.objectHas(resource.metadata, 'name') && 
      std.objectHas(request, 'parent') &&
      std.objectHas(request.parent, 'spec') &&
      std.objectHas(request.parent.spec, 'namespace') &&
      resource.metadata.namespace == request.parent.spec.namespace &&
      resource.metadata.name == request.parent.spec.name then
        true
      else
        false,
  }.return,
  local foundChildren = std.filter(existingResource, 
    std.flattenArrays(std.map(existingResources, existingGroups))),
  local children = [
    {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        annotations: {
          'getambassador.io/config': 
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: notebook-mapping",
              "prefix: /user/",
              "rewrite: /user/",
              "timeout_ms: 300000",
              "service: notebook." + request.parent.metadata.namespace,
            ]),
        },
        labels: {
          app: 'notebook',
        },
        name: 'notebook',
        namespace: request.parent.metadata.namespace,
      },
      spec: {
        ports: [
          {
            port: 80,
            protocol: 'TCP',
            targetPort: 8082,
          },
        ],
        selector: {
          app: 'notebook',
        },
        sessionAffinity: 'None',
        type: 'ClusterIP',
      },
    },
    {
      apiVersion: 'v1',
      kind: 'Pod',
      metadata: {
        labels: {
          component: 'singleuser-server',
        },
        name: 'notebook',
        namespace: request.parent.metadata.namespace,
      },
      spec: podTemplateSpec,
    },
  ],
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
    if std.type(foundChildren) != "array" || std.length(foundChildren) == 0 then
      if initialized == false then
        children
      else
        []
    else
      children,
  children: desired,
  status: {
    phase: "Active",
    conditions: [{
      type: "Ready",
    }],
    created: true,
    // debug
    found_children: std.length(foundChildren),
    desired: std.length(desired),
    request_parent: request.parent,
    request_children: request.children,
  },
}

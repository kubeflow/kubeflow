function(request) {
  local util = import "util.libsonnet",
  local resources = %(resources)s,
  local components = %(components)s,
  local filteredComponents = std.filter(validateResource, components),
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
  local info(resource) = {
    return::
     util.lower(resource.kind) + "s" + "/" + resource.metadata.name,
  }.return,
  children: desired,
  status: {
    observedGeneration: '1',
    assemblyPhase: assemblyPhase,
    ready: "True",
    created: true,
    installed: std.map(info, foundChildren),
    missing: std.map(info, missingChildren),
    counts: {
      components_length: std.length(components),
      filtered_components_length: std.length(filteredComponents),
      request_children_length: std.length(request.children),
      found_children_length: std.length(foundChildren),
      missing_children_length: std.length(missingChildren),
    },
  },
}

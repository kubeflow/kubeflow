function(request) {
  local util = import "util.libsonnet",
  local resources = %(resources)s,
  local children = %(components)s,
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
      std.objectHas(resource, 'kind') &&
      std.objectHas(resource, 'apiVersion') &&
      std.objectHas(resource, 'metadata') &&
      std.objectHas(resource.metadata, 'name') then
        true
      else
        false
  }.return,
  local validatedChildren = util.sort(std.filter(validateResource, children), comparator),
  local extractGroups(obj) =
    if std.type(obj) == "object" then
      [ obj[key] for key in std.objectFields(obj) ]
    else
      [],
  local extractResources(group) =
    if std.type(group) == "object" then
      [ group[key] for key in std.objectFields(group) ]
    else
      [],
  local curryResources(resources) = {
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
  local requestedChildren = 
    std.flattenArrays(std.map(extractResources, extractGroups(request.children))),
  local installedChildren = 
    util.sort(std.filter(curryResources(resources), requestedChildren), comparator),
  local missingChildren = {
    return::
      if std.type(validatedChildren) == "array" &&
        std.type(installedChildren) == "array" then
        util.setDiff(validatedChildren, installedChildren, comparator)
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
  local desired = validatedChildren,
  local assemblyPhase = {
    return::
      if std.length(installedChildren) == std.length(validatedChildren) then
        "Succeeded"
      else
        "Pending",
  }.return,
  local info(resource) = {
    return::
     util.lower(resource.kind) + "s." + resource.apiVersion + "/" + resource.metadata.name,
  }.return,
  children: desired,
  status: {
    assemblyPhase: assemblyPhase,
    ready: "True",
    created: true,
    validated: util.sort(std.map(info, validatedChildren)),
    requested: util.sort(std.map(info, requestedChildren)),
    installed: util.sort(std.map(info, installedChildren)),
    missing: util.sort(std.map(info, missingChildren)),
    counts: {
      children: std.length(children),
      validated_children: std.length(validatedChildren),
      requested_children: std.length(requestedChildren),
      installed_children: std.length(installedChildren),
      missing_children: std.length(missingChildren),
    },
  },
}

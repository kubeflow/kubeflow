// Some useful routines.
{
  local k = import "k.libsonnet",
  local util = self,

  // Convert a string to lower case.
  lower:: function(x) {
    local cp(c) = std.codepoint(c),
    local lowerLetter(c) = if cp(c) >= 65 && cp(c) < 91 then
      std.char(cp(c) + 32)
    else c,
    result:: std.join("", std.map(lowerLetter, std.stringChars(x))),
  }.result,

  // Convert non-boolean types like string,number to a boolean.
  // This is primarily intended for dealing with parameters that should be booleans.
  toBool:: function(x) {
    result::
      if std.type(x) == "boolean" then
        x
      else if std.type(x) == "string" then
        std.asciiUpper(x) == "TRUE"
      else if std.type(x) == "number" then
        x != 0
      else
        false,
  }.result,

  // Convert a comma-delimited string to an Array
  toArray:: function(str) {
    local trim(str) = {
      rest::
        if std.startsWith(str, " ") then
          std.substr(str, 1, std.length(str) - 1)
        else
          str,
    }.rest,
    result::
      if std.type(str) == "string" && str != "null" && std.length(str) > 0 then
        std.map(trim, std.split(str, ","))
      else [],
  }.result,

  foldl:: function(key, value, objs) {
    local aux(arr, i, running) =
      if i >= std.length(arr) then
        running
      else
        aux(arr, i + 1, running { [key(arr[i])]+: value(arr[i]) }) tailstrict,
    return:: aux(objs, 0, {},),
  }.return,

  sort:: function(arr, compare=function(a, b) {
    return::
      if a == b then
        0
      else
        if a < b then
          -1
        else
          1,
  }.return) {
    local _sort(arr, compare) = {
      local l = std.length(arr),
      local f = {
        local pivot = arr[0],
        local rest = std.makeArray(l - 1, function(i) arr[i + 1]),
        local lessorequal(x) = compare(x, pivot) <= 0,
        local greater(x) = compare(x, pivot) > 0,
        local left = _sort(std.filter(lessorequal, rest), compare) tailstrict,
        local right = _sort(std.filter(greater, rest), compare) tailstrict,
        return:: left + [pivot] + right,
      }.return,
      return::
        if l == 0 then
          []
        else
          f,
    }.return,
    return:: _sort(arr, compare),
  }.return,

  setDiff:: function(a, b, compare=function(a, b) {
    return::
      if a == b then
        0
      else if a < b then
        -1
      else
        1,
  }.return) {
    local aux(a, b, i, j, acc) =
      if i >= std.length(a) then
        acc
      else
        if j >= std.length(b) then
          aux(a, b, i + 1, j, acc + [a[i]]) tailstrict
        else
          if compare(a[i], b[j]) == 0 then
            aux(a, b, i + 1, j + 1, acc) tailstrict
          else
            if compare(a[i], b[j]) == -1 then
              aux(a, b, i + 1, j, acc + [a[i]]) tailstrict
            else
              aux(a, b, i, j + 1, acc) tailstrict,
    return:: aux(a, b, 0, 0, []) tailstrict,
  }.return,

  getApiVersionKindAndMetadata(resource):: {
    return::
      if std.objectHas(resource.metadata, "resourceVersion") then {
        apiVersion: resource.apiVersion,
        kind: resource.kind,
        metadata: {
          labels: resource.metadata.labels,
          name: resource.metadata.name,
          namespace: resource.metadata.namespace,
          resourceVersion: resource.metadata.resourceVersion,
        }
      } else {
        apiVersion: resource.apiVersion,
        kind: resource.kind,
        metadata: {
          labels: resource.metadata.labels,
          name: resource.metadata.name,
          namespace: resource.metadata.namespace,
        },
      },
  }.return,

  groupByResource(resources):: {
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

  comparator(a, b):: {
    return::
      if a.metadata.name == b.metadata.name then
        0
      else
        if a.metadata.name < b.metadata.name then
          -1
        else
          1,
  }.return,

  validateResource(resource):: {
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

  extractGroups(obj)::
    if std.type(obj) == "object" then
      [obj[key] for key in std.objectFields(obj)]
    else
      [],

  extractResources(group)::
    if std.type(group) == "object" then
      [group[key] for key in std.objectFields(group)]
    else
      [],

  curryResources(resources, exists):: {
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
        if util.validateResource(resource) then
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

  // Produce a list of manifests. obj must be an array
  list(obj):: k.core.v1.list.new(obj,),
}

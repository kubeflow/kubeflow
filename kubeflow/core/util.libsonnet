// Some useful routines.
{
  local util = self,

  // Convert a string to upper case.
  upper:: function(x) {
    local cp(c) = std.codepoint(c),
    local upLetter(c) = if cp(c) >= 97 && cp(c) < 123 then
      std.char(cp(c) - 32)
    else c,
    result:: std.join("", std.map(upLetter, std.stringChars(x))),
  }.result,

  // Convert non-boolean types like string,number to a boolean.
  // This is primarily intended for dealing with parameters that should be booleans.
  toBool:: function(x) {
    result::
      if std.type(x) == "boolean" then
        x
      else if std.type(x) == "string" then
        $.upper(x) == "TRUE"
      else if std.type(x) == "number" then
        x != 0
      else
        false,
  }.result,

  // Convert a comma-delimited string to an Array
  toArray:: function(str) {
    result::
      if std.type(str) == "string" && str != "null" && std.length(str) > 0 then
        std.split(str, ",")
      else [],
  }.result,

  // Convert an object's properties into an array of values
  toList:: [$[key] for key in std.objectFields($)],

  // Convert an array of kubernetes resources into a  map[kind/name, resource]
  toMap:: function(params) {
    local aux(arr, i, running) = 
        if i >= std.length(arr) then
            running
        else
            aux(arr, i + 1, running + {[arr[i].kind+'/'+arr[i].metadata.name]: arr[i],}) tailstrict,
    result:: $ + aux($.parts(params), 0, {parts:: $.parts}),
  }.result,

  // apply a change to a resource found in a map of resources indexed by 
  // resource.kind+'/'+resource.metadata.name
  apply:: function(obj, params, key, value) {
    result:: 
      local map = $.compose(obj).toMap(params);
      local newobj = 
      if std.objectHas(map, key) then (
        map + {
          [key]+: {
            spec+: value,
          },
        }
      ) else (
        map + {
          [key]: value,
        }
      );
      newobj.toList,
  }.result,

  // add these methods to obj
  compose(obj):: obj + util,
}

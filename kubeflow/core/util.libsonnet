// Some useful routines.
{
  local k = import "k.libsonnet",

  // Is the character upper case?
  isUpper:: function(c) {
    local cp = std.codepoint,
    local value = if cp(c) >= 65 && cp(c) < 91 then
      true
    else
      false,
    result:: value,
  }.result,

  // Convert a string to upper case.
  upper:: function(x) {
    local cp(c) = std.codepoint(c),
    local upperLetter(c) = if cp(c) >= 97 && cp(c) < 123 then
      std.char(cp(c) - 32)
    else c,
    result:: std.join("", std.map(upperLetter, std.stringChars(x))),
  }.result,

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
        $.upper(x) == "TRUE"
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

  // Produce a list of manifests. obj must be an array
  list(obj):: k.core.v1.list.new(obj,),
}

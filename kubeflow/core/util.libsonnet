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

  // Produce a list of manifests. obj must be an array
  list(obj):: k.core.v1.list.new(obj,),
}

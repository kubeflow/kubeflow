{
  // Convert a comma-delimited string to an array.
  toArray(str)::
    if std.type(str) == "string" && str != "null" && std.length(str) > 0 then
      std.split(str, ",")
    else [],
}

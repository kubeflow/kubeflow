{
  // Convert a comma-delimited string to an array.
  toArray(str)::
    if std.type(str) == "string" && str != "null" && std.length(str) > 0 then
      std.split(str, ",")
    else [],

  // Convert a comma-delimited string of "key=value" pairs into an object.
  // For example,
  //   "key=value" => {key: "value"}
  //   "key1=value1,key2=value2" => {key1: "value1", key2: "value2"}
  toObject(str)::
    if std.type(str) == "string" && str != "null" && std.length(str) > 0 then {
      [std.splitLimit(keyValue, "=", 1)[0]]: std.splitLimit(keyValue, "=", 1)[1]
      for keyValue in $.toArray(str)
    } else {},
}

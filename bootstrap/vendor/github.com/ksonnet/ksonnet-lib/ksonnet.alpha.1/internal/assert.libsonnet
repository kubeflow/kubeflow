{
  Type(fieldName, value, targetType): {
    local observedType = std.type(value),
    assert observedType == targetType
      : "Field '%s' must be type '%s'; value was type '%s', with value '%s'"
      % [fieldName, targetType, observedType, value]
  },

  InSet(fieldName, value, set): {
    assert std.length(set) > 0 && std.type(set[0]) == std.type(value)
      : "Field '%s' with value '%s' is of type '%s', but set '%s' contains elements of type '%s'"
      % [fieldName, value, std.type(value), set, std.type(set[0])],
    assert std.length(std.setInter(set, [value])) == 1
      : "Field '%s' with value '%s' must be in set '%s'"
      % [fieldName, value, set]
  },

  ValidPort(fieldName, port): {
    assert port > 0 && port < 65536
      : "Port '%s' must be in range 0 < port < 65536, but had value '%d'"
      % [fieldName, port]
    // NOTE: For some reason, Jsonnet only executes this check first
    // if we put it after the port range assert.
  } + self.Type(fieldName, port, "number"),
}
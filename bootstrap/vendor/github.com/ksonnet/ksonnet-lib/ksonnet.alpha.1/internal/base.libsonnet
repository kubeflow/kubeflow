{
  local baseName = "B98F6CE0-DEE9-43AE-BC09-C7C8EDE55029",
  New(name, id): {
    [baseName]:: {
      name: name,
      id: id,
    },
  },

  Verify(targetBase):: {
    assert super[baseName].id == targetBase[baseName].id
      : "Can't '+' object of type '%s' with object of type '%s'"
      % [super[baseName].name, targetBase[baseName].name]
  },
}
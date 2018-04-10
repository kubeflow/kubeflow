local test = import "test.libsonnet";
local aVar = std.extVar("aVar");
local anVar = std.extVar("anVar");
local filevar = std.extVar("filevar");

{
  apiVersion: "v1",
  kind: "List",
  items: [
    test {
      string: "bar",
      notAVal : aVar,
      notAnotherVal : anVar,
      filevar : filevar,
    }
  ],
}

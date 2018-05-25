local params = std.extVar("__ksonnet/params");
local globals = import "globals.libsonnet";
local envParams = params {
  components+: {
    "tf-serving-workflow"+: {
      name: "release1",
    },
    "tf-notebook-workflow"+: {
      name: "release1",
    },
  },
};

{
  components: {
    [x]: envParams.components[x] + globals
    for x in std.objectFields(envParams.components)
  },
}

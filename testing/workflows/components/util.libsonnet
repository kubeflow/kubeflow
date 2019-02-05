{
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.

  // convert a list of two items into a map representing an environment variable
  // TODO(jlewi): Should we move this into kubeflow/core/util.libsonnet
  listToMap:: function(v)
    {
      name: v[0],
      value: v[1],
    },

  // Function to turn comma separated list of prow environment variables into a list of dictionaries
  // [
  //   { name: ...,
  //     value: ...,
  //   },
  // ]
  //
  parseEnv:: function(v)
    local pieces = std.split(v, ",");
    if v != "" && std.length(pieces) > 0 then
      std.map(
        function(i) $.listToMap(std.split(i, "=")),
        std.split(v, ",")
      )
    else [],


  // Convert a list of dictionaries
  // [
  //   { name: "a",
  //     value: 10,
  //   },
  // ]
  // into a dictionary
  // {
  //   a: 10,
  // }
  listOfDictToMap:: function(v)
    std.foldl(
      function(l, r) l + r,
      std.map(
        function(i) { [i.name]: i.value },
        v,

      ),
      {}
    ),

  // Convert a list of dictionaries containing templates for Argo steps
  // into a list of Argo tasks
  toArgoTaskList:: function(templates) std.map(function(i) {
    name: i.template.name,
    template: i.template.name,
    dependencies: if std.objectHas(i, "dependencies") then i.dependencies else null,
  }, templates),

  // Build a multi-line container command.
  // Input is a list of lists. Where each list describes a command to be run.
  // e.g
  // [ ["echo", "command-one"], ["echo", "command-two"]]
  // Output is a list containing a shell command to run them
  // e.g.
  // ["/bin/sh", "-xc", "echo command-one; echo command-two"]

  buildCommand: function(items)
    ["/bin/sh", "-xc"] +
    [std.join("; ",
      std.map(
        function(c) std.join(" ", c),
        items,
      )
    )],
}

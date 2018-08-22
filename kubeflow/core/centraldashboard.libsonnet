{
  annotations(namespace):: {
    "getambassador.io/config":
      std.join("\n", [
        "---",
        "apiVersion: ambassador/v0",
        "kind:  Mapping",
        "name: centralui-mapping",
        "prefix: /",
        "rewrite: /",
        "service: centraldashboard." + namespace,
      ]),
  },
}

{
  // Due to https://github.com/ksonnet/ksonnet/issues/670, escaped characters in
  // jsonnet files are not interpreted correctly by ksonnet, which causes runtime
  // parsing failures. This is fixed in ksonnet 0.12.0, so we can merge this back
  // to the jsonnet file when we take a dependency on ksonnet 0.12.0 or later.
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

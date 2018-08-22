{
  // Due to https://github.com/ksonnet/ksonnet/issues/670, escaped characters in
  // jsonnet files are not interpreted correctly by ksonnet, which causes runtime
  // parsing failures. This is fixed in ksonnet 0.12.0, so we can merge this back
  // to the jsonnet file when we take a dependency on ksonnet 0.12.0 or later.
  annotations(isDashboardTls):: {
    "getambassador.io/config":
      std.join("\n", [
        "---",
        "apiVersion: ambassador/v0",
        "kind:  Mapping",
        "name: k8s-dashboard-ui-mapping",
        "prefix: /k8s/ui/",
        "rewrite: /",
        "tls: " + isDashboardTls,
        // We redirect to the K8s service created for the dashboard
        // in namespace kube-system. We don't use the k8s-dashboard service
        // because that isn't in the kube-system namespace and I don't think
        // it can select pods in a different namespace.
        "service: kubernetes-dashboard.kube-system",
      ]),
  },
}

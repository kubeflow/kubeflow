{
  all(params):: [
    {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "kubeflow-version",
        namespace: params.namespace,
      },
      data: {
        "kubeflow-version": importstr "version-info.json",
      },
    },
  ],
}

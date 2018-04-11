{
  all(params):: {
    kind: "Service",
    apiVersion: "v1",
    metadata: {
      name: params.name,
      namespace: params.namespace,
      labels: {
        app: params.name,
      },
    },
    spec: {
      ports: [
        {
          name: "port",
          port: 8080,
          targetPort: 8080,
        },
      ],
      selector: {
        app: params.name,
      },
      clusterIP: "None",
    },
  },
}

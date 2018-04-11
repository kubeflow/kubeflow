{
  all(params):: {
    kind: "Service",
    apiVersion: "v1",
    metadata: {
      name: params.name,
      labels: {
        app: params.name,
        namespace: params.namespace,
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

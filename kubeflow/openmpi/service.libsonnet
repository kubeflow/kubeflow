{
  all(params):: [
    $.service(params),
  ],

  service(params):: {
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
          name: "openmpi",  // not used
          port: 12345,
          targetPort: 12345,
        },
      ],
      selector: {
        app: params.name,
      },
      clusterIP: "None",
    },
  },
}

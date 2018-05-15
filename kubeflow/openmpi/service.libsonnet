{
  all(params):: [
    $.service(params),
  ],

  name(params):: params.name,

  service(params):: {
    kind: "Service",
    apiVersion: "v1",
    metadata: {
      name: $.name(params),
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

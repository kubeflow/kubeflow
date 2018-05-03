{
  all(params):: [
    $.service(params),
    $.serviceAccount(params),
    $.clusterRoleBinding(params),
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

  serviceAccount(params):: {
    kind: "ServiceAccount",
    apiVersion: "v1",
    metadata: {
      name: $.name(params),
      namespace: params.namespace,
      labels: {
        app: params.name,
      },
    },
  },

  clusterRoleBinding(params):: {
    kind: "ClusterRoleBinding",
    apiVersion: "rbac.authorization.k8s.io/v1",
    metadata: {
      name: $.name(params),
      namespace: params.namespace,
      labels: {
        app: params.name,
      },
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "ClusterRole",
      name: "view",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: $.name(params),
        namespace: params.namespace,
      },
    ],
  },
}

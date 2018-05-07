local service = import "kubeflow/openmpi/service.libsonnet";

{
  all(params):: if params.serviceAccountName == "null" then [
    $.serviceAccount(params),
    $.clusterRoleBinding(params),
  ] else [],

  name(params):: if params.serviceAccountName == "null" then service.name(params) else params.serviceAccountName,

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

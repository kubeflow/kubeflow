{
  local util = import "kubeflow/common/util.libsonnet",

  all(namespace, clusterDomain, injectIstio):: if util.toBool(injectIstio) then [
    $.parts(namespace, clusterDomain).serviceUiIstio,
    $.parts(namespace, clusterDomain).tensorboardDataIstio,
  ] else [],

  parts(namespace, clusterDomain):: {
    serviceUiIstio: {
      apiVersion: "networking.istio.io/v1alpha3",
      kind: "VirtualService",
      metadata: {
        name: "ml-pipeline-ui",
        namespace: namespace,
      },
      spec: {
        hosts: [
          "*",
        ],
        gateways: [
          "kubeflow-gateway",
        ],
        http: [
          {
            match: [
              {
                uri: {
                  prefix: "/pipeline",
                },
              },
            ],
            rewrite: {
              uri: "/pipeline",
            },
            route: [
              {
                destination: {
                  host: std.join(".", [
                    "ml-pipeline-ui",
                    namespace,
                    "svc",
                    clusterDomain,
                  ]),
                  port: {
                    number: 80,
                  },
                },
              },
            ],
            timeout: "300s",
          },
        ],
      },
    },  // serviceUiIstio

    tensorboardDataIstio: {
      apiVersion: "networking.istio.io/v1alpha3",
      kind: "VirtualService",
      metadata: {
        name: "ml-pipeline-tensorboard-ui",
        namespace: namespace,
      },
      spec: {
        hosts: [
          "*",
        ],
        gateways: [
          "kubeflow-gateway",
        ],
        http: [
          {
            match: [
              {
                uri: {
                  prefix: "/data",
                },
              },
            ],
            rewrite: {
              uri: "/data",
            },
            route: [
              {
                destination: {
                  host: std.join(".", [
                    "ml-pipeline-ui",
                    namespace,
                    "svc",
                    clusterDomain,
                  ]),
                  port: {
                    number: 80,
                  },
                },
              },
            ],
            timeout: "300s",
          },
        ],
      },
    },  // tensorboardDataIstio
  },
}

{
  local util = import "kubeflow/common/util.libsonnet",

  all(namespace, injectIstio):: if util.toBool(injectIstio) then [
    $.parts(namespace).serviceUiIstio,
    $.parts(namespace).tensorbaordDataIstio,
  ] else [],

  parts(namespace):: {
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
                  host: "ml-pipeline-ui." + namespace + ".svc.cluster.local",
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

    tensorbaordDataIstio: {
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
                  host: "ml-pipeline-ui." + namespace + ".svc.cluster.local",
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
    },  // tensorbaordDataIstio
  },
}

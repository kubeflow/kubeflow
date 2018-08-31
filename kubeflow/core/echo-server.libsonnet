{
  local util = import "kubeflow/core/util.libsonnet",
  new(_env, _params):: self + {
    local params = _env + _params + {
      namespace: if std.objectHas(_params, "namespace") && _params.namespace != "null" then
        _params.namespace else _env.namespace,
    },
    list:: util.list(self),

    Service:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: params.name,
        },
        name: params.name,
        namespace: params.namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: " + params.name + "-mapping",
              "prefix: /" + params.name,
              "rewrite: /",
              "service: " + params.name + "." + params.namespace,
            ]),
        },  //annotations
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 8080,
          },
        ],
        selector: {
          app: params.name,
        },
        type: "ClusterIP",
      },
    },

    Deployment:: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: params.name,
        namespace: params.namespace,

      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: params.name,
            },
          },
          spec: {
            containers: [
              {
                image: params.image,
                name: "app",
                ports: [
                  {
                    containerPort: 8080,
                  },
                ],

                readinessProbe: {
                  httpGet: {
                    path: "/headers",
                    port: 8080,
                  },
                  initialDelaySeconds: 5,
                  periodSeconds: 30,
                },
              },
            ],
          },
        },
      },
    },
  },
}

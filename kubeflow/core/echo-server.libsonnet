{
  service(namespace, name):: {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      labels: {
        app: name,
      },
      name: name,
      namespace: namespace,
      annotations: {
        "getambassador.io/config":
          std.join("\n", [
            "---",
            "apiVersion: ambassador/v0",
            "kind:  Mapping",
            "name: " + name + "-mapping",
            "prefix: /" + name,
            "rewrite: /",
            "service: " + name + "." + namespace,
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
        app: name,
      },
      type: "ClusterIP",
    },
  },

  deploy(namespace, name, image):: {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      name: name,
      namespace: namespace,

    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: {
            app: name,
          },
        },
        spec: {
          containers: [
            {
              image: image,
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
}

{
  all(params):: [
    $.service(params),
    $.deployment(params),
  ],

  service(params):: {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "openmpi-redis",
      labels: {
        app: "openmpi-redis",
      },
    },
    spec: {
      ports: [
        {
          name: "redis",
          port: 6379,
          targetPort: 6379,
        },
      ],
      selector: {
        app: "openmpi-redis",
      },
    },
  },

  deployment(params):: {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "openmpi-redis",
      labels: {
        app: "openmpi-redis",
      },
    },
    spec: {
      template: {
        metadata: {
          labels: {
            app: "openmpi-redis",
          },
        },
        spec: {
          volumes: [
            {
              name: "openmpi-redis-data",
              emptyDir: {},
            },
          ],
          containers: [
            {
              name: "openmpi-redis-container",
              image: "bitnami/redis:4.0.9",
              imagePullPolicy: "IfNotPresent",
              env: [
                {
                  name: "ALLOW_EMPTY_PASSWORD",
                  value: "yes",
                },
              ],
              ports: [
                {
                  name: "redis",
                  containerPort: 6379,
                },
              ],
              livenessProbe: {
                exec: {
                  command: [
                    "redis-cli",
                    "ping",
                  ],
                },
                initialDelaySeconds: 30,
                timeoutSeconds: 5,
              },
              readinessProbe: {
                exec: {
                  command: [
                    "redis-cli",
                    "ping",
                  ],
                },
                initialDelaySeconds: 5,
                timeoutSeconds: 1,
              },
              resources: {
                requests: {
                  memory: "256Mi",
                  cpu: "100m"
                },
              },
              volumeMounts: [
                {
                  name: "openmpi-redis-data",
                  mountPath: "/bitnami/redis",
                },
              ],
            },
          ],
        },
      },
    },
  },
}

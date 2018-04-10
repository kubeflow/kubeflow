local k = import 'k.libsonnet';
local service = k.core.v1.service.mixin;

{
  parts:: {
    service(namespace, name, metricsEnabled=false, externalIpArray=null, selector={app:name})::
      local defaults= {
        type: 'ClusterIP',
        port: 5432
      };

      {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: name,
          namespace: namespace,
          labels: {
            app: name,
          },
          [if metricsEnabled then "annotations"]: {
            "prometheus.io/scrape": "true",
            "prometheus.io/port": "9187"
          },
        },
        spec: {
          type: defaults.type,
          ports: [
            {
              name: "postgresql",
              port: defaults.port,
              targetPort: "postgresql",
            }
          ],
          [if externalIpArray != null then "externalIPs"]:
            externalIpArray,
          selector: selector
        },
      },

    pvc(namespace, name, storageClassName="-", labels={app:name})::
      local defaults = {
        accessMode:"ReadWriteOnce",
        size: "8Gi"
      };

      {
        kind: "PersistentVolumeClaim",
        apiVersion: "v1",
        metadata: {
          name: name,
          namespace: namespace,
          labels: labels,
        },
        spec: {
          accessModes: [
            defaults.accessMode
          ],
          resources: {
            requests: {
              storage: defaults.size,
            },
          },
          storageClassName: storageClassName
        },
      },

    secrets(namespace, name, postgresPassword, labels={app:name})::
      {
        apiVersion: "v1",
        kind: "Secret",
        metadata: {
          name: name,
          namespace: namespace,
          labels: labels,
        },
        type: "Opaque",
        data: {
          "postgres-password": std.base64(postgresPassword),
        },
      },

    networkPolicy:: {
      allowExternal(namespace, name, allowInbound=false, labels={app:name}, podSelector={matchLabels: {app: name}})::
        base(namespace, name, allowInbound, labels, podSelector),

      local base(namespace, name, allowInbound, labels, podSelector) = {
        kind: "NetworkPolicy",
        apiVersion: "networking.k8s.io/v1",
        metadata: {
          name: name,
          namespace: namespace,
          labels: labels
        },
        spec: {
          podSelector: podSelector,
          ingress: [
            {
              # Allow inbound connections
              ports: [
                {port: 5432},
              ],
              [if allowInbound then "from"]:[
                {
                  podSelector: {
                    matchLabels: {
                      [name + "-client"]: "true",
                    },
                  },
                },
              ],
            },
            {
              # Allow prometheus scrapes
              ports: [
                {port: 9187},
              ]
            }
          ],
        }
      },
    },
    deployment::{
      local defaults ={
        image: "postgres",
        imageTag:   "9.6.2",
        imagePullPolicy: "Always",
        persistence::{
          enabled: true,
          accessMode:"ReadWriteOnce",
          size:"8Gi",
          subPath:"postgresql-db"
        },
        resources:: {
          requests: {
            memory: "256Mi",
            cpu: "100m"
          }
        },
        metrics::{
          enabled: false,
          image: "wrouesnel/postgres_exporter",
          imageTag: "v0.1.1",
          imagePullPolicy: "IfNotPresent",
          resources: {
            requests: {
              memory: "256Mi",
              cpu: "100m"
            }
          }
        },

        postgresConfig:: {
          user:: "postgres",
          db:: "",
          initDbArgs:: "",
        },
      },

      persistent(namespace, name, pgConfig=defaults.postgresConfig, metricsEnabled=false, existingClaim=name, labels={app:name}):
        local volume = {
          name: "data",
          persistentVolumeClaim: {
            claimName: existingClaim
          }
        };
        base(namespace, name, pgConfig, metricsEnabled, existingClaim, labels) +
        k.extensions.v1beta1.deployment.mixin.spec.template.spec.withVolumes(volume),

      nonPersistent(namespace, name, pgConfig=defaults.postgresConfig, metricsEnabled=false, existingClaim=name, labels={app:name})::
        local volume = {
          name: "data",
          emptyDir: {}
        };
        base(namespace, name, pgConfig, metricsEnabled, existingClaim, labels) +
        k.extensions.v1beta1.deployment.mixin.spec.template.spec.withVolumes(volume),

      local base(namespace, name, pgConfig, metricsEnabled, existingClaim, labels) =
        local metricsContainer = [
          {
            name: "metrics",
            image: defaults.metrics.image + ":" + defaults.metrics.imageTag,
            imagePullPolicy: defaults.metrics.imagePullPolicy,
            env: [
              {
                name: "DATA_SOURCE_NAME",
                value: "postgresql://postgres@127.0.0.1:5432?sslmode=disable",
              },
            ],
            ports: [
              {
                name: "metrics",
                containerPort: 9187,
              },
            ],
            resources: defaults.metrics.resources
          }
        ];

        {
          apiVersion: "extensions/v1beta1",
          kind: "Deployment",
          metadata: {
            name: name,
            namespace: namespace,
              labels: {
                app: name
              },
          },
          spec: {
            template: {
              metadata: {
                labels: {
                  app: name,
                }
              },
              spec: {
                containers: [
                  {
                    name: name,
                    image: defaults.image + ":" + defaults.imageTag,
                    imagePullPolicy: defaults.imagePullPolicy,
                    env: [
                      {
                        name: "POSTGRES_USER",
                        value: pgConfig.user
                      },
                      {
                        # Required for pg_isready in the health probes.
                        name: "PGUSER",
                        value:
                          pgConfig.user
                      },
                      {
                        name: "POSTGRES_DB",
                        value: pgConfig.db
                      },
                      {
                        name: "POSTGRES_INITDB_ARGS",
                        value: pgConfig.initDbArgs
                      },
                      {
                        name: "PGDATA",
                        value: "/var/lib/postgresql/data/pgdata",
                      },
                      {
                        name: "POSTGRES_PASSWORD",
                        valueFrom: {
                          secretKeyRef: {
                            name: name,
                            key: "postgres-password"
                          },
                        },
                      },
                      {
                        name: "POD_IP",
                        valueFrom: {
                          fieldRef: {
                            fieldPath: "status.podIP",
                          }
                        }
                      }
                    ],
                    ports: [
                      {
                        name: "postgresql",
                        containerPort: 5432,
                      },
                    ],
                    livenessProbe: {
                      exec: {
                        command: [
                          "sh",
                          "-c",
                          "exec pg_isready --host $POD_IP",
                        ],
                      },
                      initialDelaySeconds: 60,
                      timeoutSeconds: 5,
                      failureThreshold: 6,
                    },
                    readinessProbe: {
                      exec: {
                        command: [
                          "sh",
                          "-c",
                          "exec pg_isready --host $POD_IP",
                        ],
                      },
                      initialDelaySeconds: 5,
                      timeoutSeconds: 3,
                      periodSeconds: 5,
                    },
                    resources: defaults.metrics.resources,
                    volumeMounts: [
                      {
                        name: "data",
                        mountPath: "/var/lib/postgresql/data/pgdata",
                        subPath: defaults.persistence.subPath
                      },
                    ],
                  },
                ] +
                if metricsEnabled then metricsContainer
                  else [],
                volumes: [],
              },
            },
          },
        },
    }
  }
}

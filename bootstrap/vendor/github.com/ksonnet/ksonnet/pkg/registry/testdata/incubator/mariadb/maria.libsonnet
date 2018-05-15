local k = import 'k.libsonnet';
local deployment = k.extensions.v1beta1.deployment;

{
  parts:: {
    svc(namespace, name, metricsEnabled=true, labels={app:name}, selector={app:name})::
      {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: name,
          labels: labels,
          [if metricsEnabled then "annotations"]: {
            "prometheus.io/scrape": "true",
            "prometheus.io/port": "9104",
          }
        },
        spec: {
          type: "ClusterIP",
          ports: [
            {
              name: "mysql",
              port: 3306,
              targetPort: "mysql",
            },
          ] + if metricsEnabled then [
            {
              name: "metrics",
              port: 9104,
              targetPort: "metrics",
            },
          ] else [],
          selector: selector,
        },
      },

    secret(namespace, name, mariaRootPassword, labels={app:name},):: {
      apiVersion: "v1",
      kind: "Secret",
      metadata: {
        name: name,
        namespace: namespace,
        labels: labels,
      },
      type: "Opaque",
      data: {
         "mariadb-root-password": std.base64(mariaRootPassword),
      },
    },

    configMap(namespace, name, labels={app:name})::
      local config = |||
        [mysqld]
        innodb_buffer_pool_size=2G
      |||;
      {
        apiVersion: "v1",
        kind: "ConfigMap",
        metadata: {
          name: name,
          namespace: namespace,
          labels: labels,
          },
        data: {
          "my.cnf": config,
        },
      },

    pvc(namespace, name, storageClassName="-", labels={app:name})::
      local defaults = {
        accessMode: "ReadWriteOnce",
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
            defaults.accessMode,
          ],
          resources: {
            requests: {
              storage: defaults.size,
            },
          },
          [if storageClassName != null then "storageClass"]:storageClassName,
        },
      },

    deployment:: {
      local defaults = {
        image: "bitnami/mariadb:10.1.26-r2",
        imagePullPolicy: "IfNotPresent",
        serviceType: "ClusterIP",
        persistence: {
          accessMode: "ReadWriteOnce",
          size: "8Gi",
        },
        resources: {
          requests: {
            memory: "256Mi",
            cpu: "250m",
          },
        },
        metrics: {
          image: "prom/mysqld-exporter",
          imageTag: "v0.10.0",
          imagePullPolicy: "IfNotPresent",
          resources: {},
          annotations: {
            "prometheus.io/scrape": "true",
            "prometheus.io/port": "9104",
          },
        },
        mariaConfig: {
          user: "",
          db: "",
        },
      },

      persistent(namespace, name, passwordSecretName, mariaConfig=defaults.mariaConfig, metricsEnabled=true, existingClaim=name, labels={app:name}, configMapName=name)::
        local volume = {
          name: "data",
          persistentVolumeClaim: {
            claimName: existingClaim
          }
        };
        base(namespace, name, passwordSecretName, mariaConfig, metricsEnabled, existingClaim, labels, configMapName) +
          deployment.mixin.spec.template.spec.withVolumes(volume),

      nonPersistent(namespace, name, passwordSecretName, mariaConfig=defaults.mariaConfig, metricsEnabled=true, existingClaim=name, labels={app:name}, configMapName=name)::
         base(namespace, name, passwordSecretName, mariaConfig, metricsEnabled, existingClaim, labels, configMapName),

      local secure(passwordSecretName) = [
        {
          name: "MARIADB_ROOT_PASSWORD",
          valueFrom: {
            secretKeyRef: {
              name: passwordSecretName,
              key: "mariadb-root-password",
            },
          },
        },
        {
          name: "MARIADB_PASSWORD",
          valueFrom: {
            secretKeyRef: {
              name: passwordSecretName,
              key: "mariadb-password",
            },
          },
        },
      ],

      local insecure(passwordSecretName) = [
        {
          name: "ALLOW_EMPTY_PASSWORD",
          value: "yes",
        },
        {
          name: "MARIADB_PASSWORD",
          valueFrom: {
            secretKeyRef: {
              name: passwordSecretName,
              key: "mariadb-password",
            },
          },
        }
      ],

      local base(namespace, name, passwordSecretName, mariaConfig, metricsEnabled, existingClaim, labels, configMapName) =
        local metricsContainer =
          if !metricsEnabled then []
          else [
            {
              name: "metrics",
              image: "%s:%s" % [defaults.metrics.image, defaults.metrics.imageTag],
              imagePullPolicy: defaults.metrics.imagePullPolicy,
              env: [
                {
                  name: "MARIADB_ROOT_PASSWORD",
                  valueFrom: {
                    secretKeyRef: {
                      name: name,
                      key: "mariadb-root-password",
                    },
                  },
                },
              ],
              command: [ 'sh', '-c', 'DATA_SOURCE_NAME="root:$MARIADB_ROOT_PASSWORD@(localhost:3306)/" /bin/mysqld_exporter' ],
              ports: [
                {
                  name: "metrics",
                  containerPort: 9104,
                },
              ],
              livenessProbe: {
                httpGet: {
                  path: "/metrics",
                  port: "metrics",
                },
                initialDelaySeconds: 15,
                timeoutSeconds: 5,
              },
              readinessProbe: {
                httpGet: {
                  path: "/metrics",
                  port: "metrics",
                },
                initialDelaySeconds: 5,
                timeoutSeconds: 1,
              },
              resources: defaults.metrics.resources,
            },
          ];

        {
          apiVersion: "extensions/v1beta1",
          kind: "Deployment",
          metadata: {
            name: name,
            namespace: namespace,
            labels: labels,
          },
          spec: {
            template: {
              metadata: {
                namespace: namespace,
                labels: labels,
              },
              spec: {
                containers: [
                  {
                    name: "mariadb",
                    image: defaults.image,
                    imagePullPolicy: defaults.imagePullPolicy,
                    env:
                      secure(passwordSecretName) + [
                        {
                          name: "MARIADB_USER",
                          value: mariaConfig.user
                        },
                        {
                          name: "MARIADB_DATABASE",
                          value:  mariaConfig.db
                        },
                      ],
                    ports: [
                      {
                        name: "mysql",
                        containerPort: 3306,
                      },
                    ],
                    livenessProbe: {
                      exec: {
                        command: [
                          "mysqladmin",
                          "ping",
                        ],
                      },
                      initialDelaySeconds: 30,
                      timeoutSeconds: 5,
                    },
                    readinessProbe: {
                      exec: {
                        command: [
                          "mysqladmin",
                          "ping",
                        ],
                      },
                      initialDelaySeconds: 5,
                      timeoutSeconds: 1,
                    },
                    resources: defaults.resources,
                    volumeMounts: [
                      {
                        name: "config",
                        mountPath: "/bitnami/mariadb/conf/my_custom.cnf",
                        subPath: "my.cnf",
                      },
                      {
                        name: "data",
                        mountPath: "/bitnami/mariadb",
                      },
                    ],
                  },
                ] + metricsContainer,
                volumes: [
                  {
                    name: "config",
                    configMap: {
                      name: configMapName,
                    },
                  }
                ],
              },
            },
          },
        },
    },
  }
}

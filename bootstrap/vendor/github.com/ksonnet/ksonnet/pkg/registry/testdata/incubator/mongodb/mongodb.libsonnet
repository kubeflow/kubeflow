local k = import 'k.libsonnet';
local deployment = k.extensions.v1beta1.deployment;

{
  parts:: {
    deployment:: {
      local defaults = {
        image: "bitnami/mongodb:3.4.7-r0",
        imagePullPolicy: "IfNotPresent",
        resources: {
          requests: {
            memory: "256Mi",
            cpu: "100m",
          },
        },

        persistence: {
          enabled: true,
          storageClass: "-",
          accessMode: "ReadWriteOnce",
          size: "8Gi",
        },

        mongoConfig: {
          username: "",
          database: "",
        },
      },

      persistent(namespace, name, mongoConfig=defaults.mongoConfig,  labels={app: name}, pvcName={claimName: name})::
        base(namespace, name, mongoConfig, labels)
        .withVolumes({
          name: "data",
          persistentVolumeClaim: pvcName,
        }),

      nonPersistent(namespace, name, labels={app: name}, mongoConfig=defaults.mongoConfig)::
        base(namespace, name, mongoConfig, labels)
        .withVolumes({
          name: "data",
          emptyDir: {},
        }),

      local base(namespace, name, mongoConfig, labels) = {
        apiVersion: "extensions/v1beta1",
        kind: "Deployment",
        metadata: {
          namespace: namespace,
          name: name,
          labels: labels,
        },
        spec: {
          template: {
            metadata: { labels: labels },
            spec: {
              containers: [{
                name: name,
                image: defaults.image,
                imagePullPolicy: defaults.imagePullPolicy,
                env: [
                  {
                    name: "MONGODB_ROOT_PASSWORD",
                    valueFrom: {
                      secretKeyRef: {
                        name: name,
                        key: "mongodb-root-password",
                      },
                    },
                  },
                  {
                    name: "MONGODB_USERNAME",
                    value: mongoConfig.username,
                  },
                  {
                    name: "MONGODB_PASSWORD",
                    valueFrom: {
                      secretKeyRef: {
                        name: name,
                        key: "mongodb-password",
                      },
                    },
                  },
                  {
                    name: "MONGODB_DATABASE",
                    value: mongoConfig.database,
                  },
                ],
                ports: [{
                  name: "mongodb",
                  containerPort: 27017,
                }],
                livenessProbe: {
                  exec: {
                    command: [
                      "mongo",
                      "--eval",
                      "db.adminCommand('ping')",
                    ],
                  },
                  initialDelaySeconds: 30,
                  timeoutSeconds: 5,
                },
                readinessProbe: {
                  exec: {
                    command: [
                      "mongo",
                      "--eval",
                      "db.adminCommand('ping')",
                    ],
                  },
                  initialDelaySeconds: 5,
                  timeoutSeconds: 1,
                },
                volumeMounts: [{
                  name: "data",
                  mountPath: "/bitnami/mongodb",
                }],
                resources: defaults.resources,
              }],
            },
          },
        },
      },
    },

    secrets(namespace, name, mongodbRootPassword, mongodbPassword):: {
      apiVersion: "v1",
      kind: "Secret",
      metadata: {
        namespace: namespace,
        name: name,
        labels: { app: name },
      },
      type: "Opaque",
      data: {
        "mongodb-root-password": std.base64(mongodbRootPassword),
        "mongodb-password": std.base64(mongodbPassword)
      },
    },

    service(namespace, name, serviceType="ClusterIP", selector={app: name}):: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        namespace: namespace,
        name: name,
        labels: { app: name },
      },
      spec: {
        type: serviceType,
        ports: [{
          name: "mongodb",
          port: 27017,
          targetPort: "mongodb",
        }],
        selector: selector,
      },
    },

    pvc(namespace, name, storageClass="-"):: {
      local defaults = {
        size: "8Gi",
        accessMode: "ReadWriteOnce",
        enabled: true,
      },

      kind: "PersistentVolumeClaim",
      apiVersion: "v1",
      metadata: {
        namespace: namespace,
        name: name,
      },
      spec: {
        accessModes: [ defaults.accessMode ],
        resources: {
          requests: { storage: defaults.size },
        },
        storageClass: storageClass,
      },
    },
  },
}

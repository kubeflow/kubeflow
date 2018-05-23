local k = import "k.libsonnet";
local deployment = k.extensions.v1beta1.deployment;

{
  parts:: {
    pvc(namespace, name, storageClassName=null):: {
      local defaults = {
        size:: "1Gi",
        accessMode:: "ReadWriteOnce",
      },

      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        namespace: namespace,
        name: name,
        labels: {
          app: name,
        },
        annotations:
          if storageClassName == null
          then {
            "volume.alpha.kubernetes.io/storage-class": "default",
          } else {
            "volume.beta.kubernetes.io/storage-class": storageClassName,
          },
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
      },
    },

    svc(namespace, name, selector={app: name}):: {
      local defaults = {
        serviceType:: "LoadBalancer",
      },

      apiVersion: "v1",
      kind: "Service",
      metadata: {
        namespace: namespace,
        name: name,
        labels: {
          app: name,
        },
      },
      spec: {
        type: defaults.serviceType,
        ports: [
          {
            name: "http",
            port: 80,
            targetPort: "http",
          },
        ],
        selector: selector,
      },
    },

    deployment:: {
      local defaults = {
        image:: "bitnami/node:8.4.0-r1",
        repository:: "https://github.com/jbianquetti-nami/simple-node-app.git",
        revision:: "26679f6",
        imagePullPolicy:: "IfNotPresent",
        resources:: {
          "requests": {
            "memory": "512Mi",
            "cpu": "300m",
          },
        },
        mountPath:: "/app/data",
        labels(name):: {"app": name},
      },

      // Note: volumes are added to deployment as overlays based on persistence
      persistent(namespace, name, labels=defaults.labels(name), claimName=name)::
        local volume = {
          name: "data",
          persistentVolumeClaim: {
            claimName: claimName
          },
        };
        base(namespace, name, labels) +
        deployment.mixin.spec.template.spec.withVolumes(volume),

      nonPersistent(namespace, name, labels=defaults.labels(name))::
        local volume = {
          name: "data",
          emptyDir: {},
        };
        base(namespace, name, labels) +
        deployment.mixin.spec.template.spec.withVolumes(volume),

      local base(namespace, name, labels) = {
        apiVersion: "extensions/v1beta1",
        kind: "Deployment",
        metadata: {
          namespace: namespace,
          name: name,
          labels: labels
        },
        spec: {
          replicas: 1,
          template: {
            metadata: {
              labels: labels,
              annotations: {
                "pod.beta.kubernetes.io/init-containers": std.toString([
                  {
                    name: "git-clone-app",
                    image: defaults.image,
                    imagePullPolicy: defaults.imagePullPolicy,
                    command: "[ /bin/sh, -c , git clone " + defaults.repository+ " /app && git checkout " + defaults.revision + "]",
                    volumeMounts: [
                      {
                        name: "app",
                        mountPath: "/app"
                      }
                    ],
                  },
                  {
                    name: "npm-install",
                    image: defaults.image,
                    imagePullPolicy: defaults.imagePullPolicy,
                    command: '[ "npm", "install" ]',
                    volumeMounts: [
                      {
                        name: "app",
                        mountPath: "/app"
                      }
                    ],
                  },
                ]),
              },
              test: "it worked",
            },
            spec: {
              containers: [
                {
                  name: name,
                  securityContext: {
                    readOnlyRootFilesystem: true,
                  },
                  image: defaults.image,
                  imagePullPolicy: defaults.imagePullPolicy,
                  env: [
                    {
                      name: "GIT_REPO",
                      value: defaults.repository,
                    },
                  ],
                  command: [ "npm", "start" ],
                  ports: [
                    {
                      name: "http",
                      containerPort: 3000,
                    }
                  ],
                  livenessProbe: {
                    httpGet: {
                      path: "/",
                      port: "http",
                    },
                    initialDelaySeconds: 180,
                    timeoutSeconds: 5,
                    failureThreshold: 6,
                  },
                  readinessProbe: {
                    httpGet: {
                      path: "/",
                      port: "http",
                    },
                    initialDelaySeconds: 30,
                    timeoutSeconds: 3,
                    periodSeconds: 5,
                  },
                  resources: defaults.resources,
                  volumeMounts: [
                    {
                      name: "app",
                      mountPath: "/app",
                    },
                    {
                      name: "data",
                      mountPath: defaults.mountPath,
                    }
                  ],
                }
              ],
              volumes: [
                {
                  name: "app",
                  emptyDir: {},
                },
              ],
            }
          },
        },
      },
    },
  },
}

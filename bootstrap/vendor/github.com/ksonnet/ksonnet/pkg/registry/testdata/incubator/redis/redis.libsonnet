local k = import 'k.libsonnet';
local deployment = k.extensions.v1beta1.deployment;
local container = deployment.mixin.spec.template.spec.containersType;
local storageClass = k.storage.v1beta1.storageClass;
local service = k.core.v1.service;
local networkPolicy = k.extensions.v1beta1.networkPolicy;
local networkSpec = networkPolicy.mixin.spec;

{
  parts:: {
    networkPolicy:: {
      local defaults = {
        inboundPort: {
          ports: [{port:6379}]
        },
      },

      allowExternal(name, allowInbound, metricEnabled, podSelector=null, labels={app:name},)::
        base(name, metricEnabled, podSelector, labels) +
        networkSpec.withIngress(defaults.inboundPort),

      denyExternal(name, allowInbound, metricEnabled, podSelector={matchLabels:{[name + "-client"]: "true"}}, labels={app:name}, )::
        local ingressRule = defaults.inboundPort + {
          from: [
            {
              podSelector: podSelector
            },
          ],
        };
        base(name, metricEnabled, podSelector, labels)+
        networkSpec.withIngress(ingressRule),

      local base(name, metricEnabled, podSelector, labels) = {
        kind: "NetworkPolicy",
        apiVersion: "networking.k8s.io/v1",
        metadata: {
          name: name,
          labels: labels,
        },
        spec: {
          [if podSelector != null then "podSelector"]: podSelector,
          [if metricEnabled then "ingress"]: [
            {
              # Allow prometheus scrapes for metrics
              ports: [
                {port: 9121},
              ]
            }
          ],
        },
      },
    },

    secret(name, redisPassword, labels={app:name})::
      local defaults = {
        usePassword: true,
      };

      {
        apiVersion: "v1",
        kind: "Secret",
        metadata: {
          name: name,
          labels: labels,
        },
        type: "Opaque",
        data: {
          "redis-password": std.base64(redisPassword),
        },
      },

    svc::{
      metricDisabled(name, labels={app:name}, selector={app:name})::
      svcBase(name, labels, selector),

      metricEnabled(name, labels={app:name}, selector={app:name})::
        local annotations = {
          "prometheus.io/scrape": "true",
          "prometheus.io/port": "9121"
        };
        svcBase(name, labels, selector) +
          service.mixin.metadata.withAnnotations(annotations),

      local svcBase(name, labels, selector)= {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: name,
          labels: labels,
        },
        spec: {
          ports: [
            {
              name: "redis",
              port: 6379,
              targetPort: "redis",
            }
          ],
          selector: selector,
        }
      },
    },

    pvc(name, storageClass="-", labels={app:name})::
      local defaults = {
        accessMode: "ReadWriteOnce",
        size: '8Gi'
      };

      {
        kind: "PersistentVolumeClaim",
        apiVersion: "v1",
        metadata: {
          name: name,
          labels: labels
        },
        spec: {
          accessModes: [
            defaults.accessMode,
          ],
          storageClassName: storageClass,
          resources: {
            requests: {
              storage: defaults.size,
            },
          },
        },
      },

    deployment:: {
      local defaults = {
        image:: "bitnami/redis:3.2.9-r2",
        imagePullPolicy:: "IfNotPresent",
        resources:: {
          "requests": {
            "memory": "256Mi",
            "cpu": "100m"
          },
        },
        dataMount:: {
          name: "redis-data",
          mountPath: "/bitnami/redis",
        },
        metrics:: {
          image: "oliver006/redis_exporter",
          imageTag: "v0.11",
          imagePullPolicy: "IfNotPresent",
        },
      },

      nonPersistent(name, secretName, metricEnabled=false, labels={app:name},):
        local volume = {
          name: "redis-data",
          emptyDir: {}
        };
        base(name, secretName, metricEnabled, labels) +
        deployment.mixin.spec.template.spec.withVolumes(volume) +
        deployment.mapContainersWithName(
          [name],
          function(c) c + container.withVolumeMounts(defaults.dataMount)
        ),

      persistent(name, secretName, metricEnabled=false, claimName=name, labels={app:name})::
        local volume = {
          name: "redis-data",
          persistentVolumeClaim: {
            claimName: claimName
          }
        };
        base(name, secretName, metricEnabled, labels) +
        deployment.mixin.spec.template.spec.withVolumes(volume) +
        deployment.mapContainersWithName(
          [name],
          function(c) c + container.withVolumeMounts(defaults.dataMount)
        ),

      local base(name, secretName, metricsEnabled, labels) =
        local metricsContainer =
          if !metricsEnabled then []
          else [{
            name: "metrics",
            image: defaults.metrics.image + ':' + defaults.metrics.imageTag,
            imagePullPolicy: defaults.metrics.imagePullPolicy,
            env: [
              {
                name: "REDIS_ALIAS",
                value: name,
              }
            ] + if secretName == null then []
            else [
              {
                name: "REDIS_PASSWORD",
                valueFrom: {
                  secretKeyRef: {
                    name: name,
                    key: "redis-password",
                  }
                },
              },
            ],
            ports: [
              {
                name: "metrics",
                containerPort: 9121,
              }
            ],
          }];
      {
        apiVersion: "extensions/v1beta1",
        kind: "Deployment",
        metadata: {
          name: name,
          labels: labels,
        },
        spec: {
          template: {
            metadata: {
              labels: labels
            },
            spec: {
              containers: [
                {
                  name: name,
                  image: defaults.image,
                  imagePullPolicy: defaults.imagePullPolicy,
                  env: [
                    if secretName != null then
                    {
                      name: "REDIS_PASSWORD",
                      valueFrom: {
                        secretKeyRef: {
                          name: secretName,
                          key: "redis-password",
                        },
                      }
                    }
                    else{
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
                  resources: defaults.resources,
                },
              ] + metricsContainer,
            },
          },
        },
      },
    },
  },
}

local k = import 'k.libsonnet';
local deployment = k.extensions.v1beta1.deployment;
local container = deployment.mixin.spec.template.spec.containersType;
local storageClass = k.storage.v1beta1.storageClass;
local service = k.core.v1.service;
local networkPolicy = k.extensions.v1beta1.networkPolicy;
local networkSpec = networkPolicy.mixin.spec;

{
  parts:: {
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

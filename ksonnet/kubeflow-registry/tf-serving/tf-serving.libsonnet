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
        image:: "gcr.io/your-project/model",
        imagePullPolicy:: "IfNotPresent",
        resources:: {
          "requests": {
            "memory": "256Mi",
            "cpu": "100m"
          },
        },
      },

      modelServer(name, labels={app:name},):
        local volume = {
          name: "redis-data",
          emptyDir: {}
        };
        base(name, labels) +
        deployment.mixin.spec.template.spec.withVolumes(volume),
        // +
        // deployment.mapContainersWithName(
        //  [name],
        //  function(c) c + container.withVolumeMounts(defaults.dataMount)
        // ),

      local base(name, labels) = 
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
                  env: [],
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
              ],
            },
          },
        },
      },
    },
  },
}

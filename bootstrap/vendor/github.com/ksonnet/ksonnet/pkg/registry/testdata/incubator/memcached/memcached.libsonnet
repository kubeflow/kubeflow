local k = import 'k.libsonnet';

{
  parts:: {
    pdb(namespace, name, pdbMinAvailable=3, selector={matchLabels: {app: name}}):: {
      apiVersion: "policy/v1beta1",
      kind: "PodDisruptionBudget",
      metadata: {
        namespace: namespace,
        name: name,
      },
      spec: {
        selector: selector,
        minAvailable: pdbMinAvailable,
      },
    },

    statefulset:: {
      local defaults = {
        replicaCount: 3,
        resources: {
          requests: {
            memory: "64Mi",
            cpu: "50m",
          },
        },
        image: "memcached:1.4.36-alpine",
        imagePullPolicy: "IfNotPresent",
        // imagePullPolicy: change to "Always" if the imageTag is "latest"
        memcached: {
          maxItemMemory: 64,
          verbosity: "v",
          extendedOptions: "modern",
        },
      },

      withHardAntiAffinity(namespace, name, labels={app: name})::
        local hardAntiAffinity = {
          requiredDuringSchedulingIgnoredDuringExecution: [
            {
              topologyKey: "kubernetes.io/hostname",
              labelSelector: { matchLabels: labels },
            },
          ],
        };
        base(namespace, name, labels) +
        k.apps.v1beta1.statefulSet.mixin.spec.template.spec.affinity.podAntiAffinity.mixinInstance(hardAntiAffinity),

      withSoftAntiAffinity(namespace, name, labels={app: name})::
        local softAntiAffinity = {
          preferredDuringSchedulingIgnoredDuringExecution: [
            {
              weight: 5,
              podAffinityTerm: [
                {
                  topologyKey: "kubernetes.io/hostname",
                  labelSelector: { matchLabels: labels },
                },
              ],
            },
          ],
        };
        base(namespace, name, labels) +
        k.apps.v1beta1.statefulSet.mixin.spec.template.spec.affinity.podAntiAffinity.mixinInstance(softAntiAffinity),

      withNoAntiAffinity(namespace, name, labels={app: name})::
        base(namespace, name, labels),

      local base(namespace, name, labels) = {
        apiVersion: "apps/v1beta1",
        kind: "StatefulSet",
        metadata: {
          namespace: namespace,
          name: name,
          labels: labels,
        },
        spec: {
          serviceName: name,
          replicas: defaults.replicaCount,
          template: {
            metadata: {
              labels: labels
            },
            spec: {
              affinity: {
                podAntiAffinity: {}
              },
              containers: [
                {
                  name: name,
                  image: defaults.image,
                  imagePullPolicy: defaults.imagePullPolicy,
                  command: [
                    "memcached",
                    "-m " + defaults.memcached.maxItemMemory
                  ] +
                    if "extendedOptions" in defaults.memcached
                    then [ "-o", defaults.memcached.extendedOptions ]
                    else [] +
                    if "verbosity" in defaults.memcached
                    then [ defaults.memcached.verbosity ]
                    else [],
                  ports: [
                    {
                      name: "memcache",
                      containerPort: 11211,
                    }
                  ],
                  livenessProbe: {
                    tcpSocket: { port: "memcache" },
                    initialDelaySeconds: 30,
                    timeoutSeconds: 5,
                  },
                  readinessProbe: {
                    tcpSocket: { port: "memcache" },
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

    service(namespace, name, selector={app: name}):: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        namespace: namespace,
        name: name,
        labels: { app: name },
      },
      spec: {
        clusterIP: "None",
        ports: [
          {
            name: "memcache",
            port: 11211,
            targetPort: "memcache"
          },
        ],
        selector: selector,
      },
    },
  },
}

local k = import "k.libsonnet";

{
  parts:: {
    simple(namespace, name, gpus, image, command, args):: {
      apiVersion: "kubeflow.org/v1alpha1",
      kind: "MPIJob",
      metadata: {
        name: name,
        namespace: namespace,
      },
      spec: {
        gpus: gpus,
        template: {
          spec: {
            containers: [
              {
                name: name,
                image: image,
                [if command != "null" then "command"]: [command],
                [if args != "null" then "args"]: std.split(args, ","),
              },
            ],
          },
        },
      },
    },

    custom(namespace, name, replicas, gpusPerReplica, image, command, args):: {
      apiVersion: "kubeflow.org/v1alpha1",
      kind: "MPIJob",
      metadata: {
        name: name,
        namespace: namespace,
      },
      spec: {
        replicas: replicas,
        template: {
          spec: {
            containers: [
              {
                name: name,
                image: image,
                [if command != "null" then "command"]: [command],
                [if args != "null" then "args"]: std.split(args, ","),
                resources: {
                  limits: {
                    "nvidia.com/gpu": gpusPerReplica,
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
}

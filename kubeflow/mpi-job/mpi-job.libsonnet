
{
  local k = import "k.libsonnet",

  parts(env, params):: {
    local containerCommand = if params.command != "null" then
      {
        command: std.split(params.command, ","),
      }
      else {},

    local containerArgs = if params.args != "null" then
      {
        args: std.split(params.args, ","),
      }
      else {},

    local storageEnabled =
      if std.objectHas(params, "pvcName") && std.objectHas(params, "volumeMountPath")
        && params.pvcName != 'null' && params.volumeMountPath != 'null' then true else false,

    mpiJobSimple:: {
      apiVersion: "kubeflow.org/v1alpha1",
      kind: "MPIJob",
      metadata: {
        name: params.name,
        namespace: env.namespace,
      },
      spec: {
        gpus: params.gpus,
        template: {
          spec: {
            containers: [
              {
                name: params.name,
                image: params.image,
              } + containerCommand + containerArgs,
            ],
          },
        },
      },
    },

    mpiJobCustom:: {
      apiVersion: "kubeflow.org/v1alpha1",
      kind: "MPIJob",
      metadata: {
        name: params.name,
        namespace: env.namespace,
      },
      spec: {
        replicas: params.replicas,
        template: {
          spec: {
            containers: [
              {
                name: params.name,
                image: params.image,
                resources: {
                  limits: {
                    "nvidia.com/gpu": params.gpusPerReplica,
                  },
                },
              } + containerCommand + containerArgs + if storageEnabled then {
                  volumeMounts: [
                    {
                      name: "persistent-storage",
                      mountPath: params.volumeMountPath,
                    }
                  ]
              } else {} ,
            ],
          } + if storageEnabled then {
            volumes:[
              {
                name: "persistent-storage",
                persistentVolumeClaim: {
                  claimName: params.pvcName
                },
              }
            ]
          } else {},
        }
      }
    }
  }
}
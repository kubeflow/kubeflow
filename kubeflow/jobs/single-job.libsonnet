{
  local k8s = import "k8s.libsonnet",
  local util = import "kubeflow/core/util.libsonnet",

  new(_env, _params):: {
    local params = _params + _env,

    local singleContainer = {
      name: params.jobName,
      image: params.jobImage,
    } + if params.jobCommand != "null" then {
      command: [
        params.jobCommand,
      ],
    } else {} + if params.jobArgs != "null" then {
      args: util.toArray(params.jobArgs),
    } else {},

    local singleJob = {
      apiVersion: "batch/v1",
      kind: "Job",
      metadata: {
        name: params.jobName,
        namespace: params.namespace,
      },
      spec: {
        template: {
          spec: {
            containers: [
              singleContainer,
            ],
            restartPolicy: "Never",
          },
        },
        backoffLimit: 2,
      },
    },
    singleJob:: singleJob,

    parts:: self,
    all:: [
      self.singleJob,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

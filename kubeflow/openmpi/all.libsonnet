local service = import "kubeflow/openmpi/service.libsonnet";
local workloads = import "kubeflow/openmpi/workloads.libsonnet";
local assets = import "kubeflow/openmpi/assets.libsonnet";
local redis = import "kubeflow/openmpi/redis.libsonnet";

{
  all(params, env):: $.parts(params, env).all,

  parts(params, env):: {
    // updatedParams uses the environment namespace if
    // the namespace parameter is not explicitly set
    local updatedParams = params {
      namespace: if params.namespace == "null" then env.namespace else params.namespace,
      cmd: if params.cmd == "null" then "sleep infinity" else params.cmd,
    },

    all::
      redis.all(updatedParams)
      + assets.all(updatedParams)
      + workloads.all(updatedParams)
      + service.all(updatedParams)
  },
}

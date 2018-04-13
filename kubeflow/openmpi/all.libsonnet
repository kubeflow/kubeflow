local service = import "kubeflow/openmpi/service.libsonnet";
local workloads = import "kubeflow/openmpi/workloads.libsonnet";
local assets = import "kubeflow/openmpi/assets.libsonnet";

{
  parts(params, env):: {
    // updatedParams uses the environment namespace if
    // the namespace parameter is not explicitly set
    local updatedParams = params {
      namespace: if params.namespace == "null" then env.namespace else params.namespace,
    },

    all:: [
      service.all(updatedParams),
      workloads.master(updatedParams),
      workloads.worker(updatedParams),
      assets.all(updatedParams),
    ],
  },
}

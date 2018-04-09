local service = import "kubeflow/openmpi/service.libsonnet";
local master = import "kubeflow/openmpi/master.libsonnet";
local worker = import "kubeflow/openmpi/worker.libsonnet";
local assets = import "kubeflow/openmpi/assets.libsonnet";
local secrets = import "kubeflow/openmpi/secrets.libsonnet";

{
  parts(params, env):: {
    // updatedParams uses the environment namespace if
    // the namespace parameter is not explicitly set
    local updatedParams = params {
      namespace: if params.namespace == "null" then env.namespace else params.namespace,
    },

    all:: [
      service.all(updatedParams),
      master.all(updatedParams),
      worker.all(updatedParams),
      assets.all(updatedParams),
      secrets.all(updatedParams),
    ],
  },
}

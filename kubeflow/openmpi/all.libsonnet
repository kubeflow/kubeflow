local service = import "kubeflow/openmpi/service.libsonnet";
local master = import "kubeflow/openmpi/master.libsonnet";
local worker = import "kubeflow/openmpi/worker.libsonnet";
local assets = import "kubeflow/openmpi/assets.libsonnet";
local secrets = import "kubeflow/openmpi/secrets.libsonnet";

{
  all(params):: [
    service.all(params),
    master.all(params),
    worker.all(params),
    assets.all(params),
    secrets.all(params),
  ],
}

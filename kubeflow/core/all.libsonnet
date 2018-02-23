{
  parts(params):: {
    local ambassador = import "kubeflow/core/ambassador.libsonnet",
    local jupyter = import "kubeflow/core/jupyterhub.libsonnet",
    local nfs = import "kubeflow/core/nfs.libsonnet",
    local tfjob = import "kubeflow/core/tf-job.libsonnet",

    local name = params.name,
    local namespace = params.namespace,
    local diskParam = params.disks,

    local diskNames = if diskParam != "null" && std.length(diskParam) > 0 then
      std.split(diskParam, ",")
    else [],

    local jupyterConfigMap = if std.length(diskNames) == 0 then
      jupyter.parts(namespace).jupyterHubConfigMap
    else jupyter.parts(namespace).jupyterHubConfigMapWithVolumes(diskNames),

    local updated_params = params {
      kubeSpawner:: jupyter.parts(namespace).kubeSpawner(params.jupyterHubAuthenticator, diskNames),
    },
    all:: jupyter.all(updated_params)
          // TODO(jlewi): We should make `all` top level within each libsonnet file and
          // not a field within parts.
          + tfjob.parts(params.namespace).all(params)
          + ambassador.parts(namespace).all + nfs.nfsComponents(namespace, name, diskNames),
  },
}

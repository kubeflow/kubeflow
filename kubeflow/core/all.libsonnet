{
  parts(params):: {
    local ambassador = import "kubeflow/core/ambassador.libsonnet",
    local jupyter = import "kubeflow/core/jupyterhub.libsonnet",
    local nfs = import "kubeflow/core/nfs.libsonnet",
    local tfjob = import "kubeflow/core/tf-job.libsonnet",
    local spartakus = import "kubeflow/core/spartakus.libsonnet",

    params.diskNames = if params.disks != "null" && std.length(params.disk) > 0 then
      std.split(params.disk, ",")
    else [],

    all:: jupyter.all(params)
          // TODO(jlewi): We should make `all` top level within each libsonnet file and
          // not a field within parts.
          + tfjob.parts(params.namespace).all(params)
          + ambassador.all(params) 
          + nfs.nfsComponents(params.namespace, params.name, params.diskNames)
          + spartakus.all(params),
  },
}

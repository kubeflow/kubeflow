{
  parts(params):: {
    local ambassador = import "kubeflow/core/ambassador.libsonnet",
    local jupyterhub = import "kubeflow/core/jupyterhub.libsonnet",
    local tfjob = import "kubeflow/core/tf-job-operator.libsonnet",
    local spartakus = import "kubeflow/core/spartakus.libsonnet",
    local centraldashboard = import "kubeflow/core/centraldashboard.libsonnet",
    local version = import "kubeflow/core/version.libsonnet",

    all:: jupyterhub.all(params)
          + tfjob.all(params)
          + ambassador.all(params)
          + spartakus.all(params)
          + centraldashboard.all(params)
          + version.all(params),
  },
}

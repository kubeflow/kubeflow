{
  parts(params):: {
    local tfjob = import "kubeflow/core/tf-job-operator.libsonnet",
    local spartakus = import "kubeflow/core/spartakus.libsonnet",
    local version = import "kubeflow/core/version.libsonnet",

    all:: tfjob.all(params)
          + spartakus.all(params)
          + version.all(params),
  },
}

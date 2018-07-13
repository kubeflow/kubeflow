{
  parts(params):: {
    local version = import "kubeflow/core/version.libsonnet",

    all:: version.all(params),
  },
}

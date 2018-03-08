local params = import "../../components/params.libsonnet";
params {
  components+: {
    gpu_model+: {
      name: "gpu-model",
      namespace: "kubeflow-test-infra",
    },
  },
}

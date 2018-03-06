local params = import "../../components/params.libsonnet";
params + {
  components +: {
    // Insert component parameter overrides here. Ex:
    // guestbook +: {
    //   name: "guestbook-dev",
    //   replicas: params.global.replicas,
    // },
    gpu_model +: {
      name: "gpu-model",
      namespace: "kubeflow-test-infra",
    },
  },
}

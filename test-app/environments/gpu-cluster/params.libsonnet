local params = import "../../components/params.libsonnet";
params + {
  components +: {
    // Insert component parameter overrides here. Ex:
    // guestbook +: {
    //   name: "guestbook-dev",
    //   replicas: params.global.replicas,
    // },
    "tf-job" +: {
      namespace: "cnn-test",
      numGpus: 1,
      num_gpus: 1,
    },
    "tf-cnn1" +: {
      namespace: "cnn-test",
      numGpus: 2,
    },
    "kubeflow-core" +: {
      namespace: "cnn-test",
    },
  },
}

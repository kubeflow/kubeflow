local params = import "../../components/params.libsonnet";
params + {
  components +: {
    // Insert component parameter overrides here. Ex:
    // guestbook +: {
    //   name: "guestbook-dev",
    //   replicas: params.global.replicas,
    // },
    kubeflow +: {
      namespace: "ks-test2",
    },
    nfs +: {
      disks: "jlewi-kubeflow-test1,jlewi-kubeflow-test2",
    },
    "inception2" +: {
      namespace: "ks-test2",
    },
  },
}

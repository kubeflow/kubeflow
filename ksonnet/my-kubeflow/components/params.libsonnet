{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,    
  },

  components: {
    "core2": {
      disks: "null",
      name: "core2",
      namespace: "ks-test3",
    },
    "core3": {
      cloud: "null",
      disks: "null",
      name: "core3",
      namespace: "ks-test3",
      tfJobImage: "gcr.io/tf-on-k8s-dogfood/tf_operator:v20171214-0bd02ac",
    },
    "core4": {
      cloud: "null",
      disks: "null",
      name: "core4",
      namespace: "ks-test4",
      tfJobImage: "gcr.io/tf-on-k8s-dogfood/tf_operator:v20171214-0bd02ac",
    },
  },
}

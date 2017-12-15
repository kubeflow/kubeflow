{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,    
  },

  components: {
    "core6": {
      cloud: "null",
      disks: "disk3",
      name: "core6",
      namespace: "default",
      tfJobImage: "gcr.io/tf-on-k8s-dogfood/tf_operator:v20171214-0bd02ac",
    },
    "core7": {
      cloud: "null",
      disks: "disk3",
      name: "core7",
      namespace: "default",
      tfJobImage: "gcr.io/tf-on-k8s-dogfood/tf_operator:v20171214-0bd02ac",
    },
    "nfs-test1": {
      cloud: "null",
      disks: "jlewi-kubeflow-test3",
      name: "nfs-test1",
      namespace: "nfs-test1",
      tfJobImage: "gcr.io/tf-on-k8s-dogfood/tf_operator:v20171214-0bd02ac",
    },
  },
}

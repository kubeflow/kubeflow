{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    argo: {
      namespace: "kubeflow-test-infra",
    },
    workflows: {
      bucket: "kai-kubeflow",
      commit: "master",
      name: "build-push1",
      namespace: "kubeflow-test-infra",
      prow_env: "REPO_OWNER=google,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
    },
    "nfs-jupyter": {
      cloud: "",
      disks: "kubeflow-testing",
      name: "nfs-jupyter",
      namespace: "kubeflow-test-infra",
      tfJobImage: "gcr.io/tf-on-k8s-dogfood/tf_operator:v20171214-0bd02ac",
    },
  },
}

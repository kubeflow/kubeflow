{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    "argo": {
      namespace: "kubeflow-test-infra",
    },
    "workflows": {
      bucket: "mlkube-testing_temp",
      name: "e2e-test-presubmit-20180102-204405",
      namespace: "kubeflow-test-infra",
      prow_env: "REPO_OWNER=google,REPO_NAME=kubeflow,PULL_NUMBER=72,PULL_PULL_SHA=pr,BUILD_NUMBER=101,JOB_NAME=kubeflow-presubmit",
    },
    "nfs-jupyter": {
      cloud: "null",
      disks: "kubeflow-testing",
      name: "nfs-jupyter",
      namespace: "kubeflow-test-infra",
      tfJobImage: "gcr.io/tf-on-k8s-dogfood/tf_operator:v20171214-0bd02ac",
    },
  },
}

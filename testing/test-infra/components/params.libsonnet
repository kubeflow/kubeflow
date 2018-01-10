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
      name: "kubeflow-presubmit-81-2-39b6",
      namespace: "kubeflow-test-infra",
      prow_env: "BUILD_NUMBER=2,JOB_NAME=kubeflow-presubmit,JOB_TYPE=presubmit,PULL_NUMBER=81,REPO_NAME=kubeflow,REPO_OWNER=google",
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

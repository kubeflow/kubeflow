{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    workflows: {
      bucket: "mlkube-testing_temp",
      name: "jlewi-kubeflow-presubmit-test-209-5845",
      namespace: "kubeflow-test-infra",
      prow: "JOB_NAME=kubeflow-presubmit-test,JOB_TYPE=presubmit,PULL_NUMBER=209,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=997a",
      prow_env: "JOB_NAME=kubeflow-presubmit-test,JOB_TYPE=presubmit,PULL_NUMBER=209,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=5845",
    },
  },
}

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
      name: "kubeflow-presubmit-81-2-39b6",
      namespace: "kubeflow-test-infra",
      prow_env: "BUILD_NUMBER=2,JOB_NAME=kubeflow-presubmit,JOB_TYPE=presubmit,PULL_NUMBER=81,REPO_NAME=kubeflow,REPO_OWNER=google",
    },
  },
}

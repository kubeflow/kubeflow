{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    workflows: {
      bucket: "kubeflow-ci_temp",
      commit: "master",
      name: "new9",
      namespace: "kubeflow-test-infra",
      prow_env: "REPO_OWNER=kubeflow,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
      serving_image: "gcr.io/kubeflow-ci/model-server",
      testing_image: "gcr.io/kubeflow-ci/test-worker:latest",
      tf_testing_image: "gcr.io/kubeflow-ci/tf-test-worker:1.0",
      project: "kubeflow-ci",
      cluster: "kubeflow-testing",
      zone: "us-east1-d",
    },
  },
}

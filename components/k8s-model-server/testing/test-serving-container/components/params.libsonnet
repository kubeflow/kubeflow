{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    workflows: {
      bucket: "kai-kubeflow",
      commit: "master",
      name: "new4",
      namespace: "kubeflow-test-infra",
      prow_env: "REPO_OWNER=google,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
      serving_image: "gcr.io/kai-test2/model-server:1.1",
    },
  },
}

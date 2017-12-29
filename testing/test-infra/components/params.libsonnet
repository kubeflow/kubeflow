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
      commit: "pr",
      name: "e2e-test-presubmit-20171229-114032",
      namespace: "kubeflow-test-infra",
      pr: 72,
    },
  },
}

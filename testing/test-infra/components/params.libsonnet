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
      name: "e2e-test-presubmit-20180102-123017",
      namespace: "kubeflow-test-infra",
      // TODO(jlewi): I think we should get rid of the parameters commit and pr since they
      // are redundant with the prow environment variables? We should just have the bash script
      // that checks out the code get the relevant info from the environment variables.
      pr: 72,
      // A comma separated list of prow environment variables.
      // e.g. "PROW_BASE_REF=master,PROW_PULL_NUMBER=72"
      prow_env: "PROW_BASE_REF=master,PROW_PULL_NUMBER=72",      
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

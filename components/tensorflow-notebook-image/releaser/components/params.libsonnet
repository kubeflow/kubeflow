{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    workflows: {
      bucket: "kubeflow-releasing-artifacts",
      gcpCredentialsSecretName: "gcp-credentials",
      name: "jlewi-notebook-release-317-0892",
      namespace: "kubeflow-releasing",
      prow_env: "JOB_NAME=notebook-release,JOB_TYPE=presubmit,PULL_NUMBER=317,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=0892",
      registry: "gcr.io/kubeflow-images-public",
      versionTag: "",
    },
  },
}

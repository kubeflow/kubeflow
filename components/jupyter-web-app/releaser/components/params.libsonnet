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
      cluster: "kubeflow-releasing",
      dockerfile: "Dockerfile",
      dockerfileDir: "components/jupyter-web-app",
      extra_args: "",
      extra_repos: "kubeflow/testing@HEAD",
      gcpCredentialsSecretName: "gcp-credentials",
      image: "jupyter-web-app",
      name: "workflows",
      namespace: "kubeflow-releasing",
      nfsVolumeClaim: "nfs-external",
      project: "kubeflow-releasing",
      prow_env: "REPO_OWNER=kubeflow,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
      registry: "gcr.io/kubeflow-images-public",
      testing_image: "gcr.io/kubeflow-ci/test-worker/test-worker:v20190116-b7abb8d-e3b0c4",
      versionTag: "latest",
      zone: "us-central1-a",
    },
  },
}

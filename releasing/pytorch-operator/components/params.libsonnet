{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    "pytorch-operator": {
      bucket: "kubeflow-releasing-artifacts",
      cluster: "kubeflow-releasing",
      dockerfile: "Dockerfile",
      dockerfileDir: "kubeflow/pytorch-operator",
      extra_args: "/mnt",
      extra_repos: "kubeflow/testing@HEAD;kubeflow/pytorch-operator@HEAD",
      gcpCredentialsSecretName: "gcp-credentials",
      image: "pytorch-operator",
      name: "pytorch-operator",
      namespace: "kubeflow-releasing",
      nfsVolumeClaim: "nfs-external",
      project: "kubeflow-releasing",
      prow_env: "REPO_OWNER=kubeflow,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
      registry: "gcr.io/kubeflow-images-public",
      testing_image: "gcr.io/kubeflow-releasing/worker:latest",
      versionTag: "latest",
      zone: "us-central1-a",
    },
  },
}

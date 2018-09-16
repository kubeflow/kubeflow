{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    "kubebench-controller": {
      bucket: "kubeflow-releasing-artifacts",
      cluster: "kubeflow-releasing",
      dockerfile: "Dockerfile",
      dockerfileDir: "kubeflow/kubebench/build/images/controller",
      extra_args: "null",
      extra_repos: "kubeflow/testing@HEAD;kubeflow/kubebench@HEAD",
      gcpCredentialsSecretName: "gcp-credentials",
      image: "kubebench-controller",
      name: "kubebench-controller",
      namespace: "kubeflow-releasing",
      nfsVolumeClaim: "nfs-external",
      project: "kubeflow-releasing",
      prow_env: "REPO_OWNER=kubeflow,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
      registry: "gcr.io/kubeflow-images-public",
      testing_image: "gcr.io/kubeflow-releasing/worker:latest",
      versionTag: "latest",
      zone: "us-central1-a",
    },
    "kubebench-examples": {
      bucket: "kubeflow-releasing-artifacts",
      cluster: "kubeflow-releasing",
      dockerfile: "Dockerfile",
      dockerfileDir: "kubeflow/kubebench/build/images/examples",
      extra_args: "null",
      extra_repos: "kubeflow/testing@HEAD;kubeflow/kubebench@HEAD",
      gcpCredentialsSecretName: "gcp-credentials",
      image: "kubebench-example",
      name: "kubebench-examples",
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

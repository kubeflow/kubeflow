local params = import "../../components/params.libsonnet";
params {
  components+: {
    // Insert component parameter overrides here. Ex:
    // guestbook +: {
    //   name: "guestbook-dev",
    //   replicas: params.global.replicas,
    // },
    workflows+: {
      bucket: "kubeflow-releasing-artifacts",
      gcpCredentialsSecretName: "gcp-credentials",
      name: "jlewi-notebook-release-317-0892",
      namespace: "kubeflow-releasing",
      prow_env: "JOB_NAME=notebook-release,JOB_TYPE=presubmit,PULL_NUMBER=317,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=0892",
      registry: "gcr.io/kubeflow-images-public",
      versionTag: "v20180301-pr317",
    },
  },
}

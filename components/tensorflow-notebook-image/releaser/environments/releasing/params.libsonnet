local params = import "../../components/params.libsonnet";
params + {
  components +: {
    // Insert component parameter overrides here. Ex:
    // guestbook +: {
    //   name: "guestbook-dev",
    //   replicas: params.global.replicas,
    // },
    workflows +: {
      bucket: "kubeflow-releasing-artifacts",
      gcpCredentialsSecretName: "gcp-credentials",
      name: "jlewi-notebook-release-327-ba1c",
      namespace: "kubeflow-releasing",
      prow_env: "JOB_NAME=notebook-release,JOB_TYPE=presubmit,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=ba1c,PULL_NUMBER=327,PULL_PULL_SHA=03f7362",
      registry: "gcr.io/kubeflow-images-staging",
      versionTag: "v20180301-1855-pr327-03f7362-ba1c",
    },
  },
}

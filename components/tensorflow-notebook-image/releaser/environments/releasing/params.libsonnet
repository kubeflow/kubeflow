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
      name: "jlewi-notebook-release-328-a43d",
      namespace: "kubeflow-releasing",
      prow_env: "JOB_NAME=notebook-release,JOB_TYPE=presubmit,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=a43d,PULL_NUMBER=328,PULL_PULL_SHA=0bc73dc",
      registry: "gcr.io/kubeflow-images-staging",
      versionTag: "v20180301-1958-pr328-0bc73dc-a43d",
    },
  },
}

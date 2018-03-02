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
      name: "jlewi-notebook-release-317-f88d",
      namespace: "kubeflow-releasing",
      prow_env: "JOB_NAME=notebook-release,JOB_TYPE=presubmit,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=f88d,PULL_NUMBER=317,PULL_PULL_SHA=1932b26",
      registry: "gcr.io/kubeflow-images-staging",
      versionTag: "v20180301-1838-pr317-1932b26-f88d",
    },
  },
}

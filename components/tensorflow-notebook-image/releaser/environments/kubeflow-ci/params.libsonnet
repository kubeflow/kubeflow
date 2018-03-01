local params = import "../../components/params.libsonnet";
params + {
  components +: {
    // Insert component parameter overrides here. Ex:
    // guestbook +: {
    //   name: "guestbook-dev",
    //   replicas: params.global.replicas,
    // },
    workflows +: {
      name: "jlewi-notebook-release-317-4571",
      namespace: "kubeflow-test-infra",
      prow_env: "JOB_NAME=notebook-release,JOB_TYPE=presubmit,PULL_NUMBER=317,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=4571",
      versionTag: "v20180228-pr317",
    },
  },
}

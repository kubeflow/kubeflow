local params = import "../../components/params.libsonnet";
params + {
  components+: {
    // Insert component parameter overrides here. Ex:
    // guestbook +: {
    //   name: "guestbook-dev",
    //   replicas: params.global.replicas,
    // },
    workflows +: {
      name: "jlewi-tf-serving-release-v20180303-pr339-d1f0fb7-a0ea-a0ea",
      namespace: "kubeflow-test-infra",
      prow_env: "JOB_NAME=tf-serving-release,JOB_TYPE=presubmit,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=a0ea,PULL_NUMBER=339,PULL_PULL_SHA=d1f0fb7",
    },
  },
}

local params = import "../../components/params.libsonnet";
params + {
  components+: {
    // Insert component parameter overrides here. Ex:
    // guestbook +: {
    //   name: "guestbook-dev",
    //   replicas: params.global.replicas,
    // },
    workflows +: {
      name: "jlewi-tf-serving-release-v20180303-pr339-ae29175-a3d7-a3d7",
      namespace: "kubeflow-test-infra",
      prow_env: "JOB_NAME=tf-serving-release,JOB_TYPE=presubmit,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=a3d7,PULL_NUMBER=339,PULL_PULL_SHA=ae29175",
    },
  },
}

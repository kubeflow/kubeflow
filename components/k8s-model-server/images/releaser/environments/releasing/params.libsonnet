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
      cluster: "kubeflow-releasing",
      gcpCredentialsSecretName: "gcp-credentials",
      name: "jlewi-tf-serving-release-v20180303-pr339-72bc7b1-8cd1-8cd1",
      namespace: "kubeflow-releasing",
      nfsVolumeClaim: "nfs-external",
      project: "kubeflow-releasing",
      prow_env: "JOB_NAME=tf-serving-release,JOB_TYPE=presubmit,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=8cd1,PULL_NUMBER=339,PULL_PULL_SHA=72bc7b1",
      registry: "gcr.io/kubeflow-images-public",
      testing_image: "gcr.io/kubeflow-releasing/worker:v20180227-03a5f86-dirty-e3b0c4",
      zone: "us-central1-a",
    },
  },
}

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
      name: "lunkai-tf-serving-release-v20180326-b0c432b9-2",
      namespace: "kubeflow-releasing",
      nfsVolumeClaim: "nfs-external",
      project: "kubeflow-releasing",
      prow_env: "JOB_NAME=tf-serving-release,JOB_TYPE=postsubmit,PULL_BASE_SHA=b0c432b9,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=c646",
      registry: "gcr.io/kubeflow-images-public",
      testing_image: "gcr.io/kubeflow-releasing/worker:v20180227-03a5f86-dirty-e3b0c4",
      versionTag: "v20180326-b0c432b9",
      zone: "us-central1-a",
    },
  },
}

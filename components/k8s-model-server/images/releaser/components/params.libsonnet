{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    workflows: {
      bucket: "mlkube-testing_temp",
      commit: "master",
      name: "new9",
      namespace: "kubeflow-test-infra",
      prow_env: "REPO_OWNER=kubeflow,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
      serving_image: "gcr.io/kubeflow-ci/model-server",
      testing_image: "gcr.io/mlkube-testing/test-worker:latest",
      tf_testing_image: "gcr.io/kubeflow-ci/tf-test-worker:1.0",
      project: "mlkube-testing",
      cluster: "kubeflow-testing",
      zone: "us-east1-d",
    },
    // Test deploying a GPU model.
    gpu_model: {
      http_proxy_image: "gcr.io/kubeflow/http-proxy:1.0",
      model_path: "gs://some-bucket/some/model",
      model_server_image: "gcr.io/kubeflow-images-staging/tf-model-server-gpu:v20180305-pr362-7f250ae-5cc7",
      name: "gpu_model",
      namespace: "default",
      service_type: "ClusterIP",
    },
  },
}

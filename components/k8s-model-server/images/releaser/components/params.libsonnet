{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    workflows: {
      commit: "master",
      name: "new9",
      namespace: "kubeflow-test-infra",
      prow_env: "REPO_OWNER=kubeflow,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
    },
    // Test deploying a GPU model.
    gpu_model: {
      http_proxy_image: "gcr.io/kubeflow/http-proxy:1.0",
      model_path: "gs://kubeflow-ci-test-models/mnist/",
      model_server_image: "gcr.io/kubeflow-images-public/tf-model-server-gpu:v20180305-pr362-7f250ae-5cc7",
      name: "gpu_model",
      namespace: "default",
      service_type: "ClusterIP",
    },
  },
}

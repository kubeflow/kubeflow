{
  global: {},
  components: {
    // Component-level parameters, defined initially from 'ks prototype use ...'
    // Each object below should correspond to a component in the components/ directory
    workflows: {
      bucket: "kubeflow-ci_temp",
      mode: "minikube",
      name: "jlewi-kubeflow-gke-deploy-test-4-3a8b",
      namespace: "kubeflow-test-infra",
      platform: "minikube",
      prow: "JOB_NAME=kubeflow-presubmit-test,JOB_TYPE=presubmit,PULL_NUMBER=209,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=997a",
      prow_env: "JOB_NAME=kubeflow-gke-deploy-test,JOB_TYPE=presubmit,PULL_NUMBER=4,REPO_NAME=kubeflow,REPO_OWNER=jlewi,BUILD_NUMBER=3a8b",
    },
    gke_deploy: {
      bucket: "kubeflow-ci_temp",
      name: "jlewi-kubeflow-gke-deploy-test-4-3a8b",
      namespace: "kubeflow-test-infra",
      prow: "JOB_NAME=kubeflow-presubmit-test,JOB_TYPE=presubmit,PULL_NUMBER=209,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=997a",
      prow_env: "JOB_NAME=kubeflow-gke-deploy-test,JOB_TYPE=presubmit,PULL_NUMBER=4,REPO_NAME=kubeflow,REPO_OWNER=jlewi,BUILD_NUMBER=3a8b",
    },
    kfctl_test: {
      bucket: "kubeflow-ci_temp",
      name: "somefakename",
      namespace: "kubeflow-test-infra",
      prow_env: "",
      deleteKubeflow: true,
    },
    click_deploy_test: {
      bucket: "kubeflow-ci_temp",
      name: "somefakename",
      namespace: "kubeflow-test-infra",
      prow_env: "",
    },
    unit_tests: {
      bucket: "kubeflow-ci_temp",
      name: "somefakename",
      namespace: "kubeflow-test-infra",
      prow_env: "",
    },
    tfserving: {
      commit: "master",
      name: "somefakename",
      namespace: "kubeflow-test-infra",
      prow_env: "REPO_OWNER=kubeflow,REPO_NAME=kubeflow,PULL_BASE_SHA=master",
    },
  },
}

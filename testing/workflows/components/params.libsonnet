{
  global: {
    // User-defined global parameters; accessible to all component and environments, Ex:
    // replicas: 4,
  },
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
  },
}

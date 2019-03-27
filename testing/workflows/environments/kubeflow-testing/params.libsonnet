local params = import '../../components/params.libsonnet';

params {
  components+: {
    kfctl_Test+: {
      namespace: 'kubeflow-test-infra',
      name: 'jlewi-kfctl-test-1308-0539',
      prow_env: 'JOB_NAME=kfctl-test,JOB_TYPE=presubmit,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=0539,PULL_NUMBER=1308',
    },
    kfctl_test+: {
      namespace: 'kubeflow-test-infra',
      name: 'jlewi-kfctl-test-2333-0128-053655',
      prow_env: 'JOB_NAME=kfctl-test,JOB_TYPE=presubmit,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=0128-053655,PULL_NUMBER=2333',
      deleteCluster: true,
      deleteKubeflow: false,
    },
    unit_tests+: {
      namespace: 'kubeflow-test-infra',
      name: 'jlewi-unittests-1342-0809-235820',
      prow_env: 'JOB_NAME=unittests,JOB_TYPE=presubmit,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=0809-235820,PULL_NUMBER=1342',
    },
    kfctl_go_test+: {
      namespace: 'kubeflow-test-infra',
      name: 'jlewi-kfctl-test-2795-0325-153457',
      prow_env: 'JOB_NAME=kfctl-test,JOB_TYPE=presubmit,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=0325-153457,PULL_NUMBER=2795',
      deleteKubeflow: false,
    },
  },
}
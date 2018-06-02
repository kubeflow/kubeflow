local params = std.extVar('__ksonnet/params');
local globals = import 'globals.libsonnet';
local envParams = params {
  components+: {
    "tf-serving-workflow"+: {
      name: 'release1',
    },
    "tf-notebook-workflow"+: {
      name: 'agwl-tensorflow-notebook-image-release-v20180602-b3733835',
      namespace: 'kubeflow-releasing',
      versionTag: 'v20180602-b3733835',
      prow_env: 'JOB_NAME=tensorflow-notebook-image-release,JOB_TYPE=postsubmit,PULL_BASE_SHA=b3733835,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=999C',
    },
  },
};

{
  components: {
    [x]: envParams.components[x] + globals
    for x in std.objectFields(envParams.components)
  },
}
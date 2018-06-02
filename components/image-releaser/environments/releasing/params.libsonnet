local params = std.extVar('__ksonnet/params');
local globals = import 'globals.libsonnet';
local envParams = params {
  components+: {
    "tf-serving-workflow"+: {
      name: 'release1',
    },
    "tf-notebook-workflow"+: {
      name: 'tensorflow-notebook-image-release-v20180602-b3733835',
      namespace: 'kubeflow-releasing',
      versionTag: 'v20180602-b3733835',
      prow_env: 'JOB_NAME=tensorflow-notebook-image-release,JOB_TYPE=postsubmit,PULL_BASE_SHA=b3733835,REPO_NAME=kubeflow,REPO_OWNER=kubeflow,BUILD_NUMBER=472F',
      prowEnv: 'BUILD_ID=9154,BUILD_NUMBER=9154,JOB_NAME=tensorflow-notebook-image-release,JOB_TYPE=presubmit,PULL_BASE_SHA=b373383560ae844b9e677ac67e0290e6e980b7ee,PULL_NUMBER=916,PULL_PULL_SHA=4cb2c1ecf106971969b1b468cb8963d376ecd3fd,REPO_NAME=kubeflow,REPO_OWNER=kubeflow',
    },
    workflows+: {
      prow_env: 'BUILD_ID=9154,BUILD_NUMBER=9154,JOB_NAME=tensorflow-notebook-image-release,JOB_TYPE=presubmit,PULL_BASE_SHA=b373383560ae844b9e677ac67e0290e6e980b7ee,PULL_NUMBER=916,PULL_PULL_SHA=4cb2c1ecf106971969b1b468cb8963d376ecd3fd,REPO_NAME=kubeflow,REPO_OWNER=kubeflow',
      prowEnv: 'BUILD_ID=9154,BUILD_NUMBER=9154,JOB_NAME=tensorflow-notebook-image-release,JOB_TYPE=presubmit,PULL_BASE_SHA=b373383560ae844b9e677ac67e0290e6e980b7ee,PULL_NUMBER=916,PULL_PULL_SHA=4cb2c1ecf106971969b1b468cb8963d376ecd3fd,REPO_NAME=kubeflow,REPO_OWNER=kubeflow',
    },
  },
};

{
  components: {
    [x]: envParams.components[x] + globals
    for x in std.objectFields(envParams.components)
  },
}
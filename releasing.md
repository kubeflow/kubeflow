# Releasing Kubeflow

Some preliminary instructions for how to cut a release.


## Build TFJob operator

We build TFJob operator by running the E2E test workflow.

Look at the [postsubmit dashboard](https://k8s-testgrid.appspot.com/sig-big-data#kubeflow-tf-operator-postsubmit)
to find the latest green postsubmit.

Checkout that commit

```
cd ${GIT_KUBEFLOW_TF_OPERATOR}
git checkout ${COMMIT}
cd test/workflows
```

Run the E2E test workflow using our release cluster

[kubeflow/testing#42](https://github.com/kubeflow/testing/issues/42) will simplify this.

```
PULL_BASE_SHA=<commit to build>
DATE=`date +%Y%m%d`
VERSION_TAG="v${DATE}-${PULL_BASE_SHA}"
JOB_NAME="tf-operator-release"
JOB_TYPE=postsubmit
BUILD_NUMBER=$(uuidgen)
BUILD_NUMBER=${BUILD_NUMBER:0:4}
REPO_OWNER=kubeflow
REPO_NAME=tf-operator
ENV=releasing
ks param set --env=${ENV} workflows namespace kubeflow-releasing
ks param set --env=${ENV} workflows name "${USER}-${JOB_NAME}-${VERSION_TAG}"
ks param set --env=${ENV} workflows prow_env "JOB_NAME=${JOB_NAME},JOB_TYPE=${JOB_TYPE},PULL_BASE_SHA=${PULL_BASE_SHA},REPO_NAME=${REPO_NAME},REPO_OWNER=${REPO_OWNER},BUILD_NUMBER=${BUILD_NUMBER}"
ks param set --env=${ENV} workflows versionTag "${VERSION_TAG}"
ks apply ${ENV} -c workflows
```

You can monitor the workflow using the Argo UI. For our release cluster we don't expose the Argo UI publicly 
so right now you need to connect via kubectl port-forward

```
kubectl -n kubeflow-releasing port-forward `kubectl get pods --selector=app=argo-ui -o jsonpath='{.items[0].metadata.name}'` 8080:8001
```

[kubeflow/testing#43](https://github.com/kubeflow/testing/issues/43) is tracking setup of IAP to make this easier.

Make sure the Argo workflow completes successfully.
Check the junit files to make sure there were no actual test failures.
The junit files will be in `gs://kubeflow-releasing-artifacts`.

## Build TF Serving Images

We build TF serving images using an argo workflow.

Look at the [postsubmit dashboard](https://k8s-testgrid.appspot.com/sig-big-data#kubeflow-postsubmit)
to find the latest green postsubmit.

Checkout that commit

```
cd ${GIT_KUBEFLOW}
git checkout ${COMMIT}
cd releasing/releaser
```

```
PULL_BASE_SHA=<commit to build>
DATE=`date +%Y%m%d`
VERSION_TAG="v${DATE}-${PULL_BASE_SHA}"
JOB_NAME="tf-operator-release"
JOB_TYPE=postsubmit
BUILD_NUMBER=$(uuidgen)
BUILD_NUMBER=${BUILD_NUMBER:0:4}
REPO_OWNER=kubeflow
REPO_NAME=kubeflow
ENV=releasing
ks param set --env=${ENV} workflows namespace kubeflow-releasing
ks param set --env=${ENV} workflows name "${USER}-${JOB_NAME}-${VERSION_TAG}"
ks param set --env=${ENV} workflows prow_env "JOB_NAME=${JOB_NAME},JOB_TYPE=${JOB_TYPE},PULL_BASE_SHA=${PULL_BASE_SHA},REPO_NAME=${REPO_NAME},REPO_OWNER=${REPO_OWNER},BUILD_NUMBER=${BUILD_NUMBER}"
ks param set --env=${ENV} workflows serving_image "gcr.io/kubeflow-images-staging/tf-model-server:${VERSION_TAG}"
ks apply ${ENV} -c workflows
```

## Build the Jupyter Images

We build the Jupyter using our E2E argo workflows.

Look at the [postsubmit dashboard](https://k8s-testgrid.appspot.com/sig-big-data#kubeflow-postsubmit)
to find the latest green postsubmit.

Checkout that commit

```
cd ${GIT_KUBEFLOW}
git checkout ${COMMIT}
cd components/tensorflow-notebook-image/releaser
```

```
PULL_BASE_SHA=<commit to build>
DATE=`date +%Y%m%d`
VERSION_TAG="v${DATE}-${PULL_BASE_SHA}"
JOB_NAME="tf-operator-release"
JOB_TYPE=postsubmit
BUILD_NUMBER=$(uuidgen)
BUILD_NUMBER=${BUILD_NUMBER:0:4}
REPO_OWNER=kubeflow
REPO_NAME=kubeflow
ENV=releasing
ks param set --env=${ENV} workflows namespace kubeflow-releasing
ks param set --env=${ENV} workflows name "${USER}-${JOB_NAME}-${VERSION_TAG}"
ks param set --env=${ENV} workflows prow_env "JOB_NAME=${JOB_NAME},JOB_TYPE=${JOB_TYPE},PULL_BASE_SHA=${PULL_BASE_SHA},REPO_NAME=${REPO_NAME},REPO_OWNER=${REPO_OWNER},BUILD_NUMBER=${BUILD_NUMBER}"
ks param set --env=${ENV} workflows serving_image "gcr.io/kubeflow-images-staging/tf-model-server:${VERSION_TAG}"
ks apply ${ENV} -c workflows
```

## Update the ksonnet configs

Create a PR to update the ksonnet configs to use the latest images built in the previous steps.

Presubmit tests should verify that the ksonnet configs work.

Submit the PR.

Wait for a passing postsubmit of the submitted PR.

Tag the commit corresponding to the passing postsubmit with the appropriate tags for the release.

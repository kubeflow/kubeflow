# Releasing Kubeflow

Some preliminary instructions for how to cut a release.

## Authenticate to GCP

If you're new to using GKE or are new to the release team, you'll need to authenticate to GCP first.  [Install the `gcloud` tool](https://cloud.google.com/sdk/gcloud/) and then execute the following commands, substituting your Kubeflow release team account for `your-account@yourdomain.org` (if you aren't a member of `release-team@kubeflow.org`, ask to be added):

```
gcloud config set account your-account@yourdomain.org
gcloud auth 
```

This will open your browser to authenticate you.  Then you can proceed as follows:

```
gcloud config set project kubeflow-releasing
gcloud container clusters get-credentials kubeflow-releasing --zone us-central1-a --project kubeflow-releasing
```

Use [this script](https://github.com/jlewi/kubeflow-dev/blob/master/create_context.sh) to set up your context properly:

```
create_context.sh $(kubectl config current-context) kubeflow-releasing
```


## Update TFJob 

Identify the TFJob [release](https://github.com/kubeflow/tf-operator/releases) you
want to use.

  * If you need to cut a new TFJob release follow the instructions in 
[kubeflow/tf-operator](https://github.com/kubeflow/tf-operator/blob/master/releasing.md)

Update [all.jsonnet](https://github.com/kubeflow/kubeflow/blob/master/kubeflow/core/prototypes/all.jsonnet#L10)
to point to the new image.

Update [workflows.libsonnet](https://github.com/kubeflow/kubeflow/blob/master/testing/workflows/components/workflows.libsonnet#L183) 
to checkout kubeflow/tf-operator at the tag corresponding to the release.

## Build TF Serving Images

We build TF serving images using an argo workflow.

Look at the [postsubmit dashboard](https://k8s-testgrid.appspot.com/sig-big-data#kubeflow-postsubmit)
to find the latest green postsubmit.

Check out that commit

```
COMMIT=<commit to build>
cd ${GIT_KUBEFLOW}
git checkout ${COMMIT}
cd releasing/releaser
```

```
PULL_BASE_SHA=${COMMIT:0:8}
DATE=`date +%Y%m%d`
VERSION_TAG="v${DATE}-${PULL_BASE_SHA}"
JOB_NAME="tf-serving-release"
JOB_TYPE=postsubmit
BUILD_NUMBER=$(uuidgen)
BUILD_NUMBER=${BUILD_NUMBER:0:4}
REPO_OWNER=kubeflow
REPO_NAME=kubeflow
ENV=releasing
ks param set --env=${ENV} workflows namespace kubeflow-releasing
ks param set --env=${ENV} workflows name "${USER}-${JOB_NAME}-${VERSION_TAG}"
ks param set --env=${ENV} workflows prow_env "JOB_NAME=${JOB_NAME},JOB_TYPE=${JOB_TYPE},PULL_BASE_SHA=${PULL_BASE_SHA},REPO_NAME=${REPO_NAME},REPO_OWNER=${REPO_OWNER},BUILD_NUMBER=${BUILD_NUMBER}"
ks param set --env=${ENV} workflows versionTag ${VERSION_TAG}
ks apply ${ENV} -c workflows
```

## Build the Jupyter Images

We build the Jupyter using our E2E argo workflows.

Look at the [postsubmit dashboard](https://k8s-testgrid.appspot.com/sig-big-data#kubeflow-postsubmit)
to find the latest green postsubmit.

Checkout that commit

```
COMMIT=<commit to build>
cd ${GIT_KUBEFLOW}
git checkout ${COMMIT}
cd components/tensorflow-notebook-image/releaser
```

```
PULL_BASE_SHA=${COMMIT:0:8}
DATE=`date +%Y%m%d`
VERSION_TAG="v${DATE}-${PULL_BASE_SHA}"
JOB_NAME="tensorflow-notebook-image-release"
JOB_TYPE=postsubmit
BUILD_NUMBER=$(uuidgen)
BUILD_NUMBER=${BUILD_NUMBER:0:4}
REPO_OWNER=kubeflow
REPO_NAME=kubeflow
ENV=releasing
ks param set --env=${ENV} workflows namespace kubeflow-releasing
ks param set --env=${ENV} workflows name "${USER}-${JOB_NAME}-${VERSION_TAG}"
ks param set --env=${ENV} workflows versionTag "${VERSION_TAG}"
ks param set --env=${ENV} workflows prow_env  \
  "JOB_NAME=${JOB_NAME},JOB_TYPE=${JOB_TYPE},PULL_BASE_SHA=${PULL_BASE_SHA},REPO_NAME=${REPO_NAME},REPO_OWNER=${REPO_OWNER},BUILD_NUMBER=${BUILD_NUMBER}"
ks apply ${ENV} -c workflows
```

Create a PR to update [jupyterhub_spawner.py](https://github.com/kubeflow/kubeflow/blob/master/kubeflow/core/jupyterhub_spawner.py#L15) 
to point to the newly built Jupyter notebook images.

## Update the ksonnet configs

Create a PR to update the ksonnet configs to use the latest images built in the previous steps.

Presubmit tests should verify that the ksonnet configs work.

Submit the PR.

Wait for a passing postsubmit of the submitted PR.

Tag the commit corresponding to the passing postsubmit with the appropriate tags for the release.

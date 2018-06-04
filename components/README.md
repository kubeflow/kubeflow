# Building images

The Dockerfiles in each component should be parameterized, with parameters stored in a `versions` folder.
This allows us to use `build_image.py` to build all images.

For example
```
python build_image.py --tf_version=1.6 --platform=gpu tf_serving
python build_image.py --tf_version=1.4.1 tf_notebook
```

See `build_image.py` for details.

## Supported versions

### TF Serving
- CPU: 1.4, 1.5, 1.6, 1.7
- GPU: 1.6, 1.7

### TF notebook
- CPU: 1.4.1, 1.5.1, 1.6.0, 1.7.0, 1.8.0
- GPU: 1.4.1, 1.5.1, 1.6.0, 1.7.0, 1.8.0

## Releasing images

`image-releaser` is the ksonnet app of releasing workflows.

### Releasing tensorflow serving images

```
cd ${GIT_KUBEFLOW}/components/image-releaser
COMMIT=0da89b8a4af6c314287196b79d9a5f01d279b596 # Commit for the release
git checkout ${COMMIT}
PULL_BASE_SHA=${COMMIT:0:8}
DATE=`date +%Y%m%d`
VERSION_TAG="v${DATE}-${PULL_BASE_SHA}"
JOB_NAME="tf-serving"
JOB_TYPE=postsubmit
BUILD_NUMBER=$(uuidgen)
BUILD_NUMBER=${BUILD_NUMBER:0:4}
REPO_OWNER=kubeflow
REPO_NAME=kubeflow
ENV=releasing
ks param set --env=${ENV} tf-serving-workflow name "${USER}-${JOB_NAME}-${VERSION_TAG}"
ks param set --env=${ENV} tf-serving-workflow versionTag "${VERSION_TAG}"
ks param set --env=${ENV} tf-serving-workflow prow_env  \
  "JOB_NAME=${JOB_NAME},JOB_TYPE=${JOB_TYPE},PULL_BASE_SHA=${PULL_BASE_SHA},REPO_NAME=${REPO_NAME},REPO_OWNER=${REPO_OWNER},BUILD_NUMBER=${BUILD_NUMBER}"
ks apply ${ENV} -c tf-serving-workflow
```

### Releasing tensorflow jupyter notebook images

```
cd ${GIT_KUBEFLOW}/components/image-releaser
COMMIT=0da89b8a4af6c314287196b79d9a5f01d279b596 # Commit for the release
git checkout ${COMMIT}
PULL_BASE_SHA=${COMMIT:0:8}
DATE=`date +%Y%m%d`
VERSION_TAG="v${DATE}-${PULL_BASE_SHA}"
JOB_NAME="tf-notebook"
JOB_TYPE=postsubmit
BUILD_NUMBER=$(uuidgen)
BUILD_NUMBER=${BUILD_NUMBER:0:4}
REPO_OWNER=kubeflow
REPO_NAME=kubeflow
ENV=releasing
ks param set --env=${ENV} tf-notebook-workflow name "${USER}-${JOB_NAME}-${VERSION_TAG}"
ks param set --env=${ENV} tf-notebook-workflow versionTag "${VERSION_TAG}"
ks param set --env=${ENV} tf-notebook-workflow prow_env  \
  "JOB_NAME=${JOB_NAME},JOB_TYPE=${JOB_TYPE},PULL_BASE_SHA=${PULL_BASE_SHA},REPO_NAME=${REPO_NAME},REPO_OWNER=${REPO_OWNER},BUILD_NUMBER=${BUILD_NUMBER}"
ks apply ${ENV} -c tf-notebook-workflow
```

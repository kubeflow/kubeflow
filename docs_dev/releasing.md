<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Image Auto Release](#image-auto-release)
  - [Create Release Workflow](#create-release-workflow)
  - [Update Release Config](#update-release-config)

- [Manual Release Kubeflow](#manual-release-kubeflow)
  - [Authenticate to GCP](#authenticate-to-gcp)
  - [Update TFJob](#update-tfjob)
  - [Build TF Serving Images](#build-tf-serving-images)
  - [Build the Jupyter Images](#build-the-jupyter-images)
  - [Create a release branch (if necessary)](#create-a-release-branch-if-necessary)
    - [Release branching policy](#release-branching-policy)
  - [Updating the release branch and tagging a release](#updating-the-release-branch-and-tagging-a-release)
    - [Tagging a release candidate](#tagging-a-release-candidate)
    - [Release votes and releases](#release-votes-and-releases)
  - [Updating the ksonnet configs for master](#updating-the-ksonnet-configs-for-master)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Image Auto Release

We have nightly release for all images covered by workflows in [release config](../releasing/prow_config_release.yaml)
Currently auto release will use master branch.

## Create Release Workflow

1. To have your image release workflow, you need build context which contains a build_image.sh which can be executed:
```
  build_image.sh ${DOCKERFILE} ${IMAGE} ${TAG} ...EXTRA_ARGS
```
    build_image.sh should build image and push to gcr. Check existing ones as example.

2. Create your workflow:

  * Under [releasing](../releasing):
```
  export RELEASENAME=<name it>
  ks init ${RELEASENAME}
  cd ${RELEASENAME}
  ks registry add kubeflow github.com/kubeflow/kubeflow/tree/master/kubeflow
  ks pkg install kubeflow/automation@master
  ks generate release ${RELEASENAME} --image=<your image name> --dockerfileDir=kubeflow/repo_name/<path to docker build context>
```

  * Example: for bootstrapper release we can do:
```
    ks generate release bootstrapper-release --image=bootstrapper --dockerfileDir=kubeflow/kubeflow/bootstrap
```

  * If your build context is not in kubeflow repo, like pytorch-operator, add param:
    ```
    --extra_repos=kubeflow/testing@HEAD;kubeflow/pytorch-operator@HEAD
    ```
    when run ```ks generate``` to have your repo checked out during release.

3. Reformat your new workflow using [jsonnet](https://jsonnet.org/learning/tools.html):

```
    jsonnet fmt -i $(find . -name '[a-z]*sonnet') --string-style d --comment-style s --indent 2
```

## Update Release Config

Add your new workflow to [release config](../releasing/prow_config_release.yaml).

A prototype would be:
```
- app_dir: kubeflow/kubeflow/releasing/<new release workflow folder>
    component: release
    name: <your release name>
    params:
      extra_args: <for your build_image.sh>
```

Your images will be auto released everyday.

# Example: Manual Release Kubeflow

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

## Update PyTorchJob
Identify the [release](https://github.com/kubeflow/pytorch-operator/releases) of pytorch-operator you want to use.
  * If you need to cut a new PyTorch operator release follow the instructions in [kubeflow/pytorch-operator](https://github.com/kubeflow/pytorch-operator/blob/master/releasing.md)

Update [pytorch-operator.jsonnet](https://github.com/kubeflow/kubeflow/blob/master/kubeflow/pytorch-job/prototypes/pytorch-operator.jsonnet#L9)
to point to the new image.

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

Create a PR to update [kubeform_spawner.py](https://github.com/kubeflow/kubeflow/blob/master/kubeflow/core/kubeform_spawner.py#L15) 
to point to the newly built Jupyter notebook images.

## Update the bootstrapper

Build and push a new bootstrapper image

```
cd bootstrap
make push
```

Update [cluster-kubeflow.yaml](https://github.com/kubeflow/kubeflow/blob/master/docs/gke/configs/cluster-kubeflow.yaml) to point to the new image.

## Create a release branch (if necessary)

If you aren't already working on a release branch (of the form `v${MAJOR}.${MINOR}-branch`, where `${MAJOR}.${MINOR}` is a major-minor version number), then create one.  Release branches serve several purposes:

1.  They allow a release wrangler or other developers to focus on a release without interrupting development on `master`,
2.  they allow developers to track the development of a release before a release candidate is declared,
2.  they allow sophisticated users to track the development of a release (by using the release branch as a `ksonnet` registry), and
4.  they simplify backporting critical bugfixes to a patchlevel release particular release stream (e.g., producing a `v0.1.1` from `v0.1-branch`), when appropriate.

## Updating ksonnet prototypes with docker image

Here is the general process for how we update our Docker prototypes to point to
the correct Docker image.

1. Build a Docker image using whatever tagging schema you like 

   * General convention is v${DATE}-${COMMIT}

1. On the **release branch** update all references to images that will be updated as part
   of the release to use the tag v${RELEASE} where ${RELEASE} will be the next release

   * e.g if the next RC is v0.2.1-RC.0 then you would use tag v0.2.1
   * You can modify and then run the script `releasing/update_ksonnet.sh` to update
     the prototypes

1. Update [image_tags.yaml](https://github.com/kubeflow/kubeflow/blob/master/releasing/image_tags.yaml) **on the master branch**
   
   * You can do this by updating and then running **update_image_tags.sh**
      * This invokes some python scripts that use regexes to match
        images and apply a tag to them
      * You can use suitable regexes to get a group of images (e.g. all the 
        notebook) images.
   * There should be an entry for ever image you want to use referenced by the sha of the image
   * If there was a previous release using an earlier image, remove the tag v${RELEASE}
     from that entry   
   * Run run_apply_image_tags.sh

     * This script actually creates the tags in the GCR registry based on the data in image_tags.yaml

     ```
     IMAGE_PATTERN=".*tensorflow.*notebook.*:v0.2.1.*"
     ./run_apply_image_tags.sh "${IMAGE_PATTERN}"

     ```

     * IMAGE_PATTERN should be a regex matching the images that you want to add the tag
   * Create a PR checking **into master** the changes in image_tags.yaml

### Release branching policy

A release branch should be substantially _feature complete_ with respect to the intended release.  Code that is committed to `master` may be merged or cherry-picked on to a release branch, but code that is directly committed to the release branch should be solely applicable to that release (and should not be committed back to master).  In general, unless you're committing code that only applies to the release stream (for example, temporary hotfixes, backported security fixes, or image hashes), you should commit to `master` and then merge or cherry-pick to the reelase branch.

You can create a release branch via the GitHub UI.

## Updating the release branch and tagging a release

0. Ensure that the release notes are up to date.
1. Update the ksonnet configs on the release branch to use the latest images built in the previous steps.
2. Presubmit tests should verify that the ksonnet configs work.
3. Submit a PR to the release branch.
4. Wait for a passing postsubmit of the submitted PR.  
5. Once it passes, update this document on the release branch with specific image hashes.
6. If no known blocker issues remain, tag a release candidate. 

### Tagging a release candidate

A release candidate is a tag of the form `v${MAJOR}.${MINOR}.${PATCHLEVEL}-rc.${N}`, where `N` is a small integer, and a release candidate tag always points to a commit on the corresponding minor release branch.  Push this tag to GitHub and announce a release vote on kubeflow-discuss.

### Release votes and releases

_NB:  release votes will take effect beginning with the 0.2 release stream; the specifics of the release vote policy will be finalized before then._

A release candidate that has passed a community vote should be tagged as an official release.  This simply involves creating another tag for the commit pointed to by the RC tag and pushing this to GitHub.  Tags that resemble version numbers or release candidates should automatically show up in the "releases" tab for the repo, but you can use the "draft a release" feature to add release notes.

## Updating the ksonnet configs for master

Independently of numbered releases, it is a good idea to periodically update the ksonnet configs for `master` to keep them up-to-date.  The process is very similar to updating the ksonnet configurations on a release branch:

1. Create a PR to update the ksonnet configs to use the latest images built in the previous steps.
2. Presubmit tests should verify that the ksonnet configs work.
3. Submit the PR.
4. Wait for a passing postsubmit of the submitted PR.
5. Tag the commit corresponding to the passing postsubmit with the appropriate tags for the release.

Ideally, this process will be automated to a greater extent in the future.

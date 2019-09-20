<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Image Auto Release](#image-auto-release)
  - [Creating a release workflow using automation ksonnet package](#creating-a-release-workflow-using-automation-ksonnet-package)
- [Release Kubeflow](#release-kubeflow)
  - [Authenticate to GCP](#authenticate-to-gcp)
  - [Update TFJob](#update-tfjob)
  - [Update PyTorchJob](#update-pytorchjob)
  - [Build TF Serving Images](#build-tf-serving-images)
  - [Build the Jupyter Images](#build-the-jupyter-images)
  - [Create a release branch (if necessary)](#create-a-release-branch-if-necessary)
    - [Enable Periodic tests on the release branch](#enable-periodic-tests-on-the-release-branch)
  - [Updating ksonnet prototypes with docker image](#updating-ksonnet-prototypes-with-docker-image)
    - [Release branching policy](#release-branching-policy)
  - [Updating the release branch and tagging a release](#updating-the-release-branch-and-tagging-a-release)
    - [Tagging a release candidate](#tagging-a-release-candidate)
    - [Release votes and releases](#release-votes-and-releases)
  - [Updating the ksonnet configs for master](#updating-the-ksonnet-configs-for-master)
  - [Releasing a new version of the website](#releasing-a-new-version-of-the-website)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Image Auto Release

We use prow and Argo workflows to regularly push updated Docker images to the public registry
**gcr.io/kubeflow-images-public**.

You write and manage these Argo workflows just like [E2E test workflows](https://github.com/kubeflow/testing).

In fact the recommended pattern is to have a single Argo workflow that builds and tests the docker image.
This workflow should be parameterized such that in Prow postsubmit and periodic jobs the image is pushed
to **gcr.io/kubeflow-images-public** but the presubmit uses **gcr.io/kubeflow-ci**.

Here are some guidelines for writing workflows that work well for auto-pushing images.

1. The Docker registry should be passed as a ksonnet parameter to your workflow spec

   * For an example you can look at [Katib Workflow](https://github.com/kubeflow/katib/blob/master/test/workflows/components/workflows.libsonnet)
   * The [automation ksonnet package](https://github.com/kubeflow/kubeflow/tree/master/kubeflow/automation)
     contains a ksonnet prototype for an argo workflow that uses Docker in Docker to build images

     * This is a good starting point for creating an Argo workflow to build your container if you
       don't already have one.

     * See instructions below.

1. The registry should be configured in the prow_config.yaml as follows

   *  presubmits - Use gcr.io/kubeflow-ci

      * The point of running on presubmit is to ensure the workflow works; it is not to make the images
        publicly available.

   *  postsubmits/periodic jobs - Use gcr.io/kubeflow-images-public

1. As with E2E tests the workflow should be defined in the same repo as the source code for the image

   * This ensures the workflow is triggered when source is modified

1. There are a number of different ways to build docker images in cluster

   * Docker in Docker

      * The [automation ksonnet package](https://github.com/kubeflow/kubeflow/tree/master/kubeflow/automation)
        contains a ksonnet prototype for an argo workflow that uses Docker in Docker to build images

   * Google Container Builder - For example see Katib

     * [Katib Workflow](https://github.com/kubeflow/katib/blob/master/test/workflows/components/workflows.libsonnet)
     * [Katib build script](https://github.com/kubeflow/katib/blob/master/test/scripts/build-studyjobctr.sh)

## Creating a release workflow using [automation ksonnet package](https://github.com/kubeflow/kubeflow/tree/master/kubeflow/automation)

Here are some detailed instructions for using [automation ksonnet package](https://github.com/kubeflow/kubeflow/tree/master/kubeflow/automation) to create an Argo workflow that can be run on pre/postsubmit to push kubeflow images.

This is a good place to start if you don't have an existing E2E workflow that is building the Docker images.

1. To use the package you need a **build_image.sh** that the workflow invokes to build the image

   ```
   build_image.sh ${DOCKERFILE} ${IMAGE} ${TAG} ...EXTRA_ARGS
   ```

   * build_image.sh should build image and push to gcr.
   * Example [build_image.sh](https://github.com/kubeflow/kubeflow/blob/master/bootstrap/build_image.sh) for bootstrapper

1. If you don't already have a ksonnet app for E2E workflows in your repo create one

   ```
   ks init ${APP}
   ```

1. Add the Kubeflow registry and automation package to your ksonnet app

   ```
   cd ${APP}
   ks registry add kubeflow github.com/kubeflow/kubeflow/tree/master/kubeflow
   ks pkg install kubeflow/automation
   ```

1. Ensure vendor gets checked in

   ```
   git add -f vendor
   ```

1. Create a component using the prototype

   ```
   cd ${APP}
   export RELEASENAME=<name it>
   ks generate release ${RELEASENAME} --image=<your image name> --dockerfileDir=kubeflow/${REPO_NAME}/<path to docker build context>
   ```

  * Example: for bootstrapper release we can do

    ```
    ks generate release bootstrapper-release --image=bootstrapper --dockerfileDir=kubeflow/kubeflow/bootstrap
    ```

  * If your build context is not in kubeflow repo, like pytorch-operator, add param:

    ```
    --extra_repos=kubeflow/testing@HEAD;kubeflow/pytorch-operator@HEAD
    ```
    when run ```ks generate``` to have your repo checked out during release.


1. Follow [E2E test workflows](https://github.com/kubeflow/testing) to add the workflow to prow.

# Release Kubeflow

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

**Note** We should make extra_repos and their versions a ksonnet parameter and
set it in prow_config.yaml. We can then set it differently on the release branch.

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

## Create a release branch (if necessary)

If you aren't already working on a release branch (of the form `v${MAJOR}.${MINOR}-branch`, where `${MAJOR}.${MINOR}` is a major-minor version number), then create one.  Release branches serve several purposes:

1.  They allow a release wrangler or other developers to focus on a release without interrupting development on `master`,
2.  they allow developers to track the development of a release before a release candidate is declared,
2.  they allow sophisticated users to track the development of a release (by using the release branch as a `ksonnet` registry), and
4.  they simplify backporting critical bugfixes to a patchlevel release particular release stream (e.g., producing a `v0.1.1` from `v0.1-branch`), when appropriate.

### Enable Periodic tests on the release branch

Once the release branch is cut we need to enable periodic tests on the release branch and setup a
[testgrid dashboard](https://k8s-testgrid.appspot.com/sig-big-data)

1. Modify [kubernetes/test-infra/blob/master/config/jobs/kubeflow/kubeflow-periodics.yaml](https://github.com/kubernetes/test-infra/blob/master/config/jobs/kubeflow/kubeflow-periodics.yaml) to define a new periodic
   prow job.
1. Modify [kubernetes/test-infra/blob/master/testgrid/config.yaml](https://github.com/kubernetes/test-infra/blob/master/testgrid/config.yaml)

   * Copy the entries for the most recent release branch and change it to the new release branch
1. Submit a PR with the above changes.

## Updating ksonnet prototypes with docker image

Here is the general process for how we update our Docker prototypes to point to
the correct Docker image. See sections below for component specific instructions.

1. Build a Docker image using whatever tagging schema you like

   * General convention is v${DATE}-${COMMIT}

1. On the **release branch** update all references to images that will be updated as part
   of the release to use the tag v${RELEASE} where ${RELEASE} will be the next release

   * e.g if the next RC is v0.2.1-RC.0 then you would use tag v0.2.1
   * You can modify and then run the script `releasing/update_components.sh` to update
     the prototypes

1. Update [image_tags.yaml](https://github.com/kubeflow/kubeflow/blob/master/releasing/image_tags.yaml) **on the master branch**

   * You can do this by updating and then running **update_image_tags.sh**
      * This invokes some python scripts that use regexes to match
        images and apply a tag to them
      * You can use suitable regexes to get a group of images (e.g. all the
        notebook) images.
   * There should be an entry for every image you want to use referenced by the sha of the image
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

1. Update ksonnet components using the `update_components` script. For example, to update `tf-operator` to `v0.3.2`:
   ```
   COMPONENT=tf-operator
   TAG=v0.3.2
   ./update_components.sh "${COMPONENT}" "${TAG}"
   ```
   Currently the script supports tf-operator, pytorch-operator, katib, jupyter-notebooks, and centraldashboard.


### Release branching policy

A release branch should be substantially _feature complete_ with respect to the intended release.  Code that is committed to `master` may be merged or cherry-picked on to a release branch, but code that is directly committed to the release branch should be solely applicable to that release (and should not be committed back to master).  In general, unless you're committing code that only applies to the release stream (for example, temporary hotfixes, backported security fixes, or image hashes), you should commit to `master` and then merge or cherry-pick to the release branch.

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

## Releasing a new version of the website

For each stable release, we also publish a corresponding version of the 
Kubeflow [website](www.kubeflow.org). Each version of the website is generated 
from a separate [branch](https://github.com/kubeflow/website/branches)
of the kubeflow/website repository. 

We usually create the website branch for a version a few weeks after the 
software release of that version, because it takes a while to finish updating 
the docs.

If the documentation for a version needs to be fixed after we've created
the version branch, the changes should be committed to master and then 
cherry-picked to the proper release branch.

When documentation for a release is complete, follow these steps to release a
new version on the website:

1. Create a new versioned branch under the 
  [website repository](https://github.com/kubeflow/website). The branch name
  should have the same format as Kubeflow releases:
  `v${MAJOR}.${MINOR}-branch`. (You can create a branch on the GitHub UI. See 
  the GitHub guide to [creating branches in your 
  repo](https://help.github.com/en/articles/creating-and-deleting-branches-within-your-repository).)

1. Set up [Netlify](https://www.netlify.com/):
   * Log in with your GitHub credentials.
   * Click **New site from Git**.
   * Click **GitHub** under **Continuous Deployment**.
   * Select **kubeflow** from the dropdown list of organizations.
   * Select **website** from the list of repositories. You are now configuring
     the deployment settings for `kubeflow/website`.
   * Under **Branch to deploy**, select the new versioned branch.
   * Click **Deploy site**. This should give you a site URL ending with 
     `netlify.com`.

1. Set up DNS for the new site:
   * In [Cloud DNS](http://console.cloud.google.com/net-services/dns/zones?project=kubeflow-dns&organizationId=714441643818), 
     select the `kubeflow.org` zone.
   * Create a new CNAME record for `v${MAJOR}-${MINOR}.kubeflow.org`, pointing
     to the new site (`something-something.netlify.com`), with TTL of 5 minutes.

1. Configure a custom domain for the new site:
   * Go back to the Netlify configuration page, find the new website, and select
     **Settings**.
   * Click **Domain settings**.
   * Under **Custom domains**, add a domain alias for 
     `v${MAJOR}-${MINOR}.kubeflow.org`.
   * Under **HTTPS**, enable the SSL certificate for the new site
     by clicking **Verify DNS configuration**.
   * In your browser, go to `v${MAJOR}-${MINOR}.kubeflow.org` to verify 
     the setup. If all the steps are done, you should not see any privacy or 
     certificate warnings.

1. Add the new version to the website navigation bar:
   * Edit [config.toml](https://github.com/kubeflow/website/blob/master/config.toml).

   * Update the version number for the `master` version.
     For example, to update the master to v0.7, the text should be:
     ```
     version = "master (v0.7)"
     ```

   * Add a `params.versions` entry for the new version. 
     For example, to add v0.6, add this entry:
     ```
     [[params.versions]]
     version = "v0.6"
     githubbranch = "v0.6-branch"
     url = "https://v0-6.kubeflow.org"
     ```

## Release kfctl

You can use the [CLI github-release](https://github.com/aktau/github-release) to automate uploading artifacts.
Alternatively you can use the UI.

1. Get aktau/github-release

   ```
   go get github.com/aktau/github-release
   ```

1. You'll need a GitHub token to authenticate to GitHub see [docs](https://github.com/aktau/github-release)

1. Checkout the release commit

   ```
   git checkout ${COMMIT}
   ```

   * TODO(jlewi): Ideally we automate the builds and publish them e.g. to a GCS bucket on postsubmit.

1. Build kfctl for linux and mac

   ```
   cd bootstrap
   TAG=v0.5.0-rc.1 make push-to-github-release
   ```
   * Set the tag to be the correct version for the tag.

## Update the changelog

1. After the release branch is created run the following script to update the changelog

   ```
   update-changelog.sh
   ```

1. Create a PR with the resulting changes.

1. Repeat above steps as new release candidates are created
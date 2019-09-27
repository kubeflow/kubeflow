<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Releasing Prerequisities](#releasing-prerequisities)
  - [Authenticate to GCP](#authenticate-to-gcp)
  - [Authorization to Publish a Release](#authorization-to-publish-a-release)
- [Release tracking](#release-tracking)
  - [Create an issue for release tracking](#create-an-issue-for-release-tracking)
  - [Announce the Release and Tracking Link](#announce-the-release-and-tracking-link)
- [Releasing Kubeflow Components](#releasing-kubeflow-components)
  - [List of Components](#list-of-components)
  - [Create a release branch](#create-a-release-branch)
    - [Enable Periodic tests on the release branch](#enable-periodic-tests-on-the-release-branch)
- [Getting Ready to Cut a Release](#getting-ready-to-cut-a-release)
  - [Cut Release Branch for kubeflow/manifests](#cut-release-branch-for-kubeflowmanifests)
  - [Update Application Versions](#update-application-versions)
  - [Add new KfDef for the Release](#add-new-kfdef-for-the-release)
  - [Build and Upload KFCTL Binaries](#build-and-upload-kfctl-binaries)
  - [Releasing a new version of the website](#releasing-a-new-version-of-the-website)
  - [Update the changelog](#update-the-changelog)
  - [Get Votes for the Release](#get-votes-for-the-release)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Releasing Prerequisities

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

## Authorization to Publish a Release

Need to join [release team](https://github.com/kubeflow/internal-acls/blob/1234654eb219e2c06ed5fdc2c4e662a02fccc740/github-orgs/kubeflow/org.yaml#L388) before you can publish a release.


# Release tracking

## Create an issue for release tracking

- Create an issue in [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow/issues)
- Label the issue with `priority p0`
- Label the issue with `kind process`
- Example: [link](https://github.com/kubeflow/kubeflow/issues/3702)

## Announce the Release and Tracking Link

Announce the release in `#release` channel in kubeflow.slack.com. Also please link the tracking issue to the announcement.

# Releasing Kubeflow Components

A release branch should be substantially _feature complete_ with respect to the intended release.  Code that is committed to `master` may be merged or cherry-picked on to a release branch, but code that is directly committed to the release branch should be solely applicable to that release (and should not be committed back to master).  In general, unless you're committing code that only applies to the release stream (for example, temporary hotfixes, backported security fixes, or image hashes), you should commit to `master` and then merge or cherry-pick to the release branch.

You can create a release branch via the GitHub UI.

Releaser needs to do the following to the components listed:
- Cut a release branch if necessary (during major release)
- Enable periodic tests if creating a release branch to components.
- Update `prow_config.yaml` if necessary.
- Make sure newly added periodic tests are green.
- Build and push docker images to `gcr.io/kubeflow-images-public`
- Update kustomize manifests on [kubeflow/manifests](https://github.com/kubeflow/manifests)

## List of Components

- [Kubeflow](https://github.com/kubeflow/kubeflow)
- [TfJob](https://github.com/kubeflow/tf-operator)
- [PyTorch](https://github.com/kubeflow/pytorch-operator)
- [Katib](https://github.com/kubeflow/katib)
- [CentralDashboard](https://github.com/kubeflow/kubeflow/tree/master/components/centraldashboard)
- [ProfileController](https://github.com/kubeflow/kubeflow/tree/master/components/profile-controller)
- [NotebookController](https://github.com/kubeflow/kubeflow/tree/master/components/notebook-controller)

**JupyterWebApp**: This component is automatically released: [example](https://github.com/kubeflow/manifests/commit/723f310a60c9765bcadc2ed75053d5819f429c60)

## Create a release branch

If you aren't already working on a release branch (of the form `v${MAJOR}.${MINOR}-branch`, where `${MAJOR}.${MINOR}` is a major-minor version number), then create one.  Release branches serve several purposes:

1.  They allow a release wrangler or other developers to focus on a release without interrupting development on `master`,
1.  they allow developers to track the development of a release before a release candidate is declared,
1.  they allow sophisticated users to track the development of a release, and
1.  they simplify backporting critical bugfixes to a patchlevel release particular release stream (e.g., producing a `v0.1.1` from `v0.1-branch`), when appropriate.

### Enable Periodic tests on the release branch

Once the release branch is cut we need to enable periodic tests on the release branch and setup a
[testgrid dashboard](https://k8s-testgrid.appspot.com/sig-big-data)

1. Modify [kubernetes/test-infra/blob/master/config/jobs/kubeflow/kubeflow-periodics.yaml](https://github.com/kubernetes/test-infra/blob/master/config/jobs/kubeflow/kubeflow-periodics.yaml) to define a new periodic
   prow job.
1. Modify [kubernetes/test-infra/blob/master/config/testgrids/kubeflow/kubeflow.yaml](https://github.com/kubernetes/test-infra/blob/master/config/testgrids/kubeflow/kubeflow.yaml)

   * Copy the entries for the most recent release branch and change it to the new release branch
1. Submit a PR with the above changes.

# Getting Ready to Cut a Release

After you have completed the steps to release the components, it's time for you to wrap up the release and send to the community for review.

## Cut Release Branch for kubeflow/manifests

Create a release branch (when releasing major release) in [kubeflow/manifests](https://github.com/kubeflow/manifests)

## Update Application Versions

Update versions tag in descripter for all application:
- [TfJob](https://github.com/kubeflow/manifests/blob/0fa9c0126f62392d1c27f31711e513b22ef28cbc/tf-training/tf-job-operator/overlays/application/application.yaml#L27)
- [PyTorch](https://github.com/kubeflow/manifests/blob/0fa9c0126f62392d1c27f31711e513b22ef28cbc/pytorch-job/pytorch-operator/overlays/application/application.yaml#L27)
- [Application](https://github.com/kubeflow/manifests/blob/0fa9c0126f62392d1c27f31711e513b22ef28cbc/application/application/overlays/application/application.yaml#L16)
- [CentralDashboard](https://github.com/kubeflow/manifests/blob/0fa9c0126f62392d1c27f31711e513b22ef28cbc/common/centraldashboard/overlays/application/application.yaml#L29)
- [JupyterWebApp](https://github.com/kubeflow/manifests/blob/0fa9c0126f62392d1c27f31711e513b22ef28cbc/jupyter/jupyter-web-app/overlays/application/application.yaml#L29)
- [NotebookController](https://github.com/kubeflow/manifests/blob/0fa9c0126f62392d1c27f31711e513b22ef28cbc/jupyter/notebook-controller/overlays/application/application.yaml#L23)

## Add new KfDef for the Release

A KfDef config file is used to pin the version for the repos we use.
- Example file: [link](https://github.com/kubeflow/kubeflow/blob/v0.6-branch/bootstrap/config/kfctl_gcp_iap.0.6.2.yaml)
- Add the file to [kubeflow/manifests/kfdef](https://github.com/kubeflow/manifests/tree/master/kfdef) in the release branch.

## Build and Upload KFCTL Binaries

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

## Update the changelog

1. After the release branch is created run the following script to update the changelog

   ```
   update-changelog.sh
   ```

1. Create a PR with the resulting changes.

1. Repeat above steps as new release candidates are created

## Get Votes for the Release

_NB:  release votes will take effect beginning with the 0.2 release stream; the specifics of the release vote policy will be finalized before then._

A release candidate that has passed a community vote should be tagged as an official release.  This simply involves creating another tag for the commit pointed to by the RC tag and pushing this to GitHub.  Tags that resemble version numbers or release candidates should automatically show up in the "releases" tab for the repo, but you can use the "draft a release" feature to add release notes.

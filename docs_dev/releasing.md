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
  - [Configure Auto Building of Docker Images and Updating of Kustomize Applications](#configure-auto-building-of-docker-images-and-updating-of-kustomize-applications)
    - [Enable Periodic tests on the release branch](#enable-periodic-tests-on-the-release-branch)
- [Getting Ready to Cut a Release](#getting-ready-to-cut-a-release)
  - [Cut Release Branch for kubeflow/manifests](#cut-release-branch-for-kubeflowmanifests)
  - [Update Application Versions](#update-application-versions)
  - [Add new KfDef for the Release](#add-new-kfdef-for-the-release)
  - [Build and Upload KFCTL Binaries](#build-and-upload-kfctl-binaries)
- [Version the website](#version-the-website)
  - [Lifecycle](#lifecycle)
  - [Creating and publishing a website branch for vX.Y](#creating-and-publishing-a-website-branch-for-vxy)
  - [Deploy new branch to Netlify](#deploy-new-branch-to-netlify)
    - [Some notes about Kubeflow's Netlify Setup](#some-notes-about-kubeflows-netlify-setup)
  - [Archiving docs](#archiving-docs)
  - [Changing the version `www.kubeflow.org` points to](#changing-the-version-wwwkubefloworg-points-to)
- [Get Votes for the Release](#get-votes-for-the-release)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Releasing Prerequisities

## Authenticate to GCP

If you're new to using GKE or are new to the release team, you'll need to authenticate to GCP first.  [Install the `gcloud` tool](https://cloud.google.com/sdk/gcloud/) and then execute the following commands, substituting your Kubeflow release team account for `your-account@yourdomain.org` (if you aren't a member of `release-team@kubeflow.org`, ask to be added):

```
gcloud config set account your-account@yourdomain.org
gcloud auth login
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
- [TFJob](https://github.com/kubeflow/tf-operator)
- [PyTorchJob](https://github.com/kubeflow/pytorch-operator)
- [Katib](https://github.com/kubeflow/katib)
- [CentralDashboard](https://github.com/kubeflow/kubeflow/tree/master/components/centraldashboard)
- [ProfileController](https://github.com/kubeflow/kubeflow/tree/master/components/profile-controller)
- [NotebookController](https://github.com/kubeflow/kubeflow/tree/master/components/notebook-controller)

## Create a release branch

If you aren't already working on a release branch (of the form `v${MAJOR}.${MINOR}-branch`, where `${MAJOR}.${MINOR}` is a major-minor version number), then create one.  Release branches serve several purposes:

1.  They allow a release wrangler or other developers to focus on a release without interrupting development on `master`,
1.  they allow developers to track the development of a release before a release candidate is declared,
1.  they allow sophisticated users to track the development of a release, and
1.  they simplify backporting critical bugfixes to a patchlevel release particular release stream (e.g., producing a `v0.1.1` from `v0.1-branch`), when appropriate.


## Configure Auto Building of Docker Images and Updating of Kustomize Applications

* Most applications should be configured to be built continuously from their release branch
  and the relevant kustomize manifests to be updated ([docs](https://github.com/kubeflow/testing/tree/master/apps-cd))

* Follow the following steps:

  1. Add a `version` for the new release to [applications.yaml](https://github.com/kubeflow/testing/blob/master/apps-cd/applications.yaml)

  1. Set the `version` for each repository to point to the release branch e.g. vX.Y for kubeflow/kubeflow

  1. Set the tag associated with this version

  1. Merge the PR. 

  1. Once the PR is merged Tekton Pipelines will be submitted to automatically build the docker
   images and open PRs to update the kustomzie manifests

  1. Approve the PRs updating the kustomize manifests to use the new images.

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
- [TFJob](https://github.com/kubeflow/manifests/blob/0fa9c0126f62392d1c27f31711e513b22ef28cbc/tf-training/tf-job-operator/overlays/application/application.yaml#L27)
- [PyTorchJob](https://github.com/kubeflow/manifests/blob/0fa9c0126f62392d1c27f31711e513b22ef28cbc/pytorch-job/pytorch-operator/overlays/application/application.yaml#L27)
- [Application](https://github.com/kubeflow/manifests/blob/0fa9c0126f62392d1c27f31711e513b22ef28cbc/application/application/overlays/application/application.yaml#L16)
- [CentralDashboard](https://github.com/kubeflow/manifests/blob/0fa9c0126f62392d1c27f31711e513b22ef28cbc/common/centraldashboard/overlays/application/application.yaml#L29)
- [JupyterWebApp](https://github.com/kubeflow/manifests/blob/0fa9c0126f62392d1c27f31711e513b22ef28cbc/jupyter/jupyter-web-app/overlays/application/application.yaml#L29)
- [NotebookController](https://github.com/kubeflow/manifests/blob/0fa9c0126f62392d1c27f31711e513b22ef28cbc/jupyter/notebook-controller/overlays/application/application.yaml#L23)

## Add new KfDef for the Release

A KfDef config file is used to pin the version for the repos we use.
- Example file: [link](https://github.com/kubeflow/kubeflow/blob/v0.6-branch/bootstrap/config/kfctl_gcp_iap.0.6.2.yaml)
- Add the file to [kubeflow/manifests/kfdef](https://github.com/kubeflow/manifests/tree/master/kfdef) in the release branch.

* Starting with kubeflow/manifests#778

On the **master** branch

1. Define a kustomize overlay: `source/vX.Y.Z`
1. For every kfdef add a patch that overrides the repo spec and version in the KFDef
   * Look at the existing config
1. Run `hack/build_kfdef_spec.py` to generate KFDef YAMLs in `kfdefs/`
1. Check in all modified files

On the **vX.Y-branch** branch

1. Cherry pick the changes from above

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

# Version the website

The main Kubeflow website at [www.kubeflow.org](www.kubeflow.org) points to the latest change of 
[kubeflow/website](https://github.com/kubeflow/website) for most recent Kubeflow and individual 
components' guides.

For each minor (vX.Y) release, we also publish a corresponding version of the 
website. Each version of the website is generated from a separate 
[branch](https://github.com/kubeflow/website/branches)
of the `kubeflow/website` repository. And you can view versioned documentation from the website's
[top bar](https://user-images.githubusercontent.com/37026441/137779544-dbf6b689-e6d8-43e6-9b31-a05c0502c464.png).

The naming convention is as follows:
The site at `vX-Y.kubeflow.org` points to the release at vX.Y-branch.
For example, the [documentation for v0.6](https://v0-6.kubeflow.org) is 
maintained in the branch called
[v0.6-branch](https://github.com/kubeflow/website/tree/v0.6-branch).

## Lifecycle

Our typical process when getting ready to do a minor release vX.Y 
(i.e. going from vX.Y to vX.Z); this process doesn't apply for patch releases.

1. Follow the [Create website branch instructions](#create-website-branch) to create a release branch for vX.Y.

1. Follow the [Deploy to Netlify instructions](#deploy-to-netlify) to set up a versioned documentation on Kubeflow website.

1. Develop vX.Z docs on the master branch

   * Docs for the master branch should be available on [https://master.kubeflow.org](https://master.kubeflow.org)
  
1.  Follow the [Archive Instructions](#archive) to mark the docs on the vX.Y branch as archived

Other guides:

*  If we ever need to update the default website version, follow the [Production branch instructions](#update-kubeflow-org) 
   below to point [www.kubeflow.org](https://www.kubeflow.org) to the desired branch.

*  There are [old instructions](https://github.com/kubeflow/kubeflow/issues/6199) which have been out-of-date, but keeping a link here in case we need it in the future.


<a id="create-website-branch"></a> 
## Creating and publishing a website branch for vX.Y


1. Create a new section (vX.Y) for dropdown in `config.toml` ([example PR](https://github.com/kubeflow/website/commit/1deed4b4f7846d5c791350620d298a38ce906f1e#)).

1. Update the shortcode that holds the latest Kubeflow version:

   * Edit [kf-latest-version.html](https://github.com/kubeflow/website/blob/master/layouts/shortcodes/kf-latest-version.html).

   * Update the version number. For example, if the upcoming release is 
     Kubeflow v0.7.0:
     ```
     v0.7.0
     ```

1. Create a new version branch under the 
  [website repository](https://github.com/kubeflow/website). The branch name
  should have the following format: `v${MAJOR}.${MINOR}-branch`, where 
  `v${MAJOR}.${MINOR}` is the Kubeflow version. For example, `v0.6-branch`.
  (You can create a branch on the GitHub UI. See the GitHub guide to
  [creating branches in your
  repo](https://help.github.com/en/articles/creating-and-deleting-branches-within-your-repository).)

1. In `vX.Y-branch`, change `version_menu`, `version` and `githubbranch` to the corresponding vX.Y branch
   value ([example PR](https://github.com/kubeflow/website/commit/2d1577c51a420b11e9de1116fb024f1fa4f9d7ea#diff-28043ff911f28a5cb5742f7638363546311225a63eabc365af5356c70d4deb77)).


1. Netlify should auto deploy this branch once its created (see [Branch Deploys](https://docs.netlify.com/site-deploys/overview/#branch-deploy-controls))

   * Netlify publishes the website on `${BRANCHNAME}--competent-brattain-de2d6d.netlify.com`
   * **Note** Periods in the branch name are automatically replaced with dash names
   * e.g. `v0.7-branch` is https://v0-7-branch--competent-brattain-de2d6d.netlify.com

   * You can check under deploys to see if Netlify deployed it
   * If no deploys show up you can push a commit to the branch to trigger a deploy


<a id="deploy-to-netlify"></a> 
## Deploy new branch to Netlify

Note: Contact [Kubeflow admins](https://groups.google.com/a/google.com/g/google-kubeflow-admins) with the link to this section when we want to cut a new version for Kubeflow website in Netlify. 

Admins use Netlify manage branches for Kubeflow website hosting and update the default branch if needed. Kubeflow Admins need permission to Netify project, and `kubeflow-dns` GCP project.


1. Set up DNS for the new site:
   * In [Cloud DNS](http://console.cloud.google.com/net-services/dns/zones?project=kubeflow-dns&organizationId=714441643818), 
     select the `kubeflow.org` zone.
   * Create a new CNAME record set for `v${MAJOR}-${MINOR}-branch.kubeflow.org`, pointing
     to the new site (`something-something.netlify.com`), with TTL of 5 minutes. Canonical name: ${BRANCHNAME}--competent-brattain-de2d6d.netlify.com. (Example: v0-7-branch--competent-brattain-de2d6d.netlify.com)
     **Note:** The version format in the URL is different from that in the
     GitHub branch name! The URL has a **dash** between major and minor version.
     For example: `v0-6.kubeflow.org`. 

1. Wait for the DNS record to propogate. You can use `nslookup` to check this.

   ```
   nslookup v0-7-branch.kubeflow.org
   Server:   127.0.0.1
   Address:  127.0.0.1#53

   Non-authoritative answer:
   v0-7-branch.kubeflow.org  canonical name = v0-7-branch--competent-brattain-de2d6d.netlify.com.
   Name: v0-7-branch--competent-brattain-de2d6d.netlify.com
   Address: 206.189.73.52
   Name: v0-7-branch--competent-brattain-de2d6d.netlify.com
   Address: 2604:a880:2:d0::21e9:b001
   ```

1. At this point you should be able to access the branch at `https://${BRANCHNAME}.kubeflow.org` but
   you will get an `NET::ERR_CERT_COMMON_NAME_INVALID` SSL certificate error
   
   * You should be able to proceed through to see the site but you may need to be incognito mode

1. File a support request with Netlify to fix the SSL certificate

   *  The [external DNS docs](https://community.netlify.com/t/common-issue-how-to-use-netlify-s-branch-deploy-feature-without-netlify-dns/128) (Step #4)
     say to file a support request to fix the domain to work with branch deploys when
     using external DNS.
   *  You can use this [Sample ticket](https://user-images.githubusercontent.com/37026441/137782296-87b34da9-a574-4e30-8b5a-474812db579e.png) to describe the SSL certificate update request.

### Some notes about Kubeflow's Netlify Setup

* We use external DNS (Cloud DNS); we do not use Netlify DNS

* We have an A record to redirect kubeflow.org to Netlify
  * Ref [kubeflow/website#5](https://github.com/kubeflow/website/issues/5#issuecomment-389037774) 
    original setup of Netflix

* We use CNAME records to map `v${MAJOR}-${MINOR}-branch.kubeflow.org` to
  `{BRNACHNAME}---competent-brattain-de2d6d.netlify.com`



<a id="archive"></a>
##  Archiving docs

When the website branch exists for the previous version of the docs (vX.X) and www.kubeflow.org has released a new version (vX.Y), we must mark the docs for vX.X as being archived.

1. On the branch corresponding to vX.X
1. In the `config.toml` for the **version branch**,
  set the `archived_version` parameter to `true`:

    ```
    archived_version = true
    ```
    * This will add a banner at the top of all the docs letting users know they are viewing
      an archived version.

1. Create a PR for the above update, setting the **base branch** in the PR
   to the vX.X's **version** branch (not **master**). Then request a review and merge
   the PR.


<a id="update-kubeflow-org"></a>
## Changing the version `www.kubeflow.org` points to

1. In Netlify, select `www.kubeflow.org` site: https://app.netlify.com/sites/competent-brattain-de2d6d/overview.
1. Select `Site settings`
1. Select `Build & deploy`
1. Find the section called `Branches`
1. Click `Edit settings`
1. Change the `Production branch` to the branch to surface by default.
1. (Optional) Redeploy both branches
   * You can trigger a redeploy by pushing commits to the branches



# Get Votes for the Release

_NB:  release votes will take effect beginning with the 0.2 release stream; the specifics of the release vote policy will be finalized before then._

A release candidate that has passed a community vote should be tagged as an official release.  This simply involves creating another tag for the commit pointed to by the RC tag and pushing this to GitHub.  Tags that resemble version numbers or release candidates should automatically show up in the "releases" tab for the repo, but you can use the "draft a release" feature to add release notes.

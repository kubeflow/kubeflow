# Automatically Creating Cherry Picks to Release Branches

This is a script that automates creation of cherry-pick PRs to release branches, courtesy of
the Kubernetes team.

## Prerequisites

* A pull request is already merged against the master branch.
* A release branch (e.g. `v0.3-branch`) already exists.
* Hub is installed (see the following section)

## Installing Hub

Download and install hub from its [release page](https://github.com/github/hub/releases):
```
HUB_VER=hub-linux-amd64-2.5.1
wget https://github.com/github/hub/releases/download/v2.5.1/$HUB_VER.tgz
tar -xvf $HUB_VER.tgz
PATH=$PATH:$(pwd)/$HUB_VER/bin
```

## Running the Script
Suppose that you want to cherry-pick PR #1234 to the `v0.3-branch` release:
```
GITHUB_USER=[your github id]
./cherry_pick_pull.sh upstream/v0.3-branch 1234
```
Follow the commandline prompt to enter authentication credentials. Assuming that there are no
conflicts, a PR should be created with the title `Automated cherry pick of #1234...`. PRs
with conflicts need to be resolved manually.

The PR should be assigned to the current release czar for approval.

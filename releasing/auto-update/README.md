# Auto Update of Kubeflow Manifests

This directory contains Kubernetes jobs to:

* Continuous rebuild docker images for Kubeflow applications when the source code changes
* Update the Kubeflow manifests to use the new images
* Create PRs to update the manifests.

We are currently prototyping and building this out using the Kubeflow Jupyter Web Application.

Here's how this works

* A python script py/kubeflow/kubeflow/ci/update_jupyter_web_app.py is used to build the image and create a PR

  * The script will only build a docker image if there has been a change to the jupyter web app source code since the last image

  * If a new image is built we update the Kubeflow ksonnet prototype to use the new image

  * The script uses the [hub cli](https://hub.github.com/) to create a PR


* update_job.yaml provides an example job spec for running the job.


## kubeflow-bot

* The script uses the [kubeflow-bot](https://github.com/kubeflow-bot) to host the fork containing the PR
* The ssh key for the kubeflow-bot account is stored as a K8s secret

  * We use 

    * **project**: kubeflow-releasing
  	* **cluster**: kf-releasing-v-0-6-2
    * **kf-releasing**: This is a Kubeflow profile created namespace
    * This is a kubeflow v0.6.2 cluster; configs should be checked in kubeflow/testing/release-infra

* The ssh keys are stored as K8s secret and configured via init containers

## Setting up the bot

1. Create secrets in the cluster containing the GitHub ssh keys.

    ```
    kubectl create -n ${NAMESPACE} secret generic kubeflow-bot-ssh --from-file=id_rsa=kubeflow-bot --from-file=id_rsa.pub=kubeflow-bot.pub 
    ```

    * Use a public/private SSH key that has been added to the kubeflow-bot GitHub account

1. Create a secret containing a GITHUB_TOKEN

    ```
    kubectl create secret generic github-token --namespace=${NAMESPACE} --from-literal=github_token=${GITHUB_TOKEN}
    ```

## hub-cli

[hub cli](https://hub.github.com/) is to list and create PRs

Here are some key things to know about hub CLI

  * It uses a GITHUB_TOKEN to create PRs

  	* The token must have permission to modify repositories in order to create PRs see https://hub.github.com/hub.1.html

  * The repository in which to create the PR is based on the names of the remotes see conventions in the [doc page](https://hub.github.com/hub.1.html)


## Kustomize package

Common variables should be set in `base/kustomization.yaml` and `base/params.env`; e.g.
 
  * Base docker image
  * Repos to check out
  * Values for other flags

There are two overlays corresponding to a cron job and a batch job which can be used for one off runs.

To override the parameters you could add a section to the kustomization.yaml file overlay

```
configMapGenerator:
- name: params
  behavior: merge
  env: params.env
```

TODO(jlewi): It might be better to mount a config map with the startup scripts

## Next steps

* We'd like to use Kubeflow to run this script regularly and keep track of runs; options are

  * Run it as a 1 step pipeline and use pipelines to keep track of runs
  * Use a cron job and the Kubeflow metadata solution to keep track of runs
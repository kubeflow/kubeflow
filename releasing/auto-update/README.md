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


## kubeflow-bot

* The script uses the [kubeflow-bot](https://github.com/kubeflow-bot) to host the fork containing the PR
* The ssh key for the kubeflow-bot account is stored as a K8s secret

  * We use 

    * **project**: kubeflow-releasing
  	* **cluster**: kf-releasing
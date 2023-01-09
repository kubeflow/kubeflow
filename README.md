<img src="https://www.kubeflow.org/images/logo.svg" width="100">
Kubeflow the cloud-native platform for machine learning operations - pipelines, training and deployment.

---

## On platform testing

Any push to an open PR that has the auto-deploy label on it allows developers to opt-in to on-platform testing. For example, when you need to build in github and test on platform (or want someone else to be able to pull your image):
1. open a PR and add the auto-deploy label
2. push to your PR and watch the GitHub Action CI
3. access your image in Kubeflow DEV via a custom image from any of:
    - k8scc01covidacrdev.azurecr.io/IMAGENAME:SHA
    - k8scc01covidacrdev.azurecr.io/IMAGENAME:SHORT_SHA
---

## Documentation
Please refer to the official docs at [kubeflow.org](http://kubeflow.org).

## Working Groups
The Kubeflow community is organized into working groups (WGs) with associated repositories, that focus on specific pieces of the ML platform. 

* [AutoML](https://github.com/kubeflow/community/tree/master/wg-automl)
* [Deployment](https://github.com/kubeflow/community/tree/master/wg-deployment)
* [Manifests](https://github.com/kubeflow/community/tree/master/wg-manifests)
* [Notebooks](https://github.com/kubeflow/community/tree/master/wg-notebooks)
* [Pipelines](https://github.com/kubeflow/community/tree/master/wg-pipelines)
* [Serving](https://github.com/kubeflow/community/tree/master/wg-serving)
* [Training](https://github.com/kubeflow/community/tree/master/wg-training)

## Quick Links
* [Prow jobs dashboard](http://prow.kubeflow-testing.com)
* [PR Dashboard](https://k8s-gubernator.appspot.com/pr)
* [Argo UI for E2E tests](https://argo.kubeflow-testing.com)

## Get Involved
Please refer to the [Community](https://www.kubeflow.org/docs/about/community/) page.

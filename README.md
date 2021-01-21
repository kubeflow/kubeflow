<img src="https://www.kubeflow.org/images/logo.svg" width="100">
Kubeflow the cloud-native platform for machine learning operations - pipelines, training and deployment.

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
* [Prow test dashboard](https://k8s-testgrid.appspot.com/sig-big-data)
* [Prow jobs dashboard](https://prow.k8s.io/?repo=kubeflow%2Fkubeflow)
* [PR Dashboard](https://k8s-gubernator.appspot.com/pr)
* [Argo UI for E2E tests](http://testing-argo.kubeflow.org)

## Get Involved
Please refer to the [Community](https://www.kubeflow.org/docs/about/community/) page.

## Generating dependabot configuration
In an effort to use the most current versions and mitigate vulnerable software dependencies and base images, a script was created to properly configure dependabot. The script scans the repository for directories containing files listing such dependencies, and matches the found folders to the relevant `OWNERS` files. It then goes on to generate the `.github/dependabot.yml` file which tells dependabot which directories it needs to scan and for what package ecosystems. When a dependency update is found, dependabot will create a pull request to update the dependency and assign the relevant owners. If changes are made to the repository that add new dependency listing files, the script will need to be run so that `.github/dependabot.yml` is updated to reflect these changes. To manually run the script, execute `make build-dependabot` from the root of this repository. 


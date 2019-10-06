<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Kubeflow CI with tektoncd pipelines](#kubeflow-ci-with-tektoncd-pipelines)
  - [Use Case](#use-case)
  - [Background information on TektonCD pipelineruns, pipelines and tasks](#background-information-on-tektoncd-pipelineruns-pipelines-and-tasks)
  - [Parameterization](#parameterization)
  - [Secrets](#secrets)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Kubeflow CI with tektoncd pipelines

### Use Cases

The following use cases can be run on the following components (should be run from the components directory):
- `kustomize build --reorder none `*centraldashboard*`/ci   | kubectl apply -f -`
- `kustomize build --reorder none `*jupyter-web-app*`/ci    | kubectl apply -f -`
- `kustomize build --reorder none `*notebook-controller*`/ci | kubectl apply -f -`
- `kustomize build --reorder none `*profile-controller*`/ci | kubectl apply -f -
 
This uses TektonCD [pipelinerun](https://github.com/tektoncd/pipeline/blob/master/docs/pipelineruns.md) to enable the following use case:

1. A PR is merged into kubeflow/kubeflow updating the component
1. The merged commit is 1234
1. This tekton pipelinerun is triggered to build the component image from commit @1234.
1. The pipelinerun edits manifests/common/centraldashboard/base/kustomization.yaml (using kubeflow-bot repo) and adds the new image tag
1. The pipelinerun calls `make generate; make test` 
1. If successful then 
1.   The pipeline checks in the changes 
1.   Opens a PR with the updated kubeflow/manifests that uses the newly built image
1.   Approvers LGTM the PR to kubeflow/manifests and it gets merged

### Background information on TektonCD pipelineruns, pipelines and tasks

A TektonCD PipelineRun takes 1 Pipeline and N PipelineResources.
The PipelineResources can be git repos, git pull requests, docker images.
These resources are made available to the Pipeline via PipelineRun.

The general relationship between TektonCD resources is shown below:

```
── PipelineRun
   ├── PipelineResources
   └── Pipeline
       └── Tasks
```

In this use case the following instance is created:

```
── ci-centraldashboard-pipeline-run
   ├── resources
   │   ├── image
   │   │   └── component
   │   └── git 
   │       ├── kubeflow+revision
   │       └── manifests+revision 
   └── pipeline
       └── tasks
           ├── build-push
           └── update-manifests
```

The PipelineRun includes a Pipeline that has 2 tasks and 3 PipelineResources of type image (component) and git (kubeflow, manifests). The Tasks reference these resources in their inputs or outputs. 

### Parameterization 

The PipelineRun uses parameterized PipelineResources which are passed down to the the Pipeline and Tasks.
The Pipeline uses parameterized Tasks.
Reusing this pipeline only requires changing parameters in params.env in the target component

The parameters are noted below, those with an asterix should change per component:
Those parameters without an asterix allow different gcr.io locations, namespace and pvc_mount_path.
This can be run locally (for example using a local cluster via `kind create cluster`)

```
  container_image=gcr.io/kubeflow-ci/test-worker:latest
* docker_target=serve
* image_name=centraldashboard
  image_url=gcr.io/kubeflow_public_images
* kubeflow_repo_revision=1234
* kubeflow_repo_url=git@github.com:kubeflow/kubeflow.git
* manifests_repo_revision=master
* manifests_repo_url=git@github.com:kubeflow/manifests.git
  namespace=kubeflow-test-infra
* path_to_context=components/centraldashboard
* path_to_docker_file=components/centraldashboard/Dockerfile
* path_to_manifests_dir=common/centraldashboard/base
  pvc_mount_path=/kubeflow
```

### Secrets

The secrets file has been supplied with no tokens and should have tokens generated. 
The file itself should not be checked in with valid tokens. 
- gcp-credentials
- kaniko-secret (same as gcp-credentials, use by kaniko)
- github-ssh
- github-token

For the github-ssh and github-token secrets the kubeflow-bot github user and it's forked repo should be used.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Kubeflow CI with tektoncd pipelines](#kubeflow-ci-with-tektoncd-pipelines)
  - [Use Case](#use-case)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Kubeflow CI with tektoncd pipelines

### Use Case

This shows a TektonCD [pipelinerun](https://github.com/tektoncd/pipeline/blob/master/docs/pipelineruns.md) that is intended to be run as a postsubmit following a centraldashboard PR commit. This shows a continuous integration feature where the post submit will update manifests/common/centraldashboard/base/kustomization.yaml with the new image tag generated from this PR. 


### TektonCD pipelineruns, pipelines and tasks

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
   │   ├── gcr image
   │   │   └── centraldashboard
   │   ├── git repo
   │   │   ├── kubeflow pull/4112/head
   │   │   └── manifests master
   │   └── pull request
   │       └── kubeflow PR#4112
   └── pipeline
       └── tasks
           ├── build-push
           └── update-manifests
```

The PipelineRun references a Pipeline that has 2 tasks, 
and 4 PipelineResources of type image (1), git (2), and pullRequest (1). 
The tasks reference these resources in their inputs or outputs. 

### Parameterization 

The PipelineRun params are passed down to the the Pipeline and Tasks.
Reuse of centraldashboard requires changing the parameters in PipelineRun.
The pipeline, tasks and pipelineresources are parameterized by both tektoncd parameters
and kustomize vars and remain the same across the other kubeflow components.*

The PipelineRun parameters are provided by using kustomize vars.
These parameters are then passed to Pipeline and its Tasks.†

† tektoncd will not apply its parameters to the resources section in both pipeline and task

The parameters are noted below, those with an asterix would need to change per component:

  container_image=gcr.io/kubeflow-ci/test-worker:latet
* docker_target=serve
* generateName=ci-centraldashboard-pipeline-run-
* image_name=centraldashboard
* image_url=gcr.io/kubeflow_public_images/centraldashboard
* kubeflow_repo_revision=refs/pull/4112/head
* kubeflow_repo_url=git@github.com:kubeflow/kubeflow.git
  manifests_repo_revision=master
* manifests_repo_url=git@github.com:kkasravi/manifests.git
  namespace=kubeflow-test-infra
* path_to_context=components/centraldashboard
* path_to_docker_file=components/centraldashboard/Dockerfile
* path_to_manifests_dir=common/centraldashboard/base
* path_to_manifests_kustomization_file=common/centraldashboard
  pipeline=ci-pipeline
  project=kubeflow-ci
* pull_request_id=4112
  pull_request_repo=kubeflow
  pvc_mount_path=/kubeflow

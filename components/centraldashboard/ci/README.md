<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Kubeflow CI with tektoncd pipelines](#kubeflow-ci-with-tektoncd-pipelines)
  - [Use Case](#use-case)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Kubeflow CI with tektoncd pipelines

### Use Case

This shows a tektoncd pipelinerun that can be run as a postsubmit to a centraldashboard PR commit
The general relationships between TektonCD resources is shown below:

```
── PipelineRun
   ├── Pipeline
   │   └── Tasks
   └── PipelineResources
```

The PipelineRun instance has the following composition:

```
└── ci-centraldashboard-pipeline-run
    ├── pipeline
    │   └── tasks
    │       ├── build-push
    │       └── update-manifests
    └── resources
        ├── gcr-image
        │   └── centraldashboard
        ├── gitrepo
        │   ├── kubeflow pull/4112/head
        │   └── manifests master
        └── pullrequest
            └── kubeflow#4112
```

The PipelineRun references a Pipeline that has 2 tasks, 
and PipelineResources of type image (1), git (2), and pullRequest (1). 
The tasks will reference these resources in their inputs or outputs. 

The PipelineRun params are used by the Pipeline and Tasks via tektoncd parameter substituion
If one wanted to reuse this for other components, replacing the parameters in PipelineRun
would be the logical starting point. The PipelineResource of type image and the PipelineResource 
of type git for the forked manifests repo would also need to be changed.

These parameters could be replaced using kustomize vars in PipelineRun.params and PipelineResources. 
No kustomize vars would be needed in Pipeline or Task since they would be made available in PipelineRun.params.

container_image=gcr.io/kubeflow-ci/test-worker:latet
docker_target=serve
generateName=ci-centraldashboard-pipeline-run-
image_name=centraldashboard
image_url=gcr.io/kubeflow_public_images/centraldashboard
kubeflow_repo_revision=refs/pull/4112/head
kubeflow_repo_url=git@github.com:kubeflow/kubeflow.git
manifests_repo_revision=master
manifests_repo_url=git@github.com:kkasravi/manifests.git
namespace=kubeflow-test-infra
path_to_context=components/centraldashboard
path_to_docker_file=components/centraldashboard/Dockerfile
path_to_manifests_dir=common/centraldashboard/base
path_to_manifests_kustomization_file=common/centraldashboard
pipeline=ci-pipeline
project=kubeflow-ci
pull_request_id=4112
pull_request_repo=kubeflow
pvc_mount_path=/kubeflow

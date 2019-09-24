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
would be the logical starting point. The PipelineResource of type image would also need to be 
changed.


## Kubeflow CI with tektoncd pipelines

### Use Case

This is a proof of value showing a CI use case of the following

1. A developer makes source code changes to the centraldashboard component in his/her forked repo of kubeflow
2. The developer has a PR open 
3. The developer pushes changes 
4. This triggers a prow presubmit job that calls a py_func to submit 'ci-centraldashboard-pipeline-run.yaml'

### Design

1. The 'ci-centraldashboard-pipeline-run.yaml' is a TektonCD PipelineRun and contains: 

|      **kind**      	|                    **name**                 	|     **type** 	|
|:----------------:	|:-----------------------------------------:	|:------------:	|
| PipelineRun      	| ci-centraldashboard-pipeline-run-52fdfc07 	|       -      	|
| Pipeline         	| ci-pipeline                               	|       -      	|
| Task             	| build-push                                	|       -      	|
| Task             	| update-manifests                          	|       -      	|
| PipelineResource 	| centraldashboard                          	|     image    	|
| PipelineResource 	| kubeflow                                  	|      git     	|
| PipelineResource 	| kubeflow-4091                             	| pullResource 	|
| PipelineResource 	| manifests                                 	|      git     	|

2. The general relationships between TektonCD resources is shown below

```
└── PipelineRun
    ├── Pipeline
    │   └── Tasks
    └── PipelineResources
```

In this particular instance, the PipelineRun instance has the following composition:

```
└── ci-centraldashboard-pipeline-run-52fdfc07
    ├── kubeflow(git)
    ├── manifests(git)
    ├── centraldashboard(image)
    ├── kubeflow-4091(pullRequest)
    ├── build-push(task)
    └── update-manifests(task)
```

The Tasks within the Pipeline share Resources provided by the PipelineRun.  The PipelineRun is shown below:

```
apiVersion: tekton.dev/v1alpha1
kind: PipelineRun
metadata:
  labels:
    app.kubernetes.io/component: kubeflow
    app.kubernetes.io/instance: ci-centraldashboard-pipeline-run-52fdfc07
    app.kubernetes.io/managed-by: kfctl
    app.kubernetes.io/name: ci-pipeline-run
    app.kubernetes.io/part-of: kubeflow
    app.kubernetes.io/version: v0.6
    scope: kubeflow-ci
  name: ci-centraldashboard-pipeline-run-52fdfc07
  namespace: kubeflow-ci
spec:
  pipelineRef:
    name: ci-pipeline
  podTemplate:
    securityContext:
      runAsNonRoot: true
  resources:
  - name: kubeflow
    resourceRef:
      name: kubeflow
  - name: manifests
    resourceRef:
      name: manifests
  - name: centraldashboard
    resourceRef:
      name: centraldashboard
  - name: kubeflow-4091
    resourceRef:
      name: kubeflow-4091
  serviceAccount: ci-pipeline-run-service-account
```

3 Resources are provided by the PipelineRun:

- kubeflow (input)
  the github repo is mounted at /workspace/kubeflow
- manifests (input)
  the github repo is mounted at /workspace/manifests
- centraldashboard (output)
  the image is pushed to gcr
- kubeflow-4112
  the pullRequest 


The Pipeline 'ci-pipeline' is shown below:

```
apiVersion: tekton.dev/v1alpha1
kind: Pipeline
metadata:
  labels:
    scope: kubeflow-ci
  name: ci-pipeline
  namespace: kubeflow-ci
spec:
  params: []
  resources:
  - name: kubeflow
    type: git
  - name: centraldashboard
    type: image
  - name: manifests
    type: git
  - name: kubeflow-4091
    type: pullRequest
  tasks:
  - name: build-push
    params:
    - name: pathToDockerfile
      value: components/centraldashboard/Dockerfile
    - name: pathToContext
      value: components/centraldashboard
    - name: dockerTarget
      value: serve
    resources:
      inputs:
      - name: kubeflow
        resource: kubeflow
      outputs:
      - name: kubeflow
        resource: kubeflow
      - name: centraldashboard
        resource: centraldashboard
    taskRef:
      name: build-push
  - name: update-manifests
    params:
    - name: pathToManifestsDir
      value: common/centraldashboard/base
    - name: container_image
      value: gcr.io/kubeflow-ci/test-worker:latest
    resources:
      inputs:
      - from:
        - build-push
        name: kubeflow
        resource: kubeflow
      - name: manifests
        resource: manifests
      - name: kubeflow-4091
        resource: kubeflow-4091
      - from:
        - build-push
        name: centraldashboard
        resource: centraldashboard
      outputs:
      - name: manifests
        resource: manifests
    runAfter:
    - build-push
    taskRef:
      name: update-manifests
```

2 Tasks are executed by the Pipeline. These tasks require inputs or produce outputs provided by the PipelineRun and 
referenced in the Pipeline.


## Kubeflow CI with tektoncd pipelines

### Use Case

This is a proof of value showing a CI use case for the following

1. A developer makes source code changes to the centraldashboard component in his/her forked repo of kubeflow
1. The developer has a PR open 
1. The developer pushes changes 
1. This triggers a prow presubmit job that calls a py_func that submits [ci-centraldashboard-pipeline-run.yaml](./ci-centraldashboard-pipeline-run.yaml)
1. The pipeline has 2 tasks: build-push and update-manifests.
1. Before starting the build-push task, the pipeline mounts the kubeflow repo revision refs/pull/4112/head at /workspace/kubeflow/head 
1. The build-push task uses kaniko to generate a centraldashboard image and pushes it to gcr.io/kubeflow_public_images/centraldashboard
1. The build-push task makes both kubeflow and centraldashboard resources availabe to the next task
1. The update-manifests task has the kubeflow github resource, the manifests github resource, the kubeflow PR and the centraldashboard resource as inputs
1. The update-manifests does the following by running kubeflow/kubeflow/py/kubeflow/kubeflow/ci/rebuild-manifests.sh
   1. Goes to the /workspace/kubeflow-4112 directory where the PR is.
   1. Parses pr.json to get the forked repo, branch and sha.
   1. Parses github/pr.json to get the user of the forked repo
   1. sets up ~/.ssh/{id_rsa,id_rsa.pub,known_hosts} by using the secret: github-secret 
   1. does the following git operations on the forked repo
      1. Calls `git remote add upstream git@github.com:kubeflow/manifests.git`
      1. Calls `git fetch upstream master` 
      1. Calls `git checkout -b $new_branch_name upstream/master`
   1. Calls kustomize edit set image using the image digest written to /workspace/centraldashboard.digest by build-push
   1. Goes to /manifests/tests and calls `make generate; make test` 
   1. if the build && test is successful calls git commit; git push
   1. Creates a PR.
  

### Pipeline Composistion

1. The [ci-centraldashboard-pipeline-run.yaml](./ci-centraldashboard-pipeline-run.yaml) is a TektonCD pipeline containing the following k8 resources: 

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

2. The general relationships between TektonCD resources is shown below:

```
── PipelineRun
   ├── Pipeline
   │   └── Tasks
   └── PipelineResources
```

In this particular instance, the PipelineRun instance has the following composition:

```
└── ci-centraldashboard-pipeline-run-52fdfc07
    ├── pipeline
    │   └── tasks
    │       ├── build-push
    │       └── update-manifests
    └── resources
        ├── gcr-image
        │   └── centraldashboard
        ├── gitrepo
        │   ├── kubeflow
        │   └── manifests
        └── pullrequest
            └── kubeflow#4112
```

The Tasks within the Pipeline use Resources provided by the PipelineRun.  The PipelineRun is shown below:

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

As shown above, 3 PipelineResources are provided by the PipelineRun:

- kubeflow (input)
  the github repo is mounted at /workspace/kubeflow
- manifests (input)
  the github repo is mounted at /workspace/manifests
- centraldashboard (output)
  the image is pushed to gcr
- kubeflow-4112
  the pullRequest is mounted at /workspace/kubeflow-4112 and holds info about the PR


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

As shown above, 2 Tasks are executed by the Pipeline. These tasks consume inputs or produce outputs provided by the PipelineRun.

### Pipeline Parameterization

The [ci-centraldashboard-pipeline-run.yaml](./ci-centraldashboard-pipeline-run.yaml) is parameterized by the following parameters that are listed under the params sections in PipelineRun and Pipeline. Changing just a few of the parameters allows a different component to be run using this pipeline. This is covered in a later section. 

PipelineRun parameters:

|           **name**          	|                      **value**                     	|                **description**                	|
|:-----------------------:	|:----------------------------------------------:	|:-----------------------------------------:	|
| namespace               	| kubeflow-ci                                    	| namespace to run the pipeline in          	|
| generateName            	| ci-centraldashboard-pipeline-run-              	| a suffix is added to make the name unique 	|
| pipeline                	| ci-pipeline                                    	| the pipeline that the PipelineRun uses    	|
| image_name              	| centraldashboard                               	| name in the gcr                           	|
| image_url               	| gcr.io/kubeflow-images-public/centraldashboard 	| gcr url                                   	|
| kubeflow_repo_revision  	| refs/pull/4112/head                            	| the PR the developer is working in        	|
| kubeflow_repo_url       	| git@github.com:kubeflow/kubeflow.git           	| the kubeflow repo                         	|
| manifests_repo_revision 	| master                                         	| the manifests revision                    	|
| manifests_repo_url      	| git@github.com:kkasravi/manifests.git          	| the forked manifests repo                 	|
| pull_request_repo       	| kubeflow                                       	| repo for the pullRequest resource         	|
| pull_request_id         	| 4112                                           	| the pullRequest id                        	|
| pvc_mount_path          	| kubeflow                                       	| a shared pvc for tasks to write to        	|
| project                 	| kubeflow-ci                                    	| the GKE project                           	|

Pipeline parameters:

|          **name**         	|                  **value**                 	|                 **description**                	|
|:---------------------:	|:--------------------------------------:	|:------------------------------------------:	|
| image_name            	| centraldashboard                       	| name of the image resource                 	|
| docker_target         	| serve                                  	| the docker arg for multi-build dockerfiles 	|
| path_to_context       	| components/centraldashboard            	| URI to component in kubeflow repo          	|
| path_to_docker_file   	| components/centraldashboard/Dockerfile 	| path to Dockerfile                         	|
| path_to_manifests_dir 	| common/centraldashboard/base           	| path to kustomization.yaml to edit         	|
| container_image       	| gcr.io/kubeflow-ci/test-worker:latest  	| image to run in container                  	|
| pull_request_repo     	| kubeflow                               	| repo for pullRequest resource              	|
| pull_request_id       	| 4112                                   	| PR id for pullRequest resource             	|

### Pipeline Generation

#### Current Approach 

The [ci-centraldashboard-pipeline-run.yaml](./ci-centraldashboard-pipeline-run.yaml) was generated by kfctl which used 2 manifests and a ci-centraldashboard config file. The manifests are [ci-pipeline](https://github.com/kkasravi/manifests/tree/e2e-pipelineruns/ci/ci-pipeline) and [ci-pipeline-run](https://github.com/kkasravi/manifests/tree/e2e-pipelineruns/ci/ci-pipeline-run). The config file is [ci-centraldashboard-pipeline-run.yaml](https://github.com/kkasravi/manifests/blob/e2e-pipelineruns/kfdef/ci-centraldashboard-pipeline-run.yaml). By leveraging kfctl's KfDef which includes overlays, and parameters per app, the result is a generic pipeline capability with aspects that are quite different than KF pipelines. 

##### /manifests/ci/{ci-pipeline-run, ci-pipeline}

1. ci-pipeline

The ci-pipeline manifest includes a number of overlays, each of which is a Task

```
ci-pipeline
├── base
└── overlays
    ├── build-push-task
    ├── create-cluster-task
    ├── deploy-app-task
    └── update-manifests-task
```

A kfctl config file builds a pipeline by adding overlays. For ci-centraldashboard-pipeline-run.yaml the tasks are added to the ci-pipeline as overlays:

```
  - kustomizeConfig:
      overlays:
      - build-push-task
      - update-manifests-task
```

New tasks can be added to ci-pipeline/overlays and can be composed with other tasks by adding its overlay.

1. ci-pipeline-run

The ci-pipeline-run manifest also includes a number of overlay, each of which is a PipelineResource

```
ci-pipeline-run
├── base
└── overlays
    ├── image-resource
    ├── kfctl-repo-resource
    ├── kubeflow-repo-resource
    ├── manifests-repo-resource
    ├── pull-request-resource
    └── testing-repo-resource
```

Overlays with repo in their name are github repos and are automounted under /workspace. Parameters for each repo include revisions that can be commit-ids, pr's, branches.

The image-resource and pull-request-resource are docker images and git pull-requests respectively. 

These resource are also composable in any order. For ci-centraldashboard-pipeline-run.yaml the 2nd Task requires the kubeflow repo with PR, the manifests repo, the image output from build-push to get the digest, and the git pull-request. These resources are added as overlays in the ci-pipeline-run manifest:

```
  - kustomizeConfig:
      overlays:
      - kubeflow-repo-resource
      - manifests-repo-resource
      - image-resource
      - pull-request-resource
```

#### Alternatives


### Pipeline Supporting Resources

#### Secrets

#### Persitent Volumes

## Overview

The application component creates an Application Kind based on the 
components ksonnet has generated. If using kfctl this would be all components 
under the generated application or 
- ambassador.jsonnet
- argo.jsonnet
- centraldashboard.jsonnet
- jupyterhub.jsonnet
- kubeflow-app.jsonnet
- params.libsonnet
- pytorch-operator.jsonnet
- spartakus.jsonnet
- tf-job-operator.jsonnet

A subset of these components can be specified by setting kubeflow-app's params.components. 
For example if you just wanted to deploy components ambassador and jupyterhub you would do:
```bash
ks param set kubeflow-app components '["ambassador", "jupyterhub"]'
```

## Generating the application

Below are commands to generate a kubeflow-app that deploys ambassador and jupyterhub:

```bash
# add kfctl.sh to your path or alias kfctl.sh to point to its file location 
# ie: uncomment one of options below
# export PATH=$PATH:$HOME/go/src/github.com/kubeflow/kubeflow/scripts/kfctl.sh
# alias kfctl.sh=$HOME/go/src/github.com/kubeflow/kubeflow/scripts/kfctl.sh
$ kfctl.sh init kf_app
$ pushd kf_app
$ kfctl.sh generate k8s
$ pushd ks_app
$ ks env add default
$ ks env current --set default
$ ks param set kubeflow-app components '["ambassador", "jupyterhub"]'
$ ks show default -c kubeflow-app | tee kubeflow-app.yaml
$ kubectl apply --validate=false -f kubeflow-app.yaml
```

The last command will result in the following output:

```bash
configmap/application-operator-hooks created
service/application-operator created
customresourcedefinition.apiextensions.k8s.io/applications.app.k8s.io configured
application.app.k8s.io/kubeflow-app created
deployment.apps/application-operator created
compositecontroller.metacontroller.k8s.io/application-controller created
```

## Deployment flow and artifacts

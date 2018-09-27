## Overview

The Application Kind builds a set of components based on the components that 
ksonnet has generated. In the case of kfctl this would be all components 
under kubeflow/core and kubeflow/argo. A subset can be specified using 
kubeflow-app params.components. Having kfctl call
`ks apply default -c kubeflow-app` will generate the Application CR along with 
the components resources.

An example of generating the kubeflow-app:

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
$ ks param set kubeflow-app components '["ambassador", "centraldashboard", "jupyterhub", "tf-job-operator"]'
$ ks show default -c kubeflow-app | tee kubeflow-app.yaml
$ kubectl apply --validate=false -f kubeflow-app.yaml
```

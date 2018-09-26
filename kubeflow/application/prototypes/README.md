## Overview

The Application Kind needs to build a set of components based on the components that 
that kubeflow sends to the api-server. Using kfctl this would be the components sent 
to the api-server via `ks apply default`. Changing kfctl to call
`ks apply default -c <application>` will generate the Application Manifest along with 
the components manifests.

Example of generating a kubeflow app and outputting the manifests to kubeflow-app.yaml:
# add kfctl.sh to your path
export PATH=$PATH:$HOME/go/src/github.com/kubeflow/kubeflow/scripts/kfctl.sh
rm -rf kf_app
kfctl.sh init kf_app
pushd kf_app
kfctl.sh generate k8s
pushd ks_app
ks env add default
ks env current --set default
ks show default -c kubeflow-app | tee kubeflow-app.yaml





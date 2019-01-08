## Overview

The ksonnet application component creates an Application Custom Resource based on 
ksonnet components generated under `<APP_DIR>/ks_app/components/`. The ksonnet 
application component defaults to the following components:

```
"ambassador", "jupyter", "centraldashboard", "tf-job-operator", "spartakus", "argo", "pipeline"
```

These components are listed within the Application Custom Resource created by 
the ksonnet application component. An example is shown below:

```
apiVersion: app.k8s.io/v1beta1
kind: Application
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"app.k8s.io/v1beta1","kind":"Application","metadata":{"annotations":{},"labels":{"app.kubernetes.io/name":"kubeflow","app.kubernetes.io/version":"0.4","ksonnet.io/component":"application"},"name":"kubeflow","namespace":"kubeflow"},"spec":{"assemblyPhase":"Succeeded","componentKinds":[{"group":"rbac.authorization.k8s.io/v1beta1","kind":"ClusterRoleBinding"},{"group":"rbac.authorization.k8s.io/v1beta1","kind":"ClusterRole"},{"group":"v1","kind":"ConfigMap"},{"group":"apiextensions.k8s.io/v1beta1","kind":"CustomResourceDefinition"},{"group":"apps/v1beta1","kind":"Deployment"},{"group":"extensions/v1beta1","kind":"Deployment"},{"group":"rbac.authorization.k8s.io/v1beta1","kind":"Role"},{"group":"v1","kind":"ServiceAccount"},{"group":"v1","kind":"Service"}],"descriptor":{"description":"","icons":[],"keywords":[],"links":[],"maintainers":[],"notes":"","owners":[],"type":"kubeflow","version":"0.4"},"info":[],"selector":{"matchLabels":{"app.kubernetes.io/name":"kubeflow"}}}}
  creationTimestamp: 2019-01-08T17:22:36Z
  generation: 1
  labels:
    app.kubernetes.io/name: kubeflow
    app.kubernetes.io/version: "0.4"
    ksonnet.io/component: application
  name: kubeflow
  namespace: kubeflow
  resourceVersion: "5643791"
  selfLink: /apis/app.k8s.io/v1beta1/namespaces/kubeflow/applications/kubeflow
  uid: fdc16b4e-1369-11e9-90ff-42010a8a0097
spec:
  assemblyPhase: Succeeded
  componentKinds:
  - group: rbac.authorization.k8s.io/v1beta1
    kind: ClusterRoleBinding
  - group: rbac.authorization.k8s.io/v1beta1
    kind: ClusterRole
  - group: v1
    kind: ConfigMap
  - group: apiextensions.k8s.io/v1beta1
    kind: CustomResourceDefinition
  - group: apps/v1beta1
    kind: Deployment
  - group: extensions/v1beta1
    kind: Deployment
  - group: rbac.authorization.k8s.io/v1beta1
    kind: Role
  - group: v1
    kind: ServiceAccount
  - group: v1
    kind: Service
  descriptor:
    description: ""
    icons: []
    keywords: []
    links: []
    maintainers: []
    notes: ""
    owners: []
    type: kubeflow
    version: "0.4"
  info: []
  selector:
    matchLabels:
      app.kubernetes.io/name: kubeflow
status:
  assemblyPhase: Pending
  counts:
    children: 16
    installed_children: 21
    missing_children: 0
    requested_children: 21
    validated_children: 16
  created: true
  debug: null
  observedGeneration: 1
  ready: "True"
```

Alternatively, the ksonnet application component can produce an Application Custom Resource 
based on a subset of the generated components by setting a parameter. For example:

```bash
ks param set application components '["ambassador","jupyter"]'
```

## Options (emitCRD=true, emitController=false)

- emitCRD (=true)
If the Application CRD has already been emitted (eg `kubectl get crds applications.app.k8s.io`) then set this to false

```
ks param set application emitCRD false
```

- emitController (=false)

If this flag is true then the components normally deployed directly to the api-server will be emitted 
by the application-controller in-cluster. 

## Example Script (Deploying components '["ambassador","centraldashboard","tf-job-operator","tensorboard"]')

```
#!/usr/bin/env bash
KUBEFLOW_DIR=$HOME/go/src/github.com/kubeflow/kubeflow
NAME=${1:-kubeflow}

cd $HOME
if [[ -d kf_app ]]; then
  rm -rf kf_app
fi
kubectl get ns -oname | grep kubeflow 2>&1>/dev/null
if (( $? == 0 )); then
  kubectl delete ns kubeflow
fi

$KUBEFLOW_DIR/scripts/kfctl.sh init kf_app --platform none
cd $HOME/kf_app
$KUBEFLOW_DIR/scripts/kfctl.sh generate all
cd $HOME/kf_app/ks_app
ks pkg install kubeflow/tensorboard
ks generate tensorboard tensorboard
kubectl create ns kubeflow
ks env add default --namespace kubeflow
ks param set application name $NAME
ks param set application emitController true
ks param set application components '["ambassador","centraldashboard","tf-job-operator","tensorboard"]'
ks param set application debug true
ks show default -c metacontroller -c application > default.yaml
kubectl apply --validate=false -f default.yaml
```

## Kubeflow in the GKE monitoring dashboard  (Console -> Kubernetes Engine -> Applications)

The above script will result in an application that can be viewed in the GCP Marketplace
(GKE console -> Kubernetes Engine -> Applications)

The application would look like the visual below

![GCP Kubeflow Application](./docs/kubeflow_application.png "GCP Kubeflow Application")

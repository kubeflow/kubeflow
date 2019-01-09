## Overview

The ksonnet application component creates an Application Custom Resource based on 
ksonnet components generated under `<APP_DIR>/ks_app/components/`. The ksonnet 
application component defaults to the following components which are deployed by kfctl.sh when --platform=none:

```
"ambassador", "jupyter", "centraldashboard", "tf-job-operator", "pytorch-operator", "spartakus", "argo", "pipeline","katib"
```

These components are listed within the deployed Application Custom Resource created by 
the ksonnet application component. An example is shown below:

```
apiVersion: app.k8s.io/v1beta1
kind: Application
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"app.k8s.io/v1beta1","kind":"Application","metadata":{"annotations":{},"labels":{"app.kubernetes.io/name":"kubeflow","app.kubernetes.io/version":"0.4","ksonnet.io/component":"application"},"name":"kubeflow","namespace":"kubeflow"},"spec":{"assemblyPhase":"Succeeded","componentKinds":[{"group":"v1","kind":"ConfigMap"},{"group":"apps/v1beta1","kind":"Deployment"},{"group":"apps/v1beta2","kind":"Deployment"},{"group":"extensions/v1beta1","kind":"Deployment"},{"group":"batch/v1","kind":"Job"},{"group":"v1","kind":"PersistentVolumeClaim"},{"group":"rbac.authorization.k8s.io/v1beta1","kind":"RoleBinding"},{"group":"rbac.authorization.k8s.io/v1beta1","kind":"Role"},{"group":"v1","kind":"Secret"},{"group":"v1","kind":"ServiceAccount"},{"group":"v1","kind":"Service"},{"group":"apps/v1beta1","kind":"StatefulSet"}],"descriptor":{"description":"","icons":[],"keywords":[],"links":[],"maintainers":[],"notes":"","owners":[],"type":"kubeflow","version":"0.4"},"info":[],"selector":{"matchLabels":{"app.kubernetes.io/name":"kubeflow"}}}}
  creationTimestamp: 2019-01-09T21:12:35Z
  generation: 1
  labels:
    app.kubernetes.io/name: kubeflow
    app.kubernetes.io/version: "0.4"
    ksonnet.io/component: application
  name: kubeflow
  namespace: kubeflow
  resourceVersion: "5962292"
  selfLink: /apis/app.k8s.io/v1beta1/namespaces/kubeflow/applications/kubeflow
  uid: 496b7838-1453-11e9-a24e-42010a8a0044
spec:
  assemblyPhase: Succeeded
  componentKinds:
  - group: v1
    kind: ConfigMap
  - group: apps/v1beta1
    kind: Deployment
  - group: apps/v1beta2
    kind: Deployment
  - group: extensions/v1beta1
    kind: Deployment
  - group: batch/v1
    kind: Job
  - group: v1
    kind: PersistentVolumeClaim
  - group: rbac.authorization.k8s.io/v1beta1
    kind: RoleBinding
  - group: rbac.authorization.k8s.io/v1beta1
    kind: Role
  - group: v1
    kind: Secret
  - group: v1
    kind: ServiceAccount
  - group: v1
    kind: Service
  - group: apps/v1beta1
    kind: StatefulSet
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
```

Alternatively, the ksonnet application component will deploy an Application 
based on a subset of the generated components by exporting the env variable DEFAULT_KUBEFLOW_COMPONENTS. 
This is shown below in the Example.

## Options 

- extendedInfo (=false)
Emits informational arrays in the status section of the Application CR. Enabled using the env var KUBEFLOW_EXTENDEDINFO
Below is an example script which enables this information

```
#!/usr/bin/env bash
KUBEFLOW_DIR=/Users/kdkasrav/go/src/github.com/kubeflow/kubeflow
NAME=${1:-kubeflow}

cd $HOME
if [[ -d $NAME ]]; then
  rm -rf $NAME
fi
export KUBEFLOW_EXTENDEDINFO=true
$KUBEFLOW_DIR/scripts/kfctl.sh init $NAME --platform none && \
cd $HOME/$NAME && \
$KUBEFLOW_DIR/scripts/kfctl.sh generate all && \
$KUBEFLOW_DIR/scripts/kfctl.sh apply all
```

## Example (Deploying a subset of components '["ambassador","centraldashboard","tf-job-operator","tensorboard"]')

```
#!/usr/bin/env bash
KUBEFLOW_DIR=$HOME/go/src/github.com/kubeflow/kubeflow
NAME=${1:-kubeflow}

cd $HOME
if [[ -d $NAME ]]; then
  rm -rf $NAME
fi
kubectl get ns -oname | grep kubeflow 2>&1>/dev/null
if (( $? == 0 )); then
  kubectl delete ns kubeflow
fi

export DEFAULT_KUBEFLOW_COMPONENTS='"ambassador","centraldashboard","tf-job-operator","tensorboard"'
export KUBEFLOW_EXTENDEDINFO=true
$KUBEFLOW_DIR/scripts/kfctl.sh init $NAME --platform none && \
cd $HOME/$NAME && \
$KUBEFLOW_DIR/scripts/kfctl.sh generate all && \
cd $HOME/$NAME/ks_app && \
ks pkg install kubeflow/tensorboard && \
ks generate tensorboard tensorboard && \
cd $HOME/$NAME && \
$KUBEFLOW_DIR/scripts/kfctl.sh apply all
```

Running `kubectl get applications.app.k8s.io kubeflow -oyaml` returns

```
apiVersion: app.k8s.io/v1beta1
kind: Application
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"app.k8s.io/v1beta1","kind":"Application","metadata":{"annotations":{},"labels":{"app.kubernetes.io/name":"kubeflow","app.kubernetes.io/version":"0.4","ksonnet.io/component":"application"},"name":"kubeflow","namespace":"kubeflow"},"spec":{"assemblyPhase":"Succeeded","componentKinds":[{"group":"v1","kind":"ConfigMap"},{"group":"apps/v1beta1","kind":"Deployment"},{"group":"extensions/v1beta1","kind":"Deployment"},{"group":"rbac.authorization.k8s.io/v1beta1","kind":"Role"},{"group":"v1","kind":"ServiceAccount"},{"group":"v1","kind":"Service"}],"descriptor":{"description":"","icons":[],"keywords":[],"links":[],"maintainers":[],"notes":"","owners":[],"type":"kubeflow","version":"0.4"},"info":[],"selector":{"matchLabels":{"app.kubernetes.io/name":"kubeflow"}}}}
  creationTimestamp: 2019-01-09T21:25:05Z
  generation: 1
  labels:
    app.kubernetes.io/name: kubeflow
    app.kubernetes.io/version: "0.4"
    ksonnet.io/component: application
  name: kubeflow
  namespace: kubeflow
  resourceVersion: "5969794"
  selfLink: /apis/app.k8s.io/v1beta1/namespaces/kubeflow/applications/kubeflow
  uid: 080a9717-1455-11e9-a24e-42010a8a0044
spec:
  assemblyPhase: Succeeded
  componentKinds:
  - group: v1
    kind: ConfigMap
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
  assemblyPhase: Succeeded
  counts:
    created_children: 21
    expected_children: 16
    found_children: 21
    missing_children: 0
  created: true
  info: null
  observedGeneration: 1
  ready: "True"
```

## Kubeflow in the GKE monitoring dashboard  (Console -> Kubernetes Engine -> Applications)

The above script will result in an application that can be viewed in the GCP Marketplace
(GKE console -> Kubernetes Engine -> Applications)

The application would look like the visual below

![GCP Kubeflow Application](./docs/kubeflow_application.png "GCP Kubeflow Application")

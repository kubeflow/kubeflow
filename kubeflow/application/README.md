## Overview

The application component creates an Application Kind based on 
components ksonnet has generated or the user has specified using 
an application component parameter. The application component defaults
to the following components:

```
"ambassador", "jupyter", "centraldashboard", "tf-job-operator", "spartakus", "argo", "pipeline"
```

These components are listed within the Application Kind 

```
apiVersion: app.k8s.io/v1beta1
kind: Application
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"app.k8s.io/v1beta1","kind":"Application","metadata":{"annotations":{},"labels":{"app":"kubeflow","app.kubernetes.io/name":"kubeflow","ksonnet.io/component":"application"},"name":"kubeflow","namespace":"kubeflow"},"spec":{"assemblyPhase":"Succeeded","componentKinds":[{"group":"rbac.authorization.k8s.io/v1beta1","kind":"ClusterRoleBinding"},{"group":"rbac.authorization.k8s.io/v1beta1","kind":"ClusterRole"},{"group":"v1","kind":"ConfigMap"},{"group":"apiextensions.k8s.io/v1beta1","kind":"CustomResourceDefinition"},{"group":"apps/v1beta1","kind":"Deployment"},{"group":"apps/v1beta2","kind":"Deployment"},{"group":"extensions/v1beta1","kind":"Deployment"},{"group":"batch/v1","kind":"Job"},{"group":"v1","kind":"PersistentVolumeClaim"},{"group":"rbac.authorization.k8s.io/v1beta1","kind":"RoleBinding"},{"group":"rbac.authorization.k8s.io/v1beta1","kind":"Role"},{"group":"v1","kind":"Secret"},{"group":"v1","kind":"ServiceAccount"},{"group":"v1","kind":"Service"},{"group":"apps/v1beta1","kind":"StatefulSet"}],"descriptor":{"description":"","icons":[],"keywords":[],"links":[],"maintainers":[],"notes":"","owners":[],"type":"kubeflow","version":"0.4"},"info":[],"selector":{"matchLabels":{"app.kubernetes.io/name":"kubeflow"}}}}
  creationTimestamp: 2018-12-20T21:40:53Z
  generation: 1
  labels:
    app: kubeflow
    app.kubernetes.io/name: kubeflow
    ksonnet.io/component: application
  name: kubeflow
  namespace: kubeflow
  resourceVersion: "2889700"
  selfLink: /apis/app.k8s.io/v1beta1/namespaces/kubeflow/applications/kubeflow
  uid: ed56d218-049f-11e9-88a0-42010a8a01a3
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

Alternatively, the application component can produce an Application Kind based on a subset 
of the generated components by setting the components parameter. For example

```bash
ks param set application components '["ambassador","jupyter"]'
```

## Options (emitCRD=true, emitController=false)

- emitCRD (=true)
If the Application CRD has already been emitted then set this to false

```
ks param set application emitCRD false
```

- emitController (=false)

If this flag is true then the components normally deployed directly to the api-server will be emitted 
by the application-controller in-cluster. 

## Example Script (Deploying components '["ambassador","argo","jupyter","centraldashboard","pipeline"]')

```
#!/usr/bin/env bash
KUBEFLOW_DIR=$HOME/go/src/github.com/kubeflow/kubeflow

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
kubectl create ns kubeflow
ks env add default --namespace kubeflow
ks param set application name kubeflow
ks param set application emitController true
ks param set application components '["ambassador","argo","jupyter","centraldashboard","pipeline"]'
ks show default -c metacontroller -c application > default.yaml
kubectl apply --validate=false -f default.yaml
```

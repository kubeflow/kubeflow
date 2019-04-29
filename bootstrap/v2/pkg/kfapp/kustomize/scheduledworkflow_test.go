package kustomize_test

import (
  "testing"
)

func writeScheduledworkflow(th *KustTestHarness) {
  th.writeF("/manifests/pipeline/scheduledworkflow/base/crd.yaml", `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: scheduledworkflows.kubeflow.org
spec:
  group: kubeflow.org
  names:
    kind: ScheduledWorkflow
    listKind: ScheduledWorkflowList
    plural: scheduledworkflows
    shortNames:
    - swf
    singular: scheduledworkflow
  scope: Namespaced
  versions:
  - name: v1beta1
    served: true
    storage: true
`)
  th.writeF("/manifests/pipeline/scheduledworkflow/base/deployment.yaml", `
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  labels:
    app: ml-pipeline-scheduledworkflow
  name: ml-pipeline-scheduledworkflow
spec:
  selector:
    matchLabels:
      app: ml-pipeline-scheduledworkflow
  template:
    metadata:
      labels:
        app: ml-pipeline-scheduledworkflow
    spec:
      containers:
      - env:
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        image: gcr.io/ml-pipeline/scheduledworkflow:0.1.14
        imagePullPolicy: IfNotPresent
        name: ml-pipeline-scheduledworkflow
      serviceAccountName: ml-pipeline-scheduledworkflow
`)
  th.writeK("/manifests/pipeline/scheduledworkflow/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- crd.yaml
- deployment.yaml
- role-binding.yaml
- role.yaml
- sa.yaml
namespace: kubeflow
images:
- name: gcr.io/ml-pipeline/scheduledworkflow
  newTag: '0.1.14'
`)
  th.writeF("/manifests/pipeline/scheduledworkflow/base/role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    app: ml-pipeline-scheduledworkflow
  name: ml-pipeline-scheduledworkflow
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: ml-pipeline-scheduledworkflow
`)
  th.writeF("/manifests/pipeline/scheduledworkflow/base/role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  labels:
    app: ml-pipeline-scheduledworkflow
  name: ml-pipeline-scheduledworkflow
rules:
- apiGroups:
  - argoproj.io
  resources:
  - workflows
  verbs:
  - create
  - get
  - list
  - watch
  - update
  - patch
  - delete
- apiGroups:
  - kubeflow.org
  resources:
  - scheduledworkflows
  verbs:
  - create
  - get
  - list
  - watch
  - update
  - patch
  - delete
`)
  th.writeF("/manifests/pipeline/scheduledworkflow/base/sa.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ml-pipeline-scheduledworkflow
`)
}

func TestScheduledworkflow(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/pipeline/scheduledworkflow/base")
  writeScheduledworkflow(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: scheduledworkflows.kubeflow.org
spec:
  group: kubeflow.org
  names:
    kind: ScheduledWorkflow
    listKind: ScheduledWorkflowList
    plural: scheduledworkflows
    shortNames:
    - swf
    singular: scheduledworkflow
  scope: Namespaced
  versions:
  - name: v1beta1
    served: true
    storage: true
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ml-pipeline-scheduledworkflow
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  labels:
    app: ml-pipeline-scheduledworkflow
  name: ml-pipeline-scheduledworkflow
  namespace: kubeflow
rules:
- apiGroups:
  - argoproj.io
  resources:
  - workflows
  verbs:
  - create
  - get
  - list
  - watch
  - update
  - patch
  - delete
- apiGroups:
  - kubeflow.org
  resources:
  - scheduledworkflows
  verbs:
  - create
  - get
  - list
  - watch
  - update
  - patch
  - delete
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    app: ml-pipeline-scheduledworkflow
  name: ml-pipeline-scheduledworkflow
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: ml-pipeline-scheduledworkflow
  namespace: kubeflow
---
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  labels:
    app: ml-pipeline-scheduledworkflow
  name: ml-pipeline-scheduledworkflow
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app: ml-pipeline-scheduledworkflow
  template:
    metadata:
      labels:
        app: ml-pipeline-scheduledworkflow
    spec:
      containers:
      - env:
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        image: gcr.io/ml-pipeline/scheduledworkflow:0.1.14
        imagePullPolicy: IfNotPresent
        name: ml-pipeline-scheduledworkflow
      serviceAccountName: ml-pipeline-scheduledworkflow
`)
}

package kustomize_test

import (
  "testing"
)

func writePersistentAgent(th *KustTestHarness) {
  th.writeF("/manifests/pipeline/persistent-agent/base/clusterrole-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    app: ml-pipeline-persistenceagent
  name: ml-pipeline-persistenceagent
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: ml-pipeline-persistenceagent
`)
  th.writeF("/manifests/pipeline/persistent-agent/base/clusterrole.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  labels:
    app: ml-pipeline-persistenceagent
  name: ml-pipeline-persistenceagent
rules:
- apiGroups:
  - argoproj.io
  resources:
  - workflows
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - kubeflow.org
  resources:
  - scheduledworkflows
  verbs:
  - get
  - list
  - watch
`)
  th.writeF("/manifests/pipeline/persistent-agent/base/deployment.yaml", `
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  labels:
    app: ml-pipeline-persistenceagent
  name: ml-pipeline-persistenceagent
spec:
  selector:
    matchLabels:
      app: ml-pipeline-persistenceagent
  template:
    metadata:
      labels:
        app: ml-pipeline-persistenceagent
    spec:
      containers:
      - env:
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        image: gcr.io/ml-pipeline/persistenceagent:0.1.14
        imagePullPolicy: IfNotPresent
        name: ml-pipeline-persistenceagent
      serviceAccountName: ml-pipeline-persistenceagent
`)
  th.writeK("/manifests/pipeline/persistent-agent/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- clusterrole-binding.yaml
- clusterrole.yaml
- deployment.yaml
- sa.yaml

images:
- name: gcr.io/ml-pipeline/persistenceagent
  newTag: '0.1.14'
`)
  th.writeF("/manifests/pipeline/persistent-agent/base/sa.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ml-pipeline-persistenceagent
`)
}

func TestPersistentAgent(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/pipeline/persistent-agent/base")
  writePersistentAgent(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ml-pipeline-persistenceagent
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  labels:
    app: ml-pipeline-persistenceagent
  name: ml-pipeline-persistenceagent
rules:
- apiGroups:
  - argoproj.io
  resources:
  - workflows
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - kubeflow.org
  resources:
  - scheduledworkflows
  verbs:
  - get
  - list
  - watch
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    app: ml-pipeline-persistenceagent
  name: ml-pipeline-persistenceagent
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: ml-pipeline-persistenceagent
  namespace: kubeflow
---
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  labels:
    app: ml-pipeline-persistenceagent
  name: ml-pipeline-persistenceagent
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app: ml-pipeline-persistenceagent
  template:
    metadata:
      labels:
        app: ml-pipeline-persistenceagent
    spec:
      containers:
      - env:
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        image: gcr.io/ml-pipeline/persistenceagent:0.1.14
        imagePullPolicy: IfNotPresent
        name: ml-pipeline-persistenceagent
      serviceAccountName: ml-pipeline-persistenceagent
`)
}

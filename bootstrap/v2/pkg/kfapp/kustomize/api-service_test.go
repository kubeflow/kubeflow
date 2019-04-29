package kustomize_test

import (
  "testing"
)

func writeApiService(th *KustTestHarness) {
  th.writeF("/manifests/pipeline/api-service/base/deployment.yaml", `
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  labels:
    app: ml-pipeline
  name: ml-pipeline
spec:
  selector:
    matchLabels:
      app: ml-pipeline
  template:
    metadata:
      labels:
        app: ml-pipeline
    spec:
      containers:
      - env:
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        image: gcr.io/ml-pipeline/api-server:0.1.14
        imagePullPolicy: IfNotPresent
        name: ml-pipeline-api-server
        ports:
        - containerPort: 8888
        - containerPort: 8887
      serviceAccountName: ml-pipeline
`)
  th.writeK("/manifests/pipeline/api-service/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- deployment.yaml
- role-binding.yaml
- role.yaml
- sa.yaml
- service.yaml
namespace: kubeflow
images:
- name: gcr.io/ml-pipeline/api-server
  newTag: '0.1.14'
`)
  th.writeF("/manifests/pipeline/api-service/base/role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  labels:
    app: ml-pipeline
  name: ml-pipeline
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: ml-pipeline
subjects:
- kind: ServiceAccount
  name: ml-pipeline
  namespace: kubeflow
`)
  th.writeF("/manifests/pipeline/api-service/base/role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  labels:
    app: ml-pipeline
  name: ml-pipeline
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
  - update
  - patch
  - delete
`)
  th.writeF("/manifests/pipeline/api-service/base/sa.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ml-pipeline
`)
  th.writeF("/manifests/pipeline/api-service/base/service.yaml", `
apiVersion: v1
kind: Service
metadata:
  labels:
    app: ml-pipeline
  name: ml-pipeline
spec:
  ports:
  - name: http
    port: 8888
    protocol: TCP
    targetPort: 8888
  - name: grpc
    port: 8887
    protocol: TCP
    targetPort: 8887
  selector:
    app: ml-pipeline
`)
}

func TestApiService(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/pipeline/api-service/base")
  writeApiService(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ml-pipeline
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  labels:
    app: ml-pipeline
  name: ml-pipeline
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
  - update
  - patch
  - delete
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  labels:
    app: ml-pipeline
  name: ml-pipeline
  namespace: kubeflow
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: ml-pipeline
subjects:
- kind: ServiceAccount
  name: ml-pipeline
  namespace: kubeflow
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: ml-pipeline
  name: ml-pipeline
  namespace: kubeflow
spec:
  ports:
  - name: http
    port: 8888
    protocol: TCP
    targetPort: 8888
  - name: grpc
    port: 8887
    protocol: TCP
    targetPort: 8887
  selector:
    app: ml-pipeline
---
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  labels:
    app: ml-pipeline
  name: ml-pipeline
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app: ml-pipeline
  template:
    metadata:
      labels:
        app: ml-pipeline
    spec:
      containers:
      - env:
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        image: gcr.io/ml-pipeline/api-server:0.1.14
        imagePullPolicy: IfNotPresent
        name: ml-pipeline-api-server
        ports:
        - containerPort: 8888
        - containerPort: 8887
      serviceAccountName: ml-pipeline
`)
}

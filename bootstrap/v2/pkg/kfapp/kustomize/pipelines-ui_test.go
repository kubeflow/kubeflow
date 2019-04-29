package kustomize_test

import (
  "testing"
)

func writePipelinesUi(th *KustTestHarness) {
  th.writeF("/manifests/pipeline/pipelines-ui/base/deployment.yaml", `
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  labels:
    app: ml-pipeline-ui
  name: ml-pipeline-ui
spec:
  selector:
    matchLabels:
      app: ml-pipeline-ui
  template:
    metadata:
      labels:
        app: ml-pipeline-ui
    spec:
      containers:
      - image: gcr.io/ml-pipeline/frontend:0.1.14
        imagePullPolicy: IfNotPresent
        name: ml-pipeline-ui
        ports:
        - containerPort: 3000
      serviceAccountName: ml-pipeline-ui
`)
  th.writeF("/manifests/pipeline/pipelines-ui/base/role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  labels:
    app: ml-pipeline-ui
  name: ml-pipeline-ui
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: ml-pipeline-ui
subjects:
- kind: ServiceAccount
  name: ml-pipeline-ui
  namespace: kubeflow
`)
  th.writeF("/manifests/pipeline/pipelines-ui/base/role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  labels:
    app: ml-pipeline-ui
  name: ml-pipeline-ui
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - pods/log
  verbs:
  - create
  - get
  - list
`)
  th.writeF("/manifests/pipeline/pipelines-ui/base/sa.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ml-pipeline-ui
`)
  th.writeF("/manifests/pipeline/pipelines-ui/base/service.yaml", `
apiVersion: v1
kind: Service
metadata:
  annotations:
    getambassador.io/config: |-
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: pipelineui-mapping
      prefix: /pipeline
      rewrite: /pipeline
      timeout_ms: 300000
      service: ml-pipeline-ui.$(namespace)
      use_websocket: true
  labels:
    app: ml-pipeline-ui
  name: ml-pipeline-ui
spec:
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: ml-pipeline-ui
`)
  th.writeF("/manifests/pipeline/pipelines-ui/base/params.yaml", `
varReference:
- path: metadata/annotations/getambassador.io\/config
  kind: Service
`)
  th.writeK("/manifests/pipeline/pipelines-ui/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- deployment.yaml
- role-binding.yaml
- role.yaml
- sa.yaml
- service.yaml

images:
- name: gcr.io/ml-pipeline/frontend
  newTag: '0.1.14'

vars:
- name: namespace
  objref:
    kind: Service
    name: ml-pipeline-ui
    apiVersion: v1
  fieldref:
    fieldpath: metadata.namespace

configurations:
- params.yaml
`)
}

func TestPipelinesUi(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/pipeline/pipelines-ui/base")
  writePipelinesUi(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ml-pipeline-ui
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  labels:
    app: ml-pipeline-ui
  name: ml-pipeline-ui
  namespace: kubeflow
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - pods/log
  verbs:
  - create
  - get
  - list
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  labels:
    app: ml-pipeline-ui
  name: ml-pipeline-ui
  namespace: kubeflow
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: ml-pipeline-ui
subjects:
- kind: ServiceAccount
  name: ml-pipeline-ui
  namespace: kubeflow
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    getambassador.io/config: |-
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: pipelineui-mapping
      prefix: /pipeline
      rewrite: /pipeline
      timeout_ms: 300000
      service: ml-pipeline-ui.kubeflow
      use_websocket: true
  labels:
    app: ml-pipeline-ui
  name: ml-pipeline-ui
  namespace: kubeflow
spec:
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: ml-pipeline-ui
---
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  labels:
    app: ml-pipeline-ui
  name: ml-pipeline-ui
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app: ml-pipeline-ui
  template:
    metadata:
      labels:
        app: ml-pipeline-ui
    spec:
      containers:
      - image: gcr.io/ml-pipeline/frontend:0.1.14
        imagePullPolicy: IfNotPresent
        name: ml-pipeline-ui
        ports:
        - containerPort: 3000
      serviceAccountName: ml-pipeline-ui
`)
}

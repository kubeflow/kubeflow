package kustomize_test

import (
  "testing"
)

func writePipelinesViewer(th *KustTestHarness) {
  th.writeF("/manifests/pipeline/pipelines-viewer/base/crd.yaml", `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: viewers.kubeflow.org
spec:
  group: kubeflow.org
  names:
    kind: Viewer
    listKind: ViewerList
    plural: viewers
    shortNames:
    - vi
    singular: viewer
  scope: Namespaced
  versions:
  - name: v1beta1
    served: true
    storage: true
`)
  th.writeF("/manifests/pipeline/pipelines-viewer/base/clusterrole-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    app: ml-pipeline-viewer-crd
  name: ml-pipeline-viewer-crd-role-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: ml-pipeline-viewer-controller-role
subjects:
- kind: ServiceAccount
  name: ml-pipeline-viewer-crd-service-account
`)
  th.writeF("/manifests/pipeline/pipelines-viewer/base/clusterrole.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  labels:
    app: ml-pipeline-viewer-crd
  name: ml-pipeline-viewer-controller-role
rules:
- apiGroups:
  - '*'
  resources:
  - deployments
  - services
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
  - viewers
  verbs:
  - create
  - get
  - list
  - watch
  - update
  - patch
  - delete
`)
  th.writeF("/manifests/pipeline/pipelines-viewer/base/deployment.yaml", `
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  labels:
    app: ml-pipeline-viewer-crd
  name: ml-pipeline-viewer-controller-deployment
spec:
  selector:
    matchLabels:
      app: ml-pipeline-viewer-crd
  template:
    metadata:
      labels:
        app: ml-pipeline-viewer-crd
    spec:
      containers:
      - env:
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        image: gcr.io/ml-pipeline/viewer-crd-controller:0.1.14
        imagePullPolicy: Always
        name: ml-pipeline-viewer-controller
      serviceAccountName: ml-pipeline-viewer-crd-service-account
`)
  th.writeF("/manifests/pipeline/pipelines-viewer/base/sa.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ml-pipeline-viewer-crd-service-account
`)
  th.writeF("/manifests/pipeline/pipelines-viewer/base/service.yaml", `
apiVersion: v1
kind: Service
metadata:
  annotations:
    getambassador.io/config: |-
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: pipeline-tensorboard-ui-mapping
      prefix: /data
      rewrite: /data
      timeout_ms: 300000
      service: ml-pipeline-tensorboard-ui.$(namespace)
      use_websocket: true
  labels:
    app: ml-pipeline-tensorboard-ui
  name: ml-pipeline-tensorboard-ui
spec:
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: ml-pipeline-tensorboard-ui
`)
  th.writeF("/manifests/pipeline/pipelines-viewer/base/params.yaml", `
varReference:
- path: metadata/annotations/getambassador.io\/config
  kind: Service
`)
  th.writeK("/manifests/pipeline/pipelines-viewer/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- crd.yaml
- clusterrole-binding.yaml
- clusterrole.yaml
- deployment.yaml
- sa.yaml
- service.yaml
images:
- name: gcr.io/ml-pipeline/viewer-crd-controller
  newTag: '0.1.14'
vars:
- name: namespace
  objref:
    kind: Service
    name: ml-pipeline-tensorboard-ui
    apiVersion: v1
  fieldref:
    fieldpath: metadata.namespace
configurations:
- params.yaml
`)
}

func TestPipelinesViewer(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/pipeline/pipelines-viewer/base")
  writePipelinesViewer(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: viewers.kubeflow.org
spec:
  group: kubeflow.org
  names:
    kind: Viewer
    listKind: ViewerList
    plural: viewers
    shortNames:
    - vi
    singular: viewer
  scope: Namespaced
  versions:
  - name: v1beta1
    served: true
    storage: true
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ml-pipeline-viewer-crd-service-account
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  labels:
    app: ml-pipeline-viewer-crd
  name: ml-pipeline-viewer-controller-role
rules:
- apiGroups:
  - '*'
  resources:
  - deployments
  - services
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
  - viewers
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
    app: ml-pipeline-viewer-crd
  name: ml-pipeline-viewer-crd-role-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: ml-pipeline-viewer-controller-role
subjects:
- kind: ServiceAccount
  name: ml-pipeline-viewer-crd-service-account
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
      name: pipeline-tensorboard-ui-mapping
      prefix: /data
      rewrite: /data
      timeout_ms: 300000
      service: ml-pipeline-tensorboard-ui.kubeflow
      use_websocket: true
  labels:
    app: ml-pipeline-tensorboard-ui
  name: ml-pipeline-tensorboard-ui
  namespace: kubeflow
spec:
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: ml-pipeline-tensorboard-ui
---
apiVersion: apps/v1beta2
kind: Deployment
metadata:
  labels:
    app: ml-pipeline-viewer-crd
  name: ml-pipeline-viewer-controller-deployment
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app: ml-pipeline-viewer-crd
  template:
    metadata:
      labels:
        app: ml-pipeline-viewer-crd
    spec:
      containers:
      - env:
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        image: gcr.io/ml-pipeline/viewer-crd-controller:0.1.14
        imagePullPolicy: Always
        name: ml-pipeline-viewer-controller
      serviceAccountName: ml-pipeline-viewer-crd-service-account
`)
}

package kustomize_test

import (
  "testing"
)

func writeCentraldashboard(th *KustTestHarness) {
  th.writeF("/manifests/common/centraldashboard/base/deployment.yaml", `
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: centraldashboard
  name: centraldashboard
spec:
  replicas: 1
  selector:
    matchLabels:
      app: centraldashboard
  template:
    metadata:
      labels:
        app: centraldashboard
    spec:
      containers:
      - image: gcr.io/kubeflow-images-public/centraldashboard:v0.5.0
        imagePullPolicy: IfNotPresent
        name: centraldashboard
        ports:
        - containerPort: 8082
          protocol: TCP
      serviceAccountName: centraldashboard
`)
  th.writeK("/manifests/common/centraldashboard/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- deployment.yaml
- role-binding.yaml
- role.yaml
- service-account.yaml
- service.yaml
commonLabels:
  kustomize.component: centraldashboard
images:
  - name: gcr.io/kubeflow-images-public/centraldashboard
    newName: gcr.io/kubeflow-images-public/centraldashboard
    newTag: latest
generatorOptions:
  disableNameSuffixHash: true
vars:
- name: namespace
  objref:
    kind: Service
    name: centraldashboard
    apiVersion: v1
  fieldref:
    fieldpath: metadata.namespace
configurations:
- params.yaml

`)
  th.writeF("/manifests/common/centraldashboard/base/params.yaml", `
varReference:
- path: metadata/annotations/getambassador.io\/config
  kind: Service
`)
  th.writeF("/manifests/common/centraldashboard/base/role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  labels:
    app: centraldashboard
  name: centraldashboard
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: centraldashboard
subjects:
- kind: ServiceAccount
  name: centraldashboard
  namespace: kubeflow
`)
  th.writeF("/manifests/common/centraldashboard/base/role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  labels:
    app: centraldashboard
  name: centraldashboard
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - pods/exec
  - pods/log
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - get
`)
  th.writeF("/manifests/common/centraldashboard/base/service-account.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: centraldashboard
`)
  th.writeF("/manifests/common/centraldashboard/base/service.yaml", `
apiVersion: v1
kind: Service
metadata:
  annotations:
    getambassador.io/config: |-
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: centralui-mapping
      prefix: /
      rewrite: /
      service: centraldashboard.$(namespace)
  labels:
    app: centraldashboard
  name: centraldashboard
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 8082
  selector:
    app: centraldashboard
  sessionAffinity: None
  type: ClusterIP
`)
}

func TestCentraldashboard(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/common/centraldashboard/base")
  writeCentraldashboard(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    kustomize.component: centraldashboard
  name: centraldashboard
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  labels:
    app: centraldashboard
    kustomize.component: centraldashboard
  name: centraldashboard
  namespace: kubeflow
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - pods/exec
  - pods/log
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - get
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  labels:
    app: centraldashboard
    kustomize.component: centraldashboard
  name: centraldashboard
  namespace: kubeflow
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: centraldashboard
subjects:
- kind: ServiceAccount
  name: centraldashboard
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
      name: centralui-mapping
      prefix: /
      rewrite: /
      service: centraldashboard.kubeflow
  labels:
    app: centraldashboard
    kustomize.component: centraldashboard
  name: centraldashboard
  namespace: kubeflow
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 8082
  selector:
    app: centraldashboard
    kustomize.component: centraldashboard
  sessionAffinity: None
  type: ClusterIP
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: centraldashboard
    kustomize.component: centraldashboard
  name: centraldashboard
  namespace: kubeflow
spec:
  replicas: 1
  selector:
    matchLabels:
      app: centraldashboard
      kustomize.component: centraldashboard
  template:
    metadata:
      labels:
        app: centraldashboard
        kustomize.component: centraldashboard
    spec:
      containers:
      - image: gcr.io/kubeflow-images-public/centraldashboard:latest
        imagePullPolicy: IfNotPresent
        name: centraldashboard
        ports:
        - containerPort: 8082
          protocol: TCP
      serviceAccountName: centraldashboard
`)
}

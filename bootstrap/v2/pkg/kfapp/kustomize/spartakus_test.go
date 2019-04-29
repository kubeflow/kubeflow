package kustomize_test

import (
  "testing"
)

func writeSpartakus(th *KustTestHarness) {
  th.writeF("/manifests/common/spartakus/base/cluster-role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    app: spartakus
  name: spartakus
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: spartakus
subjects:
- kind: ServiceAccount
  name: spartakus
`)
  th.writeF("/manifests/common/spartakus/base/cluster-role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  labels:
    app: spartakus
  name: spartakus
rules:
- apiGroups:
  - ""
  resources:
  - nodes
  verbs:
  - get
  - list
`)
  th.writeF("/manifests/common/spartakus/base/deployment.yaml", `
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: spartakus
  name: spartakus-volunteer
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: spartakus-volunteer
    spec:
      containers:
      - args:
        - volunteer
        - --cluster-id=$(usageId)
        - --database=https://stats-collector.kubeflow.org
        image: gcr.io/google_containers/spartakus-amd64:v1.1.0
        name: volunteer
      serviceAccountName: spartakus
`)
  th.writeK("/manifests/common/spartakus/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- cluster-role-binding.yaml
- cluster-role.yaml
- deployment.yaml
- service-account.yaml
commonLabels:
  kustomize.component: spartakus
images:
  - name: gcr.io/google_containers/spartakus-amd64
    newName: gcr.io/google_containers/spartakus-amd64
    newTag: v1.1.0
configMapGenerator:
- name: spartakus-parameters
  env: params.env
generatorOptions:
  disableNameSuffixHash: true
vars:
- name: usageId
  objref:
    kind: ConfigMap
    name: spartakus-parameters
    apiVersion: v1
  fieldref:
    fieldpath: data.usageId
configurations:
- params.yaml
`)
  th.writeF("/manifests/common/spartakus/base/params.env", `
usageId=unknown_cluster
`)
  th.writeF("/manifests/common/spartakus/base/params.yaml", `
varReference:
- path: spec/template/spec/containers/0/args/1
  kind: Deployment
`)
  th.writeF("/manifests/common/spartakus/base/service-account.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app: spartakus
  name: spartakus
`)
}

func TestSpartakus(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/common/spartakus/base")
  writeSpartakus(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app: spartakus
    kustomize.component: spartakus
  name: spartakus
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  labels:
    app: spartakus
    kustomize.component: spartakus
  name: spartakus
rules:
- apiGroups:
  - ""
  resources:
  - nodes
  verbs:
  - get
  - list
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    app: spartakus
    kustomize.component: spartakus
  name: spartakus
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: spartakus
subjects:
- kind: ServiceAccount
  name: spartakus
  namespace: kubeflow
---
apiVersion: v1
data:
  usageId: unknown_cluster
kind: ConfigMap
metadata:
  labels:
    kustomize.component: spartakus
  name: spartakus-parameters
  namespace: kubeflow
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: spartakus
    kustomize.component: spartakus
  name: spartakus-volunteer
  namespace: kubeflow
spec:
  replicas: 1
  selector:
    matchLabels:
      kustomize.component: spartakus
  template:
    metadata:
      labels:
        app: spartakus-volunteer
        kustomize.component: spartakus
    spec:
      containers:
      - args:
        - volunteer
        - --cluster-id=unknown_cluster
        - --database=https://stats-collector.kubeflow.org
        image: gcr.io/google_containers/spartakus-amd64:v1.1.0
        name: volunteer
      serviceAccountName: spartakus
`)
}

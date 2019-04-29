package kustomize_test

import (
  "testing"
)

func writeNotebookController(th *KustTestHarness) {
  th.writeF("/manifests/jupyter/notebook-controller/base/cluster-role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: role-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: role
subjects:
- kind: ServiceAccount
  name: service-account
`)
  th.writeF("/manifests/jupyter/notebook-controller/base/cluster-role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: role
rules:
- apiGroups:
  - apps
  resources:
  - statefulsets
  - deployments
  verbs:
  - '*'
- apiGroups:
  - ""
  resources:
  - services
  verbs:
  - '*'
- apiGroups:
  - kubeflow.org
  resources:
  - notebooks
  verbs:
  - '*'
`)
  th.writeF("/manifests/jupyter/notebook-controller/base/crd.yaml", `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: notebooks.kubeflow.org
spec:
  group: kubeflow.org
  names:
    kind: Notebook
    plural: notebooks
    singular: notebook
  scope: Namespaced
  subresources:
    status: {}
  version: v1alpha1
`)
  th.writeF("/manifests/jupyter/notebook-controller/base/deployment.yaml", `
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: deployment
spec:
  template:
    spec:
      containers:
      - name: manager
        image: gcr.io/kubeflow-images-public/notebook-controller:v20190401-v0.4.0-rc.1-308-g33618cc9-e3b0c4
        command:
          - /manager
        env:
          - name: POD_LABELS
            valueFrom:
              configMapKeyRef:
                name: parameters
                key: POD_LABELS
        imagePullPolicy: Always
      serviceAccountName: service-account
`)
  th.writeK("/manifests/jupyter/notebook-controller/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- cluster-role-binding.yaml
- cluster-role.yaml
- crd.yaml
- deployment.yaml
- service-account.yaml
- service.yaml
namePrefix: notebook-controller-
commonLabels:
  app: notebook-controller
  kustomize.component: notebook-controller
images:
  - name: gcr.io/kubeflow-images-public/notebook-controller
    newName: gcr.io/kubeflow-images-public/notebook-controller
    newTag: v20190401-v0.4.0-rc.1-308-g33618cc9-e3b0c4
configMapGenerator:
- name: parameters
  env: params.env
generatorOptions:
  disableNameSuffixHash: true
`)
  th.writeF("/manifests/jupyter/notebook-controller/base/params.env", `
POD_LABELS=gcp-cred-secret=user-gcp-sa,gcp-cred-secret-filename=user-gcp-sa.json
`)
  th.writeF("/manifests/jupyter/notebook-controller/base/service-account.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: service-account
`)
  th.writeF("/manifests/jupyter/notebook-controller/base/service.yaml", `
apiVersion: v1
kind: Service
metadata:
  name: service
spec:
  ports:
  - port: 443
`)
}

func TestNotebookController(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/jupyter/notebook-controller/base")
  writeNotebookController(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  labels:
    app: notebook-controller
    kustomize.component: notebook-controller
  name: notebooks.kubeflow.org
spec:
  group: kubeflow.org
  names:
    kind: Notebook
    plural: notebooks
    singular: notebook
  scope: Namespaced
  subresources:
    status: {}
  version: v1alpha1
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app: notebook-controller
    kustomize.component: notebook-controller
  name: notebook-controller-service-account
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  labels:
    app: notebook-controller
    kustomize.component: notebook-controller
  name: notebook-controller-role
rules:
- apiGroups:
  - apps
  resources:
  - statefulsets
  - deployments
  verbs:
  - '*'
- apiGroups:
  - ""
  resources:
  - services
  verbs:
  - '*'
- apiGroups:
  - kubeflow.org
  resources:
  - notebooks
  verbs:
  - '*'
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  labels:
    app: notebook-controller
    kustomize.component: notebook-controller
  name: notebook-controller-role-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: notebook-controller-role
subjects:
- kind: ServiceAccount
  name: notebook-controller-service-account
  namespace: kubeflow
---
apiVersion: v1
data:
  POD_LABELS: gcp-cred-secret=user-gcp-sa,gcp-cred-secret-filename=user-gcp-sa.json
kind: ConfigMap
metadata:
  labels:
    app: notebook-controller
    kustomize.component: notebook-controller
  name: notebook-controller-parameters
  namespace: kubeflow
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: notebook-controller
    kustomize.component: notebook-controller
  name: notebook-controller-service
  namespace: kubeflow
spec:
  ports:
  - port: 443
  selector:
    app: notebook-controller
    kustomize.component: notebook-controller
---
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  labels:
    app: notebook-controller
    kustomize.component: notebook-controller
  name: notebook-controller-deployment
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app: notebook-controller
      kustomize.component: notebook-controller
  template:
    metadata:
      labels:
        app: notebook-controller
        kustomize.component: notebook-controller
    spec:
      containers:
      - command:
        - /manager
        env:
        - name: POD_LABELS
          valueFrom:
            configMapKeyRef:
              key: POD_LABELS
              name: notebook-controller-parameters
        image: gcr.io/kubeflow-images-public/notebook-controller:v20190401-v0.4.0-rc.1-308-g33618cc9-e3b0c4
        imagePullPolicy: Always
        name: manager
      serviceAccountName: notebook-controller-service-account
`)
}

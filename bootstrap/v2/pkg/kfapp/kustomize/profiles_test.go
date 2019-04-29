package kustomize_test

import (
  "testing"
)

func writeProfiles(th *KustTestHarness) {
  th.writeF("/manifests/profiles/base/crd.yaml", `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: profiles.kubeflow.org
spec:
  group: kubeflow.org
  names:
    kind: Profile
    listKind: ProfileList
    plural: profiles
    shortNames:
    - prf
    singular: profile
  scope: Namespaced
  validation:
    openAPIV3Schema:
      properties:
        apiVersion:
          type: string
        kind:
          type: string
        metadata:
          type: object
        spec:
          properties:
            namespace:
              type: string
            owner:
              properties:
                apiGroup:
                  type: string
                kind:
                  enum:
                  - ServiceAccount
                  - User
                  - Group
                name:
                  type: string
                namespace:
                  type: string
              required:
              - kind
              - name
              type: object
          type: object
        status:
          properties:
            observedGeneration:
              format: int64
              type: integer
          type: object
  version: v1alpha1
`)
  th.writeF("/manifests/profiles/base/service-account.yaml", `
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: controller-service-account
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: service-account
`)
  th.writeF("/manifests/profiles/base/cluster-role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-role-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: controller-service-account
`)
  th.writeF("/manifests/profiles/base/role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: role
rules:
- apiGroups:
  - ""
  resources:
  - namespaces
  verbs: ['get', 'list']
- apiGroups:
  - rbac.authorization.k8s.io
  resources:
  - roles
  - rolebindings
  verbs: ['get', 'list']
- apiGroups:
  - kubeflow.org
  resources:
  - profiles
  verbs: ['*']
`)
  th.writeF("/manifests/profiles/base/role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: role-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: role
subjects:
- kind: ServiceAccount
  name: service-account
`)
  th.writeF("/manifests/profiles/base/service.yaml", `
apiVersion: v1
kind: Service
metadata:
  name: service
spec:
  ports:
  - port: 443
`)
  th.writeF("/manifests/profiles/base/deployment.yaml", `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment
spec:
  template:
    spec:
      containers:
      - command:
        - /manager
        image: gcr.io/kubeflow-images-public/profile-controller:v20190228-v0.4.0-rc.1-192-g1a802656-dirty-f95773
        imagePullPolicy: Always
        name: manager
      serviceAccountName: service-account
`)
  th.writeK("/manifests/profiles/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- crd.yaml
- service-account.yaml
- cluster-role-binding.yaml
- role.yaml
- role-binding.yaml
- service.yaml
- deployment.yaml
namePrefix: profiles-
commonLabels:
  app.kubernetes.io/name: profiles-application
  kustomize.component: profiles
images:
  - name: gcr.io/kubeflow-images-public/profile-controller
    newName: gcr.io/kubeflow-images-public/profile-controller
    newTag: v20190228-v0.4.0-rc.1-192-g1a802656-dirty-f95773
`)
}

func TestProfiles(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/profiles/base")
  writeProfiles(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  labels:
    app.kubernetes.io/name: profiles-application
    kustomize.component: profiles
  name: profiles.kubeflow.org
spec:
  group: kubeflow.org
  names:
    kind: Profile
    listKind: ProfileList
    plural: profiles
    shortNames:
    - prf
    singular: profile
  scope: Namespaced
  validation:
    openAPIV3Schema:
      properties:
        apiVersion:
          type: string
        kind:
          type: string
        metadata:
          type: object
        spec:
          properties:
            namespace:
              type: string
            owner:
              properties:
                apiGroup:
                  type: string
                kind:
                  enum:
                  - ServiceAccount
                  - User
                  - Group
                name:
                  type: string
                namespace:
                  type: string
              required:
              - kind
              - name
              type: object
          type: object
        status:
          properties:
            observedGeneration:
              format: int64
              type: integer
          type: object
  version: v1alpha1
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app.kubernetes.io/name: profiles-application
    kustomize.component: profiles
  name: profiles-controller-service-account
  namespace: kubeflow
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app.kubernetes.io/name: profiles-application
    kustomize.component: profiles
  name: profiles-service-account
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  labels:
    app.kubernetes.io/name: profiles-application
    kustomize.component: profiles
  name: profiles-role
  namespace: kubeflow
rules:
- apiGroups:
  - ""
  resources:
  - namespaces
  verbs:
  - get
  - list
- apiGroups:
  - rbac.authorization.k8s.io
  resources:
  - roles
  - rolebindings
  verbs:
  - get
  - list
- apiGroups:
  - kubeflow.org
  resources:
  - profiles
  verbs:
  - '*'
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  labels:
    app.kubernetes.io/name: profiles-application
    kustomize.component: profiles
  name: profiles-role-binding
  namespace: kubeflow
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: profiles-role
subjects:
- kind: ServiceAccount
  name: profiles-service-account
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  labels:
    app.kubernetes.io/name: profiles-application
    kustomize.component: profiles
  name: profiles-cluster-role-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: profiles-controller-service-account
  namespace: kubeflow
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/name: profiles-application
    kustomize.component: profiles
  name: profiles-service
  namespace: kubeflow
spec:
  ports:
  - port: 443
  selector:
    app.kubernetes.io/name: profiles-application
    kustomize.component: profiles
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/name: profiles-application
    kustomize.component: profiles
  name: profiles-deployment
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: profiles-application
      kustomize.component: profiles
  template:
    metadata:
      labels:
        app.kubernetes.io/name: profiles-application
        kustomize.component: profiles
    spec:
      containers:
      - command:
        - /manager
        image: gcr.io/kubeflow-images-public/profile-controller:v20190228-v0.4.0-rc.1-192-g1a802656-dirty-f95773
        imagePullPolicy: Always
        name: manager
      serviceAccountName: profiles-service-account
`)
}

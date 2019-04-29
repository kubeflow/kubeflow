package kustomize_test

import (
  "testing"
)

func writeCertManager(th *KustTestHarness) {
  th.writeF("/manifests/gcp/cert-manager/overlays/gcp/cluster-role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: cert-manager
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cert-manager
subjects:
- kind: ServiceAccount
  name: cert-manager
---
apiVersion: certmanager.k8s.io/v1alpha1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: $(acmeEmail)
    http01: {}
    privateKeySecretRef:
      name: letsencrypt-prod-secret
    server: $(acmeUrl)
`)
  th.writeF("/manifests/gcp/cert-manager/overlays/gcp/cluster-role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: cert-manager
rules:
- apiGroups:
  - certmanager.k8s.io
  resources:
  - certificates
  - issuers
  - clusterissuers
  verbs:
  - '*'
- apiGroups:
  - ""
  resources:
  - secrets
  - events
  - endpoints
  - services
  - pods
  - configmaps
  verbs:
  - '*'
- apiGroups:
  - extensions
  resources:
  - ingresses
  verbs:
  - '*'
`)
  th.writeF("/manifests/gcp/cert-manager/overlays/gcp/crd.yaml", `
---
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: certificates.certmanager.k8s.io
spec:
  group: certmanager.k8s.io
  names:
    kind: Certificate
    plural: certificates
  scope: Namespaced
  version: v1alpha1
---
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: clusterissuers.certmanager.k8s.io
spec:
  group: certmanager.k8s.io
  names:
    kind: ClusterIssuer
    plural: clusterissuers
  scope: Cluster
  version: v1alpha1
---
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: issuers.certmanager.k8s.io
spec:
  group: certmanager.k8s.io
  names:
    kind: Issuer
    plural: issuers
  scope: Namespaced
  version: v1alpha1
`)
  th.writeF("/manifests/gcp/cert-manager/overlays/gcp/deployment.yaml", `
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  labels:
    app: cert-manager
  name: cert-manager
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: cert-manager
    spec:
      containers:
      - args:
        - --cluster-resource-namespace=kubeflow
        - --leader-election-namespace=kubeflow
        image: quay.io/jetstack/cert-manager-controller:v0.4.0
        imagePullPolicy: IfNotPresent
        name: cert-manager
      serviceAccountName: cert-manager
`)
  th.writeF("/manifests/gcp/cert-manager/overlays/gcp/service-account.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: cert-manager
`)
  th.writeF("/manifests/gcp/cert-manager/overlays/gcp/params.yaml", `
varReference:
- path: spec/acme/email
  kind: ClusterIssuer
- path: spec/acme/server
  kind: ClusterIssuer
`)
  th.writeF("/manifests/gcp/cert-manager/overlays/gcp/params.env", `
acmeEmail=
acmeUrl=https://acme-v02.api.letsencrypt.org/directory
`)
  th.writeK("/manifests/gcp/cert-manager/overlays/gcp", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- cluster-role-binding.yaml
- cluster-role.yaml
- crd.yaml
- deployment.yaml
- service-account.yaml
commonLabels:
  kustomize.component: cert-manager
images:
  - name: quay.io/jetstack/cert-manager-controller
    newName: quay.io/jetstack/cert-manager-controller
    newTag: v0.4.0
configMapGenerator:
- name: cert-manager-parameters
  env: params.env
generatorOptions:
  disableNameSuffixHash: true
vars:
- name: acmeEmail
  objref:
    kind: ConfigMap
    name: cert-manager-parameters
    apiVersion: v1
  fieldref:
    fieldpath: data.acmeEmail
- name: acmeUrl
  objref:
    kind: ConfigMap
    name: cert-manager-parameters
    apiVersion: v1
  fieldref:
    fieldpath: data.acmeUrl
configurations:
- params.yaml
`)
}

func TestCertManager(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/gcp/cert-manager/overlays/gcp")
  writeCertManager(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  labels:
    kustomize.component: cert-manager
  name: certificates.certmanager.k8s.io
spec:
  group: certmanager.k8s.io
  names:
    kind: Certificate
    plural: certificates
  scope: Namespaced
  version: v1alpha1
---
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  labels:
    kustomize.component: cert-manager
  name: clusterissuers.certmanager.k8s.io
spec:
  group: certmanager.k8s.io
  names:
    kind: ClusterIssuer
    plural: clusterissuers
  scope: Cluster
  version: v1alpha1
---
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  labels:
    kustomize.component: cert-manager
  name: issuers.certmanager.k8s.io
spec:
  group: certmanager.k8s.io
  names:
    kind: Issuer
    plural: issuers
  scope: Namespaced
  version: v1alpha1
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    kustomize.component: cert-manager
  name: cert-manager
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  labels:
    kustomize.component: cert-manager
  name: cert-manager
rules:
- apiGroups:
  - certmanager.k8s.io
  resources:
  - certificates
  - issuers
  - clusterissuers
  verbs:
  - '*'
- apiGroups:
  - ""
  resources:
  - secrets
  - events
  - endpoints
  - services
  - pods
  - configmaps
  verbs:
  - '*'
- apiGroups:
  - extensions
  resources:
  - ingresses
  verbs:
  - '*'
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    kustomize.component: cert-manager
  name: cert-manager
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cert-manager
subjects:
- kind: ServiceAccount
  name: cert-manager
---
apiVersion: v1
data:
  acmeEmail: ""
  acmeUrl: https://acme-v02.api.letsencrypt.org/directory
kind: ConfigMap
metadata:
  labels:
    kustomize.component: cert-manager
  name: cert-manager-parameters
---
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  labels:
    app: cert-manager
    kustomize.component: cert-manager
  name: cert-manager
spec:
  replicas: 1
  selector:
    matchLabels:
      kustomize.component: cert-manager
  template:
    metadata:
      labels:
        app: cert-manager
        kustomize.component: cert-manager
    spec:
      containers:
      - args:
        - --cluster-resource-namespace=kubeflow
        - --leader-election-namespace=kubeflow
        image: quay.io/jetstack/cert-manager-controller:v0.4.0
        imagePullPolicy: IfNotPresent
        name: cert-manager
      serviceAccountName: cert-manager
---
apiVersion: certmanager.k8s.io/v1alpha1
kind: ClusterIssuer
metadata:
  labels:
    kustomize.component: cert-manager
  name: letsencrypt-prod
spec:
  acme:
    email: ""
    http01: {}
    privateKeySecretRef:
      name: letsencrypt-prod-secret
    server: https://acme-v02.api.letsencrypt.org/directory
`)
}

package kustomize_test

import (
  "testing"
)

func writeCloudEndpoints(th *KustTestHarness) {
  th.writeF("/manifests/gcp/cloud-endpoints/overlays/gcp/cluster-role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: cloud-endpoints-controller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cloud-endpoints-controller
subjects:
- kind: ServiceAccount
  name: cloud-endpoints-controller
`)
  th.writeF("/manifests/gcp/cloud-endpoints/overlays/gcp/cluster-role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: cloud-endpoints-controller
rules:
- apiGroups:
  - ""
  resources:
  - services
  - configmaps
  verbs:
  - get
  - list
- apiGroups:
  - extensions
  resources:
  - ingresses
  verbs:
  - get
  - list
`)
  th.writeF("/manifests/gcp/cloud-endpoints/overlays/gcp/composite-controller.yaml", `
apiVersion: metacontroller.k8s.io/v1alpha1
kind: CompositeController
metadata:
  name: cloud-endpoints-controller
spec:
  childResources: []
  clientConfig:
    service:
      caBundle: '...'
      name: cloud-endpoints-controller
      namespace: $(namespace)
  generateSelector: true
  hooks:
    sync:
      webhook:
        url: http://cloud-endpoints-controller.$(namespace)/sync
  parentResource:
    apiVersion: ctl.isla.solutions/v1
    resource: cloudendpoints
  resyncPeriodSeconds: 2
`)
  th.writeF("/manifests/gcp/cloud-endpoints/overlays/gcp/crd.yaml", `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: cloudendpoints.ctl.isla.solutions
spec:
  group: ctl.isla.solutions
  names:
    kind: CloudEndpoint
    plural: cloudendpoints
    shortNames:
    - cloudep
    - ce
    singular: cloudendpoint
  scope: Namespaced
  version: v1
`)
  th.writeF("/manifests/gcp/cloud-endpoints/overlays/gcp/deployment.yaml", `
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: cloud-endpoints-controller
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: cloud-endpoints-controller
    spec:
      containers:
      - env:
        - name: GOOGLE_APPLICATION_CREDENTIALS
          value: /var/run/secrets/sa/admin-gcp-sa.json
        image: gcr.io/cloud-solutions-group/cloud-endpoints-controller:0.2.1
        imagePullPolicy: Always
        name: cloud-endpoints-controller
        readinessProbe:
          failureThreshold: 2
          httpGet:
            path: /healthz
            port: 80
            scheme: HTTP
          periodSeconds: 5
          successThreshold: 1
          timeoutSeconds: 5
        volumeMounts:
        - mountPath: /var/run/secrets/sa
          name: sa-key
          readOnly: true
      serviceAccountName: cloud-endpoints-controller
      terminationGracePeriodSeconds: 5
      volumes:
      - name: sa-key
        secret:
          secretName: $(secretName)
`)
  th.writeF("/manifests/gcp/cloud-endpoints/overlays/gcp/service-account.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: cloud-endpoints-controller
`)
  th.writeF("/manifests/gcp/cloud-endpoints/overlays/gcp/service.yaml", `
apiVersion: v1
kind: Service
metadata:
  name: cloud-endpoints-controller
spec:
  ports:
  - name: http
    port: 80
  selector:
    app: cloud-endpoints-controller
  type: ClusterIP
`)
  th.writeF("/manifests/gcp/cloud-endpoints/overlays/gcp/params.yaml", `
varReference:
- path: spec/template/spec/volumes/secret/secretName
  kind: Deployment
- path: spec/clientConfig/service/namespace
  kind: CompositeController
- path: spec/hooks/sync/webhook/url
  kind: CompositeController
`)
  th.writeF("/manifests/gcp/cloud-endpoints/overlays/gcp/params.env", `
namespace=kubeflow
secretName=foo
`)
  th.writeK("/manifests/gcp/cloud-endpoints/overlays/gcp", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- cluster-role-binding.yaml
- cluster-role.yaml
- composite-controller.yaml
- crd.yaml
- deployment.yaml
- service-account.yaml
- service.yaml
commonLabels:
  app: cloud-endpoints-controller
  kustomize.component: cloud-endpoints
images:
  - name: gcr.io/cloud-solutions-group/cloud-endpoints-controller
    newName: gcr.io/cloud-solutions-group/cloud-endpoints-controller
    newTag: 0.2.1
configMapGenerator:
- name: cloud-endpoints-parameters
  env: params.env
generatorOptions:
  disableNameSuffixHash: true
vars:
- name: secretName
  objref:
    kind: ConfigMap
    name: cloud-endpoints-parameters
    apiVersion: v1
  fieldref:
    fieldpath: data.secretName
- name: namespace
  objref:
    kind: ConfigMap
    name: cloud-endpoints-parameters
    apiVersion: v1
  fieldref:
    fieldpath: data.namespace
configurations:
- params.yaml
`)
}

func TestCloudEndpoints(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/gcp/cloud-endpoints/overlays/gcp")
  writeCloudEndpoints(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  labels:
    app: cloud-endpoints-controller
    kustomize.component: cloud-endpoints
  name: cloudendpoints.ctl.isla.solutions
spec:
  group: ctl.isla.solutions
  names:
    kind: CloudEndpoint
    plural: cloudendpoints
    shortNames:
    - cloudep
    - ce
    singular: cloudendpoint
  scope: Namespaced
  version: v1
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app: cloud-endpoints-controller
    kustomize.component: cloud-endpoints
  name: cloud-endpoints-controller
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  labels:
    app: cloud-endpoints-controller
    kustomize.component: cloud-endpoints
  name: cloud-endpoints-controller
rules:
- apiGroups:
  - ""
  resources:
  - services
  - configmaps
  verbs:
  - get
  - list
- apiGroups:
  - extensions
  resources:
  - ingresses
  verbs:
  - get
  - list
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    app: cloud-endpoints-controller
    kustomize.component: cloud-endpoints
  name: cloud-endpoints-controller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cloud-endpoints-controller
subjects:
- kind: ServiceAccount
  name: cloud-endpoints-controller
---
apiVersion: v1
data:
  namespace: kubeflow
  secretName: foo
kind: ConfigMap
metadata:
  labels:
    app: cloud-endpoints-controller
    kustomize.component: cloud-endpoints
  name: cloud-endpoints-parameters
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: cloud-endpoints-controller
    kustomize.component: cloud-endpoints
  name: cloud-endpoints-controller
spec:
  ports:
  - name: http
    port: 80
  selector:
    app: cloud-endpoints-controller
    kustomize.component: cloud-endpoints
  type: ClusterIP
---
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  labels:
    app: cloud-endpoints-controller
    kustomize.component: cloud-endpoints
  name: cloud-endpoints-controller
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cloud-endpoints-controller
      kustomize.component: cloud-endpoints
  template:
    metadata:
      labels:
        app: cloud-endpoints-controller
        kustomize.component: cloud-endpoints
    spec:
      containers:
      - env:
        - name: GOOGLE_APPLICATION_CREDENTIALS
          value: /var/run/secrets/sa/admin-gcp-sa.json
        image: gcr.io/cloud-solutions-group/cloud-endpoints-controller:0.2.1
        imagePullPolicy: Always
        name: cloud-endpoints-controller
        readinessProbe:
          failureThreshold: 2
          httpGet:
            path: /healthz
            port: 80
            scheme: HTTP
          periodSeconds: 5
          successThreshold: 1
          timeoutSeconds: 5
        volumeMounts:
        - mountPath: /var/run/secrets/sa
          name: sa-key
          readOnly: true
      serviceAccountName: cloud-endpoints-controller
      terminationGracePeriodSeconds: 5
      volumes:
      - name: sa-key
        secret:
          secretName: foo
---
apiVersion: metacontroller.k8s.io/v1alpha1
kind: CompositeController
metadata:
  labels:
    app: cloud-endpoints-controller
    kustomize.component: cloud-endpoints
  name: cloud-endpoints-controller
spec:
  childResources: []
  clientConfig:
    service:
      caBundle: '...'
      name: cloud-endpoints-controller
      namespace: kubeflow
  generateSelector: true
  hooks:
    sync:
      webhook:
        url: http://cloud-endpoints-controller.kubeflow/sync
  parentResource:
    apiVersion: ctl.isla.solutions/v1
    resource: cloudendpoints
  resyncPeriodSeconds: 2
`)
}

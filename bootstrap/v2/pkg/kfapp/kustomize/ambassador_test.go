package kustomize_test

import (
  "testing"
)

func writeAmbassador(th *KustTestHarness) {
  th.writeF("/manifests/common/ambassador/base/cluster-role-binding.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: ambassador
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: ambassador
subjects:
- kind: ServiceAccount
  name: ambassador
`)
  th.writeF("/manifests/common/ambassador/base/cluster-role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: ambassador
rules:
- apiGroups:
  - ""
  resources:
  - services
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - configmaps
  verbs:
  - create
  - update
  - patch
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - get
  - list
  - watch`)
  th.writeF("/manifests/common/ambassador/base/deployment.yaml", `
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: ambassador
spec:
  replicas: 3
  template:
    metadata:
      labels:
        service: ambassador
    spec:
      containers:
      - env:
        - name: AMBASSADOR_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        image: quay.io/datawire/ambassador:0.37.0
        livenessProbe:
          httpGet:
            path: /ambassador/v0/check_alive
            port: 8877
          initialDelaySeconds: 30
          periodSeconds: 30
        name: ambassador
        readinessProbe:
          httpGet:
            path: /ambassador/v0/check_ready
            port: 8877
          initialDelaySeconds: 30
          periodSeconds: 30
        resources:
          limits:
            cpu: 1
            memory: 400Mi
          requests:
            cpu: 200m
            memory: 100Mi
      restartPolicy: Always
      serviceAccountName: ambassador
`)
  th.writeF("/manifests/common/ambassador/base/service-account.yaml", `
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ambassador
`)
  th.writeF("/manifests/common/ambassador/base/service.yaml", `
---
apiVersion: v1
kind: Service
metadata:
  labels:
    service: ambassador-admin
  name: ambassador-admin
spec:
  ports:
  - name: ambassador-admin
    port: 8877
    targetPort: 8877
  selector:
    service: ambassador
  type: ClusterIP
---
apiVersion: v1
kind: Service
metadata:
  labels:
    service: ambassador
  name: ambassador
spec:
  ports:
  - name: ambassador
    port: 80
    targetPort: 80
  selector:
    service: ambassador
  type: $(ambassadorServiceType)
`)
  th.writeF("/manifests/common/ambassador/base/params.yaml", `
varReference:
- path: spec/type
  kind: Service
`)
  th.writeF("/manifests/common/ambassador/base/params.env", `
ambassadorServiceType=ClusterIP
`)
  th.writeK("/manifests/common/ambassador/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- cluster-role-binding.yaml
- cluster-role.yaml
- deployment.yaml
- service-account.yaml
- service.yaml
commonLabels:
  kustomize.component: ambassador
images:
  - name: quay.io/datawire/ambassador
    newName: quay.io/datawire/ambassador
    newTag: 0.37.0
configMapGenerator:
- name: ambassador-parameters
  env: params.env
generatorOptions:
  disableNameSuffixHash: true
patchesJson6902:
- target:
    group: apps
    version: v1beta1
    kind: Deployment
    name: ambassador
  path: deployment-ambassador.yaml
vars:
- name: ambassadorServiceType
  objref:
    kind: ConfigMap
    name: ambassador-parameters
    apiVersion: v1
  fieldref:
    fieldpath: data.ambassadorServiceType
configurations:
- params.yaml
`)
}

func TestAmbassador(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/common/ambassador/base")
  writeAmbassador(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    kustomize.component: ambassador
  name: ambassador
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  labels:
    kustomize.component: ambassador
  name: ambassador
rules:
- apiGroups:
  - ""
  resources:
  - services
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - configmaps
  verbs:
  - create
  - update
  - patch
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - secrets
  verbs:
  - get
  - list
  - watch
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  labels:
    kustomize.component: ambassador
  name: ambassador
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: ambassador
subjects:
- kind: ServiceAccount
  name: ambassador
  namespace: kubeflow
---
apiVersion: v1
data:
  ambassadorServiceType: ClusterIP
kind: ConfigMap
metadata:
  labels:
    kustomize.component: ambassador
  name: ambassador-parameters
  namespace: kubeflow
---
apiVersion: v1
kind: Service
metadata:
  labels:
    kustomize.component: ambassador
    service: ambassador-admin
  name: ambassador-admin
  namespace: kubeflow
spec:
  ports:
  - name: ambassador-admin
    port: 8877
    targetPort: 8877
  selector:
    kustomize.component: ambassador
    service: ambassador
  type: ClusterIP
---
apiVersion: v1
kind: Service
metadata:
  labels:
    kustomize.component: ambassador
    service: ambassador
  name: ambassador
  namespace: kubeflow
spec:
  ports:
  - name: ambassador
    port: 80
    targetPort: 80
  selector:
    kustomize.component: ambassador
    service: ambassador
  type: ClusterIP
---
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  labels:
    kustomize.component: ambassador
  name: ambassador
  namespace: kubeflow
spec:
  replicas: 1
  selector:
    matchLabels:
      kustomize.component: ambassador
  template:
    metadata:
      labels:
        kustomize.component: ambassador
        service: ambassador
    spec:
      containers:
      - env:
        - name: AMBASSADOR_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        image: quay.io/datawire/ambassador:0.37.0
        livenessProbe:
          httpGet:
            path: /ambassador/v0/check_alive
            port: 8877
          initialDelaySeconds: 30
          periodSeconds: 30
        name: ambassador
        readinessProbe:
          httpGet:
            path: /ambassador/v0/check_ready
            port: 8877
          initialDelaySeconds: 30
          periodSeconds: 30
        resources:
          limits:
            cpu: 1
            memory: 400Mi
          requests:
            cpu: 200m
            memory: 100Mi
      restartPolicy: Always
      serviceAccountName: ambassador
`)
}

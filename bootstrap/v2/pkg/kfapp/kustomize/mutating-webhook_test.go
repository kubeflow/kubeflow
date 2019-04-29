package kustomize_test

import (
  "testing"
)

func writeMutatingWebhook(th *KustTestHarness) {
  th.writeF("/manifests/mutating-webhook/base/deployment.yaml", `
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: deployment
spec:
  replicas: 1
  template:
    metadata:
      name: pod
    spec:
      containers:
        - name: webhook
          image: gcr.io/constant-cubist-173123/mutating-webhook:v0-46-ga6e52aef
          command: ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]
          imagePullPolicy: IfNotPresent
          volumeMounts:
            - name: webhook-certs
              mountPath: /etc/webhook/certs
              readOnly: true
      volumes:
        - name: webhook-certs
          secret:
            secretName: add-label
`)
  th.writeF("/manifests/mutating-webhook/base/service-account.yaml", `
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: webhook
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: webhook-bootstrap
`)
  th.writeF("/manifests/mutating-webhook/base/service.yaml", `
apiVersion: v1
kind: Service
metadata:
  name: service
spec:
  ports:
  - name: webhook
    port: 443
`)
  th.writeK("/manifests/mutating-webhook/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- deployment.yaml
- service-account.yaml
- service.yaml
namePrefix:
  add-label-
commonLabels:
  kustomize.component: add-label
images:
  - name: gcr.io/constant-cubist-173123/mutating-webhook
    newName: gcr.io/constant-cubist-173123/mutating-webhook
    newTag: v0-46-ga6e52aef
`)
}

func TestMutatingWebhook(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/mutating-webhook/base")
  writeMutatingWebhook(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    kustomize.component: add-label
  name: add-label-webhook-bootstrap
  namespace: kubeflow
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    kustomize.component: add-label
  name: add-label-webhook
  namespace: kubeflow
---
apiVersion: v1
kind: Service
metadata:
  labels:
    kustomize.component: add-label
  name: add-label-service
  namespace: kubeflow
spec:
  ports:
  - name: webhook
    port: 443
  selector:
    kustomize.component: add-label
---
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  labels:
    kustomize.component: add-label
  name: add-label-deployment
  namespace: kubeflow
spec:
  replicas: 1
  selector:
    matchLabels:
      kustomize.component: add-label
  template:
    metadata:
      labels:
        kustomize.component: add-label
      name: pod
    spec:
      containers:
      - command:
        - /bin/bash
        - -c
        - 'trap : TERM INT; sleep infinity & wait'
        image: gcr.io/constant-cubist-173123/mutating-webhook:v0-46-ga6e52aef
        imagePullPolicy: IfNotPresent
        name: webhook
        volumeMounts:
        - mountPath: /etc/webhook/certs
          name: webhook-certs
          readOnly: true
      volumes:
      - name: webhook-certs
        secret:
          secretName: add-label
`)
}

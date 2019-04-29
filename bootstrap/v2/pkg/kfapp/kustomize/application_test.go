package kustomize_test

import (
  "testing"
)

func writeApplication(th *KustTestHarness) {
  th.writeF("/manifests/application/base/application.yaml", `
apiVersion: app.k8s.io/v1beta1
kind: Application
metadata:
  name: kubeflow
spec:
  componentKinds: []
  assemblyPhase: "Pending"
  descriptor:
    type: "kubeflow"
`)
  th.writeK("/manifests/application/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- application.yaml
commonLabels:
  kustomize.component: application
`)
}

func TestApplication(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/application/base")
  writeApplication(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: app.k8s.io/v1beta1
kind: Application
metadata:
  labels:
    kustomize.component: application
  name: kubeflow
  namespace: kubeflow
spec:
  assemblyPhase: Pending
  componentKinds: []
  descriptor:
    type: kubeflow
`)
}

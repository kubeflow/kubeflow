package kustomize_test

import (
  "testing"
)

func writeTfJobOperator(th *KustTestHarness) {
  th.writeF("/manifests/tf-training/tf-job-operator/base/config-map.yaml", `
apiVersion: v1
data:
  controller_config_file.yaml: |-
    {
        "grpcServerFilePath": "/opt/mlkube/grpc_tensorflow_server/grpc_tensorflow_server.py"
    }
kind: ConfigMap
metadata:
  name: config-map
`)
  th.writeF("/manifests/tf-training/tf-job-operator/base/crd.yaml", `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: tfjobs.kubeflow.org
spec:
  additionalPrinterColumns:
  - JSONPath: .status.conditions[-1:].type
    name: State
    type: string
  - JSONPath: .metadata.creationTimestamp
    name: Age
    type: date
  group: kubeflow.org
  names:
    kind: TFJob
    plural: tfjobs
    singular: tfjob
  scope: Namespaced
  subresources:
    status: {}
  validation:
    openAPIV3Schema:
      properties:
        spec:
          properties:
            tfReplicaSpecs:
              properties:
                Chief:
                  properties:
                    replicas:
                      maximum: 1
                      minimum: 1
                      type: integer
                PS:
                  properties:
                    replicas:
                      minimum: 1
                      type: integer
                Worker:
                  properties:
                    replicas:
                      minimum: 1
                      type: integer
  version: v1beta1
  versions:
  - name: v1beta1
    served: true
    storage: true
  - name: v1beta2
    served: true
    storage: false
`)
  th.writeF("/manifests/tf-training/tf-job-operator/base/deployment.yaml", `
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: dashboard-deployment
spec:
  template:
    spec:
      containers:
      - name: dashboard-container
        command:
        - /opt/tensorflow_k8s/dashboard/backend
        env: []
        image: gcr.io/kubeflow-images-public/tf_operator:v0.5.0
        ports:
        - containerPort: 8080
      serviceAccountName: dashboard-service
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: deployment
spec:
  replicas: 1
  template:
    spec:
      containers:
      - name: container
        command:
        - /opt/kubeflow/tf-operator.v1beta2
        args:
        - --alsologtostderr
        - -v=1
        env: []
        image: gcr.io/kubeflow-images-public/tf_operator:v0.5.0
        volumeMounts:
        - mountPath: /etc/config
          name: config-volume
      serviceAccountName: service-account
      volumes:
      - configMap:
          name: config-map
        name: config-volume
`)
  th.writeK("/manifests/tf-training/tf-job-operator/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- config-map.yaml
- crd.yaml
- deployment.yaml
- service-account.yaml
- service.yaml
namePrefix: tf-job-operator-
commonLabels:
  app.kubernetes.io/name: tf-job-operator-application
  kustomize.component: tf-job-operator
images:
  - name: gcr.io/kubeflow-images-public/tf_operator
    newName: gcr.io/kubeflow-images-public/tf_operator
    newTag: v0.5.0
configMapGenerator:
- name: parameters
  env: params.env
generatorOptions:
  disableNameSuffixHash: true
vars:
- name: namespace
  objref:
    kind: ConfigMap
    name: parameters
    apiVersion: v1
  fieldref:
    fieldpath: data.namespace
configurations:
- params.yaml
`)
  th.writeF("/manifests/tf-training/tf-job-operator/base/params.env", `
namespace=kubeflow
`)
  th.writeF("/manifests/tf-training/tf-job-operator/base/params.yaml", `
varReference:
- path: metadata/annotations/getambassador.io\/config
  kind: Service
`)
  th.writeF("/manifests/tf-training/tf-job-operator/base/service-account.yaml", `
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: dashboard-service-account
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: service-account
`)
  th.writeF("/manifests/tf-training/tf-job-operator/base/service.yaml", `
apiVersion: v1
kind: Service
metadata:
  name: dashboard-service
  annotations:
    getambassador.io/config: |-
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: tfjobs-ui-mapping
      prefix: /tfjobs/
      rewrite: /tfjobs/
      service: tf-job-operator-dashboard.$(namespace)
spec:
  ports:
  - port: 80
    targetPort: 8080
  type: ClusterIP
`)
}

func TestTfJobOperator(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/tf-training/tf-job-operator/base")
  writeTfJobOperator(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  labels:
    app.kubernetes.io/name: tf-job-operator-application
    kustomize.component: tf-job-operator
  name: tfjobs.kubeflow.org
spec:
  additionalPrinterColumns:
  - JSONPath: .status.conditions[-1:].type
    name: State
    type: string
  - JSONPath: .metadata.creationTimestamp
    name: Age
    type: date
  group: kubeflow.org
  names:
    kind: TFJob
    plural: tfjobs
    singular: tfjob
  scope: Namespaced
  subresources:
    status: {}
  validation:
    openAPIV3Schema:
      properties:
        spec:
          properties:
            tfReplicaSpecs:
              properties:
                Chief:
                  properties:
                    replicas:
                      maximum: 1
                      minimum: 1
                      type: integer
                PS:
                  properties:
                    replicas:
                      minimum: 1
                      type: integer
                Worker:
                  properties:
                    replicas:
                      minimum: 1
                      type: integer
  version: v1beta1
  versions:
  - name: v1beta1
    served: true
    storage: true
  - name: v1beta2
    served: true
    storage: false
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app.kubernetes.io/name: tf-job-operator-application
    kustomize.component: tf-job-operator
  name: tf-job-operator-dashboard-service-account
  namespace: kubeflow
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app.kubernetes.io/name: tf-job-operator-application
    kustomize.component: tf-job-operator
  name: tf-job-operator-service-account
  namespace: kubeflow
---
apiVersion: v1
data:
  controller_config_file.yaml: |-
    {
        "grpcServerFilePath": "/opt/mlkube/grpc_tensorflow_server/grpc_tensorflow_server.py"
    }
kind: ConfigMap
metadata:
  labels:
    app.kubernetes.io/name: tf-job-operator-application
    kustomize.component: tf-job-operator
  name: tf-job-operator-config-map
  namespace: kubeflow
---
apiVersion: v1
data:
  namespace: kubeflow
kind: ConfigMap
metadata:
  labels:
    app.kubernetes.io/name: tf-job-operator-application
    kustomize.component: tf-job-operator
  name: tf-job-operator-parameters
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
      name: tfjobs-ui-mapping
      prefix: /tfjobs/
      rewrite: /tfjobs/
      service: tf-job-operator-dashboard.kubeflow
  labels:
    app.kubernetes.io/name: tf-job-operator-application
    kustomize.component: tf-job-operator
  name: tf-job-operator-dashboard-service
  namespace: kubeflow
spec:
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app.kubernetes.io/name: tf-job-operator-application
    kustomize.component: tf-job-operator
  type: ClusterIP
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/name: tf-job-operator-application
    kustomize.component: tf-job-operator
  name: tf-job-operator-dashboard-deployment
  namespace: kubeflow
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: tf-job-operator-application
      kustomize.component: tf-job-operator
  template:
    metadata:
      labels:
        app.kubernetes.io/name: tf-job-operator-application
        kustomize.component: tf-job-operator
    spec:
      containers:
      - command:
        - /opt/tensorflow_k8s/dashboard/backend
        env: []
        image: gcr.io/kubeflow-images-public/tf_operator:v0.5.0
        name: dashboard-container
        ports:
        - containerPort: 8080
      serviceAccountName: dashboard-service
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/name: tf-job-operator-application
    kustomize.component: tf-job-operator
  name: tf-job-operator-deployment
  namespace: kubeflow
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: tf-job-operator-application
      kustomize.component: tf-job-operator
  template:
    metadata:
      labels:
        app.kubernetes.io/name: tf-job-operator-application
        kustomize.component: tf-job-operator
    spec:
      containers:
      - args:
        - --alsologtostderr
        - -v=1
        command:
        - /opt/kubeflow/tf-operator.v1beta2
        env: []
        image: gcr.io/kubeflow-images-public/tf_operator:v0.5.0
        name: container
        volumeMounts:
        - mountPath: /etc/config
          name: config-volume
      serviceAccountName: tf-job-operator-service-account
      volumes:
      - configMap:
          name: tf-job-operator-config-map
        name: config-volume
`)
}

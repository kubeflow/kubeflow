package kustomize_test

import (
  "testing"
)

func writeTensorboard(th *KustTestHarness) {
  th.writeF("/manifests/tensorboard/base/deployment.yaml", `
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  labels:
    app: tensorboard
  name: tensorboard
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: tensorboard
    spec:
      containers:
      - args:
        - --logdir=logs
        - --port=6006
        command:
        - /usr/local/bin/tensorboard
        image: tensorflow/tensorflow:1.8.0
        imagePullPolicy: IfNotPresent
        name: tensorboard
        ports:
        - containerPort: 6006
        resources:
          limits:
            cpu: "4"
            memory: 4Gi
          requests:
            cpu: "1"
            memory: 1Gi
`)
  th.writeF("/manifests/tensorboard/base/service.yaml", `
apiVersion: v1
kind: Service
metadata:
  annotations:
    getambassador.io/config: |-
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: tb-mapping-tensorboard-get
      prefix: /tensorboard/ tensorboard/
      rewrite: /
      method: GET
      service: tensorboard.$(namespace):9000
  labels:
    app: tensorboard
  name: tensorboard
spec:
  ports:
  - name: tb
    port: 9000
    targetPort: 6006
  selector:
    app: tensorboard
  type: ClusterIP
`)
  th.writeF("/manifests/tensorboard/base/params.yaml", `
varReference:
- path: metadata/annotations/getambassador.io\/config
  kind: Service
`)
  th.writeF("/manifests/tensorboard/base/params.env", `
# GCP
# @optionalParam logDir string logs Name of the log directory holding the TF events file
# @optionalParam targetPort number 6006 Name of the targetPort
# @optionalParam servicePort number 9000 Name of the servicePort
# @optionalParam serviceType string ClusterIP The service type for Jupyterhub.
# @optionalParam defaultTbImage string tensorflow/tensorflow:1.8.0 default tensorboard image to use
# @optionalParam gcpCredentialSecretName string null Name of the k8s secrets containing gcp credentials
# AWS
# @optionalParam logDir string logs Name of the log directory holding the TF events file
# @optionalParam targetPort number 6006 Name of the targetPort
# @optionalParam servicePort number 9000 Name of the servicePort
# @optionalParam serviceType string ClusterIP The service type for tensorboard service
# @optionalParam defaultTbImage string tensorflow/tensorflow:1.8.0 default tensorboard image to use
# @optionalParam s3Enabled string false Whether or not to use S3
# @optionalParam s3SecretName string null Name of the k8s secrets containing S3 credentials
# @optionalParam s3SecretAccesskeyidKeyName string null Name of the key in the k8s secret containing AWS_ACCESS_KEY_ID
# @optionalParam s3SecretSecretaccesskeyKeyName string null Name of the key in the k8s secret containing AWS_SECRET_ACCESS_KEY
# @optionalParam s3AwsRegion string us-west-1 S3 region
# @optionalParam s3UseHttps string true Whether or not to use https
# @optionalParam s3VerifySsl string true Whether or not to verify https certificates for S3 connections
# @optionalParam s3Endpoint string s3.us-west-1.amazonaws.com URL for your s3-compatible endpoint
# @optionalParam efsEnabled string false Whether or not to use EFS
# @optionalParam efsPvcName string null Name of the Persistent Volume Claim used for EFS
# @optionalParam efsVolumeName string null Name of the Volume to mount to the pod
# @optionalParam efsMountPath string null Where to mount the EFS Volume
`)
  th.writeK("/manifests/tensorboard/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- deployment.yaml
- params.env
- service.yaml
commonLabels:
  kustomize.component: tensorboard
vars:
- name: namespace
  objref:
    kind: Service
    name: tensorboard
    apiVersion: v1
  fieldref:
    fieldpath: metadata.namespace
configurations:
- params.yaml
`)
}

func TestTensorboard(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/tensorboard/base")
  writeTensorboard(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: v1
kind: Service
metadata:
  annotations:
    getambassador.io/config: |-
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: tb-mapping-tensorboard-get
      prefix: /tensorboard/ tensorboard/
      rewrite: /
      method: GET
      service: tensorboard.kubeflow:9000
  labels:
    app: tensorboard
    kustomize.component: tensorboard
  name: tensorboard
  namespace: kubeflow
spec:
  ports:
  - name: tb
    port: 9000
    targetPort: 6006
  selector:
    app: tensorboard
    kustomize.component: tensorboard
  type: ClusterIP
---
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  labels:
    app: tensorboard
    kustomize.component: tensorboard
  name: tensorboard
  namespace: kubeflow
spec:
  replicas: 1
  selector:
    matchLabels:
      kustomize.component: tensorboard
  template:
    metadata:
      labels:
        app: tensorboard
        kustomize.component: tensorboard
    spec:
      containers:
      - args:
        - --logdir=logs
        - --port=6006
        command:
        - /usr/local/bin/tensorboard
        image: tensorflow/tensorflow:1.8.0
        imagePullPolicy: IfNotPresent
        name: tensorboard
        ports:
        - containerPort: 6006
        resources:
          limits:
            cpu: "4"
            memory: 4Gi
          requests:
            cpu: "1"
            memory: 1Gi
`)
}

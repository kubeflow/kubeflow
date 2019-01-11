# Katib

> Hyperparameter Tuning on Kubernetes

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Quickstart](#quickstart)
  - [TF-job operator](#tf-job-operator)
  - [Pytorch-operator](#pytorch-operator)
  - [Katib](#katib)
  - [Cleanups](#cleanups)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quickstart

For running Katib you have to install tf-job operator and pytorch operator package.

In your Ksonnet app root, run the following

```
export KF_ENV=default
ks registry add kubeflow github.com/kubeflow/kubeflow/tree/master/kubeflow
```

### TF-job operator

For installing tf-job operator, run the following

```
ks pkg install kubeflow/tf-training
ks pkg install kubeflow/core
ks generate tf-job-operator tf-job-operator
ks apply ${KF_ENV} -c tf-job-operator
```

### Pytorch-operator
For installing pytorch operator, run the following

```
ks pkg install kubeflow/pytorch-job
ks generate pytorch-operator pytorch-operator
ks apply ${KF_ENV} -c pytorch-operator
```

### Katib

Finally, you can install Katib

```
ks pkg install kubeflow/katib
ks generate katib katib
ks apply ${KF_ENV} -c katib
```

### Cleanups

Delete installed components

```
ks delete ${KF_ENV} -c katib
ks delete ${KF_ENV} -c pytorch-operator
ks delete ${KF_ENV} -c tf-job-operator
```

## Deploying Katib not in GKE

If you want to use Katib not in GKE and you don't have StorageClass for dynamic volume provisioning at your cluster, you have to create persistent volume to bound your persistent volume claim.

This is yaml file for persistent volume:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: katib-mysql
  labels:
    type: local
    app: katib
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/katib
```

Create this pv after deploying Katib package

```
kubectl create -f pv.yaml
```

Delete this pv after cleanup Katib components

```
kubectl delete -f pv.yaml
```

Please refer to the official docs for
[Hyperparameter Tuning at kubeflow.org](https://www.kubeflow.org/docs/guides/components/hyperparameter/).

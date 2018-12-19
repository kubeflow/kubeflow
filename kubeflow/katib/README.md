# Katib Quickstart

For running Katib you have to install tf-job-operator and pytorch-operator package.

In your Ksonnet app root, run the following

```
export VERSION=master
export KF_ENV=default
ks registry add kubeflow github.com/kubeflow/kubeflow/tree/master/kubeflow
```
## Pytorch-operator
For installing pytorch operator, run the following

```
ks pkg install kubeflow/pytorch-job${VERSION}
ks generate pytorch-operator pytorch-operator
ks apply ${KF_ENV} -c pytorch-operator
```

## TF-job operator

For installing tf-job operator, run the following

```
ks pkg install kubeflow/tf-training${VERSION}
ks generate tf-job-operator tf-job-operator
ks apply ${KF_ENV} -c tf-job-operator
```

## Katib

Finally, you can install katib

```
ks pkg install kubeflow/katib${VERSION}
ks generate katib katib
ks apply ${KF_ENV} -c katib
```

Please refer to the official docs for
[Hyperparameter Tuning at kubeflow.org](https://www.kubeflow.org/docs/guides/components/hyperparameter/).

# Pachyderm

> Pachyderm lets you deploy and manage multi-stage, language-agnostic data pipelines while maintaining complete reproducibility and provenance.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Quickstart](#quickstart)
  - [Using GCP](#using-gcp)
  - [Local mode](#local-mode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quickstart

To deploy pachyderm

```shell
ks pkg install kubeflow/pachyderm@${VERSION}
ks generate pachyderm pachyderm
ks apply ${ENV} -c pachyderm
```

Once you've deployed pachyderm, follow pachyderm's
[user_guide](http://pachyderm.readthedocs.io/en/latest/getting_started/getting_started.html).
You will need to install Pachyderm's CLI (pachctl) and run `pachctl -n ${NAMESPACE} port-forward &`
in order to interact with Pachyderm.

In order to use Pachyderm you will need to choose which backend you want to use by
doing

```
ks param set ${COMPONENT_NAME} backend ${BACKEND}
ks apply ${ENVIRONMENT} -c ${COMPONENT_NAME}
```

Pachyderm supports a variety of [deployments](http://pachyderm.readthedocs.io/en/latest/deployment/deploy_intro.html)
but this ksonnet package currently only supports

1. local
1. GCP

### Using GCP

You can use Google Cloud Storage to store the actual data versioned
by Pachyderm. This is recommended because

1. data is stored in GCS
1. metadata (etcd data) is stored in persistent disks

	* Please refer to [Pachyderm's backup/migration](http://pachyderm.readthedocs.io/en/latest/deployment/migrations.html#backups)
	  instructions for info on backing up this data.

This ensures the data is safe in the case of pod or node restarts.

Create a bucket

```
gsutil mp -p ${PROJECT} gs://${BUCKET}
```

Create a GCP service account that has GCS read/write permissions and download
the service account file.

Create a K8s secret that stores the bucket and Google service account.

```
kubectl create -n {NAMESPACE} secret generic \
	pachyderm-storage-secret \
	--from-file=google-cred=${SERVICE_ACCOUNT_FILE} \
	--from-liter=google-bucket=${BUCKET}
```

Enable GCP support

```
ks param set ${COMPONENT_NAME} backend gcp
ks apply ${ENVIRONMENT} -c ${COMPONENT_NAME}
```

### Local mode

Local mode should **only** be used

	* for development and testing since data is not resilient to various failures
	* single node clusters (e.g. minikube)

1. Data is stored in a directory on one of the nodes
1. metadata (etcd data) is stored in a directory on one of the nodes

This means if something happens to the data node could be lost.

Furthermore, in the event a pod is restarted it could be reassigned to a different node which
doesn't have the data.


```
ks param set ${COMPONENT_NAME} backend local
ks apply ${ENVIRONMENT} -c ${COMPONENT_NAME}
```

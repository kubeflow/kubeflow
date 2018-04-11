# Pachyderm

To deploy pachyderm

```shell
ks pkg install kubeflow/pachyderm@${VERSION}
ks generate pachyderm pachyderm
ks apply ${ENV} -c pachyderm
```

Once you've deployed pachyderm, follow pachyderm's 
[user_guide](http://pachyderm.readthedocs.io/en/latest/getting_started/getting_started.html).
You will need to install Pachyderm's CLI (pachctyl) and run `pachctl -n ${NAMESPACE} port-forward &`
in order to interact with Pachyderm.

**Warning** By default this local model of Pachyderm which uses ephmeral volumes
to store data. It is not suitable for production use as data will be lost if the pods get  restarted.

## Using GCP

To use a Google Cloud Storage Backend as the backing datastore

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


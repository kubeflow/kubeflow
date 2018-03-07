# Serving with IAP enabled

## Setup

Follow this [doc](https://github.com/kubeflow/kubeflow/blob/master/docs/gke/iap.md) to
setup the cluster with IAP enabled. Save the client id as `IAP_CLIENT_ID`

Deploy a [TF serving component](https://github.com/kubeflow/kubeflow/tree/master/components/k8s-model-server).

Create a service account, and give it IAP access.
```
gcloud projects add-iam-policy-binding $PROJECT \
  --role roles/iap.httpsResourceAccessor \
  --member serviceAccount:$SERVICE_ACCOUNT
```

Export the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to point to the key file of the
service account.

## Send request
Send a get request:
```
python iap_request.py https://YOUR_HOST/models/MODEL_NAME/ IAP_CLIENT_ID
```

Send a post request with input file:
```
python iap_request.py https://YOUR_HOST/models/MODEL_NAME/ IAP_CLIENT_ID --input=YOUR_INPUT_FILE
```

If you don't have a trained model, you can use a mnist model at
`gs://kubeflow-ci-test-models/mnist`, with input [file](https://github.com/kubeflow/kubeflow/blob/master/components/k8s-model-server/test-data/mnist_input.json)
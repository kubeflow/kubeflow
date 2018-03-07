# Serving with IAP enabled

## Setup

Follow this [doc](https://github.com/kubeflow/kubeflow/blob/master/docs/gke/iap.md) to
setup the cluster with IAP enabled. Save the client id as `IAP_CLIENT_ID`

Deploy a [TF serving component](https://github.com/kubeflow/kubeflow/tree/master/components/k8s-model-server).

## Send request
```
python iap_request.py https://YOUR_HOST/models/MODEL_NAME/ IAP_CLIENT_ID
```

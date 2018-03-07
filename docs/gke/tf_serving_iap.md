# Serving with IAP enabled

## Setup

Follow this [doc](https://github.com/kubeflow/kubeflow/blob/master/docs/gke/iap.md) to
setup the cluster with IAP enabled. Save the client id as `IAP_CLIENT_ID`

Deploy a [TF serving component](https://github.com/kubeflow/kubeflow/tree/master/components/k8s-model-server).

Create a service account:
```
gcloud iam service-accounts create $SERVICE_ACCOUNT
```
Grant the service account access to IAP enabled resources:
```
gcloud projects add-iam-policy-binding $PROJECT \
  --role roles/iap.httpsResourceAccessor \
  --member serviceAccount:$SERVICE_ACCOUNT
```

Download the service account key:
```
gcloud iam service-accounts keys create ${KEY_FILE} \
      --iam-account ${SERVICE_ACCOUNT}@${PROJECT}.iam.gserviceaccount.com
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


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Serving with IAP enabled](#serving-with-iap-enabled)
  - [Setup](#setup)
  - [Send request](#send-request)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Serving with IAP enabled

This document shows how to programmatically authenticate a service account to access IAP.
To authenticate an user account, we have to follow some manual steps
[here](https://cloud.google.com/iap/docs/authentication-howto#authenticating_a_user_account)

## Setup

Follow this [doc](https://github.com/kubeflow/kubeflow/blob/master/docs/gke/iap.md) to
setup the cluster with IAP enabled. Save the client id as `IAP_CLIENT_ID`

Deploy a [TF serving component](https://github.com/kubeflow/kubeflow/tree/master/components/k8s-model-server).

Create a service account:
```
gcloud iam service-accounts create --project=$PROJECT $SERVICE_ACCOUNT
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


# Serving with IAP enabled

## Setup

Follow this [doc](https://github.com/kubeflow/kubeflow/blob/master/docs/gke/iap.md) to
setup the cluster with IAP enabled. Save the client id as `IAP_CLIENT_ID`

Deploy a [TF serving component](https://github.com/kubeflow/kubeflow/tree/master/components/k8s-model-server)
with a mnist model.
```commandline
ks init my-model-server
cd my-model-server
ks registry add kubeflow github.com/kubeflow/kubeflow/tree/master/kubeflow
ks pkg install kubeflow/tf-serving
ks env add cloud
MODEL_COMPONENT=serveMnist
MODEL_NAME=mnist
MODEL_PATH=gs://kubeflow-ci-test-models/mnist
MODEL_SERVER_IMAGE=gcr.io/$(gcloud config get-value project)/model-server:1.0
HTTP_PROXY_IMAGE=gcr.io/$(gcloud config get-value project)/http-proxy:1.0
ks generate tf-serving ${MODEL_COMPONENT} --name=${MODEL_NAME} --model_path=${MODEL_PATH} --model_server_image=${MODEL_SERVER_IMAGE} --http_proxy_image=${HTTP_PROXY_IMAGE}
ks apply cloud -c ${MODEL_COMPONENT}
```

### Get token

Go the the [Credentials](console.cloud.google.com/apis/credentials) page, and create a crednetial
with type **Other**. Record the client ID and client secret as `OTHER_CLIENT_ID` and `OTHER_CLIENT_SECRET`.

Visit this url to get the auth code: https://accounts.google.com/o/oauth2/v2/auth?client_id=OTHER_CLIENT_ID&response_type=code&scope=openid%20email&access_type=offline&redirect_uri=urn:ietf:wg:oauth:2.0:oob.
Save the auth code. 

Now we should have four variables ready: `IAP_CLIENT_ID, OTHER_CLIENT_ID, OTHER_CLIENT_SECRET`, and the auth code.
Run the script:
```
./get_token.sh auth YOUR_CODE_CODE
```

This should print out 
```
REFRESH_TOKEN=XXX
ID_TOKEN=XXX
```

The ID_TOKEN is valid for 1 hour. To refresh the token, run:
```
./get_token.sh refresh YOUR_REFRESH_TOKEN
```

This should print out
```
ID_TOKEN=XXX
```

More information [here](https://cloud.google.com/iap/docs/authentication-howto).

## Send prediction requests
```
curl -k  -H "Authorization: Bearer YOUR_ID_TOKEN" -X POST -d @../test-data/mnist_input.json https://YOUR_HOST/models/mnist/
```
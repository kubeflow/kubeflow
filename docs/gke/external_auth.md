# Set up external auth

These instructions discuss how to setup external authorization for the K8s master.
This will allow you to securely access K8s services like the dashboard and use the
API server proxy to securely access services like tensorboard.

Create an OAuth client id of type web application

TODO(jlewi): Provide additional instructions about how to do this.

Create an external static IP address

```
gcloud compute --project=${PROJECT} addresses create kubeflow --global
```

Create an SSL cert

```
ENDPOINT_URL=FQDN of your host
SECRET_NAME
mkdir -p ~/tmp/${ENDPOINT_URL}
TLS_KEY_FILE=~/tmp/${ENDPOINT_URL}/tls.key
TLS_CRT_FILE=~/tmp/${ENDPOINT_URL}/tls.crt

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -subj "/CN=${ENDPOINT_URL}/O=Google LTD./C=US" \
  -keyout ${TLS_KEY_FILE} -out ${TLS_CRT_FILE}
kubectl -n ${NAMESPACE} create secret generic ${SECRET_NAME}  --from-file=${TLS_KEY_FILE} --from-file=${TLS_CRT_FILE}
```


Deploy envoy

```
ks generate envoy envoy --namespace=${NAMESPACE}
ks apply ${ENV} -c envoy
```

Test that you can access the IAP sample app

```
kubectl run -i -t ubuntu --image=ubuntu --restart=Never
apt-get update
apt-get install curl -y

# Check direct acccess to the sample app
curl -L -s -i http://iap-sample-app:80/

# Check access through envoy
curl -L -s -i http://envoy:80/iap-app
```

Enable IAP

```
export CLIENT_ID=...
export CLIENT_SECRET=...
export ENVOY_SERVICE=envoy
${DOCS_PATH}/enable_iap.sh ${PROJECT} ${NAMESPACE} ${ENVOY_SERVICE}
```

Get the backend audience and set it

```
ks param set envoy audiences /projects/991277910492/global/backendServices/3255521342137173925
ks apply -c ${NAMEPACE} ${COMPONENT_NAME}
```

Ensure the envoy pods were actually updated with the new config

```
kubectl exec -it ${ENVOY_POD_NAME}  cat /etc/envoy/envoy-jwt-config.json
```

  * If the audiences isn't set in the config to the desired value try deling the pod so that it will get restartd with the updated config

Troubleshooting

Envoy serves its admin server on `8001` by default.


# Setting Up IAP on GKE

These are the instructions for setting up IAP on JupyterHub for Kubeflow.


Create a self signed certificate

TODO(jlewi): How can we get a signed certificate so we don't get Chrome warnings.

```
PROJECT=$(gcloud config get-value project)
ENDPOINT_URL="kubeflow.endpoints.${PROJECT}.cloud.goog"
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -subj "/CN=${ENDPOINT_URL}/O=Google LTD./C=US" \
  -keyout ~/tmp/tls.key -out ~/tmp/tls.crt

```


Create the K8s secret

```
kubectl create secret generic iap-ingress-ssl  --from-file=${HOME}/tmp/tls.crt --from-file=${HOME}/tmp/tls.key
```

Deploy the K8s resources for IAP

```
JUPYTER_IAP_INGRESS_NAME=<Pick a name for your new component>
ks generate iap ${JUPYTER_IAP_INGRESS_NAME}  --namespace=$NAMESPACE
ks apply ${ENV} -c ${JUPYTER_IAP_INGRESS_NAME}
```

Create the OpenAPI spec to use with cloud endpoints

```
JUPYTER_SERVICE=jupyter-hub-esp
JUPYTER_INGRESS=jupyter-hub-esp
./create_iap_openapi.sh $PROJECT $NAMESPACE $JUPYTER_SERVICE $JUPYTER_INGRESS $ENDPOINT
```
	* PROJECT is your GCP project
	* NAMESPACE is the namespace you want to deploy in
	* JUPYTER_SERVICE is the name of the JUPYTER_SERVICE (should be jupyter-hub-esp)
	* JUPYTER_INGRESS is the name of the ingress whose backend i jupyter service
	* ENDPOINT this is a name you choose. It determines the URl you will access the service at which will be
	
	```
	ENDPOINT_URL=${ENDPOINT}.endpoints.${PROJECT}.cloud.goog"
	```

Create the service

```
gcloud --project=${PROJECT} endpoints services deploy ${ENDPOINT}-openapi.yaml
```

### Create oauth client credentials

Creating the OAuth Client ID

* Set up your OAuth consent screen:
* Configure the consent screen.

* Under Email address, select the address that you want to display as a public contact. You must use either your email address or a Google Group that you own.
* In the Product name box, enter something like `kubeflow-jupyterhub`
* Click Save.
* Click Create credentials, and then click OAuth client ID.
* Under Application type, select Web application. In the Name box enter a name, and in the Authorized redirect URIs box, enter 

```
  https://${ENDPOINT}.endpoints.${PROJECT}.cloud.goog/_gcp_gatekeeper/authenticate, 
```

 * Replace ${PROJECT} and ${ENDPOINT} with the values for your project.

After you enter the details, click Create. Make note of the client ID and client secret that appear in the OAuth client window.
Save the OAuth client ID and secret to variables for later use:
CLIENT_ID=YOUR_CLIENT_ID
CLIENT_SECRET=YOUR_CLIENT_SECRET


### Update JupyterHub

We need to update the ESP proxy in the JupyterHub side proxy to use the service we just created

```
ENDPOINT_URL="${ENDPOINT}.endpoints.${PROJECT}.cloud.goog"
SERVICE_VERSION=$(gcloud endpoints services describe ${ENDPOINT_URL} --format='value(serviceConfig.id)')

ks param set ${CORE_NAME} jupyterHubEndpoint ${ENDPOINT_URL}
ks param set ${CORE_NAME} jupyterHubServiceVersion ${SERVICE_VERSION}
ks apply ${ENV} -c ${CORE_NAME}
```
	* CORE_NAME should be the name you gave the core Kubeflow component.
	* If had previously deployed the Kubeflow core components you'll need to manually delete the stateful set first e.g

	  ```
	  kubectl delete statefulsets tf-hub-0
	  ```
Enable IAP

```
export CLIENT_ID=...
export CLIENT_SECRET=...
./enable_iap.sh ${PROJECT} ${NAMESPACE} ${JUPYTER_SERVICE}
```

You will need to grant IAP access to users (or GROUPs) e.g.

```
gcloud projects add-iam-policy-binding $PROJECT \
  --role roles/iap.httpsResourceAccessor \
  --member user:${USER_EMAIL}
```

Since you are using a self signed certificate chrome will give you a warning like

```
Attackers might be trying to steal your information from tf-hub-0.endpoints.kubeflow-rl.cloud.goog (for example, passwords, messages, or credit cards). Learn more
NET::ERR_CERT_AUTHORITY_INVALID
```
  * Click ADVANCED and choose to proceed.

## Troubleshooting

```Error: Server Error ``` 
 * 502 error - Usually means traffic isn't even making it to the esp proxy
 * Make sure you are using https
 * Try in incognito mode; you should be redirected to a Google login; then requests aren't even making it to the backend.
 * Make sure service is running and labels port are all correct
     * TODO(jlewi): Can we try connecting via kubectl? We should get rejected by esp proxy if we bypass IAP

  * Check that JupyterHub is up and healty
  ```
  kubectl port-forward tf-hub-0 8000:8000
  ```
  	* You should be able to connect to JupyterHub at 127.0.0.1:8000
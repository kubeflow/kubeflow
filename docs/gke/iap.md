# Setting Up IAP on GKE

These instructions walk you through using [Identity Aware Proxy](https://cloud.google.com/iap/docs/)(IAP) to securely connect to JupyterHub
when using GKE.

  * IAP allows you to control access to JupyterHub using Google logins
  * Using IAP secures access to JupyterHub using HTTPs
  * IAP allows users to safely and easily connect to JupyterHub
  * We use Cloud Endpoints to give users a stable domain name they can use to access JupyterHub.


Create a self signed certificate
  * The certificate is needed for HTTPs

```
PROJECT=$(gcloud config get-value project)
ENDPOINT=<name for the endpoint>
ENDPOINT_URL="${ENDPOINT}.endpoints.${PROJECT}.cloud.goog"
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -subj "/CN=${ENDPOINT_URL}/O=Google LTD./C=US" \
  -keyout ~/tmp/tls.key -out ~/tmp/tls.crt

```


Create a K8s secret to store the SSL certificate.

```
kubectl create secret generic iap-ingress-ssl  --from-file=${HOME}/tmp/tls.crt --from-file=${HOME}/tmp/tls.key
```

Deploy JupyterHub using the Cloud Endpoints [NGINX proxy](https://github.com/cloudendpoints/esp)

```
ENDPOINT_URL="${ENDPOINT}.endpoints.${PROJECT}.cloud.goog"
SERVICE_VERSION=""

ks param set ${CORE_NAME} jupyterHubEndpoint ${ENDPOINT_URL}
ks param set ${CORE_NAME} jupyterHubServiceVersion ${SERVICE_VERSION}
ks param set ${CORE_NAME} jupyterHubAuthenticator iap
ks apply ${ENV} -c ${CORE_NAME}
```
	
  * For ENDPOINT you can pick whatever name you want (that you haven't already used) to access your jupyter deployment.
	* You will access Jupyter at `http://${ENDPOINT}.endpoints.${PROJECT}.cloud.goog`
  * The above commands configure JupyterHub to run with NGINX in a side car
  * We rely on NGINX to perform JWT validation and reject any external traffic which didn't pass through IAP
  * NGINX gets its configuration using [Cloud Endpoints](https://cloud.google.com/endpoints/docs/) which is configured below
  * **Important** We need to deploy JupyterHub with the NGINX sidecar before we create the K8s ingress (see below) because the readiness probe
	  determines the path for the HTTP health check created by ingress
	* Since we don't know the SERVICE_VERSION we just use a blank value.

Create a K8s ingress to allow JupyterHub to be accessed externally

```
JUPYTER_IAP_INGRESS_NAME=<Pick a name for your new component>
ks generate iap ${JUPYTER_IAP_INGRESS_NAME}  --namespace=$NAMESPACE
ks apply ${ENV} -c ${JUPYTER_IAP_INGRESS_NAME}
```

  * These commands create a K8s ingress that will setup an external loadbalancer on GCP that will direct traffic the NGINX proxy running in the JupyterHub pod.
  * At these point IAP isn't turned on so anyone can send traffic to NGINX but since NGINX isn't configured no traffic is forwarded to JupyterHub

Create the OpenAPI spec that Cloud Endpoints will use to configure the NGINX proxy

```
JUPYTER_SERVICE=jupyter-hub-esp
JUPYTER_INGRESS=jupyter-hub-esp
${DOCS_PATH}/create_iap_openapi.sh $PROJECT $NAMESPACE $JUPYTER_SERVICE $JUPYTER_INGRESS $ENDPOINT
```
  * PROJECT is your GCP project
  * NAMESPACE is the namespace you want to deploy in
  * JUPYTER_SERVICE is the name of the JUPYTER_SERVICE (should be jupyter-hub-esp)
  * JUPYTER_INGRESS is the name of the ingress whose backend i jupyter service
  * ENDPOINT this is a name you choose. It determines the URl you will access JupyterHub at; which will be
  * This will configure the NGINX proxy to do JWT validation and reject any traffic that didn't go through IAP.
	
	```
	ENDPOINT_URL=${ENDPOINT}.endpoints.${PROJECT}.cloud.goog"
	```

Update Cloud Endpoints.

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

We need to update the NXING proxy in the JupyterHub pod to use the service we just created

```
ENDPOINT_URL="${ENDPOINT}.endpoints.${PROJECT}.cloud.goog"
SERVICE_VERSION=$(gcloud endpoints services describe ${ENDPOINT_URL} --format='value(serviceConfig.id)')

ks param set ${CORE_NAME} jupyterHubEndpoint ${ENDPOINT_URL}
ks param set ${CORE_NAME} jupyterHubServiceVersion ${SERVICE_VERSION}
kubectl delete statefulsets tf-hub-0
ks apply ${ENV} -c ${CORE_NAME}
```
  * CORE_NAME should be the name you gave the core Kubeflow component.
  * We delete the statefulset so that it will pick up the new config

At this point you can try connecting over http to `http://${ENDPOINT_URL}` you should get an error like the following indicating
the traffic was rejected because you don't have IAP enabled and aren't authenticated.

```
{
 "code": 16,
 "message": "JWT validation failed: Missing or invalid credentials",
 "details": [
  {
   "@type": "type.googleapis.com/google.rpc.DebugInfo",
   "stackEntries": [],
   "detail": "auth"
  }
 ]
}
```

Enable IAP

```
export CLIENT_ID=...
export CLIENT_SECRET=...
${DOCS_PATH}/enable_iap.sh ${PROJECT} ${NAMESPACE} ${JUPYTER_SERVICE}
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

### Verifying JWT credentials are being checked.

If you want to verify that traffic that didn't go through IAP is being rejected you can try connecting directly to the ESP proxy

```
kubectl port-forward tf-hub-0 9000:9000
```

You can then open up `http://localhost:9000` and you should get an error like

```
{
 "code": 16,
 "message": "JWT validation failed: Missing or invalid credentials",
 "details": [
  {
   "@type": "type.googleapis.com/google.rpc.DebugInfo",
   "stackEntries": [],
   "detail": "auth"
  }
 ]
}
```

**Important** JWT validation only happens in the side car running in the JupyterHub pod. All traffic external to the cluster is routed through
this side car. However, traffic coming from inside the cluster e.g. the individual Jupyter pods do not route traffic through the side car.

**Important** Do not set the service type for JupyterHub to `LoadBalancer` or anything other than `ClusterIP` as this will create an external load balancer that directly routes traffic to JupyterHub that bypasses the sidecar that only allows traffic authorized by IAP to go through.

## Troubleshooting

 * Make sure you are using https

```Error: Server Error ``` 
 * 502 error - Usually means traffic isn't even making it to the esp proxy
 	* Look at Cloud Logs for the Load balncer
 	* You can get the backend id as follows

 	```
 	NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
	while [[ -z ${BACKEND_ID} ]]; 
	do BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${NODE_PORT}- --format='value(id)'); 
	echo "Waiting for backend id PROJECT=${PROJECT} NAMESPACE=${NAMESPACE} SERVICE=${SERVICE}..."; 
	sleep 2; 
	done
	echo BACKEND_ID=${BACKEND_ID}
 	```
 	
 	* You can map the backend to the name of the load balancer and then get logs for that load balancer. Need to explain how to do the mapping.

 * Try in incognito mode; you should be redirected to a Google login; then requests aren't even making it to the backend.
 * Make sure service is running and ports are all correct
 
  * Check that JupyterHub is up and healthy

  ```
  kubectl port-forward tf-hub-0 8000:8000
  ```
  	* You should be able to connect to JupyterHub at 127.0.0.1:8000


 * If backend health checks aren't passing
      * Check the health check rule associated with the load balancer; make sure the path is correct.
      * You can test that the health check is responding correctly by doing
      ```
      gcloud --project=${PROJECT} compute ssh --zone=${ZONE} ${VM} --ssh-flag="-L ${PORT}:127.0.0.1:${PORT}"
      curl -I http://localhost:${PORT}/${PATH}
      ```

        * VM - should be a VM that is serving as one of your backends
        * PORT - should be the node port used by the service backing your ingress
        * PATH - should be the path the GCP health check is using

     * If  `http://localhost:${PORT}/${PATH}` doesn't return a 200 HTTP code then check whether the node port is properly mapped (via a K8s service) to a pod. Check the corresponding pod. Is it running? Healthy?
     * If `http://localhost:${PORT}/${PATH}` returns 200 HTTP code, then check the firewall rules on your project to see if they are blocking traffic to the VMs from the L7 balancer. The firewall rule should be added automatically by the ingress but its possible it got deleted if you have some automatic firewall policy enforcement. You can recreate the firewall rule if needed with a rule like this
       ```
       gcloud compute firewall-rules create $NAME \
		  --project $PROJECT \
		  --allow tcp:$PORT \
		  --target-tags $NODE_TAG \
		  --source-ranges 130.211.0.0/22,35.191.0.0/16
       ```
       	
       	* For more info [see GCP HTTP health check docs](https://cloud.google.com/compute/docs/load-balancing/health-checks)

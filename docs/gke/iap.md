# Setting Up IAP on GKE

**Important** This doc is a work in progress. The instructions don't fully work yet because Envoy can't properly validate JWTs created
by IAP. You can work around this by disabling JWT's as described below but this is insecure because if IAP is accidentally disabled (which happens
if you recreate the ingress) then all traffic can get through.

These instructions walk you through using [Identity Aware Proxy](https://cloud.google.com/iap/docs/)(IAP) to securely connect to Kubeflow
when using GKE.

  * IAP allows you to control access to JupyterHub using Google logins
  * Using IAP secures access to JupyterHub using HTTPs
  * IAP allows users to safely and easily connect to JupyterHub
  * You will need your own domain which can be purchased and managed using Google domains or another provider

If you aren't familiar with IAP you might want to start by looking at those docs.

### Preliminaries

##### Create an external static IP address

```
gcloud compute --project=${PROJECT} addresses create kubeflow --global
```

Use your DNS provider (e.g. Google Domains) create a type A custom resource record that associates the host you want e.g "kubeflow"
with the IP address that you just reserved.
  * Instructions for [Google Domains](https://support.google.com/domains/answer/3290350?hl=en&_ga=2.237821440.1874220825.1516857441-1976053267.1499435562&_gac=1.82147044.1516857441.Cj0KCQiA-qDTBRD-ARIsAJ_10yKS7G1HPa1aoM8Mk_4VagV9wIi5uKkMp5UWJGDNejKxWPKUO_A6ri4aAsahEALw_wcB)

##### Create a self signed certificate

The certificate is needed for HTTPs
  
```
ENDPOINT_URL=${HOST}.${YOURDOMAIN}
mkdir -p ~/tmp/${ENDPOINT_URL}
TLS_KEY_FILE=~/tmp/${ENDPOINT_URL}/tls.key
TLS_CRT_FILE=~/tmp/${ENDPOINT_URL}/tls.crt

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -subj "/CN=${ENDPOINT_URL}/O=Google LTD./C=US" \
  -keyout ${TLS_KEY_FILE} -out ${TLS_CRT_FILE}
```
  
  * HOST will be the value of the custom resource record that you created to map to your IP address.

Create a K8s secret to store the SSL certificate.

```
SECRET_NAME=<Name for your secret.>
kubectl -n ${NAMESPACE} create secret generic ${SECRET_NAME}  --from-file=${TLS_KEY_FILE} --from-file=${TLS_CRT_FILE}
```


#### Create oauth client credentials

Create an OAuth Client ID to be used to identify IAP when requesting acces to user's email to verify their identity.

1. Set up your OAuth consent screen:
* Configure the [consent screen](https://console.cloud.google.com/apis/credentials/consent).
* Under Email address, select the address that you want to display as a public contact. You must use either your email address or a Google Group that you own.
* In the Product name box, enter a suitable like save `kubeflow`
* Click Save.
1.  Click Create credentials, and then click OAuth client ID.
  * Under Application type, select Web application. In the Name box enter a name, and in the Authorized redirect URIs box, enter 

```
  https://${ENDPOINT_URL}/_gcp_gatekeeper/authenticate, 
```

1. After you enter the details, click Create. Make note of the **client ID** and **client secret** that appear in the OAuth client window because we will
   need them later to enable IAP.

Save the OAuth client ID and secret to variables for later use:

### Setup Ingress

```
ks generate ${ENVIRONMENT} iap-ingress --secretName=${SECRET_NAME} --ipName=${IP_NAME} --namespace=${NAMESPACE}
ks apply ${ENVIRONMENT} -c iap-ingress
```

This will create a load balancer. We can now enable IAP on this load balancer


```
CLIENT_ID=<Client id for OAuth client created in the previous step>
CLIENT_SECRET=<Client secret for OAuth client created in the previous step>
SERVICE=envoy
INGRESS=envoy-ingress
${DOCS_PATH}/enable_iap_openapi.sh ${PROJECT} ${NAMESPACE} ${SERVICE} ${INGRESS}
```
The above command will output the audience such as:

```
JWT_AUDIENCE=/projects/991277910492/global/backendServices/801046342490434803
```
 
 * you will need JWT_AUDIENCE in the next step to configure JWT validation

**Important** Redeploying iap-ingress (e.g. running `ks apply ${ENVIRONMET} -c iap-ingress` again) 
will cause the JWT_AUDIENCE to change and the backend service created by GCP to change.
As a result you will have to repeat the steps below to properly configure IAP.

### Deploy Envoy Proxies

The next step is to deploy Envoy as a reverse proxy.

```
ks generate iap-envoy iap-envoy --audiences=${JWT_AUDIENCE}
ks apply ${ENVIRONMENT} -c iap-envoy
```

### Test ingress

It can take some time for IAP to be enabled. You can test things out using the following URL

```
https://${DOMAIN}/noiap/whoami
```

  * This a simple test app that's deployed as part of the iap-envoy component.
  * This URL will always be accessible regardless of whether IAP is enabled or not
  * If IAP isn't enabled the app will report that you are an anyomous user
  * Once IAP takes effect you will have to authenticate using your Google account and the app will tell you 
    what your email is.
  
We also have the app running at

```
https://${DOMAIN}/whoami
```
  * But this path will reject traffic that didn't go through IAP so it won't work unless IAP is enabled. In this case you should get
  one of the following errors.

    * `401 UNAUTHORIZED` this indicates IAP isn't enabled so the request is rejected because it wasn't authenticated
    * `401 ISS_AUD_UNMATCH1` this is because Envoy doesn't support IAP JWT tokens yet [istio/proxy/issues/941](https://github.com/istio/proxy/issues/941)


### Disable JWT verification 

Until [istio/proxy/issues/941](https://github.com/istio/proxy/issues/941) is fixed you can disable JWT verification in Envoy. 

**Warning** This is a serious security risk because it means if IAP is disabled all traffic will be allowed through. You should only do this
if you understand the risks; for more info see [IAP's docs on Securing Your App](https://cloud.google.com/iap/docs/signed-headers-howto).

```
ks param set iap-envoy disableJwtChecking true
ks apply ${ENVIRONMENT} -c iap-envoy
# Delete the pods so they are recreated with the new config
kubectl delete pods --selector=service=envoy
```


###
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



### Adding Users

IAP will block users who haven't been granted access to your web app. You can grant access using the following command.

```
gcloud projects add-iam-policy-binding $PROJECT \
  --role roles/iap.httpsResourceAccessor \
  --member user:${USER_EMAIL}
```


```
export CLIENT_ID=...
export CLIENT_SECRET=...
${DOCS_PATH}/enable_iap.sh ${PROJECT} ${NAMESPACE} ${JUPYTER_SERVICE}
```

You will need to grant IAP access to users (or GROUPs) e.g.


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
 	  * Backends will also be listed in the annotation of the ingress controller and will contain node port in the name.

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

     * If path for the HTTP health check isn't correct you can manually edit via the UI or gcloud
     * If  `http://localhost:${PORT}/${PATH}` doesn't return a 200 HTTP code then check whether the node port is properly mapped (via a K8s service) to a pod. Check the corresponding pod. Is it running? Healthy?
     * If `http://localhost:${PORT}/${PATH}` returns 200 HTTP code, then check the firewall rules on your project to see if they are blocking traffic to the VMs from the L7 balancer. The firewall rule should be added automatically by the ingress but its possible it got deleted if you have some automatic firewall policy enforcement. You can recreate the firewall rule if needed with a rule like this
       ```
       gcloud compute firewall-rules create $NAME \
		  --project $PROJECT \
		  --allow tcp:$PORT \
		  --target-tags $NODE_TAG \
		  --source-ranges 130.211.0.0/22,35.191.0.0/16
       ```
       	
        * To get the node tag
        
        ```
        # From the GKE cluster get the name of the managed instance group
        gcloud --project=$PROJECT container clusters --zone=$ZONE describe $CLUSTER
        # Get the template associated with the MIG
        gcloud --project=kubeflow-rl compute instance-groups managed describe --zone=${ZONE} ${MIG_NAME}
        # Get the instance tags from the template
        gcloud --project=kubeflow-rl compute instance-templates describe ${TEMPLATE_NAME}

        ```

       	* For more info [see GCP HTTP health check docs](https://cloud.google.com/compute/docs/load-balancing/health-checks)

        * Seel also [K8s docs](https://github.com/kubernetes/contrib/blob/master/ingress/controllers/gce/examples/health_checks/READMEmd#limitations) for important information about how health checks are determined from readiness probes.
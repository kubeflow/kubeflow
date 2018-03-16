# Setting Up IAP on GKE

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
${FQDN}=${HOST}.${YOURDOMAIN}
mkdir -p ~/tmp/${DOMAIN}
TLS_KEY_FILE=~/tmp/${FQDN}/tls.key
TLS_CRT_FILE=~/tmp/${FQDN}/tls.crt

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -subj "/CN=${FQDN}/O=Google LTD./C=US" \
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
2.  On the [Credentials](https://console.cloud.google.com/apis/credentials) Click Create credentials, and then click OAuth client ID.
  * Under Application type, select Web application. In the Name box enter a name, and in the Authorized redirect URIs box, enter

```
  https://${FQDN}/_gcp_gatekeeper/authenticate,
```
3. After you enter the details, click Create. Make note of the **client ID** and **client secret** that appear in the OAuth client window because we will
   need them later to enable IAP.

4. Save the OAuth client ID and secret to variables for later use

### Setup Ingress

If you haven't already, follow the instructions in the [user_guide](https://github.com/kubeflow/kubeflow/blob/master/user_guide.md#deploy-kubeflow)
to create a ksonnet app to deploy Kubeflow.

The instructions below reference the following environment variables which you will need to set for your deployment

  * **CORE_NAME** The name assigned to the core Kubeflow ksonnet components (this is the name chosen when you ran `ks generate...`).
  * **ENVIRONMENT** The name of the ksonnet environment where you want to deploy Kubeflow.
  * **FQDN** The fully qualified domain name to use for your Kubeflow deployment.
  * **IP_NAME** The name of the GCP static IP that you created above and will be associated with **DOMAIN**.
  * **NAMESPACE** The namespace where Kubeflow is deployed.
  * **SECRET_NAME** The name of the K8s secret that stores the SSL certificate.


```
ks generate iap-ingress iap-ingress --secretName=${SECRET_NAME} --ipName=${IP_NAME} --namespace=${NAMESPACE} --hostname=${FQDN}
ks apply ${ENVIRONMENT} -c iap-ingress
```

This will create a load balancer. We can now enable IAP on this load balancer using
the [enable_iap.sh](https://github.com/kubeflow/kubeflow/tree/master/docs/gke/enable_iap.sh) script.


```
CLIENT_ID=<Client id for OAuth client created in the previous step>
CLIENT_SECRET=<Client secret for OAuth client created in the previous step>
SERVICE=envoy
enable_iap.sh ${PROJECT} ${NAMESPACE} ${SERVICE}
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
ks generate iap-envoy iap-envoy --namespace=${NAMESPACE} --audiences=${JWT_AUDIENCE}
ks apply ${ENVIRONMENT} -c iap-envoy
```

### Test ingress

It can take some time for IAP to be enabled. You can test things out using the following URL

```
https://${FQDN}/noiap/whoami
```

  * This a simple test app that's deployed as part of the iap-envoy component.
  * This URL will always be accessible regardless of whether IAP is enabled or not
  * If IAP isn't enabled the app will report that you are an anyomous user
  * Once IAP takes effect you will have to authenticate using your Google account and the app will tell you
    what your email is.

We also have the app running at `https://${FQDN}/whoami` - but this path will reject traffic that didn't go through IAP so it won't work unless IAP is enabled. In this case you should get
  a `401 UNAUTHORIZED` this indicates IAP isn't enabled so the request is rejected because it wasn't authenticated

### Configure Jupyter to use your Google Identity

We can configure Jupyter to use the identity provided by IAP. This way users won't have to login to JupyterHub.

```
ks param set ${CORE_NAME} jupyterHubAuthenticator iap
ks apply ${ENV} -c ${CORE_NAME}
# Restart JupyterHub so it picks up the updated config
kubectl delete -n ${NAMESPACE} pods tf-hub-0
```

You should now be able to access JupyterHub at

```
https://${FQDN}/hub
```

### Adding Users

IAP will block users who haven't been granted access to your web app. You can grant access using the following command.

```
gcloud projects add-iam-policy-binding $PROJECT \
  --role roles/iap.httpsResourceAccessor \
  --member user:${USER_EMAIL}
```

### Obtaining a valid certificate from LetsEncrypt

Since you are using a self signed certificate chrome and other browsers will give you a warning like

```
Attackers might be trying to steal your information from ${ENDPOINT}(for example, passwords, messages, or credit cards). Learn more
NET::ERR_CERT_AUTHORITY_INVALID
```

We can use [cert-manager](https://github.com/jetstack/cert-manager) to automatically obtain and refresh [Let's Encrypt](https://letsencrypt.org/) certificates. Let's Encrypt is a free, automated, and open Certificate Authority.

`cert-manager` uses `helm` for installation. Ensure that `helm` is installed on your cluster by running `helm version`. You should see both client version and server version. If not, make sure you install [helm](https://github.com/kubernetes/helm).

* Before starting, ensure that `${FQDN}` points to the IP of the cluster (the one created using gcloud).
* Install cert-manager on your cluster by running the following. For detailed instructions refer to the offcial instructions [here](https://github.com/jetstack/cert-manager/blob/master/docs/user-guides/deploying.md).

```bash
helm install \
    --name cert-manager \
    --namespace kube-system \
    stable/cert-manager
```

* To validate your installation, run `kubectl get crd`. You should see `clusterissuers.certmanager.k8s.io` and `certificates.certmanager.k8s.io` in the list.

* Create a `clusterissuer` object. Replace with your email address and save the following file to `cluster-issuer.yaml` and run `kubectl apply -f cluster-issuer.yaml`

```
apiVersion: certmanager.k8s.io/v1alpha1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v01.api.letsencrypt.org/directory
    # Replace with your email address - this is used for notifications of certificate expiry
    email: email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod-key
    # Enable the HTTP-01 challenge provider
    http01: {}
```

* Create a `certificate` object in `${NAMESPACE}`. The following config assumes `FQDN=kubeflow.example.com`, replace values appropriately in the file. Save this file to `kubeflow-example-com-cert.yaml` and run `kubectl apply -f kubeflow-example-com-cert.yaml`

```
apiVersion: certmanager.k8s.io/v1alpha1
kind: Certificate
metadata:
  name: kubeflow-example-com
  namespace: ${NAMESPACE}
spec:
  secretName: ${SECRET_NAME}
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  commonName: kubeflow.example.com
  dnsNames:
  - kubeflow.example.com
  acme:
    config:
    - http01:
        ingress: envoy-ingress
      domains:
      - kubeflow.example.com
```

* That's it. cert-manager should automatically obtain a valid cert from letsencrypt and store it in ${SECRET_NAME}. The ingress resource automatically picks up the updated certs in ${SECRET_NAME}. It can take upto 10 minutes for this process to happen. You can check the progress by running `kubectl describe certificate/kubeflow-example-com -n${NAMESPACE}`

## Troubleshooting

Here are some tips for troubleshooting IAP.

 * Make sure you are using https

### 502 Server Error
* A 502 usually means traffic isn't even making it to the envoy reverse proxy
* A 502 usually indicates the loadbalancer doesn't think any backends are healthy
  * In Cloud Console select Network Services -> Load Balancing
      * Click on the load balancer (the name should contain the name of the ingress)
      * The exact name can be found by looking at the `ingress.kubernetes.io/url-map` annotation on your ingress object
      * Click on your loadbalancer
      * This will show you the backend services associated with the load balancer
          * There is 1 backend service for each K8s service the ingress rule routes traffic too
          * The named port will correspond to the NodePort a service is using
      * Make sure the load balancer reports the backends as healthy
          * If the backends aren't reported as healthy check that the pods associated with the K8s service are up and running
          * Check that health checks are properly configured
            * Click on the health check associated with the backend service for envoy
            * Check that the path is /healthz and corresponds to the path of the readiness probe on the envoy pods
            * Seel also [K8s docs](https://github.com/kubernetes/contrib/blob/master/ingress/controllers/gce/examples/health_checks/READMEmd#limitations) for important information about how health checks are determined from readiness probes.

          * Check firewall rules to ensure traffic isn't blocked from the GCP loadbalancer
              * The firewall rule should be added automatically by the ingress but its possible it got deleted if you have some automatic firewall policy enforcement. You can recreate the firewall rule if needed with a rule like this

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

              For more info [see GCP HTTP health check docs](https://cloud.google.com/compute/docs/load-balancing/health-checks)

  * In Stackdriver Logging look at the Cloud Http Load Balancer logs

    * logs are labeled with the forwarding rule
    * The forwarding rules are available via the annotations on the ingress
      ```
      ingress.kubernetes.io/forwarding-rule
      ingress.kubernetes.io/https-forwarding-rule
      ```

 * Verify that requests are being properly routed within the cluster

  * Connect to one of the envoy proxies

  ```
  kubectl exec -ti `kubectl get pods --selector=service=envoy -o jsonpath='{.items[0].metadata.name}'` /bin/bash
  ```

  * Installl curl in the pod
  ```
  apt-get update && apt-get install -y curl
  ```

  * Verify access to the whoami app

  ```
  curl -L -s -i curl -L -s -i http://envoy:8080/noiap/whoami
  ```
    * If this doesn't return a 200 OK response; then there is a problem with the K8s resources

      * Check the pods are running
      * Check services are pointing at the points (look at the endpoints for the various services)

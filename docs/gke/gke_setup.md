# Deploying Kubeflow On GKE

Instructions for optimizing Kubeflow for GKE.

These instructions take advantage of [Google Cloud Deployment Manager](https://cloud.google.com/deployment-manager/docs/)
to manage your GKE cluster and other GCP resources that you might want to use with Kubeflow.

The instructions also take advantage of IAP to provide secure authenticated access web-apps running as part of Kubeflow.

## Create the Kubeflow deployment

1.  Make a copy of the `configs` directory

	* Its a good idea to check this into source control to make it easy to version and rollback your configs.

1. Modify `cluster-kubeflow.yaml`

  1. Set the zone for your cluster
  1. Set property `ipName` to a value that is unique with respect to your project
  1. Set parameter ipName in bootstrapperConfig to the value selected in the previous step
  1. Set parameter acmeEmail in bootstrapperConfig to your email address
  1. Set parameter hostname in bootstrapperConfig
  1. Change the initial number of nodes if desired

		* If you want GPUs set a non-zero number for number of GPU nodes.

1. Modify `env-kubeflow.sh`

	* This file defines environment variables used in the commands below.
	* We recommend checking a modified version into source control so its easy to source and repeat the commands.

1. Grant sufficient permisions to Cloud services account which is what is used by deployment manager

   ```
   . env-kubeflow.sh
   gcloud projects add-iam-policy-binding ${PROJECT} \
    	--member serviceAccount:${PROJECT_NUMBER}@cloudservices.gserviceaccount.com \
    	--role roles/resourcemanager.projectIamAdmin      
   ```

1. Deploy Kubeflow

   ```
   gcloud deployment-manager --project=${PROJECT} deployments create ${DEPLOYMENT_NAME} --config=${CONFIG_FILE}
   ```

1. Get credentials for the newly configured cluster

   ```
   gcloud --project=${PROJECT} container clusters get-credentials --zone=${ZONE} ${DEPLOYMENT_NAME}-${NAME}
   ```

	 * ZONE - this will be the zone specified in your ${CONFIG_FILE}
	 * NAME - this will be the name specified in your ${CONFIG_FILE}

1. Create a service account and IAM bindings for the cloud-endpoints-controller

	* You can skip this step if you are using a custom domain.

   ```
   export SA_EMAIL=${DEPLOYMENT_NAME}-${NAME}@${PROJECT}.iam.gserviceaccount.com
   gcloud --project=${PROJECT} iam service-accounts keys create ${SA_EMAIL}.json --iam-account $SA_EMAIL
   kubectl create secret generic --namespace=kubeflow cloudep-sa --from-file=./${SA_EMAIL}.json
   ```

	* ${NAME} is the name of the resource in your ${CONFIG_FILE}

### Create oauth client credentials

Create an OAuth Client ID to be used to identify IAP when requesting acces to user's email to verify their identity.

1. Set up your OAuth consent screen:
  * Configure the [consent screen](https://console.cloud.google.com/apis/credentials/consent).
  * Under Email address, select the address that you want to display as a public contact. You must use either your email address or a Google Group that you own.
  * In the Product name box, enter a suitable like save `kubeflow`
  * Click Save.

1.  On the [Credentials](https://console.cloud.google.com/apis/credentials) Click Create credentials, and then click OAuth client ID.
  * Under Application type, select Web application. In the Name box enter a name, and in the Authorized redirect URIs box, enter

   ```
   https://${FQDN}/_gcp_gatekeeper/authenticate
   ```

1. After you enter the details, click Create. Make note of the **client ID** and **client secret** that appear in the OAuth client window because we will
   need them later to enable IAP.

1. Create a new Kubernetes Secret with the the OAuth client ID and secret:

   ```
   kubectl -n ${NAMESPACE} create secret generic kubeflow-oauth --from-literal=CLIENT_ID=${CLIENT_ID} --from-literal=CLIENT_SECRET=${CLIENT_SECRET}
   ```

1. Grant users IAP access

   ```
   gcloud projects add-iam-policy-binding $PROJECT \
    --role roles/iap.httpsResourceAccessor \
    --member user:${USER_EMAIL}
   ```

1. Kubeflow will be available at

   ```
   https://${FQDN}/_gcp_gatekeeper/authenticate
   ```

### Using Your Own Domain

If you want to use your own doman instead of **${name}.endpoints.${project}.cloud.goog** make these modifications to ${CONFIG_FILE} before you create the deployment. 

1. Set parameter hostname in bootstrapperConfig to the fully qualified domain you will use
   e.g. `my-kubeflow.my-domain.com` 
1. Remove the component `cloud-endpoints` by deleting the following lines

   ```
   - name: cloud-endpoints
     prototype: cloud-endpoints
   ```

1. Remove parameters for component `cloud-endpoints` by deleting the following lines.

   ```
   - component: cloud-endpoints
     name: secretName
     value: cloudep-sa
   ```

1. After you create the deployment you can get the address of the static ip created

   ```
   gcloud --project=${PROJECT} addresses describe --global ${IPNAME}
   ```

   * IPNAME - should be the value assigned to property **ipName** in ${CONFIG_FILE}

1. Use your DNS provider to map the fully qualified domain specified in the first step to the ip address reserved
   in GCP.

### Using GPUs

To Use GPUs

1. Set the property **gpu-pool-initialNodeCount** in ${CONFIG_FILE} to the desired number of GPU nodes

1. Follow the instructions in the previous section to create the deployment; if your deployment already exists you can update it as follows

   1. Set a new value for property **pool-version** in ${CONFIG_FILE} 
   1. Update the deployment

   ```
   gcloud deployment-manager --project=${PROJECT} deployments create ${PROJECT} --config=${CONFIG_FILE}
   ```

   **Warning** These deletes the existing node pools and creates new ones. This means all processes currently running
   on your cluster will be restarted and temporarily unavailable

1. Run the command below to install the GPU drivers on the nodes.
   ```
   kubectl create -f https://raw.githubusercontent.com/GoogleCloudPlatform/container-engine-accelerators/k8s-1.9/nvidia-driver-installer/cos/daemonset-preloaded.yaml
   ```

## Deleting your deployment

To delete your deployment and reclaim all resources

```
gcloud deployment-manager --project=${PROJECT} deployments delete ${DEPLOYMENT_NAME}
```

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

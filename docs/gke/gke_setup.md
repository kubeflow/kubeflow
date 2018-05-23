# Deploying Kubeflow On GKE

Instructions for optimizing Kubeflow for GKE.

These instructions take advantage of [Google Cloud Deployment Manager](https://cloud.google.com/deployment-manager/docs/)
to manage your GKE cluster and other GCP resources that you might want to use with Kubeflow.

The instructions also take advantage of IAP to provide secure authenticated access web-apps running as part of Kubeflow.

## To Setup the cluster

### Create the Cluster
1.  Make a copy of the `configs` directory

	* Its a good idea to check this into source control to make it easy to version and rollback your configs.

1. Modify `cluster-kubeflow.yaml`

	* Set the zone for your cluster
	* Change the initial number of nodes if desired

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
gcloud deployment-manager --project=${PROJECT} deployments create ${PROJECT} --config=${CONFIG_FILE}
```

### Setup GPUs

```
kubectl create -f https://raw.githubusercontent.com/GoogleCloudPlatform/container-engine-accelerators/k8s-1.9/nvidia-driver-installer/cos/daemonset-preloaded.yaml
```

TODO(jlewi): This should be created by either the ksonnet APP or deployment manager.

### Prepare IAP

TODO(jlewi): Pull in [instructions](https://github.com/kubeflow/kubeflow/blob/master/docs/gke/iap.md#create-oauth-client-credentials) to setup IAP. We should describe using a custom domain as well as using Cloud Endpoints provided domain.

## Deploying Kubeflow

TODO(jlewi): Add instructions about running the bootstrapper to create ksonnet app and deploy Kubeflow.
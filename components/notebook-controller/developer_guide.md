# Developer Guide 

## Building and deploying with skaffold

* You can use skaffold to build the docker image for the controller by running Kaniko on your cluster and then deploy it.

To use skaffold you will need to modify skaffold.yaml to work with a Kubernetes cluster you have access to


1. Modify skaffold.yaml

   * Set gcsBucket to a GCS Bucket you have access to and will use to make the build context available
     to the Kaniko pod

   * For other setups refer to the [skaffold docs](https://skaffold.dev/docs/pipeline-stages/builders/docker/#dockerfile-in-cluster-with-kaniko) for information on making the context available to your cluster
     builds.

   * Set **image** to a GCR image that you can push to

   * Modify cluster.pullSecretName to be the name of a secret containing a GCP Service account that
     has permissions to push to the GCR repository where the image will be stored

    * Change the value of **GOOGLE_APPLICATION_CREDENTIALS** to point to the filename that is used by the
      pull secret for your GCP service account.

    * Change **namespace** to the namespace in which you want to run Kaniko

1. Run the build

   ```
   skaffold build -v info
   ```
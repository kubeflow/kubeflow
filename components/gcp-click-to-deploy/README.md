# GCP Click to deploy

A simple react webapp to make it easy to deploy Kubeflow on GCP.

The webapp is a client side javascript. The webapp provides a UI
to guide the user through the process of specifying the
information needed to deploy Kubeflow e.g.

  * The project they want to use
  * The name for deployment

When the user clicks **create deployments** the app issues a request
to GCP Deployment Manager to create a Kubeflow deployment.

The webapp eliminates the need to install any tools on the user's machine.

Furthermore, the app makes it easy for the user to login to Google using the
web auth flow and obtain a credential needed to perform the necessary GCP actions.
This is needed to perform admin tasks needed to setup Kubeflow.

The credential is never sent to Kubeflow servers. The credential is stored clientside
in the web app and used in requests to GCP services when needed.

## Development

You can run the app locally for development/testing.
```
cd components/gcp-click-to-deploy
# Install dependencies
npm install
```

Before starting the server, make a config file `user_config/app-config.yaml` under `src/` with the content from
[here](https://github.com/kubeflow/kubeflow/blob/master/components/gcp-click-to-deploy/app-config.yaml#L10).
And then do

```
npm start
```

A running local [backend service](../../bootstrap/cmd/bootstrap/main.go) is needed for complete deploy.
See the [dev guide](../../bootstrap/developer_guide.md) for more detail.

## Deployment

We have a dev instance running at [https://deploy-staging.kubeflow.cloud](https://deploy-staging.kubeflow.cloud)


```
PROJECT=kubeflow-dev
CLUSTER=dev-cluster
NAMESPACE=gcp-deploy
```

To update the deployment run


```
make deploy-latest
```

this will

  * build a new version of the image `gcr.io/kubeflow-images-public/gcp-click-to-deploy`
  * Update the ksonnet component to use that image
  * Update the deployment


The script

```
./ks-app/create_gcp_deploy_sa.sh
```

Can be used to create a service account to work with external DNS.

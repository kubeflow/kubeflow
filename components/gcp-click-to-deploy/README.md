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

You can run the app locally for development/testing

```
cd components/gcp-click-to-deploy
# Install dependencies
npm install
npm start
```

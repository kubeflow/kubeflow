// @apiVersion 0.1
// @name io.ksonnet.pkg.jupyterhub
// @description jupyterhub Component
// @shortDescription jupyterhub Component
// @param name string Name
// @optionalParam cloud string null Cloud
// @optionalParam serviceType string ClusterIP The service type for Jupyterhub.
// @optionalParam image string gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1 The image to use for JupyterHub.
// @optionalParam jupyterHubAuthenticator string null The authenticator to use
// @optionalParam notebookPVCMount string /home/jovyan Mount path for PVC. Set empty to disable PVC
// @optionalParam registry string gcr.io The docker image registry for JupyterNotebook.
// @optionalParam repoName string kubeflow-images-public The repository name for JupyterNotebook.
// @optionalParam disks string null Comma separated list of Google persistent disks to attach to jupyter environments.
// @optionalParam gcpSecretName string user-gcp-sa The name of the secret containing service account credentials for GCP
local jupyterhub = import "kubeflow/core/jupyterhub.libsonnet";
jupyterhub.parts(params, env)

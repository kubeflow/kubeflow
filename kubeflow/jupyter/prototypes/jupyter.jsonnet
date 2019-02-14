// @apiVersion 0.1
// @name io.ksonnet.pkg.jupyter
// @description jupyter Component
// @shortDescription jupyter Component
// @param name string Name to give to each of the components
// @optionalParam platform string none supported platforms {none|gke|minikube}
// @optionalParam serviceType string ClusterIP The service type for Jupyter.
// @optionalParam image string gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1 The image to use for Jupyter.
// @optionalParam jupyterHubAuthenticator string null The authenticator to use
// @optionalParam useJupyterLabAsDefault string false Set JupterLab interface as the default
// @optionalParam gcpSecretName string user-gcp-sa The name of the secret containing service account credentials for GCP
// @optionalParam disks string null Comma separated list of Google persistent disks to attach to notebook environments.
// @optionalParam notebookUid string -1 UserId of the host user for minikube local fs mount
// @optionalParam notebookGid string -1 GroupID of the host user for minikube local fs mount
// @optionalParam accessLocalFs string false Set true if mounting a local fs directory that needs to be accessed by Jupyter Notebook in Minikube.
// @optionalParam ui string default The JupyterHub Spawner User Interface
// @optionalParam storageClass string null The storageClass to use for PVC management
// @optionalParam rokSecretName string secret-rok-{username} The name of the secret containing user's credentials for Arrikto Rok

local jupyter = import "kubeflow/jupyter/jupyter.libsonnet";
local instance = jupyter.new(env, params);
instance.list(instance.all)

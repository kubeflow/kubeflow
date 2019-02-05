// @apiVersion 0.1
// @name io.ksonnet.pkg.notebooks
// @description notebooks Component
// @shortDescription notebooks Component
// @param name string Name
// @optionalParam image string gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1 The image to use for the notebook
// @optionalParam authenticator string null The authenticator to use
// @optionalParam pvcMount string /home/jovyan Mount path for PVC. Set empty to disable PVC
// @optionalParam registry string gcr.io The docker image registry for notebook
// @optionalParam repoName string kubeflow-images-public The repository name for the notebook
// @optionalParam disks string null Comma separated list of Google persistent disks to attach to notebook environments.
// @optionalParam uid string -1 UserId of the host user for minikube local fs mount
// @optionalParam gid string -1 GroupID of the host user for minikube local fs mount
// @optionalParam accessLocalFs string false Set true if mounting a local fs directory that needs to be accessed by the notebook in Minikube.
// @optionalParam serviceType string ClusterIP type of service {LoadBalancer, ClusterIP, NodePort}
// @optionalParam servicePort string 80 service port
// @optionalParam targetPort string 8888 container port

local notebooks = import "kubeflow/jupyter/notebooks.libsonnet";
local instance = notebooks.new(env, params);
instance.list(instance.all)

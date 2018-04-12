// @apiVersion 0.1
// @name io.ksonnet.pkg.kubeflow-core
// @description Kubeflow core components
// @shortDescription Kubeflow core components. This currently includes JupyterHub and the TfJob controller.
// @param name string Name to give to each of the components
// @optionalParam namespace string default Namespace
// @optionalParam disks string null Comma separated list of Google persistent disks to attach to jupyter environments.
// @optionalParam cloud string null String identifying the cloud to customize the deployment for.
// @optionalParam tfJobImage string gcr.io/tf-on-k8s-dogfood/tf_operator:v20180117-04425d9-dirty-e3b0c44 The image for the TfJob controller.
// @optionalParam tfDefaultImage string null The default image to use for TensorFlow.
// @optionalParam tfJobUiServiceType string ClusterIP The service type for the UI.
// @optionalParam jupyterHubServiceType string ClusterIP The service type for Jupyterhub.

// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import "k.libsonnet";
local jupyterhub = import "kubeflow/core/jupyterhub.libsonnet";
local tfjob = import "kubeflow/core/tf-job.libsonnet";
local nfs = import "kubeflow/core/nfs.libsonnet";

local name = import "param://name";
local namespace = import "param://namespace";

local cloud = import "param://cloud";

// TODO(jlewi): Make this a parameter
local jupyterHubImage = "gcr.io/kubeflow/jupyterhub:1.0";
local diskParam = import "param://disks";

local diskNames = if diskParam != "null" && std.length(diskParam) > 0 then
  std.split(diskParam, ",")
else [];

local jupyterHubConfigMap = if std.length(diskNames) == 0 then
  jupyterhub.parts(namespace).jupyterHubConfigMap
else jupyterhub.parts(namespace).jupyterHubConfigMapWithVolumes(diskNames);

local tfJobImage = import "param://tfJobImage";
local tfDefaultImage = import "param://tfDefaultImage";
local tfJobUiServiceType = import "param://tfJobUiServiceType";
local jupyterHubServiceType = import "param://jupyterHubServiceType";

// Create a list of the resources needed for a particular disk
local diskToList = function(diskName) [
  nfs.parts(namespace, name,).diskResources(diskName).storageClass,
  nfs.parts(namespace, name,).diskResources(diskName).volumeClaim,
  nfs.parts(namespace, name,).diskResources(diskName).service,
  nfs.parts(namespace, name,).diskResources(diskName).provisioner,
];

local allDisks = std.flattenArrays(std.map(diskToList, diskNames));

local nfsComponents =
  if std.length(allDisks) > 0 then
    [
      nfs.parts(namespace, name).serviceAccount,
      nfs.parts(namespace, name).role,
      nfs.parts(namespace, name).roleBinding,
      nfs.parts(namespace, name).clusterRoleBinding,
    ] + allDisks
  else
    [];

std.prune(k.core.v1.list.new([
  // jupyterHub components
  jupyterHubConfigMap,
  jupyterhub.parts(namespace).jupyterHubService,
  jupyterhub.parts(namespace).jupyterHubLoadBalancer(jupyterHubServiceType),
  jupyterhub.parts(namespace).jupyterHub(jupyterHubImage),
  jupyterhub.parts(namespace).jupyterHubRole,
  jupyterhub.parts(namespace).jupyterHubServiceAccount,
  jupyterhub.parts(namespace).jupyterHubRoleBinding,

  // TfJob controller
  tfjob.parts(namespace).tfJobDeploy(tfJobImage),
  tfjob.parts(namespace).configMap(cloud, tfDefaultImage),
  tfjob.parts(namespace).serviceAccount,
  tfjob.parts(namespace).operatorRole,
  tfjob.parts(namespace).operatorRoleBinding,

  // TfJob controll ui
  tfjob.parts(namespace).ui(tfJobImage),
  tfjob.parts(namespace).uiService(tfJobUiServiceType),
  tfjob.parts(namespace).uiServiceAccount,
  tfjob.parts(namespace).uiRole,
  tfjob.parts(namespace).uiRoleBinding,
] + nfsComponents))

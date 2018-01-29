local params = std.extVar("__ksonnet/params").components["nfs-jupyter"];
// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local jupyter = import "kubeflow/core/jupyterhub.libsonnet";
local tfjob = import "kubeflow/core/tf-job.libsonnet";
local nfs = import "kubeflow/core/nfs.libsonnet";

local name = params.name;
local namespace = params.namespace;

// TODO(jlewi): Make this a parameter
local jupyterHubImage = 'gcr.io/kubeflow/jupyterhub:1.0';
local diskParam = params.disks;

local diskNames = if diskParam != "null" && std.length(diskParam) > 0 then
  std.split(diskParam, ',')
else [];

local jupyterConfigMap = if std.length(diskNames) == 0 then
  jupyter.parts(namespace).jupyterHubConfigMap
else jupyter.parts(namespace).jupyterHubConfigMapWithVolumes(diskNames);

local tfJobImage = params.tfJobImage;

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

// TODO(jlewi): Maybe we should split this into separate components
// for Jupyter and NFS. We always need NFS because its used by our
// Argo workflows. But Jupyter could be optional.
std.prune(k.core.v1.list.new([
  // jupyterHub components
  jupyterConfigMap,
  jupyter.parts(namespace).jupyterHubService,
  jupyter.parts(namespace).jupyterHubLoadBalancer("ClusterIP"),
  jupyter.parts(namespace).jupyterHub(jupyterHubImage),
  jupyter.parts(namespace).jupyterHubRole,
  jupyter.parts(namespace).jupyterHubServiceAccount,
  jupyter.parts(namespace).jupyterHubRoleBinding,
] + nfsComponents))

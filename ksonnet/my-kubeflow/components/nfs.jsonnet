local global = std.extVar("__ksonnet/params").global;
local kubeflowParams = std.extVar("__ksonnet/params").components["kubeflow"];
local params = std.extVar("__ksonnet/params").components["nfs"];
local k = import "k.libsonnet";
local nfs = import "nfs.libsonnet";

local splitDisks = if std.length(params.disks) > 0 then
  std.split(params.disks, ',')
  else [];

// Create a list of the resources needed for a particular disk
local diskToList = function(diskName) [
	nfs.parts(kubeflowParams.namespace, params.name,).diskResources(diskName).storageClass,
	nfs.parts(kubeflowParams.namespace, params.name,).diskResources(diskName).volumeClaim,
	nfs.parts(kubeflowParams.namespace, params.name,).diskResources(diskName).service,
	nfs.parts(kubeflowParams.namespace, params.name,).diskResources(diskName).provisioner];

local allDisks = std.flattenArrays(std.map(diskToList, splitDisks));

// TODO(jlewi): Make this conditional on their being disks.
k.core.v1.list.new(
	if std.length(allDisks) > 0 then
	[nfs.parts(kubeflowParams.namespace, params.name).serviceAccount,
	 nfs.parts(kubeflowParams.namespace, params.name).role,
	 nfs.parts(kubeflowParams.namespace, params.name).roleBinding,
	 nfs.parts(kubeflowParams.namespace, params.name).clusterRoleBinding,] + allDisks
	else 
	[])
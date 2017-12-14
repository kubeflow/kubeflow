local global = std.extVar("__ksonnet/params").global;
local kubeflowParams = std.extVar("__ksonnet/params").components["kubeflow"];
local params = std.extVar("__ksonnet/params").components["nfs"];
local k = import "k.libsonnet";
local nfs = import "nfs.libsonnet";

local splitDisks = if std.length(params.disks) > 0 then
  std.split(params.disks, ',')
  else [];

// TODO(jlewi): Make this conditional on their being disks.
k.core.v1.list.new(
	if std.length(splitDisks) > 0 then
	[nfs.parts(kubeflowParams.namespace, params.name, splitDisks).volumeClaim,
	 nfs.parts(kubeflowParams.namespace, params.name, splitDisks).storageClass,
	 nfs.parts(kubeflowParams.namespace, params.name, splitDisks).service,
	 nfs.parts(kubeflowParams.namespace, params.name, splitDisks).provisioner,
	 nfs.parts(kubeflowParams.namespace, params.name, splitDisks).serviceAccount,
	 nfs.parts(kubeflowParams.namespace, params.name, splitDisks).role,
	 nfs.parts(kubeflowParams.namespace, params.name, splitDisks).roleBinding,
	 nfs.parts(kubeflowParams.namespace, params.name, splitDisks).clusterRoleBinding,]
	else 
	[])
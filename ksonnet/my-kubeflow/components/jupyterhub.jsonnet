local global = std.extVar("__ksonnet/params").global;
local kubeflowParams = std.extVar("__ksonnet/params").components["kubeflow"];
local nfsParams = std.extVar("__ksonnet/params").components["nfs"];
local params = std.extVar("__ksonnet/params").components["jupyterhub"];
local k = import "k.libsonnet";

local jupyter = import "jupyterhub.libsonnet";

local diskNames = if std.length(nfsParams.disks) > 0 then
  std.split(nfsParams.disks, ',')
  else [];

local configMap = if std.length(diskNames) == 0 then
	jupyter.parts(kubeflowParams.namespace).jupyterHubConfigMap
	else jupyter.parts(kubeflowParams.namespace).jupyterHubConfigMapWithVolumes(diskNames);

k.core.v1.list.new([configMap,
                    jupyter.parts(kubeflowParams.namespace).jupyterHubService, 
                    jupyter.parts(kubeflowParams.namespace).jupyterHubLoadBalancer,
                    jupyter.parts(kubeflowParams.namespace).jupyterHub(params.image),
                    jupyter.parts(kubeflowParams.namespace).jupyterHubRole,
                    jupyter.parts(kubeflowParams.namespace).jupyterHubServiceAccount,
                    jupyter.parts(kubeflowParams.namespace).jupyterHubRoleBinding,
                    ])
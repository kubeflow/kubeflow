local params = std.extVar("__ksonnet/params").components["core4"];
// TODO(https://github.com/ksonnet/ksonnet/issues/222): We have to add namespace as an explicit parameter
// because ksonnet doesn't support inheriting it from the environment yet.

local k = import 'k.libsonnet';
local jupyter = import "kubeflow/core/jupyterhub.libsonnet";
local tfjob = import "kubeflow/core/tf-job.libsonnet";

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

// TODO(jlewi): Make this a parameter
local tfJobImage = params.tfJobImage;

std.prune(k.core.v1.list.new([
	// jupyterHub components
	jupyterConfigMap,
    jupyter.parts(namespace).jupyterHubService, 
    jupyter.parts(namespace).jupyterHubLoadBalancer,
    jupyter.parts(namespace).jupyterHub(jupyterHubImage),
    jupyter.parts(namespace).jupyterHubRole,
    jupyter.parts(namespace).jupyterHubServiceAccount,
    jupyter.parts(namespace).jupyterHubRoleBinding,    

    // TfJob controller
    tfjob.parts(namespace).tfJobDeploy(tfJobImage), 
    tfjob.parts(namespace).configMap,
    tfjob.parts(namespace).serviceAccount,
]))

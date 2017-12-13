local global = std.extVar("__ksonnet/params").global;
local params = std.extVar("__ksonnet/params").components["jupyterhub"];
local k = import "k.libsonnet";
// local namespace = params.namespace;
//local namespace = import 'spec://namespace';

// TODO(jlewi): https://github.com/ksonnet/ksonnet/issues/222#issuecomment-351442041 make the namespace
// configurable.
local namespace = "default";








local jupyterHubRoleBinding = {
  "apiVersion": "rbac.authorization.k8s.io/v1beta1", 
  "kind": "RoleBinding", 
  "metadata": {
    "name": "edit-pods", 
    "namespace": namespace,
  }, 
  "roleRef": {
    "apiGroup": "rbac.authorization.k8s.io", 
    "kind": "Role", 
    "name": "edit-pod"
  }, 
  "subjects": [
    {
      "kind": "ServiceAccount", 
      "name": "default", 
      "namespace": "default"
    }
  ]
};

// k.core.v1.list.new([jupyterHubConfigMap, jupyterHub, jupyterHubService, jupyterHubRole, jupyterHubRoleBinding, jupyterHubLoadBalancer])

local jupyter = import "jupyterhub.libsonnet";

k.core.v1.list.new([jupyter.parts(global.namespace).jupyterHubConfigMap,
                    jupyter.parts(global.namespace).jupyterHubService, 
                    jupyter.parts(global.namespace).jupyterHubLoadBalancer,
                    jupyter.parts(global.namespace).jupyterHub(params.image),
                    jupyter.parts(global.namespace).jupyterHubRole])
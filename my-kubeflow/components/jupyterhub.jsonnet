local global = std.extVar("__ksonnet/params").global;
local kubeflowParams = std.extVar("__ksonnet/params").components["kubeflow"];
local params = std.extVar("__ksonnet/params").components["jupyterhub"];
local k = import "k.libsonnet";

local jupyter = import "jupyterhub.libsonnet";

k.core.v1.list.new([jupyter.parts(kubeflowParams.namespace).jupyterHubConfigMap,
                    jupyter.parts(kubeflowParams.namespace).jupyterHubService, 
                    jupyter.parts(kubeflowParams.namespace).jupyterHubLoadBalancer,
                    jupyter.parts(kubeflowParams.namespace).jupyterHub(params.image),
                    jupyter.parts(kubeflowParams.namespace).jupyterHubRole,
                    ])
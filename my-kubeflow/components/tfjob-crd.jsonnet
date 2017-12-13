local global = std.extVar("__ksonnet/params").global;
local kubeflowParams = std.extVar("__ksonnet/params").components["kubeflow"];
local params = std.extVar("__ksonnet/params").components["tfjob-crd"];
local k = import "k.libsonnet";
local tfjob = import "tf-job.libsonnet";

k.core.v1.list.new([tfjob.parts(kubeflowParams.namespace).tfJobDeploy(params.image), 
                    tfjob.parts(kubeflowParams.namespace).configMap,
                    tfjob.parts(kubeflowParams.namespace).serviceAccount,])
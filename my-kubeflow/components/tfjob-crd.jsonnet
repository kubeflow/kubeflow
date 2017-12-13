local global = std.extVar("__ksonnet/params").global;
local params = std.extVar("__ksonnet/params").components["tfjob-crd"];
local k = import "k.libsonnet";
local tfjob = import "tf-job.libsonnet";

k.core.v1.list.new([tfjob.parts(global.namespace).tfJobDeploy(params.image), 
                    tfjob.parts(global.namespace).configMap,
                    tfjob.parts(global.namespace).serviceAccount,])
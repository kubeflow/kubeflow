// @apiVersion 0.1
// @name io.ksonnet.pkg.spartakus
// @description spartakus component for usage collection
// @shortDescription spartakus component for usage collection
// @param name string Name
// @optionalParam usageId string unknown_cluster Optional id to use when reporting usage to kubeflow.org
// @optionalParam reportUsage string false Whether or not to report Kubeflow usage to kubeflow.org.

local spartakus = import "kubeflow/core/spartakus.libsonnet";
local instance = spartakus.new(env, params);
instance.list(instance.all)

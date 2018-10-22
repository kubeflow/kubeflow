// @apiVersion 0.1
// @name io.ksonnet.pkg.projects
// @description projects Component
// @shortDescription projects Component
// @param name string Name

local projects = import "kubeflow/projects/projects.libsonnet";
local instance = projects.new(env, params);
instance.list(instance.all)

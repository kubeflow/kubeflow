// @apiVersion 0.1
// @name io.ksonnet.pkg.pipeline
// @description a Kubeflow pipeline deployment. 
// @shortDescription Kubeflow pipeline
// @param name string Name to give to each of the components
// @optionalParam api_image string gcr.io/ml-pipeline/api-server:0.1.2 API docker image
// @optionalParam scheduledworkflow_image string gcr.io/ml-pipeline/scheduledworkflow:0.1.2 schedule workflow docker image
// @optionalParam persistenceagent_image string gcr.io/ml-pipeline/persistenceagent:0.1.2 persistence agent docker image
// @optionalParam ui_image string gcr.io/ml-pipeline/frontend:0.1.2 UI docker image
// @optionalParam report_usage string false flag to report usage

local k = import "k.libsonnet";
local all = import "kubeflow/pipeline/all.libsonnet";

std.prune(k.core.v1.list.new(all.parts(env, params).all))

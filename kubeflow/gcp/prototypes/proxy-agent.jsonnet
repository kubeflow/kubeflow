// @apiVersion 0.1
// @name io.ksonnet.pkg.proxy-agent
// @description Add inverse proxy agent for Kubeflow. For more details see https://github.com/google/inverting-proxy
// @shortDescription Inverse proxy agent.
// @param name string Name for the component
// @optionalParam image string gcr.io/ml-pipeline/inverse-proxy-agent:0.1.13 The docker image to use

local proxyagent = import "kubeflow/gcp/proxy-agent.libsonnet";
local instance = proxyagent.new(env, params);
instance.list(instance.all)

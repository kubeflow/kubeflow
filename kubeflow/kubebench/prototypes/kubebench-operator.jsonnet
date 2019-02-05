// @apiVersion 0.1
// @name io.ksonnet.pkg.kubebench-operator
// @description Kubebench operator installer
// @shortDescription Kubebench operator installer
// @param name string Name for the component
// @optionalParam image string gcr.io/kubeflow-images-public/kubebench/kubebench-operator:v0.4.0 Image for kubebench operator

local k = import "k.libsonnet";

local kubebenchOperator = import "kubeflow/kubebench/kubebench-operator.libsonnet";

local kubebenchOperatorInstance = kubebenchOperator.new(env, params);
kubebenchOperatorInstance.list(kubebenchOperatorInstance.all)

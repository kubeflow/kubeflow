// @apiVersion 0.1
// @name io.ksonnet.pkg.kubebench-operator
// @description Kubebench operator installer
// @shortDescription Kubebench operator installer
// @param name string Name for the component
// @optionalParam image string docker.io/akado2009/kubebench-controller:latest Image for kubebench operator

local k = import "k.libsonnet";

local kubebenchOperator = import "kubeflow/kubebench/kubebench-operator.libsonnet";

local kubebenchOperatorInstance = kubebenchOperator.new(env, params);
kubebenchOperatorInstance.list(kubebenchOperatorInstance.all)

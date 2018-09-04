// @apiVersion 1
// @name io.ksonnet.pkg.tensorboard
// @description Tensorboard components
// @shortDescription ksonnet components for Tensorboard
// @param name string Name to give to each of the components

local tensorboard = import "kubeflow/core/tensorboard.libsonnet";
tensorboard.new(env, params).list

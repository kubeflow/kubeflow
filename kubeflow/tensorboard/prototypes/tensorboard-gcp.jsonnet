// @apiVersion 1
// @name io.ksonnet.pkg.tensorboard-gcp
// @description Tensorboard components
// @shortDescription ksonnet components for Tensorboard
// @param name string Name to give to each of the components
// @optionalParam logDir string logs Name of the log directory holding the TF events file
// @optionalParam targetPort number 6006 Name of the targetPort
// @optionalParam servicePort number 9000 Name of the servicePort
// @optionalParam serviceType string ClusterIP The service type for Jupyterhub.
// @optionalParam defaultTbImage string tensorflow/tensorflow:1.8.0 default tensorboard image to use
// @optionalParam gcpCredentialSecretName string null Name of the k8s secrets containing gcp credentials

local gcp = import "kubeflow/tensorboard/gcp.libsonnet";
local tensorboard = import "kubeflow/tensorboard/tensorboard.libsonnet";
local instance = tensorboard.new(env, params) + gcp;
instance.list(instance.all)

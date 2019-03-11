// @apiVersion 1
// @name io.ksonnet.pkg.tensorboard-aws
// @description Tensorboard components
// @shortDescription ksonnet components for Tensorboard
// @param name string Name to give to each of the components
// @optionalParam logDir string logs Name of the log directory holding the TF events file
// @optionalParam targetPort number 6006 Name of the targetPort
// @optionalParam servicePort number 9000 Name of the servicePort
// @optionalParam serviceType string ClusterIP The service type for tensorboard service
// @optionalParam defaultTbImage string tensorflow/tensorflow:1.8.0 default tensorboard image to use
// @optionalParam s3Enabled string false Whether or not to use S3
// @optionalParam s3SecretName string null Name of the k8s secrets containing S3 credentials
// @optionalParam s3SecretAccesskeyidKeyName string null Name of the key in the k8s secret containing AWS_ACCESS_KEY_ID
// @optionalParam s3SecretSecretaccesskeyKeyName string null Name of the key in the k8s secret containing AWS_SECRET_ACCESS_KEY
// @optionalParam s3AwsRegion string us-west-1 S3 region
// @optionalParam s3UseHttps string true Whether or not to use https
// @optionalParam s3VerifySsl string true Whether or not to verify https certificates for S3 connections
// @optionalParam s3Endpoint string s3.us-west-1.amazonaws.com URL for your s3-compatible endpoint
// @optionalParam efsEnabled string false Whether or not to use EFS
// @optionalParam efsPvcName string null Name of the Persistent Volume Claim used for EFS
// @optionalParam efsVolumeName string null Name of the Volume to mount to the pod
// @optionalParam efsMountPath string null Where to mount the EFS Volume

local subtype = import "kubeflow/tensorboard/aws.libsonnet";
local basetype = import "kubeflow/tensorboard/tensorboard.libsonnet";
local instance = basetype.new(env, params) + subtype;
instance.list(instance.all)

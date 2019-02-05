// @apiVersion 1
// @name io.ksonnet.pkg.openvino
// @description OpenVINO components
// @shortDescription ksonnet components for OpenVINO
// @param name string Name to give to each of the components
// @optionalParam servicePort number 80 Number of the servicePort
// @optionalParam serviceType string ClusterIP The service type for openVINO service
// @optionalParam targetPort number 80 Number of the targetPort
// @optionalParam registry string gcr.io image registry
// @optionalParam repoPath string constant-cubist-173123/inference_server repo path
// @optionalParam image string openvino-model-server openVINO image
// @optionalParam replicas number 1 Number of replicas in the deployment
// @optionalParam modelStorageType string nfs storage type
// @optionalParam modelName string resnet model name
// @optionalParam pvc string nfs Claimname for the PVC
// @optionalParam pvcMount string /opt/ml Mount path for PVC.

local openvino = import "kubeflow/openvino/openvino.libsonnet";
local instance = openvino.new(env, params);
instance.list(instance.all)

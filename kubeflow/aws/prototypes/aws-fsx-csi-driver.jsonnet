// @apiVersion 0.1
// @name io.ksonnet.pkg.aws-fsx-csi-driver
// @description CSI driver for AWS FSx for Lustre
// @shortDescription FSx CSI driver
// @param name string Name for the component
// @optionalParam namespace string null Namespace for the component
// @optionalParam csiControllerImage string amazon/aws-fsx-csi-driver:latest The CSI controller image to use
// @optionalParam csiProvisionerImage string quay.io/k8scsi/csi-provisioner:v0.4.2 The CSI controller image to use
// @optionalParam csiAttacherImage string quay.io/k8scsi/csi-attacher:v0.4.2 The CSI controller image to use
// @optionalParam csiDriverRegistrarImage string quay.io/k8scsi/driver-registrar:v0.4.2 The CSI node image to use

local aws_fsx_csi_driver = import "kubeflow/aws/aws-fsx-csi-driver.libsonnet";
local instance = aws_fsx_csi_driver.new(env, params);
instance.list(instance.all)

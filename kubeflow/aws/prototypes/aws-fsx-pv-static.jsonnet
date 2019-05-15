// @apiVersion 0.1
// @name io.ksonnet.pkg.aws-fsx-pv-static
// @description Creates PV and PVC based on AWS FSx For Lustre
// @shortDescription Creates PV and PVC based on AWS FSx For Lustre
// @param name string Name for the component
// @optionalParam namespace string null Namespace for the component
// @param fsxId string FSx Lustre File System Id
// @param dnsName string FSx Lustre File System DNSName
// @optionalParam storageCapacity string 1T Storage Capacity
// @optionalParam storageClassName string fsx-default Storage class name.

local aws_fsx_pv_static = import "kubeflow/aws/aws-fsx-pv-static.libsonnet";
local instance = aws_fsx_pv_static.new(env, params);
instance.list(instance.all)

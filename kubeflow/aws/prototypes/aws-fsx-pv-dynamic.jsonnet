// @apiVersion 0.1
// @name io.ksonnet.pkg.aws-fsx-pv-dynamic
// @description Creates PV and PVC based on AWS FSx For Lustre
// @shortDescription Creates PV and PVC based on AWS FSx For Lustre
// @param name string Name for the component
// @param subnetId string FSx Lustre File System subnetId
// @param securityGroupIds string FSx Lustre File System security groups, use comma as delimiter
// @optionalParam storageCapacity string 1T Storage Capacity
// @optionalParam s3ImportPath string null s3 bucket backend storage

local aws_fsx_pv_dynamic = import "kubeflow/aws/aws-fsx-pv-dynamic.libsonnet";
local instance = aws_fsx_pv_dynamic.new(env, params);
instance.list(instance.all)

// @apiVersion 0.1
// @name io.ksonnet.pkg.google-cloud-filestore-pv
// @description Creates PV and PVC based on Google Cloud Filestore NFS
// @shortDescription Creates PV and PVC based on Google Cloud Filestore NFS
// @param name string Name for the component
// @optionalParam storageCapacity string 1T Storage Capacity
// @optionalParam path string /kubeflow Path in NFS server
// @param serverIP string Google Cloud Filestore Server IP
// @optionalParam image string gcr.io/kubeflow-images-public/ubuntu:18.04 The docker image to use

local google_cloud_file_store_pv = import "kubeflow/core/google-cloud-filestore-pv.libsonnet";
local instance = google_cloud_file_store_pv.new(env, params);
instance.list(instance.all)

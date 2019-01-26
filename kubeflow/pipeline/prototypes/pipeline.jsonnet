// @apiVersion 0.1
// @name io.ksonnet.pkg.pipeline
// @description a Kubeflow pipeline deployment.
// @shortDescription Kubeflow pipeline
// @param name string Name to give to each of the components
// @optionalParam apiImage string gcr.io/ml-pipeline/api-server:0.1.7 API docker image
// @optionalParam scheduledWorkflowImage string gcr.io/ml-pipeline/scheduledworkflow:0.1.7 schedule workflow docker image
// @optionalParam persistenceAgentImage string gcr.io/ml-pipeline/persistenceagent:0.1.7 persistence agent docker image
// @optionalParam uiImage string gcr.io/ml-pipeline/frontend:0.1.7 UI docker image
// @optionalParam mysqlImage string mysql:5.6 mysql image
// @optionalParam minioImage string minio/minio:RELEASE.2018-02-09T22-40-05Z minio image
// @optionalParam nfsImage string k8s.gcr.io/volume-nfs:0.8 nfs image
// @optionalParam mysqlPvName string null user provided PV name to host mysql DB
// @optionalParam nfsPvName string null user provided PV name to host NFS
// @optionalParam mysqlPd string null GCE PD name to host mysql DB
// @optionalParam nfsPd string null GCE PD name to host NFS

local k = import "k.libsonnet";
local all = import "kubeflow/pipeline/all.libsonnet";

std.prune(k.core.v1.list.new(all.parts(env, params).all))

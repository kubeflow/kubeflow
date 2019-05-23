// @apiVersion 0.1
// @name io.ksonnet.pkg.argo
// @description Deploy Argo workflow engine
// @shortDescription Argo workflow engine
// @param name string Name to give to the component
// @optionalParam workflowControllerImage string argoproj/workflow-controller:v2.3.0 workflowControllerImage
// @optionalParam uiImage string argoproj/argoui:v2.3.0 uiImage
// @optionalParam executorImage string argoproj/argoexec:v2.3.0 executorImage
// @optionalParam artifactRepositoryKeyPrefix string artifacts artifactRepositoryKeyPrefix
// @optionalParam artifactRepositoryEndpoint string minio-service.kubeflow:9000 artifactRepositoryEndpoint
// @optionalParam artifactRepositoryBucket string mlpipeline artifactRepositoryBucket
// @optionalParam artifactRepositoryInsecure string true artifactRepositoryInsecure
// @optionalParam artifactRepositoryAccessKeySecretName string mlpipeline-minio-artifact artifactRepositoryAccessKeySecretName
// @optionalParam artifactRepositoryAccessKeySecretKey string accesskey artifactRepositoryAccessKeySecretKey
// @optionalParam artifactRepositorySecretKeySecretName string mlpipeline-minio-artifact artifactRepositorySecretKeySecretName
// @optionalParam artifactRepositorySecretKeySecretKey string secretkey artifactRepositorySecretKeySecretKey

local argo = import "kubeflow/argo/argo.libsonnet";
local instance = argo.new(env, params);
instance.list(instance.all)

{
  // Parameters are intended to be late bound.
  params:: {
    apiImage: "gcr.io/ml-pipeline/api-server:0.1.22",
    scheduledWorkflowImage: "gcr.io/ml-pipeline/scheduledworkflow:0.1.22",
    persistenceAgentImage: "gcr.io/ml-pipeline/persistenceagent:0.1.22",
    viewerCrdControllerImage: "gcr.io/ml-pipeline/viewer-crd-controller:0.1.22",
    uiImage: "gcr.io/ml-pipeline/frontend:0.1.22",
    mysqlImage: "mysql:5.6",
    minioImage: "minio/minio:RELEASE.2018-02-09T22-40-05Z",
    nfsImage: "k8s.gcr.io/volume-nfs:0.8",
    mysqlPvName: null,
    minioPvName: null,
    nfsPvName: null,
    mysqlPd: null,
    minioPd: null,
    nfsPd: null,
    injectIstio: "false",
    clusterDomain: "cluster.local",
  },

  parts:: {
    local storage = import "kubeflow/pipeline/storage.libsonnet",
    local nfs = import "kubeflow/pipeline/nfs.libsonnet",
    local minio = import "kubeflow/pipeline/minio.libsonnet",
    local mysql = import "kubeflow/pipeline/mysql.libsonnet",
    local pipeline_apiserver = import "kubeflow/pipeline/pipeline-apiserver.libsonnet",
    local pipeline_scheduledworkflow = import "kubeflow/pipeline/pipeline-scheduledworkflow.libsonnet",
    local pipeline_persistenceagent = import "kubeflow/pipeline/pipeline-persistenceagent.libsonnet",
    local pipeline_viewercrd = import "kubeflow/pipeline/pipeline-viewercrd.libsonnet",
    local pipeline_ui = import "kubeflow/pipeline/pipeline-ui.libsonnet",
    local istio_service = import "kubeflow/pipeline/istio-service.libsonnet",

    local name = $.params.name,
    local namespace = $.params.namespace,
    local apiImage = $.params.apiImage,
    local scheduledWorkflowImage = $.params.scheduledWorkflowImage,
    local persistenceAgentImage = $.params.persistenceAgentImage,
    local viewerCrdControllerImage = $.params.viewerCrdControllerImage,
    local uiImage = $.params.uiImage,
    local nfsImage = $.params.nfsImage,
    local mysqlImage = $.params.mysqlImage,
    local minioImage = $.params.minioImage,
    local mysqlPvName = $.params.mysqlPvName,
    local minioPvName = $.params.minioPvName,
    local nfsPvName = $.params.nfsPvName,
    local mysqlPd = $.params.mysqlPd,
    local minioPd = $.params.minioPd,
    local nfsPd = $.params.nfsPd,
    nfs:: if (nfsPvName != null) || (nfsPd != null) then
             nfs.all(namespace, nfsImage)
           else [],
    local minioPvcName = if (nfsPvName != null) || (nfsPd != null) then "nfs-pvc" else "minio-pvc",
    local injectIstio = $.params.injectIstio,
    local clusterDomain = $.params.clusterDomain,
    all:: minio.all(namespace, minioImage, minioPvcName) +
          mysql.all(namespace, mysqlImage) +
          pipeline_apiserver.all(namespace, apiImage) +
          pipeline_scheduledworkflow.all(namespace, scheduledWorkflowImage) +
          pipeline_persistenceagent.all(namespace, persistenceAgentImage) +
          pipeline_viewercrd.all(namespace, viewerCrdControllerImage) +
          pipeline_ui.all(namespace, uiImage) +
          storage.all(namespace, mysqlPvName, minioPvName, nfsPvName, mysqlPd, minioPd, nfsPd) +
          istio_service.all(namespace, clusterDomain, injectIstio) +
          $.parts.nfs,
  },
}

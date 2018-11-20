{
  parts(_env, _params):: {
    local params = _env + _params,

    local minio = import "kubeflow/pipeline/minio.libsonnet",
    local mysql = import "kubeflow/pipeline/mysql.libsonnet",
    local pipeline_apiserver = import "kubeflow/pipeline/pipeline-apiserver.libsonnet",
    local pipeline_scheduledworkflow = import "kubeflow/pipeline/pipeline-scheduledworkflow.libsonnet",
    local pipeline_persistenceagent = import "kubeflow/pipeline/pipeline-persistenceagent.libsonnet",
    local pipeline_ui = import "kubeflow/pipeline/pipeline-ui.libsonnet",
    local spartakus = import "kubeflow/pipeline/spartakus.libsonnet",

    local name = params.name,
    local namespace = params.namespace,
    local api_image = params.api_image,
    local scheduledworkflow_image = params.scheduledworkflow_image,
    local persistenceagent_image = params.persistenceagent_image,
    local ui_image = params.ui_image,
    local deploy_argo = params.deploy_argo,
    local report_usage = params.report_usage,
    local usage_id = params.usage_id,
    reporting:: if (report_usage == true) || (report_usage == "true") then
                  spartakus.all(namespace,usage_id)
                else [],
    all:: minio.parts(namespace).all +
          mysql.parts(namespace).all +
          pipeline_apiserver.all(namespace,api_image) +
          pipeline_scheduledworkflow.all(namespace,scheduledworkflow_image) +
          pipeline_persistenceagent.all(namespace,persistenceagent_image) +
          pipeline_ui.all(namespace,ui_image) +
          $.parts(_env, _params).reporting,
  },
}

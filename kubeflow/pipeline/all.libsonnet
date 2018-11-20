{
  parts(_env, _params):: {
    local params = _env + _params,

    local minio = import "kubeflow/pipeline/minio.libsonnet",
    local mysql = import "kubeflow/pipeline/mysql.libsonnet",
    local pipeline_apiserver = import "kubeflow/pipeline/pipeline-apiserver.libsonnet",
    local pipeline_scheduledworkflow = import "kubeflow/pipeline/pipeline-scheduledworkflow.libsonnet",
    local pipeline_persistenceagent = import "kubeflow/pipeline/pipeline-persistenceagent.libsonnet",
    local pipeline_ui = import "kubeflow/pipeline/pipeline-ui.libsonnet",

    local name = params.name,
    local namespace = params.namespace,
    local apiImage = params.apiImage,
    local scheduledWorkflowImage = params.scheduledWorkflowImage,
    local persistenceAgentImage = params.persistenceAgentImage,
    local uiImage = params.uiImage,
    all:: minio.parts(namespace).all +
          mysql.parts(namespace).all +
          pipeline_apiserver.all(namespace, apiImage) +
          pipeline_scheduledworkflow.all(namespace, scheduledWorkflowImage) +
          pipeline_persistenceagent.all(namespace, persistenceAgentImage) +
          pipeline_ui.all(namespace, uiImage),
  },
}

{
  local util = import "kubeflow/core/util.libsonnet",

  all(params):: {
      local reportUsageBool = util.toBool(params.reportUsage),
      result:: if reportUsageBool then
        [$.parts(params.namespace).deployment(params.usageId)]
      else [],
    }.result,

  parts(namespace):: {    
    deployment(usageId):: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "spartakus-volunteer",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "spartakus-volunteer",
            },
          },
          spec: {
            containers: [
              {
                image: "gcr.io/google_containers/spartakus-amd64:v1.0.0",
                name: "volunteer",
                command: [
                  "volunteer",
                  "--cluster-id=" + usageId,
                  "--database=https://stats-collector.kubeflow.org",
                ],
              },
            ],
          },
        },
      },
    },  // deployment
  },
}

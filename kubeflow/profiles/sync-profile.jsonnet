// Controller for resource: profiles
// Creates 3 child resources
// - Namespace
// - ResourceQuota
// - Permission
function(request) {
  local apiVersion = "kubeflow.org/v1alpha1",
  local template = request.parent.spec.template,
  local requestsCpu = "requests.cpu",
  local requestsMemory = "requests.memory",
  local requestsGpu = "requests.nvidia.com/gpu",
  local limitsCpu = "limits.cpu",
  local limitsMemory = "limits.memory",
  local children = [
    {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: {
        name: template.metadata.namespace,
      },
    },
    {
      apiVersion: "v1",
      kind: "ResourceQuota",
      metadata: {
        name: template.metadata.quota.name,
        namespace: template.metadata.namespace,
      },
      spec: {
        hard: {
          [requestsCpu]: template.metadata.quota.requests.cpu,
          [requestsMemory]: template.metadata.quota.requests.memory,
          [requestsGpu]: template.metadata.quota.requests.gpu,
          [limitsCpu]: template.metadata.quota.limits.cpu,
          [limitsMemory]: template.metadata.quota.limits.memory,
        },
      },
    },
    {
      apiVersion: "kubeflow.org/v1alpha1",
      kind: "Permission",
      metadata: {
        name: "default",
        namespace: template.metadata.namespace,
      },
      spec: {
        owner: template.spec.owner,
      },
    },
  ],
  children: children,
  status: {
    phase: "Active",
    conditions: [{
      type: "Ready",
    }],
    created: true,
  },
}

// Controller for resource: profiles
// Creates child resource
// - Target
function(request) {
  local apiVersion = "kubeflow.org/v1alpha1",
  local template = request.parent.spec.template,
  local children = [{
    apiVersion: apiVersion,
    kind: "Target",
    metadata: {
      name: template.metadata.name,
      namespace: request.parent.metadata.namespace,
    },
    spec: {
      namespace: template.spec.namespace,
      owner: template.spec.owner,
    },
  }],
  children: children,
  status: {
    phase: "Active",
    conditions: [{
      type: "Ready",
    }],
    created: true,
  },
}

// Controller for resource: profiles
// Creates 2 child resources
// - Namespace
// - Permission
function(request) {
  local apiVersion = "kubeflow.org/v1alpha1",
  local template = request.parent.spec.template,
  local children = [
    {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: {
        name: template.metadata.namespace,
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

// Controller for resource: targets
// Creates 2 child resources
// - Namespace
// - Permission
function(request) {
  local children = [
    {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: {
        name: request.parent.spec.namespace,
        labels: {
          app: request.parent.spec.namespace,
        },
      },
      status: {
        phase: "Pending",
      },
    },
    {
      apiVersion: "kubeflow.org/v1alpha1",
      kind: "Permission",
      metadata: {
        name: request.parent.spec.owner,
        namespace: request.parent.spec.namespace,
      },
      spec: {
        owner: request.parent.spec.owner,
        serviceAccountNamespace: request.parent.metadata.namespace,
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

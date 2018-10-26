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
        name: "permission",
        namespace: request.parent.spec.namespace,
      },
      spec: {
        owner: request.parent.spec.owner,
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
    //debug
    request_parent: request.parent,
    request_children: request.children,
  },
}

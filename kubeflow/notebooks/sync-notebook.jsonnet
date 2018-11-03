// Controller for resource: notebooks
// Creates 2 child resources
// - Service
// - Pod
function(request) {
  local template = request.parent.spec.template,
  local children = [
    {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: notebook_mapping",
              "prefix: /" + template.metadata.name + "/",
              "rewrite: /" + template.metadata.name + "/",
              "timeout_ms: 300000",
              "service: " + template.metadata.name + "." + template.metadata.namespace,
            ]),
        },
        name: template.metadata.name,
        namespace: template.metadata.namespace,
      },
      spec: {
        selector: {
          app: "notebook",
        },
        ports: [
          {
            port: 80,
            protocol: "TCP",
            targetPort: 8888,
          },
        ],
        type: "ClusterIP",
      },
    },
    {
      apiVersion: "v1",
      kind: "Pod",
      metadata: template.metadata,
      spec: template.spec,
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

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
              "name: notebook-mapping",
              "prefix: /user/" + template.metadata.name + "/",
              "rewrite: /",
              "timeout_ms: 300000",
              "add_request_headers:",
              "  token:" + request.parent.spec.token,
              "service: notebook." + template.metadata.namespace,
            ]),
        },
        labels: {
          app: "notebook",
        },
        name: "notebook",
        namespace: template.metadata.namespace,
      },
      spec: {
        ports: [
          {
            port: 80,
            protocol: "TCP",
            targetPort: 8082,
          },
        ],
        selector: {
          app: "notebook",
        },
        sessionAffinity: "None",
        type: "ClusterIP",
      },
    },
    {
      apiVersion: "v1",
      kind: "Pod",
      metadata: {
        labels: {
          component: "singleuser-server",
          app: "notebook",
        },
        name: template.metadata.name,
        namespace: template.metadata.namespace,
      },
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

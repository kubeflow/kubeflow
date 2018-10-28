// Controller for resource: notebooks
// Creates 2 child resources
// - Service
// - Pod
function(request) {
  local params = request.parent.metadata.annotations,
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
              "prefix: /user/",
              "rewrite: /user/",
              "timeout_ms: 300000",
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
        },
        name: "notebook",
        namespace: template.metadata.namespace,
      },
      spec: {
        containers: [
          {
            args: [
              "start-singleuser.sh",
              '--ip="0.0.0.0"',
              "--port=8888",
              "--allow-root",
            ],
            image: params.image,
          },
        ],
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
    //request_parent: request.parent,
    //request_children: request.children,
  },
}

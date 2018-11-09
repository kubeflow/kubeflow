// Controller for resource: notebooks
// Creates 2 child resources
// - Service
// - Pod
function(request) {
  local templateSpec = request.parent.spec.template.spec,
  local podTemplateSpec = {
    containers: [
      {
        args: [
          "start.sh",
          "jupyter",
          "lab",
          "--LabApp.token=''",
          "--LabApp.allow_remote_access='True'",
          "--LabApp.allow_root='True'",
          "--LabApp.ip='*'",
          "--LabApp.base_url=/" + request.parent.metadata.namespace + "/" + request.parent.metadata.name + "/",
          "--port=8888",
          "--no-browser",
        ],
        env: [
          {
            name: "JUPYTER_ENABLE_LAB",
            value: "true",
          },
        ],
        image: "gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.3.0",
        imagePullPolicy: "IfNotPresent",
        name: "notebook",
        ports: [
          {
            containerPort: 8888,
            name: "notebook-port",
            protocol: "TCP",
          },
        ],
        resources: {
          requests: {
            cpu: "500m",
            memory: "1Gi",
          },
        },
        workingDir: "/home/jovyan",
      },
    ],
    restartPolicy: "Always",
    serviceAccount:: {},
    serviceAccountName:: {},
  },

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
              "name: " + request.parent.metadata.namespace + "_" + request.parent.metadata.name + "_mapping",
              "prefix: /" + request.parent.metadata.namespace + "/" + request.parent.metadata.name,
              "rewrite: /" + request.parent.metadata.namespace + "/" + request.parent.metadata.name,
              "timeout_ms: 300000",
              "service: " + request.parent.metadata.name + "." + request.parent.metadata.namespace,
            ]),
        },
        name: request.parent.metadata.name,
        namespace: request.parent.metadata.namespace,
      },
      spec: {
        selector: {
          app: request.parent.metadata.name,
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
      metadata: {
        name: request.parent.metadata.name,
        namespace: request.parent.metadata.namespace,
        labels: {
          app: request.parent.metadata.name,
        },
      },
      spec: templateSpec + podTemplateSpec,
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

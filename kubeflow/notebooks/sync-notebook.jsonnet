// Controller for resource: notebooks
// Creates 2 child resources
// - Service
// - Pod
function(request) {
  local template = request.parent.spec.template,
  local podTemplateSpec = {
    containers: [
      {
        args: [
          'start.sh',
          'jupyter',
          'lab',
          "--LabApp.token=''",
          "--LabApp.allow_remote_access='True'",
          "--LabApp.allow_root='True'",
          "--LabApp.ip='*'",
          "--LabApp.base_url='/'${name}",
          '--port=8888',
          '--no-browser',
        ],
        env: [
          {
            name: 'JUPYTER_ENABLE_LAB',
            value: 'true',
          },
        ],
        image: 'gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.3.0',
        imagePullPolicy: 'IfNotPresent',
        name: 'notebook',
        ports: [
          {
            containerPort: 8888,
            name: 'notebook-port',
            protocol: 'TCP',
          },
        ],
        resources: {
          requests: {
            cpu: '500m',
            memory: '1Gi',
          },
        },
        workingDir: '/home/jovyan',
      },
    ],
    ttlSecondsAfterFinished: 300,
    restartPolicy: 'Always',
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
              "name: " + template.metadata.name + "_mapping",
              "prefix: /" + template.metadata.name,
              "rewrite: /" + template.metadata.name,
              "timeout_ms: 300000",
              "service: " + template.metadata.name + "." + template.metadata.namespace,
            ]),
        },
        name: template.metadata.name,
        namespace: template.metadata.namespace,
      },
      spec: {
        selector: {
          app: template.metadata.name,
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
      spec: template.spec + podTemplateSpec,
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

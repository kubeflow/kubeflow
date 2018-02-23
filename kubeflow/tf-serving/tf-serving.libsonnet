local k = import 'k.libsonnet';
local deployment = k.extensions.v1beta1.deployment;
local container = deployment.mixin.spec.template.spec.containersType;
local storageClass = k.storage.v1beta1.storageClass;
local service = k.core.v1.service;
local networkPolicy = k.extensions.v1beta1.networkPolicy;
local networkSpec = networkPolicy.mixin.spec;

{
  parts:: {
    deployment:: {
      local defaults = {
        imagePullPolicy:: "IfNotPresent",
        resources:: {
          requests: {
            memory: "1Gi",
            cpu: "1",
          },
          limits: {
            memory: "4Gi",
            cpu: "4",
          },
        },
      },

      modelService(name, namespace, labels={ app: name }): {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          labels: labels,
          name: name,
          namespace: namespace,
        },
        spec: {
          ports: [
            {
              name: "tf-serving",
              port: 9000,
              targetPort: 9000,
            },
            {
              name: "tf-serving-proxy",
              port: 8000,
              targetPort: 8000,
            },
          ],
          selector: labels,
          type: "ClusterIP",
        },
      },

      modelServer(name, namespace, modelPath, modelServerImage, httpProxyImage=0, labels={ app: name },):
        // TODO(jlewi): Allow the model to be served from a PVC.
        local volume = {
          name: "redis-data",
          namespace: namespace,
          emptyDir: {},
        };
        base(name, namespace, modelPath, modelServerImage, httpProxyImage, labels),

      local base(name, namespace, modelPath, modelServerImage, httpProxyImage, labels) =
        {
          apiVersion: "extensions/v1beta1",
          kind: "Deployment",
          metadata: {
            name: name,
            namespace: namespace,
            labels: labels,
          },
          spec: {
            template: {
              metadata: {
                labels: labels,
              },
              spec: {
                containers: [
                  {
                    name: name,
                    image: modelServerImage,
                    imagePullPolicy: defaults.imagePullPolicy,
                    command: ["/usr/bin/tensorflow_model_server"],
                    args: [
                      "--port=9000",
                      "--model_name=" + name,
                      "--model_base_path=" + modelPath,
                    ],
                    env: [],
                    ports: [
                      {
                        containerPort: 9000,
                      },
                    ],
                    // TODO(jlewi): We should add readiness and liveness probes. I think the blocker is that
                    // model-server doesn't have something we can use out of the box.
                    resources: defaults.resources,
                  },
                  if httpProxyImage != 0 then
                    {
                      name: name + "-http-proxy",
                      image: httpProxyImage,
                      imagePullPolicy: defaults.imagePullPolicy,
                      command: [
                        "python",
                        "/usr/src/app/server.py",
                        "--port=8000",
                        "--rpc_port=9000",
                        "--rpc_timeout=10.0",
                      ],
                      env: [],
                      ports: [
                        {
                          containerPort: 8000,
                        },
                      ],
                      resources: defaults.resources,
                    },
                ],
                // See:  https://github.com/kubeflow/kubeflow/tree/master/components/k8s-model-server#set-the-user-optional
                // The is user and group should be defined in the Docker image.
                // Per best practices we don't run as the root user.
                securityContext: {
                  runAsUser: 1000,
                  fsGroup: 1000,
                },
              },
            },
          },
        },
    },
  },
}

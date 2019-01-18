local echoServer = import "kubeflow/common/echo-server.libsonnet";
local testSuite = import "kubeflow/common/testsuite.libsonnet";

local params = {
  name: "echo-server",
  image: "gcr.io/kubeflow-images-staging/echo-server:v20180628-44f08d31",
};
local env = {
  namespace: "kubeflow",
};

local instance = echoServer.new(env, params);

local testCases = [
  {
    actual: instance.parts.service,
    expected: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        annotations: {
          "getambassador.io/config": "---\napiVersion: ambassador/v0\nkind:  Mapping\nname: echo-server-mapping\nprefix: /echo-server\nrewrite: /\nservice: echo-server.kubeflow",
        },
        labels: {
          app: "echo-server",
        },
        name: "echo-server",
        namespace: "kubeflow",
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 8080,
          },
        ],
        selector: {
          app: "echo-server",
        },
        type: "ClusterIP",
      },
    },
  },
  {
    actual: instance.parts.deployment,
    expected: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "echo-server",
        namespace: "kubeflow",
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "echo-server",
            },
          },
          spec: {
            containers: [
              {
                image: "gcr.io/kubeflow-images-staging/echo-server:v20180628-44f08d31",
                name: "app",
                ports: [
                  {
                    containerPort: 8080,
                  },
                ],
                readinessProbe: {
                  httpGet: {
                    path: "/headers",
                    port: 8080,
                  },
                  initialDelaySeconds: 5,
                  periodSeconds: 30,
                },
              },
            ],
          },
        },
      },
    },
  },
];

testSuite.run(testCases)

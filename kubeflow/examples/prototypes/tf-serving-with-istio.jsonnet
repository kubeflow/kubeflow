// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving-with-istio
// @description tf-serving-with-istio
// @shortDescription tf-serving-with-istio
// @param name string Name to give to each of the components

local k = import "k.libsonnet";

local namespace = "default";
local appName = import "param://name";
local modelBasePath = "gs://kubeflow-models/inception";
local modelName = "inception";
local image = "gcr.io/kubeflow-images-public/tf-model-server-cpu:v20180327-995786ec";
local httpProxyImage = "gcr.io/kubeflow-images-public/tf-model-server-http-proxy:v20180327-995786ec";

local routeRule = {
  apiVersion: "config.istio.io/v1alpha2",
  kind: "RouteRule",
  metadata: {
    name: appName,
    namespace: namespace,
  },
  spec: {
    destination: {
      name: "tf-serving",
    },
    precedence: 0,
    route: [
      {
        labels: {
          version: "v1",
        },
      },
    ],
  },
};

local service = {
  apiVersion: "v1",
  kind: "Service",
  metadata: {
    annotations: {
      "getambassador.io/config":
        std.join("\n", [
          "---",
          "apiVersion: ambassador/v0",
          "kind:  Mapping",
          "name: tfserving-mapping-tf-serving-get",
          "prefix: /models/tf-serving/",
          "rewrite: /",
          "method: GET",
          "service: tf-serving." + namespace + ":8000",
          "---",
          "apiVersion: ambassador/v0",
          "kind:  Mapping",
          "name: tfserving-mapping-tf-serving-post",
          "prefix: /models/tf-serving/",
          "rewrite: /model/tf-serving:predict",
          "method: POST",
          "service: tf-serving." + namespace + ":8000",
        ]),
    },
    labels: {
      app: appName,
    },
    name: appName,
    namespace: namespace,
  },
  spec: {
    ports: [
      {
        name: "grpc-tf-serving",
        port: 9000,
        targetPort: 9000,
      },
      {
        name: "http-tf-serving-proxy",
        port: 8000,
        targetPort: 8000,
      },
    ],
    selector: {
      app: appName,
    },
    type: "ClusterIP",
  },
};

local deployment = {
  apiVersion: "extensions/v1beta1",
  kind: "Deployment",
  metadata: {
    labels: {
      app: appName,
    },
    name: appName,
    namespace: namespace,
  },
  spec: {
    template: {
      metadata: {
        labels: {
          app: appName,
        },
        annotations: {
          "sidecar.istio.io/inject": "true",
        },
      },
      spec: {
        containers: [
          {
            args: [
              "/usr/bin/tensorflow_model_server",
              "--port=9000",
              "--model_name=" + modelName,
              "--model_base_path=" + modelBasePath,
            ],
            image: image,
            imagePullPolicy: "IfNotPresent",
            name: "inception",
            ports: [
              {
                containerPort: 9000,
              },
            ],
            resources: {
              limits: {
                cpu: "4",
                memory: "4Gi",
              },
              requests: {
                cpu: "1",
                memory: "1Gi",
              },
            },
          },
          {
            name: appName + "-http-proxy",
            image: httpProxyImage,
            imagePullPolicy: "IfNotPresent",
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
            resources: {
              requests: {
                memory: "1Gi",
                cpu: "1",
              },
              limits: {
                memory: "4Gi",
                cpu: "4",
              },
            },
            securityContext: {
              runAsUser: 1000,
              fsGroup: 1000,
            },
          },
        ],
      },
    },
  },
};

k.core.v1.list.new([
  routeRule,
  service,
  deployment,
])

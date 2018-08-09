// @apiVersion 0.1
// @name io.ksonnet.pkg.tf-serving-simple
// @description tf-serving-simple
// @shortDescription tf-serving-simple
// @param name string Name to give to each of the components

local k = import "k.libsonnet";

local namespace = "default";
local appName = import "param://name";
local modelBasePath = "gs://kubeflow-models/inception";
local modelName = "inception";
local image = "gcr.io/kubeflow-images-public/tf-model-server-cpu:v20180327-995786ec";

local service = {
  apiVersion: "v1",
  kind: "Service",
  metadata: {
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
        ],
      },
    },
  },
};

k.core.v1.list.new([
  service,
  deployment,
])

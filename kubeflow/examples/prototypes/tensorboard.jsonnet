// @apiVersion 0.1
// @name io.ksonnet.pkg.tensorboard
// @description Prototype for Tensorboard deployments
// @shortDescription Prototype for Tensorboard deployments
// @param name string Name to give to the tensorboard deployment
// @param logDir string The path containing your TF events files.
// @optionalParam image string tensorflow/tensorflow:1.8.0  The Docker image to use.

local k = import "k.libsonnet";

local name = params.name;
local namespace = env.namespace;
local service = {
  apiVersion: "v1",
  kind: "Service",
  metadata: {
    name: name + "-tb",
    namespace: env.namespace,
    annotations: {
      "getambassador.io/config":
        std.join("\n", [
          "---",
          "apiVersion: ambassador/v0",
          "kind:  Mapping",
          "name: " + name + "_mapping",
          "prefix: /tensorboard/" + name + "/",
          "rewrite: /",
          "service: " + name + "-tb." + namespace,
        ]),
    },  //annotations
  },
  spec: {
    ports: [
      {
        name: "http",
        port: 80,
        targetPort: 80,
      },
    ],
    selector: {
      app: "tensorboard",
      "tb-job": name,
    },
  },
};

local deployment = {
  apiVersion: "apps/v1beta1",
  kind: "Deployment",
  metadata: {
    name: name + "-tb",
    namespace: env.namespace,
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          app: "tensorboard",
          "tb-job": name,
        },
        name: name,
        namespace: namespace,
      },
      spec: {
        containers: [
          {
            command: [
              "/usr/local/bin/tensorboard",
              "--logdir=" + params.logDir,
              "--port=80",
            ],
            image: params.image,
            name: "tensorboard",
            ports: [
              {
                containerPort: 80,
              },
            ],
          },
        ],
      },
    },
  },
};

std.prune(k.core.v1.list.new([service, deployment]))

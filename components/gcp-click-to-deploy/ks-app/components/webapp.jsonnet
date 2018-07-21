local env = std.extVar("__ksonnet/environments");
local params = std.extVar("__ksonnet/params").components.webapp;

local k = import "k.libsonnet";
local argo = import "argo.libsonnet";
local namespace = params.namespace;

local version = "v2.1.0";

local appService = {
  apiVersion: "v1",
  kind: "Service",
  metadata: {
    name: "gcp-deploy",
    namespace: env.namespace,
  },
  spec: {
    ports: [
      {
        port: 80,
        targetPort: 3000,
      },
    ],
    selector: {
      app: "gcp-deploy",
    },
    type: "NodePort",
  },
};

local deployment = {
  apiVersion: "apps/v1beta2",
  kind: "Deployment",
  metadata: {
    name: "gcp-deploy",
    namespace: env.namespace,
  },
  spec: {
    selector: {
      matchLabels: {
        app: "gcp-deploy",
      },
    },
    template: {
      metadata: {
        labels: {
          app: "gcp-deploy",
        },
      },
      spec: {
        containers: [
          {
            name: "app",
            image: params.image,
          },
        ],
      },
    },
  },
};  // deployment

std.prune(k.core.v1.list.new([
  deployment,
  appService,
]))

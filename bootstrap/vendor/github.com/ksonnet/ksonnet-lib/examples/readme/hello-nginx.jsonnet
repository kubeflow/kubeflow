// This expects to be run with `jsonnet -J <path to ksonnet-lib>`
local k = import "ksonnet.beta.2/k.libsonnet";

// Specify the import objects that we need
local container = k.extensions.v1beta1.deployment.mixin.spec.template.spec.containersType;
local containerPort = container.portsType;
local deployment = k.extensions.v1beta1.deployment;

local targetPort = 80;
local podLabels = {app: "nginx"};

local nginxContainer =
  container.new("nginx", "nginx:1.7.9") +
  container.ports(containerPort.containerPort(targetPort));

local nginxDeployment =
  deployment.new("nginx-deployment", 2, nginxContainer, podLabels);

k.core.v1.list.new(nginxDeployment)

local k = import "k.libsonnet";

local params = {
  version: "v1beta2",
  name: "appName",
  replicas: 3,
  containerPort: 80,
  image: "nginx:latest",
  labels: {app: "customName"},
};

// defining the deployment version as a variable means you potentially have the ability to
// set versions in params. It also means a single prototype can support multiple versions of a
// resource.
local deploymentVersion = params.version;

// container creates a container object
local container = function(version, name, image, containerPort)
  // create a local variable with our resource
  local deployment = k.apps[deploymentVersion].deployment;

  local containersType = deployment.mixin.spec.template.spec.containersType;
  local portsType = containersType.portsType;

  local port = portsType.withContainerPort(containerPort);

  containersType
    .withName(name)
    .withImage(image)
    .withPorts(port);


// createDeployment is our function for creating a deployment
local createDeployment = function(version, name, containers, podLabels={}, replicas=1)
  // create a local variable with our resource
  local deployment = k.apps[version].deployment;

  local labels = {app: name} + podLabels;
  local metadata = deployment.mixin.metadata.withName(name);
  local spec = deployment.mixin.spec.withReplicas(replicas);
  local templateSpec = spec.template.spec.withContainers(containers);
  local templateMetadata = spec.template.metadata.withLabels(labels);

  deployment
    .new()
    + metadata
    + spec
    + templateSpec
    + templateMetadata;


local containers = [
  container(deploymentVersion, params.name, params.image, params.containerPort),
];

// The createDeployment function allows authors to generate the objects they would like rather
// than being confined to what is generated in ksonnet-lib.
local appDeployment = createDeployment(
  deploymentVersion,
  params.name,
  containers,
  podLabels=params.labels,
  replicas=2);

k.core.v1.list.new([appDeployment])

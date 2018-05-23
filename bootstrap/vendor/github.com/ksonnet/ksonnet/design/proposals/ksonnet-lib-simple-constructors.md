# Deprecate ksonnet lib custom constructors

Status: Pending

Version: Alpha

## Abstract

We want to deprecate the custom resource constructors (described [below](#use-cases)) in [ksonnet-lib](https://github.com/ksonnet/ksonnet-lib). Instead of the custom constructors, developers will be encouraged to use the builder pattern to construct their objects. Constructors can be reintroduced in hand rolled libraries upstream.

## Motivation

* `ksonnet-lib` includes constructors for popular resources. In a few cases, these constructors are incomplete or include items which may not be required. The incompleteness and inconsistencies are a barrier to adoption because developers do not know how to get started in a productive way.
* `ksonnet-lib` should be a direct translation of the OpenAPI swagger.json.

## Goal

* Developers should be able to construct objects using the builder pattern rather than constructors.
* Upstream projects should have a clean slate to build abstraction upon.

## Non Goals

The following are related but not the goals of this specific proposal

* Create upstream projects that implement constructors (e.g. v1 Deployment)

## Proposal

The change would be introducing a new constructor for all resources.

```jsonnet
group:: {
  v1:: {
    local apiVersion = {apiVersion: "group/v1"},
    kind:: {
      local kind = {kind: "Kind"},
      init() :: apiVersion + kind,
    },
  },
}
```

Many of the existing constructors adhere to this format. This change would make sure all resources have a constructor that only includes the `apiVersion` and `kind`.

## User Experience

### Use Cases

To deprecate the existing the existing custom constructors a new constructor will be introduced, `init()`. Currently, to construct a v1beta2 Deployment, you have to do the following:

```js
local params = {
  name: "appName",
  replicas: 3,
  containerPort: 80,
  image: "nginx:latest",
  labels: {app: "customName"},
};

local deployment = k.apps.v1beta2.deployment;
local container = k.apps.v1beta2.deployment.mixin.spec.template.spec.containersType;
local containerPort = container.portsType;
local targetPort = params.containerPort;

local appDeployment = deployment
  .new(
    params.name,
    params.replicas,
    container
      .new(params.name, params.image)
      .withPorts(containerPort.new(targetPort)),
    params.labels
);
```

This snippet illustrates a few issues:

* The constructor requires items that aren't required by the spec.
* The constructor requires a specific order.

Instead of the custom constructor, instead you can construct using init using the following:

```js
local params = {
  name: "appName",
  replicas: 3,
  containerPort: 80,
  image: "nginx:latest",
  labels: {app: "customName"},
};

// defining the deployment version as a variable means you potentially have the ability to
// set versions in params. It also means a single prototype can support multiple versions of a
// resource.
local deploymentVersion = "v1beta1";

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
  local deployment = k.apps[deploymentVersion].deployment;

  local labels = {app: name} + podLabels;
  local metadata = deployment.mixin.metadata.withName(name);
  local spec = deployment.mixin.spec.withReplicas(replicas);
  local templateSpec = spec.template.spec.withContainers(containers);
  local templateMetadata = spec.template.metadata.withLabels(labels);

  deployment
    .init()
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
```

### Backwards compatibility

This change will not immediately affect any of the current usages of `ksonnet-lib`. To begin, the inclusion of `init()` constructors in resources will be the only change. Only after a period of time (at most two releases of ksonnet) will existing constructors be removed.

## Alternatives considered

Instead of introducing new constructors, missing constructors can be be added to `ksonnet-lib`. Also, resources with incomplete, missing, or extra required items could fixed as well. To accomplish this, more custom logic would need to be inserted in the `ksonnet-lib` generator. The custom logic has the potential to make generator more complex and that is something we want to avoid.

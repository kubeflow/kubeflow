# Explicit Environment Metadata

Status: Approved

Version: Alpha

## Abstract

We want to introduce functionality to enable the use of environment metadata
(ex: cluster namespace, Server URI) in prototype and component manifest files.

## Motivation

* Environments have configured metadata, such as the cluster’s namespace or
server URI. Users [have requested](https://github.com/ksonnet/ksonnet/issues/222)
that these fields be referenceable in both prototypes and component files.

Example:

Consider the following
[nginx prototype](https://github.com/ksonnet/parts/blob/9d78d6bb445d530d5b927656d2293d4f12654608/incubator/nginx/examples/nginx.jsonnet)
where the namespace is currently hardcoded:

```jsonnet
local k = import 'k.libsonnet';
local nginx = import '../nginx.libsonnet';

local namespace = "dev-alex";
local appName = "nginx-app";

k.core.v1.list.new([
  nginx.parts.deployment.withServerBlock(namespace, appName),
  nginx.parts.service(namespace, appName),
  nginx.parts.serverBlockConfigMap(namespace, appName),
])
```
 
This example does not lend well to the ksonnet desired model where components
are environment agnostic; meaning a component should not need information on
which environment the resulting Kubernetes Objects will be deployed to. Yet,
it is unavoidable that these component / prototype configurations may need to
reference a namespace, server URI, or other metadata.

## Goals

* Encourage behavior for component and prototype manifests to be
  environment-agnostic.
  Example: It is encouraged to write
  `nginx.parts.service(env.namespace, appName)`, but not
  `local namespace = "foo"` or `if (env.namespace == "foo") ... else ...`.
* Component and prototype manifests should be able to refer to environment
  metadata fields, such as the environment namespace in the form of
  `env.namespace`.
* Environment fields should be evaluated at run-time depending on which
  environment the user is trying to deploy to.
  Example: If the user had a `prod` environment configured to the namespace
  `prod-ns`, running `ks apply prod` should evaluate `env.namespace` to the
  value `prod-ns`.
* Produce a second version of existing prototypes without hard-coded namespace
  values.

## Non Goals

* Access to a specific environment's metadata. 
  Example: There should not be access to an attribute like
  `env.prod.namespace`. The evaluation of `env.namespace` should happen on
  `apply`, `diff`, or other ks functionalities that operate on an environment.
* This proposal does not suggest to reveal the environment metadata as a part
  of the `ks param` operations. Environment metadata will remain discrete from
  component parameters. Meaning, users are currently able to discover
  differences in component parameters through the use of the ksonnet CLI.
  Running `ks param diff <env-one> <env-two>` will output differences in
  component parameters, such as replica count, between the two environments,
  however will not output differences in environment metadata such as the
  namespace.

## Proposal

### Fundamentals

The change will behave similarly to how parameters operate in component and
prototype manifests.

Components created on the `generate` command will introduce the following line
to the top of the component manifest [1]:

`local env = std.extVar("__ksonnet/env");`

Namespace, Server URI, and other environment metadata attributes can then be
accessed using `env.namespace` and `env.server`, respectively.

For example, the components generated from the nginx prototype in the
Motivation section above may appear as:

```jsonnet
local env = std.extVar("__ksonnet/env");

local k = import 'k.libsonnet';
local nginx = import '../nginx.libsonnet';

local appName = "nginx-app";

k.core.v1.list.new([
  nginx.parts.deployment.withServerBlock(env.namespace, appName),
  nginx.parts.service(env.namespace, appName),
  nginx.parts.serverBlockConfigMap(env.namespace, appName),
])
```

The corresponding prototype manifest would appear as:

```jsonnet
local k = import 'k.libsonnet';
local nginx = import '../nginx.libsonnet';

local appName = "nginx-app";

k.core.v1.list.new([
  nginx.parts.deployment.withServerBlock(import 'env://namespace', appName),
  nginx.parts.service(import 'env://namespace', appName),
  nginx.parts.serverBlockConfigMap(import 'env://namespace', appName),
])
```

ksonnet would translate `import 'env://namespace'` prototype snippets to
`env.namespace` during the `generate` command. 

Note: This proposal does not prevent users from writing such things as:

```jsonnet
if env.namespace == "foo" then
  ...
else
  ...
```

However, this is similar to type checking in Java using `instanceof`. It is
not encouraged, but not disallowed. This can be discouraged through tutorials
and documentation of proper use cases.

[1] On commands where ksonnet interacts with the server (`apply <env>`,
`delete <env>`, etc.), the `std.ExtVar("__ksonnet/env")` line will import the
correct environment attributes; determined by ksonnet at run-time based on the
environment the user specified in the command.

### Version 2 Core Prototypes

A version 2 of the existing system prototypes and prototypes in the
[incubator registry](https://github.com/ksonnet/parts/tree/master/incubator)
will need to be provided. 

These version 2 prototypes will remove any hard-coded namespace or other
environment metadata values to use the proposal from the Fundamentals section
above.

The prototypes need to be versioned to support backwards compatibility.
Ex: a user running ksonnet 0.8.0 would not be able to use version 2 prototypes.

## Backwards Compatibility

This change will not break compatibility with previous ksonnet versions for
existing prototypes and components. However, if a user is running a ksonnet
version <= 0.8.0 and attempts to use a newer prototype or component manifest
(that contain the above changes), an error will occur.

Existing component and prototype manifests are also able to use the new
features.

If existing components wish to use the `env.namespace` attribute, it can do so
by adding the following line to the top of the manifest:

`local env = std.extVar("__ksonnet/env");`

If existing prototypes wish to use the the namespace attribute, it can do so
using the key-phrase `import 'env://namespace'` in place of where it expects
the attribute. This is similar to how prototype parameters are currently
imported. ksonnet will translate `import 'env://namespace'` to `env.namespace`
when a component is generated from the prototype.

## Alternatives Considered

## Environment metadata as parameters

As opposed to `env.namespace`, environment metadata can be added to the
existing params model, i.e. `params.global.namespace`.

The following would be added to the `param.libsonnet` files:

```jsonnet
{
  global:: {
    namespace:: std.extVar("__ksonnet/env/namespace"),
  },
}
```

The primary reason we are considering the proposal's approach in-place of this
alternative is that this alternative introduces multiple areas of mutability.
Meaning, it would be possible to set namespaces in both an environment's
`spec.json` file and in the `param.libsonnet` files. In the event of conflicts,
it is not immediately obvious which file's attribute should be prioritized.

Advantages of this alternative involve being able to vary namespaces across
components within the same environment. It also emables the user to display
environment metadata in `ks param diff` or `ks param list`. However, this
approach also comes with the disadvantage of muddying the definition of an
environment (that currently has strongly defined metadata).
Environment differences and metadata is still visible through the `ks env list`
command.


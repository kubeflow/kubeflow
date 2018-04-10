# Tutorial

One of the strengths of **ksonnet** mixin libraries is their ability
to allow users to separate a Kubernetes application into several
modular components.

For example, a team might split into application and logging subteams.
Rather than writing a single YAML file that combines them into a
single Kubernetes app, the logging team can simply write a mixin
library that the application team can use to add logging to their
Kubernetes application definition.

In this tutorial, we will explore how such libraries are constructed,
using a mixin library for [fluentd][fluentd] (hosted in the official
[mixins repository][fluentd-mixin]). Specifically, we see how one team
writing an app using [Elasticsearch][elastic] can use the Fluentd
mixin library to use easily configure Fluentd to tail the
Elasticsearch logs and pass them Kibana to be rendered in a dashboard.

For more information about Elasticsearch and Kibana, see [the Elastic
website][elastic]. For `fluentd`, see [the Fluentd website][fluentd].

## Requirements to build your own mixins

If you want to build your own mixin libraries, or write **ksonnet**
using the built-in mixins, you need to perform the following tasks.
For details, see the [readme][readme].

* Install **Jsonnet**, version 0.9.4 or later
* Clone the **ksonnet** repository locally
* Install and configure the Visual Studio Code extension (optional)
* Create a test Kubernetes cluster

## Architecture and design

The idea of the application is for Elasticsearch to emit logs to
standard out, and for Fluentd to tail those logs and send them to
Kibana for rendering.

In Kubernetes, accessing the `Pod` logs involves:

* Giving the Fluentd container permissions to access the `Pod` logs,
   and
* Appending volume mounts that contain the `Pod` logs, to the Fluentd
   container, so that it can access them.

We'll walk through the key parts of the files in example in detail,
but at a high level this implementation is broken up as:

* A `DaemonSet` that causes Fluentd to run once on every machine, so
  that it can tail `Pod` logs for Elasticsearch running anywhere in
  the cluster.

  On its own, this `DaemonSet` only contains the core Fluentd
  application definition. For example, it has no permissions to access
  (_e.g._) `Pod` Logs, or the volume mounts required to access them.
* A separate mixin that defines the `VolumeMounts` and `Volumes` that
  the `DaemonSet` requires to access the `Pod` Logs.
* A separate mixin that configures the access permissions for the
  `DaemonSet`
* The RBAC objects that the cluster administrator must send to the
  cluster so that the `ServiceAccount` associated with Fluentd can be
  granted permission to obtain the `Pod` logs.

The power of this approach lies in its separation of concerns: an
application developer can define the `DaemonSet`, while a cluster
admin can define the access permissions that this or any other
`DaemonSet` might require. The `DaemonSet` or the access permissions
can be modified as needed without requiring a complete cluster
reconfiguration. Indeed, as the `DaemonSet` mixin demonstrates, the
details of the `DaemonSet` (in this case, the `Volumes` and
`VolumeMounts`) can also be adjusted without having to touch the base
`DaemonSet` definition.

### Define mixins to configure access to pod logs

Let's look at how we can decouple the pieces of a complete Fluentd
configuration, so that your logging team, for example, can write just
the core of a Fluentd DaemonSet, and then write a **ksonnet** library
that lets you customize key details of the configuration as needed.

`fluentd-es-ds.jsonnet` defines a basic DaemonSet, and then adds access permissions to it.

```javascript
// daemonset
local ds =
  // base daemonset
  fluentd.app.daemonSetBuilder.new(config) +
  // add configuration for access to pod logs
  fluentd.app.daemonSetBuilder.configureForPodLogs(config);

 // create access permissions for pod logs
 local rbacObjs = fluentd.app.admin.rbacForPodLogs(config);
```

Note that our base DaemonSet can't do anything. It doesn't know where
the pod logs that it needs are -- it needs Volumes and VolumeMounts to
provide this information. It also needs access permissions, provided
with RBAC. So we add these items separately. Let's look more closely
at the advantages of this approach.

In `fluentd.libsonnet`, we define the `daemonSet` mixin. Here is where
we start to see the real power of **ksonnet** mixins at work. This
mixin specifies the VolumeMounts and Volumes that Fluentd requires
separately from the DaemonSet definition itself. This approach lets us
decouple application definitions from deployment details.

Note particularly in the following snippet the `containerSelector`
parameter to `addHostMountedPodLogs`. We pass this function to
`ds.mapContainers` to iterate over our containers (in this case, our
Fluentd containers) and add the VolumeMounts that they need. (The
details of the pod logs have also been abstracted away to their own
function.)

```javascript
  mixin:: {
    daemonSet:: {
      // Takes two volume names and produces a
      // mixin that mounts the Kubernetes pod logs into a set of
      // containers specified by `containerSelector`.
      addHostMountedPodLogs(
        varlogName, podlogsName, containerSelector=function(c) true
      )::
        local podLogs = $.parts.podLogs(varlogName, podlogsName);

        // Add volume to DaemonSet.
        ds.mixin.spec.template.spec.volumes([
          podLogs.varLogVolume,
          podLogs.podLogVolume,
        ]) +

        // Iterate over a specified set of containers to add the VolumeMounts
        ds.mapContainers(
          function (c)
            if containerSelector(c)
            then
              c + container.volumeMounts([
                podLogs.varLogMount,
                podLogs.podLogMount,
              ])
            else c),
    },
  },
```

The `daemonSetBuilder` that we used to create the DaemonSet calls our
`daemonSet` mixin, and also defines the `configureForPodLogs` function
that the DaemonSet needs. But the DaemonSet itself, from our first
code snippet, doesn't need to know any of these details:

```javascript
    daemonSetBuilder:: {
      new(config):: {
        toArray():: [self.daemonSet],
        daemonSet:: $.parts.daemonSet(config.daemonSet.name, config.container.name, config.container.tag, config.namespace)
      },

      // access configuration
      configureForPodLogs(
        config,
        varlogVolName="varlog",
        podLogsVolName="varlibdockercontainers",
      )::
        {} + {
          daemonSet+::
            $.mixin.daemonSet.addHostMountedPodLogs(
              varlogVolName,
              podLogsVolName,
              $.util.containerNameInSet(config.container.name)) +
            // RBAC and service account
            ds.mixin.spec.template.spec.serviceAccountName(config.rbac.accountName)
        },
    },
```

In the previous snippet, we notice that we're specifying a Service
Account, and RBAC is involved. It's time to define our RBAC objects so
that our Fluentd access permissions mean something.

### Define RBAC objects

We define RBAC objects separately so that they can be managed
independently of the rest of the cluster configuration. This approach
lets cluster admins and application developers work independently.
Your cluster admins can determine and define access permissions that
can be applied to application configurations with a few lines of code.

Defining access permissions in Kubernetes requires definition of the
RBAC objects that are encapsulated in this definition (from
`fluentd.libsonnet`).

```javascript
    admin:: {
      rbacForPodLogs(config)::
        $.parts.rbac(config.rbac.accountName, config.namespace),
    },
```

Let's unpack this snippet.

`fluentd.libsonnet` also defines all the required RBAC objects. Note
especially that we abstract the attributes of the Service Account
separately and assign their values in a separate `config` object. This
approach lets us make sure that the correct Service Account is
appropriately associated with all required objects.

```javascript
    rbac(name, namespace)::
      local metadata = svcAccount.mixin.metadata.name(name) +
        svcAccount.mixin.metadata.namespace(namespace);

      local hcServiceAccount = svcAccount.new() +
        metadata;

      local hcClusterRole =
        clRole.new() +
        metadata +
        clRole.rules(
          rule.new() +
          rule.apiGroups("*") +
          rule.resources(["pods", "nodes"]) +
          rule.verbs(["list", "watch"])
        );

      local hcClusterRoleBinding =
        clRoleBinding.new() +
        metadata +
        clRoleBinding.mixin.roleRef.apiGroup("rbac.authorization.k8s.io") +
        clRoleBinding.mixin.roleRef.name(name) +
        clRoleBinding.mixin.roleRef.mixinInstance({kind: "ClusterRole"}) +
        clRoleBinding.subjects(
          subject.new() +
          subject.name(name) +
          subject.namespace(namespace)
          {kind: "ServiceAccount"}
        );

```

In `fluentd-es-ds.jsonnet` we define our config thus:

```javascript
local config = {
  namespace:: "elasticsearch",
  container:: {
    name:: "fluentd-es",
    tag:: "1.22",
  },
  daemonSet:: {
    name:: "fluentd-es-v1.22",
  },
  rbac:: {
    accountName:: "fluentd-serviceaccount"
  },
};
```

The relevant fields here are `namespace` and `AccountName`, which we
pass as the arguments that our RBAC snippet needs when it calls the
`rbac` function.

## Wrap it all up

Here's where we started, with our simple DaemonSet, its pod logging,
and its access permissions. But now you've seen what's going on
underneath -- not just how the functions for adding pod logs and
permissions are clearly separated, but how we can customize them as
needed without having to rewrite the entire configuration.

```javascript
// daemonset
local ds =
  // base daemonset
  fluentd.app.daemonSetBuilder.new(config) +
  // add configuration for access to pod logs
  fluentd.app.daemonSetBuilder.configureForPodLogs(config);

 // create access permissions for pod logs
 local rbacObjs = fluentd.app.admin.rbacForPodLogs(config);
```

## Explore further

The GitHub example directory also includes the generated JSON files.
Examine them to help understand the details of how **ksonnet**'s
decomposition and abstraction are compiled into complete
configurations.

As you start to write your own custom mixins, look also at how we
break down the basic **ksonnet** imports into smaller component
objects for easier manipulation.

And feel free to contribute your own examples to our mixins
repository!

[readme]: ../readme.md "ksonnet readme"
[fluentd-mixin]: https://github.com/ksonnet/mixins/tree/master/incubator/fluentd
[fluentd]: http://www.fluentd.org/architecture
[elastic]: https://www.elastic.co/products

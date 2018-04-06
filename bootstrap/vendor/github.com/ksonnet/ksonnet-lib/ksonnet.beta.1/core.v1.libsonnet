{
  local apiVersion = {apiVersion: "v1"},
  local defaultMetadata(name, namespace) = {metadata: $.v1.objectMeta.name(name) + $.v1.objectMeta.namespace(namespace)},
  types:: {
    uID:: {
    },
    unixGroupID:: {
    },
    unixUserID:: {
    },
  },
  v1:: {
    aPIResource:: {
      local kind = {kind: "APIResource"},
      default(name, singularName, namespaced, verbs)::
        kind +
      {
        name: name,
        namespaced: namespaced,
        shortNames: [],
        singularName: singularName,
        verbs: if std.type(verbs) == "array" then verbs else [verbs],
      },
      // name is the plural name of the resource.
      name(name):: {name: name},
      // namespaced indicates if a resource is namespaced or not.
      namespaced(namespaced):: {namespaced: namespaced},
      // shortNames is a list of suggested short names of the resource.
      shortNames(shortNames):: if std.type(shortNames) == "array" then {shortNames+: shortNames} else {shortNames+: [shortNames]},
      // singularName is the singular name of the resource.  This allows clients to handle plural and singular opaquely. The singularName is more correct for reporting status on a single item and both singular and plural are allowed from the kubectl CLI interface.
      singularName(singularName):: {singularName: singularName},
      // verbs is a list of supported kube verbs (this includes get, list, watch, create, update, patch, delete, deletecollection, and proxy)
      verbs(verbs):: if std.type(verbs) == "array" then {verbs+: verbs} else {verbs+: [verbs]},
    },
    aPIResourceList:: {
      local kind = {kind: "APIResourceList"},
      default(groupVersion, resources)::
        apiVersion +
        kind +
      {
        groupVersion: groupVersion,
        resources: if std.type(resources) == "array" then resources else [resources],
      },
      // groupVersion is the group and version this APIResourceList is for.
      groupVersion(groupVersion):: {groupVersion: groupVersion},
      // resources contains the name of the resources and if they are namespaced.
      resources(resources):: if std.type(resources) == "array" then {resources+: resources} else {resources+: [resources]},
    },
    aWSElasticBlockStoreVolumeSource:: {
      default(volumeID)::
      {
        volumeID: volumeID,
      },
      // Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
      fsType(fsType):: {fsType: fsType},
      // The partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).
      partition(partition):: {partition: partition},
      // Specify "true" to force and set the ReadOnly property in VolumeMounts to "true". If omitted, the default is "false". More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
      readOnly(readOnly):: {readOnly: readOnly},
      // Unique ID of the persistent disk resource in AWS (Amazon EBS volume). More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
      volumeID(volumeID):: {volumeID: volumeID},
    },
    affinity:: {
      default()::
      {
        nodeAffinity: {},
        podAffinity: {},
        podAntiAffinity: {},
      },
      // Describes node affinity scheduling rules for the pod.
      nodeAffinity(nodeAffinity):: {nodeAffinity+: nodeAffinity},
      // Describes pod affinity scheduling rules (e.g. co-locate this pod in the same node, zone, etc. as some other pod(s)).
      podAffinity(podAffinity):: {podAffinity+: podAffinity},
      // Describes pod anti-affinity scheduling rules (e.g. avoid putting this pod in the same node, zone, etc. as some other pod(s)).
      podAntiAffinity(podAntiAffinity):: {podAntiAffinity+: podAntiAffinity},
      mixin:: {
        nodeAffinity:: {
          local nodeAffinity(mixin) = {nodeAffinity+: mixin},
          preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution):: nodeAffinity($.v1.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution)),
          requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution):: nodeAffinity($.v1.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution)),
        },
        podAffinity:: {
          local podAffinity(mixin) = {podAffinity+: mixin},
          preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution):: podAffinity($.v1.podAffinity.preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution)),
          requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution):: podAffinity($.v1.podAffinity.requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution)),
        },
        podAntiAffinity:: {
          local podAntiAffinity(mixin) = {podAntiAffinity+: mixin},
          preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution):: podAntiAffinity($.v1.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution)),
          requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution):: podAntiAffinity($.v1.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution)),
        },
      },
    },
    attachedVolume:: {
      default(name, devicePath)::
      {
        devicePath: devicePath,
        name: name,
      },
      // DevicePath represents the device path where the volume should be available
      devicePath(devicePath):: {devicePath: devicePath},
      // Name of the attached volume
      name(name):: {name: name},
    },
    azureDataDiskCachingMode:: {
    },
    azureDataDiskKind:: {
    },
    azureDiskVolumeSource:: {
      local kind = {kind: "AzureDiskVolumeSource"},
      default(diskName, diskURI)::
        kind +
      {
        cachingMode: {},
        diskName: diskName,
        diskURI: diskURI,
        kind: {},
      },
      // Host Caching mode: None, Read Only, Read Write.
      cachingMode(cachingMode):: {cachingMode+: cachingMode},
      // The Name of the data disk in the blob storage
      diskName(diskName):: {diskName: diskName},
      // The URI the data disk in the blob storage
      diskURI(diskURI):: {diskURI: diskURI},
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
      fsType(fsType):: {fsType: fsType},
      // Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
      readOnly(readOnly):: {readOnly: readOnly},
    },
    azureFileVolumeSource:: {
      default(secretName, shareName)::
      {
        secretName: secretName,
        shareName: shareName,
      },
      // Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
      readOnly(readOnly):: {readOnly: readOnly},
      // the name of secret that contains Azure Storage Account Name and Key
      secretName(secretName):: {secretName: secretName},
      // Share Name
      shareName(shareName):: {shareName: shareName},
    },
    binding:: {
      local kind = {kind: "Binding"},
      default(name, target, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        target: target,
      },
      // The target object that you want to bind to the standard object.
      target(target):: {target+: target},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        target:: {
          local target(mixin) = {target+: mixin},
          fieldPath(fieldPath):: target($.v1.objectReference.fieldPath(fieldPath)),
          name(name):: target($.v1.objectReference.name(name)),
          namespace(namespace):: target($.v1.objectReference.namespace(namespace)),
          resourceVersion(resourceVersion):: target($.v1.objectReference.resourceVersion(resourceVersion)),
          uid(uid):: target($.v1.objectReference.uid(uid)),
        },
      },
    },
    capabilities:: {
      default()::
      {
        add: [],
        drop: [],
      },
      // Added capabilities
      add(add):: if std.type(add) == "array" then {add+: add} else {add+: [add]},
      // Removed capabilities
      drop(drop):: if std.type(drop) == "array" then {drop+: drop} else {drop+: [drop]},
    },
    capability:: {
    },
    cephFSVolumeSource:: {
      default(monitors)::
      {
        monitors: if std.type(monitors) == "array" then monitors else [monitors],
        secretRef: {},
      },
      // Required: Monitors is a collection of Ceph monitors More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
      monitors(monitors):: if std.type(monitors) == "array" then {monitors+: monitors} else {monitors+: [monitors]},
      // Optional: Used as the mounted root, rather than the full Ceph tree, default is /
      path(path):: {path: path},
      // Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
      readOnly(readOnly):: {readOnly: readOnly},
      // Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
      secretFile(secretFile):: {secretFile: secretFile},
      // Optional: SecretRef is reference to the authentication secret for User, default is empty. More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
      secretRef(secretRef):: {secretRef+: secretRef},
      // Optional: User is the rados user name, default is admin More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
      user(user):: {user: user},
      mixin:: {
        secretRef:: {
          local secretRef(mixin) = {secretRef+: mixin},
          name(name):: secretRef($.v1.localObjectReference.name(name)),
        },
      },
    },
    cinderVolumeSource:: {
      default(volumeID)::
      {
        volumeID: volumeID,
      },
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
      fsType(fsType):: {fsType: fsType},
      // Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
      readOnly(readOnly):: {readOnly: readOnly},
      // volume id used to identify the volume in cinder More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
      volumeID(volumeID):: {volumeID: volumeID},
    },
    componentCondition:: {
      default(type, status)::
      {
        status: status,
        type: type,
      },
      // Condition error code for a component. For example, a health check error code.
      errorCondition(errorCondition):: {"error": errorCondition},
      // Message about the condition for a component. For example, information about a health check.
      message(message):: {message: message},
      // Status of the condition for a component. Valid values for "Healthy": "True", "False", or "Unknown".
      status(status):: {status: status},
      // Type of condition for a component. Valid value: "Healthy"
      type(type):: {type: type},
    },
    componentStatus:: {
      local kind = {kind: "ComponentStatus"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        conditions: [],
      },
      // List of component conditions observed
      conditions(conditions):: if std.type(conditions) == "array" then {conditions+: conditions} else {conditions+: [conditions]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
      },
    },
    componentStatusList:: {
      local kind = {kind: "ComponentStatusList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // List of ComponentStatus objects.
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    configMap:: {
      local kind = {kind: "ConfigMap"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        data: {},
      },
      // Data contains the configuration data. Each key must consist of alphanumeric characters, '-', '_' or '.'.
      data(data):: {data+: data},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
      },
    },
    configMapEnvSource:: {
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the ConfigMap must be defined
      optional(optional):: {optional: optional},
    },
    configMapKeySelector:: {
      default(key)::
      {
        key: key,
      },
      // The key to select.
      key(key):: {key: key},
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the ConfigMap or it's key must be defined
      optional(optional):: {optional: optional},
    },
    configMapList:: {
      local kind = {kind: "ConfigMapList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // Items is the list of ConfigMaps.
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    configMapProjection:: {
      default()::
      {
        items: [],
      },
      // If unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the ConfigMap or it's keys must be defined
      optional(optional):: {optional: optional},
    },
    configMapVolumeSource:: {
      default()::
      {
        items: [],
      },
      // Optional: mode bits to use on created files by default. Must be a value between 0 and 0777. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
      defaultMode(defaultMode):: {defaultMode: defaultMode},
      // If unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the ConfigMap or it's keys must be defined
      optional(optional):: {optional: optional},
    },
    container:: {
      default(name)::
      {
        args: [],
        command: [],
        env: [],
        envFrom: [],
        lifecycle: {},
        livenessProbe: {},
        name: name,
        ports: [],
        readinessProbe: {},
        resources: {},
        securityContext: {},
        volumeMounts: [],
      },
      // Arguments to the entrypoint. The docker image's CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
      args(args):: if std.type(args) == "array" then {args+: args} else {args+: [args]},
      // Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
      command(command):: if std.type(command) == "array" then {command+: command} else {command+: [command]},
      // List of environment variables to set in the container. Cannot be updated.
      env(env):: if std.type(env) == "array" then {env+: env} else {env+: [env]},
      // List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.
      envFrom(envFrom):: if std.type(envFrom) == "array" then {envFrom+: envFrom} else {envFrom+: [envFrom]},
      // Docker image name. More info: https://kubernetes.io/docs/concepts/containers/images
      image(image):: {image: image},
      // Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
      imagePullPolicy(imagePullPolicy):: {imagePullPolicy: imagePullPolicy},
      // Actions that the management system should take in response to container lifecycle events. Cannot be updated.
      lifecycle(lifecycle):: {lifecycle+: lifecycle},
      // Periodic probe of container liveness. Container will be restarted if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
      livenessProbe(livenessProbe):: {livenessProbe+: livenessProbe},
      // Name of the container specified as a DNS_LABEL. Each container in a pod must have a unique name (DNS_LABEL). Cannot be updated.
      name(name):: {name: name},
      // List of ports to expose from the container. Exposing a port here gives the system additional information about the network connections a container uses, but is primarily informational. Not specifying a port here DOES NOT prevent that port from being exposed. Any port which is listening on the default "0.0.0.0" address inside a container will be accessible from the network. Cannot be updated.
      ports(ports):: if std.type(ports) == "array" then {ports+: ports} else {ports+: [ports]},
      // Periodic probe of container service readiness. Container will be removed from service endpoints if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
      readinessProbe(readinessProbe):: {readinessProbe+: readinessProbe},
      // Compute Resources required by this container. Cannot be updated. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
      resources(resources):: {resources+: resources},
      // Security options the pod should run with. More info: https://kubernetes.io/docs/concepts/policy/security-context/ More info: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/security_context.md
      securityContext(securityContext):: {securityContext+: securityContext},
      // Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.
      stdin(stdin):: {stdin: stdin},
      // Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false
      stdinOnce(stdinOnce):: {stdinOnce: stdinOnce},
      // Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.
      terminationMessagePath(terminationMessagePath):: {terminationMessagePath: terminationMessagePath},
      // Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.
      terminationMessagePolicy(terminationMessagePolicy):: {terminationMessagePolicy: terminationMessagePolicy},
      // Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.
      tty(tty):: {tty: tty},
      // Pod volumes to mount into the container's filesystem. Cannot be updated.
      volumeMounts(volumeMounts):: if std.type(volumeMounts) == "array" then {volumeMounts+: volumeMounts} else {volumeMounts+: [volumeMounts]},
      // Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.
      workingDir(workingDir):: {workingDir: workingDir},
      mixin:: {
        lifecycle:: {
          local lifecycle(mixin) = {lifecycle+: mixin},
          postStart(postStart):: lifecycle($.v1.lifecycle.postStart(postStart)),
          preStop(preStop):: lifecycle($.v1.lifecycle.preStop(preStop)),
        },
        livenessProbe:: {
          local livenessProbe(mixin) = {livenessProbe+: mixin},
          exec(exec):: livenessProbe($.v1.probe.exec(exec)),
          failureThreshold(failureThreshold):: livenessProbe($.v1.probe.failureThreshold(failureThreshold)),
          httpGet(httpGet):: livenessProbe($.v1.probe.httpGet(httpGet)),
          initialDelaySeconds(initialDelaySeconds):: livenessProbe($.v1.probe.initialDelaySeconds(initialDelaySeconds)),
          periodSeconds(periodSeconds):: livenessProbe($.v1.probe.periodSeconds(periodSeconds)),
          successThreshold(successThreshold):: livenessProbe($.v1.probe.successThreshold(successThreshold)),
          tcpSocket(tcpSocket):: livenessProbe($.v1.probe.tcpSocket(tcpSocket)),
          timeoutSeconds(timeoutSeconds):: livenessProbe($.v1.probe.timeoutSeconds(timeoutSeconds)),
        },
        readinessProbe:: {
          local readinessProbe(mixin) = {readinessProbe+: mixin},
          exec(exec):: readinessProbe($.v1.probe.exec(exec)),
          failureThreshold(failureThreshold):: readinessProbe($.v1.probe.failureThreshold(failureThreshold)),
          httpGet(httpGet):: readinessProbe($.v1.probe.httpGet(httpGet)),
          initialDelaySeconds(initialDelaySeconds):: readinessProbe($.v1.probe.initialDelaySeconds(initialDelaySeconds)),
          periodSeconds(periodSeconds):: readinessProbe($.v1.probe.periodSeconds(periodSeconds)),
          successThreshold(successThreshold):: readinessProbe($.v1.probe.successThreshold(successThreshold)),
          tcpSocket(tcpSocket):: readinessProbe($.v1.probe.tcpSocket(tcpSocket)),
          timeoutSeconds(timeoutSeconds):: readinessProbe($.v1.probe.timeoutSeconds(timeoutSeconds)),
        },
        resources:: {
          local resources(mixin) = {resources+: mixin},
          limits(limits):: resources($.v1.resourceRequirements.limits(limits)),
          requests(requests):: resources($.v1.resourceRequirements.requests(requests)),
        },
        securityContext:: {
          local securityContext(mixin) = {securityContext+: mixin},
          capabilities(capabilities):: securityContext($.v1.securityContext.capabilities(capabilities)),
          privileged(privileged):: securityContext($.v1.securityContext.privileged(privileged)),
          readOnlyRootFilesystem(readOnlyRootFilesystem):: securityContext($.v1.securityContext.readOnlyRootFilesystem(readOnlyRootFilesystem)),
          runAsNonRoot(runAsNonRoot):: securityContext($.v1.securityContext.runAsNonRoot(runAsNonRoot)),
          runAsUser(runAsUser):: securityContext($.v1.securityContext.runAsUser(runAsUser)),
          seLinuxOptions(seLinuxOptions):: securityContext($.v1.securityContext.seLinuxOptions(seLinuxOptions)),
        },
      },
    },
    containerImage:: {
      default(names)::
      {
        names: if std.type(names) == "array" then names else [names],
      },
      // Names by which this image is known. e.g. ["gcr.io/google_containers/hyperkube:v1.0.7", "dockerhub.io/google_containers/hyperkube:v1.0.7"]
      names(names):: if std.type(names) == "array" then {names+: names} else {names+: [names]},
      // The size of the image in bytes.
      sizeBytes(sizeBytes):: {sizeBytes: sizeBytes},
    },
    containerPort:: {
      default(containerPort)::
      {
        containerPort: containerPort,
      },
      // Number of port to expose on the pod's IP address. This must be a valid port number, 0 < x < 65536.
      containerPort(containerPort):: {containerPort: containerPort},
      // What host IP to bind the external port to.
      hostIP(hostIP):: {hostIP: hostIP},
      // Number of port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536. If HostNetwork is specified, this must match ContainerPort. Most containers do not need this.
      hostPort(hostPort):: {hostPort: hostPort},
      // If specified, this must be an IANA_SVC_NAME and unique within the pod. Each named port in a pod must have a unique name. Name for the port that can be referred to by services.
      name(name):: {name: name},
      // Protocol for port. Must be UDP or TCP. Defaults to "TCP".
      protocol(protocol):: {protocol: protocol},
    },
    containerState:: {
      default()::
      {
        running: {},
        terminated: {},
        waiting: {},
      },
      // Details about a running container
      running(running):: {running+: running},
      // Details about a terminated container
      terminated(terminated):: {terminated+: terminated},
      // Details about a waiting container
      waiting(waiting):: {waiting+: waiting},
      mixin:: {
        running:: {
          local running(mixin) = {running+: mixin},
          startedAt(startedAt):: running($.v1.containerStateRunning.startedAt(startedAt)),
        },
        terminated:: {
          local terminated(mixin) = {terminated+: mixin},
          containerID(containerID):: terminated($.v1.containerStateTerminated.containerID(containerID)),
          exitCode(exitCode):: terminated($.v1.containerStateTerminated.exitCode(exitCode)),
          finishedAt(finishedAt):: terminated($.v1.containerStateTerminated.finishedAt(finishedAt)),
          message(message):: terminated($.v1.containerStateTerminated.message(message)),
          reason(reason):: terminated($.v1.containerStateTerminated.reason(reason)),
          signal(signal):: terminated($.v1.containerStateTerminated.signal(signal)),
          startedAt(startedAt):: terminated($.v1.containerStateTerminated.startedAt(startedAt)),
        },
        waiting:: {
          local waiting(mixin) = {waiting+: mixin},
          message(message):: waiting($.v1.containerStateWaiting.message(message)),
          reason(reason):: waiting($.v1.containerStateWaiting.reason(reason)),
        },
      },
    },
    containerStateRunning:: {
      // Time at which the container was last (re-)started
      startedAt(startedAt):: {startedAt: startedAt},
    },
    containerStateTerminated:: {
      default(exitCode)::
      {
        exitCode: exitCode,
      },
      // Container's ID in the format 'docker://<container_id>'
      containerID(containerID):: {containerID: containerID},
      // Exit status from the last termination of the container
      exitCode(exitCode):: {exitCode: exitCode},
      // Time at which the container last terminated
      finishedAt(finishedAt):: {finishedAt: finishedAt},
      // Message regarding the last termination of the container
      message(message):: {message: message},
      // (brief) reason from the last termination of the container
      reason(reason):: {reason: reason},
      // Signal from the last termination of the container
      signal(signal):: {signal: signal},
      // Time at which previous execution of the container started
      startedAt(startedAt):: {startedAt: startedAt},
    },
    containerStateWaiting:: {
      // Message regarding why the container is not yet running.
      message(message):: {message: message},
      // (brief) reason the container is not yet running.
      reason(reason):: {reason: reason},
    },
    containerStatus:: {
      default(name, ready, restartCount, image, imageID)::
      {
        image: image,
        imageID: imageID,
        lastState: {},
        name: name,
        ready: ready,
        restartCount: restartCount,
        state: {},
      },
      // Container's ID in the format 'docker://<container_id>'.
      containerID(containerID):: {containerID: containerID},
      // The image the container is running. More info: https://kubernetes.io/docs/concepts/containers/images
      image(image):: {image: image},
      // ImageID of the container's image.
      imageID(imageID):: {imageID: imageID},
      // Details about the container's last termination condition.
      lastState(lastState):: {lastState+: lastState},
      // This must be a DNS_LABEL. Each container in a pod must have a unique name. Cannot be updated.
      name(name):: {name: name},
      // Specifies whether the container has passed its readiness probe.
      ready(ready):: {ready: ready},
      // The number of times the container has been restarted, currently based on the number of dead containers that have not yet been removed. Note that this is calculated from dead containers. But those containers are subject to garbage collection. This value will get capped at 5 by GC.
      restartCount(restartCount):: {restartCount: restartCount},
      // Details about the container's current condition.
      state(state):: {state+: state},
      mixin:: {
        lastState:: {
          local lastState(mixin) = {lastState+: mixin},
          running(running):: lastState($.v1.containerState.running(running)),
          terminated(terminated):: lastState($.v1.containerState.terminated(terminated)),
          waiting(waiting):: lastState($.v1.containerState.waiting(waiting)),
        },
        state:: {
          local state(mixin) = {state+: mixin},
          running(running):: state($.v1.containerState.running(running)),
          terminated(terminated):: state($.v1.containerState.terminated(terminated)),
          waiting(waiting):: state($.v1.containerState.waiting(waiting)),
        },
      },
    },
    daemonEndpoint:: {
      default(Port)::
      {
        Port: Port,
      },
      // Port number of the given endpoint.
      Port(Port):: {Port: Port},
    },
    deleteOptions:: {
      local kind = {kind: "DeleteOptions"},
      default()::
        apiVersion +
        kind +
      {
        preconditions: {},
        propagationPolicy: {},
      },
      // The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
      gracePeriodSeconds(gracePeriodSeconds):: {gracePeriodSeconds: gracePeriodSeconds},
      // Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the "orphan" finalizer will be added to/removed from the object's finalizers list. Either this field or PropagationPolicy may be set, but not both.
      orphanDependents(orphanDependents):: {orphanDependents: orphanDependents},
      // Must be fulfilled before a deletion is carried out. If not possible, a 409 Conflict status will be returned.
      preconditions(preconditions):: {preconditions+: preconditions},
      // Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy.
      propagationPolicy(propagationPolicy):: {propagationPolicy+: propagationPolicy},
      mixin:: {
        preconditions:: {
          local preconditions(mixin) = {preconditions+: mixin},
          uid(uid):: preconditions($.v1.preconditions.uid(uid)),
        },
      },
    },
    deletionPropagation:: {
    },
    downwardAPIProjection:: {
      default()::
      {
        items: [],
      },
      // Items is a list of DownwardAPIVolume file
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
    },
    downwardAPIVolumeFile:: {
      default(path)::
      {
        fieldRef: {},
        path: path,
        resourceFieldRef: {},
      },
      // Required: Selects a field of the pod: only annotations, labels, name and namespace are supported.
      fieldRef(fieldRef):: {fieldRef+: fieldRef},
      // Optional: mode bits to use on this file, must be a value between 0 and 0777. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
      mode(mode):: {mode: mode},
      // Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
      path(path):: {path: path},
      // Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
      resourceFieldRef(resourceFieldRef):: {resourceFieldRef+: resourceFieldRef},
      mixin:: {
        fieldRef:: {
          local fieldRef(mixin) = {fieldRef+: mixin},
          fieldPath(fieldPath):: fieldRef($.v1.objectFieldSelector.fieldPath(fieldPath)),
        },
        resourceFieldRef:: {
          local resourceFieldRef(mixin) = {resourceFieldRef+: mixin},
          containerName(containerName):: resourceFieldRef($.v1.resourceFieldSelector.containerName(containerName)),
          divisor(divisor):: resourceFieldRef($.v1.resourceFieldSelector.divisor(divisor)),
          resource(resource):: resourceFieldRef($.v1.resourceFieldSelector.resource(resource)),
        },
      },
    },
    downwardAPIVolumeSource:: {
      default()::
      {
        items: [],
      },
      // Optional: mode bits to use on created files by default. Must be a value between 0 and 0777. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
      defaultMode(defaultMode):: {defaultMode: defaultMode},
      // Items is a list of downward API volume file
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
    },
    emptyDirVolumeSource:: {
      // What type of storage medium should back this directory. The default is "" which means to use the node's default medium. Must be an empty string (default) or Memory. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
      medium(medium):: {medium: medium},
    },
    endpointAddress:: {
      default(ip)::
      {
        ip: ip,
        targetRef: {},
      },
      // The Hostname of this endpoint
      hostname(hostname):: {hostname: hostname},
      // The IP of this endpoint. May not be loopback (127.0.0.0/8), link-local (169.254.0.0/16), or link-local multicast ((224.0.0.0/24). IPv6 is also accepted but not fully supported on all platforms. Also, certain kubernetes components, like kube-proxy, are not IPv6 ready.
      ip(ip):: {ip: ip},
      // Optional: Node hosting this endpoint. This can be used to determine endpoints local to a node.
      nodeName(nodeName):: {nodeName: nodeName},
      // Reference to object providing the endpoint.
      targetRef(targetRef):: {targetRef+: targetRef},
      mixin:: {
        targetRef:: {
          local targetRef(mixin) = {targetRef+: mixin},
          fieldPath(fieldPath):: targetRef($.v1.objectReference.fieldPath(fieldPath)),
          name(name):: targetRef($.v1.objectReference.name(name)),
          namespace(namespace):: targetRef($.v1.objectReference.namespace(namespace)),
          resourceVersion(resourceVersion):: targetRef($.v1.objectReference.resourceVersion(resourceVersion)),
          uid(uid):: targetRef($.v1.objectReference.uid(uid)),
        },
      },
    },
    endpointPort:: {
      default(port)::
      {
        port: port,
      },
      // The name of this port (corresponds to ServicePort.Name). Must be a DNS_LABEL. Optional only if one port is defined.
      name(name):: {name: name},
      // The port number of the endpoint.
      port(port):: {port: port},
      // The IP protocol for this port. Must be UDP or TCP. Default is TCP.
      protocol(protocol):: {protocol: protocol},
    },
    endpointSubset:: {
      default()::
      {
        addresses: [],
        notReadyAddresses: [],
        ports: [],
      },
      // IP addresses which offer the related ports that are marked as ready. These endpoints should be considered safe for load balancers and clients to utilize.
      addresses(addresses):: if std.type(addresses) == "array" then {addresses+: addresses} else {addresses+: [addresses]},
      // IP addresses which offer the related ports but are not currently marked as ready because they have not yet finished starting, have recently failed a readiness check, or have recently failed a liveness check.
      notReadyAddresses(notReadyAddresses):: if std.type(notReadyAddresses) == "array" then {notReadyAddresses+: notReadyAddresses} else {notReadyAddresses+: [notReadyAddresses]},
      // Port numbers available on the related IP addresses.
      ports(ports):: if std.type(ports) == "array" then {ports+: ports} else {ports+: [ports]},
    },
    endpoints:: {
      local kind = {kind: "Endpoints"},
      default(name, subsets, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        subsets: if std.type(subsets) == "array" then subsets else [subsets],
      },
      // The set of all endpoints is the union of all subsets. Addresses are placed into subsets according to the IPs they share. A single address with multiple ports, some of which are ready and some of which are not (because they come from different containers) will result in the address being displayed in different subsets for the different ports. No address will appear in both Addresses and NotReadyAddresses in the same subset. Sets of addresses and ports that comprise a service.
      subsets(subsets):: if std.type(subsets) == "array" then {subsets+: subsets} else {subsets+: [subsets]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
      },
    },
    endpointsList:: {
      local kind = {kind: "EndpointsList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // List of endpoints.
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    envFromSource:: {
      default()::
      {
        configMapRef: {},
        secretRef: {},
      },
      // The ConfigMap to select from
      configMapRef(configMapRef):: {configMapRef+: configMapRef},
      // An optional identifer to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.
      prefix(prefix):: {prefix: prefix},
      // The Secret to select from
      secretRef(secretRef):: {secretRef+: secretRef},
      mixin:: {
        configMapRef:: {
          local configMapRef(mixin) = {configMapRef+: mixin},
          name(name):: configMapRef($.v1.configMapEnvSource.name(name)),
          optional(optional):: configMapRef($.v1.configMapEnvSource.optional(optional)),
        },
        secretRef:: {
          local secretRef(mixin) = {secretRef+: mixin},
          name(name):: secretRef($.v1.secretEnvSource.name(name)),
          optional(optional):: secretRef($.v1.secretEnvSource.optional(optional)),
        },
      },
    },
    envVar:: {
      default(name)::
      {
        name: name,
        valueFrom: {},
      },
      // Name of the environment variable. Must be a C_IDENTIFIER.
      name(name):: {name: name},
      // Variable references $(VAR_NAME) are expanded using the previous defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to "".
      value(value):: {value: value},
      // Source for the environment variable's value. Cannot be used if value is not empty.
      valueFrom(valueFrom):: {valueFrom+: valueFrom},
      mixin:: {
        valueFrom:: {
          local valueFrom(mixin) = {valueFrom+: mixin},
          configMapKeyRef(configMapKeyRef):: valueFrom($.v1.envVarSource.configMapKeyRef(configMapKeyRef)),
          fieldRef(fieldRef):: valueFrom($.v1.envVarSource.fieldRef(fieldRef)),
          resourceFieldRef(resourceFieldRef):: valueFrom($.v1.envVarSource.resourceFieldRef(resourceFieldRef)),
          secretKeyRef(secretKeyRef):: valueFrom($.v1.envVarSource.secretKeyRef(secretKeyRef)),
        },
      },
    },
    envVarSource:: {
      default()::
      {
        configMapKeyRef: {},
        fieldRef: {},
        resourceFieldRef: {},
        secretKeyRef: {},
      },
      // Selects a key of a ConfigMap.
      configMapKeyRef(configMapKeyRef):: {configMapKeyRef+: configMapKeyRef},
      // Selects a field of the pod: supports metadata.name, metadata.namespace, metadata.labels, metadata.annotations, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP.
      fieldRef(fieldRef):: {fieldRef+: fieldRef},
      // Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
      resourceFieldRef(resourceFieldRef):: {resourceFieldRef+: resourceFieldRef},
      // Selects a key of a secret in the pod's namespace
      secretKeyRef(secretKeyRef):: {secretKeyRef+: secretKeyRef},
      mixin:: {
        configMapKeyRef:: {
          local configMapKeyRef(mixin) = {configMapKeyRef+: mixin},
          key(key):: configMapKeyRef($.v1.configMapKeySelector.key(key)),
          name(name):: configMapKeyRef($.v1.configMapKeySelector.name(name)),
          optional(optional):: configMapKeyRef($.v1.configMapKeySelector.optional(optional)),
        },
        fieldRef:: {
          local fieldRef(mixin) = {fieldRef+: mixin},
          fieldPath(fieldPath):: fieldRef($.v1.objectFieldSelector.fieldPath(fieldPath)),
        },
        resourceFieldRef:: {
          local resourceFieldRef(mixin) = {resourceFieldRef+: mixin},
          containerName(containerName):: resourceFieldRef($.v1.resourceFieldSelector.containerName(containerName)),
          divisor(divisor):: resourceFieldRef($.v1.resourceFieldSelector.divisor(divisor)),
          resource(resource):: resourceFieldRef($.v1.resourceFieldSelector.resource(resource)),
        },
        secretKeyRef:: {
          local secretKeyRef(mixin) = {secretKeyRef+: mixin},
          key(key):: secretKeyRef($.v1.secretKeySelector.key(key)),
          name(name):: secretKeyRef($.v1.secretKeySelector.name(name)),
          optional(optional):: secretKeyRef($.v1.secretKeySelector.optional(optional)),
        },
      },
    },
    event:: {
      local kind = {kind: "Event"},
      default(name, involvedObject, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        involvedObject: involvedObject,
        source: {},
      },
      // The number of times this event has occurred.
      count(count):: {count: count},
      // The time at which the event was first recorded. (Time of server receipt is in TypeMeta.)
      firstTimestamp(firstTimestamp):: {firstTimestamp: firstTimestamp},
      // The object that this event is about.
      involvedObject(involvedObject):: {involvedObject+: involvedObject},
      // The time at which the most recent occurrence of this event was recorded.
      lastTimestamp(lastTimestamp):: {lastTimestamp: lastTimestamp},
      // A human-readable description of the status of this operation.
      message(message):: {message: message},
      // This should be a short, machine understandable string that gives the reason for the transition into the object's current status.
      reason(reason):: {reason: reason},
      // The component reporting this event. Should be a short machine understandable string.
      source(source):: {source+: source},
      // Type of this event (Normal, Warning), new types could be added in the future
      type(type):: {type: type},
      mixin:: {
        involvedObject:: {
          local involvedObject(mixin) = {involvedObject+: mixin},
          fieldPath(fieldPath):: involvedObject($.v1.objectReference.fieldPath(fieldPath)),
          name(name):: involvedObject($.v1.objectReference.name(name)),
          namespace(namespace):: involvedObject($.v1.objectReference.namespace(namespace)),
          resourceVersion(resourceVersion):: involvedObject($.v1.objectReference.resourceVersion(resourceVersion)),
          uid(uid):: involvedObject($.v1.objectReference.uid(uid)),
        },
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        source:: {
          local source(mixin) = {source+: mixin},
          component(component):: source($.v1.eventSource.component(component)),
          host(host):: source($.v1.eventSource.host(host)),
        },
      },
    },
    eventList:: {
      local kind = {kind: "EventList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // List of events
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    eventSource:: {
      // Component from which the event is generated.
      component(component):: {component: component},
      // Node name on which the event is generated.
      host(host):: {host: host},
    },
    execAction:: {
      default()::
      {
        command: [],
      },
      // Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
      command(command):: if std.type(command) == "array" then {command+: command} else {command+: [command]},
    },
    fCVolumeSource:: {
      default(targetWWNs, lun)::
      {
        lun: lun,
        targetWWNs: if std.type(targetWWNs) == "array" then targetWWNs else [targetWWNs],
      },
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
      fsType(fsType):: {fsType: fsType},
      // Required: FC target lun number
      lun(lun):: {lun: lun},
      // Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
      readOnly(readOnly):: {readOnly: readOnly},
      // Required: FC target worldwide names (WWNs)
      targetWWNs(targetWWNs):: if std.type(targetWWNs) == "array" then {targetWWNs+: targetWWNs} else {targetWWNs+: [targetWWNs]},
    },
    finalizerName:: {
    },
    flexVolumeSource:: {
      default(driver)::
      {
        driver: driver,
        options: {},
        secretRef: {},
      },
      // Driver is the name of the driver to use for this volume.
      driver(driver):: {driver: driver},
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.
      fsType(fsType):: {fsType: fsType},
      // Optional: Extra command options if any.
      options(options):: {options+: options},
      // Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
      readOnly(readOnly):: {readOnly: readOnly},
      // Optional: SecretRef is reference to the secret object containing sensitive information to pass to the plugin scripts. This may be empty if no secret object is specified. If the secret object contains more than one secret, all secrets are passed to the plugin scripts.
      secretRef(secretRef):: {secretRef+: secretRef},
      mixin:: {
        secretRef:: {
          local secretRef(mixin) = {secretRef+: mixin},
          name(name):: secretRef($.v1.localObjectReference.name(name)),
        },
      },
    },
    flockerVolumeSource:: {
      // Name of the dataset stored as metadata -> name on the dataset for Flocker should be considered as deprecated
      datasetName(datasetName):: {datasetName: datasetName},
      // UUID of the dataset. This is unique identifier of a Flocker dataset
      datasetUUID(datasetUUID):: {datasetUUID: datasetUUID},
    },
    gCEPersistentDiskVolumeSource:: {
      default(pdName)::
      {
        pdName: pdName,
      },
      // Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
      fsType(fsType):: {fsType: fsType},
      // The partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty). More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
      partition(partition):: {partition: partition},
      // Unique name of the PD resource in GCE. Used to identify the disk in GCE. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
      pdName(pdName):: {pdName: pdName},
      // ReadOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
      readOnly(readOnly):: {readOnly: readOnly},
    },
    gitRepoVolumeSource:: {
      default(repository)::
      {
        repository: repository,
      },
      // Target directory name. Must not contain or start with '..'.  If '.' is supplied, the volume directory will be the git repository.  Otherwise, if specified, the volume will contain the git repository in the subdirectory with the given name.
      directory(directory):: {directory: directory},
      // Repository URL
      repository(repository):: {repository: repository},
      // Commit hash for the specified revision.
      revision(revision):: {revision: revision},
    },
    glusterfsVolumeSource:: {
      default(endpoints, path)::
      {
        endpoints: endpoints,
        path: path,
      },
      // EndpointsName is the endpoint name that details Glusterfs topology. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md#create-a-pod
      endpoints(endpoints):: {endpoints: endpoints},
      // Path is the Glusterfs volume path. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md#create-a-pod
      path(path):: {path: path},
      // ReadOnly here will force the Glusterfs volume to be mounted with read-only permissions. Defaults to false. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md#create-a-pod
      readOnly(readOnly):: {readOnly: readOnly},
    },
    hTTPGetAction:: {
      default(port)::
      {
        httpHeaders: [],
        port: port,
      },
      // Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.
      host(host):: {host: host},
      // Custom headers to set in the request. HTTP allows repeated headers.
      httpHeaders(httpHeaders):: if std.type(httpHeaders) == "array" then {httpHeaders+: httpHeaders} else {httpHeaders+: [httpHeaders]},
      // Path to access on the HTTP server.
      path(path):: {path: path},
      // Name or number of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.
      port(port):: {port: port},
      // Scheme to use for connecting to the host. Defaults to HTTP.
      scheme(scheme):: {scheme: scheme},
    },
    hTTPHeader:: {
      default(name, value)::
      {
        name: name,
        value: value,
      },
      // The header field name
      name(name):: {name: name},
      // The header field value
      value(value):: {value: value},
    },
    handler:: {
      default()::
      {
        exec: {},
        httpGet: {},
        tcpSocket: {},
      },
      // One and only one of the following should be specified. Exec specifies the action to take.
      exec(exec):: {exec+: exec},
      // HTTPGet specifies the http request to perform.
      httpGet(httpGet):: {httpGet+: httpGet},
      // TCPSocket specifies an action involving a TCP port. TCP hooks not yet supported
      tcpSocket(tcpSocket):: {tcpSocket+: tcpSocket},
      mixin:: {
        exec:: {
          local exec(mixin) = {exec+: mixin},
          command(command):: exec($.v1.execAction.command(command)),
        },
        httpGet:: {
          local httpGet(mixin) = {httpGet+: mixin},
          host(host):: httpGet($.v1.hTTPGetAction.host(host)),
          httpHeaders(httpHeaders):: httpGet($.v1.hTTPGetAction.httpHeaders(httpHeaders)),
          path(path):: httpGet($.v1.hTTPGetAction.path(path)),
          port(port):: httpGet($.v1.hTTPGetAction.port(port)),
          scheme(scheme):: httpGet($.v1.hTTPGetAction.scheme(scheme)),
        },
        tcpSocket:: {
          local tcpSocket(mixin) = {tcpSocket+: mixin},
          host(host):: tcpSocket($.v1.tCPSocketAction.host(host)),
          port(port):: tcpSocket($.v1.tCPSocketAction.port(port)),
        },
      },
    },
    hostAlias:: {
      default()::
      {
        hostnames: [],
      },
      // Hostnames for the the above IP address.
      hostnames(hostnames):: if std.type(hostnames) == "array" then {hostnames+: hostnames} else {hostnames+: [hostnames]},
      // IP address of the host file entry.
      ip(ip):: {ip: ip},
    },
    hostPathVolumeSource:: {
      default(path)::
      {
        path: path,
      },
      // Path of the directory on the host. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
      path(path):: {path: path},
    },
    iSCSIVolumeSource:: {
      default(targetPortal, iqn, lun)::
      {
        iqn: iqn,
        lun: lun,
        portals: [],
        secretRef: {},
        targetPortal: targetPortal,
      },
      // whether support iSCSI Discovery CHAP authentication
      chapAuthDiscovery(chapAuthDiscovery):: {chapAuthDiscovery: chapAuthDiscovery},
      // whether support iSCSI Session CHAP authentication
      chapAuthSession(chapAuthSession):: {chapAuthSession: chapAuthSession},
      // Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi
      fsType(fsType):: {fsType: fsType},
      // Target iSCSI Qualified Name.
      iqn(iqn):: {iqn: iqn},
      // Optional: Defaults to 'default' (tcp). iSCSI interface name that uses an iSCSI transport.
      iscsiInterface(iscsiInterface):: {iscsiInterface: iscsiInterface},
      // iSCSI target lun number.
      lun(lun):: {lun: lun},
      // iSCSI target portal List. The portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
      portals(portals):: if std.type(portals) == "array" then {portals+: portals} else {portals+: [portals]},
      // ReadOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false.
      readOnly(readOnly):: {readOnly: readOnly},
      // CHAP secret for iSCSI target and initiator authentication
      secretRef(secretRef):: {secretRef+: secretRef},
      // iSCSI target portal. The portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
      targetPortal(targetPortal):: {targetPortal: targetPortal},
      mixin:: {
        secretRef:: {
          local secretRef(mixin) = {secretRef+: mixin},
          name(name):: secretRef($.v1.localObjectReference.name(name)),
        },
      },
    },
    initializer:: {
      default(name)::
      {
        name: name,
      },
      // name of the process that is responsible for initializing this object.
      name(name):: {name: name},
    },
    initializers:: {
      default(pending)::
      {
        pending: if std.type(pending) == "array" then pending else [pending],
        result: {},
      },
      // Pending is a list of initializers that must execute in order before this object is visible. When the last pending initializer is removed, and no failing result is set, the initializers struct will be set to nil and the object is considered as initialized and visible to all clients.
      pending(pending):: if std.type(pending) == "array" then {pending+: pending} else {pending+: [pending]},
      // If result is set with the Failure field, the object will be persisted to storage and then deleted, ensuring that other clients can observe the deletion.
      result(result):: {result+: result},
      mixin:: {
        result:: {
          local result(mixin) = {result+: mixin},
          code(code):: result($.v1.status.code(code)),
          details(details):: result($.v1.status.details(details)),
          message(message):: result($.v1.status.message(message)),
          reason(reason):: result($.v1.status.reason(reason)),
          status(status):: result($.v1.status.status(status)),
        },
      },
    },
    keyToPath:: {
      default(key, path)::
      {
        key: key,
        path: path,
      },
      // The key to project.
      key(key):: {key: key},
      // Optional: mode bits to use on this file, must be a value between 0 and 0777. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
      mode(mode):: {mode: mode},
      // The relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'.
      path(path):: {path: path},
    },
    labelSelector:: {
      default()::
      {
        matchExpressions: [],
        matchLabels: {},
      },
      // matchExpressions is a list of label selector requirements. The requirements are ANDed.
      matchExpressions(matchExpressions):: if std.type(matchExpressions) == "array" then {matchExpressions+: matchExpressions} else {matchExpressions+: [matchExpressions]},
      // matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
      matchLabels(matchLabels):: {matchLabels+: matchLabels},
    },
    labelSelectorRequirement:: {
      default(key, operator)::
      {
        key: key,
        operator: operator,
        values: [],
      },
      // key is the label key that the selector applies to.
      key(key):: {key: key},
      // operator represents a key's relationship to a set of values. Valid operators ard In, NotIn, Exists and DoesNotExist.
      operator(operator):: {operator: operator},
      // values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
      values(values):: if std.type(values) == "array" then {values+: values} else {values+: [values]},
    },
    lifecycle:: {
      default()::
      {
        postStart: {},
        preStop: {},
      },
      // PostStart is called immediately after a container is created. If the handler fails, the container is terminated and restarted according to its restart policy. Other management of the container blocks until the hook completes. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
      postStart(postStart):: {postStart+: postStart},
      // PreStop is called immediately before a container is terminated. The container is terminated after the handler completes. The reason for termination is passed to the handler. Regardless of the outcome of the handler, the container is eventually terminated. Other management of the container blocks until the hook completes. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
      preStop(preStop):: {preStop+: preStop},
      mixin:: {
        postStart:: {
          local postStart(mixin) = {postStart+: mixin},
          exec(exec):: postStart($.v1.handler.exec(exec)),
          httpGet(httpGet):: postStart($.v1.handler.httpGet(httpGet)),
          tcpSocket(tcpSocket):: postStart($.v1.handler.tcpSocket(tcpSocket)),
        },
        preStop:: {
          local preStop(mixin) = {preStop+: mixin},
          exec(exec):: preStop($.v1.handler.exec(exec)),
          httpGet(httpGet):: preStop($.v1.handler.httpGet(httpGet)),
          tcpSocket(tcpSocket):: preStop($.v1.handler.tcpSocket(tcpSocket)),
        },
      },
    },
    limitRange:: {
      local kind = {kind: "LimitRange"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        spec: {},
      },
      // Spec defines the limits enforced. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      spec(spec):: {spec+: spec},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          limits(limits):: spec($.v1.limitRangeSpec.limits(limits)),
        },
      },
    },
    limitRangeItem:: {
      default()::
      {
        default: {},
        defaultRequest: {},
        max: {},
        maxLimitRequestRatio: {},
        min: {},
      },
      // DefaultRequest is the default resource requirement request value by resource name if resource request is omitted.
      defaultRequest(defaultRequest):: {defaultRequest+: defaultRequest},
      // Default resource requirement limit value by resource name if resource limit is omitted.
      defaultValue(defaultValue):: {default+: defaultValue},
      // Max usage constraints on this kind by resource name.
      max(max):: {max+: max},
      // MaxLimitRequestRatio if specified, the named resource must have a request and limit that are both non-zero where limit divided by request is less than or equal to the enumerated value; this represents the max burst for the named resource.
      maxLimitRequestRatio(maxLimitRequestRatio):: {maxLimitRequestRatio+: maxLimitRequestRatio},
      // Min usage constraints on this kind by resource name.
      min(min):: {min+: min},
      // Type of resource that this limit applies to.
      type(type):: {type: type},
    },
    limitRangeList:: {
      local kind = {kind: "LimitRangeList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // Items is a list of LimitRange objects. More info: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/admission_control_limit_range.md
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    limitRangeSpec:: {
      default(limits)::
      {
        limits: if std.type(limits) == "array" then limits else [limits],
      },
      // Limits is the list of LimitRangeItem objects that are enforced.
      limits(limits):: if std.type(limits) == "array" then {limits+: limits} else {limits+: [limits]},
    },
    listMeta:: {
      // String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#concurrency-control-and-consistency
      resourceVersion(resourceVersion):: {resourceVersion: resourceVersion},
      // SelfLink is a URL representing this object. Populated by the system. Read-only.
      selfLink(selfLink):: {selfLink: selfLink},
    },
    loadBalancerIngress:: {
      // Hostname is set for load-balancer ingress points that are DNS based (typically AWS load-balancers)
      hostname(hostname):: {hostname: hostname},
      // IP is set for load-balancer ingress points that are IP based (typically GCE or OpenStack load-balancers)
      ip(ip):: {ip: ip},
    },
    loadBalancerStatus:: {
      default()::
      {
        ingress: [],
      },
      // Ingress is a list containing ingress points for the load-balancer. Traffic intended for the service should be sent to these ingress points.
      ingress(ingress):: if std.type(ingress) == "array" then {ingress+: ingress} else {ingress+: [ingress]},
    },
    localObjectReference:: {
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
    },
    nFSVolumeSource:: {
      default(server, path)::
      {
        path: path,
        server: server,
      },
      // Path that is exported by the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
      path(path):: {path: path},
      // ReadOnly here will force the NFS export to be mounted with read-only permissions. Defaults to false. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
      readOnly(readOnly):: {readOnly: readOnly},
      // Server is the hostname or IP address of the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
      server(server):: {server: server},
    },
    namespace:: {
      local kind = {kind: "Namespace"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        spec: {},
        status: {},
      },
      // Spec defines the behavior of the Namespace. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      spec(spec):: {spec+: spec},
      // Status describes the current status of a Namespace. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      status(status):: {status+: status},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          finalizers(finalizers):: spec($.v1.namespaceSpec.finalizers(finalizers)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          phase(phase):: status($.v1.namespaceStatus.phase(phase)),
        },
      },
    },
    namespaceList:: {
      local kind = {kind: "NamespaceList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // Items is the list of Namespace objects in the list. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    namespaceSpec:: {
      default()::
      {
        finalizers: [],
      },
      // Finalizers is an opaque list of values that must be empty to permanently remove object from storage. More info: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/namespaces.md#finalizers
      finalizers(finalizers):: if std.type(finalizers) == "array" then {finalizers+: finalizers} else {finalizers+: [finalizers]},
    },
    namespaceStatus:: {
      // Phase is the current lifecycle phase of the namespace. More info: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/namespaces.md#phases
      phase(phase):: {phase: phase},
    },
    node:: {
      local kind = {kind: "Node"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        spec: {},
        status: {},
      },
      // Spec defines the behavior of a node. https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      spec(spec):: {spec+: spec},
      // Most recently observed status of the node. Populated by the system. Read-only. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      status(status):: {status+: status},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          externalID(externalID):: spec($.v1.nodeSpec.externalID(externalID)),
          podCIDR(podCIDR):: spec($.v1.nodeSpec.podCIDR(podCIDR)),
          providerID(providerID):: spec($.v1.nodeSpec.providerID(providerID)),
          taints(taints):: spec($.v1.nodeSpec.taints(taints)),
          unschedulable(unschedulable):: spec($.v1.nodeSpec.unschedulable(unschedulable)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          addresses(addresses):: status($.v1.nodeStatus.addresses(addresses)),
          allocatable(allocatable):: status($.v1.nodeStatus.allocatable(allocatable)),
          capacity(capacity):: status($.v1.nodeStatus.capacity(capacity)),
          conditions(conditions):: status($.v1.nodeStatus.conditions(conditions)),
          daemonEndpoints(daemonEndpoints):: status($.v1.nodeStatus.daemonEndpoints(daemonEndpoints)),
          images(images):: status($.v1.nodeStatus.images(images)),
          nodeInfo(nodeInfo):: status($.v1.nodeStatus.nodeInfo(nodeInfo)),
          phase(phase):: status($.v1.nodeStatus.phase(phase)),
          volumesAttached(volumesAttached):: status($.v1.nodeStatus.volumesAttached(volumesAttached)),
          volumesInUse(volumesInUse):: status($.v1.nodeStatus.volumesInUse(volumesInUse)),
        },
      },
    },
    nodeAddress:: {
      default(type, address)::
      {
        address: address,
        type: type,
      },
      // The node address.
      address(address):: {address: address},
      // Node address type, one of Hostname, ExternalIP or InternalIP.
      type(type):: {type: type},
    },
    nodeAffinity:: {
      default()::
      {
        preferredDuringSchedulingIgnoredDuringExecution: [],
        requiredDuringSchedulingIgnoredDuringExecution: {},
      },
      // The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node matches the corresponding matchExpressions; the node(s) with the highest sum are the most preferred.
      preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution):: if std.type(preferredDuringSchedulingIgnoredDuringExecution) == "array" then {preferredDuringSchedulingIgnoredDuringExecution+: preferredDuringSchedulingIgnoredDuringExecution} else {preferredDuringSchedulingIgnoredDuringExecution+: [preferredDuringSchedulingIgnoredDuringExecution]},
      // If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to an update), the system may or may not try to eventually evict the pod from its node.
      requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution):: {requiredDuringSchedulingIgnoredDuringExecution+: requiredDuringSchedulingIgnoredDuringExecution},
      mixin:: {
        requiredDuringSchedulingIgnoredDuringExecution:: {
          local requiredDuringSchedulingIgnoredDuringExecution(mixin) = {requiredDuringSchedulingIgnoredDuringExecution+: mixin},
          nodeSelectorTerms(nodeSelectorTerms):: requiredDuringSchedulingIgnoredDuringExecution($.v1.nodeSelector.nodeSelectorTerms(nodeSelectorTerms)),
        },
      },
    },
    nodeCondition:: {
      default(type, status)::
      {
        status: status,
        type: type,
      },
      // Last time we got an update on a given condition.
      lastHeartbeatTime(lastHeartbeatTime):: {lastHeartbeatTime: lastHeartbeatTime},
      // Last time the condition transit from one status to another.
      lastTransitionTime(lastTransitionTime):: {lastTransitionTime: lastTransitionTime},
      // Human readable message indicating details about last transition.
      message(message):: {message: message},
      // (brief) reason for the condition's last transition.
      reason(reason):: {reason: reason},
      // Status of the condition, one of True, False, Unknown.
      status(status):: {status: status},
      // Type of node condition.
      type(type):: {type: type},
    },
    nodeDaemonEndpoints:: {
      default()::
      {
        kubeletEndpoint: {},
      },
      // Endpoint on which Kubelet is listening.
      kubeletEndpoint(kubeletEndpoint):: {kubeletEndpoint+: kubeletEndpoint},
      mixin:: {
        kubeletEndpoint:: {
          local kubeletEndpoint(mixin) = {kubeletEndpoint+: mixin},
          Port(Port):: kubeletEndpoint($.v1.daemonEndpoint.Port(Port)),
        },
      },
    },
    nodeList:: {
      local kind = {kind: "NodeList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // List of nodes
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    nodeSelector:: {
      default(nodeSelectorTerms)::
      {
        nodeSelectorTerms: if std.type(nodeSelectorTerms) == "array" then nodeSelectorTerms else [nodeSelectorTerms],
      },
      // Required. A list of node selector terms. The terms are ORed.
      nodeSelectorTerms(nodeSelectorTerms):: if std.type(nodeSelectorTerms) == "array" then {nodeSelectorTerms+: nodeSelectorTerms} else {nodeSelectorTerms+: [nodeSelectorTerms]},
    },
    nodeSelectorRequirement:: {
      default(key, operator)::
      {
        key: key,
        operator: operator,
        values: [],
      },
      // The label key that the selector applies to.
      key(key):: {key: key},
      // Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.
      operator(operator):: {operator: operator},
      // An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.
      values(values):: if std.type(values) == "array" then {values+: values} else {values+: [values]},
    },
    nodeSelectorTerm:: {
      default(matchExpressions)::
      {
        matchExpressions: if std.type(matchExpressions) == "array" then matchExpressions else [matchExpressions],
      },
      // Required. A list of node selector requirements. The requirements are ANDed.
      matchExpressions(matchExpressions):: if std.type(matchExpressions) == "array" then {matchExpressions+: matchExpressions} else {matchExpressions+: [matchExpressions]},
    },
    nodeSpec:: {
      default()::
      {
        taints: [],
      },
      // External ID of the node assigned by some machine database (e.g. a cloud provider). Deprecated.
      externalID(externalID):: {externalID: externalID},
      // PodCIDR represents the pod IP range assigned to the node.
      podCIDR(podCIDR):: {podCIDR: podCIDR},
      // ID of the node assigned by the cloud provider in the format: <ProviderName>://<ProviderSpecificNodeID>
      providerID(providerID):: {providerID: providerID},
      // If specified, the node's taints.
      taints(taints):: if std.type(taints) == "array" then {taints+: taints} else {taints+: [taints]},
      // Unschedulable controls node schedulability of new pods. By default, node is schedulable. More info: https://kubernetes.io/docs/concepts/nodes/node/#manual-node-administration
      unschedulable(unschedulable):: {unschedulable: unschedulable},
    },
    nodeStatus:: {
      default()::
      {
        addresses: [],
        allocatable: {},
        capacity: {},
        conditions: [],
        daemonEndpoints: {},
        images: [],
        nodeInfo: {},
        volumesAttached: [],
        volumesInUse: [],
      },
      // List of addresses reachable to the node. Queried from cloud provider, if available. More info: https://kubernetes.io/docs/concepts/nodes/node/#addresses
      addresses(addresses):: if std.type(addresses) == "array" then {addresses+: addresses} else {addresses+: [addresses]},
      // Allocatable represents the resources of a node that are available for scheduling. Defaults to Capacity.
      allocatable(allocatable):: {allocatable+: allocatable},
      // Capacity represents the total resources of a node. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#capacity
      capacity(capacity):: {capacity+: capacity},
      // Conditions is an array of current observed node conditions. More info: https://kubernetes.io/docs/concepts/nodes/node/#condition
      conditions(conditions):: if std.type(conditions) == "array" then {conditions+: conditions} else {conditions+: [conditions]},
      // Endpoints of daemons running on the Node.
      daemonEndpoints(daemonEndpoints):: {daemonEndpoints+: daemonEndpoints},
      // List of container images on this node
      images(images):: if std.type(images) == "array" then {images+: images} else {images+: [images]},
      // Set of ids/uuids to uniquely identify the node. More info: https://kubernetes.io/docs/concepts/nodes/node/#info
      nodeInfo(nodeInfo):: {nodeInfo+: nodeInfo},
      // NodePhase is the recently observed lifecycle phase of the node. More info: https://kubernetes.io/docs/concepts/nodes/node/#phase The field is never populated, and now is deprecated.
      phase(phase):: {phase: phase},
      // List of volumes that are attached to the node.
      volumesAttached(volumesAttached):: if std.type(volumesAttached) == "array" then {volumesAttached+: volumesAttached} else {volumesAttached+: [volumesAttached]},
      // List of attachable volumes in use (mounted) by the node.
      volumesInUse(volumesInUse):: if std.type(volumesInUse) == "array" then {volumesInUse+: volumesInUse} else {volumesInUse+: [volumesInUse]},
      mixin:: {
        daemonEndpoints:: {
          local daemonEndpoints(mixin) = {daemonEndpoints+: mixin},
          kubeletEndpoint(kubeletEndpoint):: daemonEndpoints($.v1.nodeDaemonEndpoints.kubeletEndpoint(kubeletEndpoint)),
        },
        nodeInfo:: {
          local nodeInfo(mixin) = {nodeInfo+: mixin},
          architecture(architecture):: nodeInfo($.v1.nodeSystemInfo.architecture(architecture)),
          bootID(bootID):: nodeInfo($.v1.nodeSystemInfo.bootID(bootID)),
          containerRuntimeVersion(containerRuntimeVersion):: nodeInfo($.v1.nodeSystemInfo.containerRuntimeVersion(containerRuntimeVersion)),
          kernelVersion(kernelVersion):: nodeInfo($.v1.nodeSystemInfo.kernelVersion(kernelVersion)),
          kubeProxyVersion(kubeProxyVersion):: nodeInfo($.v1.nodeSystemInfo.kubeProxyVersion(kubeProxyVersion)),
          kubeletVersion(kubeletVersion):: nodeInfo($.v1.nodeSystemInfo.kubeletVersion(kubeletVersion)),
          machineID(machineID):: nodeInfo($.v1.nodeSystemInfo.machineID(machineID)),
          operatingSystem(operatingSystem):: nodeInfo($.v1.nodeSystemInfo.operatingSystem(operatingSystem)),
          osImage(osImage):: nodeInfo($.v1.nodeSystemInfo.osImage(osImage)),
          systemUUID(systemUUID):: nodeInfo($.v1.nodeSystemInfo.systemUUID(systemUUID)),
        },
      },
    },
    nodeSystemInfo:: {
      default(machineID, systemUUID, bootID, kernelVersion, osImage, containerRuntimeVersion, kubeletVersion, kubeProxyVersion, operatingSystem, architecture)::
      {
        architecture: architecture,
        bootID: bootID,
        containerRuntimeVersion: containerRuntimeVersion,
        kernelVersion: kernelVersion,
        kubeProxyVersion: kubeProxyVersion,
        kubeletVersion: kubeletVersion,
        machineID: machineID,
        operatingSystem: operatingSystem,
        osImage: osImage,
        systemUUID: systemUUID,
      },
      // The Architecture reported by the node
      architecture(architecture):: {architecture: architecture},
      // Boot ID reported by the node.
      bootID(bootID):: {bootID: bootID},
      // ContainerRuntime Version reported by the node through runtime remote API (e.g. docker://1.5.0).
      containerRuntimeVersion(containerRuntimeVersion):: {containerRuntimeVersion: containerRuntimeVersion},
      // Kernel Version reported by the node from 'uname -r' (e.g. 3.16.0-0.bpo.4-amd64).
      kernelVersion(kernelVersion):: {kernelVersion: kernelVersion},
      // KubeProxy Version reported by the node.
      kubeProxyVersion(kubeProxyVersion):: {kubeProxyVersion: kubeProxyVersion},
      // Kubelet Version reported by the node.
      kubeletVersion(kubeletVersion):: {kubeletVersion: kubeletVersion},
      // MachineID reported by the node. For unique machine identification in the cluster this field is prefered. Learn more from man(5) machine-id: http://man7.org/linux/man-pages/man5/machine-id.5.html
      machineID(machineID):: {machineID: machineID},
      // The Operating System reported by the node
      operatingSystem(operatingSystem):: {operatingSystem: operatingSystem},
      // OS Image reported by the node from /etc/os-release (e.g. Debian GNU/Linux 7 (wheezy)).
      osImage(osImage):: {osImage: osImage},
      // SystemUUID reported by the node. For unique machine identification MachineID is prefered. This field is specific to Red Hat hosts https://access.redhat.com/documentation/en-US/Red_Hat_Subscription_Management/1/html/RHSM/getting-system-uuid.html
      systemUUID(systemUUID):: {systemUUID: systemUUID},
    },
    objectFieldSelector:: {
      default(fieldPath)::
        apiVersion +
      {
        fieldPath: fieldPath,
      },
      // Path of the field to select in the specified API version.
      fieldPath(fieldPath):: {fieldPath: fieldPath},
    },
    objectMeta:: {
      default()::
      {
        annotations: {},
        finalizers: [],
        initializers: {},
        labels: {},
        ownerReferences: [],
      },
      // Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: http://kubernetes.io/docs/user-guide/annotations
      annotations(annotations):: {annotations+: annotations},
      // The name of the cluster which the object belongs to. This is used to distinguish resources with same name and namespace in different clusters. This field is not set anywhere right now and apiserver is going to ignore it if set in create or update request.
      clusterName(clusterName):: {clusterName: clusterName},
      // CreationTimestamp is a timestamp representing the server time when this object was created. It is not guaranteed to be set in happens-before order across separate operations. Clients may not set this value. It is represented in RFC3339 form and is in UTC.
      // 
      // Populated by the system. Read-only. Null for lists. More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#metadata
      creationTimestamp(creationTimestamp):: {creationTimestamp: creationTimestamp},
      // Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.
      deletionGracePeriodSeconds(deletionGracePeriodSeconds):: {deletionGracePeriodSeconds: deletionGracePeriodSeconds},
      // DeletionTimestamp is RFC 3339 date and time at which this resource will be deleted. This field is set by the server when a graceful deletion is requested by the user, and is not directly settable by a client. The resource is expected to be deleted (no longer visible from resource lists, and not reachable by name) after the time in this field. Once set, this value may not be unset or be set further into the future, although it may be shortened or the resource may be deleted prior to this time. For example, a user may request that a pod is deleted in 30 seconds. The Kubelet will react by sending a graceful termination signal to the containers in the pod. After that 30 seconds, the Kubelet will send a hard termination signal (SIGKILL) to the container and after cleanup, remove the pod from the API. In the presence of network partitions, this object may still exist after this timestamp, until an administrator or automated process can determine the resource is fully terminated. If not set, graceful deletion of the object has not been requested.
      // 
      // Populated by the system when a graceful deletion is requested. Read-only. More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#metadata
      deletionTimestamp(deletionTimestamp):: {deletionTimestamp: deletionTimestamp},
      // Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed.
      finalizers(finalizers):: if std.type(finalizers) == "array" then {finalizers+: finalizers} else {finalizers+: [finalizers]},
      // GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
      // 
      // If this field is specified and the generated name exists, the server will NOT return a 409 - instead, it will either return 201 Created or 500 with Reason ServerTimeout indicating a unique name could not be found in the time allotted, and the client should retry (optionally after the time indicated in the Retry-After header).
      // 
      // Applied only if Name is not specified. More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#idempotency
      generateName(generateName):: {generateName: generateName},
      // A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.
      generation(generation):: {generation: generation},
      // An initializer is a controller which enforces some system invariant at object creation time. This field is a list of initializers that have not yet acted on this object. If nil or empty, this object has been completely initialized. Otherwise, the object is considered uninitialized and is hidden (in list/watch and get calls) from clients that haven't explicitly asked to observe uninitialized objects.
      // 
      // When an object is created, the system will populate this list with the current set of initializers. Only privileged users may set or modify this list. Once it is empty, it may not be modified further by any user.
      initializers(initializers):: {initializers+: initializers},
      // Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: http://kubernetes.io/docs/user-guide/labels
      labels(labels):: {labels+: labels},
      // Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/identifiers#names
      name(name):: {name: name},
      // Namespace defines the space within each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
      // 
      // Must be a DNS_LABEL. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/namespaces
      namespace(namespace):: {namespace: namespace},
      // List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.
      ownerReferences(ownerReferences):: if std.type(ownerReferences) == "array" then {ownerReferences+: ownerReferences} else {ownerReferences+: [ownerReferences]},
      // An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.
      // 
      // Populated by the system. Read-only. Value must be treated as opaque by clients and . More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#concurrency-control-and-consistency
      resourceVersion(resourceVersion):: {resourceVersion: resourceVersion},
      // SelfLink is a URL representing this object. Populated by the system. Read-only.
      selfLink(selfLink):: {selfLink: selfLink},
      // UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.
      // 
      // Populated by the system. Read-only. More info: http://kubernetes.io/docs/user-guide/identifiers#uids
      uid(uid):: {uid: uid},
      mixin:: {
        initializers:: {
          local initializers(mixin) = {initializers+: mixin},
          pending(pending):: initializers($.v1.initializers.pending(pending)),
          result(result):: initializers($.v1.initializers.result(result)),
        },
      },
    },
    objectReference:: {
      local kind = {kind: "ObjectReference"},
      default()::
        apiVersion +
        kind +
      {
      },
      // If referring to a piece of an object instead of an entire object, this string should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2]. For example, if the object reference is to a container within a pod, this would take on a value like: "spec.containers{name}" (where "name" refers to the name of the container that triggered the event) or if no container name is specified "spec.containers[2]" (container with index 2 in this pod). This syntax is chosen only to have some well-defined way of referencing a part of an object.
      fieldPath(fieldPath):: {fieldPath: fieldPath},
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Namespace of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
      namespace(namespace):: {namespace: namespace},
      // Specific resourceVersion to which this reference is made, if any. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#concurrency-control-and-consistency
      resourceVersion(resourceVersion):: {resourceVersion: resourceVersion},
      // UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids
      uid(uid):: {uid: uid},
    },
    ownerReference:: {
      local kind = {kind: "OwnerReference"},
      default(name, uid)::
        apiVersion +
        kind +
      {
        name: name,
        uid: uid,
      },
      // If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.
      blockOwnerDeletion(blockOwnerDeletion):: {blockOwnerDeletion: blockOwnerDeletion},
      // If true, this reference points to the managing controller.
      controller(controller):: {controller: controller},
      // Name of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#names
      name(name):: {name: name},
      // UID of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#uids
      uid(uid):: {uid: uid},
    },
    patch:: {
    },
    persistentVolume:: {
      local kind = {kind: "PersistentVolume"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        spec: {},
        status: {},
      },
      // Spec defines a specification of a persistent volume owned by the cluster. Provisioned by an administrator. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistent-volumes
      spec(spec):: {spec+: spec},
      // Status represents the current information/status for the persistent volume. Populated by the system. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistent-volumes
      status(status):: {status+: status},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          accessModes(accessModes):: spec($.v1.persistentVolumeSpec.accessModes(accessModes)),
          awsElasticBlockStore(awsElasticBlockStore):: spec($.v1.persistentVolumeSpec.awsElasticBlockStore(awsElasticBlockStore)),
          azureDisk(azureDisk):: spec($.v1.persistentVolumeSpec.azureDisk(azureDisk)),
          azureFile(azureFile):: spec($.v1.persistentVolumeSpec.azureFile(azureFile)),
          capacity(capacity):: spec($.v1.persistentVolumeSpec.capacity(capacity)),
          cephfs(cephfs):: spec($.v1.persistentVolumeSpec.cephfs(cephfs)),
          cinder(cinder):: spec($.v1.persistentVolumeSpec.cinder(cinder)),
          claimRef(claimRef):: spec($.v1.persistentVolumeSpec.claimRef(claimRef)),
          fc(fc):: spec($.v1.persistentVolumeSpec.fc(fc)),
          flexVolume(flexVolume):: spec($.v1.persistentVolumeSpec.flexVolume(flexVolume)),
          flocker(flocker):: spec($.v1.persistentVolumeSpec.flocker(flocker)),
          gcePersistentDisk(gcePersistentDisk):: spec($.v1.persistentVolumeSpec.gcePersistentDisk(gcePersistentDisk)),
          glusterfs(glusterfs):: spec($.v1.persistentVolumeSpec.glusterfs(glusterfs)),
          hostPath(hostPath):: spec($.v1.persistentVolumeSpec.hostPath(hostPath)),
          iscsi(iscsi):: spec($.v1.persistentVolumeSpec.iscsi(iscsi)),
          nfs(nfs):: spec($.v1.persistentVolumeSpec.nfs(nfs)),
          persistentVolumeReclaimPolicy(persistentVolumeReclaimPolicy):: spec($.v1.persistentVolumeSpec.persistentVolumeReclaimPolicy(persistentVolumeReclaimPolicy)),
          photonPersistentDisk(photonPersistentDisk):: spec($.v1.persistentVolumeSpec.photonPersistentDisk(photonPersistentDisk)),
          portworxVolume(portworxVolume):: spec($.v1.persistentVolumeSpec.portworxVolume(portworxVolume)),
          quobyte(quobyte):: spec($.v1.persistentVolumeSpec.quobyte(quobyte)),
          rbd(rbd):: spec($.v1.persistentVolumeSpec.rbd(rbd)),
          scaleIO(scaleIO):: spec($.v1.persistentVolumeSpec.scaleIO(scaleIO)),
          storageClassName(storageClassName):: spec($.v1.persistentVolumeSpec.storageClassName(storageClassName)),
          vsphereVolume(vsphereVolume):: spec($.v1.persistentVolumeSpec.vsphereVolume(vsphereVolume)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          message(message):: status($.v1.persistentVolumeStatus.message(message)),
          phase(phase):: status($.v1.persistentVolumeStatus.phase(phase)),
          reason(reason):: status($.v1.persistentVolumeStatus.reason(reason)),
        },
      },
    },
    persistentVolumeAccessMode:: {
    },
    persistentVolumeClaim:: {
      local kind = {kind: "PersistentVolumeClaim"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        spec: {},
        status: {},
      },
      // Spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
      spec(spec):: {spec+: spec},
      // Status represents the current information/status of a persistent volume claim. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
      status(status):: {status+: status},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          accessModes(accessModes):: spec($.v1.persistentVolumeClaimSpec.accessModes(accessModes)),
          resources(resources):: spec($.v1.persistentVolumeClaimSpec.resources(resources)),
          selector(selector):: spec($.v1.persistentVolumeClaimSpec.selector(selector)),
          storageClassName(storageClassName):: spec($.v1.persistentVolumeClaimSpec.storageClassName(storageClassName)),
          volumeName(volumeName):: spec($.v1.persistentVolumeClaimSpec.volumeName(volumeName)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          accessModes(accessModes):: status($.v1.persistentVolumeClaimStatus.accessModes(accessModes)),
          capacity(capacity):: status($.v1.persistentVolumeClaimStatus.capacity(capacity)),
          phase(phase):: status($.v1.persistentVolumeClaimStatus.phase(phase)),
        },
      },
    },
    persistentVolumeClaimList:: {
      local kind = {kind: "PersistentVolumeClaimList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // A list of persistent volume claims. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    persistentVolumeClaimSpec:: {
      default()::
      {
        accessModes: [],
        resources: {},
        selector: {},
      },
      // AccessModes contains the desired access modes the volume should have. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
      accessModes(accessModes):: if std.type(accessModes) == "array" then {accessModes+: accessModes} else {accessModes+: [accessModes]},
      // Resources represents the minimum resources the volume should have. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
      resources(resources):: {resources+: resources},
      // A label query over volumes to consider for binding.
      selector(selector):: {selector+: selector},
      // Name of the StorageClass required by the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
      storageClassName(storageClassName):: {storageClassName: storageClassName},
      // VolumeName is the binding reference to the PersistentVolume backing this claim.
      volumeName(volumeName):: {volumeName: volumeName},
      mixin:: {
        resources:: {
          local resources(mixin) = {resources+: mixin},
          limits(limits):: resources($.v1.resourceRequirements.limits(limits)),
          requests(requests):: resources($.v1.resourceRequirements.requests(requests)),
        },
        selector:: {
          local selector(mixin) = {selector+: mixin},
          matchExpressions(matchExpressions):: selector($.v1.labelSelector.matchExpressions(matchExpressions)),
          matchLabels(matchLabels):: selector($.v1.labelSelector.matchLabels(matchLabels)),
        },
      },
    },
    persistentVolumeClaimStatus:: {
      default()::
      {
        accessModes: [],
        capacity: {},
      },
      // AccessModes contains the actual access modes the volume backing the PVC has. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
      accessModes(accessModes):: if std.type(accessModes) == "array" then {accessModes+: accessModes} else {accessModes+: [accessModes]},
      // Represents the actual resources of the underlying volume.
      capacity(capacity):: {capacity+: capacity},
      // Phase represents the current phase of PersistentVolumeClaim.
      phase(phase):: {phase: phase},
    },
    persistentVolumeClaimVolumeSource:: {
      default(claimName)::
      {
        claimName: claimName,
      },
      // ClaimName is the name of a PersistentVolumeClaim in the same namespace as the pod using this volume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
      claimName(claimName):: {claimName: claimName},
      // Will force the ReadOnly setting in VolumeMounts. Default false.
      readOnly(readOnly):: {readOnly: readOnly},
    },
    persistentVolumeList:: {
      local kind = {kind: "PersistentVolumeList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // List of persistent volumes. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    persistentVolumeSpec:: {
      default()::
      {
        accessModes: [],
        awsElasticBlockStore: {},
        azureDisk: {},
        azureFile: {},
        capacity: {},
        cephfs: {},
        cinder: {},
        claimRef: {},
        fc: {},
        flexVolume: {},
        flocker: {},
        gcePersistentDisk: {},
        glusterfs: {},
        hostPath: {},
        iscsi: {},
        nfs: {},
        photonPersistentDisk: {},
        portworxVolume: {},
        quobyte: {},
        rbd: {},
        scaleIO: {},
        vsphereVolume: {},
      },
      // AccessModes contains all ways the volume can be mounted. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes
      accessModes(accessModes):: if std.type(accessModes) == "array" then {accessModes+: accessModes} else {accessModes+: [accessModes]},
      // AWSElasticBlockStore represents an AWS Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
      awsElasticBlockStore(awsElasticBlockStore):: {awsElasticBlockStore+: awsElasticBlockStore},
      // AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
      azureDisk(azureDisk):: {azureDisk+: azureDisk},
      // AzureFile represents an Azure File Service mount on the host and bind mount to the pod.
      azureFile(azureFile):: {azureFile+: azureFile},
      // A description of the persistent volume's resources and capacity. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#capacity
      capacity(capacity):: {capacity+: capacity},
      // CephFS represents a Ceph FS mount on the host that shares a pod's lifetime
      cephfs(cephfs):: {cephfs+: cephfs},
      // Cinder represents a cinder volume attached and mounted on kubelets host machine More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
      cinder(cinder):: {cinder+: cinder},
      // ClaimRef is part of a bi-directional binding between PersistentVolume and PersistentVolumeClaim. Expected to be non-nil when bound. claim.VolumeName is the authoritative bind between PV and PVC. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#binding
      claimRef(claimRef):: {claimRef+: claimRef},
      // FC represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
      fc(fc):: {fc+: fc},
      // FlexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin. This is an alpha feature and may change in future.
      flexVolume(flexVolume):: {flexVolume+: flexVolume},
      // Flocker represents a Flocker volume attached to a kubelet's host machine and exposed to the pod for its usage. This depends on the Flocker control service being running
      flocker(flocker):: {flocker+: flocker},
      // GCEPersistentDisk represents a GCE Disk resource that is attached to a kubelet's host machine and then exposed to the pod. Provisioned by an admin. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
      gcePersistentDisk(gcePersistentDisk):: {gcePersistentDisk+: gcePersistentDisk},
      // Glusterfs represents a Glusterfs volume that is attached to a host and exposed to the pod. Provisioned by an admin. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md
      glusterfs(glusterfs):: {glusterfs+: glusterfs},
      // HostPath represents a directory on the host. Provisioned by a developer or tester. This is useful for single-node development and testing only! On-host storage is not supported in any way and WILL NOT WORK in a multi-node cluster. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
      hostPath(hostPath):: {hostPath+: hostPath},
      // ISCSI represents an ISCSI Disk resource that is attached to a kubelet's host machine and then exposed to the pod. Provisioned by an admin.
      iscsi(iscsi):: {iscsi+: iscsi},
      // NFS represents an NFS mount on the host. Provisioned by an admin. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
      nfs(nfs):: {nfs+: nfs},
      // What happens to a persistent volume when released from its claim. Valid options are Retain (default) and Recycle. Recycling must be supported by the volume plugin underlying this persistent volume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#reclaiming
      persistentVolumeReclaimPolicy(persistentVolumeReclaimPolicy):: {persistentVolumeReclaimPolicy: persistentVolumeReclaimPolicy},
      // PhotonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine
      photonPersistentDisk(photonPersistentDisk):: {photonPersistentDisk+: photonPersistentDisk},
      // PortworxVolume represents a portworx volume attached and mounted on kubelets host machine
      portworxVolume(portworxVolume):: {portworxVolume+: portworxVolume},
      // Quobyte represents a Quobyte mount on the host that shares a pod's lifetime
      quobyte(quobyte):: {quobyte+: quobyte},
      // RBD represents a Rados Block Device mount on the host that shares a pod's lifetime. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md
      rbd(rbd):: {rbd+: rbd},
      // ScaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
      scaleIO(scaleIO):: {scaleIO+: scaleIO},
      // Name of StorageClass to which this persistent volume belongs. Empty value means that this volume does not belong to any StorageClass.
      storageClassName(storageClassName):: {storageClassName: storageClassName},
      // VsphereVolume represents a vSphere volume attached and mounted on kubelets host machine
      vsphereVolume(vsphereVolume):: {vsphereVolume+: vsphereVolume},
      mixin:: {
        awsElasticBlockStore:: {
          local awsElasticBlockStore(mixin) = {awsElasticBlockStore+: mixin},
          fsType(fsType):: awsElasticBlockStore($.v1.aWSElasticBlockStoreVolumeSource.fsType(fsType)),
          partition(partition):: awsElasticBlockStore($.v1.aWSElasticBlockStoreVolumeSource.partition(partition)),
          readOnly(readOnly):: awsElasticBlockStore($.v1.aWSElasticBlockStoreVolumeSource.readOnly(readOnly)),
          volumeID(volumeID):: awsElasticBlockStore($.v1.aWSElasticBlockStoreVolumeSource.volumeID(volumeID)),
        },
        azureDisk:: {
          local azureDisk(mixin) = {azureDisk+: mixin},
          cachingMode(cachingMode):: azureDisk($.v1.azureDiskVolumeSource.cachingMode(cachingMode)),
          diskName(diskName):: azureDisk($.v1.azureDiskVolumeSource.diskName(diskName)),
          diskURI(diskURI):: azureDisk($.v1.azureDiskVolumeSource.diskURI(diskURI)),
          fsType(fsType):: azureDisk($.v1.azureDiskVolumeSource.fsType(fsType)),
          readOnly(readOnly):: azureDisk($.v1.azureDiskVolumeSource.readOnly(readOnly)),
        },
        azureFile:: {
          local azureFile(mixin) = {azureFile+: mixin},
          readOnly(readOnly):: azureFile($.v1.azureFileVolumeSource.readOnly(readOnly)),
          secretName(secretName):: azureFile($.v1.azureFileVolumeSource.secretName(secretName)),
          shareName(shareName):: azureFile($.v1.azureFileVolumeSource.shareName(shareName)),
        },
        cephfs:: {
          local cephfs(mixin) = {cephfs+: mixin},
          monitors(monitors):: cephfs($.v1.cephFSVolumeSource.monitors(monitors)),
          path(path):: cephfs($.v1.cephFSVolumeSource.path(path)),
          readOnly(readOnly):: cephfs($.v1.cephFSVolumeSource.readOnly(readOnly)),
          secretFile(secretFile):: cephfs($.v1.cephFSVolumeSource.secretFile(secretFile)),
          secretRef(secretRef):: cephfs($.v1.cephFSVolumeSource.secretRef(secretRef)),
          user(user):: cephfs($.v1.cephFSVolumeSource.user(user)),
        },
        cinder:: {
          local cinder(mixin) = {cinder+: mixin},
          fsType(fsType):: cinder($.v1.cinderVolumeSource.fsType(fsType)),
          readOnly(readOnly):: cinder($.v1.cinderVolumeSource.readOnly(readOnly)),
          volumeID(volumeID):: cinder($.v1.cinderVolumeSource.volumeID(volumeID)),
        },
        claimRef:: {
          local claimRef(mixin) = {claimRef+: mixin},
          fieldPath(fieldPath):: claimRef($.v1.objectReference.fieldPath(fieldPath)),
          name(name):: claimRef($.v1.objectReference.name(name)),
          namespace(namespace):: claimRef($.v1.objectReference.namespace(namespace)),
          resourceVersion(resourceVersion):: claimRef($.v1.objectReference.resourceVersion(resourceVersion)),
          uid(uid):: claimRef($.v1.objectReference.uid(uid)),
        },
        fc:: {
          local fc(mixin) = {fc+: mixin},
          fsType(fsType):: fc($.v1.fCVolumeSource.fsType(fsType)),
          lun(lun):: fc($.v1.fCVolumeSource.lun(lun)),
          readOnly(readOnly):: fc($.v1.fCVolumeSource.readOnly(readOnly)),
          targetWWNs(targetWWNs):: fc($.v1.fCVolumeSource.targetWWNs(targetWWNs)),
        },
        flexVolume:: {
          local flexVolume(mixin) = {flexVolume+: mixin},
          driver(driver):: flexVolume($.v1.flexVolumeSource.driver(driver)),
          fsType(fsType):: flexVolume($.v1.flexVolumeSource.fsType(fsType)),
          options(options):: flexVolume($.v1.flexVolumeSource.options(options)),
          readOnly(readOnly):: flexVolume($.v1.flexVolumeSource.readOnly(readOnly)),
          secretRef(secretRef):: flexVolume($.v1.flexVolumeSource.secretRef(secretRef)),
        },
        flocker:: {
          local flocker(mixin) = {flocker+: mixin},
          datasetName(datasetName):: flocker($.v1.flockerVolumeSource.datasetName(datasetName)),
          datasetUUID(datasetUUID):: flocker($.v1.flockerVolumeSource.datasetUUID(datasetUUID)),
        },
        gcePersistentDisk:: {
          local gcePersistentDisk(mixin) = {gcePersistentDisk+: mixin},
          fsType(fsType):: gcePersistentDisk($.v1.gCEPersistentDiskVolumeSource.fsType(fsType)),
          partition(partition):: gcePersistentDisk($.v1.gCEPersistentDiskVolumeSource.partition(partition)),
          pdName(pdName):: gcePersistentDisk($.v1.gCEPersistentDiskVolumeSource.pdName(pdName)),
          readOnly(readOnly):: gcePersistentDisk($.v1.gCEPersistentDiskVolumeSource.readOnly(readOnly)),
        },
        glusterfs:: {
          local glusterfs(mixin) = {glusterfs+: mixin},
          endpoints(endpoints):: glusterfs($.v1.glusterfsVolumeSource.endpoints(endpoints)),
          path(path):: glusterfs($.v1.glusterfsVolumeSource.path(path)),
          readOnly(readOnly):: glusterfs($.v1.glusterfsVolumeSource.readOnly(readOnly)),
        },
        hostPath:: {
          local hostPath(mixin) = {hostPath+: mixin},
          path(path):: hostPath($.v1.hostPathVolumeSource.path(path)),
        },
        iscsi:: {
          local iscsi(mixin) = {iscsi+: mixin},
          chapAuthDiscovery(chapAuthDiscovery):: iscsi($.v1.iSCSIVolumeSource.chapAuthDiscovery(chapAuthDiscovery)),
          chapAuthSession(chapAuthSession):: iscsi($.v1.iSCSIVolumeSource.chapAuthSession(chapAuthSession)),
          fsType(fsType):: iscsi($.v1.iSCSIVolumeSource.fsType(fsType)),
          iqn(iqn):: iscsi($.v1.iSCSIVolumeSource.iqn(iqn)),
          iscsiInterface(iscsiInterface):: iscsi($.v1.iSCSIVolumeSource.iscsiInterface(iscsiInterface)),
          lun(lun):: iscsi($.v1.iSCSIVolumeSource.lun(lun)),
          portals(portals):: iscsi($.v1.iSCSIVolumeSource.portals(portals)),
          readOnly(readOnly):: iscsi($.v1.iSCSIVolumeSource.readOnly(readOnly)),
          secretRef(secretRef):: iscsi($.v1.iSCSIVolumeSource.secretRef(secretRef)),
          targetPortal(targetPortal):: iscsi($.v1.iSCSIVolumeSource.targetPortal(targetPortal)),
        },
        nfs:: {
          local nfs(mixin) = {nfs+: mixin},
          path(path):: nfs($.v1.nFSVolumeSource.path(path)),
          readOnly(readOnly):: nfs($.v1.nFSVolumeSource.readOnly(readOnly)),
          server(server):: nfs($.v1.nFSVolumeSource.server(server)),
        },
        photonPersistentDisk:: {
          local photonPersistentDisk(mixin) = {photonPersistentDisk+: mixin},
          fsType(fsType):: photonPersistentDisk($.v1.photonPersistentDiskVolumeSource.fsType(fsType)),
          pdID(pdID):: photonPersistentDisk($.v1.photonPersistentDiskVolumeSource.pdID(pdID)),
        },
        portworxVolume:: {
          local portworxVolume(mixin) = {portworxVolume+: mixin},
          fsType(fsType):: portworxVolume($.v1.portworxVolumeSource.fsType(fsType)),
          readOnly(readOnly):: portworxVolume($.v1.portworxVolumeSource.readOnly(readOnly)),
          volumeID(volumeID):: portworxVolume($.v1.portworxVolumeSource.volumeID(volumeID)),
        },
        quobyte:: {
          local quobyte(mixin) = {quobyte+: mixin},
          group(group):: quobyte($.v1.quobyteVolumeSource.group(group)),
          readOnly(readOnly):: quobyte($.v1.quobyteVolumeSource.readOnly(readOnly)),
          registry(registry):: quobyte($.v1.quobyteVolumeSource.registry(registry)),
          user(user):: quobyte($.v1.quobyteVolumeSource.user(user)),
          volume(volume):: quobyte($.v1.quobyteVolumeSource.volume(volume)),
        },
        rbd:: {
          local rbd(mixin) = {rbd+: mixin},
          fsType(fsType):: rbd($.v1.rBDVolumeSource.fsType(fsType)),
          image(image):: rbd($.v1.rBDVolumeSource.image(image)),
          keyring(keyring):: rbd($.v1.rBDVolumeSource.keyring(keyring)),
          monitors(monitors):: rbd($.v1.rBDVolumeSource.monitors(monitors)),
          pool(pool):: rbd($.v1.rBDVolumeSource.pool(pool)),
          readOnly(readOnly):: rbd($.v1.rBDVolumeSource.readOnly(readOnly)),
          secretRef(secretRef):: rbd($.v1.rBDVolumeSource.secretRef(secretRef)),
          user(user):: rbd($.v1.rBDVolumeSource.user(user)),
        },
        scaleIO:: {
          local scaleIO(mixin) = {scaleIO+: mixin},
          fsType(fsType):: scaleIO($.v1.scaleIOVolumeSource.fsType(fsType)),
          gateway(gateway):: scaleIO($.v1.scaleIOVolumeSource.gateway(gateway)),
          protectionDomain(protectionDomain):: scaleIO($.v1.scaleIOVolumeSource.protectionDomain(protectionDomain)),
          readOnly(readOnly):: scaleIO($.v1.scaleIOVolumeSource.readOnly(readOnly)),
          secretRef(secretRef):: scaleIO($.v1.scaleIOVolumeSource.secretRef(secretRef)),
          sslEnabled(sslEnabled):: scaleIO($.v1.scaleIOVolumeSource.sslEnabled(sslEnabled)),
          storageMode(storageMode):: scaleIO($.v1.scaleIOVolumeSource.storageMode(storageMode)),
          storagePool(storagePool):: scaleIO($.v1.scaleIOVolumeSource.storagePool(storagePool)),
          system(system):: scaleIO($.v1.scaleIOVolumeSource.system(system)),
          volumeName(volumeName):: scaleIO($.v1.scaleIOVolumeSource.volumeName(volumeName)),
        },
        vsphereVolume:: {
          local vsphereVolume(mixin) = {vsphereVolume+: mixin},
          fsType(fsType):: vsphereVolume($.v1.vsphereVirtualDiskVolumeSource.fsType(fsType)),
          volumePath(volumePath):: vsphereVolume($.v1.vsphereVirtualDiskVolumeSource.volumePath(volumePath)),
        },
      },
    },
    persistentVolumeStatus:: {
      // A human-readable message indicating details about why the volume is in this state.
      message(message):: {message: message},
      // Phase indicates if a volume is available, bound to a claim, or released by a claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#phase
      phase(phase):: {phase: phase},
      // Reason is a brief CamelCase string that describes any failure and is meant for machine parsing and tidy display in the CLI.
      reason(reason):: {reason: reason},
    },
    photonPersistentDiskVolumeSource:: {
      default(pdID)::
      {
        pdID: pdID,
      },
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
      fsType(fsType):: {fsType: fsType},
      // ID that identifies Photon Controller persistent disk
      pdID(pdID):: {pdID: pdID},
    },
    pod:: {
      local kind = {kind: "Pod"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        spec: {},
        status: {},
      },
      // Specification of the desired behavior of the pod. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      spec(spec):: {spec+: spec},
      // Most recently observed status of the pod. This data may not be up to date. Populated by the system. Read-only. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      status(status):: {status+: status},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          activeDeadlineSeconds(activeDeadlineSeconds):: spec($.v1.podSpec.activeDeadlineSeconds(activeDeadlineSeconds)),
          affinity(affinity):: spec($.v1.podSpec.affinity(affinity)),
          automountServiceAccountToken(automountServiceAccountToken):: spec($.v1.podSpec.automountServiceAccountToken(automountServiceAccountToken)),
          containers(containers):: spec($.v1.podSpec.containers(containers)),
          dnsPolicy(dnsPolicy):: spec($.v1.podSpec.dnsPolicy(dnsPolicy)),
          hostIPC(hostIPC):: spec($.v1.podSpec.hostIPC(hostIPC)),
          hostMappings(hostMappings):: spec($.v1.podSpec.hostMappings(hostMappings)),
          hostNetwork(hostNetwork):: spec($.v1.podSpec.hostNetwork(hostNetwork)),
          hostPID(hostPID):: spec($.v1.podSpec.hostPID(hostPID)),
          hostname(hostname):: spec($.v1.podSpec.hostname(hostname)),
          imagePullSecrets(imagePullSecrets):: spec($.v1.podSpec.imagePullSecrets(imagePullSecrets)),
          initContainers(initContainers):: spec($.v1.podSpec.initContainers(initContainers)),
          nodeName(nodeName):: spec($.v1.podSpec.nodeName(nodeName)),
          nodeSelector(nodeSelector):: spec($.v1.podSpec.nodeSelector(nodeSelector)),
          restartPolicy(restartPolicy):: spec($.v1.podSpec.restartPolicy(restartPolicy)),
          schedulerName(schedulerName):: spec($.v1.podSpec.schedulerName(schedulerName)),
          securityContext(securityContext):: spec($.v1.podSpec.securityContext(securityContext)),
          serviceAccount(serviceAccount):: spec($.v1.podSpec.serviceAccount(serviceAccount)),
          serviceAccountName(serviceAccountName):: spec($.v1.podSpec.serviceAccountName(serviceAccountName)),
          subdomain(subdomain):: spec($.v1.podSpec.subdomain(subdomain)),
          terminationGracePeriodSeconds(terminationGracePeriodSeconds):: spec($.v1.podSpec.terminationGracePeriodSeconds(terminationGracePeriodSeconds)),
          tolerations(tolerations):: spec($.v1.podSpec.tolerations(tolerations)),
          volumes(volumes):: spec($.v1.podSpec.volumes(volumes)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          conditions(conditions):: status($.v1.podStatus.conditions(conditions)),
          containerStatuses(containerStatuses):: status($.v1.podStatus.containerStatuses(containerStatuses)),
          hostIP(hostIP):: status($.v1.podStatus.hostIP(hostIP)),
          initContainerStatuses(initContainerStatuses):: status($.v1.podStatus.initContainerStatuses(initContainerStatuses)),
          message(message):: status($.v1.podStatus.message(message)),
          phase(phase):: status($.v1.podStatus.phase(phase)),
          podIP(podIP):: status($.v1.podStatus.podIP(podIP)),
          qosClass(qosClass):: status($.v1.podStatus.qosClass(qosClass)),
          reason(reason):: status($.v1.podStatus.reason(reason)),
          startTime(startTime):: status($.v1.podStatus.startTime(startTime)),
        },
      },
    },
    podAffinity:: {
      default()::
      {
        preferredDuringSchedulingIgnoredDuringExecution: [],
        requiredDuringSchedulingIgnoredDuringExecution: [],
      },
      // The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.
      preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution):: if std.type(preferredDuringSchedulingIgnoredDuringExecution) == "array" then {preferredDuringSchedulingIgnoredDuringExecution+: preferredDuringSchedulingIgnoredDuringExecution} else {preferredDuringSchedulingIgnoredDuringExecution+: [preferredDuringSchedulingIgnoredDuringExecution]},
      // NOT YET IMPLEMENTED. TODO: Uncomment field once it is implemented. If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system will try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied. RequiredDuringSchedulingRequiredDuringExecution []PodAffinityTerm  `json:"requiredDuringSchedulingRequiredDuringExecution,omitempty"` If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.
      requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution):: if std.type(requiredDuringSchedulingIgnoredDuringExecution) == "array" then {requiredDuringSchedulingIgnoredDuringExecution+: requiredDuringSchedulingIgnoredDuringExecution} else {requiredDuringSchedulingIgnoredDuringExecution+: [requiredDuringSchedulingIgnoredDuringExecution]},
    },
    podAffinityTerm:: {
      default()::
      {
        labelSelector: {},
        namespaces: [],
      },
      // A label query over a set of resources, in this case pods.
      labelSelector(labelSelector):: {labelSelector+: labelSelector},
      // namespaces specifies which namespaces the labelSelector applies to (matches against); null or empty list means "this pod's namespace"
      namespaces(namespaces):: if std.type(namespaces) == "array" then {namespaces+: namespaces} else {namespaces+: [namespaces]},
      // This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. For PreferredDuringScheduling pod anti-affinity, empty topologyKey is interpreted as "all topologies" ("all topologies" here means all the topologyKeys indicated by scheduler command-line argument --failure-domains); for affinity and for RequiredDuringScheduling pod anti-affinity, empty topologyKey is not allowed.
      topologyKey(topologyKey):: {topologyKey: topologyKey},
      mixin:: {
        labelSelector:: {
          local labelSelector(mixin) = {labelSelector+: mixin},
          matchExpressions(matchExpressions):: labelSelector($.v1.labelSelector.matchExpressions(matchExpressions)),
          matchLabels(matchLabels):: labelSelector($.v1.labelSelector.matchLabels(matchLabels)),
        },
      },
    },
    podAntiAffinity:: {
      default()::
      {
        preferredDuringSchedulingIgnoredDuringExecution: [],
        requiredDuringSchedulingIgnoredDuringExecution: [],
      },
      // The scheduler will prefer to schedule pods to nodes that satisfy the anti-affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling anti-affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.
      preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution):: if std.type(preferredDuringSchedulingIgnoredDuringExecution) == "array" then {preferredDuringSchedulingIgnoredDuringExecution+: preferredDuringSchedulingIgnoredDuringExecution} else {preferredDuringSchedulingIgnoredDuringExecution+: [preferredDuringSchedulingIgnoredDuringExecution]},
      // NOT YET IMPLEMENTED. TODO: Uncomment field once it is implemented. If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system will try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied. RequiredDuringSchedulingRequiredDuringExecution []PodAffinityTerm  `json:"requiredDuringSchedulingRequiredDuringExecution,omitempty"` If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.
      requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution):: if std.type(requiredDuringSchedulingIgnoredDuringExecution) == "array" then {requiredDuringSchedulingIgnoredDuringExecution+: requiredDuringSchedulingIgnoredDuringExecution} else {requiredDuringSchedulingIgnoredDuringExecution+: [requiredDuringSchedulingIgnoredDuringExecution]},
    },
    podCondition:: {
      default(type, status)::
      {
        status: status,
        type: type,
      },
      // Last time we probed the condition.
      lastProbeTime(lastProbeTime):: {lastProbeTime: lastProbeTime},
      // Last time the condition transitioned from one status to another.
      lastTransitionTime(lastTransitionTime):: {lastTransitionTime: lastTransitionTime},
      // Human-readable message indicating details about last transition.
      message(message):: {message: message},
      // Unique, one-word, CamelCase reason for the condition's last transition.
      reason(reason):: {reason: reason},
      // Status is the status of the condition. Can be True, False, Unknown. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-conditions
      status(status):: {status: status},
      // Type is the type of the condition. Currently only Ready. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-conditions
      type(type):: {type: type},
    },
    podList:: {
      local kind = {kind: "PodList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // List of pods. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    podSecurityContext:: {
      default()::
      {
        fsGroup: {},
        runAsUser: {},
        seLinuxOptions: {},
        supplementalGroups: [],
      },
      // A special supplemental group that applies to all containers in a pod. Some volume types allow the Kubelet to change the ownership of that volume to be owned by the pod:
      // 
      // 1. The owning GID will be the FSGroup 2. The setgid bit is set (new files created in the volume will be owned by FSGroup) 3. The permission bits are OR'd with rw-rw 
      fsGroup(fsGroup):: {fsGroup+: fsGroup},
      // Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
      runAsNonRoot(runAsNonRoot):: {runAsNonRoot: runAsNonRoot},
      // The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container.
      runAsUser(runAsUser):: {runAsUser+: runAsUser},
      // The SELinux context to be applied to all containers. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container.
      seLinuxOptions(seLinuxOptions):: {seLinuxOptions+: seLinuxOptions},
      // A list of groups applied to the first process run in each container, in addition to the container's primary GID.  If unspecified, no groups will be added to any container.
      supplementalGroups(supplementalGroups):: if std.type(supplementalGroups) == "array" then {supplementalGroups+: supplementalGroups} else {supplementalGroups+: [supplementalGroups]},
      mixin:: {
        seLinuxOptions:: {
          local seLinuxOptions(mixin) = {seLinuxOptions+: mixin},
          level(level):: seLinuxOptions($.v1.sELinuxOptions.level(level)),
          role(role):: seLinuxOptions($.v1.sELinuxOptions.role(role)),
          type(type):: seLinuxOptions($.v1.sELinuxOptions.type(type)),
          user(user):: seLinuxOptions($.v1.sELinuxOptions.user(user)),
        },
      },
    },
    podSpec:: {
      default(containers)::
      {
        affinity: {},
        containers: if std.type(containers) == "array" then containers else [containers],
        hostMappings: [],
        imagePullSecrets: [],
        initContainers: [],
        nodeSelector: {},
        securityContext: {},
        tolerations: [],
        volumes: [],
      },
      // Optional duration in seconds the pod may be active on the node relative to StartTime before the system will actively try to mark it failed and kill associated containers. Value must be a positive integer.
      activeDeadlineSeconds(activeDeadlineSeconds):: {activeDeadlineSeconds: activeDeadlineSeconds},
      // If specified, the pod's scheduling constraints
      affinity(affinity):: {affinity+: affinity},
      // AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.
      automountServiceAccountToken(automountServiceAccountToken):: {automountServiceAccountToken: automountServiceAccountToken},
      // List of containers belonging to the pod. Containers cannot currently be added or removed. There must be at least one container in a Pod. Cannot be updated.
      containers(containers):: if std.type(containers) == "array" then {containers+: containers} else {containers+: [containers]},
      // Set DNS policy for containers within the pod. One of 'ClusterFirstWithHostNet', 'ClusterFirst' or 'Default'. Defaults to "ClusterFirst". To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'.
      dnsPolicy(dnsPolicy):: {dnsPolicy: dnsPolicy},
      // Use the host's ipc namespace. Optional: Default to false.
      hostIPC(hostIPC):: {hostIPC: hostIPC},
      // HostAliases is an optional list of hosts and IPs that will be injected into the pod's hosts file if specified. This is only valid for non-hostNetwork pods.
      hostMappings(hostMappings):: if std.type(hostMappings) == "array" then {hostMappings+: hostMappings} else {hostMappings+: [hostMappings]},
      // Host networking requested for this pod. Use the host's network namespace. If this option is set, the ports that will be used must be specified. Default to false.
      hostNetwork(hostNetwork):: {hostNetwork: hostNetwork},
      // Use the host's pid namespace. Optional: Default to false.
      hostPID(hostPID):: {hostPID: hostPID},
      // Specifies the hostname of the Pod If not specified, the pod's hostname will be set to a system-defined value.
      hostname(hostname):: {hostname: hostname},
      // ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec. If specified, these secrets will be passed to individual puller implementations for them to use. For example, in the case of docker, only DockerConfig type secrets are honored. More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod
      imagePullSecrets(imagePullSecrets):: if std.type(imagePullSecrets) == "array" then {imagePullSecrets+: imagePullSecrets} else {imagePullSecrets+: [imagePullSecrets]},
      // List of initialization containers belonging to the pod. Init containers are executed in order prior to containers being started. If any init container fails, the pod is considered to have failed and is handled according to its restartPolicy. The name for an init container or normal container must be unique among all containers. Init containers may not have Lifecycle actions, Readiness probes, or Liveness probes. The resourceRequirements of an init container are taken into account during scheduling by finding the highest request/limit for each resource type, and then using the max of of that value or the sum of the normal containers. Limits are applied to init containers in a similar fashion. Init containers cannot currently be added or removed. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
      initContainers(initContainers):: if std.type(initContainers) == "array" then {initContainers+: initContainers} else {initContainers+: [initContainers]},
      // NodeName is a request to schedule this pod onto a specific node. If it is non-empty, the scheduler simply schedules this pod onto that node, assuming that it fits resource requirements.
      nodeName(nodeName):: {nodeName: nodeName},
      // NodeSelector is a selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
      nodeSelector(nodeSelector):: {nodeSelector+: nodeSelector},
      // Restart policy for all containers within the pod. One of Always, OnFailure, Never. Default to Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy
      restartPolicy(restartPolicy):: {restartPolicy: restartPolicy},
      // If specified, the pod will be dispatched by specified scheduler. If not specified, the pod will be dispatched by default scheduler.
      schedulerName(schedulerName):: {schedulerName: schedulerName},
      // SecurityContext holds pod-level security attributes and common container settings. Optional: Defaults to empty.  See type description for default values of each field.
      securityContext(securityContext):: {securityContext+: securityContext},
      // DeprecatedServiceAccount is a depreciated alias for ServiceAccountName. Deprecated: Use serviceAccountName instead.
      serviceAccount(serviceAccount):: {serviceAccount: serviceAccount},
      // ServiceAccountName is the name of the ServiceAccount to use to run this pod. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
      serviceAccountName(serviceAccountName):: {serviceAccountName: serviceAccountName},
      // If specified, the fully qualified Pod hostname will be "<hostname>.<subdomain>.<pod namespace>.svc.<cluster domain>". If not specified, the pod will not have a domainname at all.
      subdomain(subdomain):: {subdomain: subdomain},
      // Optional duration in seconds the pod needs to terminate gracefully. May be decreased in delete request. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period will be used instead. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. Defaults to 30 seconds.
      terminationGracePeriodSeconds(terminationGracePeriodSeconds):: {terminationGracePeriodSeconds: terminationGracePeriodSeconds},
      // If specified, the pod's tolerations.
      tolerations(tolerations):: if std.type(tolerations) == "array" then {tolerations+: tolerations} else {tolerations+: [tolerations]},
      // List of volumes that can be mounted by containers belonging to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes
      volumes(volumes):: if std.type(volumes) == "array" then {volumes+: volumes} else {volumes+: [volumes]},
      mixin:: {
        affinity:: {
          local affinity(mixin) = {affinity+: mixin},
          nodeAffinity(nodeAffinity):: affinity($.v1.affinity.nodeAffinity(nodeAffinity)),
          podAffinity(podAffinity):: affinity($.v1.affinity.podAffinity(podAffinity)),
          podAntiAffinity(podAntiAffinity):: affinity($.v1.affinity.podAntiAffinity(podAntiAffinity)),
        },
        securityContext:: {
          local securityContext(mixin) = {securityContext+: mixin},
          fsGroup(fsGroup):: securityContext($.v1.podSecurityContext.fsGroup(fsGroup)),
          runAsNonRoot(runAsNonRoot):: securityContext($.v1.podSecurityContext.runAsNonRoot(runAsNonRoot)),
          runAsUser(runAsUser):: securityContext($.v1.podSecurityContext.runAsUser(runAsUser)),
          seLinuxOptions(seLinuxOptions):: securityContext($.v1.podSecurityContext.seLinuxOptions(seLinuxOptions)),
          supplementalGroups(supplementalGroups):: securityContext($.v1.podSecurityContext.supplementalGroups(supplementalGroups)),
        },
      },
    },
    podStatus:: {
      default()::
      {
        conditions: [],
        containerStatuses: [],
        initContainerStatuses: [],
      },
      // Current service state of pod. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-conditions
      conditions(conditions):: if std.type(conditions) == "array" then {conditions+: conditions} else {conditions+: [conditions]},
      // The list has one entry per container in the manifest. Each entry is currently the output of `docker inspect`. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-and-container-status
      containerStatuses(containerStatuses):: if std.type(containerStatuses) == "array" then {containerStatuses+: containerStatuses} else {containerStatuses+: [containerStatuses]},
      // IP address of the host to which the pod is assigned. Empty if not yet scheduled.
      hostIP(hostIP):: {hostIP: hostIP},
      // The list has one entry per init container in the manifest. The most recent successful init container will have ready = true, the most recently started container will have startTime set. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-and-container-status
      initContainerStatuses(initContainerStatuses):: if std.type(initContainerStatuses) == "array" then {initContainerStatuses+: initContainerStatuses} else {initContainerStatuses+: [initContainerStatuses]},
      // A human readable message indicating details about why the pod is in this condition.
      message(message):: {message: message},
      // Current condition of the pod. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-phase
      phase(phase):: {phase: phase},
      // IP address allocated to the pod. Routable at least within the cluster. Empty if not yet allocated.
      podIP(podIP):: {podIP: podIP},
      // The Quality of Service (QOS) classification assigned to the pod based on resource requirements See PodQOSClass type for available QOS classes More info: https://github.com/kubernetes/kubernetes/blob/master/docs/design/resource-qos.md
      qosClass(qosClass):: {qosClass: qosClass},
      // A brief CamelCase message indicating details about why the pod is in this state. e.g. 'OutOfDisk'
      reason(reason):: {reason: reason},
      // RFC 3339 date and time at which the object was acknowledged by the Kubelet. This is before the Kubelet pulled the container image(s) for the pod.
      startTime(startTime):: {startTime: startTime},
    },
    podTemplate:: {
      local kind = {kind: "PodTemplate"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        template: {},
      },
      // Template defines the pods that will be created from this pod template. https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      template(template):: {template+: template},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        template:: {
          local template(mixin) = {template+: mixin},
          spec(spec):: template($.v1.podTemplateSpec.spec(spec)),
        },
      },
    },
    podTemplateList:: {
      local kind = {kind: "PodTemplateList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // List of pod templates
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    podTemplateSpec:: {
      default(name, namespace="default")::
        defaultMetadata(name, namespace) +
      {
        spec: {},
      },
      // Specification of the desired behavior of the pod. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      spec(spec):: {spec+: spec},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          activeDeadlineSeconds(activeDeadlineSeconds):: spec($.v1.podSpec.activeDeadlineSeconds(activeDeadlineSeconds)),
          affinity(affinity):: spec($.v1.podSpec.affinity(affinity)),
          automountServiceAccountToken(automountServiceAccountToken):: spec($.v1.podSpec.automountServiceAccountToken(automountServiceAccountToken)),
          containers(containers):: spec($.v1.podSpec.containers(containers)),
          dnsPolicy(dnsPolicy):: spec($.v1.podSpec.dnsPolicy(dnsPolicy)),
          hostIPC(hostIPC):: spec($.v1.podSpec.hostIPC(hostIPC)),
          hostMappings(hostMappings):: spec($.v1.podSpec.hostMappings(hostMappings)),
          hostNetwork(hostNetwork):: spec($.v1.podSpec.hostNetwork(hostNetwork)),
          hostPID(hostPID):: spec($.v1.podSpec.hostPID(hostPID)),
          hostname(hostname):: spec($.v1.podSpec.hostname(hostname)),
          imagePullSecrets(imagePullSecrets):: spec($.v1.podSpec.imagePullSecrets(imagePullSecrets)),
          initContainers(initContainers):: spec($.v1.podSpec.initContainers(initContainers)),
          nodeName(nodeName):: spec($.v1.podSpec.nodeName(nodeName)),
          nodeSelector(nodeSelector):: spec($.v1.podSpec.nodeSelector(nodeSelector)),
          restartPolicy(restartPolicy):: spec($.v1.podSpec.restartPolicy(restartPolicy)),
          schedulerName(schedulerName):: spec($.v1.podSpec.schedulerName(schedulerName)),
          securityContext(securityContext):: spec($.v1.podSpec.securityContext(securityContext)),
          serviceAccount(serviceAccount):: spec($.v1.podSpec.serviceAccount(serviceAccount)),
          serviceAccountName(serviceAccountName):: spec($.v1.podSpec.serviceAccountName(serviceAccountName)),
          subdomain(subdomain):: spec($.v1.podSpec.subdomain(subdomain)),
          terminationGracePeriodSeconds(terminationGracePeriodSeconds):: spec($.v1.podSpec.terminationGracePeriodSeconds(terminationGracePeriodSeconds)),
          tolerations(tolerations):: spec($.v1.podSpec.tolerations(tolerations)),
          volumes(volumes):: spec($.v1.podSpec.volumes(volumes)),
        },
      },
    },
    portworxVolumeSource:: {
      default(volumeID)::
      {
        volumeID: volumeID,
      },
      // FSType represents the filesystem type to mount Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs". Implicitly inferred to be "ext4" if unspecified.
      fsType(fsType):: {fsType: fsType},
      // Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
      readOnly(readOnly):: {readOnly: readOnly},
      // VolumeID uniquely identifies a Portworx volume
      volumeID(volumeID):: {volumeID: volumeID},
    },
    preconditions:: {
      default()::
      {
        uid: {},
      },
      // Specifies the target UID.
      uid(uid):: {uid+: uid},
    },
    preferredSchedulingTerm:: {
      default(weight, preference)::
      {
        preference: preference,
        weight: weight,
      },
      // A node selector term, associated with the corresponding weight.
      preference(preference):: {preference+: preference},
      // Weight associated with matching the corresponding nodeSelectorTerm, in the range 1-100.
      weight(weight):: {weight: weight},
      mixin:: {
        preference:: {
          local preference(mixin) = {preference+: mixin},
          matchExpressions(matchExpressions):: preference($.v1.nodeSelectorTerm.matchExpressions(matchExpressions)),
        },
      },
    },
    probe:: {
      default()::
      {
        exec: {},
        httpGet: {},
        tcpSocket: {},
      },
      // One and only one of the following should be specified. Exec specifies the action to take.
      exec(exec):: {exec+: exec},
      // Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.
      failureThreshold(failureThreshold):: {failureThreshold: failureThreshold},
      // HTTPGet specifies the http request to perform.
      httpGet(httpGet):: {httpGet+: httpGet},
      // Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
      initialDelaySeconds(initialDelaySeconds):: {initialDelaySeconds: initialDelaySeconds},
      // How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.
      periodSeconds(periodSeconds):: {periodSeconds: periodSeconds},
      // Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness. Minimum value is 1.
      successThreshold(successThreshold):: {successThreshold: successThreshold},
      // TCPSocket specifies an action involving a TCP port. TCP hooks not yet supported
      tcpSocket(tcpSocket):: {tcpSocket+: tcpSocket},
      // Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
      timeoutSeconds(timeoutSeconds):: {timeoutSeconds: timeoutSeconds},
      mixin:: {
        exec:: {
          local exec(mixin) = {exec+: mixin},
          command(command):: exec($.v1.execAction.command(command)),
        },
        httpGet:: {
          local httpGet(mixin) = {httpGet+: mixin},
          host(host):: httpGet($.v1.hTTPGetAction.host(host)),
          httpHeaders(httpHeaders):: httpGet($.v1.hTTPGetAction.httpHeaders(httpHeaders)),
          path(path):: httpGet($.v1.hTTPGetAction.path(path)),
          port(port):: httpGet($.v1.hTTPGetAction.port(port)),
          scheme(scheme):: httpGet($.v1.hTTPGetAction.scheme(scheme)),
        },
        tcpSocket:: {
          local tcpSocket(mixin) = {tcpSocket+: mixin},
          host(host):: tcpSocket($.v1.tCPSocketAction.host(host)),
          port(port):: tcpSocket($.v1.tCPSocketAction.port(port)),
        },
      },
    },
    projectedVolumeSource:: {
      default(sources)::
      {
        sources: if std.type(sources) == "array" then sources else [sources],
      },
      // Mode bits to use on created files by default. Must be a value between 0 and 0777. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
      defaultMode(defaultMode):: {defaultMode: defaultMode},
      // list of volume projections
      sources(sources):: if std.type(sources) == "array" then {sources+: sources} else {sources+: [sources]},
    },
    quobyteVolumeSource:: {
      default(registry, volume)::
      {
        registry: registry,
        volume: volume,
      },
      // Group to map volume access to Default is no group
      group(group):: {group: group},
      // ReadOnly here will force the Quobyte volume to be mounted with read-only permissions. Defaults to false.
      readOnly(readOnly):: {readOnly: readOnly},
      // Registry represents a single or multiple Quobyte Registry services specified as a string as host:port pair (multiple entries are separated with commas) which acts as the central registry for volumes
      registry(registry):: {registry: registry},
      // User to map volume access to Defaults to serivceaccount user
      user(user):: {user: user},
      // Volume is a string that references an already created Quobyte volume by name.
      volume(volume):: {volume: volume},
    },
    rBDVolumeSource:: {
      default(monitors, image)::
      {
        image: image,
        monitors: if std.type(monitors) == "array" then monitors else [monitors],
        secretRef: {},
      },
      // Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd
      fsType(fsType):: {fsType: fsType},
      // The rados image name. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      image(image):: {image: image},
      // Keyring is the path to key ring for RBDUser. Default is /etc/ceph/keyring. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      keyring(keyring):: {keyring: keyring},
      // A collection of Ceph monitors. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      monitors(monitors):: if std.type(monitors) == "array" then {monitors+: monitors} else {monitors+: [monitors]},
      // The rados pool name. Default is rbd. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      pool(pool):: {pool: pool},
      // ReadOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      readOnly(readOnly):: {readOnly: readOnly},
      // SecretRef is name of the authentication secret for RBDUser. If provided overrides keyring. Default is nil. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      secretRef(secretRef):: {secretRef+: secretRef},
      // The rados user name. Default is admin. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      user(user):: {user: user},
      mixin:: {
        secretRef:: {
          local secretRef(mixin) = {secretRef+: mixin},
          name(name):: secretRef($.v1.localObjectReference.name(name)),
        },
      },
    },
    replicationController:: {
      local kind = {kind: "ReplicationController"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        spec: {},
        status: {},
      },
      // Spec defines the specification of the desired behavior of the replication controller. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      spec(spec):: {spec+: spec},
      // Status is the most recently observed status of the replication controller. This data may be out of date by some window of time. Populated by the system. Read-only. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      status(status):: {status+: status},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          minReadySeconds(minReadySeconds):: spec($.v1.replicationControllerSpec.minReadySeconds(minReadySeconds)),
          replicas(replicas):: spec($.v1.replicationControllerSpec.replicas(replicas)),
          selector(selector):: spec($.v1.replicationControllerSpec.selector(selector)),
          template(template):: spec($.v1.replicationControllerSpec.template(template)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          availableReplicas(availableReplicas):: status($.v1.replicationControllerStatus.availableReplicas(availableReplicas)),
          conditions(conditions):: status($.v1.replicationControllerStatus.conditions(conditions)),
          fullyLabeledReplicas(fullyLabeledReplicas):: status($.v1.replicationControllerStatus.fullyLabeledReplicas(fullyLabeledReplicas)),
          observedGeneration(observedGeneration):: status($.v1.replicationControllerStatus.observedGeneration(observedGeneration)),
          readyReplicas(readyReplicas):: status($.v1.replicationControllerStatus.readyReplicas(readyReplicas)),
          replicas(replicas):: status($.v1.replicationControllerStatus.replicas(replicas)),
        },
      },
    },
    replicationControllerCondition:: {
      default(type, status)::
      {
        status: status,
        type: type,
      },
      // The last time the condition transitioned from one status to another.
      lastTransitionTime(lastTransitionTime):: {lastTransitionTime: lastTransitionTime},
      // A human readable message indicating details about the transition.
      message(message):: {message: message},
      // The reason for the condition's last transition.
      reason(reason):: {reason: reason},
      // Status of the condition, one of True, False, Unknown.
      status(status):: {status: status},
      // Type of replication controller condition.
      type(type):: {type: type},
    },
    replicationControllerList:: {
      local kind = {kind: "ReplicationControllerList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // List of replication controllers. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    replicationControllerSpec:: {
      default()::
      {
        selector: {},
        template: {},
      },
      // Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
      minReadySeconds(minReadySeconds):: {minReadySeconds: minReadySeconds},
      // Replicas is the number of desired replicas. This is a pointer to distinguish between explicit zero and unspecified. Defaults to 1. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#what-is-a-replicationcontroller
      replicas(replicas):: {replicas: replicas},
      // Selector is a label query over pods that should match the Replicas count. If Selector is empty, it is defaulted to the labels present on the Pod template. Label keys and values that must match in order to be controlled by this replication controller, if empty defaulted to labels on Pod template. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
      selector(selector):: {selector+: selector},
      // Template is the object that describes the pod that will be created if insufficient replicas are detected. This takes precedence over a TemplateRef. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template
      template(template):: {template+: template},
      mixin:: {
        template:: {
          local template(mixin) = {template+: mixin},
          spec(spec):: template($.v1.podTemplateSpec.spec(spec)),
        },
      },
    },
    replicationControllerStatus:: {
      default(replicas)::
      {
        conditions: [],
        replicas: replicas,
      },
      // The number of available replicas (ready for at least minReadySeconds) for this replication controller.
      availableReplicas(availableReplicas):: {availableReplicas: availableReplicas},
      // Represents the latest available observations of a replication controller's current state.
      conditions(conditions):: if std.type(conditions) == "array" then {conditions+: conditions} else {conditions+: [conditions]},
      // The number of pods that have labels matching the labels of the pod template of the replication controller.
      fullyLabeledReplicas(fullyLabeledReplicas):: {fullyLabeledReplicas: fullyLabeledReplicas},
      // ObservedGeneration reflects the generation of the most recently observed replication controller.
      observedGeneration(observedGeneration):: {observedGeneration: observedGeneration},
      // The number of ready replicas for this replication controller.
      readyReplicas(readyReplicas):: {readyReplicas: readyReplicas},
      // Replicas is the most recently oberved number of replicas. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#what-is-a-replicationcontroller
      replicas(replicas):: {replicas: replicas},
    },
    resourceFieldSelector:: {
      default(resource)::
      {
        resource: resource,
      },
      // Container name: required for volumes, optional for env vars
      containerName(containerName):: {containerName: containerName},
      // Specifies the output format of the exposed resources, defaults to "1"
      divisor(divisor):: {divisor: divisor},
      // Required: resource to select
      resource(resource):: {resource: resource},
    },
    resourceQuota:: {
      local kind = {kind: "ResourceQuota"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        spec: {},
        status: {},
      },
      // Spec defines the desired quota. https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      spec(spec):: {spec+: spec},
      // Status defines the actual enforced quota and its current usage. https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      status(status):: {status+: status},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          hard(hard):: spec($.v1.resourceQuotaSpec.hard(hard)),
          scopes(scopes):: spec($.v1.resourceQuotaSpec.scopes(scopes)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          hard(hard):: status($.v1.resourceQuotaStatus.hard(hard)),
          used(used):: status($.v1.resourceQuotaStatus.used(used)),
        },
      },
    },
    resourceQuotaList:: {
      local kind = {kind: "ResourceQuotaList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // Items is a list of ResourceQuota objects. More info: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/admission_control_resource_quota.md
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    resourceQuotaScope:: {
    },
    resourceQuotaSpec:: {
      default()::
      {
        hard: {},
        scopes: [],
      },
      // Hard is the set of desired hard limits for each named resource. More info: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/admission_control_resource_quota.md
      hard(hard):: {hard+: hard},
      // A collection of filters that must match each object tracked by a quota. If not specified, the quota matches all objects.
      scopes(scopes):: if std.type(scopes) == "array" then {scopes+: scopes} else {scopes+: [scopes]},
    },
    resourceQuotaStatus:: {
      default()::
      {
        hard: {},
        used: {},
      },
      // Hard is the set of enforced hard limits for each named resource. More info: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/admission_control_resource_quota.md
      hard(hard):: {hard+: hard},
      // Used is the current observed total usage of the resource in the namespace.
      used(used):: {used+: used},
    },
    resourceRequirements:: {
      default()::
      {
        limits: {},
        requests: {},
      },
      // Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
      limits(limits):: {limits+: limits},
      // Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
      requests(requests):: {requests+: requests},
    },
    sELinuxOptions:: {
      // Level is SELinux level label that applies to the container.
      level(level):: {level: level},
      // Role is a SELinux role label that applies to the container.
      role(role):: {role: role},
      // Type is a SELinux type label that applies to the container.
      type(type):: {type: type},
      // User is a SELinux user label that applies to the container.
      user(user):: {user: user},
    },
    scale:: {
      local kind = {kind: "Scale"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        spec: {},
        status: {},
      },
      // defines the behavior of the scale. More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#spec-and-status.
      spec(spec):: {spec+: spec},
      // current status of the scale. More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#spec-and-status. Read-only.
      status(status):: {status+: status},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          replicas(replicas):: spec($.v1.scaleSpec.replicas(replicas)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          replicas(replicas):: status($.v1.scaleStatus.replicas(replicas)),
          selector(selector):: status($.v1.scaleStatus.selector(selector)),
        },
      },
    },
    scaleIOVolumeSource:: {
      default(gateway, system, secretRef)::
      {
        gateway: gateway,
        secretRef: secretRef,
        system: system,
      },
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
      fsType(fsType):: {fsType: fsType},
      // The host address of the ScaleIO API Gateway.
      gateway(gateway):: {gateway: gateway},
      // The name of the Protection Domain for the configured storage (defaults to "default").
      protectionDomain(protectionDomain):: {protectionDomain: protectionDomain},
      // Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
      readOnly(readOnly):: {readOnly: readOnly},
      // SecretRef references to the secret for ScaleIO user and other sensitive information. If this is not provided, Login operation will fail.
      secretRef(secretRef):: {secretRef+: secretRef},
      // Flag to enable/disable SSL communication with Gateway, default false
      sslEnabled(sslEnabled):: {sslEnabled: sslEnabled},
      // Indicates whether the storage for a volume should be thick or thin (defaults to "thin").
      storageMode(storageMode):: {storageMode: storageMode},
      // The Storage Pool associated with the protection domain (defaults to "default").
      storagePool(storagePool):: {storagePool: storagePool},
      // The name of the storage system as configured in ScaleIO.
      system(system):: {system: system},
      // The name of a volume already created in the ScaleIO system that is associated with this volume source.
      volumeName(volumeName):: {volumeName: volumeName},
      mixin:: {
        secretRef:: {
          local secretRef(mixin) = {secretRef+: mixin},
          name(name):: secretRef($.v1.localObjectReference.name(name)),
        },
      },
    },
    scaleSpec:: {
      // desired number of instances for the scaled object.
      replicas(replicas):: {replicas: replicas},
    },
    scaleStatus:: {
      default(replicas)::
      {
        replicas: replicas,
      },
      // actual number of observed instances of the scaled object.
      replicas(replicas):: {replicas: replicas},
      // label query over pods that should match the replicas count. This is same as the label selector but in the string format to avoid introspection by clients. The string will be in the same format as the query-param syntax. More info about label selectors: http://kubernetes.io/docs/user-guide/labels#label-selectors
      selector(selector):: {selector: selector},
    },
    secret:: {
      local kind = {kind: "Secret"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        data: {},
        stringData: {},
      },
      // Data contains the secret data. Each key must consist of alphanumeric characters, '-', '_' or '.'. The serialized form of the secret data is a base64 encoded string, representing the arbitrary (possibly non-string) data value here. Described in https://tools.ietf.org/html/rfc4648#section-4
      data(data):: {data+: data},
      // stringData allows specifying non-binary secret data in string form. It is provided as a write-only convenience method. All keys and values are merged into the data field on write, overwriting any existing values. It is never output when reading from the API.
      stringData(stringData):: {stringData+: stringData},
      // Used to facilitate programmatic handling of secret data.
      type(type):: {type: type},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
      },
    },
    secretEnvSource:: {
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the Secret must be defined
      optional(optional):: {optional: optional},
    },
    secretKeySelector:: {
      default(key)::
      {
        key: key,
      },
      // The key of the secret to select from.  Must be a valid secret key.
      key(key):: {key: key},
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the Secret or it's key must be defined
      optional(optional):: {optional: optional},
    },
    secretList:: {
      local kind = {kind: "SecretList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // Items is a list of secret objects. More info: https://kubernetes.io/docs/concepts/configuration/secret
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    secretProjection:: {
      default()::
      {
        items: [],
      },
      // If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the Secret or its key must be defined
      optional(optional):: {optional: optional},
    },
    secretVolumeSource:: {
      default()::
      {
        items: [],
      },
      // Optional: mode bits to use on created files by default. Must be a value between 0 and 0777. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
      defaultMode(defaultMode):: {defaultMode: defaultMode},
      // If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      // Specify whether the Secret or it's keys must be defined
      optional(optional):: {optional: optional},
      // Name of the secret in the pod's namespace to use. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
      secretName(secretName):: {secretName: secretName},
    },
    securityContext:: {
      default()::
      {
        capabilities: {},
        runAsUser: {},
        seLinuxOptions: {},
      },
      // The capabilities to add/drop when running containers. Defaults to the default set of capabilities granted by the container runtime.
      capabilities(capabilities):: {capabilities+: capabilities},
      // Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to false.
      privileged(privileged):: {privileged: privileged},
      // Whether this container has a read-only root filesystem. Default is false.
      readOnlyRootFilesystem(readOnlyRootFilesystem):: {readOnlyRootFilesystem: readOnlyRootFilesystem},
      // Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
      runAsNonRoot(runAsNonRoot):: {runAsNonRoot: runAsNonRoot},
      // The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
      runAsUser(runAsUser):: {runAsUser+: runAsUser},
      // The SELinux context to be applied to the container. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
      seLinuxOptions(seLinuxOptions):: {seLinuxOptions+: seLinuxOptions},
      mixin:: {
        capabilities:: {
          local capabilities(mixin) = {capabilities+: mixin},
          add(add):: capabilities($.v1.capabilities.add(add)),
          drop(drop):: capabilities($.v1.capabilities.drop(drop)),
        },
        seLinuxOptions:: {
          local seLinuxOptions(mixin) = {seLinuxOptions+: mixin},
          level(level):: seLinuxOptions($.v1.sELinuxOptions.level(level)),
          role(role):: seLinuxOptions($.v1.sELinuxOptions.role(role)),
          type(type):: seLinuxOptions($.v1.sELinuxOptions.type(type)),
          user(user):: seLinuxOptions($.v1.sELinuxOptions.user(user)),
        },
      },
    },
    service:: {
      local kind = {kind: "Service"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        spec: {},
        status: {},
      },
      // Spec defines the behavior of a service. https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      spec(spec):: {spec+: spec},
      // Most recently observed status of the service. Populated by the system. Read-only. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      status(status):: {status+: status},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          clusterIP(clusterIP):: spec($.v1.serviceSpec.clusterIP(clusterIP)),
          externalIPs(externalIPs):: spec($.v1.serviceSpec.externalIPs(externalIPs)),
          externalName(externalName):: spec($.v1.serviceSpec.externalName(externalName)),
          externalTrafficPolicy(externalTrafficPolicy):: spec($.v1.serviceSpec.externalTrafficPolicy(externalTrafficPolicy)),
          healthCheckNodePort(healthCheckNodePort):: spec($.v1.serviceSpec.healthCheckNodePort(healthCheckNodePort)),
          loadBalancerIP(loadBalancerIP):: spec($.v1.serviceSpec.loadBalancerIP(loadBalancerIP)),
          loadBalancerSourceRanges(loadBalancerSourceRanges):: spec($.v1.serviceSpec.loadBalancerSourceRanges(loadBalancerSourceRanges)),
          ports(ports):: spec($.v1.serviceSpec.ports(ports)),
          selector(selector):: spec($.v1.serviceSpec.selector(selector)),
          sessionAffinity(sessionAffinity):: spec($.v1.serviceSpec.sessionAffinity(sessionAffinity)),
          type(type):: spec($.v1.serviceSpec.type(type)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          loadBalancer(loadBalancer):: status($.v1.serviceStatus.loadBalancer(loadBalancer)),
        },
      },
    },
    serviceAccount:: {
      local kind = {kind: "ServiceAccount"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        imagePullSecrets: [],
        secrets: [],
      },
      // AutomountServiceAccountToken indicates whether pods running as this service account should have an API token automatically mounted. Can be overridden at the pod level.
      automountServiceAccountToken(automountServiceAccountToken):: {automountServiceAccountToken: automountServiceAccountToken},
      // ImagePullSecrets is a list of references to secrets in the same namespace to use for pulling any images in pods that reference this ServiceAccount. ImagePullSecrets are distinct from Secrets because Secrets can be mounted in the pod, but ImagePullSecrets are only accessed by the kubelet. More info: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
      imagePullSecrets(imagePullSecrets):: if std.type(imagePullSecrets) == "array" then {imagePullSecrets+: imagePullSecrets} else {imagePullSecrets+: [imagePullSecrets]},
      // Secrets is the list of secrets allowed to be used by pods running using this ServiceAccount. More info: https://kubernetes.io/docs/concepts/configuration/secret
      secrets(secrets):: if std.type(secrets) == "array" then {secrets+: secrets} else {secrets+: [secrets]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
      },
    },
    serviceAccountList:: {
      local kind = {kind: "ServiceAccountList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // List of ServiceAccounts. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    serviceList:: {
      local kind = {kind: "ServiceList"},
      default(name, items, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        items: if std.type(items) == "array" then items else [items],
      },
      // List of services
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    servicePort:: {
      default(port)::
      {
        port: port,
      },
      // The name of this port within the service. This must be a DNS_LABEL. All ports within a ServiceSpec must have unique names. This maps to the 'Name' field in EndpointPort objects. Optional if only one ServicePort is defined on this service.
      name(name):: {name: name},
      // The port on each node on which this service is exposed when type=NodePort or LoadBalancer. Usually assigned by the system. If specified, it will be allocated to the service if unused or else creation of the service will fail. Default is to auto-allocate a port if the ServiceType of this Service requires one. More info: https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
      nodePort(nodePort):: {nodePort: nodePort},
      // The port that will be exposed by this service.
      port(port):: {port: port},
      // The IP protocol for this port. Supports "TCP" and "UDP". Default is TCP.
      protocol(protocol):: {protocol: protocol},
      // Number or name of the port to access on the pods targeted by the service. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME. If this is a string, it will be looked up as a named port in the target Pod's container ports. If this is not specified, the value of the 'port' field is used (an identity map). This field is ignored for services with clusterIP=None, and should be omitted or set equal to the 'port' field. More info: https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service
      targetPort(targetPort):: {targetPort: targetPort},
    },
    serviceSpec:: {
      default()::
      {
        externalIPs: [],
        loadBalancerSourceRanges: [],
        ports: [],
        selector: {},
      },
      // clusterIP is the IP address of the service and is usually assigned randomly by the master. If an address is specified manually and is not in use by others, it will be allocated to the service; otherwise, creation of the service will fail. This field can not be changed through updates. Valid values are "None", empty string (""), or a valid IP address. "None" can be specified for headless services when proxying is not required. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
      clusterIP(clusterIP):: {clusterIP: clusterIP},
      // externalIPs is a list of IP addresses for which nodes in the cluster will also accept traffic for this service.  These IPs are not managed by Kubernetes.  The user is responsible for ensuring that traffic arrives at a node with this IP.  A common example is external load-balancers that are not part of the Kubernetes system.
      externalIPs(externalIPs):: if std.type(externalIPs) == "array" then {externalIPs+: externalIPs} else {externalIPs+: [externalIPs]},
      // externalName is the external reference that kubedns or equivalent will return as a CNAME record for this service. No proxying will be involved. Must be a valid DNS name and requires Type to be ExternalName.
      externalName(externalName):: {externalName: externalName},
      // externalTrafficPolicy denotes if this Service desires to route external traffic to local endpoints only. This preserves Source IP and avoids a second hop for LoadBalancer and Nodeport type services.
      externalTrafficPolicy(externalTrafficPolicy):: {externalTrafficPolicy: externalTrafficPolicy},
      // healthCheckNodePort specifies the healthcheck nodePort for the service. If not specified, HealthCheckNodePort is created by the service api backend with the allocated nodePort. Will use user-specified nodePort value if specified by the client. Only effects when Type is set to LoadBalancer and ExternalTrafficPolicy is set to Local.
      healthCheckNodePort(healthCheckNodePort):: {healthCheckNodePort: healthCheckNodePort},
      // Only applies to Service Type: LoadBalancer LoadBalancer will get created with the IP specified in this field. This feature depends on whether the underlying cloud-provider supports specifying the loadBalancerIP when a load balancer is created. This field will be ignored if the cloud-provider does not support the feature.
      loadBalancerIP(loadBalancerIP):: {loadBalancerIP: loadBalancerIP},
      // If specified and supported by the platform, this will restrict traffic through the cloud-provider load-balancer will be restricted to the specified client IPs. This field will be ignored if the cloud-provider does not support the feature." More info: https://kubernetes.io/docs/tasks/access-application-cluster/configure-cloud-provider-firewall/
      loadBalancerSourceRanges(loadBalancerSourceRanges):: if std.type(loadBalancerSourceRanges) == "array" then {loadBalancerSourceRanges+: loadBalancerSourceRanges} else {loadBalancerSourceRanges+: [loadBalancerSourceRanges]},
      // The list of ports that are exposed by this service. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
      ports(ports):: if std.type(ports) == "array" then {ports+: ports} else {ports+: [ports]},
      // Route service traffic to pods with label keys and values matching this selector. If empty or not present, the service is assumed to have an external process managing its endpoints, which Kubernetes will not modify. Only applies to types ClusterIP, NodePort, and LoadBalancer. Ignored if type is ExternalName. More info: https://kubernetes.io/docs/concepts/services-networking/service/
      selector(selector):: {selector+: selector},
      // Supports "ClientIP" and "None". Used to maintain session affinity. Enable client IP based session affinity. Must be ClientIP or None. Defaults to None. More info: https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies
      sessionAffinity(sessionAffinity):: {sessionAffinity: sessionAffinity},
      // type determines how the Service is exposed. Defaults to ClusterIP. Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. "ExternalName" maps to the specified externalName. "ClusterIP" allocates a cluster-internal IP address for load-balancing to endpoints. Endpoints are determined by the selector or if that is not specified, by manual construction of an Endpoints object. If clusterIP is "None", no virtual IP is allocated and the endpoints are published as a set of endpoints rather than a stable IP. "NodePort" builds on ClusterIP and allocates a port on every node which routes to the clusterIP. "LoadBalancer" builds on NodePort and creates an external load-balancer (if supported in the current cloud) which routes to the clusterIP. More info: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services 
      type(type):: {type: type},
    },
    serviceStatus:: {
      default()::
      {
        loadBalancer: {},
      },
      // LoadBalancer contains the current status of the load-balancer, if one is present.
      loadBalancer(loadBalancer):: {loadBalancer+: loadBalancer},
      mixin:: {
        loadBalancer:: {
          local loadBalancer(mixin) = {loadBalancer+: mixin},
          ingress(ingress):: loadBalancer($.v1.loadBalancerStatus.ingress(ingress)),
        },
      },
    },
    status:: {
      local kind = {kind: "Status"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        details: {},
      },
      // Suggested HTTP return code for this status, 0 if not set.
      code(code):: {code: code},
      // Extended data associated with the reason.  Each reason may define its own extended details. This field is optional and the data returned is not guaranteed to conform to any schema except that defined by the reason type.
      details(details):: {details+: details},
      // A human-readable description of the status of this operation.
      message(message):: {message: message},
      // A machine-readable description of why this operation is in the "Failure" status. If this value is empty there is no information available. A Reason clarifies an HTTP status code but does not override it.
      reason(reason):: {reason: reason},
      // Status of the operation. One of: "Success" or "Failure". More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#spec-and-status
      status(status):: {status: status},
      mixin:: {
        details:: {
          local details(mixin) = {details+: mixin},
          causes(causes):: details($.v1.statusDetails.causes(causes)),
          group(group):: details($.v1.statusDetails.group(group)),
          name(name):: details($.v1.statusDetails.name(name)),
          retryAfterSeconds(retryAfterSeconds):: details($.v1.statusDetails.retryAfterSeconds(retryAfterSeconds)),
          uid(uid):: details($.v1.statusDetails.uid(uid)),
        },
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
        },
      },
    },
    statusCause:: {
      // The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed.  Fields may appear more than once in an array of causes due to fields having multiple errors. Optional.
      // 
      // Examples:
      //   "name" - the field "name" on the current resource
      //   "items[0].name" - the field "name" on the first array entry in "items"
      field(field):: {field: field},
      // A human-readable description of the cause of the error.  This field may be presented as-is to a reader.
      message(message):: {message: message},
      // A machine-readable description of the cause of the error. If this value is empty there is no information available.
      reason(reason):: {reason: reason},
    },
    statusDetails:: {
      local kind = {kind: "StatusDetails"},
      default()::
        kind +
      {
        causes: [],
      },
      // The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes.
      causes(causes):: if std.type(causes) == "array" then {causes+: causes} else {causes+: [causes]},
      // The group attribute of the resource associated with the status StatusReason.
      group(group):: {group: group},
      // The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described).
      name(name):: {name: name},
      // If specified, the time in seconds before the operation should be retried.
      retryAfterSeconds(retryAfterSeconds):: {retryAfterSeconds: retryAfterSeconds},
      // UID of the resource. (when there is a single resource which can be described). More info: http://kubernetes.io/docs/user-guide/identifiers#uids
      uid(uid):: {uid: uid},
    },
    tCPSocketAction:: {
      default(port)::
      {
        port: port,
      },
      // Optional: Host name to connect to, defaults to the pod IP.
      host(host):: {host: host},
      // Number or name of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.
      port(port):: {port: port},
    },
    taint:: {
      default(key, effect)::
      {
        effect: effect,
        key: key,
      },
      // Required. The effect of the taint on pods that do not tolerate the taint. Valid effects are NoSchedule, PreferNoSchedule and NoExecute.
      effect(effect):: {effect: effect},
      // Required. The taint key to be applied to a node.
      key(key):: {key: key},
      // TimeAdded represents the time at which the taint was added. It is only written for NoExecute taints.
      timeAdded(timeAdded):: {timeAdded: timeAdded},
      // Required. The taint value corresponding to the taint key.
      value(value):: {value: value},
    },
    toleration:: {
      // Effect indicates the taint effect to match. Empty means match all taint effects. When specified, allowed values are NoSchedule, PreferNoSchedule and NoExecute.
      effect(effect):: {effect: effect},
      // Key is the taint key that the toleration applies to. Empty means match all taint keys. If the key is empty, operator must be Exists; this combination means to match all values and all keys.
      key(key):: {key: key},
      // Operator represents a key's relationship to the value. Valid operators are Exists and Equal. Defaults to Equal. Exists is equivalent to wildcard for value, so that a pod can tolerate all taints of a particular category.
      operator(operator):: {operator: operator},
      // TolerationSeconds represents the period of time the toleration (which must be of effect NoExecute, otherwise this field is ignored) tolerates the taint. By default, it is not set, which means tolerate the taint forever (do not evict). Zero and negative values will be treated as 0 (evict immediately) by the system.
      tolerationSeconds(tolerationSeconds):: {tolerationSeconds: tolerationSeconds},
      // Value is the taint value the toleration matches to. If the operator is Exists, the value should be empty, otherwise just a regular string.
      value(value):: {value: value},
    },
    uniqueVolumeName:: {
    },
    volume:: {
      default(name)::
      {
        awsElasticBlockStore: {},
        azureDisk: {},
        azureFile: {},
        cephfs: {},
        cinder: {},
        configMap: {},
        downwardAPI: {},
        emptyDir: {},
        fc: {},
        flexVolume: {},
        flocker: {},
        gcePersistentDisk: {},
        gitRepo: {},
        glusterfs: {},
        hostPath: {},
        iscsi: {},
        name: name,
        nfs: {},
        persistentVolumeClaim: {},
        photonPersistentDisk: {},
        portworxVolume: {},
        projected: {},
        quobyte: {},
        rbd: {},
        scaleIO: {},
        secret: {},
        vsphereVolume: {},
      },
      // AWSElasticBlockStore represents an AWS Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
      awsElasticBlockStore(awsElasticBlockStore):: {awsElasticBlockStore+: awsElasticBlockStore},
      // AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
      azureDisk(azureDisk):: {azureDisk+: azureDisk},
      // AzureFile represents an Azure File Service mount on the host and bind mount to the pod.
      azureFile(azureFile):: {azureFile+: azureFile},
      // CephFS represents a Ceph FS mount on the host that shares a pod's lifetime
      cephfs(cephfs):: {cephfs+: cephfs},
      // Cinder represents a cinder volume attached and mounted on kubelets host machine More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
      cinder(cinder):: {cinder+: cinder},
      // ConfigMap represents a configMap that should populate this volume
      configMap(configMap):: {configMap+: configMap},
      // DownwardAPI represents downward API about the pod that should populate this volume
      downwardAPI(downwardAPI):: {downwardAPI+: downwardAPI},
      // EmptyDir represents a temporary directory that shares a pod's lifetime. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
      emptyDir(emptyDir):: {emptyDir+: emptyDir},
      // FC represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
      fc(fc):: {fc+: fc},
      // FlexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin. This is an alpha feature and may change in future.
      flexVolume(flexVolume):: {flexVolume+: flexVolume},
      // Flocker represents a Flocker volume attached to a kubelet's host machine. This depends on the Flocker control service being running
      flocker(flocker):: {flocker+: flocker},
      // GCEPersistentDisk represents a GCE Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
      gcePersistentDisk(gcePersistentDisk):: {gcePersistentDisk+: gcePersistentDisk},
      // GitRepo represents a git repository at a particular revision.
      gitRepo(gitRepo):: {gitRepo+: gitRepo},
      // Glusterfs represents a Glusterfs mount on the host that shares a pod's lifetime. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md
      glusterfs(glusterfs):: {glusterfs+: glusterfs},
      // HostPath represents a pre-existing file or directory on the host machine that is directly exposed to the container. This is generally used for system agents or other privileged things that are allowed to see the host machine. Most containers will NOT need this. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
      hostPath(hostPath):: {hostPath+: hostPath},
      // ISCSI represents an ISCSI Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://releases.k8s.io/HEAD/examples/volumes/iscsi/README.md
      iscsi(iscsi):: {iscsi+: iscsi},
      // Volume's name. Must be a DNS_LABEL and unique within the pod. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // NFS represents an NFS mount on the host that shares a pod's lifetime More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
      nfs(nfs):: {nfs+: nfs},
      // PersistentVolumeClaimVolumeSource represents a reference to a PersistentVolumeClaim in the same namespace. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
      persistentVolumeClaim(persistentVolumeClaim):: {persistentVolumeClaim+: persistentVolumeClaim},
      // PhotonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine
      photonPersistentDisk(photonPersistentDisk):: {photonPersistentDisk+: photonPersistentDisk},
      // PortworxVolume represents a portworx volume attached and mounted on kubelets host machine
      portworxVolume(portworxVolume):: {portworxVolume+: portworxVolume},
      // Items for all in one resources secrets, configmaps, and downward API
      projected(projected):: {projected+: projected},
      // Quobyte represents a Quobyte mount on the host that shares a pod's lifetime
      quobyte(quobyte):: {quobyte+: quobyte},
      // RBD represents a Rados Block Device mount on the host that shares a pod's lifetime. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md
      rbd(rbd):: {rbd+: rbd},
      // ScaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
      scaleIO(scaleIO):: {scaleIO+: scaleIO},
      // Secret represents a secret that should populate this volume. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
      secret(secret):: {secret+: secret},
      // VsphereVolume represents a vSphere volume attached and mounted on kubelets host machine
      vsphereVolume(vsphereVolume):: {vsphereVolume+: vsphereVolume},
      mixin:: {
        awsElasticBlockStore:: {
          local awsElasticBlockStore(mixin) = {awsElasticBlockStore+: mixin},
          fsType(fsType):: awsElasticBlockStore($.v1.aWSElasticBlockStoreVolumeSource.fsType(fsType)),
          partition(partition):: awsElasticBlockStore($.v1.aWSElasticBlockStoreVolumeSource.partition(partition)),
          readOnly(readOnly):: awsElasticBlockStore($.v1.aWSElasticBlockStoreVolumeSource.readOnly(readOnly)),
          volumeID(volumeID):: awsElasticBlockStore($.v1.aWSElasticBlockStoreVolumeSource.volumeID(volumeID)),
        },
        azureDisk:: {
          local azureDisk(mixin) = {azureDisk+: mixin},
          cachingMode(cachingMode):: azureDisk($.v1.azureDiskVolumeSource.cachingMode(cachingMode)),
          diskName(diskName):: azureDisk($.v1.azureDiskVolumeSource.diskName(diskName)),
          diskURI(diskURI):: azureDisk($.v1.azureDiskVolumeSource.diskURI(diskURI)),
          fsType(fsType):: azureDisk($.v1.azureDiskVolumeSource.fsType(fsType)),
          readOnly(readOnly):: azureDisk($.v1.azureDiskVolumeSource.readOnly(readOnly)),
        },
        azureFile:: {
          local azureFile(mixin) = {azureFile+: mixin},
          readOnly(readOnly):: azureFile($.v1.azureFileVolumeSource.readOnly(readOnly)),
          secretName(secretName):: azureFile($.v1.azureFileVolumeSource.secretName(secretName)),
          shareName(shareName):: azureFile($.v1.azureFileVolumeSource.shareName(shareName)),
        },
        cephfs:: {
          local cephfs(mixin) = {cephfs+: mixin},
          monitors(monitors):: cephfs($.v1.cephFSVolumeSource.monitors(monitors)),
          path(path):: cephfs($.v1.cephFSVolumeSource.path(path)),
          readOnly(readOnly):: cephfs($.v1.cephFSVolumeSource.readOnly(readOnly)),
          secretFile(secretFile):: cephfs($.v1.cephFSVolumeSource.secretFile(secretFile)),
          secretRef(secretRef):: cephfs($.v1.cephFSVolumeSource.secretRef(secretRef)),
          user(user):: cephfs($.v1.cephFSVolumeSource.user(user)),
        },
        cinder:: {
          local cinder(mixin) = {cinder+: mixin},
          fsType(fsType):: cinder($.v1.cinderVolumeSource.fsType(fsType)),
          readOnly(readOnly):: cinder($.v1.cinderVolumeSource.readOnly(readOnly)),
          volumeID(volumeID):: cinder($.v1.cinderVolumeSource.volumeID(volumeID)),
        },
        configMap:: {
          local configMap(mixin) = {configMap+: mixin},
          defaultMode(defaultMode):: configMap($.v1.configMapVolumeSource.defaultMode(defaultMode)),
          items(items):: configMap($.v1.configMapVolumeSource.items(items)),
          name(name):: configMap($.v1.configMapVolumeSource.name(name)),
          optional(optional):: configMap($.v1.configMapVolumeSource.optional(optional)),
        },
        downwardAPI:: {
          local downwardAPI(mixin) = {downwardAPI+: mixin},
          defaultMode(defaultMode):: downwardAPI($.v1.downwardAPIVolumeSource.defaultMode(defaultMode)),
          items(items):: downwardAPI($.v1.downwardAPIVolumeSource.items(items)),
        },
        emptyDir:: {
          local emptyDir(mixin) = {emptyDir+: mixin},
          medium(medium):: emptyDir($.v1.emptyDirVolumeSource.medium(medium)),
        },
        fc:: {
          local fc(mixin) = {fc+: mixin},
          fsType(fsType):: fc($.v1.fCVolumeSource.fsType(fsType)),
          lun(lun):: fc($.v1.fCVolumeSource.lun(lun)),
          readOnly(readOnly):: fc($.v1.fCVolumeSource.readOnly(readOnly)),
          targetWWNs(targetWWNs):: fc($.v1.fCVolumeSource.targetWWNs(targetWWNs)),
        },
        flexVolume:: {
          local flexVolume(mixin) = {flexVolume+: mixin},
          driver(driver):: flexVolume($.v1.flexVolumeSource.driver(driver)),
          fsType(fsType):: flexVolume($.v1.flexVolumeSource.fsType(fsType)),
          options(options):: flexVolume($.v1.flexVolumeSource.options(options)),
          readOnly(readOnly):: flexVolume($.v1.flexVolumeSource.readOnly(readOnly)),
          secretRef(secretRef):: flexVolume($.v1.flexVolumeSource.secretRef(secretRef)),
        },
        flocker:: {
          local flocker(mixin) = {flocker+: mixin},
          datasetName(datasetName):: flocker($.v1.flockerVolumeSource.datasetName(datasetName)),
          datasetUUID(datasetUUID):: flocker($.v1.flockerVolumeSource.datasetUUID(datasetUUID)),
        },
        gcePersistentDisk:: {
          local gcePersistentDisk(mixin) = {gcePersistentDisk+: mixin},
          fsType(fsType):: gcePersistentDisk($.v1.gCEPersistentDiskVolumeSource.fsType(fsType)),
          partition(partition):: gcePersistentDisk($.v1.gCEPersistentDiskVolumeSource.partition(partition)),
          pdName(pdName):: gcePersistentDisk($.v1.gCEPersistentDiskVolumeSource.pdName(pdName)),
          readOnly(readOnly):: gcePersistentDisk($.v1.gCEPersistentDiskVolumeSource.readOnly(readOnly)),
        },
        gitRepo:: {
          local gitRepo(mixin) = {gitRepo+: mixin},
          directory(directory):: gitRepo($.v1.gitRepoVolumeSource.directory(directory)),
          repository(repository):: gitRepo($.v1.gitRepoVolumeSource.repository(repository)),
          revision(revision):: gitRepo($.v1.gitRepoVolumeSource.revision(revision)),
        },
        glusterfs:: {
          local glusterfs(mixin) = {glusterfs+: mixin},
          endpoints(endpoints):: glusterfs($.v1.glusterfsVolumeSource.endpoints(endpoints)),
          path(path):: glusterfs($.v1.glusterfsVolumeSource.path(path)),
          readOnly(readOnly):: glusterfs($.v1.glusterfsVolumeSource.readOnly(readOnly)),
        },
        hostPath:: {
          local hostPath(mixin) = {hostPath+: mixin},
          path(path):: hostPath($.v1.hostPathVolumeSource.path(path)),
        },
        iscsi:: {
          local iscsi(mixin) = {iscsi+: mixin},
          chapAuthDiscovery(chapAuthDiscovery):: iscsi($.v1.iSCSIVolumeSource.chapAuthDiscovery(chapAuthDiscovery)),
          chapAuthSession(chapAuthSession):: iscsi($.v1.iSCSIVolumeSource.chapAuthSession(chapAuthSession)),
          fsType(fsType):: iscsi($.v1.iSCSIVolumeSource.fsType(fsType)),
          iqn(iqn):: iscsi($.v1.iSCSIVolumeSource.iqn(iqn)),
          iscsiInterface(iscsiInterface):: iscsi($.v1.iSCSIVolumeSource.iscsiInterface(iscsiInterface)),
          lun(lun):: iscsi($.v1.iSCSIVolumeSource.lun(lun)),
          portals(portals):: iscsi($.v1.iSCSIVolumeSource.portals(portals)),
          readOnly(readOnly):: iscsi($.v1.iSCSIVolumeSource.readOnly(readOnly)),
          secretRef(secretRef):: iscsi($.v1.iSCSIVolumeSource.secretRef(secretRef)),
          targetPortal(targetPortal):: iscsi($.v1.iSCSIVolumeSource.targetPortal(targetPortal)),
        },
        nfs:: {
          local nfs(mixin) = {nfs+: mixin},
          path(path):: nfs($.v1.nFSVolumeSource.path(path)),
          readOnly(readOnly):: nfs($.v1.nFSVolumeSource.readOnly(readOnly)),
          server(server):: nfs($.v1.nFSVolumeSource.server(server)),
        },
        persistentVolumeClaim:: {
          local persistentVolumeClaim(mixin) = {persistentVolumeClaim+: mixin},
          claimName(claimName):: persistentVolumeClaim($.v1.persistentVolumeClaimVolumeSource.claimName(claimName)),
          readOnly(readOnly):: persistentVolumeClaim($.v1.persistentVolumeClaimVolumeSource.readOnly(readOnly)),
        },
        photonPersistentDisk:: {
          local photonPersistentDisk(mixin) = {photonPersistentDisk+: mixin},
          fsType(fsType):: photonPersistentDisk($.v1.photonPersistentDiskVolumeSource.fsType(fsType)),
          pdID(pdID):: photonPersistentDisk($.v1.photonPersistentDiskVolumeSource.pdID(pdID)),
        },
        portworxVolume:: {
          local portworxVolume(mixin) = {portworxVolume+: mixin},
          fsType(fsType):: portworxVolume($.v1.portworxVolumeSource.fsType(fsType)),
          readOnly(readOnly):: portworxVolume($.v1.portworxVolumeSource.readOnly(readOnly)),
          volumeID(volumeID):: portworxVolume($.v1.portworxVolumeSource.volumeID(volumeID)),
        },
        projected:: {
          local projected(mixin) = {projected+: mixin},
          defaultMode(defaultMode):: projected($.v1.projectedVolumeSource.defaultMode(defaultMode)),
          sources(sources):: projected($.v1.projectedVolumeSource.sources(sources)),
        },
        quobyte:: {
          local quobyte(mixin) = {quobyte+: mixin},
          group(group):: quobyte($.v1.quobyteVolumeSource.group(group)),
          readOnly(readOnly):: quobyte($.v1.quobyteVolumeSource.readOnly(readOnly)),
          registry(registry):: quobyte($.v1.quobyteVolumeSource.registry(registry)),
          user(user):: quobyte($.v1.quobyteVolumeSource.user(user)),
          volume(volume):: quobyte($.v1.quobyteVolumeSource.volume(volume)),
        },
        rbd:: {
          local rbd(mixin) = {rbd+: mixin},
          fsType(fsType):: rbd($.v1.rBDVolumeSource.fsType(fsType)),
          image(image):: rbd($.v1.rBDVolumeSource.image(image)),
          keyring(keyring):: rbd($.v1.rBDVolumeSource.keyring(keyring)),
          monitors(monitors):: rbd($.v1.rBDVolumeSource.monitors(monitors)),
          pool(pool):: rbd($.v1.rBDVolumeSource.pool(pool)),
          readOnly(readOnly):: rbd($.v1.rBDVolumeSource.readOnly(readOnly)),
          secretRef(secretRef):: rbd($.v1.rBDVolumeSource.secretRef(secretRef)),
          user(user):: rbd($.v1.rBDVolumeSource.user(user)),
        },
        scaleIO:: {
          local scaleIO(mixin) = {scaleIO+: mixin},
          fsType(fsType):: scaleIO($.v1.scaleIOVolumeSource.fsType(fsType)),
          gateway(gateway):: scaleIO($.v1.scaleIOVolumeSource.gateway(gateway)),
          protectionDomain(protectionDomain):: scaleIO($.v1.scaleIOVolumeSource.protectionDomain(protectionDomain)),
          readOnly(readOnly):: scaleIO($.v1.scaleIOVolumeSource.readOnly(readOnly)),
          secretRef(secretRef):: scaleIO($.v1.scaleIOVolumeSource.secretRef(secretRef)),
          sslEnabled(sslEnabled):: scaleIO($.v1.scaleIOVolumeSource.sslEnabled(sslEnabled)),
          storageMode(storageMode):: scaleIO($.v1.scaleIOVolumeSource.storageMode(storageMode)),
          storagePool(storagePool):: scaleIO($.v1.scaleIOVolumeSource.storagePool(storagePool)),
          system(system):: scaleIO($.v1.scaleIOVolumeSource.system(system)),
          volumeName(volumeName):: scaleIO($.v1.scaleIOVolumeSource.volumeName(volumeName)),
        },
        secret:: {
          local secret(mixin) = {secret+: mixin},
          defaultMode(defaultMode):: secret($.v1.secretVolumeSource.defaultMode(defaultMode)),
          items(items):: secret($.v1.secretVolumeSource.items(items)),
          optional(optional):: secret($.v1.secretVolumeSource.optional(optional)),
          secretName(secretName):: secret($.v1.secretVolumeSource.secretName(secretName)),
        },
        vsphereVolume:: {
          local vsphereVolume(mixin) = {vsphereVolume+: mixin},
          fsType(fsType):: vsphereVolume($.v1.vsphereVirtualDiskVolumeSource.fsType(fsType)),
          volumePath(volumePath):: vsphereVolume($.v1.vsphereVirtualDiskVolumeSource.volumePath(volumePath)),
        },
      },
    },
    volumeMount:: {
      default(name, mountPath)::
      {
        mountPath: mountPath,
        name: name,
      },
      // Path within the container at which the volume should be mounted.  Must not contain ':'.
      mountPath(mountPath):: {mountPath: mountPath},
      // This must match the Name of a Volume.
      name(name):: {name: name},
      // Mounted read-only if true, read-write otherwise (false or unspecified). Defaults to false.
      readOnly(readOnly):: {readOnly: readOnly},
      // Path within the volume from which the container's volume should be mounted. Defaults to "" (volume's root).
      subPath(subPath):: {subPath: subPath},
    },
    volumeProjection:: {
      default()::
      {
        configMap: {},
        downwardAPI: {},
        secret: {},
      },
      // information about the configMap data to project
      configMap(configMap):: {configMap+: configMap},
      // information about the downwardAPI data to project
      downwardAPI(downwardAPI):: {downwardAPI+: downwardAPI},
      // information about the secret data to project
      secret(secret):: {secret+: secret},
      mixin:: {
        configMap:: {
          local configMap(mixin) = {configMap+: mixin},
          items(items):: configMap($.v1.configMapProjection.items(items)),
          name(name):: configMap($.v1.configMapProjection.name(name)),
          optional(optional):: configMap($.v1.configMapProjection.optional(optional)),
        },
        downwardAPI:: {
          local downwardAPI(mixin) = {downwardAPI+: mixin},
          items(items):: downwardAPI($.v1.downwardAPIProjection.items(items)),
        },
        secret:: {
          local secret(mixin) = {secret+: mixin},
          items(items):: secret($.v1.secretProjection.items(items)),
          name(name):: secret($.v1.secretProjection.name(name)),
          optional(optional):: secret($.v1.secretProjection.optional(optional)),
        },
      },
    },
    vsphereVirtualDiskVolumeSource:: {
      default(volumePath)::
      {
        volumePath: volumePath,
      },
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
      fsType(fsType):: {fsType: fsType},
      // Path that identifies vSphere volume vmdk
      volumePath(volumePath):: {volumePath: volumePath},
    },
    watchEvent:: {
      default(type, object)::
      {
        object: object,
        type: type,
      },
      // 
      object(object):: {object: object},
      // 
      type(type):: {type: type},
    },
    weightedPodAffinityTerm:: {
      default(weight, podAffinityTerm)::
      {
        podAffinityTerm: podAffinityTerm,
        weight: weight,
      },
      // Required. A pod affinity term, associated with the corresponding weight.
      podAffinityTerm(podAffinityTerm):: {podAffinityTerm+: podAffinityTerm},
      // weight associated with matching the corresponding podAffinityTerm, in the range 1-100.
      weight(weight):: {weight: weight},
      mixin:: {
        podAffinityTerm:: {
          local podAffinityTerm(mixin) = {podAffinityTerm+: mixin},
          labelSelector(labelSelector):: podAffinityTerm($.v1.podAffinityTerm.labelSelector(labelSelector)),
          namespaces(namespaces):: podAffinityTerm($.v1.podAffinityTerm.namespaces(namespaces)),
          topologyKey(topologyKey):: podAffinityTerm($.v1.podAffinityTerm.topologyKey(topologyKey)),
        },
      },
    },
  },
  v1beta1:: {
    eviction:: {
      local kind = {kind: "Eviction"},
      default(name, namespace="default")::
        apiVersion +
        kind +
        defaultMetadata(name, namespace) +
      {
        deleteOptions: {},
      },
      // DeleteOptions may be provided
      deleteOptions(deleteOptions):: {deleteOptions+: deleteOptions},
      mixin:: {
        deleteOptions:: {
          local deleteOptions(mixin) = {deleteOptions+: mixin},
          gracePeriodSeconds(gracePeriodSeconds):: deleteOptions($.v1.deleteOptions.gracePeriodSeconds(gracePeriodSeconds)),
          orphanDependents(orphanDependents):: deleteOptions($.v1.deleteOptions.orphanDependents(orphanDependents)),
          preconditions(preconditions):: deleteOptions($.v1.deleteOptions.preconditions(preconditions)),
          propagationPolicy(propagationPolicy):: deleteOptions($.v1.deleteOptions.propagationPolicy(propagationPolicy)),
        },
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
        },
      },
    },
  },
}

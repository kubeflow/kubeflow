local kubeAssert = import "internal/assert.libsonnet";
local base = import "internal/base.libsonnet";
local meta = import "internal/meta.libsonnet";

{
  // A collection of common fields in the Kubernetes API objects,
  // that we do not want to expose for public use. For example,
  // `Kind` appears frequently in API objects of both
  // `extensions/v1beta1` and `v1`, but we don't want users to mess
  // mess with an object's `Kind`.
  local common = {
    Kind(kind):: kubeAssert.Type("kind", kind, "string") {kind: kind},

    // TODO: This sets the metadata property, rather than doing a
    // mixin. Is this what we want?
    Metadata(metadata={}):: {metadata: $.v1.metadata.Default() + metadata},

    mixin:: {
      Metadata(mixin):: {metadata+: mixin},

      metadata:: {
        local metadata = $.v1.metadata,
        local mixin = common.mixin,

        Name:: meta.MixinPartial1(metadata.Name, mixin.Metadata),
        Label:: meta.MixinPartial2(metadata.Label, mixin.Metadata),
        Labels:: meta.MixinPartial1(metadata.Labels, mixin.Metadata),
        Namespace:: meta.MixinPartial1(metadata.Namespace, mixin.Metadata),
        Annotation:: meta.MixinPartial2(metadata.Annotation, mixin.Metadata),
        Annotations::
          meta.MixinPartial1(metadata.Annotations, mixin.Metadata),
      },
    },
  },

  v1:: {
    local bases = {
      ConfigMap: base.New("configMap", "AC74E727-0605-4872-8F30-E5CAFB2A0984"),
      Container: base.New("container", "50281784-097C-46A9-8D2C-C6E9078D77D4"),
      ContainerPort:
        base.New("containerPort", "2854EB13-644C-4FEF-A62D-DBAC554D6A24"),
      Metadata: base.New("metadata", "027AE69D-1DD6-42D2-AD47-8F4A55DF9D76"),
      PersistentVolume:
        base.New("persistentVolume", "03113473-7083-4D07-A7FE-83699EB4128C"),
      PersistentVolumeClaim:
        base.New("persistentVolumeClaim", "CD58B997-FF5E-4ED9-8F8A-573E92336D35"),
      Pod: base.New("pod", "2854EB13-644C-4FEF-A62D-DBAC554D6A24"),
      Probe: base.New("probe", "943CF775-B17F-4D25-A794-7D800F08E7FE"),
      Secret: base.New("secret", "0C3D2362-968B-4751-BF67-D58ADA1FC5FC"),
      Service: base.New("service", "87EE499C-EC06-421D-9450-EFE0701851EB"),
      ServicePort: base.New("servicePort", "C38839B7-DA05-4845-B643-E6826E38EA1B"),
      Mount: base.New("mount", "D1E2E601-E64A-4A95-A15C-E78CA724764C"),
      Namespace: base.New("namespace", "6A94A118-F6A7-40EE-8BA1-6096CEC7BDE3"),
    },

    ApiVersion:: { apiVersion: "v1" },

    metadata:: {
      Default(name=null, namespace=null, annotations=null, labels=null)::
        bases.Metadata +
        (if name != null then self.Name(name) else {}) +
        (if namespace != null then self.Namespace(namespace) else {}) + {
          annotations: if annotations == null then {} else annotations,
          labels: if labels == null then {} else labels,
        },

      Name(name)::
        base.Verify(bases.Metadata) +
        kubeAssert.Type("name", name, "string") +
        {name: name},

      Label(key, value)::
        base.Verify(bases.Metadata) +
        {labels+: {[key]: value}},

      Labels(labels)::
        base.Verify(bases.Metadata) +
        {labels+: labels},

      Namespace(namespace)::
        base.Verify(bases.Metadata) +
        kubeAssert.Type("namespace", namespace, "string") +
        {namespace: namespace},

      Annotation(key, value)::
        base.Verify(bases.Metadata) +
        {annotations+: {[key]: value}},

      Annotations(annotations)::
        base.Verify(bases.Metadata) +
        {annotations+: annotations},
    },

    //
    // Namespace.
    //

    namespace:: {
      Default(name)::
        bases.Namespace +
        kubeAssert.Type("name", name, "string") +
        $.v1.ApiVersion +
        common.Kind("Namespace") +
        common.Metadata($.v1.metadata.Name(name)),
    },

    //
    // Ports.
    //
    port:: {
      local protocolOptions = std.set(["TCP", "UDP"]),

      local PortProtocol(protocol, targetBase) =
        kubeAssert.InSet("protocol", protocol, protocolOptions) +
        base.Verify(targetBase) {
          protocol: protocol,
        },

      local PortName(name, targetPort) =
        base.Verify(targetPort) +
        kubeAssert.Type("name", name, "string") {
          name: name,
        },

      container:: {
        Default(containerPort)::
          bases.ContainerPort +
          kubeAssert.ValidPort("containerPort", containerPort) {
            containerPort: containerPort,
          },

        Named(name, containerPort)::
          kubeAssert.Type("name", name, "string") +
          self.Default(containerPort) +
          self.Name(name),

        Name(name):: PortName(name, bases.ContainerPort),

        Protocol(protocol):: PortProtocol(protocol, bases.ContainerPort),

        HostPort(hostPort)::
          base.Verify(bases.ContainerPort) +
          kubeAssert.ValidPort("hostPort", hostPort) {
            hostPort: hostPort
          },

        HostIp(hostIp)::
          base.Verify(bases.ContainerPort) +
          kubeAssert.Type("hostIp", hostIp, "string") {
            hostIP: hostIp,
          },
      },

      service:: {
        Default(servicePort)::
          bases.ServicePort +
          kubeAssert.ValidPort("servicePort", servicePort) {
            port: servicePort,
          },

        WithTarget(servicePort, targetPort)::
          self.Default(servicePort) +
          self.TargetPort(targetPort),

        Named(name, servicePort, targetPort)::
          kubeAssert.Type("name", name, "string") +
          self.Default(servicePort) +
          self.Name(name) +
          self.TargetPort(targetPort),

        Name(name):: PortName(name, bases.ServicePort),

        Protocol(protocol):: PortProtocol(protocol, bases.ServicePort),

        TargetPort(targetPort)::
          base.Verify(bases.ServicePort) {
            // TODO: Assert clusterIP is not set?
            targetPort: targetPort,
          },

        NodePort(nodePort)::
          base.Verify(bases.ServicePort) {
            nodePort: nodePort,
          },
      },
    },

    //
    // Service.
    //

    service:: {
      Default(name, portList, labels={}, annotations={})::
        local defaultMetadata =
          common.Metadata(
            $.v1.metadata.Name(name) +
            $.v1.metadata.Labels(labels) +
            $.v1.metadata.Annotations(annotations));
        local serviceKind = common.Kind("Service");
        bases.Service + $.v1.ApiVersion + serviceKind + defaultMetadata {
          spec: {
            ports: portList,
          },
        },

      // TODO: Incorrect indentation below.
        Metadata:: common.mixin.Metadata,
        Spec(mixin):: {spec+: mixin},

        spec:: {
          local typeOptions = std.set([
            "ExternalName", "ClusterIP", "NodePort", "LoadBalancer"]),
          local sessionAffinityOptions = std.set(["ClientIP", "None"]),

          Port(port)::
            // base.Verify(bases.Service) +
            {ports+: [port]},

          Selector(selector)::
            // base.Verify(bases.Service) +
            {selector: selector},

          ClusterIp(clusterIp)::
            // base.Verify(bases.Service) +
            kubeAssert.Type("clusterIp", clusterIp, "string") +
            {clusterIP: clusterIp},

          Type(type)::
            // base.Verify(bases.Service) +
            kubeAssert.InSet("type", type, typeOptions) +
            {type: type},

          ExternalIps(externalIpList)::
            // base.Verify(bases.Service) +
            // TODO: Verify that externalIpList is a list of string.
            kubeAssert.Type("externalIpList", externalIpList, "array") +
            {externalIPs: externalIpList},

          SessionAffinity(sessionAffinity)::
            // base.Verify(bases.Service) +
            kubeAssert.InSet(
              "sessionAffinity", sessionAffinity, sessionAffinityOptions) +
            {sessionAffinity: sessionAffinity},

          LoadBalancerIp(loadBalancerIp)::
            // base.Verify(bases.Service) +
            kubeAssert.Type("loadBalancerIp", loadBalancerIp, "string") +
            {loadBalancerIP: loadBalancerIp},

          LoadBalancerSourceRanges(loadBalancerSourceRanges)::
            // base.Verify(bases.Service) +
            // TODO: Verify that loadBalancerSourceRanges is a list
            // of string.
            kubeAssert.Type(
              "loadBalancerSourceRanges", loadBalancerSourceRanges, "array") +
            {loadBalancerSourceRanges: loadBalancerSourceRanges},

          ExternalName(externalName)::
            // base.Verify(bases.Service) +
            kubeAssert.Type("externalName", externalName, "string") +
            {externalName: externalName},
        },

        mixin:: {
          metadata:: common.mixin.metadata {
            annotation:: {
              TolerateUnreadyEndpoints(truthiness)::
                common.mixin.metadata.Annotation(
                  "service.alpha.kubernetes.io/tolerate-unready-endpoints",
                  truthiness),
            },
          },

          spec:: {
            local service = $.v1.service,

            Port::
              meta.MixinPartial1(service.spec.Port, service.Spec),
            Selector::
              meta.MixinPartial1(service.spec.Selector, service.Spec),
            ClusterIp::
              meta.MixinPartial1(service.spec.ClusterIp, service.Spec),
            Type::
              meta.MixinPartial1(service.spec.Type, service.Spec),
            ExternalIps::
              meta.MixinPartial1(service.spec.ExternalIps, service.Spec),
            SessionAffinity::
              meta.MixinPartial1(service.spec.SessionAffinity, service.Spec),
            LoadBalancerIp::
              meta.MixinPartial1(service.spec.LoadBalancerIp, service.Spec),
            LoadBalancerSourceRanges:: meta.MixinPartial1(
              service.spec.LoadBalancerSourceRanges, service.Spec),
            ExternalName::
              meta.MixinPartial1(service.spec.ExternalName, service.Spec),
          },
        },
    },

    configMap:: {
      Default(namespace, configMapName, data):
        bases.ConfigMap +
        $.v1.ApiVersion +
        common.Kind("ConfigMap") +
        common.Metadata(
          $.v1.metadata.Name(configMapName) +
          $.v1.metadata.Namespace(namespace)) {
          data: data,
        },

      DefaultFromClaim(namespace, name, claim)::
        self.Default(namespace, name, claim.metadata.name)
    },

    secret:: {
      Default(namespace, secretName, data)::
        bases.Secret +
        $.v1.ApiVersion +
        common.Kind("Secret") +
        common.Metadata(
          $.v1.metadata.Name(secretName) +
          $.v1.metadata.Namespace(namespace)) {
          data: data,
        },

      StringData(stringData)::
        base.Verify(bases.Secret) {
          stringData: stringData,
        },

      Type(type)::
        base.Verify(bases.Secret) +
        kubeAssert.Type("type", type, "string") {
          type: type,
        },
    },

    //
    // Volume.
    //

    //
    // NOTE: TODO: YOU ARE HERE. You haven't implemented type checking
    // beyond this point.
    //

    volume:: {
      persistent:: {
        // TODO: Add checks to the parameters here.
        Default(name, claimName):: bases.PersistentVolume {
          name: name,
          persistentVolumeClaim: {
            claimName: claimName,
          },
        },

        DefaultFromClaim(name, claim)::
          self.Default(name, claim.metadata.name)
      },

      hostPath:: {
        // TODO: Add checks to the parameters here.
        Default(name, path):: {
          name: name,
          hostPath: {
            path: path
          },
        },
      },

      configMap:: {
        // TODO: Add checks to the parameters here.
        Default(name, configMapName):: {
          name: name,
          configMap: {
            name: configMapName,
          },
        },
      },

      secret:: {
        // TODO: Add checks to the parameters here.
        Default(name, secretName):: {
          name: name,
          secret: {
            secretName: secretName,
          },
        },
      },

      emptyDir:: {
        Default(name):: {
          name: name,
          emptyDir: {},
        },
      },

      //
      // Mount.
      //
      mount:: {
        Default(name, mountPath, readOnly=false):: bases.Mount {
          name: name,
          mountPath: mountPath,
          readOnly: readOnly,
        },

        FromVolume(volume, mountPath, readOnly=false)::
          self.Default(volume.name, mountPath, readOnly),

        FromConfigMap(configMap, mountPath, readOnly=false)::
          self.Default(configMap.name, mountPath, readOnly),
      },

      //
      // Claim.
      //
      claim:: {
        DefaultPersistent(claimName, accessModes, size, namespace=null):
          local defaultMetadata = common.Metadata(
            $.v1.metadata.Default(namespace=namespace, name=claimName));
          bases.PersistentVolumeClaim +
          $.v1.ApiVersion +
          common.Kind("PersistentVolumeClaim") +
          defaultMetadata {
            // TODO: Move this assert to `kubeAssert.Type`.
            assert std.type(accessModes) == "array"
              : "'accessModes' must by of type 'array'",
            spec: {
              accessModes: accessModes,
              resources: {
                requests: {
                  storage: size
                },
              },
            },
          },

        mixin:: {
          metadata:: common.mixin.metadata {
            annotation:: {
              AlphaStorageClass(storageClass)::
                common.mixin.metadata.Annotation(
                  "volume.alpha.kubernetes.io/storage-class",
                  storageClass),

              BetaStorageClass(storageClass)::
                common.mixin.metadata.Annotation(
                  "volume.beta.kubernetes.io/storage-class",
                  storageClass),
            },
          },
        },
      },
    },

    //
    // Probe.
    //
    probe:: {
      local defaultTimeout = 1,
      local defaultPeriod = 10,

      Default(
        initDelaySecs,
        timeoutSecs=defaultTimeout,
        periodSeconds=defaultPeriod
      ):: bases.Probe {
        initialDelaySeconds: initDelaySecs,
        timeoutSeconds: timeoutSecs,
      },

      Http(
        getPath,
        portName,
        initDelaySecs,
        timeoutSecs=defaultTimeout,
        periodSeconds=defaultPeriod
      ):: self.Default(initDelaySecs, timeoutSecs) {
          httpGet: {
            path: getPath,
            port: portName,
          },
        },

      Tcp(
        port,
        initDelaySecs,
        timeoutSecs=defaultTimeout,
        periodSeconds=defaultPeriod
      ):: self.Default(initDelaySecs, timeoutSecs) {
          tcpSocket: {
            port: port,
          },
        },

      Exec(
        command,
        initDelaySecs,
        timeoutSecs=defaultTimeout,
        periodSeconds=defaultPeriod
      ):: self.Default(initDelaySecs, timeoutSecs) {
          exec: {
            command: command,
          },
        },
    },

    //
    // Container.
    //
    container:: {
      local imagePullPolicyOptions = std.set(["Always", "Never", "IfNotPresent"]),

      Default(name, image, imagePullPolicy="Always")::
        bases.Container +
        // TODO: Make "Always" the default only when we're doing the :latest.
        kubeAssert.Type("name", name, "string") +
        kubeAssert.Type("image", image, "string") +
        kubeAssert.InSet("imagePullPolicy", imagePullPolicy, imagePullPolicyOptions) {
          name: name,
          image: image,
          imagePullPolicy: imagePullPolicy,
          // TODO: Think carefully about whether we want an empty list here.
          ports: [],
          env: [],
          volumeMounts: [],
        },

      Args(args)::  base.Verify(bases.Container) {
        args: args
      },

      Command(command):: base.Verify(bases.Container) {
        command: command,
      },

      // TODO: Should this take a k/v pair instead?
      Env(env):: base.Verify(bases.Container) {
        env+: env,
      },

      Resources(resources):: base.Verify(bases.Container) {
        resources: resources
      },

      Ports(ports):: base.Verify(bases.Container) {
        ports+: ports,
      },

      Port(port):: base.Verify(bases.Container) { ports+: [port] },

      NamedPort(name, port):: base.Verify(bases.Container) {
        ports+: [$.v1.port.container.Named(name, port)],
      },

      LivenessProbe(probe):: base.Verify(bases.Container) {
        livenessProbe: probe,
      },

      ReadinessProbe(probe):: base.Verify(bases.Container) {
        readinessProbe: probe,
      },

      VolumeMounts(mounts):: base.Verify(bases.Container) {
        volumeMounts+: mounts,
      },

      // TODO: Make these into mixins, also.
      resources:: {
        Requests(cpu, memory):: {
          requests: {
            cpu: cpu,
            memory: memory
          },
        },

        Limits(cpu, memory):: {
          limits: {
            cpu: cpu,
            memory: memory
          },
        },
      },
    },

    //
    // Env.
    //
    env:: {
      Variable(name, value):: {
        name: name,
        value: value,
      },

      // TODO: Rename this `ValueFromConfigMap`.
      ValueFrom(name, configMapName, configMapKey):: {
        name: name,
        valueFrom: {
          configMapKeyRef: {
            name: configMapName,
            key: configMapKey,
          },
        },
      },

      ValueFromFieldRef(name, fieldPath):: {
        name: name,
        valueFrom: {
          fieldRef: {
              fieldPath: fieldPath,
          },
        },
      },

      ValueFromSecret(name, secretName, secretKey):: {
        name: name,
        valueFrom: {
          secretKeyRef: {
            name: secretName,
            key: secretKey,
          },
        },
      },
    },

    //
    // Pods.
    //
    pod:: {
      local pod = self,

      Default(containers, volumes=[])::
        bases.Pod +
        $.v1.ApiVersion +
        common.Kind("Pod") +
        common.Metadata() {
          spec: pod.spec.Default(containers, volumes),
        },

      Metadata:: common.mixin.Metadata,
      Spec(mixin):: {spec+: mixin},

      spec:: {
        Default(containers, volumes=[]):: {
          containers: containers,
          volumes: volumes,
        },

        // TODO: Consider making this a mixin.
        Volumes(volumes):: {volumes+: volumes},
        Containers(containers):: {containers+: containers},
        DnsPolicy:: CreateDnsPolicyFunction(),
        RestartPolicy:: CreateRestartPolicyFunction(),
      },

      template:: {
        Default(containers, volumes=[])::
          common.Metadata() {
            spec: pod.spec.Default(containers, volumes),
          },

        Metadata:: common.mixin.Metadata,

        mixin:: {
          metadata:: common.mixin.metadata {
            annotation:: {
              PodAffinity(affinitySpec)::
                common.mixin.metadata.Annotation(
                  "scheduler.alpha.kubernetes.io/affinity", affinitySpec),
              PodInitContainers(initSpec)::
                common.mixin.metadata.Annotation(
                  "pod.alpha.kubernetes.io/init-containers", initSpec),
            },
          },

          spec:: {
            local pod = $.v1.pod,
            local templateSpecMixin(mixin) = {template+: {spec+: mixin}},

            Containers::
              meta.MixinPartial1(pod.spec.Containers, templateSpecMixin),
            Volumes::
              meta.MixinPartial1(pod.spec.Volumes, templateSpecMixin),
            DnsPolicy::
              meta.MixinPartial1(pod.spec.DnsPolicy, templateSpecMixin),
            RestartPolicy::
              meta.MixinPartial1(pod.spec.RestartPolicy, templateSpecMixin),
          },
        },
      },

      local CreateDnsPolicyFunction(createMixin=null) =
        local partial = meta.MixinPartial1(
          function(policy) {dnsPolicy: policy},
          createMixin);
        function(policy="ClusterFirst") partial(policy),

      local CreateRestartPolicyFunction(createMixin=null) =
        local partial = meta.MixinPartial1(
          function(policy) {restartPolicy: policy},
          createMixin);
        function(policy="Always") partial(policy),
    },
  },

  extensions:: {
    v1beta1: {
      local bases = {
        Deployment: base.New("deployment", "176A7BEF-E577-4EBD-952D-5E8F7BB7AE1A"),
      },

      ApiVersion:: { apiVersion: "extensions/v1beta1" },

      //
      // Deployments.
      //
      deployment:: {
        // TODO: Get rid of the `spec` parameter.
        Default(name, spec)::
          bases.Deployment +
          $.extensions.v1beta1.ApiVersion +
          common.Kind("Deployment") +
          common.Metadata($.v1.metadata.Name(name)) {
            spec: spec,
          },

        Metadata:: common.mixin.Metadata,
        Spec(mixin):: {spec+: mixin},

        spec:: {
          ReplicatedPod(replicas, podTemplate):: {
            replicas: replicas,
            // TODO: Should this be a mixin?
            template: podTemplate,
          },

          RevisionHistoryLimit(limit)::
            // base.Verify(bases.Service) +
            {revisionHistoryLimit: limit},

          NodeSelector(labels)::
            // base.Verify(bases.Service) +
            {nodeSelector: labels},

          Selector(labels):: {
            // base.Verify(bases.Service) +
            // TODO: Consider making these mixins.
            selector: {
              matchLabels: labels,
            },
          },

          MinReadySeconds:: CreateMinReadySecondsFunction(),
          RollingUpdateStrategy:: CreateRollingUpdateStrategyFunction(),
        },

        mixin:: {
          metadata:: common.mixin.metadata,

          podTemplate:: {
            local pod = $.v1.pod,

            NodeSelector:: meta.MixinPartial1(
              $.extensions.v1beta1.deployment.spec.NodeSelector,
              self.Spec),
            Volumes:: meta.MixinPartial1(pod.spec.Volumes, self.Spec),
            Containers:: meta.MixinPartial1(pod.spec.Containers, self.Spec),

            // TODO: Consider moving this default to some common
            // place, so it's not duplicated.
            DnsPolicy::
              local partial =
                meta.MixinPartial1(pod.spec.DnsPolicy, self.Spec);
              function(policy="ClusterFirst") partial(policy),

            RestartPolicy(policy="Always")::
              self.Spec(pod.spec.RestartPolicy(policy=policy)),

            Spec(mixin):: {
              // TODO: Add base verification here.
              spec+: {
                template+: {
                  spec+: mixin
                },
              },
            },
          },

          spec:: {
            local deployment = $.extensions.v1beta1.deployment,

            RevisionHistoryLimit:: meta.MixinPartial1(
              deployment.spec.RevisionHistoryLimit, deployment.Spec),
            NodeSelector:: meta.MixinPartial1(
              deployment.spec.NodeSelector, deployment.Spec),
            Selector::
              meta.MixinPartial1(deployment.spec.Selector, deployment.Spec),
            MinReadySeconds:: CreateMinReadySecondsFunction(deployment.Spec),
            RollingUpdateStrategy::
              CreateRollingUpdateStrategyFunction(deployment.Spec),
          },
        },

        local CreateMinReadySecondsFunction(createMixin=null) =
          local partial =
            meta.MixinPartial1(
              function(seconds)
                // base.Verify(bases.Service) +
                {minReadySeconds: seconds},
              createMixin);
          function(seconds=0) partial(seconds),

        local CreateRollingUpdateStrategyFunction(createMixin=null) =
          local rollingUpdateStrategy(maxSurge, maxUnavailable) = {
            // base.Verify(bases.Service)
            strategy: {
              rollingUpdate: {
                maxSurge: maxSurge,
                maxUnavailable: maxUnavailable,
              },
              type: "RollingUpdate",
            },
          };
          local partial =
            meta.MixinPartial2(
              rollingUpdateStrategy,
              createMixin);
          function(maxSurge=1, maxUnavailable=1)
            partial(maxSurge, maxUnavailable),
      },

      ingress:: {
        local ingress = self,

        Default(name, ingressTls=[], ingressRules=[], labels=null)::
          $.extensions.v1beta1.ApiVersion +
          common.Kind("Ingress") +
          common.Metadata($.v1.metadata.Default(name=name, labels=labels)) {
            spec: {
              tls: ingressTls,
              rules: ingressRules,
            },
          },

        Metadata:: common.mixin.Metadata,
        Spec(mixin):: {spec+: mixin},

        spec:: {
          Tls:: CreateTlsFunction(),
          Rule:: CreateRuleFunction(),
        },

        rule:: {
          Default:: CreateRuleFunction(),
        },

        httpIngressPath:: {
          Default(serviceName, servicePort, path=null):: {
            backend: {
              serviceName: serviceName,
              servicePort: servicePort,
            },
            [if path != null then "path"]: path,
          },
        },

        mixin:: {
          metadata:: common.mixin.metadata,
          spec:: {
            Tls:: CreateTlsFunction(function(tls) ingress.Spec({tls+: [tls]})),
            Rule:: CreateRuleFunction(
              function(rule) ingress.Spec({rules+: [rule]})),
          },
        },

        local CreateTlsFunction(createMixin=null) =
          local tls(hosts, secretName) = {
              [if hosts != null then "hosts"]: hosts,
              [if secretName != null then "secretName"]: secretName,
          };
          local partial = meta.MixinPartial2(tls, createMixin);
          function(hosts=null, secretName=null) partial(hosts, secretName),

        local CreateRuleFunction(createMixin=null) =
          local rule(host, httpIngressRule) = {
            [if host != null then "host"]: host,
            [if httpIngressRule != null then "http"]: httpIngressRule,
          };
          local partial = meta.MixinPartial2(rule, createMixin);
          function(host=null, http=null) partial(host, http),
      },
    },
  },

  meta:: {
    v1:: {
      labelSelector:: {
        DefaultMatchLabelReqs(labels):: {matchLabels: labels},
        DefaultMatchExpressions(expressions):: {matchExpressions: expressions},
      },
    },
  },

  policy:: {
    v1beta1:: {
      ApiVersion:: { apiVersion: "policy/v1beta1" },

      podDistruptionBudget:: {

        Default(name, labels=null)::
          $.policy.v1beta1.ApiVersion +
          common.Kind("PodDisruptionBudget") +
          common.Metadata($.v1.metadata.Default(name=name, labels=labels)) {
            spec: {},
          },

        Metadata:: common.mixin.Metadata,
        Spec(mixin):: {spec+: mixin},

        spec:: {
          Selector:: $.extensions.v1beta1.deployment.Selector,
          MinAvailable(time):: {minAvailable: time},
        },

        mixin:: {
          spec:: {
            Selector:: meta.MixinPartial1(
              $.extensions.v1beta1.deployment.spec.Selector,
              $.extensions.v1beta1.deployment.Spec),
            MinAvailable:: meta.MixinPartial1(
              $.policy.v1beta1.podDistruptionBudget.spec.MinAvailable,
              $.extensions.v1beta1.deployment.Spec),
          },
        },
      },
    },
  },

  apps:: {
    v1beta1:: {
      ApiVersion:: { apiVersion: "apps/v1beta1" },

      statefulSet:: {
        local statefulSet = self,

        Default(
          name, replicas, template, serviceName=name, volumeClaimTemplates=[],
          selector=null
        )::
          $.apps.v1beta1.ApiVersion +
          common.Kind("StatefulSet") +
          common.Metadata($.v1.metadata.Default(name=name)) {
            spec: statefulSet.spec.Default(
              serviceName, replicas, template, volumeClaimTemplates, selector),
          },

        Metadata:: common.mixin.Metadata,
        Spec(mixin):: {spec+: mixin},

        spec:: {
          Default(
            serviceName, replicas, template, volumeClaimTemplates=[],
            selector=null
          ):: {
            serviceName: serviceName,
            replicas: replicas,
            template: template,
            volumeClaimTemplates: volumeClaimTemplates,
            [if selector != null then "selector"]: selector,
          },

          ServiceName(serviceName):: {serviceName: serviceName},
          Template(podTemplate):: {template+: podTemplate},
          VolumeClaimTemplates(vcTemplates)::
            {volumeClaimTemplates+: vcTemplates},
          // Selector(selector):: {selector: selector},
        },

        mixin:: {
          spec:: {
            ServiceName:: meta.MixinPartial1(
              $.apps.v1beta1.statefulSet.spec.ServiceName,
              $.apps.v1beta1.statefulSet.Spec),
            Template:: meta.MixinPartial1(
              $.apps.v1beta1.statefulSet.spec.Template,
              $.apps.v1beta1.statefulSet.Spec),
            VolumeClaimTemplates:: meta.MixinPartial1(
              $.apps.v1beta1.statefulSet.spec.VolumeClaimTemplates,
              $.apps.v1beta1.statefulSet.Spec),
          },
        },
      },
    },
  },
}

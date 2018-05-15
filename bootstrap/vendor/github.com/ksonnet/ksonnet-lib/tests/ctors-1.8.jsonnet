local k = import "../ksonnet.beta.3/k.libsonnet";

{
  admissionregistration: {
    v1beta1: {
      local api = k.admissionregistration.v1alpha1,
      externalAdmissionHookConfiguration: api.externalAdmissionHookConfigurationList.new([]),
      initializerConfigurationList: api.initializerConfigurationList.new([]),
    }
  },
  apps: {
    v1beta1: {
      local api = k.apps.v1beta1,
      controllerRevisionList: api.controllerRevisionList.new([]),
      deployment: api.deployment.new("deployment", 3, [], {}),
      deploymentList: api.deploymentList.new(self.deployment),
      deploymentRollback: api.deploymentRollback.new("deploymentRollback"),
      scale: api.scale.new(4),
      statefulSet: api.statefulSet.new("deployment", 3, [], [], {}),
      statefulSetList: api.statefulSetList.new(self.statefulSet),
    },
    v1beta2: {
      local api = k.apps.v1beta2,
      controllerRevisionList: api.controllerRevisionList.new([]),
      daemonSetList: api.daemonSetList.new([]),
      deployment: api.deployment.new("deployment", 3, [], {}),
      deploymentList: api.deploymentList.new(self.deployment),
      replicaSetList: api.replicaSetList.new([]),
      scale: api.scale.new(4),
      statefulSet: api.statefulSet.new("deployment", 3, [], [], {}),
      statefulSetList: api.statefulSetList.new(self.statefulSet),
    },
  },
  authentication: {
    v1beta1: {
      local api = k.authentication.v1beta1,
      tokenReview: api.tokenReview.new({}),
    },
    v1: {
      local api = k.authentication.v1,
      tokenReview: api.tokenReview.new({}),
    },
  },
  autoscaling: {
    v1: {
      local api = k.autoscaling.v1,
      horizontalPodAutoscalerList: api.horizontalPodAutoscalerList.new([]),
      scale: api.scale.new(4),
    },
    v2beta1: {
      local api = k.autoscaling.v2beta1,
      horizontalPodAutoscalerList: api.horizontalPodAutoscalerList.new([]),
    },
  },
  batch: {
    v1: {
      local api = k.batch.v1,
      jobList: api.jobList.new([]),
    },
    v1beta1: {
      local api = k.batch.v1beta1,
      jobList: api.cronJobList.new([]),
    },
    v2alpha1: {
      local api = k.batch.v2alpha1,
      jobList: api.cronJobList.new([]),
    },
  },
  certificates: {
    v1beta1: {
      local api = k.certificates.v1beta1,
      jobList: api.certificateSigningRequestList.new([]),
    },
  },
  extensions: {
    v1beta1: {
      local api = k.extensions.v1beta1,
      daemonSetList: api.daemonSetList.new([]),
      deployment: api.deployment.new("deployment", 3, [], {}),
      deploymentList: api.deploymentList.new(self.deployment),
      deploymentRollback: api.deploymentRollback.new("deploymentRollback"),
      ingressList: api.ingressList.new([]),
      networkPolicyList: api.networkPolicyList.new([]),
      podSecurityPolicyList: api.podSecurityPolicyList.new([]),
      replicaSetList: api.replicaSetList.new([]),
      scale: api.scale.new(4),
    },
  },
  networking: {
    v1: {
      local api = k.networking.v1,
      networkPolicyList: api.networkPolicyList.new([]),
    },
  },
  policy: {
    v1beta1: {
      local api = k.policy.v1beta1,
      podDisruptionBudgetList: api.podDisruptionBudgetList.new([]),
    },
  },
  rbac: {
    v1: {
      local api = k.rbac.v1,
      clusterRoleBindingList: api.clusterRoleBindingList.new([]),
      clusterRoleList: api.clusterRoleList.new([]),
      roleBindingList: api.roleBindingList.new([]),
      roleList: api.roleList.new([]),
    },
    v1beta1: {
      local api = k.rbac.v1beta1,
      clusterRoleBindingList: api.clusterRoleBindingList.new([]),
      clusterRoleList: api.clusterRoleList.new([]),
      roleBindingList: api.roleBindingList.new([]),
      roleList: api.roleList.new([]),
    },
  },
  scheduling: {
    v1alpha1: {
      local api = k.scheduling.v1alpha1,
      priorityClassList: api.priorityClassList.new([]),
    },
  },
  settings: {
    v1alpha1: {
      local api = k.settings.v1alpha1,
      podPresetList: api.podPresetList.new([]),
    },
  },
  storage: {
    v1: {
      local api = k.storage.v1,
      storageClassList: api.storageClassList.new([]),
    },
    v1beta1: {
      local api = k.storage.v1,
      storageClassList: api.storageClassList.new([]),
    },
  },

  //
  // Core.
  //

  core: {
    v1: {
      local api = k.core.v1,
      configMap: api.configMap.new("configMap", {}),
      configMapList: api.configMapList.new([]),
      container: api.pod.mixin.spec.containersType.new("container", "nginx"),
      containerPort: api.pod.mixin.spec.containersType.portsType.new(99),
      namedContainerPort: api.pod.mixin.spec.containersType.portsType.newNamed("port", 99),
      endpointsList: api.endpointsList.new([]),
      envVar: api.pod.mixin.spec.containersType.envType.new("env", 99),
      envVarSecret: api.pod.mixin.spec.containersType.envType.fromSecretRef("env", "secret", "secretName"),
      envVarFieldPath: api.pod.mixin.spec.containersType.envType.fromFieldPath("env", "foo.bar"),
      eventList: api.eventList.new([]),
      limitRangeList: api.limitRangeList.new([]),
      namespace: api.namespace.new("ns"),
      namespaceList: api.namespaceList.new([]),
      nodeList: api.nodeList.new([]),
      persistentVolumeClaimList: api.persistentVolumeClaimList.new([]),
      persistentVolumeList: api.persistentVolumeList.new([]),
      podList: api.podList.new([]),
      podTemplateList: api.podTemplateList.new([]),
      replicationControllerList: api.replicationControllerList.new([]),
      resourceQuotaList: api.resourceQuotaList.new([]),
      secret: api.secret.new("secret", {}),
      secretString: api.secret.fromString("secret", "foo"),
      secretList: api.secretList.new([]),
      service: api.service.new("service", {}, []),
      serviceAccount: api.serviceAccount.new("serviceAccount"),
      serviceAccountList: api.serviceAccountList.new([]),
    },
  },
}

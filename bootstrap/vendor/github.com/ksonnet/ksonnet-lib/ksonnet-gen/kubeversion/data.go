package kubeversion

//-----------------------------------------------------------------------------
// Kubernetes version-specific data for customizing code that's
// emitted.
//-----------------------------------------------------------------------------

var versions = map[string]versionData{
	"v1.7.0": versionData{
		beta: false,
		idAliases: map[string]string{
			// Properties of objects. Stuff like `cinder.volumeId`.
			"hostIPC":                         "hostIpc",
			"hostPID":                         "hostPid",
			"targetCPUUtilizationPercentage":  "targetCpuUtilizationPercentage",
			"externalID":                      "externalId",
			"podCIDR":                         "podCidr",
			"providerID":                      "providerId",
			"bootID":                          "bootId",
			"machineID":                       "machineId",
			"systemUUID":                      "systemUuid",
			"volumeID":                        "volumeId",
			"diskURI":                         "diskUri",
			"targetWWNs":                      "targetWwns",
			"datasetUUID":                     "datasetUuid",
			"pdID":                            "pdId",
			"scaleIO":                         "scaleIo",
			"podIP":                           "podIp",
			"hostIP":                          "hostIp",
			"clusterIP":                       "clusterIp",
			"externalIPs":                     "externalIps",
			"loadBalancerIP":                  "loadBalancerIp",
			"containerID":                     "containerId",
			"imageID":                         "imageId",
			"serverAddressByClientCIDRs":      "serverAddressByClientCidrs",
			"clientCIDR":                      "clientCidr",
			"nonResourceURLs":                 "nonResourceUrls",
			"currentCPUUtilizationPercentage": "currentCpuUtilizationPercentage",
			"downwardAPI":                     "downwardApi",

			// Types. These have capitalized first letters, and exist in
			// places like `core.v1.AWSElasticBlockStoreVolumeSource`.
			"AWSElasticBlockStoreVolumeSource": "awsElasticBlockStoreVolumeSource",
			"CephFSVolumeSource":               "cephFsVolumeSource",
			"DownwardAPIProjection":            "downwardApiProjection",
			"DownwardAPIVolumeFile":            "downwardApiVolumeFile",
			"DownwardAPIVolumeSource":          "downwardApiVolumeSource",
			"FCVolumeSource":                   "fcVolumeSource",
			"GCEPersistentDiskVolumeSource":    "gcePersistentDiskVolumeSource",
			"HTTPGetAction":                    "httpGetAction",
			"HTTPHeader":                       "httpHeader",
			"ISCSIVolumeSource":                "iscsiVolumeSource",
			"NFSVolumeSource":                  "nfsVolumeSource",
			"RBDVolumeSource":                  "rbdVolumeSource",
			"SELinuxOptions":                   "seLinuxOptions",
			"ScaleIOVolumeSource":              "scaleIoVolumeSource",
			"TCPSocketAction":                  "tcpSocketAction",
			"APIVersion":                       "apiVersion",
			"FSGroupStrategyOptions":           "fsGroupStrategyOptions",
			"HTTPIngressPath":                  "httpIngressPath",
			"HTTPIngressRuleValue":             "httpIngressRuleValue",
			"IDRange":                          "idRange",
			"IngressTLS":                       "ingressTls",
			"SELinuxStrategyOptions":           "seLinuxStrategyOptions",
			"APIGroup":                         "apiGroup",
			"APIGroupList":                     "apiGroupList",
			"APIResource":                      "apiResource",
			"APIResourceList":                  "apiResourceList",
			"APIVersions":                      "apiVersions",
			"ServerAddressByClientCIDR":        "serverAddressByClientCidr",

			// Collisions with Jsonnet keywords.
			"local": "localStorage",
		},
		constructorSpecs: map[string][]CustomConstructorSpec{
			//
			// Apps namespace.
			//
			"io.k8s.kubernetes.pkg.apis.apps.v1beta1.Deployment":         deploymentCtor,
			"io.k8s.kubernetes.pkg.apis.apps.v1beta1.DeploymentList":     objectList,
			"io.k8s.kubernetes.pkg.apis.apps.v1beta1.DeploymentRollback": deploymentRollbackCtor,
			"io.k8s.kubernetes.pkg.apis.apps.v1beta1.Scale":              scaleCtor,
			"io.k8s.kubernetes.pkg.apis.apps.v1beta1.StatefulSet":        statefulSetCtor,
			"io.k8s.kubernetes.pkg.apis.apps.v1beta1.StatefulSetList":    objectList,

			//
			// Extensions namespace.
			//

			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.Deployment":         deploymentCtor,
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.DeploymentList":     objectList,
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.DeploymentRollback": deploymentRollbackCtor,
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.Scale":              scaleCtor,
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.StatefulSet":        statefulSetCtor,
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.StatefulSetList":    objectList,

			//
			// Authentication namespace.
			//

			"io.k8s.kubernetes.pkg.apis.authentication.v1.TokenReview": []CustomConstructorSpec{
				newConstructor(
					"new",
					newParamNestedRef("token", "mixin.spec.withToken")),
			},
			"io.k8s.kubernetes.pkg.apis.authentication.v1beta1.TokenReview": []CustomConstructorSpec{
				newConstructor(
					"new",
					newParamNestedRef("token", "mixin.spec.withToken")),
			},

			//
			// Autoscaling namespace.
			//

			"io.k8s.kubernetes.pkg.apis.autoscaling.v1.HorizontalPodAutoscalerList":       objectList,
			"io.k8s.kubernetes.pkg.apis.autoscaling.v1.Scale":                             scaleCtor,
			"io.k8s.kubernetes.pkg.apis.autoscaling.v2alpha1.HorizontalPodAutoscalerList": objectList,

			//
			// Batch namespace.
			//

			"io.k8s.kubernetes.pkg.apis.batch.v1.JobList":           objectList,
			"io.k8s.kubernetes.pkg.apis.batch.v2alpha1.CronJobList": objectList,

			//
			// Certificates namespace.
			//

			"io.k8s.kubernetes.pkg.apis.certificates.v1beta1.CertificateSigningRequestList": objectList,

			//
			// Core namespace.
			//

			"io.k8s.kubernetes.pkg.api.v1.ConfigMap": []CustomConstructorSpec{
				newConstructor(
					"new",
					newParamNestedRef("name", "mixin.metadata.withName"),
					newParam("data")),
			},
			"io.k8s.kubernetes.pkg.api.v1.ConfigMapList": objectList,
			"io.k8s.kubernetes.pkg.api.v1.Container": []CustomConstructorSpec{
				newConstructor("new", newParam("name"), newParam("image")),
			},
			"io.k8s.kubernetes.pkg.api.v1.ContainerPort": []CustomConstructorSpec{
				newConstructor("new", newParam("containerPort")),
				newConstructor("newNamed", newParam("name"), newParam("containerPort")),
			},
			"io.k8s.kubernetes.pkg.api.v1.EndpointsList": objectList,
			"io.k8s.kubernetes.pkg.api.v1.EnvVar": []CustomConstructorSpec{
				newConstructor("new", newParam("name"), newParam("value")),
				newConstructor(
					"fromSecretRef",
					newParam("name"),
					newParamNestedRef("secretRefName", "mixin.valueFrom.secretKeyRef.withName"),
					newParamNestedRef("secretRefKey", "mixin.valueFrom.secretKeyRef.withKey")),
				newConstructor(
					"fromFieldPath",
					newParam("name"),
					newParamNestedRef("fieldPath", "mixin.valueFrom.fieldRef.withFieldPath")),
			},
			"io.k8s.kubernetes.pkg.api.v1.EventList": objectList,
			"io.k8s.kubernetes.pkg.api.v1.KeyToPath": []CustomConstructorSpec{
				newConstructor("new", newParam("key"), newParam("path")),
			},
			"io.k8s.kubernetes.pkg.api.v1.LimitRangeList": objectList,
			"io.k8s.kubernetes.pkg.api.v1.Namespace": []CustomConstructorSpec{
				newConstructor(
					"new",
					newParamNestedRef("name", "mixin.metadata.withName")),
			},
			"io.k8s.kubernetes.pkg.api.v1.NamespaceList":             objectList,
			"io.k8s.kubernetes.pkg.api.v1.NodeList":                  objectList,
			"io.k8s.kubernetes.pkg.api.v1.PersistentVolumeClaimList": objectList,
			"io.k8s.kubernetes.pkg.api.v1.PersistentVolumeList":      objectList,
			"io.k8s.kubernetes.pkg.api.v1.PodList":                   objectList,
			"io.k8s.kubernetes.pkg.api.v1.PodTemplateList":           objectList,
			"io.k8s.kubernetes.pkg.api.v1.ReplicationControllerList": objectList,
			"io.k8s.kubernetes.pkg.api.v1.ResourceQuotaList":         objectList,
			"io.k8s.kubernetes.pkg.api.v1.Secret": []CustomConstructorSpec{
				newConstructor(
					"new",
					newParamNestedRef("name", "mixin.metadata.withName"),
					newParam("data"),
					newParamWithDefault("type", "\"Opaque\"")),
				newConstructor(
					"fromString",
					newParamNestedRef("name", "mixin.metadata.withName"),
					newParam("stringData"),
					newParamWithDefault("type", "\"Opaque\"")),
			},
			"io.k8s.kubernetes.pkg.api.v1.SecretList": objectList,
			"io.k8s.kubernetes.pkg.api.v1.Service": []CustomConstructorSpec{
				newConstructor(
					"new",
					newParamNestedRef("name", "mixin.metadata.withName"),
					newParamNestedRef("selector", "mixin.spec.withSelector"),
					newParamNestedRef("ports", "mixin.spec.withPorts")),
			},
			"io.k8s.kubernetes.pkg.api.v1.ServiceAccount": []CustomConstructorSpec{
				newConstructor(
					"new",
					newParamNestedRef("name", "mixin.metadata.withName")),
			},
			"io.k8s.kubernetes.pkg.api.v1.ServiceAccountList": objectList,
			"io.k8s.kubernetes.pkg.api.v1.ServiceList":        objectList,
			"io.k8s.kubernetes.pkg.api.v1.ServicePort": []CustomConstructorSpec{
				newConstructor("new", newParam("port"), newParam("targetPort")),
				newConstructor("newNamed", newParam("name"), newParam("port"), newParam("targetPort")),
			},
			"io.k8s.kubernetes.pkg.api.v1.Volume": []CustomConstructorSpec{
				newConstructor(
					"fromConfigMap",
					newParam("name"),
					newParamNestedRef("configMapName", "mixin.configMap.withName"),
					newParamNestedRef("configMapItems", "mixin.configMap.withItems")),
				newConstructor(
					"fromEmptyDir",
					newParam("name"),
					newParamNestedRefDefault("emptyDir", "mixin.emptyDir.mixinInstance", "{}")),
				newConstructor(
					"fromPersistentVolumeClaim",
					newParam("name"),
					newParamNestedRef("claimName", "mixin.persistentVolumeClaim.withClaimName")),
				newConstructor(
					"fromHostPath",
					newParam("name"),
					newParamNestedRef("hostPath", "mixin.hostPath.withPath")),
				newConstructor(
					"fromSecret",
					newParam("name"),
					newParamNestedRef("secretName", "mixin.secret.withSecretName")),
			},
			"io.k8s.kubernetes.pkg.api.v1.VolumeMount": []CustomConstructorSpec{
				newConstructor("new", newParam("name"), newParam("mountPath"), newParamWithDefault("readOnly", "false")),
			},
		},

		propertyBlacklist: map[string]propertySet{
			// Metadata fields.
			"io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta": newPropertySet(
				"creationTimestamp", "deletionTimestamp", "generation",
				"ownerReferences", "resourceVersion", "selfLink", "uid",
			),

			// Fields whose types are
			// `io.k8s.apimachinery.pkg.apis.meta.v1.ListMeta`.
			"io.k8s.kubernetes.pkg.api.v1.ComponentStatusList":                              newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.ConfigMapList":                                    newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.EndpointsList":                                    newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.EventList":                                        newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.LimitRangeList":                                   newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.NamespaceList":                                    newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.NodeList":                                         newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.PersistentVolumeClaimList":                        newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.PersistentVolumeList":                             newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.PodList":                                          newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.PodTemplateList":                                  newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.ReplicationControllerList":                        newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.ResourceQuotaList":                                newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.SecretList":                                       newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.ServiceAccountList":                               newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.api.v1.ServiceList":                                      newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.apps.v1beta1.DeploymentList":                        newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.apps.v1beta1.StatefulSetList":                       newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.autoscaling.v1.HorizontalPodAutoscalerList":         newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.autoscaling.v2alpha1.HorizontalPodAutoscalerList":   newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.batch.v1.JobList":                                   newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.batch.v2alpha1.CronJobList":                         newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.certificates.v1beta1.CertificateSigningRequestList": newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.DaemonSetList":                   newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.DeploymentList":                  newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.IngressList":                     newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.NetworkPolicyList":               newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.PodSecurityPolicyList":           newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.ReplicaSetList":                  newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.ThirdPartyResourceList":          newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.policy.v1beta1.PodDisruptionBudgetList":             newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.rbac.v1alpha1.ClusterRoleBindingList":               newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.rbac.v1alpha1.ClusterRoleList":                      newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.rbac.v1alpha1.RoleBindingList":                      newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.rbac.v1alpha1.RoleList":                             newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.rbac.v1beta1.ClusterRoleBindingList":                newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.rbac.v1beta1.ClusterRoleList":                       newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.rbac.v1beta1.RoleBindingList":                       newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.rbac.v1beta1.RoleList":                              newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.settings.v1alpha1.PodPresetList":                    newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.storage.v1.StorageClassList":                        newPropertySet("metadata"),
			"io.k8s.kubernetes.pkg.apis.storage.v1beta1.StorageClassList":                   newPropertySet("metadata"),

			// Status fields.
			"io.k8s.kubernetes.pkg.api.v1.Namespace":                                    newPropertySet("status"),
			"io.k8s.kubernetes.pkg.api.v1.Node":                                         newPropertySet("status"),
			"io.k8s.kubernetes.pkg.api.v1.NodeCondition":                                newPropertySet("status"),
			"io.k8s.kubernetes.pkg.api.v1.PersistentVolume":                             newPropertySet("status"),
			"io.k8s.kubernetes.pkg.api.v1.PersistentVolumeClaim":                        newPropertySet("status"),
			"io.k8s.kubernetes.pkg.api.v1.Pod":                                          newPropertySet("status"),
			"io.k8s.kubernetes.pkg.api.v1.PodCondition":                                 newPropertySet("status"),
			"io.k8s.kubernetes.pkg.api.v1.ReplicationController":                        newPropertySet("status"),
			"io.k8s.kubernetes.pkg.api.v1.ReplicationControllerCondition":               newPropertySet("status"),
			"io.k8s.kubernetes.pkg.api.v1.ResourceQuota":                                newPropertySet("status"),
			"io.k8s.kubernetes.pkg.api.v1.Service":                                      newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.apps.v1beta1.Deployment":                        newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.apps.v1beta1.DeploymentCondition":               newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.apps.v1beta1.Scale":                             newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.apps.v1beta1.StatefulSet":                       newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.authentication.v1.TokenReview":                  newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.authentication.v1beta1.TokenReview":             newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.authorization.v1.LocalSubjectAccessReview":      newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.authorization.v1.SelfSubjectAccessReview":       newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.authorization.v1.SubjectAccessReview":           newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.authorization.v1beta1.LocalSubjectAccessReview": newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.authorization.v1beta1.SelfSubjectAccessReview":  newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.authorization.v1beta1.SubjectAccessReview":      newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.autoscaling.v1.HorizontalPodAutoscaler":         newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.autoscaling.v1.Scale":                           newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.autoscaling.v2alpha1.HorizontalPodAutoscaler":   newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.batch.v1.Job":                                   newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.batch.v1.JobCondition":                          newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.batch.v2alpha1.CronJob":                         newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.certificates.v1beta1.CertificateSigningRequest": newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.DaemonSet":                   newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.Deployment":                  newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.DeploymentCondition":         newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.Ingress":                     newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.ReplicaSet":                  newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.ReplicaSetCondition":         newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.Scale":                       newPropertySet("status"),
			"io.k8s.kubernetes.pkg.apis.policy.v1beta1.PodDisruptionBudget":             newPropertySet("status"),

			// TODO: Find a more principled way to omit "status" types.
			// Currently we emit these in the `local hidden` in the `root`,
			// so that we can type aliases. To get around the fact that some
			// of their function names collide with Jsonnet keywords, we
			// simply choose not to emit them. Eventually we will approach
			// this problem in a more principled manner.
			"io.k8s.kubernetes.pkg.api.v1.ComponentCondition":                     newPropertySet("error", "status"),
			"io.k8s.kubernetes.pkg.apis.authentication.v1.TokenReviewStatus":      newPropertySet("error"),
			"io.k8s.kubernetes.pkg.apis.authentication.v1beta1.TokenReviewStatus": newPropertySet("error"),

			// Has both status and a property with type
			// `io.k8s.apimachinery.pkg.apis.meta.v1.ListMeta`.
			"io.k8s.apimachinery.pkg.apis.meta.v1.Status": newPropertySet("status", "metadata"),

			// Misc.
			"io.k8s.kubernetes.pkg.apis.extensions.v1beta1.DaemonSetSpec": newPropertySet("templateGeneration"),
		},
		kSource: `local k8s = import "k8s.libsonnet";

local apps = k8s.apps;
local core = k8s.core;
local extensions = k8s.extensions;

local hidden = {
  mapContainers(f):: {
    local podContainers = super.spec.template.spec.containers,
    spec+: {
      template+: {
        spec+: {
          // IMPORTANT: This overwrites the 'containers' field
          // for this deployment.
          containers: std.map(f, podContainers),
        },
      },
    },
  },

  mapContainersWithName(names, f) ::
    local nameSet =
      if std.type(names) == "array"
      then std.set(names)
      else std.set([names]);
    local inNameSet(name) = std.length(std.setInter(nameSet, std.set([name]))) > 0;
    self.mapContainers(
      function(c)
        if std.objectHas(c, "name") && inNameSet(c.name)
        then f(c)
        else c
    ),
};

k8s + {
  apps:: apps + {
    v1beta1:: apps.v1beta1 + {
      local v1beta1 = apps.v1beta1,

      daemonSet:: v1beta1.daemonSet + {
        mapContainers(f):: hidden.mapContainers(f),
        mapContainersWithName(names, f):: hidden.mapContainersWithName(names, f),
      },

      deployment:: v1beta1.deployment + {
        mapContainers(f):: hidden.mapContainers(f),
        mapContainersWithName(names, f):: hidden.mapContainersWithName(names, f),
      },
    },
  },

  core:: core + {
    v1:: core.v1 + {
      list:: {
        new(items)::
          {apiVersion: "v1"} +
          {kind: "List"} +
          self.items(items),

        items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      },
    },
  },

  extensions:: extensions + {
    v1beta1:: extensions.v1beta1 + {
      local v1beta1 = extensions.v1beta1,

      daemonSet:: v1beta1.daemonSet + {
        mapContainers(f):: hidden.mapContainers(f),
        mapContainersWithName(names, f):: hidden.mapContainersWithName(names, f),
      },

      deployment:: v1beta1.deployment + {
        mapContainers(f):: hidden.mapContainers(f),
        mapContainersWithName(names, f):: hidden.mapContainersWithName(names, f),
      },
    },
  },
}
`,
	},
	"v1.8.0": versionData{
		beta: true,
		idAliases: map[string]string{
			// Properties of objects. Stuff like `cinder.volumeId`.
			"hostIPC":                         "hostIpc",
			"hostPID":                         "hostPid",
			"targetCPUUtilizationPercentage":  "targetCpuUtilizationPercentage",
			"externalID":                      "externalId",
			"podCIDR":                         "podCidr",
			"providerID":                      "providerId",
			"bootID":                          "bootId",
			"machineID":                       "machineId",
			"systemUUID":                      "systemUuid",
			"volumeID":                        "volumeId",
			"diskURI":                         "diskUri",
			"targetWWNs":                      "targetWwns",
			"datasetUUID":                     "datasetUuid",
			"pdID":                            "pdId",
			"scaleIO":                         "scaleIo",
			"podIP":                           "podIp",
			"hostIP":                          "hostIp",
			"clusterIP":                       "clusterIp",
			"externalIPs":                     "externalIps",
			"loadBalancerIP":                  "loadBalancerIp",
			"containerID":                     "containerId",
			"imageID":                         "imageId",
			"serverAddressByClientCIDRs":      "serverAddressByClientCidrs",
			"clientCIDR":                      "clientCidr",
			"nonResourceURLs":                 "nonResourceUrls",
			"currentCPUUtilizationPercentage": "currentCpuUtilizationPercentage",
			"downwardAPI":                     "downwardApi",
			"storagePolicyID":                 "storagePolicyId",
			"clientIP":                        "clientIp",
			"insecureSkipTLSVerify":           "insecureSkipTlsVerify",
			"cephFSPersistentVolumeSource":    "cephFsPersistentVolumeSource",
			"clientIPConfig":                  "clientIpConfig",
			"storageOSPersistentVolumeSource": "storageOsPersistentVolumeSource",
			"storageOSVolumeSource":           "storageOsVolumeSource",

			// Types. These have capitalized first letters, and exist in
			// places like `core.v1.AWSElasticBlockStoreVolumeSource`.
			"AWSElasticBlockStoreVolumeSource": "awsElasticBlockStoreVolumeSource",
			"CephFSVolumeSource":               "cephFsVolumeSource",
			"DownwardAPIProjection":            "downwardApiProjection",
			"DownwardAPIVolumeFile":            "downwardApiVolumeFile",
			"DownwardAPIVolumeSource":          "downwardApiVolumeSource",
			"FCVolumeSource":                   "fcVolumeSource",
			"GCEPersistentDiskVolumeSource":    "gcePersistentDiskVolumeSource",
			"HTTPGetAction":                    "httpGetAction",
			"HTTPHeader":                       "httpHeader",
			"ISCSIVolumeSource":                "iscsiVolumeSource",
			"NFSVolumeSource":                  "nfsVolumeSource",
			"RBDVolumeSource":                  "rbdVolumeSource",
			"SELinuxOptions":                   "seLinuxOptions",
			"ScaleIOVolumeSource":              "scaleIoVolumeSource",
			"TCPSocketAction":                  "tcpSocketAction",
			"APIVersion":                       "apiVersion",
			"FSGroupStrategyOptions":           "fsGroupStrategyOptions",
			"HTTPIngressPath":                  "httpIngressPath",
			"HTTPIngressRuleValue":             "httpIngressRuleValue",
			"IDRange":                          "idRange",
			"IngressTLS":                       "ingressTls",
			"SELinuxStrategyOptions":           "seLinuxStrategyOptions",
			"APIGroup":                         "apiGroup",
			"APIGroupList":                     "apiGroupList",
			"APIResource":                      "apiResource",
			"APIResourceList":                  "apiResourceList",
			"APIVersions":                      "apiVersions",
			"ServerAddressByClientCIDR":        "serverAddressByClientCidr",
			"APIServiceCondition":              "apiServiceCondition",
			"APIServiceList":                   "apiServiceList",
			"APIServiceSpec":                   "apiServiceSpec",
			"APIServiceStatus":                 "apiServiceStatus",
			"IPBlock":                          "ipBlock",
			"JSON":                             "json",
			"APIService":                       "apiService",

			// Collisions with Jsonnet keywords.
			"local": "localStorage",
		},
		constructorSpecs: map[string][]CustomConstructorSpec{
			"io.k8s.api.admissionregistration.v1alpha1.ExternalAdmissionHookConfigurationList": objectList,
			"io.k8s.api.admissionregistration.v1alpha1.InitializerConfigurationList":           objectList,

			"io.k8s.api.apps.v1beta1.ControllerRevisionList": objectList,
			"io.k8s.api.apps.v1beta1.Deployment":             deploymentCtor,
			"io.k8s.api.apps.v1beta1.DeploymentList":         objectList,
			"io.k8s.api.apps.v1beta1.DeploymentRollback":     deploymentRollbackCtor,
			"io.k8s.api.apps.v1beta1.Scale":                  scaleCtor,
			"io.k8s.api.apps.v1beta1.StatefulSet":            statefulSetCtor,
			"io.k8s.api.apps.v1beta1.StatefulSetList":        objectList,

			"io.k8s.api.apps.v1beta2.ControllerRevisionList": objectList,
			"io.k8s.api.apps.v1beta2.DaemonSetList":          objectList,
			"io.k8s.api.apps.v1beta2.Deployment":             deploymentCtor,
			"io.k8s.api.apps.v1beta2.DeploymentList":         objectList,
			"io.k8s.api.apps.v1beta2.ReplicaSetList":         objectList,
			"io.k8s.api.apps.v1beta2.Scale":                  scaleCtor,
			"io.k8s.api.apps.v1beta2.StatefulSet":            statefulSetCtor,
			"io.k8s.api.apps.v1beta2.StatefulSetList":        objectList,

			"io.k8s.api.authentication.v1.TokenReview":      tokenReviewCtor,
			"io.k8s.api.authentication.v1beta1.TokenReview": tokenReviewCtor,

			"io.k8s.api.autoscaling.v1.HorizontalPodAutoscalerList":      objectList,
			"io.k8s.api.autoscaling.v1.Scale":                            scaleCtor,
			"io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscalerList": objectList,

			"io.k8s.api.batch.v1.JobList":           objectList,
			"io.k8s.api.batch.v1beta1.CronJobList":  objectList,
			"io.k8s.api.batch.v2alpha1.CronJobList": objectList,

			"io.k8s.api.certificates.v1beta1.CertificateSigningRequestList": objectList,

			"io.k8s.api.extensions.v1beta1.DaemonSetList":         objectList,
			"io.k8s.api.extensions.v1beta1.Deployment":            deploymentCtor,
			"io.k8s.api.extensions.v1beta1.DeploymentList":        objectList,
			"io.k8s.api.extensions.v1beta1.DeploymentRollback":    deploymentRollbackCtor,
			"io.k8s.api.extensions.v1beta1.IngressList":           objectList,
			"io.k8s.api.extensions.v1beta1.NetworkPolicyList":     objectList,
			"io.k8s.api.extensions.v1beta1.PodSecurityPolicyList": objectList,
			"io.k8s.api.extensions.v1beta1.ReplicaSetList":        objectList,
			"io.k8s.api.extensions.v1beta1.Scale":                 scaleCtor,

			"io.k8s.api.networking.v1.NetworkPolicyList": objectList,

			"io.k8s.api.policy.v1beta1.PodDisruptionBudgetList": objectList,

			"io.k8s.api.rbac.v1.ClusterRoleBindingList":      objectList,
			"io.k8s.api.rbac.v1.ClusterRoleList":             objectList,
			"io.k8s.api.rbac.v1.RoleBindingList":             objectList,
			"io.k8s.api.rbac.v1.RoleList":                    objectList,
			"io.k8s.api.rbac.v1beta1.ClusterRoleBindingList": objectList,
			"io.k8s.api.rbac.v1beta1.ClusterRoleList":        objectList,
			"io.k8s.api.rbac.v1beta1.RoleBindingList":        objectList,
			"io.k8s.api.rbac.v1beta1.RoleList":               objectList,

			"io.k8s.api.scheduling.v1alpha1.PriorityClassList": objectList,

			"io.k8s.api.settings.v1alpha1.PodPresetList": objectList,

			"io.k8s.api.storage.v1.StorageClassList":      objectList,
			"io.k8s.api.storage.v1beta1.StorageClassList": objectList,

			//
			// Core.
			//

			"io.k8s.api.core.v1.ConfigMap": []CustomConstructorSpec{
				newConstructor(
					"new",
					newParamNestedRef("name", "mixin.metadata.withName"),
					newParam("data")),
			},
			"io.k8s.api.core.v1.ConfigMapList": objectList,
			"io.k8s.api.core.v1.Container": []CustomConstructorSpec{
				newConstructor("new", newParam("name"), newParam("image")),
			},
			"io.k8s.api.core.v1.ContainerPort": []CustomConstructorSpec{
				newConstructor("new", newParam("containerPort")),
				newConstructor("newNamed", newParam("name"), newParam("containerPort")),
			},
			"io.k8s.api.core.v1.EndpointsList": objectList,
			"io.k8s.api.core.v1.EnvVar": []CustomConstructorSpec{
				newConstructor("new", newParam("name"), newParam("value")),
				newConstructor(
					"fromSecretRef",
					newParam("name"),
					newParamNestedRef("secretRefName", "mixin.valueFrom.secretKeyRef.withName"),
					newParamNestedRef("secretRefKey", "mixin.valueFrom.secretKeyRef.withKey")),
				newConstructor(
					"fromFieldPath",
					newParam("name"),
					newParamNestedRef("fieldPath", "mixin.valueFrom.fieldRef.withFieldPath")),
			},
			"io.k8s.api.core.v1.EventList": objectList,
			"io.k8s.api.core.v1.KeyToPath": []CustomConstructorSpec{
				newConstructor("new", newParam("key"), newParam("path")),
			},
			"io.k8s.api.core.v1.LimitRangeList": objectList,
			"io.k8s.api.core.v1.Namespace": []CustomConstructorSpec{
				newConstructor(
					"new",
					newParamNestedRef("name", "mixin.metadata.withName")),
			},
			"io.k8s.api.core.v1.NamespaceList":             objectList,
			"io.k8s.api.core.v1.NodeList":                  objectList,
			"io.k8s.api.core.v1.PersistentVolumeClaimList": objectList,
			"io.k8s.api.core.v1.PersistentVolumeList":      objectList,
			"io.k8s.api.core.v1.PodList":                   objectList,
			"io.k8s.api.core.v1.PodTemplateList":           objectList,
			"io.k8s.api.core.v1.ReplicationControllerList": objectList,
			"io.k8s.api.core.v1.ResourceQuotaList":         objectList,
			"io.k8s.api.core.v1.Secret": []CustomConstructorSpec{
				newConstructor(
					"new",
					newParamNestedRef("name", "mixin.metadata.withName"),
					newParam("data"),
					newParamWithDefault("type", "\"Opaque\"")),
				newConstructor(
					"fromString",
					newParamNestedRef("name", "mixin.metadata.withName"),
					newParam("stringData"),
					newParamWithDefault("type", "\"Opaque\"")),
			},
			"io.k8s.api.core.v1.SecretList": objectList,
			"io.k8s.api.core.v1.Service": []CustomConstructorSpec{
				newConstructor(
					"new",
					newParamNestedRef("name", "mixin.metadata.withName"),
					newParamNestedRef("selector", "mixin.spec.withSelector"),
					newParamNestedRef("ports", "mixin.spec.withPorts")),
			},
			"io.k8s.api.core.v1.ServiceAccount": []CustomConstructorSpec{
				newConstructor(
					"new",
					newParamNestedRef("name", "mixin.metadata.withName")),
			},
			"io.k8s.api.core.v1.ServiceAccountList": objectList,
			"io.k8s.api.core.v1.ServiceList":        objectList,
			"io.k8s.api.core.v1.ServicePort": []CustomConstructorSpec{
				newConstructor("new", newParam("port"), newParam("targetPort")),
				newConstructor("newNamed", newParam("name"), newParam("port"), newParam("targetPort")),
			},
			"io.k8s.api.core.v1.Volume": []CustomConstructorSpec{
				newConstructor(
					"fromConfigMap",
					newParam("name"),
					newParamNestedRef("configMapName", "mixin.configMap.withName"),
					newParamNestedRef("configMapItems", "mixin.configMap.withItems")),
				newConstructor(
					"fromEmptyDir",
					newParam("name"),
					newParamNestedRefDefault("emptyDir", "mixin.emptyDir.mixinInstance", "{}")),
				newConstructor(
					"fromPersistentVolumeClaim",
					newParam("name"),
					newParamNestedRef("claimName", "mixin.persistentVolumeClaim.withClaimName")),
				newConstructor(
					"fromHostPath",
					newParam("name"),
					newParamNestedRef("hostPath", "mixin.hostPath.withPath")),
				newConstructor(
					"fromSecret",
					newParam("name"),
					newParamNestedRef("secretName", "mixin.secret.withSecretName")),
			},
			"io.k8s.api.core.v1.VolumeMount": []CustomConstructorSpec{
				newConstructor("new", newParam("name"), newParam("mountPath"), newParamWithDefault("readOnly", "false")),
			},
		},
		idBlacklist: map[string]interface{}{
			"io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionSpec": false,
			"io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinition":     false,
			"io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceValidation":     false,
		},
		propertyBlacklist: map[string]propertySet{
			// Metadata fields.
			"io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta": newPropertySet(
				"creationTimestamp", "deletionTimestamp", "generation",
				"ownerReferences", "resourceVersion", "selfLink", "uid",
			),

			// Fields whose types are
			// `io.k8s.apimachinery.pkg.apis.meta.v1.ListMeta`.
			"io.k8s.api.admissionregistration.v1alpha1.ExternalAdmissionHookConfigurationList":           newPropertySet("metadata"),
			"io.k8s.api.admissionregistration.v1alpha1.InitializerConfigurationList":                     newPropertySet("metadata"),
			"io.k8s.api.apps.v1beta1.ControllerRevisionList":                                             newPropertySet("metadata"),
			"io.k8s.api.apps.v1beta1.DeploymentList":                                                     newPropertySet("metadata"),
			"io.k8s.api.apps.v1beta1.StatefulSetList":                                                    newPropertySet("metadata"),
			"io.k8s.api.apps.v1beta2.ControllerRevisionList":                                             newPropertySet("metadata"),
			"io.k8s.api.apps.v1beta2.DaemonSetList":                                                      newPropertySet("metadata"),
			"io.k8s.api.apps.v1beta2.DeploymentList":                                                     newPropertySet("metadata"),
			"io.k8s.api.apps.v1beta2.ReplicaSetList":                                                     newPropertySet("metadata"),
			"io.k8s.api.apps.v1beta2.StatefulSetList":                                                    newPropertySet("metadata"),
			"io.k8s.api.autoscaling.v1.HorizontalPodAutoscalerList":                                      newPropertySet("metadata"),
			"io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscalerList":                                 newPropertySet("metadata"),
			"io.k8s.api.batch.v1.JobList":                                                                newPropertySet("metadata"),
			"io.k8s.api.batch.v1beta1.CronJobList":                                                       newPropertySet("metadata"),
			"io.k8s.api.batch.v2alpha1.CronJobList":                                                      newPropertySet("metadata"),
			"io.k8s.api.certificates.v1beta1.CertificateSigningRequestList":                              newPropertySet("metadata"),
			"io.k8s.api.core.v1.ComponentStatusList":                                                     newPropertySet("metadata"),
			"io.k8s.api.core.v1.ConfigMapList":                                                           newPropertySet("metadata"),
			"io.k8s.api.core.v1.EndpointsList":                                                           newPropertySet("metadata"),
			"io.k8s.api.core.v1.EventList":                                                               newPropertySet("metadata"),
			"io.k8s.api.core.v1.LimitRangeList":                                                          newPropertySet("metadata"),
			"io.k8s.api.core.v1.NamespaceList":                                                           newPropertySet("metadata"),
			"io.k8s.api.core.v1.NodeList":                                                                newPropertySet("metadata"),
			"io.k8s.api.core.v1.PersistentVolumeClaimList":                                               newPropertySet("metadata"),
			"io.k8s.api.core.v1.PersistentVolumeList":                                                    newPropertySet("metadata"),
			"io.k8s.api.core.v1.PodList":                                                                 newPropertySet("metadata"),
			"io.k8s.api.core.v1.PodTemplateList":                                                         newPropertySet("metadata"),
			"io.k8s.api.core.v1.ReplicationControllerList":                                               newPropertySet("metadata"),
			"io.k8s.api.core.v1.ResourceQuotaList":                                                       newPropertySet("metadata"),
			"io.k8s.api.core.v1.SecretList":                                                              newPropertySet("metadata"),
			"io.k8s.api.core.v1.ServiceAccountList":                                                      newPropertySet("metadata"),
			"io.k8s.api.core.v1.ServiceList":                                                             newPropertySet("metadata"),
			"io.k8s.api.extensions.v1beta1.DaemonSetList":                                                newPropertySet("metadata"),
			"io.k8s.api.extensions.v1beta1.DeploymentList":                                               newPropertySet("metadata"),
			"io.k8s.api.extensions.v1beta1.IngressList":                                                  newPropertySet("metadata"),
			"io.k8s.api.extensions.v1beta1.NetworkPolicyList":                                            newPropertySet("metadata"),
			"io.k8s.api.extensions.v1beta1.PodSecurityPolicyList":                                        newPropertySet("metadata"),
			"io.k8s.api.extensions.v1beta1.ReplicaSetList":                                               newPropertySet("metadata"),
			"io.k8s.api.networking.v1.NetworkPolicyList":                                                 newPropertySet("metadata"),
			"io.k8s.api.policy.v1beta1.PodDisruptionBudgetList":                                          newPropertySet("metadata"),
			"io.k8s.api.rbac.v1.ClusterRoleBindingList":                                                  newPropertySet("metadata"),
			"io.k8s.api.rbac.v1.ClusterRoleList":                                                         newPropertySet("metadata"),
			"io.k8s.api.rbac.v1.RoleBindingList":                                                         newPropertySet("metadata"),
			"io.k8s.api.rbac.v1.RoleList":                                                                newPropertySet("metadata"),
			"io.k8s.api.rbac.v1alpha1.ClusterRoleBindingList":                                            newPropertySet("metadata"),
			"io.k8s.api.rbac.v1alpha1.ClusterRoleList":                                                   newPropertySet("metadata"),
			"io.k8s.api.rbac.v1alpha1.RoleBindingList":                                                   newPropertySet("metadata"),
			"io.k8s.api.rbac.v1alpha1.RoleList":                                                          newPropertySet("metadata"),
			"io.k8s.api.rbac.v1beta1.ClusterRoleBindingList":                                             newPropertySet("metadata"),
			"io.k8s.api.rbac.v1beta1.ClusterRoleList":                                                    newPropertySet("metadata"),
			"io.k8s.api.rbac.v1beta1.RoleBindingList":                                                    newPropertySet("metadata"),
			"io.k8s.api.rbac.v1beta1.RoleList":                                                           newPropertySet("metadata"),
			"io.k8s.api.scheduling.v1alpha1.PriorityClassList":                                           newPropertySet("metadata"),
			"io.k8s.api.settings.v1alpha1.PodPresetList":                                                 newPropertySet("metadata"),
			"io.k8s.api.storage.v1.StorageClassList":                                                     newPropertySet("metadata"),
			"io.k8s.api.storage.v1beta1.StorageClassList":                                                newPropertySet("metadata"),
			"io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionList": newPropertySet("metadata"),
			"io.k8s.kube-aggregator.pkg.apis.apiregistration.v1beta1.APIServiceList":                     newPropertySet("metadata"),

			// Status fields.
			"io.k8s.api.apps.v1beta1.Deployment":                                                              newPropertySet("status"),
			"io.k8s.api.apps.v1beta1.DeploymentCondition":                                                     newPropertySet("status"),
			"io.k8s.api.apps.v1beta1.Scale":                                                                   newPropertySet("status"),
			"io.k8s.api.apps.v1beta1.StatefulSet":                                                             newPropertySet("status"),
			"io.k8s.api.apps.v1beta2.DaemonSet":                                                               newPropertySet("status"),
			"io.k8s.api.apps.v1beta2.Deployment":                                                              newPropertySet("status"),
			"io.k8s.api.apps.v1beta2.DeploymentCondition":                                                     newPropertySet("status"),
			"io.k8s.api.apps.v1beta2.ReplicaSet":                                                              newPropertySet("status"),
			"io.k8s.api.apps.v1beta2.ReplicaSetCondition":                                                     newPropertySet("status"),
			"io.k8s.api.apps.v1beta2.Scale":                                                                   newPropertySet("status"),
			"io.k8s.api.apps.v1beta2.StatefulSet":                                                             newPropertySet("status"),
			"io.k8s.api.authentication.v1.TokenReview":                                                        newPropertySet("status"),
			"io.k8s.api.authentication.v1beta1.TokenReview":                                                   newPropertySet("status"),
			"io.k8s.api.authorization.v1.LocalSubjectAccessReview":                                            newPropertySet("status"),
			"io.k8s.api.authorization.v1.SelfSubjectAccessReview":                                             newPropertySet("status"),
			"io.k8s.api.authorization.v1.SelfSubjectRulesReview":                                              newPropertySet("status"),
			"io.k8s.api.authorization.v1.SubjectAccessReview":                                                 newPropertySet("status"),
			"io.k8s.api.authorization.v1beta1.LocalSubjectAccessReview":                                       newPropertySet("status"),
			"io.k8s.api.authorization.v1beta1.SelfSubjectAccessReview":                                        newPropertySet("status"),
			"io.k8s.api.authorization.v1beta1.SelfSubjectRulesReview":                                         newPropertySet("status"),
			"io.k8s.api.authorization.v1beta1.SubjectAccessReview":                                            newPropertySet("status"),
			"io.k8s.api.autoscaling.v1.HorizontalPodAutoscaler":                                               newPropertySet("status"),
			"io.k8s.api.autoscaling.v1.Scale":                                                                 newPropertySet("status"),
			"io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscaler":                                          newPropertySet("status"),
			"io.k8s.api.autoscaling.v2beta1.HorizontalPodAutoscalerCondition":                                 newPropertySet("status"),
			"io.k8s.api.batch.v1.Job":                                                                         newPropertySet("status"),
			"io.k8s.api.batch.v1.JobCondition":                                                                newPropertySet("status"),
			"io.k8s.api.batch.v1beta1.CronJob":                                                                newPropertySet("status"),
			"io.k8s.api.batch.v2alpha1.CronJob":                                                               newPropertySet("status"),
			"io.k8s.api.certificates.v1beta1.CertificateSigningRequest":                                       newPropertySet("status"),
			"io.k8s.api.core.v1.ComponentCondition":                                                           newPropertySet("status"),
			"io.k8s.api.core.v1.Namespace":                                                                    newPropertySet("status"),
			"io.k8s.api.core.v1.Node":                                                                         newPropertySet("status"),
			"io.k8s.api.core.v1.NodeCondition":                                                                newPropertySet("status"),
			"io.k8s.api.core.v1.PersistentVolume":                                                             newPropertySet("status"),
			"io.k8s.api.core.v1.PersistentVolumeClaim":                                                        newPropertySet("status"),
			"io.k8s.api.core.v1.PersistentVolumeClaimCondition":                                               newPropertySet("status"),
			"io.k8s.api.core.v1.Pod":                                                                          newPropertySet("status"),
			"io.k8s.api.core.v1.PodCondition":                                                                 newPropertySet("status"),
			"io.k8s.api.core.v1.ReplicationController":                                                        newPropertySet("status"),
			"io.k8s.api.core.v1.ReplicationControllerCondition":                                               newPropertySet("status"),
			"io.k8s.api.core.v1.ResourceQuota":                                                                newPropertySet("status"),
			"io.k8s.api.core.v1.Service":                                                                      newPropertySet("status"),
			"io.k8s.api.extensions.v1beta1.DaemonSet":                                                         newPropertySet("status"),
			"io.k8s.api.extensions.v1beta1.Deployment":                                                        newPropertySet("status"),
			"io.k8s.api.extensions.v1beta1.DeploymentCondition":                                               newPropertySet("status"),
			"io.k8s.api.extensions.v1beta1.Ingress":                                                           newPropertySet("status"),
			"io.k8s.api.extensions.v1beta1.ReplicaSet":                                                        newPropertySet("status"),
			"io.k8s.api.extensions.v1beta1.ReplicaSetCondition":                                               newPropertySet("status"),
			"io.k8s.api.extensions.v1beta1.Scale":                                                             newPropertySet("status"),
			"io.k8s.api.policy.v1beta1.PodDisruptionBudget":                                                   newPropertySet("status"),
			"io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinition":          newPropertySet("status"),
			"io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.v1beta1.CustomResourceDefinitionCondition": newPropertySet("status"),
			"io.k8s.kube-aggregator.pkg.apis.apiregistration.v1beta1.APIService":                              newPropertySet("status"),
			"io.k8s.kube-aggregator.pkg.apis.apiregistration.v1beta1.APIServiceCondition":                     newPropertySet("status"),

			// Has both status and a property with type
			// `io.k8s.apimachinery.pkg.apis.meta.v1.ListMeta`.
			"io.k8s.apimachinery.pkg.apis.meta.v1.Status": newPropertySet("status", "metadata"),

			// Misc.
			"io.k8s.api.extensions.v1beta1.DaemonSetSpec": newPropertySet("templateGeneration"),
		},
		kSource: `local k8s = import "k8s.libsonnet";

local apps = k8s.apps;
local core = k8s.core;
local extensions = k8s.extensions;

local hidden = {
  mapContainers(f):: {
    local podContainers = super.spec.template.spec.containers,
    spec+: {
      template+: {
        spec+: {
          // IMPORTANT: This overwrites the 'containers' field
          // for this deployment.
          containers: std.map(f, podContainers),
        },
      },
    },
  },

  mapContainersWithName(names, f) ::
    local nameSet =
      if std.type(names) == "array"
      then std.set(names)
      else std.set([names]);
    local inNameSet(name) = std.length(std.setInter(nameSet, std.set([name]))) > 0;
    self.mapContainers(
      function(c)
        if std.objectHas(c, "name") && inNameSet(c.name)
        then f(c)
        else c
    ),
};

k8s + {
  apps:: apps + {
    v1beta1:: apps.v1beta1 + {
      local v1beta1 = apps.v1beta1,

      daemonSet:: v1beta1.daemonSet + {
        mapContainers(f):: hidden.mapContainers(f),
        mapContainersWithName(names, f):: hidden.mapContainersWithName(names, f),
      },

      deployment:: v1beta1.deployment + {
        mapContainers(f):: hidden.mapContainers(f),
        mapContainersWithName(names, f):: hidden.mapContainersWithName(names, f),
      },
    },
  },

  core:: core + {
    v1:: core.v1 + {
      list:: {
        new(items)::
          {apiVersion: "v1"} +
          {kind: "List"} +
          self.items(items),

        items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      },
    },
  },

  extensions:: extensions + {
    v1beta1:: extensions.v1beta1 + {
      local v1beta1 = extensions.v1beta1,

      daemonSet:: v1beta1.daemonSet + {
        mapContainers(f):: hidden.mapContainers(f),
        mapContainersWithName(names, f):: hidden.mapContainersWithName(names, f),
      },

      deployment:: v1beta1.deployment + {
        mapContainers(f):: hidden.mapContainers(f),
        mapContainersWithName(names, f):: hidden.mapContainersWithName(names, f),
      },
    },
  },
}
`,
	},
}

//-----------------------------------------------------------------------------
// Utility specs, for duplicated objects.
//-----------------------------------------------------------------------------

var objectList = []CustomConstructorSpec{
	newConstructor(
		"new",
		newParam("items")),
}
var deploymentCtor = []CustomConstructorSpec{
	newConstructor(
		"new",
		newParamNestedRef("name", "mixin.metadata.withName"),
		newParamNestedRef("replicas", "mixin.spec.withReplicas"),
		newParamNestedRef("containers", "mixin.spec.template.spec.withContainers"),
		newParamNestedRefDefault(
			"podLabels",
			"mixin.spec.template.metadata.withLabels",
			"{app: name}")),
}
var deploymentRollbackCtor = []CustomConstructorSpec{
	newConstructor(
		"new",
		newParam("name")),
}
var scaleCtor = []CustomConstructorSpec{
	newConstructor(
		"new",
		newParamNestedRef("replicas", "mixin.spec.withReplicas")),
}
var statefulSetCtor = []CustomConstructorSpec{
	newConstructor(
		"new",
		newParamNestedRef("name", "mixin.metadata.withName"),
		newParamNestedRef("replicas", "mixin.spec.withReplicas"),
		newParamNestedRef("containers", "mixin.spec.template.spec.withContainers"),
		newParamNestedRef("volumeClaims", "mixin.spec.withVolumeClaimTemplates"),
		newParamNestedRefDefault(
			"podLabels",
			"mixin.spec.template.metadata.withLabels",
			"{app: name}")),
}

var tokenReviewCtor = []CustomConstructorSpec{
	newConstructor(
		"new",
		newParamNestedRef("token", "mixin.spec.withToken")),
}

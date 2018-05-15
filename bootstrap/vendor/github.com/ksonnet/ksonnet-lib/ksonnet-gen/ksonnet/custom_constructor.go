package ksonnet

// NOTE: custom constructors will be removed at ksonnet 0.11

func locateConstructors(desc Description) []constructor {
	ctors, ok := customConstructors[desc]
	if !ok {
		return nil
	}

	return ctors
}

func makeDescriptor(codebase, group, kind string) Description {
	return Description{
		Codebase: codebase,
		Group:    group,
		Kind:     kind,
	}
}

var (
	customConstructors = map[Description][]constructor{
		makeDescriptor("api", "apps", "Deployment"):         deploymentCtor,
		makeDescriptor("api", "apps", "DeploymentList"):     objectList,
		makeDescriptor("api", "apps", "DeploymentRollback"): deploymentRollbackCtor,
		makeDescriptor("api", "apps", "Scale"):              scaleCtor,
		makeDescriptor("api", "apps", "StatefulSet"):        statefulSetCtor,
		makeDescriptor("api", "apps", "StatefulSetList"):    objectList,

		makeDescriptor("api", "extensions", "Deployment"):         deploymentCtor,
		makeDescriptor("api", "extensions", "DeploymentList"):     objectList,
		makeDescriptor("api", "extensions", "DeploymentRollback"): deploymentRollbackCtor,
		makeDescriptor("api", "extensions", "Scale"):              scaleCtor,
		makeDescriptor("api", "extensions", "StatefulSet"):        statefulSetCtor,
		makeDescriptor("api", "extensions", "StatefulSetList"):    objectList,

		makeDescriptor("api", "authentication", "TokenReview"): []constructor{
			*newConstructor(
				"new",
				*newConstructorParam("token", "mixin.spec.withToken", nil),
			),
		},

		makeDescriptor("api", "autoscaling", "HorizontalPodAutoscalerList"): objectList,
		makeDescriptor("api", "autoscaling", "Scale"):                       scaleCtor,

		makeDescriptor("api", "batch", "JobList"):     objectList,
		makeDescriptor("api", "batch", "CronJobList"): objectList,

		makeDescriptor("api", "certificates", "CertificateSigningRequestList"): objectList,

		makeDescriptor("api", "core", "ConfigMap"): []constructor{
			*newConstructor(
				"new",
				*newConstructorParam("name", "mixin.metadata.withName", nil),
				*newConstructorParam("data", "withData", nil),
			),
		},
		makeDescriptor("api", "core", "ConfigMapList"): objectList,
		makeDescriptor("api", "core", "Container"): []constructor{
			*newConstructor(
				"new",
				*newConstructorParam("name", "withName", nil),
				*newConstructorParam("image", "withImage", nil),
			),
		},
		makeDescriptor("api", "core", "ContainerPort"): []constructor{
			*newConstructor("new", *newConstructorParam("containerPort", "withContainerPort", nil)),
			*newConstructor("newNamed",
				*newConstructorParam("containerPort", "withContainerPort", nil),
				*newConstructorParam("name", "withName", nil),
			),
		},
		makeDescriptor("api", "core", "EndpointsList"): objectList,
		makeDescriptor("api", "core", "EnvVar"): []constructor{
			*newConstructor("new",
				*newConstructorParam("name", "withName", nil),
				*newConstructorParam("value", "withValue", nil)),
			*newConstructor("fromSecretRef",
				*newConstructorParam("name", "withName", nil),
				*newConstructorParam("secretRefName", "mixin.valueFrom.secretKeyRef.withName", nil),
				*newConstructorParam("secretRefKey", "mixin.valueFrom.secretKeyRef.withKey", nil)),
			*newConstructor("fromFieldPath",
				*newConstructorParam("name", "withName", nil),
				*newConstructorParam("fieldPath", "mixin.valueFrom.fieldRef.withFieldPath", nil)),
		},
		makeDescriptor("api", "core", "EventList"): objectList,
		makeDescriptor("api", "core", "KeyToPath"): []constructor{
			*newConstructor("new",
				*newConstructorParam("key", "withKey", nil),
				*newConstructorParam("path", "withPath", nil)),
		},
		makeDescriptor("api", "core", "LimitRangeList"): objectList,
		makeDescriptor("api", "core", "Namespace"): []constructor{
			*newConstructor("new",
				*newConstructorParam("name", "withName", nil)),
		},
		makeDescriptor("api", "core", "NamespaceList"):             objectList,
		makeDescriptor("api", "core", "NodeList"):                  objectList,
		makeDescriptor("api", "core", "PersistentVolumeClaimList"): objectList,
		makeDescriptor("api", "core", "PersistentVolumeList"):      objectList,
		makeDescriptor("api", "core", "PodList"):                   objectList,
		makeDescriptor("api", "core", "PodTemplateList"):           objectList,
		makeDescriptor("api", "core", "ReplicationControllerList"): objectList,
		makeDescriptor("api", "core", "ResourceQuotaList"):         objectList,
		makeDescriptor("api", "core", "Secret"): []constructor{
			*newConstructor("new",
				*newConstructorParam("name", "mixin.metadata.withName", nil),
				*newConstructorParam("data", "withData", nil),
				*newConstructorParam("type", "withType", "Opaque")),
			*newConstructor("new",
				*newConstructorParam("name", "mixin.metadata.withName", nil),
				*newConstructorParam("stringDate", "withStringData", nil),
				*newConstructorParam("type", "withType", "Opaque")),
		},
		makeDescriptor("api", "core", "SecretList"): objectList,
		makeDescriptor("api", "core", "Service"): []constructor{
			*newConstructor("new",
				*newConstructorParam("name", "mixin.metadata.withName", nil),
				*newConstructorParam("selector", "mixin.spec.withSelector", nil),
				*newConstructorParam("ports", "mixin.spec.withPorts", nil)),
		},
		makeDescriptor("api", "core", "ServiceAccount"): []constructor{
			*newConstructor("new",
				*newConstructorParam("name", "mixin.metadata.withName", nil)),
		},
		makeDescriptor("api", "core", "ServiceAccountList"): objectList,
		makeDescriptor("api", "core", "ServiceList"):        objectList,
		makeDescriptor("api", "core", "ServicePort"): []constructor{
			*newConstructor("new",
				*newConstructorParam("port", "withPort", nil),
				*newConstructorParam("targetPort", "withTargetPort", nil)),
			*newConstructor("newNamed",
				*newConstructorParam("name", "mixin.metadata.withName", nil),
				*newConstructorParam("port", "withPort", nil),
				*newConstructorParam("targetPort", "withTargetPort", nil)),
		},
		makeDescriptor("api", "core", "Volume"): []constructor{
			*newConstructor(
				"fromConfigMap",
				*newConstructorParam("name", "withName", nil),
				*newConstructorParam("configMapName", "mixin.configMap.withName", nil),
				*newConstructorParam("configMapItems", "mixin.configMap.withItems", nil)),
			*newConstructor("fromEmptyDir",
				*newConstructorParam("name", "withName", nil),
				*newConstructorParam("emptyDir", "mixin.emptyDir.mixinInstance",
					map[string]interface{}{})),
			*newConstructor("fromPersistentVolumeClaim",
				*newConstructorParam("name", "withName", nil),
				*newConstructorParam("emptyDir", "mixin.persistentVolumeClaim.withClaimName", nil)),
			*newConstructor("fromHostPath",
				*newConstructorParam("name", "withName", nil),
				*newConstructorParam("hostPath", "mixin.hostPath.withPath", nil)),
			*newConstructor("fromSecret",
				*newConstructorParam("name", "withName", nil),
				*newConstructorParam("secretName", "mixin.secret.withSecretName", nil)),
		},
		makeDescriptor("api", "core", "VolumeMount"): []constructor{
			*newConstructor("new",
				*newConstructorParam("name", "withName", nil),
				*newConstructorParam("mountPath", "withMountPath", nil),
				*newConstructorParam("readOnly", "withReadOnly", false)),
		},
	}

	// customConstructor definitions

	deploymentCtor = []constructor{
		*newConstructor(
			"new",
			*newConstructorParam("name", "mixin.metadata.withName", nil),
			*newConstructorParam("replicas", "mixin.spec.withReplicas", 1),
			*newConstructorParam("containers", "mixin.spec.template.spec.withContainers", nil),
			*newConstructorParam("podLabels", "mixin.spec.template.metadata.withLabels",
				map[string]interface{}{"app": "name"}),
		),
	}
	deploymentRollbackCtor = []constructor{
		*newConstructor(
			"new",
			*newConstructorParam("name", "withName", nil),
		),
	}
	objectList = []constructor{
		*newConstructor(
			"new",
			*newConstructorParam("items", "withItems", nil),
		),
	}
	scaleCtor = []constructor{
		*newConstructor(
			"new",
			*newConstructorParam("replicas", "mixin.spec.withReplicas", 1),
		),
	}
	statefulSetCtor = []constructor{
		*newConstructor(
			"new",
			*newConstructorParam("name", "mixin.metadata.withName", nil),
			*newConstructorParam("replicas", "mixin.spec.withReplicas", 1),
			*newConstructorParam("containers", "mixin.spec.template.spec.withContainers", nil),
			*newConstructorParam("volumeClaims", "mixin.spec.withVolumeClaimTemplates", nil),
			*newConstructorParam("podLabels", "mixin.spec.template.metadata.withLabels", map[string]interface{}{
				"app": "name",
			}),
		),
	}
	tokenReviewCtor = []constructor{
		*newConstructor(
			"new",
			*newConstructorParam("token", "mixin.spec.withToken", nil),
		),
	}
)

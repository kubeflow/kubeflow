{
  // TODO(jlewi): Do we need to add parts corresponding to a service account and cluster binding role?
  // see https://github.com/argoproj/argo/blob/master/cmd/argo/commands/install.go
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    // CRD's are not namespace scoped; see
    // https://kubernetes.io/docs/tasks/access-kubernetes-api/extend-api-custom-resource-definitions/
    local workflowCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "workflows.argoproj.io",
      },
      spec: {
        group: "argoproj.io",
        names: {
          kind: "Workflow",
          listKind: "WorkflowList",
          plural: "workflows",
          shortNames: [
            "wf",
          ],
          singular: "workflow",
        },
        scope: "Namespaced",
        version: "v1alpha1",
      },
    },  // crd
    workflowCRD:: workflowCRD,

    // Deploy the controller
    local workflowController = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "workflow-controller",
        },
        name: "workflow-controller",
        namespace: params.namespace,
      },
      spec: {
        progressDeadlineSeconds: 600,
        replicas: 1,
        revisionHistoryLimit: 10,
        selector: {
          matchLabels: {
            app: "workflow-controller",
          },
        },
        strategy: {
          rollingUpdate: {
            maxSurge: "25%",
            maxUnavailable: "25%",
          },
          type: "RollingUpdate",
        },
        template: {
          metadata: {
            creationTimestamp: null,
            labels: {
              app: "workflow-controller",
            },
          },
          spec: {
            containers: [
              {
                args: [
                  "--configmap",
                  "workflow-controller-configmap",
                ],
                command: [
                  "workflow-controller",
                ],
                env: [
                  {
                    name: "ARGO_NAMESPACE",
                    valueFrom: {
                      fieldRef: {
                        apiVersion: "v1",
                        fieldPath: "metadata.namespace",
                      },
                    },
                  },
                ],
                image: params.workflowControllerImage,
                imagePullPolicy: "IfNotPresent",
                name: "workflow-controller",
                resources: {},
                terminationMessagePath: "/dev/termination-log",
                terminationMessagePolicy: "File",
              },
            ],
            dnsPolicy: "ClusterFirst",
            restartPolicy: "Always",
            schedulerName: "default-scheduler",
            securityContext: {},
            serviceAccount: "argo",
            serviceAccountName: "argo",
            terminationGracePeriodSeconds: 30,
          },
        },
      },
    },  // deploy
    workflowController:: workflowController,

    local argoUI = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "argo-ui",
        },
        name: "argo-ui",
        namespace: params.namespace,
      },
      spec: {
        progressDeadlineSeconds: 600,
        replicas: 1,
        revisionHistoryLimit: 10,
        selector: {
          matchLabels: {
            app: "argo-ui",
          },
        },
        strategy: {
          rollingUpdate: {
            maxSurge: "25%",
            maxUnavailable: "25%",
          },
          type: "RollingUpdate",
        },
        template: {
          metadata: {
            creationTimestamp: null,
            labels: {
              app: "argo-ui",
            },
          },
          spec: {
            containers: [
              {
                env: [
                  {
                    name: "ARGO_NAMESPACE",
                    valueFrom: {
                      fieldRef: {
                        apiVersion: "v1",
                        fieldPath: "metadata.namespace",
                      },
                    },
                  },
                  {
                    name: "IN_CLUSTER",
                    value: "true",
                  },
                  {
                    name: "BASE_HREF",
                    value: "/argo/",
                  },
                ],
                image: params.uiImage,
                imagePullPolicy: "IfNotPresent",
                name: "argo-ui",
                resources: {},
                terminationMessagePath: "/dev/termination-log",
                terminationMessagePolicy: "File",
                readinessProbe: {
                  httpGet: {
                    path: "/",
                    port: 8001,
                  },
                },
              },
            ],
            dnsPolicy: "ClusterFirst",
            restartPolicy: "Always",
            schedulerName: "default-scheduler",
            securityContext: {},
            serviceAccount: "argo-ui",
            serviceAccountName: "argo-ui",
            terminationGracePeriodSeconds: 30,
          },
        },
      },
    },  // deployUi
    argoUI:: argoUI,

    local argUIService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "argo-ui",
        },
        name: "argo-ui",
        namespace: params.namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: argo-ui-mapping",
              "prefix: /argo/",
              "service: argo-ui." + params.namespace,
            ]),
        },  //annotations
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 8001,
          },
        ],
        selector: {
          app: "argo-ui",
        },
        sessionAffinity: "None",
        type: "NodePort",
      },
    },
    argUIService:: argUIService,

    local workflowControllerConfigmap = {
      apiVersion: "v1",
      data: {
        config: std.format(|||
                             {
                             executorImage: %s,
                             artifactRepository:
                             {
                                 s3: {
                                     bucket: %s,
                                     keyPrefix: %s,
                                     endpoint: %s,
                                     insecure: %s,
                                     accessKeySecret: {
                                         name: %s,
                                         key: %s
                                     },
                                     secretKeySecret: {
                                         name: %s,
                                         key: %s
                                     }
                                 }
                             }
                             }
                           |||,
                           [
                             params.executorImage,
                             params.artifactRepositoryBucket,
                             params.artifactRepositoryKeyPrefix,
                             params.artifactRepositoryEndpoint,
                             params.artifactRepositoryInsecure,
                             params.artifactRepositoryAccessKeySecretName,
                             params.artifactRepositoryAccessKeySecretKey,
                             params.artifactRepositorySecretKeySecretName,
                             params.artifactRepositorySecretKeySecretKey,
                           ]),
      },
      kind: "ConfigMap",
      metadata: {
        name: "workflow-controller-configmap",
        namespace: params.namespace,
      },
    },
    workflowControllerConfigmap:: workflowControllerConfigmap,

    local argoServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "argo",
        namespace: params.namespace,
      },
    },  // service account
    argoServiceAccount:: argoServiceAccount,

    // Keep in sync with https://github.com/argoproj/argo/blob/master/cmd/argo/commands/const.go#L20
    // Permissions need to be cluster wide for the workflow controller to be able to process workflows
    // in other namespaces. We could potentially use the ConfigMap of the workflow-controller to
    // scope it to a particular namespace in which case we might be able to restrict the permissions
    // to a particular namespace.
    local argoClusterRole = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "argo",
        },
        name: "argo",
      },
      rules: [
        {
          apiGroups: [""],
          resources: [
            "pods",
            "pods/exec",
          ],
          verbs: [
            "create",
            "get",
            "list",
            "watch",
            "update",
            "patch",
          ],
        },
        {
          apiGroups: [""],
          resources: [
            "configmaps",
          ],
          verbs: [
            "get",
            "watch",
            "list",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "persistentvolumeclaims",
          ],
          verbs: [
            "create",
            "delete",
          ],
        },
        {
          apiGroups: [
            "argoproj.io",
          ],
          resources: [
            "workflows",
          ],
          verbs: [
            "get",
            "list",
            "watch",
            "update",
            "patch",
          ],
        },
      ],
    },  // operator-role
    argoClusterRole:: argoClusterRole,

    local argoClusterRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "argo",
        },
        name: "argo",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "argo",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "argo",
          namespace: params.namespace,
        },
      ],
    },  // role binding
    argoClusterRoleBinding:: argoClusterRoleBinding,

    local argoUIServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "argo-ui",
        namespace: params.namespace,
      },
    },  // service account
    argoUIServiceAccount:: argoUIServiceAccount,

    // Keep in sync with https://github.com/argoproj/argo/blob/master/cmd/argo/commands/const.go#L44
    // Permissions need to be cluster wide for the workflow controller to be able to process workflows
    // in other namespaces. We could potentially use the ConfigMap of the workflow-controller to
    // scope it to a particular namespace in which case we might be able to restrict the permissions
    // to a particular namespace.
    local argoUIRole = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "argo",
        },
        name: "argo-ui",
      },
      rules: [
        {
          apiGroups: [""],
          resources: [
            "pods",
            "pods/exec",
            "pods/log",
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [""],
          resources: [
            "secrets",
          ],
          verbs: [
            "get",
          ],
        },
        {
          apiGroups: [
            "argoproj.io",
          ],
          resources: [
            "workflows",
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
      ],
    },  // operator-role
    argoUIRole:: argoUIRole,

    local argUIClusterRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "argo-ui",
        },
        name: "argo-ui",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "argo-ui",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "argo-ui",
          namespace: params.namespace,
        },
      ],
    },  // role binding
    argUIClusterRoleBinding:: argUIClusterRoleBinding,

    parts: self,
    all:: [
      self.workflowCRD,
      self.workflowController,
      self.argoUI,
      self.argUIService,
      self.workflowControllerConfigmap,
      self.argoServiceAccount,
      self.argoClusterRole,
      self.argoClusterRoleBinding,
      self.argoUIServiceAccount,
      self.argoUIRole,
      self.argUIClusterRoleBinding,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

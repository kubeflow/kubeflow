{
  // TODO(jlewi): Do we need to add parts corresponding to a service account and cluster binding role?
  // see https://github.com/argoproj/argo/blob/master/cmd/argo/commands/install.go

  parts(params):: {
    all:: [
      $.parts(params).crd,
      $.parts(params).config,
      $.parts(params).deploy,
      $.parts(params).deployUi,
      $.parts(params).uiService,
      $.parts(params).serviceAccount,
      $.parts(params).role,
      $.parts(params).roleBinding,
      $.parts(params).uiServiceAccount,
      $.parts(params).uiRole,
      $.parts(params).uiRoleBinding,
    ],

    // CRD's are not namespace scoped; see
    // https://kubernetes.io/docs/tasks/access-kubernetes-api/extend-api-custom-resource-definitions/
    crd: {
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

    // Deploy the controller
    deploy: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      labels: {
        app: "workflow-controller",
      },
      metadata: {
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

    deployUi: {
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
                ],
                image: params.uiImage,
                imagePullPolicy: "IfNotPresent",
                name: "argo-ui",
                resources: {},
                terminationMessagePath: "/dev/termination-log",
                terminationMessagePolicy: "File",
              },
            ],
            dnsPolicy: "ClusterFirst",
            restartPolicy: "Always",
            schedulerName: "default-scheduler",
            securityContext: {},
            serviceAccount: "argo-ui",
            serviceAccountName: "argo-ui",
            terminationGracePeriodSeconds: 30,
            readinessProbe: {
              httpGet: {
                path: "/",
                port: 8001,
              },
            },
          },
        },
      },
    },  // deployUi

    uiService: {
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
              "rewrite: /argo/",
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

    config: {
      apiVersion: "v1",
      data: {
        config: @"executorImage: " + params.executorImage,
      },
      kind: "ConfigMap",
      metadata: {
        name: "workflow-controller-configmap",
        namespace: params.namespace,
      },
    },

    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "argo",
        namespace: params.namespace,
      },
    },  // service account

    // Keep in sync with https://github.com/argoproj/argo/blob/master/cmd/argo/commands/const.go#L20
    // Permissions need to be cluster wide for the workflow controller to be able to process workflows
    // in other namespaces. We could potentially use the ConfigMap of the workflow-controller to
    // scope it to a particular namespace in which case we might be able to restrict the permissions
    // to a particular namespace.
    role: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "argo",
        },
        name: "argo",
        namespace: params.namespace,
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

    roleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "argo",
        },
        name: "argo",
        namespace: params.namespace,
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

    uiServiceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "argo-ui",
        namespace: params.namespace,
      },
    },  // service account

    // Keep in sync with https://github.com/argoproj/argo/blob/master/cmd/argo/commands/const.go#L44
    // Permissions need to be cluster wide for the workflow controller to be able to process workflows
    // in other namespaces. We could potentially use the ConfigMap of the workflow-controller to
    // scope it to a particular namespace in which case we might be able to restrict the permissions
    // to a particular namespace.
    uiRole: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "argo",
        },
        name: "argo-ui",
        namespace: params.namespace,
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

    uiRoleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "argo-ui",
        },
        name: "argo-ui",
        namespace: params.namespace,
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
  },  // parts
}

{
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.

  // TODO(jlewi): Do we need to add parts corresponding to a service account and cluster binding role?
  // see https://github.com/argoproj/argo/blob/master/cmd/argo/commands/install.go

  parts(namespace):: {
    all:: [
      $.parts(namespace).deployUi,
      $.parts(namespace).uiService,
      $.parts(namespace).roleBinding,
      $.parts(namespace).uiServiceAccount,
      $.parts(namespace).uiRole,
      $.parts(namespace).uiRoleBinding,
    ],

    deployUi: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "centraldash",
        },
        name: "centraldash",
        namespace: namespace,
      },
      spec: {
        progressDeadlineSeconds: 600,
        replicas: 1,
        revisionHistoryLimit: 10,
        selector: {
          matchLabels: {
            app: "centraldash",
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
              app: "centraldash",
            },
          },
          spec: {
            containers: [
              {
                env: [
                  {
                    name: "CENTRALDASH_NAMESPACE",
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
                image: "swiftdiaries/centraldash:0.4",
                imagePullPolicy: "IfNotPresent",
                name: "centraldash",
                resources: {},
                terminationMessagePath: "/dev/termination-log",
                terminationMessagePolicy: "File",
              },
            ],
            dnsPolicy: "ClusterFirst",
            restartPolicy: "Always",
            schedulerName: "default-scheduler",
            securityContext: {},
            serviceAccount: "centraldash",
            serviceAccountName: "centraldash",
            terminationGracePeriodSeconds: 30,
            readinessProbe: {
              httpGet: {
                path: "/",
                port: 8082,
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
          app: "centraldash",
        },
        name: "centraldash",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            port: 8082,
            targetPort: 8082,
          },
        ],
        selector: {
          app: "centraldash",
        },
        sessionAffinity: "None",
        type: "NodePort",
      },
    },  //service

    roleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "centraldash",
        },
        name: "centraldash",
        namespace: namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "centraldash",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "centraldash",
          namespace: namespace,
        },
      ],
    },  // role binding

    uiServiceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "centraldash",
        namespace: namespace,
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
          app: "centraldash",
        },
        name: "centraldash",
        namespace: namespace,
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
          app: "centraldash",
        },
        name: "centraldash",
        namespace: namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "centraldash",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "centraldash",
          namespace: namespace,
        },
      ],
    },  // role binding
  },  // parts
}

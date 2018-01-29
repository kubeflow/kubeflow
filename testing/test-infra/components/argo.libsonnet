{
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.

  // TODO(jlewi): Do we need to add parts corresponding to a service account and cluster binding role?
  // see https://github.com/argoproj/argo/blob/master/cmd/argo/commands/install.go

  parts(namespace):: {
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
        namespace: namespace,
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
                image: "argoproj/workflow-controller:v2.0.0-alpha3",
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
        namespace: namespace,
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
                image: "argoproj/argoui:v2.0.0-alpha3",
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
            serviceAccount: "argo",
            serviceAccountName: "argo",
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

    uiIngress:: {
      apiVersion: "extensions/v1beta1",
      kind: "Ingress",
      metadata: {
        name: "argo-ui",
        namespace: namespace,
      },
      annotations: {
        "kubernetes.io/ingress.global-static-ip-name": "argo-ui",
      },
      spec: {
        rules: [
          {
            http: {
              paths: [
                {
                  backend: {
                    serviceName: "argo-ui",
                    servicePort: 80,
                  },
                  path: "/*",
                },
              ],
            },
          },
        ],
      },
    },  // ingress

    uiService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "argo-ui",
        },
        name: "argo-ui",
        namespace: namespace,
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
        config: @"executorImage: argoproj/argoexec:v2.0.0-alpha2",
      },
      kind: "ConfigMap",
      metadata: {
        name: "workflow-controller-configmap",
        namespace: namespace,
      },
    },

    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "argo",
        namespace: namespace,
      },
    },  // service account

    // TODO(jlewi): Do we really need cluster admin privileges? Why?
    // is this just because workflow controller is trying to create the CRD?
    roleBinding: {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "argo-cluster-role",
        namespace: namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "cluster-admin",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "argo",
          namespace: namespace,
        },
      ],
    },  // role binding

    // The steps in the workflow use the default service account.
    // The default service account needs sufficient permission in order
    // to create namespaces and other objects used in the test.
    defaultRoleBinding: {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "default-role",
        namespace: namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "cluster-admin",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "default",
          namespace: namespace,
        },
      ],
    },  // default role binding
  },  // parts
}

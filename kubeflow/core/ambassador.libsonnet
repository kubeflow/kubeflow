{
  parts(namespace):: {

    all:: [
      $.parts(namespace).service,
      $.parts(namespace).adminService,
      $.parts(namespace).clusterRole,
      $.parts(namespace).serviceAccount,
      $.parts(namespace).clusterRoleBinding,
      $.parts(namespace).deploy,
      $.parts(namespace).k8sDashboard,
    ],

    local ambassadorImage = "quay.io/datawire/ambassador:0.26.0",
    service:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          service: "ambassador",
        },
        name: "ambassador",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "ambassador",
            port: 80,
            targetPort: 80,
          },
        ],
        selector: {
          service: "ambassador",
        },
        type: "ClusterIP",
      },
    },  // service

    adminService:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          service: "ambassador-admin",
        },
        name: "ambassador-admin",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "ambassador-admin",
            port: 8877,
            targetPort: 8877,
          },
        ],
        selector: {
          service: "ambassador",
        },
        type: "ClusterIP",
      },
    },  // adminService

    clusterRole:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        name: "ambassador",
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "services",
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "configmaps",
          ],
          verbs: [
            "create",
            "update",
            "patch",
            "get",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "secrets",
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
      ],
    },  // cluserRole

    serviceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "ambassador",
        namespace: namespace,
      },
    },  // serviceAccount

    clusterRoleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "ambassador",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "ambassador",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "ambassador",
          namespace: namespace,
        },
      ],
    },  // clusterRoleBinding

    deploy:: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "ambassador",
        namespace: namespace,
      },
      spec: {
        replicas: 3,
        template: {
          metadata: {
            labels: {
              service: "ambassador",
            },
          },
          spec: {
            containers: [
              {
                env: [
                  {
                    name: "AMBASSADOR_NAMESPACE",
                    valueFrom: {
                      fieldRef: {
                        fieldPath: "metadata.namespace",
                      },
                    },
                  },
                ],
                image: ambassadorImage,
                imagePullPolicy: "Always",
                livenessProbe: {
                  httpGet: {
                    path: "/ambassador/v0/check_alive",
                    port: 8877,
                  },
                  initialDelaySeconds: 30,
                  periodSeconds: 30,
                },
                name: "ambassador",
                readinessProbe: {
                  httpGet: {
                    path: "/ambassador/v0/check_ready",
                    port: 8877,
                  },
                  initialDelaySeconds: 30,
                  periodSeconds: 30,
                },
                resources: {
                  limits: {
                    cpu: 1,
                    memory: "400Mi",
                  },
                  requests: {
                    cpu: "200m",
                    memory: "100Mi",
                  },
                },
              },
              {
                image: "quay.io/datawire/statsd:0.22.0",
                name: "statsd",
              },
            ],
            restartPolicy: "Always",
            serviceAccountName: "ambassador",
          },
        },
      },
    },  // deploy

    // This service adds a rule to our reverse proxy for accessing the K8s dashboard.
    k8sDashboard:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "k8s-dashboard",
        namespace: namespace,

        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: k8s-dashboard-ui-mapping",
              "prefix: /k8s/ui/",
              "rewrite: /",
              "tls: true",
              // We redirect to the K8s service created for the dashboard
              // in namespace kube-system. We don't use the k8s-dashboard service
              // because that isn't in the kube-system namespace and I don't think
              // it can select pods in a different namespace.
              "service: kubernetes-dashboard.kube-system",
            ]),
        },  //annotations
      },
      spec: {
        ports: [
          {
            port: 443,
            targetPort: 8443,
          },
        ],
        selector: {
          "k8s-app": "kubernetes-dashboard",
        },
        type: "ClusterIP",
      },
    },  // k8sDashboard

  },  // parts
}

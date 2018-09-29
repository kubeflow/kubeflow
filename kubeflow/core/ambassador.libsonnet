{
  local k = import "k.libsonnet",
  local util = import "kubeflow/core/util.libsonnet",
  new(_env, _params):: {
    local params = _env + _params {
      namespace: if std.objectHas(_params, "namespace") && _params.namespace != "null" then
        _params.namespace else _env.namespace,
    },

    local ambassadorService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          service: "ambassador",
        },
        name: "ambassador",
        namespace: params.namespace,
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
        type: params.ambassadorServiceType,
      },
    },  // service
    ambassadorService:: ambassadorService,

    local metricsService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          service: "ambassador",
        },
        name: "statsd-sink",
        namespace: params.namespace,
        annotations: {
          "prometheus.io/scrape": "true",
          "prometheus.io/port": "9102",
        },
      },
      spec: {
        ports: [
          {
            name: "statsd-sink",
            port: 9102,
            targetPort: 9102,
            protocol: "TCP",
          },
        ],
        selector: {
          service: "ambassador",
        },
        type: "ClusterIP",
      },
    },  // metricsService
    metricsService:: metricsService,

    local adminService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          service: "ambassador-admin",
        },
        name: "ambassador-admin",
        namespace: params.namespace,
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
    adminService:: adminService,

    local ambassadorRole = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        name: "ambassador",
        namespace: params.namespace,
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
    },  // role
    ambassadorRole:: ambassadorRole,

    local ambassadorServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "ambassador",
        namespace: params.namespace,
      },
    },  // serviceAccount
    ambassadorServiceAccount:: ambassadorServiceAccount,

    local ambassadorRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        name: "ambassador",
        namespace: params.namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "Role",
        name: "ambassador",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "ambassador",
          namespace: params.namespace,
        },
      ],
    },  // roleBinding
    ambassadorRoleBinding:: ambassadorRoleBinding,

    local ambassadorDeployment = {
      local replicas = if params.cloud == "minikube" then 1 else 3,
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "ambassador",
        namespace: params.namespace,
      },
      spec: {
        replicas: replicas,
        template: {
          metadata: {
            labels: {
              service: "ambassador",
            },
            namespace: params.namespace,
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
                  {
                    name: "AMBASSADOR_SINGLE_NAMESPACE",
                    value: "true",
                  },
                ],
                image: params.ambassadorImage,
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
                image: params.statsdImage,
                name: "statsd",
              },
              {
                image: params.statsdSinkImage,
                name: "statsd-sink",
              },
            ],
            restartPolicy: "Always",
            serviceAccountName: "ambassador",
          },
        },
      },
    },  // deploy
    ambassadorDeployment:: ambassadorDeployment,

    // This service adds a rule to our reverse proxy for accessing the K8s dashboard.
    local k8sDashboard = {
      local isDashboardTls = if params.cloud == "acsengine" || params.cloud == "aks" then
        "false"
      else
        "true",
      // Due to https://github.com/ksonnet/ksonnet/issues/670, escaped characters in
      // jsonnet files are not interpreted correctly by ksonnet, which causes runtime
      // parsing failures. This is fixed in ksonnet 0.12.0, so we can merge this back
      // to the jsonnet file when we take a dependency on ksonnet 0.12.0 or later.
      local annotations = function(isDashboardTls) {
        "getambassador.io/config":
          std.join("\n", [
            "---",
            "apiVersion: ambassador/v0",
            "kind:  Mapping",
            "name: k8s-dashboard-ui-mapping",
            "prefix: /k8s/ui/",
            "rewrite: /",
            "tls: " + isDashboardTls,
            // We redirect to the K8s service created for the dashboard
            // in namespace kube-system. We don't use the k8s-dashboard service
            // because that isn't in the kube-system namespace and I don't think
            // it can select pods in a different namespace.
            "service: kubernetes-dashboard.kube-system",
          ]),
      },
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "k8s-dashboard",
        namespace: params.namespace,
        annotations: annotations(isDashboardTls),
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
    k8sDashboard:: k8sDashboard,

    all:: [
      self.ambassadorService,
      self.metricsService,
      self.adminService,
      self.ambassadorRole,
      self.ambassadorServiceAccount,
      self.ambassadorRoleBinding,
      self.ambassadorDeployment,
      self.k8sDashboard,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

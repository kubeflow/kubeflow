// @apiVersion 0.1
// @name io.ksonnet.pkg.ambassador
// @description Ambassador Component
// @shortDescription Ambassador
// @param name string Name
// @optionalParam cloud string null Cloud
// @optionalParam ambassadorServiceType string ClusterIP The service type for the API Gateway.
// @optionalParam ambassadorImage string quay.io/datawire/ambassador:0.30.1 The image for the API Gateway.
// @optionalParam statsdImage string quay.io/datawire/statsd:0.30.1 The image for the Stats and Monitoring.
local isDashboardTls =
  if params.cloud == "acsengine" || params.cloud == "aks" then
    "false"
  else
    "true";

local replicas = if params.cloud == "minikube" then 1 else 3;

[
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      labels: {
        service: "ambassador",
      },
      name: "ambassador",
      namespace: env.namespace,
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

  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      labels: {
        service: "ambassador",
      },
      name: "ambassador-exporter",
      namespace: env.namespace,
      annotations: {
        "prometheus.io/scrape": "true",
        "prometheus.io/port": "9102",
      },
    },
    spec: {
      ports: [
        {
          name: "ambassador-exporter",
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

  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      labels: {
        service: "ambassador-admin",
      },
      name: "ambassador-admin",
      namespace: env.namespace,
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

  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "Role",
    metadata: {
      name: "ambassador",
      namespace: env.namespace,
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

  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "ambassador",
      namespace: env.namespace,
    },
  },  // serviceAccount

  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "RoleBinding",
    metadata: {
      name: "ambassador",
      namespace: env.namespace,
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
        namespace: env.namespace,
      },
    ],
  },  // roleBinding

  {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "ambassador",
      namespace: env.namespace,
    },
    spec: {
      replicas: replicas,
      template: {
        metadata: {
          labels: {
            service: "ambassador",
          },
          namespace: env.namespace,
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
              image: "prom/statsd-exporter",
              name: "statsd-exporter",
            },
          ],
          restartPolicy: "Always",
          serviceAccountName: "ambassador",
        },
      },
    },
  },  // deploy

  // This service adds a rule to our reverse proxy for accessing the K8s dashboard.
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "k8s-dashboard",
      namespace: env.namespace,

      annotations: {
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

]

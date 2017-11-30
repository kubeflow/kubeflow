local testSuite = import "kubeflow/common/testsuite.libsonnet";
local metricCollector = import "kubeflow/gcp/metric-collector.libsonnet";

local params = {
  name: "metric-collector",
  targetUrl: "https://foo.com",
  metricImage: "gcr.io/kubeflow-images-public/metric-collector:latest",
  oauthSecretName: "bar",
};
local env = {
  namespace: "kf-001",
};

local instance = metricCollector.new(env, params);

local testCases = [
  {
    actual: instance.parts.metricServiceAccount,
    expected: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "metric-collector",
        },
        name: "metric-collector",
        namespace: "kf-001",
      },
    },
  },
  {
    actual: instance.parts.metricRole,
    expected: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "metric-collector",
        },
        name: "metric-collector",
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "services",
            "events",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },
  },
  {
    actual: instance.parts.metricRoleBinding,
    expected: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "metric-collector",
        },
        name: "metric-collector",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "metric-collector",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "metric-collector",
          namespace: "kf-001",
        },
      ],
    },
  },
  {
    actual: instance.parts.service,
    expected: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        annotations: {
          "prometheus.io/path": "/",
          "prometheus.io/port": "8000",
          "prometheus.io/scrape": "true",
        },
        labels: {
          service: "metric-collector",
        },
        name: "metric-collector",
        namespace: "kf-001",
      },
      spec: {
        ports: [
          {
            name: "metric-collector",
            port: 8000,
            protocol: "TCP",
            targetPort: 8000,
          },
        ],
        selector: {
          app: "metric-collector",
        },
        type: "ClusterIP",
      },
    },
  },
  {
    actual: instance.parts.deploy,
    expected: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "metric-collector",
        },
        name: "metric-collector",
        namespace: "kf-001",
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: "metric-collector",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "metric-collector",
            },
            namespace: "kf-001",
          },
          spec: {
            containers: [
              {
                args: [
                  "--url=https://foo.com",
                  "--client_id=$(CLIENT_ID)",
                ],
                command: [
                  "python3",
                  "/opt/kubeflow-readiness.py",
                ],
                env: [
                  {
                    name: "GOOGLE_APPLICATION_CREDENTIALS",
                    value: "/var/run/secrets/sa/admin-gcp-sa.json",
                  },
                  {
                    name: "CLIENT_ID",
                    valueFrom: {
                      secretKeyRef: {
                        key: "client_id",
                        name: "bar",
                      },
                    },
                  },
                ],
                image: "gcr.io/kubeflow-images-public/metric-collector:latest",
                name: "exporter",
                volumeMounts: [
                  {
                    mountPath: "/var/run/secrets/sa",
                    name: "sa-key",
                    readOnly: true,
                  },
                ],
              },
            ],
            restartPolicy: "Always",
            serviceAccountName: "metric-collector",
            volumes: [
              {
                name: "sa-key",
                secret: {
                  secretName: "admin-gcp-sa",
                },
              },
            ],
          },
        },
      },
    },
  },
];

testSuite.run(testCases)

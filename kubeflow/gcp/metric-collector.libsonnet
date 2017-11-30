{
  local k = import "k.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    local metricServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "metric-collector",
        },
        name: "metric-collector",
        namespace: params.namespace,
      },
    },
    metricServiceAccount:: metricServiceAccount,

    local metricRole = {
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
    metricRole:: metricRole,

    local metricRoleBinding = {
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
          namespace: params.namespace,
        },
      ],
    },
    metricRoleBinding:: metricRoleBinding,

    local service = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          service: "metric-collector",
        },
        name: "metric-collector",
        namespace: params.namespace,
        annotations: {
          "prometheus.io/scrape": "true",
          "prometheus.io/path": "/",
          "prometheus.io/port": "8000",
        },
      },
      spec: {
        ports: [
          {
            name: "metric-collector",
            port: 8000,
            targetPort: 8000,
            protocol: "TCP",
          },
        ],
        selector: {
          app: "metric-collector",
        },
        type: "ClusterIP",
      },
    },
    service:: service,

    local deploy = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "metric-collector",
        },
        name: "metric-collector",
        namespace: params.namespace,
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
            namespace: params.namespace,
          },
          spec: {
            containers: [
              {
                env: [
                  {
                    name: "GOOGLE_APPLICATION_CREDENTIALS",
                    value: "/var/run/secrets/sa/admin-gcp-sa.json",
                  },
                  {
                    name: "CLIENT_ID",
                    valueFrom: {
                      secretKeyRef: {
                        name: params.oauthSecretName,
                        key: "client_id",
                      },
                    },
                  },
                ],
                command: [
                  "python3",
                  "/opt/kubeflow-readiness.py",
                ],
                args: [
                  "--url=" + params.targetUrl,
                  "--client_id=$(CLIENT_ID)",
                ],
                volumeMounts: [
                  {
                    name: "sa-key",
                    readOnly: true,
                    mountPath: "/var/run/secrets/sa",
                  },
                ],
                image: params.metricImage,
                name: "exporter",
              },
            ],
            serviceAccountName: "metric-collector",
            restartPolicy: "Always",
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
    },  // deploy
    deploy:: deploy,

    parts:: self,
    all:: [
      self.metricServiceAccount,
      self.metricRole,
      self.metricRoleBinding,
      self.service,
      self.deploy,
    ],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}

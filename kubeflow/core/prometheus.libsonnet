{
  local k = import "k.libsonnet",
  local util = import "kubeflow/core/util.libsonnet",
  new(_env, _params):: {
    local params = _env + _params {
      namespace: if std.objectHas(_params, "namespace") && _params.namespace != "null" then
        _params.namespace else _env.namespace,
    },

    local namespace = {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: {
        name: "stackdriver",
      },
    },
    namespace:: namespace,

    local clusterRole = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        name: "prometheus",
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "nodes",
            "nodes/proxy",
            "services",
            "endpoints",
            "pods",
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [
            "extensions",
          ],
          resources: [
            "ingresses",
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
        {
          nonResourceURLs: [
            "/metrics",
          ],
          verbs: [
            "get",
          ],
        },
      ],
    },
    clusterRole:: clusterRole,

    local serviceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "prometheus",
        namespace: "stackdriver",
      },
    },
    serviceAccount:: serviceAccount,

    local clusterRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "prometheus-stackdriver",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "prometheus",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "prometheus",
          namespace: "stackdriver",
        },
      ],
    },
    clusterRoleBinding:: clusterRoleBinding,

    local service = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          name: "prometheus",
        },
        name: "prometheus",
        namespace: "stackdriver",
      },
      spec: {
        ports: [
          {
            name: "prometheus",
            port: 9090,
            protocol: "TCP",
          },
        ],
        selector: {
          app: "prometheus",
        },
        type: "ClusterIP",
      },
    },
    service:: service,

    local configMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "prometheus",
        namespace: "stackdriver",
      },
      data: {
        "prometheus.yml": (importstr "prometheus.yml") % {
          "project-id-placeholder": params.projectId,
          "cluster-name-placeholder": params.clusterName,
          "zone-placeholder": params.zone,
        },
      },
    },
    configMap:: configMap,

    local deployment = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "prometheus",
        namespace: "stackdriver",
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: "prometheus",
          },
        },
        template: {
          metadata: {
            annotations: {
              "prometheus.io/scrape": "true",
            },
            labels: {
              app: "prometheus",
            },
            name: "prometheus",
            namespace: "stackdriver",
          },
          spec: {
            containers: [
              {
                image: "gcr.io/stackdriver-prometheus/stackdriver-prometheus:release-0.4.2",
                imagePullPolicy: "Always",
                name: "prometheus",
                ports: [
                  {
                    containerPort: 9090,
                    name: "web",
                  },
                ],
                resources: {
                  limits: {
                    cpu: "400m",
                    memory: "1000Mi",
                  },
                  requests: {
                    cpu: "20m",
                    memory: "50Mi",
                  },
                },
                volumeMounts: [
                  {
                    mountPath: "/etc/prometheus",
                    name: "config-volume",
                  },
                ],
              },
            ],
            serviceAccountName: "prometheus",
            volumes: [
              {
                configMap: {
                  name: "prometheus",
                },
                name: "config-volume",
              },
            ],
          },
        },
      },
    },
    deployment:: deployment,

    all:: [
      self.namespace,
      self.clusterRole,
      self.serviceAccount,
      self.clusterRoleBinding,
      self.service,
      self.configMap,
      self.deployment,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

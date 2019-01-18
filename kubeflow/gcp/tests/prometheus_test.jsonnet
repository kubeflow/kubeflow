local testSuite = import "kubeflow/common/testsuite.libsonnet";
local prometheus = import "kubeflow/gcp/prometheus.libsonnet";

// @param name string Name for the component
// @param projectId string GCP project id.
// @param clusterName string GKE cluster name.
// @param zone string GKE cluster zone.
local params = {
  name: "prometheus",
  projectId: "foo-173123",
  clusterName: "prometheus",
  zone: "west1a-a",
};
local env = {
  namespace: "kf-001",
};

local instance = prometheus.new(env, params);

local testCases = [
  {
    actual: instance.parts.namespace,
    expected: {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: {
        name: "stackdriver",
      },
    },
  },
  {
    actual: instance.parts.clusterRole,
    expected: {
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
  },
  {
    actual: instance.parts.serviceAccount,
    expected: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "prometheus",
        namespace: "stackdriver",
      },
    },
  },
  {
    actual: instance.parts.clusterRoleBinding,
    expected: {
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
  },
  {
    actual: instance.parts.service,
    expected: {
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
  },
  {
    actual: instance.parts.configMap,
    expected: {
      apiVersion: "v1",
      data: {
        "prometheus.yml": "# Source: https://github.com/stackdriver/prometheus/blob/master/documentation/examples/prometheus.yml\nglobal:\n  external_labels:\n    _stackdriver_project_id: foo-173123\n    _kubernetes_cluster_name: prometheus\n    _kubernetes_location: west1a-a\n\n# Scrape config for nodes (kubelet).\n#\n# Rather than connecting directly to the node, the scrape is proxied though the\n# Kubernetes apiserver.  This means it will work if Prometheus is running out of\n# cluster, or can't connect to nodes for some other reason (e.g. because of\n# firewalling).\nscrape_configs:\n- job_name: 'kubernetes-nodes'\n\n  # Default to scraping over https. If required, just disable this or change to\n  # `http`.\n  scheme: https\n\n  # This TLS & bearer token file config is used to connect to the actual scrape\n  # endpoints for cluster components. This is separate to discovery auth\n  # configuration because discovery & scraping are two separate concerns in\n  # Prometheus. The discovery auth config is automatic if Prometheus runs inside\n  # the cluster. Otherwise, more config options have to be provided within the\n  # <kubernetes_sd_config>.\n  tls_config:\n    ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt\n  bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token\n\n  kubernetes_sd_configs:\n  - role: node\n\n  relabel_configs:\n  - target_label: __address__\n    replacement: kubernetes.default.svc:443\n  - source_labels: [__meta_kubernetes_node_name]\n    regex: (.+)\n    target_label: __metrics_path__\n    replacement: /api/v1/nodes/${1}/proxy/metrics\n\n# Example scrape config for pods\n#\n# The relabeling allows the actual pod scrape endpoint to be configured via the\n# following annotations:\n#\n# * `prometheus.io/scrape`: Only scrape pods that have a value of `true`\n# * `prometheus.io/path`: If the metrics path is not `/metrics` override this.\n# * `prometheus.io/port`: Scrape the pod on the indicated port instead of the\n# pod's declared ports (default is a port-free target if none are declared).\n- job_name: 'kubernetes-pods-containers'\n\n  kubernetes_sd_configs:\n  - role: pod\n\n  relabel_configs:\n  - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]\n    action: keep\n    regex: true\n  - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]\n    action: replace\n    target_label: __metrics_path__\n    regex: (.+)\n  - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]\n    action: replace\n    regex: ([^:]+)(?::\\d+)?;(\\d+)\n    replacement: $1:$2\n    target_label: __address__\n\n# Scrape config for service endpoints.\n#\n# The relabeling allows the actual service scrape endpoint to be configured\n# via the following annotations:\n#\n# * `prometheus.io/scrape`: Only scrape services that have a value of `true`\n# * `prometheus.io/scheme`: If the metrics endpoint is secured then you will need\n# to set this to `https` & most likely set the `tls_config` of the scrape config.\n# * `prometheus.io/path`: If the metrics path is not `/metrics` override this.\n# * `prometheus.io/port`: If the metrics are exposed on a different port to the\n# service then set this appropriately.\n- job_name: 'kubernetes-service-endpoints'\n\n  kubernetes_sd_configs:\n  - role: endpoints\n\n  relabel_configs:\n  - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]\n    action: keep\n    regex: true\n  - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]\n    action: replace\n    target_label: __scheme__\n    regex: (https?)\n  - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]\n    action: replace\n    target_label: __metrics_path__\n    regex: (.+)\n  - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]\n    action: replace\n    target_label: __address__\n    regex: ([^:]+)(?::\\d+)?;(\\d+)\n    replacement: $1:$2\n\n\n# Scrape config for k8s services\n- job_name: 'kubernetes-services'\n\n  kubernetes_sd_configs:\n  - role: service\n\n  relabel_configs:\n  - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]\n    action: keep\n    regex: true\n  - action: labelmap\n    regex: __meta_kubernetes_service_label_(.+)\n  - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]\n    action: replace\n    target_label: __metrics_path__\n  - source_labels: [__address__,__meta_kubernetes_service_annotation_prometheus_io_port]\n    action: replace\n    target_label: __address__\n    regex: (.+)(?::\\d+);(\\d+)\n    replacement: $1:$2\n\nremote_write:\n- url: \"https://monitoring.googleapis.com:443/\"\n  queue_config:\n    # Capacity should be 2*max_samples_per_send.\n    capacity: 2000\n    max_samples_per_send: 1000\n    max_shards: 10000\n  write_relabel_configs:\n  # These labels are generally redundant with the Stackdriver monitored resource labels.\n  - source_labels: [job]\n    target_label: job\n    replacement: \"\"\n  - source_labels: [instance]\n    target_label: instance\n    replacement: \"\"\n",
      },
      kind: "ConfigMap",
      metadata: {
        name: "prometheus",
        namespace: "stackdriver",
      },
    },
  },
  {
    actual: instance.parts.deployment,
    expected: {
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
  },
];

testSuite.run(testCases)

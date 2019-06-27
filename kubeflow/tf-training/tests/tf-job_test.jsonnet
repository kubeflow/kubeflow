local tfjob = import "../tf-job-operator.libsonnet";
local paramsv1 = {
  name:: "tf-job-operator",
  tfJobImage:: "gcr.io/kubeflow-images-public/tf_operator:v0.5.1",
  tfDefaultImage:: "null",
  deploymentScope:: "cluster",
  deploymentNamespace:: "null",
  enableGangScheduling: "false",
  monitoringPort: "8443",
};
local env = {
  namespace: "test-kf-001",
};

local tfjobv1 = tfjob.new(env, paramsv1);

std.assertEqual(
  tfjobv1.tfJobCrd,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "tfjobs.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      scope: "Namespaced",
      names: {
        kind: "TFJob",
        plural: "tfjobs",
        singular: "tfjob",
      },
      subresources: {
        status: {},
      },
      additionalPrinterColumns: [
        {
          JSONPath: ".status.conditions[-1:].type",
          name: "State",
          type: "string",
        },
        {
          JSONPath: ".metadata.creationTimestamp",
          name: "Age",
          type: "date",
        },
      ],
      validation: {
        openAPIV3Schema: {
          properties: {
            spec: {
              properties: {
                tfReplicaSpecs: {
                  properties: {
                    Chief: {
                      properties: {
                        replicas: {
                          maximum: 1,
                          minimum: 1,
                          type: "integer",
                        },
                      },
                    },
                    PS: {
                      properties: {
                        replicas: {
                          minimum: 1,
                          type: "integer",
                        },
                      },
                    },
                    Worker: {
                      properties: {
                        replicas: {
                          minimum: 1,
                          type: "integer",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      versions: [
        {
          name: "v1",
          served: true,
          storage: true,
        },
        {
          name: "v1beta2",
          served: true,
          storage: false,
        },
      ],
    },
  }
) &&

std.assertEqual(
  tfjobv1.tfJobDeployment,
  {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "tf-job-operator",
      namespace: "test-kf-001",
    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: {
            name: "tf-job-operator",
          },
        },
        spec: {
          containers: [
            {
              command: [
                "/opt/kubeflow/tf-operator.v1",
                "--alsologtostderr",
                "-v=1",
                "--monitoring-port=8443",
              ],
              env: [
                {
                  name: "MY_POD_NAMESPACE",
                  valueFrom: {
                    fieldRef: {
                      fieldPath: "metadata.namespace",
                    },
                  },
                },
                {
                  name: "MY_POD_NAME",
                  valueFrom: {
                    fieldRef: {
                      fieldPath: "metadata.name",
                    },
                  },
                },
              ],
              image: "gcr.io/kubeflow-images-public/tf_operator:v0.5.1",
              name: "tf-job-operator",
            },
          ],
          serviceAccountName: "tf-job-operator",
        },
      },
    },
  }
) &&

std.assertEqual(
  tfjobv1.tfJobService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      annotations: {
        "prometheus.io/scrape": "true",
        "prometheus.io/path": "/metrics",
        "prometheus.io/port": "8443",
      },
      labels: {
        app: "tf-job-operator",
      },
      name: "tf-job-operator",
      namespace: "test-kf-001",
    },
    spec: {
      ports: [
        {
          name: "monitoring-port",
          port: 8443,
          targetPort: 8443,
        },
      ],
      selector: {
        name: "tf-job-operator",
      },
      type: "ClusterIP",
    },
  }
) &&

std.assertEqual(
  tfjobv1.tfUiDeployment,
  {
    apiVersion: "extensions/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "tf-job-dashboard",
      namespace: "test-kf-001",
    },
    spec: {
      template: {
        metadata: {
          labels: {
            name: "tf-job-dashboard",
          },
        },
        spec: {
          containers: [
            {
              command: [
                "/opt/tensorflow_k8s/dashboard/backend",
              ],
              env: [
                {
                  name: "KUBEFLOW_NAMESPACE",
                  valueFrom: {
                    fieldRef: {
                      fieldPath: "metadata.namespace",
                    },
                  },
                },
              ],
              image: "gcr.io/kubeflow-images-public/tf_operator:v0.5.1",
              name: "tf-job-dashboard",
              ports: [
                {
                  containerPort: 8080,
                },
              ],
            },
          ],
          serviceAccountName: "tf-job-dashboard",
        },
      },
    },
  }
) &&

std.assertEqual(
  tfjobv1.tfUiRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRole",
    metadata: {
      labels: {
        app: "tf-job-dashboard",
      },
      name: "tf-job-dashboard",
    },
    rules: [
      {
        apiGroups: [
          "tensorflow.org",
          "kubeflow.org",
        ],
        resources: [
          "tfjobs",
          "tfjobs/status",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "",
        ],
        resources: [
          "pods",
          "services",
          "endpoints",
          "events",
          "pods/log",
          "namespaces",
        ],
        verbs: [
          "*",
        ],
      },
      {
        apiGroups: [
          "apps",
          "extensions",
        ],
        resources: [
          "deployments",
        ],
        verbs: [
          "*",
        ],
      },
    ],
  }
)

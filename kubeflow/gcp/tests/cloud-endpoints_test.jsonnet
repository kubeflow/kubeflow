local cloudEndpoints = import "kubeflow/gcp/cloud-endpoints.libsonnet";

local params = {
  name: "cloud-endpoints",
  secretName: "admin-gcp-sa",
  secretKey: "admin-gcp-sa.json",
};
local env = {
  namespace: "kf-001",
};

local instance = cloudEndpoints.new(env, params);

std.assertEqual(
  instance.parts.endpointsCRD,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "cloudendpoints.ctl.isla.solutions",
    },
    spec: {
      group: "ctl.isla.solutions",
      names: {
        kind: "CloudEndpoint",
        plural: "cloudendpoints",
        shortNames: [
          "cloudep",
          "ce",
        ],
        singular: "cloudendpoint",
      },
      scope: "Namespaced",
      version: "v1",
    },
  }
) &&

std.assertEqual(
  instance.parts.endpointsClusterRole,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRole",
    metadata: {
      name: "cloud-endpoints-controller",
    },
    rules: [
      {
        apiGroups: [
          "",
        ],
        resources: [
          "services",
          "configmaps"
        ],
        verbs: [
          "get",
          "list",
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
        ],
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.endpointsClusterRoleBinding,
  {
    apiVersion: "rbac.authorization.k8s.io/v1beta1",
    kind: "ClusterRoleBinding",
    metadata: {
      name: "cloud-endpoints-controller",
    },
    roleRef: {
      apiGroup: "rbac.authorization.k8s.io",
      kind: "ClusterRole",
      name: "cloud-endpoints-controller",
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "cloud-endpoints-controller",
        namespace: "kf-001",
      },
    ],
  }
) &&

std.assertEqual(
  instance.parts.endpointsService,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "cloud-endpoints-controller",
      namespace: "kf-001",
    },
    spec: {
      ports: [
        {
          name: "http",
          port: 80,
        },
      ],
      selector: {
        app: "cloud-endpoints-controller",
      },
      type: "ClusterIP",
    },
  }
) &&

std.assertEqual(
  instance.parts.endpointsServiceAccount,
  {
    apiVersion: "v1",
    kind: "ServiceAccount",
    metadata: {
      name: "cloud-endpoints-controller",
      namespace: "kf-001",
    },
  }
) &&

std.assertEqual(
  instance.parts.endpointsDeploy,
  {
    apiVersion: "apps/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "cloud-endpoints-controller",
      namespace: "kf-001",
    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: {
            app: "cloud-endpoints-controller",
          },
        },
        spec: {
          containers: [
            {
              env: [
                {
                  name: "GOOGLE_APPLICATION_CREDENTIALS",
                  value: "/var/run/secrets/sa/admin-gcp-sa.json",
                },
              ],
              image: "gcr.io/cloud-solutions-group/cloud-endpoints-controller:0.2.1",
              imagePullPolicy: "Always",
              name: "cloud-endpoints-controller",
              readinessProbe: {
                failureThreshold: 2,
                httpGet: {
                  path: "/healthz",
                  port: 80,
                  scheme: "HTTP",
                },
                periodSeconds: 5,
                successThreshold: 1,
                timeoutSeconds: 5,
              },
              volumeMounts: [
                {
                  mountPath: "/var/run/secrets/sa",
                  name: "sa-key",
                  readOnly: true,
                },
              ],
            },
          ],
          serviceAccountName: "cloud-endpoints-controller",
          terminationGracePeriodSeconds: 5,
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
  }
) &&

std.assertEqual(
  instance.parts.endpointsCompositeController,
  {
    apiVersion: "metacontroller.k8s.io/v1alpha1",
    kind: "CompositeController",
    metadata: {
      name: "cloud-endpoints-controller",
    },
    spec: {
      childResources: [],
      clientConfig: {
        service: {
          caBundle: "...",
          name: "cloud-endpoints-controller",
          namespace: "kf-001",
        },
      },
      generateSelector: true,
      hooks: {
        sync: {
          webhook: {
            url: "http://cloud-endpoints-controller.kf-001/sync",
          },
        },
      },
      parentResource: {
        apiVersion: "ctl.isla.solutions/v1",
        resource: "cloudendpoints",
      },
    },
  }
)

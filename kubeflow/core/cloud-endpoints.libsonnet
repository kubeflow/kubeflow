{
  parts(namespace):: {
    local k = import "k.libsonnet",
    local cloudEndpointsImage = "gcr.io/cloud-solutions-group/cloud-endpoints-controller:0.1.1",
    local metacontrollerImage = "gcr.io/enisoc-kubernetes/metacontroller@sha256:18561c63e1c5380ac5bbaabefa933e484bdb499f10b61071506f9a0070bc65f6",

    cloudEndpointsParts(secretName, secretKey):: k.core.v1.list.new([
      $.parts(namespace).metaServiceAccount,
      $.parts(namespace).metaClusterRole,
      $.parts(namespace).metaClusterRoleBinding,
      $.parts(namespace).metaInitializerCRD,
      $.parts(namespace).metaLambdaCRD,
      $.parts(namespace).metaDeployment,
      $.parts(namespace).endpointsCRD,
      $.parts(namespace).endpointsService,
      $.parts(namespace).endpointsServiceAccount,
      $.parts(namespace).endpointsClusterRole,
      $.parts(namespace).endpointsClusterRoleBinding,
      $.parts(namespace).endpointsDeploy(secretName, secretKey),
      $.parts(namespace).endpointsLambdaController,
    ]),

    metaServiceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "kube-metacontroller",
        namespace: namespace,
      },
    },  // metaServiceAccount

    metaClusterRole:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        name: "kube-metacontroller",
      },
      rules: [
        {
          apiGroups: ["*"],
          resources: ["*"],
          verbs: ["*"],
        },
      ],
    },  // metaClusterRole

    metaClusterRoleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "kube-metacontroller",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "kube-metacontroller",
          namespace: namespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "kube-metacontroller",
        apiGroup: "rbac.authorization.k8s.io",
      },
    },  // metaClusterRoleBinding

    metaInitializerCRD:: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "initializercontrollers.metacontroller.k8s.io",
      },
      spec: {
        group: "metacontroller.k8s.io",
        version: "v1alpha1",
        scope: "Cluster",
        names: {
          plural: "initializercontrollers",
          singular: "initializercontroller",
          kind: "InitializerController",
          shortNames: [
            "ic",
            "ictl",
          ],
        },
      },
    },  // metaInitializerCRD

    metaLambdaCRD:: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "lambdacontrollers.metacontroller.k8s.io",
      },
      spec: {
        group: "metacontroller.k8s.io",
        version: "v1alpha1",
        scope: "Cluster",
        names: {
          plural: "lambdacontrollers",
          singular: "lambdacontroller",
          kind: "LambdaController",
          shortNames: [
            "lc",
            "lctl",
          ],
        },
      },
    },  // metaLambdaCRD

    metaDeployment:: {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "kube-metacontroller",
        namespace: namespace,
        labels: {
          app: "kube-metacontroller",
        },
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "kube-metacontroller",
            },
          },
          spec: {
            serviceAccountName: "kube-metacontroller",
            containers: [
              {
                name: "kube-metacontroller",
                image: metacontrollerImage,
                command: [
                  "/usr/bin/metacontroller",
                ],
                args: [
                  "--logtostderr",
                ],
                imagePullPolicy: "Always",
              },
            ],
          },
        },
      },
    },  // metaDeployment

    endpointsCRD:: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "cloudendpoints.ctl.isla.solutions",
      },
      spec: {
        group: "ctl.isla.solutions",
        version: "v1",
        scope: "Namespaced",
        names: {
          plural: "cloudendpoints",
          singular: "cloudendpoint",
          kind: "CloudEndpoint",
          shortNames: [
            "cloudep",
            "ce",
          ],
        },
      },
    },  // endpointsCRD

    endpointsService:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "cloud-endpoints-controller",
        namespace: namespace,
      },
      spec: {
        type: "ClusterIP",
        ports: [
          {
            name: "http",
            port: 80,
          },
        ],
        selector: {
          app: "cloud-endpoints-controller",
        },
      },
    },  // endpointsService

    endpointsLambdaController:: {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "LambdaController",
      metadata: {
        name: "cloud-endpoints-controller",
      },
      spec: {
        parentResource: {
          apiVersion: "ctl.isla.solutions/v1",
          resource: "cloudendpoints",
        },
        childResources: [],
        clientConfig: {
          service: {
            name: "cloud-endpoints-controller",
            namespace: namespace,
            caBundle: "...",
          },
        },
        hooks: {
          sync: {
            path: "/sync",
          },
        },
        generateSelector: true,
      },
    },  // endpointsLambdaController

    endpointsServiceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "cloud-endpoints-controller",
        namespace: namespace,
      },
    },  // endpointsServiceAccount

    endpointsClusterRole:: {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "cloud-endpoints-controller",
        namespace: namespace,
      },
      rules: [
        {
          apiGroups: [""],
          resources: ["services"],
          verbs: ["get", "list"],
        },
        {
          apiGroups: ["extensions"],
          resources: ["ingresses"],
          verbs: ["get", "list"],
        },
      ],
    },  // endpointsClusterRole

    endpointsClusterRoleBinding:: {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "cloud-endpoints-controller",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "cloud-endpoints-controller",
          namespace: namespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "cloud-endpoints-controller",
        apiGroup: "rbac.authorization.k8s.io",
      },
    },  // endpointsClusterRoleBinding

    endpointsDeploy(secretName, secretKey):: {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "cloud-endpoints-controller",
        namespace: namespace,
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
            serviceAccountName: "cloud-endpoints-controller",
            terminationGracePeriodSeconds: 5,
            containers: [
              {
                name: "cloud-endpoints-controller",
                image: cloudEndpointsImage,
                imagePullPolicy: "Always",
                env: [
                  {
                    name: "GOOGLE_APPLICATION_CREDENTIALS",
                    value: "/var/run/secrets/sa/" + secretKey,
                  },
                ],
                volumeMounts: [
                  {
                    name: "sa-key",
                    readOnly: true,
                    mountPath: "/var/run/secrets/sa",
                  },
                ],
                readinessProbe: {
                  httpGet: {
                    path: "/healthz",
                    port: 80,
                    scheme: "HTTP",
                  },
                  periodSeconds: 5,
                  timeoutSeconds: 5,
                  successThreshold: 1,
                  failureThreshold: 2,
                },
              },
            ],
            volumes: [
              {
                name: "sa-key",
                secret: {
                  secretName: secretName,
                },
              },
            ],
          },
        },
      },
    },  // endpointsDeploy
  },  // parts
}

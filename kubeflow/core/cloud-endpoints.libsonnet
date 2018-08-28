{
  local util = import "kubeflow/core/util.libsonnet",
  new(_params):: self + util + {
    local params = _params + {
      cloudEndpointsImage: "gcr.io/cloud-solutions-group/cloud-endpoints-controller:0.1.1",
      metacontrollerImage: "gcr.io/enisoc-kubernetes/metacontroller@sha256:18561c63e1c5380ac5bbaabefa933e484bdb499f10b61071506f9a0070bc65f6",
    },

    MetaServiceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "kube-metacontroller",
        namespace: params.namespace,
      },
    },  // metaServiceAccount
  
    MetaClusterRole:: {
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
  
    MetaClusterRoleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "kube-metacontroller",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "kube-metacontroller",
          namespace: params.namespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "kube-metacontroller",
        apiGroup: "rbac.authorization.k8s.io",
      },
    },  // metaClusterRoleBinding
  
    MetaInitializerCRD:: {
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
  
    MetaLambdaCRD:: {
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
  
    MetaDeployment:: {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "kube-metacontroller",
        namespace: params.namespace,
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
                image: params.metacontrollerImage,
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
  
    EndpointsCRD:: {
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
  
    EndpointsService:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "cloud-endpoints-controller",
        namespace: params.namespace,
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
  
    EndpointsLambdaController:: {
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
            namespace: params.namespace,
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
  
    EndpointsServiceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "cloud-endpoints-controller",
        namespace: params.namespace,
      },
    },  // endpointsServiceAccount
  
    EndpointsClusterRole:: {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "cloud-endpoints-controller",
        namespace: params.namespace,
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
  
    EndpointsClusterRoleBinding:: {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "cloud-endpoints-controller",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "cloud-endpoints-controller",
          namespace: params.namespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "cloud-endpoints-controller",
        apiGroup: "rbac.authorization.k8s.io",
      },
    },  // endpointsClusterRoleBinding
  
    EndpointsDeploy:: {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "cloud-endpoints-controller",
        namespace: params.namespace,
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
                image: params.cloudEndpointsImage,
                imagePullPolicy: "Always",
                env: [
                  {
                    name: "GOOGLE_APPLICATION_CREDENTIALS",
                    value: "/var/run/secrets/sa/" + params.secretKey,
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
                  secretName: params.secretName,
                },
              },
            ],
          },
        },
      },
    },  // endpointsDeploy
  },
}

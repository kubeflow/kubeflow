{
  local k = import "k.libsonnet",
  new(_env, _params):: {
    local params = _params + _env {
      cloudEndpointsImage: "gcr.io/cloud-solutions-group/cloud-endpoints-controller:0.2.1",
    },

    local endpointsCRD = {
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
    endpointsCRD:: endpointsCRD,

    local endpointsClusterRole = {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "cloud-endpoints-controller",
      },
      rules: [
        {
          apiGroups: [""],
          resources: ["services", "configmaps"],
          verbs: ["get", "list"],
        },
        {
          apiGroups: ["extensions"],
          resources: ["ingresses"],
          verbs: ["get", "list"],
        },
      ],
    },
    endpointsClusterRole:: endpointsClusterRole,

    local endpointsClusterRoleBinding = {
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
    },
    endpointsClusterRoleBinding:: endpointsClusterRoleBinding,

    local endpointsService = {
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
    endpointsService:: endpointsService,

    local endpointsServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "cloud-endpoints-controller",
        namespace: params.namespace,
      },
    },  // endpointsServiceAccount
    endpointsServiceAccount:: endpointsServiceAccount,

    local endpointsDeploy = {
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
    endpointsDeploy:: endpointsDeploy,

    local endpointsCompositeController = {
      apiVersion: "metacontroller.k8s.io/v1alpha1",
      kind: "CompositeController",
      metadata: {
        name: "cloud-endpoints-controller",
      },
      spec: {
        generateSelector: true,
        resyncPeriodSeconds: 2,
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
            webhook: {
              url: "http://cloud-endpoints-controller." + params.namespace + "/sync",
            },
          },
        },
      },
    },  // endpointsCompositeController
    endpointsCompositeController:: endpointsCompositeController,

    parts:: self,
    local all = [
      self.endpointsCRD,
      self.endpointsClusterRole,
      self.endpointsClusterRoleBinding,
      self.endpointsService,
      self.endpointsServiceAccount,
      self.endpointsDeploy,
      self.endpointsCompositeController,
    ],
    all:: all,

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}

{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env {
      injectIstio: util.toBool(_params.injectIstio),
    },
    local namespace = if params.injectIstio then params.istioNamespace else params.namespace,

    local ambassadorService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          service: "ambassador",
        },
        name: "ambassador",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "ambassador",
            port: 80,
            targetPort: 80,
            [if (params.ambassadorServiceType == 'NodePort') &&
                (params.ambassadorNodePort >= 30000) &&
                (params.ambassadorNodePort <= 32767)
             then 'nodePort']: params.ambassadorNodePort,
          },
        ],
        selector: {
          service: "ambassador",
        },
        type: params.ambassadorServiceType,
      },
    },  // service
    ambassadorService:: ambassadorService,

    local adminService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          service: "ambassador-admin",
        },
        name: "ambassador-admin",
        namespace: namespace,
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
    adminService:: adminService,

    local ambassadorRole = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        name: "ambassador",
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
    ambassadorRole:: ambassadorRole,

    local ambassadorServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "ambassador",
        namespace: namespace,
      },
    },  // serviceAccount
    ambassadorServiceAccount:: ambassadorServiceAccount,

    local ambassadorRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "ambassador",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "ambassador",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "ambassador",
          namespace: namespace,
        },
      ],
    },  // roleBinding
    ambassadorRoleBinding:: ambassadorRoleBinding,

    local ambassadorDeployment = {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "ambassador",
        namespace: namespace,
      },
      spec: {
        replicas: params.replicas,
        template: {
          metadata: {
            labels: {
              service: "ambassador",
            },
            namespace: namespace,
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
                ],
                image: params.ambassadorImage,
                name: "ambassador",
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
                readinessProbe: {
                  httpGet: {
                    path: "/ambassador/v0/check_ready",
                    port: 8877,
                  },
                  initialDelaySeconds: 30,
                  periodSeconds: 30,
                },
                livenessProbe: {
                  httpGet: {
                    path: "/ambassador/v0/check_alive",
                    port: 8877,
                  },
                  initialDelaySeconds: 30,
                  periodSeconds: 30,
                },
              },
            ],
            restartPolicy: "Always",
            serviceAccountName: "ambassador",
          },
        },
      },
    },  // deploy
    ambassadorDeployment:: ambassadorDeployment,

    parts:: self,
    all:: [
      self.ambassadorService,
      self.adminService,
      self.ambassadorRole,
      self.ambassadorServiceAccount,
      self.ambassadorRoleBinding,
      self.ambassadorDeployment,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

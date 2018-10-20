{
  local k = import "k.libsonnet",
  local util = import "kubeflow/core/util.libsonnet",
  new(_env, _params):: {
    local params = _env + _params,

    local ambassadorService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          service: "ambassador",
        },
        name: "ambassador",
        namespace: params.namespace,
      },
      spec: {
        ports: [
          {
            name: "ambassador",
            port: 80,
            targetPort: 80,
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
        namespace: params.namespace,
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
      kind: "Role",
      metadata: {
        name: "ambassador",
        namespace: params.namespace,
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
        namespace: params.namespace,
      },
    },  // serviceAccount
    ambassadorServiceAccount:: ambassadorServiceAccount,

    local ambassadorRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        name: "ambassador",
        namespace: params.namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "Role",
        name: "ambassador",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "ambassador",
          namespace: params.namespace,
        },
      ],
    },  // roleBinding
    ambassadorRoleBinding:: ambassadorRoleBinding,

    local ambassadorDeployment = {
      local replicas = if params.platform == "minikube" then 1 else 3,
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "ambassador",
        namespace: params.namespace,
      },
      spec: {
        replicas: replicas,
        template: {
          metadata: {
            labels: {
              service: "ambassador",
            },
            namespace: params.namespace,
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
                  {
                    name: "AMBASSADOR_SINGLE_NAMESPACE",
                    value: "true",
                  },
                ],
                image: params.ambassadorImage,
                livenessProbe: {
                  httpGet: {
                    path: "/ambassador/v0/check_alive",
                    port: 8877,
                  },
                  initialDelaySeconds: 30,
                  periodSeconds: 30,
                },
                name: "ambassador",
                readinessProbe: {
                  httpGet: {
                    path: "/ambassador/v0/check_ready",
                    port: 8877,
                  },
                  initialDelaySeconds: 30,
                  periodSeconds: 30,
                },
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

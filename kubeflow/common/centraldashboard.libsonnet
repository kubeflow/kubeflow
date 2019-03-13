{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    local centralDashboardDeployment = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: params.namespace,
      },
      spec: {
        template: {
          metadata: {
            labels: {
              app: "centraldashboard",
            },
          },
          spec: {
            containers: [
              {
                image: params.image,
                name: "centraldashboard",
                ports: [
                  {
                    containerPort: 8082,
                  },
                ],
              },
            ],
            serviceAccountName: "centraldashboard",
          },
        },
      },
    },  // deployUi
    centralDashboardDeployment:: centralDashboardDeployment,

    local centralDashboardService = {
      // Due to https://github.com/ksonnet/ksonnet/issues/670, escaped characters in
      // jsonnet files are not interpreted correctly by ksonnet, which causes runtime
      // parsing failures. This is fixed in ksonnet 0.12.0, so we can merge this back
      // to the jsonnet file when we take a dependency on ksonnet 0.12.0 or later.
      local annotations = function(namespace) {
        "getambassador.io/config":
          std.join("\n", [
            "---",
            "apiVersion: ambassador/v0",
            "kind:  Mapping",
            "name: centralui-mapping",
            "prefix: /",
            "rewrite: /",
            "service: centraldashboard." + namespace,
          ]),
      },
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: params.namespace,
        annotations: annotations(params.namespace),
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 8082,
          },
        ],
        selector: {
          app: "centraldashboard",
        },
        sessionAffinity: "None",
        type: "ClusterIP",
      },
    },  //service
    centralDashboardService:: centralDashboardService,

    local centralDashboardServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "centraldashboard",
        namespace: params.namespace,
      },
    },  // service account
    centralDashboardServiceAccount:: centralDashboardServiceAccount,

    local centralDashboardRole = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: params.namespace,
      },
      rules: [
        {
          apiGroups: [""],
          resources: [
            "pods",
            "pods/exec",
            "pods/log",
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [""],
          resources: [
            "secrets",
          ],
          verbs: [
            "get",
          ],
        },
      ],
    },  // role
    centralDashboardRole:: centralDashboardRole,

    local centralDashboardRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: params.namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "Role",
        name: "centraldashboard",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "centraldashboard",
          namespace: params.namespace,
        },
      ],
    },  // role binding
    centralDashboardRoleBinding:: centralDashboardRoleBinding,

    local centralDashboardClusterRole = {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
      },
      rules: [
        {
          apiGroups: [""],
          resources: [
            "namespaces",
            "events"
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        }
      ],
    },  // clusterrole
    centralDashboardClusterRole:: centralDashboardClusterRole,

    local centralDashboardClusterRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "centraldashboard",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "centraldashboard",
          namespace: params.namespace,
        },
      ],
    },  // clusterrolebinding
    centralDashboardClusterRoleBinding:: centralDashboardClusterRoleBinding,

    parts:: self,
    all:: [
      self.centralDashboardDeployment,
      self.centralDashboardService,
      self.centralDashboardServiceAccount,
      self.centralDashboardRole,
      self.centralDashboardRoleBinding,
      self.centralDashboardClusterRole,
      self.centralDashboardClusterRoleBinding,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

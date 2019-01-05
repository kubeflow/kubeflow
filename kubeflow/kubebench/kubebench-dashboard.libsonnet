{
  local k = import "k.libsonnet",
  new(_env, _params):: {

    local params = _env + _params,

    //Dashboard Deployment
    local deployment = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: params.name,
        },
        name: params.name,
        namespace: params.namespace,
      },
      spec: {
        template: {
          metadata: {
            labels: {
              app: params.name,
            },
          },
          spec: {
            containers: [
              {
                image: params.image,
                name: params.name,
                ports: [
                  {
                    containerPort: 8084,
                  },
                ],
              },
            ],
            seviceAccountName: params.name,
          },
        },
      },
    },
    deployment:: deployment,

    //Dashboard Service
    local service = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: params.name,
        namespace: params.namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: kubebench-dashboard-ui-mapping",
              "prefix: /dashboard/",
              "rewrite: /dashboard/",
              "service: " + params.name + "." + params.namespace,
            ]),
        },  //annotations
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 9303,
          },
        ],
        selector: {
          app: params.name,
        },
      },
    },
    service:: service,

    //Dahboard Service Account
    local serviceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: params.name,
        namespace: params.namespace,
      },
    },
    serviceAccount:: serviceAccount,

    //Dashboard Role
    local role = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        labels: {
          app: params.name,
        },
        name: params.name,
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
    },
    role:: role,

    //Dashboard Role Binding
    local roleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        labels: {
          app: params.name,
        },
        name: params.name,
        namespace: params.namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "Role",
        name: params.name,
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: params.name,
          namespace: params.namespace,
        },
      ],
    },
    roleBinding:: roleBinding,

    all:: [
      self.deployment,
      self.service,
      self.serviceAccount,
      self.role,
      self.roleBinding,
    ],

    //Create Objects
    list(obj=self.all):: k.core.v1.list.new(obj,),

  },
}

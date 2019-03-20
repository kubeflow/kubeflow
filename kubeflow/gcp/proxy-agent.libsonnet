{
  local k = import "k.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    local serviceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "proxy-agent-runner",
        namespace: params.namespace,
      },
    },  // service account
    serviceAccount:: serviceAccount,

    local role = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        labels: {
          app: "proxy-agent-runner",
        },
        name: "proxy-agent-runner",
        namespace: params.namespace,
      },
      rules: [
        {
          apiGroups: [""],
          resources: ["configmaps"],
          verbs: ["*"],
        },
      ],
    },  // role
    role:: role,

    local roleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        labels: {
          app: "proxy-agent-runner",
        },
        name: "proxy-agent-runner",
        namespace: params.namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "Role",
        name: "proxy-agent-runner",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "proxy-agent-runner",
          namespace: params.namespace,
        },
      ],
    },  // role binding
    roleBinding:: roleBinding,

    local deploy = {
      apiVersion: "apps/v1beta2",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "proxy-agent",
        },
        name: "proxy-agent",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "proxy-agent",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "proxy-agent",
            },
          },
          spec: {
            containers: [
              {
                name: "proxy-agent",
                image: params.image,
                imagePullPolicy: "IfNotPresent",
                env: [
                  {
                    name: "GOOGLE_APPLICATION_CREDENTIALS",
                    value: "/secret/gcp-credentials/user-gcp-sa.json",
                  },
                ],
                volumeMounts: [
                  {
                    name: "gcp-credentials",
                    mountPath: "/secret/gcp-credentials",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "gcp-credentials",
                secret: {
                  secretName: "user-gcp-sa",
                },
              },
            ],
            serviceAccountName: "proxy-agent-runner",
          },
        },
      },
    },  // deploy
    deploy:: deploy,

    parts:: self,
    all:: [
      self.serviceAccount,
      self.role,
      self.roleBinding,
      self.deploy,
    ],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}

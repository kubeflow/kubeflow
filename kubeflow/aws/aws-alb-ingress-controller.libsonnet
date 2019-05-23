{
  local k = import "k.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    local albIngressClusterRole = {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "alb-ingress-controller",
        labels: {
          app: "alb-ingress-controller"
        },
      },
      rules: [
        {
          apiGroups: ["", "extensions"],
          resources: ["configmaps", "endpoints", "events", "ingresses", "ingresses/status", "services"],
          verbs: ["create", "get", "list", "update", "watch", "patch"],
        },
        {
          apiGroups: ["", "extensions"],
          resources: ["nodes", "pods", "secrets", "services", "namespaces"],
          verbs: ["get", "list", "watch"],
        },
      ],
    }, // albIngressClusterRole
    albIngressClusterRole:: albIngressClusterRole,

    local albIngressClusterRoleBinding = {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "alb-ingress-controller",
        labels: {
          app: "alb-ingress-controller"
        },
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "alb-ingress-controller",
          namespace: params.namespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "alb-ingress-controller",
        apiGroup: "rbac.authorization.k8s.io",
      },
    }, // albIngressClusterRoleBinding
    albIngressClusterRoleBinding:: albIngressClusterRoleBinding,

    local albIngressServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "alb-ingress-controller",
        namespace: params.namespace,
        labels: {
          app: "alb-ingress-controller"
        },
      },
    },  // albIngressServiceAccount
    albIngressServiceAccount:: albIngressServiceAccount,

    local albIngressDeploy = {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: "alb-ingress-controller",
        namespace: params.namespace,
        labels: {
          app: "alb-ingress-controller"
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: "alb-ingress-controller"
          },
        },
        strategy: {
          rollingUpdate: {
            maxSurge: 1,
            maxUnavailable: 1
          },
          type: "RollingUpdate"
        },
        template: {
          metadata: {
            labels: {
              app: "alb-ingress-controller",
            },
          },
          spec: {
            containers: [
              {
                args: [
                  "--ingress-class=alb",
                  "--cluster-name=" + params.clusterName,
                ] + (if params.awsVpcId != "null" then [
                  "--aws-vpc-id=" + params.awsVpcId
                ] else [
                ]) + (if params.awsRegion != "null" then [
                  "--aws-region=" + params.awsRegion
                ] else [
                ]),
                name: "alb-ingress-controller",
                image: params.albIngressControllerImage,
                imagePullPolicy: "Always",
                resources: {},
                terminationMessagePath: "/dev/termination-log"
              },
            ],
            dnsPolicy: "ClusterFirst",
            restartPolicy: "Always",
            securityContext: {},
            terminationGracePeriodSeconds: 30,
            serviceAccountName: "alb-ingress-controller",
            serviceAccount: "alb-ingress-controller",
          },
        },
      },
    },  // albIngressDeploy
    albIngressDeploy:: albIngressDeploy,

    parts:: self,
    local all = [
      self.albIngressClusterRole,
      self.albIngressClusterRoleBinding,
      self.albIngressServiceAccount,
      self.albIngressDeploy,
    ],
    all:: all,

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}

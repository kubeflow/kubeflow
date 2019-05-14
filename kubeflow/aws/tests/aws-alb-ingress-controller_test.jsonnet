local testSuite = import "kubeflow/common/testsuite.libsonnet";
local albIngressController = import "kubeflow/aws/aws-alb-ingress-controller.libsonnet";

local defaultParams = {
  albIngressControllerImage: "docker.io/amazon/aws-alb-ingress-controller:v1.1.0",
  awsVpcId: "null",
  awsRegion: "null",
};

local params = defaultParams + {
  name: "aws-alb-ingress-controller",
  clusterName: "eks-test-cluster",
};

local noEc2MetadataParams = params + {
  awsVpcId: "AWS-VPC-ID",
  awsRegion: "AWS-REGION",
};

local env = {
    namespace: "kubeflow",
};


local instance = albIngressController.new(env, params);
local noEc2MetadataInstance = albIngressController.new(env, noEc2MetadataParams);

local testCases = [
  {
    actual: instance.parts.albIngressClusterRole,
    expected: {
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
    },

  },
  {
    actual: instance.parts.albIngressClusterRoleBinding,
    expected: {
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
          namespace: "kubeflow",
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "alb-ingress-controller",
        apiGroup: "rbac.authorization.k8s.io",
      },

    },
  },
  {
    actual: instance.parts.albIngressServiceAccount,
    expected: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "alb-ingress-controller",
        namespace: "kubeflow",
        labels: {
          app: "alb-ingress-controller"
        },
      },
    },

  },
  {
    actual: instance.parts.albIngressDeploy,
    expected: {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: "alb-ingress-controller",
        namespace: "kubeflow",
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
                  "--cluster-name=eks-test-cluster",
                ],
                name: "alb-ingress-controller",
                image: "docker.io/amazon/aws-alb-ingress-controller:v1.1.0",
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
    },
  },

  // NO EC2METADATA AVAILABLE
  {
    actual: noEc2MetadataInstance.parts.albIngressDeploy,
    expected: {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: "alb-ingress-controller",
        namespace: "kubeflow",
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
                  "--cluster-name=eks-test-cluster",
                  "--aws-vpc-id=AWS-VPC-ID",
                  "--aws-region=AWS-REGION",
                ],
                name: "alb-ingress-controller",
                image: "docker.io/amazon/aws-alb-ingress-controller:v1.1.0",
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
    },
  },
];

testSuite.run(testCases)
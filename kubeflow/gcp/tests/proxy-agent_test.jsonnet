local testSuite = import "kubeflow/common/testsuite.libsonnet";
local proxyagent = import "kubeflow/gcp/proxy-agent.libsonnet";

local params = {
  name: "proxy-agent",
  image: "gcr.io/ml-pipeline/inverse-proxy-agent:0.1.13",
};
local env = {
  namespace: "kf-001",
};

local instance = proxyagent.new(env, params);

local testCases = [
  {
    actual: instance.parts.serviceAccount,
    expected:  {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "proxy-agent-runner",
        namespace: "kf-001",
      },
    },
  },
  {
    actual: instance.parts.role,
    expected: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        labels: {
          app: "proxy-agent-runner",
        },
        name: "proxy-agent-runner",
        namespace: "kf-001",
      },
      rules: [
        {
          apiGroups: [""],
          resources: ["configmaps"],
          verbs: ["*"],
        },
      ],
    },
  },
  {
    actual: instance.parts.roleBinding,
    expected: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        labels: {
          app: "proxy-agent-runner",
        },
        name: "proxy-agent-runner",
        namespace: "kf-001",
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
          namespace: "kf-001",
        },
      ],
    },
  },
  {
    actual: instance.parts.deploy,
    expected: {
      apiVersion: "apps/v1beta2",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "proxy-agent",
        },
        name: "proxy-agent",
        namespace: "kf-001",
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
                image: "gcr.io/ml-pipeline/inverse-proxy-agent:0.1.13",
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
    },
  },
];

testSuite.run(testCases)

local testSuite = import "kubeflow/common/testsuite.libsonnet";
local awsFsxCsiDriver = import "kubeflow/aws/aws-fsx-csi-driver.libsonnet";

local params = {
  name: "aws-fsx-csi-driver",
  csiControllerImage: "amazon/aws-fsx-csi-driver:latest",
  csiProvisionerImage: "quay.io/k8scsi/csi-provisioner:v0.4.2",
  csiAttacherImage: "quay.io/k8scsi/csi-attacher:v0.4.2",
};

local env = {
  namespace: "kf-001",
};

local instance = awsFsxCsiDriver.new(env, params);

local testCases = [
  {
    actual: instance.parts.csiControllerServiceAccount,
    expected: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "fsx-csi-controller-sa",
        namespace: "kf-001",
      },
    },
  },
  {
    actual: instance.parts.csiProvisionerClusterRole,
    expected: {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "csi-fsx-external-provisioner-clusterrole",
      },
      rules: [
        {
          apiGroups: [""],
          resources: ["persistentvolumes"],
          verbs: ["get", "list", "watch", "create", "delete"],
        },
        {
          apiGroups: [""],
          resources: ["persistentvolumeclaims"],
          verbs: ["get", "list", "watch", "update"],
        },
        {
          apiGroups: ["storage.k8s.io"],
          resources: ["storageclasses"],
          verbs: ["get", "list", "watch"],
        },
        {
          apiGroups: [""],
          resources: ["events"],
          verbs: ["get", "list", "watch", "create", "update", "patch"],
        },
      ],
    },
  },
  {
    actual: instance.parts.csiProvisionerClusterRoleBinding,
    expected: {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "csi-fsx-provisioner-binding",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "fsx-csi-controller-sa",
          namespace: "kf-001",
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "csi-fsx-external-provisioner-clusterrole",
        apiGroup: "rbac.authorization.k8s.io",
      },
    },
  },
  {
    actual: instance.parts.csiAttacherClusterRole,
    expected: {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "csi-fsx-external-attacher-clusterrole",
      },
      rules: [
        {
          apiGroups: [""],
          resources: ["persistentvolumes"],
          verbs: ["get", "list", "watch", "update"],
        },
        {
          apiGroups: [""],
          resources: ["nodes"],
          verbs: ["get", "list", "watch"],
        },
        {
          apiGroups: ["storage.k8s.io"],
          resources: ["volumeattachments"],
          verbs: ["get", "list", "watch", "update"],
        },
      ],
    },
  },
  {
    actual: instance.parts.csiAttacherClusterRoleBinding,
    expected: {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "csi-fsx-attacher-binding",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "fsx-csi-controller-sa",
          namespace: "kf-001",
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "csi-fsx-external-attacher-clusterrole",
        apiGroup: "rbac.authorization.k8s.io",
      },
    },
  },
  {
    actual: instance.parts.csiControllerDeploy,
    expected: {
      apiVersion: "apps/v1beta1",
      kind: "StatefulSet",
      metadata: {
        name: "fsx-csi-controller",
        namespace: "kf-001",
      },
      spec: {
        serviceAccount: "fsx-csi-controller",
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "fsx-csi-controller",
            },
          },
          spec: {
            serviceAccount: "csi-controller-sa",
            priorityClassName: "system-cluster-critical",

            tolerations: [
              {
                key: "CriticalAddonsOnly",
                operator: "Exists"
              },
            ],
            containers: [
              {
                name: "fsx-plugin",
                image: "amazon/aws-fsx-csi-driver:latest",
                args: [
                  "--endpoint=$(CSI_ENDPOINT)",
                  "--logtostderr",
                  "--v=5"
                ],
                env: [
                  {
                    name: "CSI_ENDPOINT",
                    value: "unix:///var/lib/csi/sockets/pluginproxy/csi.sock",
                  },
                  {
                    name: "AWS_ACCESS_KEY_ID",
                    valueFrom: {
                      secretKeyRef: {
                        name: "aws-secret",
                        key: "AWS_ACCESS_KEY_ID",
                      },
                    },
                  },
                  {
                    name: "AWS_SECRET_ACCESS_KEY",
                    valueFrom: {
                      secretKeyRef: {
                        name: "aws-secret",
                        key: "AWS_SECRET_ACCESS_KEY",
                      },
                    },
                  },
                ],
                volumeMounts: [
                  {
                    name: "socket-dir",
                    mountPath: "/var/lib/csi/sockets/pluginproxy/",
                  },
                ],
              },
              {
                name: "fsx-csi-provisioner",
                image: "quay.io/k8scsi/csi-provisioner:v0.4.2",
                args: [
                  "--provisioner=fsx.csi.aws.com",
                  "--csi-address=$(ADDRESS)",
                  "--connection-timeout=5m",
                  "--v=5"
                ],
                env: [
                  {
                    name: "ADDRESS",
                    value: "/var/lib/csi/sockets/pluginproxy/csi.sock",
                  },
                ],
                volumeMounts: [
                  {
                    name: "socket-dir",
                    mountPath: "/var/lib/csi/sockets/pluginproxy/",
                  },
                ],
              },
              {
                name: "fsx-csi-attacher",
                image: "quay.io/k8scsi/csi-attacher:v0.4.2",
                args: [
                  "--csi-address=$(ADDRESS)",
                  "--v=5"
                ],
                env: [
                  {
                    name: "ADDRESS",
                    value: "/var/lib/csi/sockets/pluginproxy/csi.sock",
                  },
                ],
                volumeMounts: [
                  {
                    name: "socket-dir",
                    mountPath: "/var/lib/csi/sockets/pluginproxy/",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "socket-dir",
                emptyDir: {},
              },
            ],
          },
        },
      },
    },
  },
];

testSuite.run(testCases)
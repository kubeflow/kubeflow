{
  local k = import "k.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    local csiControllerServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "fsx-csi-controller-sa",
        namespace: params.namespace,
      },
    },  // csiControllerServiceAccount
    csiControllerServiceAccount:: csiControllerServiceAccount,

    local csiProvisionerClusterRole = {
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
    }, // csiProvisionerClusterRole
    csiProvisionerClusterRole:: csiProvisionerClusterRole,

    local csiProvisionerClusterRoleBinding = {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "csi-fsx-provisioner-binding",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "fsx-csi-controller-sa",
          namespace: params.namespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "csi-fsx-external-provisioner-clusterrole",
        apiGroup: "rbac.authorization.k8s.io",
      },
    }, // csiProvisionerClusterRoleBinding
    csiProvisionerClusterRoleBinding:: csiProvisionerClusterRoleBinding,

    local csiAttacherClusterRole = {
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
    }, // csiFSxAttacherClusterRole
    csiAttacherClusterRole:: csiAttacherClusterRole,

    local csiAttacherClusterRoleBinding = {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "csi-fsx-attacher-binding",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "fsx-csi-controller-sa",
          namespace: params.namespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "csi-fsx-external-attacher-clusterrole",
        apiGroup: "rbac.authorization.k8s.io",
      },
    }, // csiAttacherClusterRoleBinding
    csiAttacherClusterRoleBinding:: csiAttacherClusterRoleBinding,

    local csiControllerDeploy = {
      apiVersion: "apps/v1beta1",
      kind: "StatefulSet",
      metadata: {
        name: "fsx-csi-controller",
        namespace: params.namespace,
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
                image: params.csiControllerImage,
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
                image: params.csiProvisionerImage,
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
                image: params.csiAttacherImage,
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
    },  // csiControllerDeploy
    csiControllerDeploy:: csiControllerDeploy,

    parts:: self,
    local all = [
      self.csiControllerServiceAccount,
      self.csiProvisionerClusterRole,
      self.csiProvisionerClusterRoleBinding,
      self.csiAttacherClusterRole,
      self.csiAttacherClusterRoleBinding,
      self.csiControllerDeploy,
    ],
    all:: all,

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}

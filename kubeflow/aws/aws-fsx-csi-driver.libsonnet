{
  local k = import "k.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,
    local namespace = if _params.namespace != "null" then _params.namespace else _env.namespace,

    local csiControllerServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "fsx-csi-controller-sa",
        namespace: namespace,
      },
    },  // csiControllerServiceAccount
    csiControllerServiceAccount:: csiControllerServiceAccount,

    local csiNodeServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "fsx-csi-node-sa",
        namespace: namespace,
      },
    },  // csiNodeServiceAccount
    csiNodeServiceAccount:: csiNodeServiceAccount,

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
          namespace: namespace,
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
          namespace: namespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "csi-fsx-external-attacher-clusterrole",
        apiGroup: "rbac.authorization.k8s.io",
      },
    }, // csiAttacherClusterRoleBinding
    csiAttacherClusterRoleBinding:: csiAttacherClusterRoleBinding,

    local csiDaemonSetDeploy = {
      apiVersion: "apps/v1beta2",
      kind: "DaemonSet",
      metadata: {
        name: "fsx-csi-node",
        namespace: namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "fsx-csi-node"
          },
        },
        template: {
          metadata: {
            labels: {
              app: "fsx-csi-node",
            },
          },
          spec: {
            serviceAccount: "fsx-csi-node-sa",
            hostNetwork: true,
            containers: [
              {
                name: "fsx-plugin",
                securityContext: {
                  privileged: true,
                },
                image: params.csiControllerImage,
                args: [
                  "--endpoint=$(CSI_ENDPOINT)",
                  "--logtostderr",
                  "--v=5"
                ],
                env: [
                  {
                    name: "CSI_ENDPOINT",
                    value: "unix:/csi/csi.sock",
                  },
                ],
                volumeMounts: [
                  {
                    name: "kubelet-dir",
                    mountPath: "/var/lib/kubelet",
                    mountPropagation: "Bidirectional"
                  },
                  {
                    name: "plugin-dir",
                    mountPath: "/csi",
                  },
                  {
                    name: "device-dir",
                    mountPath: "/dev",
                  },
                ],
              },
              {
                name: "fsx-csi-driver-registrar",
                image: params.csiDriverRegistrarImage,
                args: [
                  "--csi-address=$(ADDRESS)",
                  "--mode=node-register",
                  "--pod-info-mount-version=v1",
                  "--kubelet-registration-path=$(DRIVER_REG_SOCK_PATH)",
                  "--v=5"
                ],
                env: [
                  {
                    name: "ADDRESS",
                    value: "/csi/csi.sock",
                  },
                  {
                    name: "DRIVER_REG_SOCK_PATH",
                    value: "/var/lib/kubelet/plugins/fsx.csi.aws.com/csi.sock",
                  },
                  {
                    name: "KUBE_NODE_NAME",
                    valueFrom: {
                      fieldRef: {
                        fieldPath: "spec.nodeName"
                      }
                    }
                  },
                ],
                volumeMounts: [
                  {
                    name: "plugin-dir",
                    mountPath: "/csi",
                  },
                  {
                    name: "registration-dir",
                    mountPath: "/registration"
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "kubelet-dir",
                hostPath: {
                  path: "/var/lib/kubelet",
                  type: "Directory"
                },
              },
              {
                name: "plugin-dir",
                hostPath: {
                  path: "/var/lib/kubelet/plugins/fsx.csi.aws.com/",
                  type: "DirectoryOrCreate"
                },
              },
              {
                name: "registration-dir",
                hostPath: {
                  path: "/var/lib/kubelet/plugins/",
                  type: "Directory"
                },
              },
              {
                name: "device-dir",
                hostPath: {
                  path: "/dev",
                  type: "Directory"
                },
              },
            ],
          },
        },
      },
    },  // csiDaemonSetDeploy
    csiDaemonSetDeploy:: csiDaemonSetDeploy,

    local csiControllerDeploy = {
      apiVersion: "apps/v1beta1",
      kind: "StatefulSet",
      metadata: {
        name: "fsx-csi-controller",
        namespace: namespace,
      },
      spec: {
        serviceName: "fsx-csi-controller",
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "fsx-csi-controller",
            },
          },
          spec: {
            serviceAccount: "fsx-csi-controller-sa",
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

    local csiDefaultStorageClass = {
      apiVersion: "storage.k8s.io/v1",
      kind: "StorageClass",
      metadata: {
        name: "fsx-default",
      },
      provisioner: "fsx.csi.aws.com"
    },  // csiDefaultStorageClass
    csiDefaultStorageClass:: csiDefaultStorageClass,


    parts:: self,
    local all = [
      self.csiControllerServiceAccount,
      self.csiNodeServiceAccount,
      self.csiProvisionerClusterRole,
      self.csiProvisionerClusterRoleBinding,
      self.csiAttacherClusterRole,
      self.csiAttacherClusterRoleBinding,
      self.csiDaemonSetDeploy,
      self.csiControllerDeploy,
      self.csiDefaultStorageClass
    ],
    all:: all,

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}

{
  local k = import "k.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    local csiNodeServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "efs-csi-node-sa",
        namespace: params.namespace,
      },
    },  // csiNodeServiceAccount
    csiNodeServiceAccount:: csiNodeServiceAccount,

    local csiNodeClusterRole = {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "csi-efs-node-clusterrole",
      },
      rules: [
        {
          apiGroups: [""],
          resources: ["secrets"],
          verbs: ["get", "list"],
        },
        {
          apiGroups: [""],
          resources: ["nodes"],
          verbs: ["get", "list", "update"],
        },
        {
          apiGroups: [""],
          resources: ["namespaces"],
          verbs: ["get", "list"],
        },
        {
          apiGroups: [""],
          resources: ["persistentvolumes"],
          verbs: ["get", "list", "watch", "update"],
        },
        {
          apiGroups: ["storage.k8s.io"],
          resources: ["volumeattachments"],
          verbs: ["get", "list", "watch", "update"],
        },
        {
          apiGroups: ["csi.storage.k8s.io"],
          resources: ["csinodeinfos"],
          verbs: ["get", "list", "watch", "update"],
        },
      ],
    }, // csiNodeClusterRole
    csiNodeClusterRole:: csiNodeClusterRole,

    local csiNodeClusterRoleBinding = {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "csi-efs-node-binding",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "efs-csi-node-sa",
          namespace: params.namespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "csi-efs-node-clusterrole",
        apiGroup: "rbac.authorization.k8s.io",
      },
    }, // csiNodeClusterRoleBinding
    csiNodeClusterRoleBinding:: csiNodeClusterRoleBinding,

    local csiControllerServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "efs-csi-controller-sa",
        namespace: params.namespace,
      },
    },  // csiControllerServiceAccount
    csiControllerServiceAccount:: csiControllerServiceAccount,

    local csiAttacherClusterRole = {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "csi-efs-external-attacher-clusterrole",
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
    }, // csiAttacherClusterRole
    csiAttacherClusterRole:: csiAttacherClusterRole,

    local csiAttacherClusterRoleBinding = {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: "csi-efs-attacher-binding",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "efs-csi-controller-sa",
          namespace: params.namespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "csi-efs-external-attacher-clusterrole",
        apiGroup: "rbac.authorization.k8s.io",
      },
    }, // csiAttacherClusterRoleBinding
    csiAttacherClusterRoleBinding:: csiAttacherClusterRoleBinding,

    local csiDaemonSetDeploy = {
      apiVersion: "apps/v1beta2",
      kind: "DaemonSet",
      metadata: {
        name: "efs-csi-node",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "efs-csi-node"
          },
        },
        template: {
          metadata: {
            labels: {
              app: "efs-csi-node",
            },
          },
          spec: {
            serviceAccount: "efs-csi-node-sa",
            hostNetwork: true,
            containers: [
              {
                name: "efs-plugin",
                securityContext: {
                  privileged: true,
                },
                image: params.csiControllerImage,
                imagePullPolicy: "Always",
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
                name: "efs-csi-driver-registrar",
                image: params.csiDriverRegistrarImage,
                args: [
                  "--csi-address=$(ADDRESS)",
                  "--mode=node-register",
                  "--driver-requires-attachment=true",
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
                    value: "/var/lib/kubelet/plugins/efs.csi.aws.com/csi.sock",
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
                  path: "/var/lib/kubelet/plugins/efs.csi.aws.com/",
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
        name: "efs-csi-controller",
        namespace: params.namespace,
      },
      spec: {
        serviceName: "efs-csi-controller",
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "efs-csi-controller",
            },
          },
          spec: {
            serviceAccount: "efs-csi-controller-sa",
            tolerations: [
              {
                key: "CriticalAddonsOnly",
                operator: "Exists"
              },
            ],
            containers: [
              {
                name: "efs-plugin",
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
                name: "efs-csi-attacher",
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
        name: "efs-default",
      },
      provisioner: "efs.csi.aws.com"
    },  // csiDefaultStorageClass
    csiDefaultStorageClass:: csiDefaultStorageClass,


    parts:: self,
    local all = [
      self.csiControllerServiceAccount,
      self.csiNodeServiceAccount,
      self.csiNodeClusterRole,
      self.csiNodeClusterRoleBinding,
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

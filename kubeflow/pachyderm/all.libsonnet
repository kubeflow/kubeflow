{
  // Various prototypes we want to support.

  // TODO(jlewi): Need to configure the storage backend; e.g. to use GCS I think its
  // using LOCAL right now.
  //
  // Also The docs http://pachyderm.readthedocs.io/en/latest/deployment/google_cloud_platform.html
  // say it should be creating a storage class but I don't see that.


  // All pachyderm components
  all(params, env):: [
    $.parts(params, env).secret,
    $.parts(params, env).serviceAccount,
    $.parts(params, env).role,
    $.parts(params, env).roleBinding,
    $.parts(params, env).etcdService,
    $.parts(params, env).pachydService,
    $.parts(params, env).etcd,
    $.parts(params, env).pachyd,
  ],

  // Parts should be a dictionary containing jsonnet representations of the various
  // K8s resources used to construct the prototypes listed above.
  parts(params, env):: {
    // All ksonnet environments are associated with a namespace and we
    // generally want to use that namespace for a component.
    // However, in some cases an application may use multiple namespaces in which
    // case the namespace for a particular component will be a parameter.
    local namespace = if std.objectHas(params, "namespace") then params.namespace else env.namespace,

    secret:: {
      apiVersion: "v1",
      data: null,
      kind: "Secret",
      metadata: {
        labels: {
          app: params.name + "-pachyderm",
        },
        name: "pachyderm-storage-secret",
        namespace: namespace,
      },
    },

    serviceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: params.name + "-pachyderm",
          chart: "pachyderm-0.1.6",
          suite: "pachyderm",
        },
        name: "pachyderm",
        namespace: namespace,
      },
    },

    role:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        creationTimestamp: null,
        labels: {
          app: "",
          suite: "pachyderm",
        },
        name: "pachyderm",
        namespace: namespace,
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "nodes",
            "pods",
            "pods/log",
            "endpoints",
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "replicationcontrollers",
            "services",
          ],
          verbs: [
            "get",
            "list",
            "watch",
            "create",
            "update",
            "delete",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resourceNames: [
            "pachyderm-storage-secret",
          ],
          resources: [
            "secrets",
          ],
          verbs: [
            "get",
            "list",
            "watch",
            "create",
            "update",
            "delete",
          ],
        },
      ],
    },

    roleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        name: "pachyderm",
        namespace: namespace,
      },
      roleRef: {
        apiGroup: "",
        kind: "Role",
        name: "pachyderm",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "pachyderm",
          namespace: "kubeflow",
        },
      ],
    },

    etcdService:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: params.name + "-etcd",
          suite: "pachyderm",
        },
        name: "etcd",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "client-port",
            port: 2379,
            targetPort: 0,
          },
        ],
        selector: {
          app: params.name + "-etcd",
        },
        type: "NodePort",
      },
    },

    pachydService:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: params.name + "-pachd",
          chart: "pachyderm-0.1.6",
          suite: "pachyderm",
        },
        name: "pachd",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "api-grpc-port",
            nodePort: 30650,
            port: 650,
            targetPort: 650,
          },
          {
            name: "trace-port",
            nodePort: 30651,
            port: 651,
            targetPort: 651,
          },
          {
            name: "api-http-port",
            nodePort: 30652,
            port: 652,
            targetPort: 652,
          },
        ],
        selector: {
          app: "pachd",
        },
        type: "NodePort",
      },
    },

    etcd:: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: params.name + "-etcd",
          release: "RELEASE-NAME",
          suite: "pachyderm",
        },
        name: "etcd",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: params.name + "-etcd",
            suite: "pachyderm",
          },
        },
        template: {
          metadata: {
            labels: {
              app: params.name + "-etcd",
              suite: "pachyderm",
            },
            name: "etcd",
          },
          spec: {
            containers: [
              {
                command: [
                  "/usr/local/bin/etcd",
                  "--listen-client-urls=http://0.0.0.0:2379",
                  "--advertise-client-urls=http://0.0.0.0:2379",
                  "--data-dir=/var/data/etcd",
                  "--auto-compaction-retention=1",
                ],
                image: "pachyderm/etcd:v3.2.7",
                imagePullPolicy: "IfNotPresent",
                name: "etcd",
                ports: [
                  {
                    containerPort: 2379,
                    name: "client-port",
                  },
                  {
                    containerPort: 2380,
                    name: "peer-port",
                  },
                ],
                resources: {
                  requests: {
                    cpu: "250m",
                    memory: "256M",
                  },
                },
                volumeMounts: [
                  {
                    mountPath: "/var/data/etcd",
                    name: "etcdvol",
                  },
                ],
              },
            ],
            volumes: [
              {
                hostPath: {
                  path: "/var/pachyderm/etcd",
                },
                name: "etcdvol",
              },
            ],
          },
        },
      },
    },

    pachyd:: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: params.name + "-pachd",
          release: params.name,
          suite: "pachyderm",
        },
        name: "pachd",
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: "pachd",
            suite: "pachyderm",
          },
        },
        strategy: {},
        template: {
          metadata: {
            labels: {
              app: "pachd",
              suite: "pachyderm",
            },
            name: "pachd",
            namespace: namespace,
          },
          spec: {
            containers: [
              {
                env: [
                  {
                    name: "PACH_ROOT",
                    value: "/pach",
                  },
                  {
                    name: "NUM_SHARDS",
                    value: "16",
                  },
                  {
                    name: "STORAGE_BACKEND",
                    value: "LOCAL",
                  },
                  {
                    name: "STORAGE_HOST_PATH",
                    value: "/var/pachyderm/pachd",
                  },
                  {
                    name: "PACHD_POD_NAMESPACE",
                    valueFrom: {
                      fieldRef: {
                        apiVersion: "v1",
                        fieldPath: "metadata.namespace",
                      },
                    },
                  },
                  {
                    name: "WORKER_IMAGE",
                    value: "pachyderm/worker:1.7.0",
                  },
                  {
                    name: "WORKER_SIDECAR_IMAGE",
                    value: "pachyderm/pachd:1.7.0",
                  },
                  {
                    name: "WORKER_IMAGE_PULL_POLICY",
                    value: "IfNotPresent",
                  },
                  {
                    name: "PACHD_VERSION",
                    value: "1.7.0",
                  },
                  {
                    name: "METRICS",
                    value: "true",
                  },
                  {
                    name: "LOG_LEVEL",
                    value: "info",
                  },
                  {
                    name: "BLOCK_CACHE_BYTES",
                    value: "0G",
                  },
                  {
                    name: "IAM_ROLE",
                  },
                  {
                    name: "PACHYDERM_AUTHENTICATION_DISABLED_FOR_TESTING",
                    value: "false",
                  },
                ],
                image: "pachyderm/pachd:1.7.0",
                imagePullPolicy: "Always",
                name: "pachd",
                ports: [
                  {
                    containerPort: 650,
                    name: "api-grpc-port",
                    protocol: "TCP",
                  },
                  {
                    containerPort: 651,
                    name: "trace-port",
                  },
                  {
                    containerPort: 652,
                    name: "api-http-port",
                  },
                ],
                resources: {
                  requests: {
                    cpu: "250m",
                    memory: "512M",
                  },
                },
                securityContext: {
                  privileged: true,
                },
                volumeMounts: [
                  {
                    mountPath: "/pach",
                    name: "pachdvol",
                  },
                  {
                    mountPath: "/pachyderm-storage-secret",
                    name: "pachyderm-storage-secret",
                  },
                ],
              },
            ],
            serviceAccountName: "pachyderm",
            volumes: [
              {
                hostPath: {
                  path: "/var/pachyderm/pachd",
                },
                name: "pachdvol",
              },
              {
                name: "pachyderm-storage-secret",
                secret: {
                  secretName: "pachyderm-storage-secret",
                },
              },
            ],
          },
        },
      },
    },  // pachd
  },  // parts
}

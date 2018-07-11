{
  // Various prototypes we want to support.

  // TODO(jlewi): Need to configure the storage backend; e.g. to use GCS I think its
  // using LOCAL right now.
  //
  // Also The docs http://pachyderm.readthedocs.io/en/latest/deployment/google_cloud_platform.html
  // say it should be creating a storage class but I don't see that.


  // All pachyderm components
  all(params, env):: {


    local base = [
      $.parts(params, env).secret,
      $.parts(params, env).serviceAccount,
      $.parts(params, env).etcdService,
      $.parts(params, env).pachydService,
      $.parts(params, env).pachyd,
    ],

    local localMode = [
      $.parts(params, env).etcd,
      $.parts(params, env).role,
      $.parts(params, env).roleBinding,
    ],

    local gcpMode = [
      $.parts(params, env).etcdGceStorageClass,
      $.parts(params, env).etcdHeadlessService,
      $.parts(params, env).etcdStatefulSet,
      $.parts(params, env).clusterRole,
      $.parts(params, env).clusterRoleBinding,
    ],

    local backend =
      if std.objectHas(params, "backend") then
        params.backend
      else
        "local",

    components:: base +
                 if backend == "gcp" then
                   gcpMode
                 else
                   localMode,
  }.components,

  // Parts should be a dictionary containing jsonnet representations of the various
  // K8s resources used to construct the prototypes listed above.
  parts(params, env):: {
    // All ksonnet environments are associated with a namespace and we
    // generally want to use that namespace for a component.
    // However, in some cases an application may use multiple namespaces in which
    // case the namespace for a particular component will be a parameter.
    local namespace = if std.objectHas(params, "namespace") then params.namespace else env.namespace,


    local backend =
      if std.objectHas(params, "backend") then
        params.backend
      else
        "local",

    // TODO(jlewi): We would like to use params.name + "-etcd" but that seems to not work.
    // I think the problem is that pachd assumes etcd has hostname "etcd". If we want to
    // support other names we might need to set the environment variable ETCD_PORT_2379_TCP_ADDR
    // or make some other change.
    local etcdName = "etcd",

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
          namespace: namespace,
        },
      ],
    },

    // TODO(jlewi): See https://github.com/pachyderm/pachyderm/issues/2787
    // With GCP we seem to need a cluster role.
    clusterRole:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        creationTimestamp: null,
        labels: {
          app: "",
          suite: "pachyderm",
        },
        name: "pachyderm-cluster",
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

    clusterRoleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "pachyderm-cluster",
      },
      roleRef: {
        apiGroup: "",
        kind: "ClusterRole",
        name: "pachyderm-cluster",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "pachyderm",
          namespace: namespace,
        },
      ],
    },

    etcdService:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: etcdName,
          suite: "pachyderm",
        },
        name: etcdName,
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
          app: etcdName,
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
          {
            name: "api-git-port",
            nodePort: 30999,
            port: 999,
            protocol: "TCP",
            targetPort: 999,
          },
        ],
        selector: {
          app: "pachd",
        },
        type: "NodePort",
      },
    },

    // TODO(jlewi): The local version(minikube) of Pachyderm runs etcd as a deployment
    // backed by a host volume. Per the comment https://github.com/kubeflow/kubeflow/issues/611#issuecomment-380633796
    // Pachyderm originally didn't use statefulset in local mode because they weren't supported everywhere.
    // We could probably switch to always using statefulsets.
    //
    etcd:: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: etcdName,
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
            app: etcdName,
            suite: "pachyderm",
          },
        },
        template: {
          metadata: {
            labels: {
              app: etcdName,
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

    // On GCE we use SSD for etcd.
    etcdGceStorageClass:: {
      apiVersion: "storage.k8s.io/v1",
      kind: "StorageClass",
      metadata: {
        creationTimestamp: "2018-04-09T21:32:22Z",
        labels: {
          app: "etcd",
          suite: "pachyderm",
        },
        name: "etcd-storage-class",
      },
      parameters: {
        type: "pd-ssd",
      },
      provisioner: "kubernetes.io/gce-pd",
      reclaimPolicy: "Delete",
    },

    etcdStatefulSet:: {
      apiVersion: "apps/v1beta1",
      kind: "StatefulSet",
      metadata: {
        labels: {
          app: etcdName,
          suite: "pachyderm",
        },
        name: "etcd",
        namespace: namespace,
      },
      spec: {
        podManagementPolicy: "OrderedReady",
        replicas: 1,
        revisionHistoryLimit: 10,
        selector: {
          matchLabels: {
            app: etcdName,
            suite: "pachyderm",
          },
        },
        serviceName: "etcd-headless",
        template: {
          metadata: {
            labels: {
              app: etcdName,
              suite: "pachyderm",
            },
            name: etcdName,
            namespace: "pachyderm",
          },
          spec: {
            containers: [
              {
                args: [
                  '"/usr/local/bin/etcd" "--listen-client-urls=http://0.0.0.0:2379" "--advertise-client-urls=http://0.0.0.0:2379" "--listen-peer-urls=http://0.0.0.0:2380" "--data-dir=/var/data/etcd" "--initial-cluster-token=pach-cluster" "--initial-advertise-peer-urls=http://${ETCD_NAME}.etcd-headless.${NAMESPACE}.svc.cluster.local:2380" "--initial-cluster=etcd-0=http://etcd-0.etcd-headless.${NAMESPACE}.svc.cluster.local:2380" "--auto-compaction-retention=1"',
                ],
                command: [
                  "/bin/sh",
                  "-c",
                ],
                env: [
                  {
                    name: "ETCD_NAME",
                    valueFrom: {
                      fieldRef: {
                        apiVersion: "v1",
                        fieldPath: "metadata.name",
                      },
                    },
                  },
                  {
                    name: "NAMESPACE",
                    valueFrom: {
                      fieldRef: {
                        apiVersion: "v1",
                        fieldPath: "metadata.namespace",
                      },
                    },
                  },
                ],
                image: "pachyderm/etcd:v3.2.7",
                imagePullPolicy: "IfNotPresent",
                name: "etcd",
                ports: [
                  {
                    containerPort: 2379,
                    name: "client-port",
                    protocol: "TCP",
                  },
                  {
                    containerPort: 2380,
                    name: "peer-port",
                    protocol: "TCP",
                  },
                ],
                resources: {
                  requests: {
                    cpu: "1",
                    memory: "2G",
                  },
                },
                terminationMessagePath: "/dev/termination-log",
                terminationMessagePolicy: "File",
                volumeMounts: [
                  {
                    mountPath: "/var/data/etcd",
                    name: "etcd-storage",
                  },
                ],
              },
            ],
            dnsPolicy: "ClusterFirst",
            restartPolicy: "Always",
            schedulerName: "default-scheduler",
            securityContext: {},
            terminationGracePeriodSeconds: 30,
          },
        },
        updateStrategy: {
          type: "OnDelete",
        },
        volumeClaimTemplates: [
          {
            metadata: {
              annotations: {
                "volume.beta.kubernetes.io/storage-class": "etcd-storage-class",
              },
              creationTimestamp: null,
              labels: {
                app: "etcd",
                suite: "pachyderm",
              },
              name: "etcd-storage",
              namespace: "pachyderm",
            },
            spec: {
              accessModes: [
                "ReadWriteOnce",
              ],
              resources: {
                requests: {
                  storage: "100Gi",
                },
              },
            },
          },
        ],
      },
    },  // pachd statefulset


    // A headless service is needed for the etcd statefulset
    etcdHeadlessService:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: etcdName,
          suite: "pachyderm",
        },
        // Keep in sync with service name on the stateful set.
        name: "etcd-headless",
        namespace: namespace,
      },
      spec: {
        clusterIP: "None",
        ports: [
          {
            name: "peer-port",
            port: 2380,
            protocol: "TCP",
            targetPort: 2380,
          },
        ],
        selector: {
          app: etcdName,
        },
        sessionAffinity: "None",
        type: "ClusterIP",
      },
      status: {
        loadBalancer: {},
      },
    },  // etcdHeadless

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
                  if backend == "gcp" then
                    {
                      name: "ETCD_PREFIX",
                    } else {},
                  {
                    name: "STORAGE_BACKEND",
                    value: if backend == "gcp" then
                      "GOOGLE"
                    else "LOCAL",
                  },
                  {
                    name: "STORAGE_HOST_PATH",
                    value: if backend != "gcp" then
                      "/var/pachyderm/pachd"
                    else null,
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

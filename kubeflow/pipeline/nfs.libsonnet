{
  all(namespace, nfsImage):: [
    $.parts(namespace).nfsServerDeployment(nfsImage),
    $.parts(namespace).nfsServerService,
    $.parts(namespace).nfsPv,
    $.parts(namespace).nfsPvc,
  ],
  parts(namespace):: {
    nfsServerDeployment(image): {
      apiVersion: "apps/v1beta2",
      kind: "Deployment",
      metadata: {
        name: "nfs-server",
        namespace: namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            role: "nfs-server",
          },
        },
        template: {
          metadata: {
            labels: {
              role: "nfs-server",
            },
          },
          spec: {
            containers: [
              {
                name: "nfs-server",
                image: image,
                ports: [
                  {
                    name: "nfs",
                    containerPort: 2049,
                  },
                  {
                    name: "mountd",
                    containerPort: 20048,
                  },
                  {
                    name: "rpcbind",
                    containerPort: 111,
                  },
                ],
                securityContext: {
                  privileged: true,
                },
                volumeMounts: [
                  {
                    mountPath: "/exports",
                    name: "nfs-server-pvc",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "nfs-server-pvc",
                persistentVolumeClaim: {
                  claimName: "nfs-server-pvc",
                },
              },
            ],
          },
        },
      },
    }, //nfsServerDeployment

    nfsServerService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "nfs-server",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "nfs",
            port: 2049,
          },
          {
            name: "mountd",
            port: 20048,
          },
          {
            name: "rpcbind",
            port: 111,
          },
        ],
        selector: {
          role: "nfs-server",
        },
      },
    }, //nfsServerService

    nfsPv: {
      apiVersion: "v1",
      kind: "PersistentVolume",
      metadata: {
        name: "nfs-pv",
        namespace: namespace,
      },
      spec: {
        capacity: {
          storage: "20Gi",
        },
        accessModes: [
          "ReadWriteMany",
        ],
        nfs: {
          server: "nfs-server." + namespace + ".svc.cluster.local",
          path: "/",
        },
      },
    }, // nfsPv

    nfsPvc: {
      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        name: "nfs-pvc",
        namespace: namespace,
      },
      spec: {
        accessModes: [
          "ReadWriteMany",
        ],
        storageClassName: "",
        volumeName: "nfs-pv",
        resources: {
          requests: {
            storage: "20Gi"
          },
        },
      },
    }, //nfsPvc
  },
}

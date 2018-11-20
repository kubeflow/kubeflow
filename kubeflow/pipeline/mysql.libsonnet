{
  parts(namespace):: {
    all:: [
      $.parts(namespace).pvc,
      $.parts(namespace).service,
      $.parts(namespace).deploy,
    ],

    pvc: {
      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        name: "mysql-pv-claim",
        namespace: namespace,
      },
      spec: {
        accessModes: [
          "ReadWriteOnce",
        ],
        resources: {
          requests: {
            storage: "10Gi",
          },
        },
      },
    },  //pvc

    service: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "mysql",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            port: 3306,
          },
        ],
        selector: {
          app: "mysql",
        },
      },
      status: {
        loadBalancer: {},
      },
    },  //service

    deploy: {
      apiVersion: "apps/v1beta2",
      kind: "Deployment",
      metadata: {
        name: "mysql",
        namespace: namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "mysql",
          },
        },
        strategy: {
          type: "Recreate",
        },
        template: {
          metadata: {
            labels: {
              app: "mysql",
            },
          },
          spec: {
            containers: [
              {
                image: "mysql:5.6",
                name: "mysql",
                env: [
                  {
                    name: "MYSQL_ALLOW_EMPTY_PASSWORD",
                    value: "true",
                  },
                ],
                ports: [
                  {
                    containerPort: 3306,
                    name: "mysql",
                  },
                ],
                volumeMounts: [
                  {
                    name: "mysql-persistent-storage",
                    mountPath: "/var/lib/mysql",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "mysql-persistent-storage",
                persistentVolumeClaim: {
                  claimName: "mysql-pv-claim",
                },
              },
            ],
          },
        },
      },
    },  //deploy
  },  //parts
}

{
  all(namespace, minioImage, minioPvcName):: [
    $.parts(namespace).service,
    $.parts(namespace).deploy(minioImage, minioPvcName),
    $.parts(namespace).secret,
  ],

  parts(namespace):: {
    service: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "minio-service",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            port: 9000,
            targetPort: 9000,
            protocol: "TCP",
          },
        ],
        selector: {
          app: "minio",
        },
      },
      status: {
        loadBalancer: {},
      },
    },  //service

    deploy(image, minioPvcName): {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "minio",
        namespace: namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "minio",
          },
        },
        strategy: {
          type: "Recreate",
        },
        template: {
          metadata: {
            labels: {
              app: "minio",
            },
          },
          spec: {
            volumes: [
              {
                name: "data",
                persistentVolumeClaim: {
                  claimName: minioPvcName,
                },
              },
            ],
            containers: [
              {
                name: "minio",
                volumeMounts: [
                  {
                    name: "data",
                    mountPath: "/data",
                    subPath: "minio",
                  },
                ],
                image: image,
                args: [
                  "server",
                  "/data",
                ],
                env: [
                  {
                    name: "MINIO_ACCESS_KEY",
                    value: "minio",
                  },
                  {
                    name: "MINIO_SECRET_KEY",
                    value: "minio123",
                  },
                ],
                ports: [
                  {
                    containerPort: 9000,
                  },
                ],
              },
            ],
          },
        },
      },
    },  // deploy

    // The motivation behind the minio secret creation is that argo workflows depend on this secret to
    // store the artifact in minio.
    secret: {
      apiVersion: "v1",
      kind: "Secret",
      metadata: {
        name: "mlpipeline-minio-artifact",
        namespace: namespace,
      },
      type: "Opaque",
      data: {
        accesskey: std.base64("minio"),
        secretkey: std.base64("minio123"),
      },
    },  // secret
  },  // parts
}

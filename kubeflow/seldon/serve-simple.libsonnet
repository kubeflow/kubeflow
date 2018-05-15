{
  parts(namespace):: {

    createPVC(pvcName):: {
      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        name: pvcName,
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
    },  // createPVC

    serve(name, image, replicas, endpoint, pvcName):: {
      apiVersion: "machinelearning.seldon.io/v1alpha1",
      kind: "SeldonDeployment",
      metadata: {
        labels: {
          app: "seldon",
        },
        name: name,
        namespace: namespace,
      },
      spec: {
        annotations: {
          deployment_version: "v1",
          project_name: name,
        },
        name: name,
        predictors: [
          {
            annotations: {
              predictor_version: "v1",
            },
            componentSpec: {
              spec: {
                containers: [
                  {
                    image: image,
                    imagePullPolicy: "Always",
                    name: name,
                    volumeMounts+: if pvcName != "null" && pvcName != "" then [
                      {
                        mountPath: "/mnt",
                        name: "persistent-storage",
                      },
                    ] else [],
                  },
                ],
                terminationGracePeriodSeconds: 1,
                volumes+: if pvcName != "null" && pvcName != "" then [
                  {
                    name: "persistent-storage",
                    volumeSource: {
                      persistentVolumeClaim: {
                        claimName: pvcName,
                      },
                    },
                  },
                ] else [],
              },
            },
            graph: {
              children: [

              ],
              endpoint: {
                type: endpoint,
              },
              name: name,
              type: "MODEL",
            },
            name: name,
            replicas: replicas,
          },
        ],
      },
    },

  },
}

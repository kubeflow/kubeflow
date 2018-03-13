{
  parts(namespace):: {
    serve(name, image, replicas, endpoint):: {
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
                  },
                ],
                terminationGracePeriodSeconds: 1,
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

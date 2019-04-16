{
  all(namespace, uiImage):: [
    $.parts(namespace).serviceAccount,
    $.parts(namespace).serviceUi,
    $.parts(namespace).tensorboardData,
    $.parts(namespace).roleBinding,
    $.parts(namespace).role,
    $.parts(namespace).deployUi(uiImage),
  ],
  parts(namespace):: {
    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "ml-pipeline-ui",
        namespace: namespace,
      },
    },  // service account

    serviceUi: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "ml-pipeline-ui",
        },
        name: "ml-pipeline-ui",
        namespace: namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: pipelineui-mapping",
              "prefix: /pipeline",
              "rewrite: /pipeline",
              "timeout_ms: 300000",
              "service: ml-pipeline-ui." + namespace,
              "use_websocket: true",
            ]),
        },  //annotations
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 3000,
          },
        ],
        selector: {
          app: "ml-pipeline-ui",
        },
      },
      status: {
        loadBalancer: {},
      },
    },  //serviceUi

    tensorboardData: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "ml-pipeline-tensorboard-ui",
        },
        name: "ml-pipeline-tensorboard-ui",
        namespace: namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: pipeline-tensorboard-ui-mapping",
              "prefix: /data",
              "rewrite: /data",
              "timeout_ms: 300000",
              "service: ml-pipeline-ui." + namespace,
              "use_websocket: true",
            ]),
        },  //annotations
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 3000,
          },
        ],
        selector: {
          app: "ml-pipeline-tensorboard-ui",
        },
      },
      status: {
        loadBalancer: {},
      },
    },  //tensorboardData

    roleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        labels: {
          app: "ml-pipeline-ui",
        },
        name: "ml-pipeline-ui",
        namespace: namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "Role",
        name: "ml-pipeline-ui",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "ml-pipeline-ui",
          namespace: namespace,
        },
      ],
    },  // role binding

    role: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        labels: {
          app: "ml-pipeline-ui",
        },
        name: "ml-pipeline-ui",
        namespace: namespace,
      },
      rules: [
        {
          apiGroups: [""],
          resources: [
            "pods",
            "pods/log",
          ],
          verbs: [
            "create",
            "get",
            "list",
          ],
        },
      ],
    },  // role

    deployUi(image): {
      apiVersion: "apps/v1beta2",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "ml-pipeline-ui",
        },
        name: "ml-pipeline-ui",
        namespace: namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "ml-pipeline-ui",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "ml-pipeline-ui",
            },
          },
          spec: {
            containers: [
              {
                name: "ml-pipeline-ui",
                image: image,
                imagePullPolicy: "IfNotPresent",
                ports: [{
                  containerPort: 3000,
                }],
              },
            ],
            serviceAccountName: "ml-pipeline-ui",
          },
        },
      },
    },  // deployUi
  },  // parts
}

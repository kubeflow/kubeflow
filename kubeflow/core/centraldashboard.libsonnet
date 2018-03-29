{
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.

all(params):: [
    $.parts(params.namespace).deployUi,
    $.parts(params.namespace).uiService,
    $.parts(params.namespace).uiServiceAccount,
    $.parts(params.namespace).uiRole,
    $.parts(params.namespace).uiRoleBinding,
  ],

  parts(namespace):: {

    deployUi:: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: namespace,
      },
      spec: {
        template: {
          metadata: {
            labels: {
              name: "tf-job-dashboard",
            },
          },
          spec: {
            containers: [
              {
                image: "swiftdiaries/centraldashboard:0.2",
                name: "centraldashboard",
                ports: [
                  {
                    containerPort: 8082,
                  },
                ],
              },
            ],
            serviceAccountName: "centraldashboard",
          },
        },
      },
    },  // deployUi

    uiService:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: centralui-mapping",
              "prefix: /ui/",
              "rewrite: /ui/",
              "service: centraldashboard." + namespace,
            ]),
        }, //annotations
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 8082,
          },
        ],
        selector: {
          app: "centraldashboard",
        },
        sessionAffinity: "None",
        type: "ClusterIP",
      },
    },  //service

    uiServiceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: namespace,
      },
    },  // service account

    uiRole:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: namespace,
      },
      rules: [
        {
          apiGroups: [""],
          resources: [
            "pods",
            "pods/exec",
            "pods/log",
          ],
          verbs: [
            "get",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [""],
          resources: [
            "secrets",
          ],
          verbs: [
            "get",
          ],
        },
      ],
    },  // operator-role

    uiRoleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "centraldashboard",
        },
        name: "centraldashboard",
        namespace: namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "centraldashboard",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "centraldashboard",
          namespace: namespace,
        },
      ],
    },  // role binding
  },  // parts
}

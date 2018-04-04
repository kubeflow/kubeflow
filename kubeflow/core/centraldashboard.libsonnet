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
        replicas: 1,
        selector: {
          matchLabels: {
            app: "centraldashboard",
          },
        },
        template: {
          metadata: {
            creationTimestamp: null,
            labels: {
              app: "centraldashboard",
            },
          },
          spec: {
            containers: [
              {
                env: [
                  {
                    name: "CENTRALDASHBOARD_NAMESPACE",
                    valueFrom: {
                      fieldRef: {
                        apiVersion: "v1",
                        fieldPath: "metadata.namespace",
                      },
                    },
                  },
                  {
                    name: "IN_CLUSTER",
                    value: "true",
                  },
                ],
                image: "swiftdiaries/centraldashboard:0.1",
                imagePullPolicy: "IfNotPresent",
                name: "centraldashboard",
                resources: {},
                terminationMessagePath: "/dev/termination-log",
                terminationMessagePolicy: "File",
              },
            ],
            dnsPolicy: "ClusterFirst",
            restartPolicy: "Always",
            schedulerName: "default-scheduler",
            securityContext: {},
            serviceAccount: "centraldashboard",
            serviceAccountName: "centraldashboard",
            terminationGracePeriodSeconds: 30,
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
      },
      spec: {
        ports: [
          {
            port: 8082,
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

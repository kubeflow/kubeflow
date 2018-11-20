{
  all(namespace, scheduledWorkflowImage):: [
    $.parts(namespace).serviceAccount,
    $.parts(namespace).roleBinding,
    $.parts(namespace).role,
    $.parts(namespace).deploy(scheduledWorkflowImage),
    $.parts(namespace).crd,
  ],

  parts(namespace):: {
    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "ml-pipeline-scheduledworkflow",
        namespace: namespace,
      },
    },  // service account

    roleBinding:: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: "ml-pipeline-scheduledworkflow",
        },
        name: "ml-pipeline-scheduledworkflow",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        // TODO: These permissions are too broad. This must be fixed.
        name: "cluster-admin",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "ml-pipeline-scheduledworkflow",
          namespace: namespace,
        },
      ],
    },  // role binding

    role: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        labels: {
          app: "ml-pipeline-scheduledworkflow",
        },
        name: "ml-pipeline-scheduledworkflow",
        namespace: namespace,
      },
      rules: [
        {
          apiGroups: [
            "argoproj.io",
          ],
          resources: [
            "workflows",
          ],
          verbs: [
            "create",
            "get",
            "list",
            "watch",
            "update",
            "patch",
            "delete",
          ],
        },
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "scheduledworkflows",
          ],
          verbs: [
            "create",
            "get",
            "list",
            "watch",
            "update",
            "patch",
            "delete",
          ],
        },
      ],
    },  // role

    deploy(image): {
      apiVersion: "apps/v1beta2",
      kind: "Deployment",
      metadata: {
        labels: {
          app: "ml-pipeline-scheduledworkflow",
        },
        name: "ml-pipeline-scheduledworkflow",
        namespace: namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "ml-pipeline-scheduledworkflow",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "ml-pipeline-scheduledworkflow",
            },
          },
          spec: {
            containers: [
              {
                name: "ml-pipeline-scheduledworkflow",
                image: image,
                imagePullPolicy: "Always",
                env: [
                  {
                    name: "POD_NAMESPACE",
                    valueFrom: {
                      fieldRef: {
                        fieldPath: "metadata.namespace",
                      },
                    },
                  },
                ],
              },
            ],
            serviceAccountName: "ml-pipeline-scheduledworkflow",
          },
        },
      },
    },  // deploy
    crd: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "scheduledworkflows.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        names: {
          kind: "ScheduledWorkflow",
          listKind: "ScheduledWorkflowList",
          plural: "scheduledworkflows",
          shortNames: [
            "swf",
          ],
          singular: "scheduledworkflow",
        },
        scope: "Namespaced",
        version: "v1alpha1",
      },
    },  // crd
  },  // parts
}

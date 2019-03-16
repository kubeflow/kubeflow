{
  all(namespace, viewerCrdControllerImage):: [
    $.parts(namespace).serviceAccount,
    $.parts(namespace).roleBinding,
    $.parts(namespace).role,
    $.parts(namespace).deploy(viewerCrdControllerImage),
    $.parts(namespace).crd,
  ],

   parts(namespace):: {
    // Common label for all resources created as part of the Viewer CRD.
    local app_label = "ml-pipeline-viewer-crd",

    local viewer_service_account = "ml-pipeline-viewer-crd-service-account",
    serviceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: viewer_service_account,
        namespace: namespace,
      },
    },  // service account

    // Role capturing permissions needed by the Viewer controller.
    local viewer_controller_role = "ml-pipeline-viewer-controller-role",
    role: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRole",
      metadata: {
        labels: {
          app: app_label,
        },
        name: viewer_controller_role,
      },
      rules: [
        {
          apiGroups: [
            "*",
          ],
          resources: [
            "deployments", "services",
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
            "viewers",
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

     roleBinding: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        labels: {
          app: app_label,
        },
        name: "ml-pipeline-viewer-crd-role-binding",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: viewer_controller_role,
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: viewer_service_account,
          namespace: namespace,
        },
      ],
    },  // role binding

     deploy(image): {
      apiVersion: "apps/v1beta2",
      kind: "Deployment",
      metadata: {
        labels: {
          app: app_label,
        },
        name: "ml-pipeline-viewer-controller-deployment",
        namespace: namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: app_label,
          },
        },
        template: {
          metadata: {
            labels: {
              app: app_label,
            },
          },
          spec: {
            containers: [
              {
                name: "ml-pipeline-viewer-controller",
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
            serviceAccountName: viewer_service_account,
          },
        },
      },
    },  // deploy

     crd: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "viewers.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        versions: [
          {
            name: "v1beta1",
            storage: true,
            served: true,
          },
        ],
        scope: "Namespaced",
        names: {
          kind: "Viewer",
          listKind: "ViewerList",
          singular: "viewer",
          plural: "viewers",
          shortNames: [
            "vi",
          ],
        },
      },
    },  // crd

   },  // parts
}

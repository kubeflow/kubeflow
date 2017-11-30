local k = import "k.libsonnet";

{
  parts:: {
    crd:: {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "chainerjobs.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "chainerjobs",
          singular: "chainerjob",
          kind: "ChainerJob",
          shortNames: [
            "chj",
            "chjs",
            "chjob",
            "chjobs",
          ],
          categories: ["all"],
        },
      },
    },

    clusterRole(name):: {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: name,
      },
      rules: [
        {
          apiGroups: [""],
          resources: [
            "configmaps",
            "serviceaccounts",
          ],
          verbs: [
            "create",
            "update",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [""],
          resources: [
            "pods",
          ],
          verbs: [
            "get",
            "list",
          ],
        },
        {
          apiGroups: [""],
          resources: [
            "pods/exec",
          ],
          verbs: [
            "create",
          ],
        },
        {
          apiGroups: [""],
          resources: [
            "events",
          ],
          verbs: [
            "create",
            "patch",
          ],
        },
        {
          apiGroups: [
            "rbac.authorization.k8s.io",
          ],
          resources: [
            "roles",
            "rolebindings",
          ],
          verbs: [
            "create",
            "update",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [
            "apps",
          ],
          resources: [
            "statefulsets",
          ],
          verbs: [
            "get",
            "create",
            "list",
            "update",
            "watch",
          ],
        },
        {
          apiGroups: [
            "batch",
          ],
          resources: [
            "jobs",
          ],
          verbs: [
            "create",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [
            "apiextensions.k8s.io",
          ],
          resources: [
            "customresourcedefinitions",
          ],
          verbs: [
            "create",
            "get",
          ],
        },
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "chainerjobs",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },

    serviceAccount(namespace, name):: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: name,
        namespace: namespace,
      },
    },

    clusterRoleBinding(namespace, name):: {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1",
      metadata: {
        name: name,
        namespace: namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: name,
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: name,
          namespace: namespace,
        },
      ],
    },

    deploy(namespace, name, image, serviceAccountName, v, stderrthreshold):: {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: name,
        namespace: namespace,
        labels: {
          app: name,
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: name,
          },
        },
        template: {
          metadata: {
            labels: {
              app: name,
            },
          },
          spec: {
            serviceAccountName: serviceAccountName,
            containers: [
              {
                name: "chainer-operator",
                image: image,
                args: [
                  "-v",
                  std.toString(v),
                  "-stderrthreshold",
                  stderrthreshold,
                ],
                imagePullPolicy: "Always",
              },
            ],
          },
        },
      },
    },
  },
}

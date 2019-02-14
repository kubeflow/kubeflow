local k = import "k.libsonnet";

{
  parts:: {

    serviceAccount(name, namespace):: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: name,
        namespace: namespace,
      },
    },  // serviceAccount

    role(name, namespace):: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        name: name,
        namespace: namespace,
      },
      rules: [
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "tfjobs",
            "pytorchjobs",
            "mpijobs",
          ],
          verbs: [
            "*",
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
            "*",
          ],
        },
        {
          apiGroups: [
            "storage.k8s.io",
          ],
          resources: [
            "storageclasses",
          ],
          verbs: [
            "*",
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
            "*",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "configmaps",
            "pods",
            "pods/log",
            "pods/exec",
            "services",
            "endpoints",
            "persistentvolumeclaims",
            "events",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "apps",
            "extensions",
          ],
          resources: [
            "deployments",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },  // role

    roleBinding(name, svcAcctName, roleName, namespace):: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        name: name,
        namespace: namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "Role",
        name: roleName,
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: svcAcctName,
          namespace: namespace,
        },
      ],
    },  // roleBinding
  },
}

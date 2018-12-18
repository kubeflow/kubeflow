{
  local k = import "k.libsonnet",
  new(_env, _params):: {

    local params = _env + _params,

    //Kubebench operator crd
    local kubebenchCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "kubebenchjobs.kubebench.operator",
      },
      spec: {
        group: "kubebench.operator",
        version: "v1",
        names: {
          kind: "KubebenchJob",
          plural: "kubebenchjobs",
        },
        scope: "Namespaced",
      },
    },
    kubebenchCRD:: kubebenchCRD,

    //Kubebench operator deployment
    local deployment = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: params.name,
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: params.name,
          },
        },
        template: {
          metadata: {
            labels: {
              app: params.name,
            },
          },
          spec: {
            containers: [
              {
                name: params.name,
                image: params.image,
              },
            ],
            seviceAccountName: params.name,
          },
        },
      },
    },
    deployment:: deployment,

    //Kubebench operator service account
    local serviceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "default",
        namespace: params.namespace,
      },
    },
    serviceAccount:: serviceAccount,

    //Kubebench operator cluster role
    local clusterRole = {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: params.name,
      },
      rules: [
        {
          apiGroups: [
            "kubebench.operator",
          ],
          resources: [
            "kubebenchjobs.kubebench.operator",
            "kubebenchjobs",
          ],
          verbs: [
            "create",
            "update",
            "get",
            "list",
            "watch",
          ],
        },
        {
          apiGroups: [
            "",
          ],
          resources: [
            "configmaps",
            "pods",
            "pods/exec",
            "services",
            "endpoints",
            "persistentvolumeclaims",
            "events",
            "secrets",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "kubeflow.org",
          ],
          resources: [
            "tfjobs",
            "pytorchjobs",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "argoproj.io",
          ],
          resources: [
            "workflows",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },
    clusterRole:: clusterRole,

    //Kubebench operator cluster role binding
    local clusterRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: params.name,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: params.name,
      },
      subjects:
        [
          {
            kind: "ServiceAccount",
            name: "default",
            namespace: params.namespace,
          },
        ],
    },
    clusterRoleBinding:: clusterRoleBinding,


    all:: [
      self.kubebenchCRD,
      self.deployment,
      self.serviceAccount,
      self.clusterRole,
      self.clusterRoleBinding,
    ],

    //Create Objects
    list(obj=self.all):: k.core.v1.list.new(obj,),

  },
}

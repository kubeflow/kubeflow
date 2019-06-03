{
  local util = import "kubeflow/common/util.libsonnet",

  new(_env, _params):: {
    local params = _env + _params,

    local notebooksCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "notebooks.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Namespaced",
        subresources: {
          status: {},
        },
        names: {
          plural: "notebooks",
          singular: "notebook",
          kind: "Notebook",
        },
      },
      status: {
        acceptedNames: {
          kind: "",
          plural: "",
        },
        conditions: [],
        storedVersions: [],
      },
    },
    notebooksCRD:: notebooksCRD,

    local controllerService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        name: "notebooks-controller",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          app: "notebooks-controller",
        },
        ports: [
          {
            port: 443,
          },
        ],
      },
    },
    controllerService:: controllerService,

    local controllerDeployment = {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "notebooks-controller",
        namespace: params.namespace,
      },
      spec: {
        selector: {
          matchLabels: {
            app: "notebooks-controller",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "notebooks-controller",
            },
          },
          spec: {
            serviceAccountName: "notebook-controller",
            containers: [
              {
                name: "manager",
                image: params.controllerImage,
                imagePullPolicy: "Always",
                command: [
                  "/manager",
                ],
                env: (if util.toBool(params.injectGcpCredentials) then [
                  {
                    name: "POD_LABELS",
                    value: "gcp-cred-secret=user-gcp-sa,gcp-cred-secret-filename=user-gcp-sa.json",
                  },
                ] else []) + (if util.toBool(params.injectIstio) then [
                  {
                    name: "USE_ISTIO",
                    value: "true",
                  },
                ] else []),
              },
            ],
          },
        },
      },
    },
    controllerDeployment:: controllerDeployment,

    local serviceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "notebook-controller",
        },
        name: "notebook-controller",
        namespace: params.namespace,
      },
    },
    serviceAccount:: serviceAccount,

    local role = {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRole",
      metadata: {
        name: "notebooks-controller",
      },
      rules: [
        {
          apiGroups: [
            "apps",
          ],
          resources: [
            "statefulsets",
            "deployments",
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
            "services",
            "pods",
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
            "notebooks",
            "notebooks/status",
          ],
          verbs: [
            "*",
          ],
        },
        {
          apiGroups: [
            "networking.istio.io",
          ],
          resources: [
            "virtualservices",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },
    role:: role,

    local roleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1",
      kind: "ClusterRoleBinding",
      metadata: {
        name: "notebooks-controller",
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "ClusterRole",
        name: "notebooks-controller",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "notebook-controller",
          namespace: params.namespace,
        },
      ],
    },
    roleBinding:: roleBinding,

    parts:: self,
    all:: [
      self.notebooksCRD,
      self.controllerService,
      self.serviceAccount,
      self.controllerDeployment,
      self.role,
      self.roleBinding,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

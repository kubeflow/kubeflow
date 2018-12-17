{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env,

    local knativeBuildLoggingConfigMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "config-logging",
        namespace: params.namespace,
      },
      data: {
        "loglevel.autoscaler": "info",
        "loglevel.controller": "info",
        "loglevel.queueproxy": "info",
        "loglevel.webhook": "info",
        "zap-logger-config": |||
          {
              "level": "info",
              "development": false,
              "sampling": {
                  "initial": 100,
                  "thereafter": 100
              },
              "outputPaths": ["stdout"],
              "errorOutputPaths": ["stderr"],
              "encoding": "json",
              "encoderConfig": {
                  "timeKey": "",
                  "levelKey": "level",
                  "nameKey": "logger",
                  "callerKey": "caller",
                  "messageKey": "msg",
                  "stacktraceKey": "stacktrace",
                  "lineEnding": "",
                  "levelEncoder": "",
                  "timeEncoder": "",
                  "durationEncoder": "",
                  "callerEncoder": ""
              }
          }
        |||,
      },
    },  // knative build logging configmap
    knativeBuildLoggingConfigMap:: knativeBuildLoggingConfigMap,

    local knativeBuildControllerDeployment = {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "build-controller",
        namespace: params.namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "build-controller",
            },
          },
          spec: {
            serviceAccountName: "build-controller",
            containers: [
              {
                image: "gcr.io/build-crd/github.com/knative/build/cmd/controller@sha256:9220968c9aae7e6edac97effc7b693fcf5bbb17edf78aa14347de87b15ac8840",
                name: "build-controller",
                args: [
                  "-builder",
                  "cluster",
                  "-logtostderr",
                  "-stderrthreshold",
                  "INFO",
                  "-creds-image",
                  "gcr.io/build-crd/github.com/knative/build/cmd/creds-init@sha256:cfcc14889abe29b54d17ff6cf414918d9d92ff02bb112525742ec2e30117899f",
                  "-git-image",
                  "gcr.io/build-crd/github.com/knative/build/cmd/git-init@sha256:d52c29a4a1d83712b048bd32dbb5f97b7d2791af9b892f68fe94e162932ac66e",
                ],
              },
            ],
          },
        },
      },
    },  // knative build controller deployment
    knativeBuildControllerDeployment:: knativeBuildControllerDeployment,

    local knativeBuildWebhookDeployment = {
      apiVersion: "apps/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "build-webhook",
        namespace: params.namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "build-webhook",
              role: "build-webhook",
            },
          },
          spec: {
            serviceAccountName: "build-webhook",
            containers: [
              {
                image: "gcr.io/build-crd/github.com/knative/build/cmd/webhook@sha256:a7ed8fb8828f71a6aba3f9f9899eff6c867ceb5a8ceeaed903008c2296f919fb",
                name: "build-webhook",
                args: [
                  "-builder",
                  "cluster",
                  "-logtostderr",
                  "-stderrthreshold",
                  "INFO",
                ],
                volumeMounts: [
                  {
                    name: "config-logging",
                    mountPath: "/etc/config-logging",
                  },
                ],
              },
            ],
            volumes: [
              {
                name: "config-logging",
                configMap: {
                  name: "config-logging",
                  namespace: params.namespace,
                },
              },
            ],
          },
        },
      },
    },  // knative build webhook deployment
    knativeBuildWebhookDeployment:: knativeBuildWebhookDeployment,

    local knativeBuildControllerService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "build-controller",
        },
        name: "build-controller",
        namespace: params.namespace,
      },
      spec: {
        ports: [
          {
            name: "metrics",
            port: 9090,
            protocol: "TCP",
            targetPort: 9090,
          },
        ],
        selector: {
          app: "build-controller",
        },
        type: "ClusterIP",
      },
    },  // knative build controller metrics service
    knativeBuildControllerService:: knativeBuildControllerService,

    local knativeBuildWebhookService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          role: "build-webhook",
        },
        name: "build-webhook",
        namespace: params.namespace,
      },
      spec: {
        ports: [
          {
            port: 443,
            targetPort: 443,
          },
        ],
        selector: {
          role: "build-webhook",
        },
        type: "ClusterIP",
      },
    },  // knative build webhook service
    knativeBuildWebhookService:: knativeBuildWebhookService,

    local knativeBuildCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "builds.build.knative.dev",
      },
      spec: {
        group: "build.knative.dev",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          kind: "Build",
          plural: "builds",
        },
      },
    },  // knative build crd
    knativeBuildCRD:: knativeBuildCRD,

    local knativeBuildTemplateCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "buildtemplates.build.knative.dev",
      },
      spec: {
        group: "build.knative.dev",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          kind: "BuildTemplate",
          plural: "buildtemplates",
        },
      },
    },  // knative build template crd
    knativeBuildTemplateCRD:: knativeBuildTemplateCRD,

    local knativeBuildControllerServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "build-controller",
        namespace: params.namespace,
      },
    },  // knative build controller service account
    knativeBuildControllerServiceAccount:: knativeBuildControllerServiceAccount,

    local knativeBuildControllerRoleBinding = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        labels: {
          app: "knative-build",
        },
        name: "build-controller-admin",
        namespace: params.namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "Role",
        name: "knative-build-admin",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "build-controller",
          namespace: params.namespace,
        },
      ],
    },  // build controller role binding
    knativeBuildControllerRoleBinding:: knativeBuildControllerRoleBinding,


    local knativeBuildRole = {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        labels: {
          app: "knative-build",
        },
        name: "knative-build-admin",
        namespace: params.namespace,
      },
      rules: [
        {
          apiGroups: [""],
          resources: [
            "pods",
            "secrets",
            "events",
            "serviceaccounts",
            "configmaps",
          ],
          verbs: [
            "get",
            "list",
            "create",
            "update",
            "delete",
            "patch",
            "watch",
          ],
        },
        {
          apiGroups: ["extensions"],
          resources: [
            "deployments",
          ],
          verbs: [
            "get",
            "list",
            "create",
            "update",
            "delete",
            "patch",
            "watch",
          ],
        },
        {
          apiGroups: ["admissionregistration.k8s.io"],
          resources: [
            "mutatingwebhookconfigurations",
          ],
          verbs: [
            "get",
            "list",
            "create",
            "update",
            "delete",
            "patch",
            "watch",
          ],
        },
        {
          apiGroups: ["apiextensions.k8s.io"],
          resources: [
            "customresourcedefinitions",
          ],
          verbs: [
            "get",
            "list",
            "create",
            "update",
            "delete",
            "patch",
            "watch",
          ],
        },
        {
          apiGroups: ["build.knative.dev"],
          resources: [
            "builds",
            "buildtemplates",
          ],
          verbs: [
            "get",
            "list",
            "create",
            "update",
            "delete",
            "patch",
            "watch",
          ],
        },
      ],
    },  // role
    knativeBuildRole:: knativeBuildRole,


    all:: [
      self.knativeBuildRole,
      self.knativeBuildControllerServiceAccount,
      self.knativeBuildControllerRoleBinding,
      self.knativeBuildCRD,
      self.knativeBuildTemplateCRD,
      self.knativeBuildControllerService,
      self.knativeBuildWebhookService,
      self.knativeBuildLoggingConfigMap,
      self.knativeBuildControllerDeployment,
      self.knativeBuildWebhookDeployment,
    ],

    list(obj=self.all):: util.list(obj),
  },
}

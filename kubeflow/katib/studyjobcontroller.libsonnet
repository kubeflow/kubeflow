{
  all(params, namespace)::
    $.parts(params, namespace).CRD +
    $.parts(params, namespace).metricsControllerRBAC +
    $.parts(params, namespace).metricsControllerConfigMap +
    $.parts(params, namespace).RBAC +
    $.parts(params, namespace).studyJobController +
    $.parts(params, namespace).workerConfigMap,

  parts(params, namespace):: {
    CRD: [{
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "studyjobs.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        names: {
          kind: "StudyJob",
          singular: "studyjob",
          plural: "studyjobs",
        },
      },
    }],

    metricsControllerRBAC: [
      {
        kind: "ClusterRole",
        apiVersion: "rbac.authorization.k8s.io/v1",
        metadata: {
          name: "metrics-collector",
        },
        rules: [
          {
            apiGroups: [
              "",
            ],
            resources: [
              "pods",
              "pods/log",
              "pods/status",
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
        ],
      },
      {
        apiVersion: "v1",
        kind: "ServiceAccount",
        metadata: {
          name: "metrics-collector",
          namespace: namespace,
        },
      },
      {
        kind: "ClusterRoleBinding",
        apiVersion: "rbac.authorization.k8s.io/v1",
        metadata: {
          name: "metrics-collector",
          namespace: namespace,
        },
        roleRef: {
          apiGroup: "rbac.authorization.k8s.io",
          kind: "ClusterRole",
          name: "metrics-collector",
        },
        subjects: [
          {
            kind: "ServiceAccount",
            name: "metrics-collector",
            namespace: namespace,
          },
        ],
      },
    ],
    metricsControllerConfigMap: [
      {
        apiVersion: "v1",
        kind: "ConfigMap",
        metadata: {
          name: "metricscollector-template",
          namespace: namespace,
        },
        data: {
          "defaultMetricsCollectorTemplate.yaml": |||
            apiVersion: batch/v1beta1
            kind: CronJob
            metadata:
              name: {{.WorkerId}}
              namespace: {{.NameSpace}}  
            spec:
              schedule: "*/1 * * * *"
              successfulJobsHistoryLimit: 1
              failedJobsHistoryLimit: 1
              jobTemplate:
                spec:
                  template:
                    spec:
                      serviceAccountName: metrics-collector
                      containers:
                      - name: {{.WorkerId}}
                        image: katib/metrics-collector
                        args:
                        - "./metricscollector"
                        - "-s"
                        - "{{.StudyId}}"
                        - "-t"
                        - "{{.TrialId}}"
                        - "-w"
                        - "{{.WorkerId}}"
                        - "-n"
                        - "{{.NameSpace}}"
                      restartPolicy: Never
          |||,
        },
      },
    ],
    RBAC: [
      {
        kind: "ClusterRole",
        apiVersion: "rbac.authorization.k8s.io/v1",
        metadata: {
          name: "studyjob-controller",
        },
        rules: [
          {
            apiGroups: [
              "",
            ],
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
            apiGroups: [
              "batch",
            ],
            resources: [
              "jobs",
              "cronjobs",
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
              "create",
              "get",
            ],
          },
          {
            apiGroups: [
              "kubeflow.org",
            ],
            resources: [
              "studyjobs",
            ],
            verbs: [
              "*",
            ],
          },
        ],
      },
      {
        apiVersion: "v1",
        kind: "ServiceAccount",
        metadata: {
          name: "studyjob-controller",
          namespace: namespace,
        },
      },
      {
        kind: "ClusterRoleBinding",
        apiVersion: "rbac.authorization.k8s.io/v1",
        metadata: {
          name: "studyjob-controller",
          namespace: namespace,
        },
        roleRef: {
          apiGroup: "rbac.authorization.k8s.io",
          kind: "ClusterRole",
          name: "studyjob-controller",
        },
        subjects: [
          {
            kind: "ServiceAccount",
            name: "studyjob-controller",
            namespace: namespace,
          },
        ],
      },
    ],
    studyJobController: [
      {
        apiVersion: "extensions/v1beta1",
        kind: "Deployment",
        metadata: {
          name: "studyjob-controller",
          namespace: namespace,
          labels: {
            app: "studyjob-controller",
          },
        },
        spec: {
          replicas: 1,
          selector: {
            matchLabels: {
              app: "studyjob-controller",
            },
          },
          template: {
            metadata: {
              labels: {
                app: "studyjob-controller",
              },
            },
            spec: {
              serviceAccountName: "studyjob-controller",
              containers: [
                {
                  name: "studyjob-controller",
                  image: params.studyJobControllerImage,
                  imagePullPolicy: "Always",
                  volumeMounts: [
                    {
                      name: "worker-template",
                      mountPath: "/worker-template",
                    },
                    {
                      name: "metricscollector-template",
                      mountPath: "/metricscollector-template",
                    },
                  ],
                },
              ],
              volumes: [
                {
                  name: "worker-template",
                  configMap: {
                    name: "worker-template",
                  },
                },
                {
                  name: "metricscollector-template",
                  configMap: {
                    name: "metricscollector-template",
                  },
                },
              ],
            },
          },
        },
      },
    ],
    workerConfigMap: [
      {
        apiVersion: "v1",
        kind: "ConfigMap",
        metadata: {
          name: "worker-template",
          namespace: namespace,
        },
        data: {
          "defaultWorkerTemplate.yaml": |||
            apiVersion: batch/v1
            namespace: %(ns)s
            kind: Job
            metadata:
              name: {{.WorkerId}}
            spec:
              template:
                spec:
                  containers:
                  - name: {{.WorkerId}}
                    image: alpine
                  restartPolicy: Never
          ||| % { ns: namespace },
        },
      },
    ],
  },
}

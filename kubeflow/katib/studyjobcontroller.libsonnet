{
  all(params, namespace)::
    $.parts(params, namespace).CRD +
    $.parts(params, namespace).metricsControllerRBAC +
    $.parts(params, namespace).metricsControllerConfigMap +
    $.parts(params, namespace).RBAC +
    $.parts(params, namespace).studyJobController +
    $.parts(params, namespace).studyJobControllerService +
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
        scope: "Namespaced",
        version: "v1alpha1",
        names: {
          kind: "StudyJob",
          singular: "studyjob",
          plural: "studyjobs",
        },
        additionalPrinterColumns: [
          {
            JSONPath: ".status.condition",
            name: "Condition",
            type: "string",
          },
          {
            JSONPath: ".metadata.creationTimestamp",
            name: "Age",
            type: "date",
          },
        ],
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
              name: {{.WorkerID}}
              namespace: {{.NameSpace}}
            spec:
              schedule: "*/1 * * * *"
              successfulJobsHistoryLimit: 0
              failedJobsHistoryLimit: 1
              jobTemplate:
                spec:
                  backoffLimit: 0
                  template:
                    spec:
                      serviceAccountName: metrics-collector
                      containers:
                      - name: {{.WorkerID}}
                        image: %(mcimage)s
                        args:
                        - "./metricscollector"
                        - "-s"
                        - "{{.StudyID}}"
                        - "-t"
                        - "{{.TrialID}}"
                        - "-w"
                        - "{{.WorkerID}}"
                        - "-k"
                        - "{{.WorkerKind}}"
                        - "-n"
                        - "{{.NameSpace}}"
                        - "-m"
                        - "{{.ManagerSerivce}}"
                      restartPolicy: Never
          ||| % { mcimage: params.metricsCollectorImage },
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
              "services",
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
              "admissionregistration.k8s.io",
            ],
            resources: [
              "validatingwebhookconfigurations",
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
              "studyjobs",
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
    studyJobControllerService: [
      {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: "studyjob-controller",
          namespace: namespace,
        },
        spec: {
          ports: [
            {
              port: 443,
              protocol: "TCP",
            },
          ],
          selector: {
            app: "studyjob-controller"
          },
        },
      },  // studyJobControllerService
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
                  ports: [
                    {
                      name: "validating",
                      containerPort: 443,
                    },
                  ],
                  env: [
                    {
                      name: "VIZIER_CORE_NAMESPACE",
                      valueFrom: {
                        fieldRef: {
                          fieldPath: "metadata.namespace",
                        },
                      },
                    },
                  ],
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
              name: {{.WorkerID}}
            spec:
              template:
                spec:
                  containers:
                  - name: {{.WorkerID}}
                    image: alpine
                  restartPolicy: Never
          ||| % { ns: namespace },
          "cpuWorkerTemplate.yaml": |||
            apiVersion: batch/v1
            kind: Job
            metadata:
              name: {{.WorkerID}}
              namespace: %(ns)s
            spec:
              template:
                spec:
                  containers:
                  - name: {{.WorkerID}}
                    image: katib/mxnet-mnist-example
                    command:
                    - "python"
                    - "/mxnet/example/image-classification/train_mnist.py"
                    - "--batch-size=64"
                    {{- with .HyperParameters}}
                    {{- range .}}
                    - "{{.Name}}={{.Value}}"
                    {{- end}}
                    {{- end}}
                  restartPolicy: Never
          ||| % { ns: namespace },
          "gpuWorkerTemplate.yaml": |||
            apiVersion: batch/v1
            kind: Job
            metadata:
              name: {{.WorkerID}}
              namespace: %(ns)s
            spec:
              template:
                spec:
                  containers:
                  - name: {{.WorkerID}}
                    image: katib/mxnet-mnist-example:gpu
                    command:
                    - "python"
                    - "/mxnet/example/image-classification/train_mnist.py"
                    - "--batch-size=64"
                    {{- with .HyperParameters}}
                    {{- range .}}
                    - "{{.Name}}={{.Value}}"
                    {{- end}}
                    {{- end}}
                    resources:
                      limits:
                        nvidia.com/gpu: 1
                  restartPolicy: Never
          ||| % { ns: namespace },
        },
      },
    ],
  },
}

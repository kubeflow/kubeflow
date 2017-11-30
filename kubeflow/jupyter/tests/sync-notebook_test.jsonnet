local testSuite = import "kubeflow/common/testsuite.libsonnet";
local params = {
  // TODO
  // Most of these will go away since that can be set directly in Notebook.spec.template.spec
  //
  image: "tensorflow-1.10.1-notebook-cpu:v0.3.0",
  useJupyterLabAsDefault: true,
  notebookPVCMount: "/home/jovyan",
  registry: "gcr.io",
  repoName: "kubeflow-images-public",
  notebookUid: "-1",
  notebookGid: "-1",
  serviceType: "ClusterIP",
  targetPort: "8888",
  servicePort: "80",
};

local env = {
  namespace: "kubeflow",
};

local syncNotebook = import "../sync-notebook.jsonnet";

local notebook = {
  apiVersion: "kubeflow.org/v1alpha1",
  kind: "Notebook",
  metadata: {
    name: "training",
    namespace: "resnet50",
  },
  spec: {
    template: {
      spec: {
        ttlSecondsAfterFinished: 300,
        containers: [
          {
            image: params.registry + "/" + params.repoName + "/" + params.image,
            ports: [
              {
                containerPort: params.targetPort,
                name: "notebook-port",
                protocol: "TCP",
              },
            ],
            resources: {
              requests: {
                cpu: "500m",
                memory: "1Gi",
              },
            },
            volumeMounts: [
              {
                mountPath: params.notebookPVCMount,
                name: "volume-training",
              },
            ],
            workingDir: params.notebookPVCMount,
          },
        ],
        securityContext: {
          fsGroup: params.notebookGid,
          runAsUser: params.notebookUid,
        },
        serviceAccountName: "system:serviceaccount:" + env.namespace + ":notebooks",
        volumes: [
          {
            name: "volume-training",
            persistentVolumeClaim: {
              claimName: "claim-training",
            },
          },
        ],
      },
    },
  },
};

local request = {
  controller: {
    metadata: {
      annotations: params + env,
    },
  },
  parent: notebook,
  children: {
    "Pod.v1": {},
    "Service.v1": {},
  },
};

local testCases = [
  {
    actual: syncNotebook(request),
    expected: {
      children: [
        {
          apiVersion: "v1",
          kind: "Service",
          metadata: {
            annotations: {
              "getambassador.io/config": "---\napiVersion: ambassador/v0\nkind:  Mapping\nname: resnet50_training_mapping\nprefix: /resnet50/training\nrewrite: /resnet50/training\ntimeout_ms: 300000\nservice: training.resnet50",
            },
            name: "training",
            namespace: "resnet50",
          },
          spec: {
            ports: [
              {
                port: 80,
                protocol: "TCP",
                targetPort: 8888,
              },
            ],
            selector: {
              app: "training",
            },
            type: "ClusterIP",
          },
        },
        {
          apiVersion: "apps/v1beta1",
          kind: "Deployment",
          metadata: {
            labels: {
              app: "training",
            },
            name: "training",
            namespace: "resnet50",
          },
          spec: {
            replicas: 1,
            template: {
              metadata: {
                labels: {
                  app: "training",
                },
              },
              spec: {
                containers: [
                  {
                    args: [
                      "start.sh",
                      "jupyter",
                      "lab",
                      "--LabApp.token=''",
                      "--LabApp.allow_remote_access='True'",
                      "--LabApp.allow_root='True'",
                      "--LabApp.ip='*'",
                      "--LabApp.base_url=/resnet50/training/",
                      "--port=8888",
                      "--no-browser",
                    ],
                    env: [
                      {
                        name: "JUPYTER_ENABLE_LAB",
                        value: "true",
                      },
                    ],
                    image: "gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.3.0",
                    imagePullPolicy: "IfNotPresent",
                    name: "notebook",
                    ports: [
                      {
                        containerPort: 8888,
                        name: "notebook-port",
                        protocol: "TCP",
                      },
                    ],
                    resources: {
                      requests: {
                        cpu: "500m",
                        memory: "1Gi",
                      },
                    },
                    volumeMounts: [
                      {
                        mountPath: "/home/jovyan",
                        name: "volume-training",
                      },
                    ],
                    workingDir: "/home/jovyan",
                  },
                ],
              },
            },
          },
        },
      ],
      status: {
        conditions: [
          {
            type: "Ready",
          },
        ],
        created: true,
        phase: "Active",
      },
    },
  },
];

testSuite.run(testCases)

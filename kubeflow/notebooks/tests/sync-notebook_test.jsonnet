local params = {
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
    namespace: env.namespace,
    annotations: env + params,
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
        serviceAccountName: "notebooks",
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
  parent: notebook,
  children: {
    "Pod.v1": {},
    "Service.v1": {},
  },
};

std.assertEqual(
  syncNotebook(request),
  {
    children: [
      {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          annotations: {
            "getambassador.io/config": "---\napiVersion: ambassador/v0\nkind:  Mapping\nname: kubeflow_training_mapping\nprefix: /kubeflow/training\nrewrite: /kubeflow/training\ntimeout_ms: 300000\nservice: training.kubeflow",
          },
          name: "training",
          namespace: "kubeflow",
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
        apiVersion: "v1",
        kind: "Pod",
        metadata: {
          labels: {
            app: "training",
          },
          name: "training",
          namespace: "kubeflow",
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
                "--LabApp.base_url=/kubeflow/training/",
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
              workingDir: "/home/jovyan",
            },
          ],
          restartPolicy: "Always",
          securityContext: {
            fsGroup: "-1",
            runAsUser: "-1",
          },
          ttlSecondsAfterFinished: 300,
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
  }
)

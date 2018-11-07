local params = {
  disks: "null",
  image: "tensorflow-1.10.1-notebook-cpu:v0.3.0",
  useJupyterLabAsDefault: true,
  notebookPVCMount: "/home/jovyan",
  registry: "gcr.io",
  repoName: "kubeflow-images-public",
  notebookUid: "-1",
  notebookGid: "-1",
  accessLocalFs: "false",
  owner: "foo",
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
    name: "notebook",
    namespace: env.namespace,
    annotations: env + params,
  },
  spec: {
    template: {
      metadata: {
        name: "notebook",
        namespace: "kf-200",
      },
      spec: {
        ttlSecondsAfterFinished: 300,
        containers: [
          {
            args: [
              "start-singleuser.sh",
              "--ip='0.0.0.0'",
              "--port=" + params.targetPort,
              "--allow-root",
            ],
            env: [
              {
                name: "JUPYTER_ENABLE_LAB",
                value: "true",
              },
            ],
            image: params.registry + "/" + params.repoName + "/" + params.image,
            imagePullPolicy: "IfNotPresent",
            name: "notebook",
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
        restartPolicy: "Always",
        schedulerName: "default-scheduler",
        securityContext: {
          fsGroup: 100,
          runAsUser: 1000,
        },
        serviceAccount: "jupyter-notebook",
        serviceAccountName: "jupyter-notebook",
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
            "getambassador.io/config": "---\napiVersion: ambassador/v0\nkind:  Mapping\nname: notebook_mapping\nprefix: /notebook\nrewrite: /notebook\ntimeout_ms: 300000\nservice: notebook.kf-200",
          },
          name: "notebook",
          namespace: "kf-200",
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
            app: "notebook",
          },
          type: "ClusterIP",
        },
      },
      {
        apiVersion: "v1",
        kind: "Pod",
        metadata: {
          name: "notebook",
          namespace: "kf-200",
        },
        spec: {
          containers: [
            {
              args: [
                "start-singleuser.sh",
                "--ip='0.0.0.0'",
                "--port=8888",
                "--allow-root",
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
                  containerPort: "8888",
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
          restartPolicy: "Always",
          schedulerName: "default-scheduler",
          securityContext: {
            fsGroup: 100,
            runAsUser: 1000,
          },
          serviceAccount: "jupyter-notebook",
          serviceAccountName: "jupyter-notebook",
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

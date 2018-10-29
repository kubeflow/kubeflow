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
        containers: [
          {
            args: [
              "start-singleuser.sh",
              "--ip='0.0.0.0'",
              "--port=" + params.targetPort,
              "--allow-root",
            ],
            env: [
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
                name: "volume-kam",
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
            name: "volume-kam",
            persistentVolumeClaim: {
              claimName: "claim-kam",
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

local syncNotebook = import "../sync-notebook.jsonnet";

std.assertEqual(
  syncNotebook(request),
  {
    children: [
      {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          annotations: {
            "getambassador.io/config": "---\napiVersion: ambassador/v0\nkind:  Mapping\nname: notebook-mapping\nprefix: /user/\nrewrite: /user/\ntimeout_ms: 300000\nservice: notebook.kf-200",
          },
          labels: {
            app: "notebook",
          },
          name: "notebook",
          namespace: "kf-200",
        },
        spec: {
          ports: [
            {
              port: 80,
              protocol: "TCP",
              targetPort: 8082,
            },
          ],
          selector: {
            app: "notebook",
          },
          sessionAffinity: "None",
          type: "ClusterIP",
        },
      },
      {
        apiVersion: "v1",
        kind: "Pod",
        metadata: {
          labels: {
            component: "singleuser-server",
          },
          name: "notebook",
          namespace: "kf-200",
        },
        spec: {
          containers: [
            {
              args: [
                "start-singleuser.sh",
                '--ip="0.0.0.0"',
                "--port=8888",
                "--allow-root",
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
                  name: "volume-kam",
                },
              ],
              workingDir: "/home/jovyan",
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

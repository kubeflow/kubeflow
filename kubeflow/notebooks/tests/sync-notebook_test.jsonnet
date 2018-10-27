local params = {
  disks: "null",
  image: "gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1",
  useJupyterLabAsDefault: true,
  notebookPVCMount: "/home/jovyan",
  registry: "gcr.io",
  repoName: "kubeflow-images-public",
  notebookUid: "-1",
  notebookGid: "-1",
  accessLocalFs: "false",
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
              '--ip="0.0.0.0"',
              "--port=8888",
              "--allow-root",
            ],
            env: [
              {
                name: "JUPYTERHUB_API_TOKEN",
                value: "ce5d75d8b88243e280898baa677fec35",
              },
              {
                name: "JPY_API_TOKEN",
                value: "ce5d75d8b88243e280898baa677fec35",
              },
              {
                name: "JUPYTERHUB_CLIENT_ID",
                value: "jupyterhub-user-kam",
              },
              {
                name: "JUPYTERHUB_HOST",
              },
              {
                name: "JUPYTERHUB_OAUTH_CALLBACK_URL",
                value: "/user/kam/oauth_callback",
              },
              {
                name: "JUPYTERHUB_USER",
                value: "kam",
              },
              {
                name: "JUPYTERHUB_API_URL",
                value: "http://jupyterhub-0:8081/hub/api",
              },
              {
                name: "JUPYTERHUB_BASE_URL",
                value: "/",
              },
              {
                name: "JUPYTERHUB_SERVICE_PREFIX",
                value: "/user/kam/",
              },
              {
                name: "MEM_GUARANTEE",
                value: "1Gi",
              },
              {
                name: "CPU_GUARANTEE",
                value: "500m",
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
                name: "volume-kam",
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
              image: "gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1",
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

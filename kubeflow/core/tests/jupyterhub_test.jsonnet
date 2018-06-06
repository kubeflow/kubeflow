local jupyterhub = import "../jupyterhub.libsonnet";
local params = {
  namespace:: "test-kf-001",
  disks:: "disk01,disk02",
  jupyterHubAuthenticator:: null,
  jupyterHubServiceType:: "ClusterIP",
  jupyterHubImage: "gcr.io/kubeflow/jupyterhub-k8s:1.0.1",
  jupyterNotebookPVCMount: "/home/jovyan",
  jupyterNotebookRegistry: "gcr.io",
  jupyterNotebookRepoName: "kubeflow-images-public",
  cloud: null,
};

local baseSpawner = importstr "../kubeform_spawner.py";

// TODO(jlewi): We should be able to use std.startsWidth in later versions of jsonnet.
//
local config = jupyterhub.parts(params.namespace).jupyterHubConfigMap(params.jupyterHubAuthenticator, params.disks).data["jupyterhub_config.py"];
local configPrefix = std.substr(config, 0, std.length(baseSpawner));
local configSuffix = std.substr(config, std.length(baseSpawner), std.length(config) - std.length(baseSpawner));
local configSuffixLines = std.split(configSuffix, "\n");

// This assertion varies the config map is the same after zeroing the actual data.
// The data will be compared in subsequent steps.
std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubConfigMap(params.jupyterHubAuthenticator, params.disks) + {
  data: {
    "jupyterhub_config.py": "",
  },
}
                , {
  apiVersion: "v1",
  data: {
    "jupyterhub_config.py": "",
  },
  kind: "ConfigMap",
  metadata: {
    name: "jupyterhub-config",
    namespace: "test-kf-001",
  },
}) &&

// This step verifies that the start of the spawner config is the raw file.
std.assertEqual(configPrefix, baseSpawner)

&&

// These step verifies the suffix.
// Verifying each line makes it much easier to debug test failures because if you just compare to a big blob
// of text its much harder to know where they differ.
std.assertEqual(configSuffixLines[1], "######## Authenticator ######")
&&
std.assertEqual(configSuffixLines[2], "c.JupyterHub.authenticator_class = 'dummyauthenticator.DummyAuthenticator'")
&&
std.assertEqual(configSuffixLines[3], "###### Volumes #######")
&&
std.assertEqual(configSuffixLines[4], 'c.KubeSpawner.volumes.extend([{"name": "disk01", "persistentVolumeClaim": {"claimName": "disk01"}}, {"name": "disk02", "persistentVolumeClaim": {"claimName": "disk02"}}])')
&&
std.assertEqual(configSuffixLines[5], 'c.KubeSpawner.volume_mounts.extend([{"mountPath": "/mnt/disk01", "name": "disk01"}, {"mountPath": "/mnt/disk02", "name": "disk02"}])')
&&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubService,
                {
                  apiVersion: "v1",
                  kind: "Service",
                  metadata: {
                    labels: {
                      app: "tf-hub",
                    },
                    name: "tf-hub-0",
                    namespace: "test-kf-001",
                  },
                  spec: {
                    clusterIP: "None",
                    ports: [
                      {
                        name: "hub",
                        port: 8000,
                      },
                    ],
                    selector: {
                      app: "tf-hub",
                    },
                  },
                }) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubLoadBalancer(params.jupyterHubServiceType),
                {
                  apiVersion: "v1",
                  kind: "Service",
                  metadata: {
                    labels: {
                      app: "tf-hub-lb",
                    },
                    name: "tf-hub-lb",
                    namespace: "test-kf-001",
                    annotations: {
                      "getambassador.io/config":
                        std.join("\n", [
                          "---",
                          "apiVersion: ambassador/v0",
                          "kind:  Mapping",
                          "name: tf-hub-lb-hub-mapping",
                          "prefix: /hub/",
                          "rewrite: /hub/",
                          "timeout_ms: 300000",
                          "service: tf-hub-lb." + params.namespace,
                          "---",
                          "apiVersion: ambassador/v0",
                          "kind:  Mapping",
                          "name: tf-hub-lb-user-mapping",
                          "prefix: /user/",
                          "rewrite: /user/",
                          "timeout_ms: 300000",
                          "service: tf-hub-lb." + params.namespace,
                        ]),
                    },  //annotations
                  },
                  spec: {
                    ports: [
                      {
                        name: "hub",
                        port: 80,
                        targetPort: 8000,
                      },
                    ],
                    selector: {
                      app: "tf-hub",
                    },
                    type: "ClusterIP",
                  },
                }) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHub(params.jupyterHubImage, params.jupyterNotebookPVCMount, params.cloud, params.jupyterNotebookRegistry, params.jupyterNotebookRepoName),
                {
                  apiVersion: "apps/v1beta1",
                  kind: "StatefulSet",
                  metadata: {
                    name: "tf-hub",
                    namespace: "test-kf-001",
                  },
                  spec: {
                    replicas: 1,
                    serviceName: "",
                    template: {
                      metadata: {
                        labels: {
                          app: "tf-hub",
                        },
                      },
                      spec: {
                        containers: [
                          {
                            command: [
                              "jupyterhub",
                              "-f",
                              "/etc/config/jupyterhub_config.py",
                            ],
                            env: [
                              {
                                name: "NOTEBOOK_PVC_MOUNT",
                                value: params.jupyterNotebookPVCMount,
                              },
                              {
                                name: "CLOUD_NAME",
                                value: null,
                              },
                              {
                                name: "REGISTRY",
                                value: params.jupyterNotebookRegistry,
                              },
                              {
                                name: "REPO_NAME",
                                value: params.jupyterNotebookRepoName,
                              },
                            ],
                            image: "gcr.io/kubeflow/jupyterhub-k8s:1.0.1",
                            name: "tf-hub",
                            ports: [
                              {
                                containerPort: 8000,
                              },
                              {
                                containerPort: 8081,
                              },
                            ],
                            volumeMounts: [
                              {
                                mountPath: "/etc/config",
                                name: "config-volume",
                              },
                            ],
                          },
                        ],
                        serviceAccountName: "jupyter-hub",
                        volumes: [
                          {
                            configMap: {
                              name: "jupyterhub-config",
                            },
                            name: "config-volume",
                          },
                        ],
                      },
                    },
                    updateStrategy: {
                      type: "RollingUpdate",
                    },
                  },
                }) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubRole,
                {
                  apiVersion: "rbac.authorization.k8s.io/v1beta1",
                  kind: "Role",
                  metadata: {
                    name: "jupyter-role",
                    namespace: "test-kf-001",
                  },
                  rules: [
                    {
                      apiGroups: [
                        "*",
                      ],
                      resources: [
                        "pods",
                        "persistentvolumeclaims",
                      ],
                      verbs: [
                        "get",
                        "watch",
                        "list",
                        "create",
                        "delete",
                      ],
                    },
                    {
                      apiGroups: [
                        "*",
                      ],
                      resources: [
                        "events",
                      ],
                      verbs: [
                        "get",
                        "watch",
                        "list",
                      ],
                    },
                  ],
                }) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubServiceAccount,
                {
                  apiVersion: "v1",
                  kind: "ServiceAccount",
                  metadata: {
                    labels: {
                      app: "jupyter-hub",
                    },
                    name: "jupyter-hub",
                    namespace: "test-kf-001",
                  },
                }) &&

std.assertEqual(jupyterhub.parts(params.namespace).jupyterHubRoleBinding,
                {
                  apiVersion: "rbac.authorization.k8s.io/v1beta1",
                  kind: "RoleBinding",
                  metadata: {
                    name: "jupyter-role",
                    namespace: "test-kf-001",
                  },
                  roleRef: {
                    apiGroup: "rbac.authorization.k8s.io",
                    kind: "Role",
                    name: "jupyter-role",
                  },
                  subjects: [
                    {
                      kind: "ServiceAccount",
                      name: "jupyter-hub",
                      namespace: "test-kf-001",
                    },
                  ],
                })

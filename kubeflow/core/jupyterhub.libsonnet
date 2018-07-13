{
  all(params):: [
    $.parts(params.namespace).jupyterHubConfigMap(),
    $.parts(params.namespace).jupyterHubService,
    $.parts(params.namespace).jupyterHubLoadBalancer(params.jupyterHubServiceType),
    $.parts(params.namespace).jupyterHub(params.jupyterHubImage, params.jupyterNotebookPVCMount, params.cloud, params.jupyterNotebookRegistry, params.jupyterNotebookRepoName, params.jupyterHubAuthenticator, params.disks, params.gcpSecretName),
    $.parts(params.namespace).jupyterHubRole,
    $.parts(params.namespace).jupyterHubServiceAccount,
    $.parts(params.namespace).jupyterHubRoleBinding,
    $.parts(params.namespace).jupyterNotebookRole,
    $.parts(params.namespace).jupyterNotebookServiceAccount,
    $.parts(params.namespace).jupyterNotebookRoleBinding,
  ],

  parts(namespace):: {
    jupyterHubConfigMap(): {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "jupyterhub-config",
        namespace: namespace,
      },
      data: {
        "jupyterhub_config.py": importstr "kubeform_spawner.py",
      },
    },

    jupyterHubService: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "tf-hub",
        },
        name: "tf-hub-0",
        namespace: namespace,
      },
      spec: {
        // We want a headless service so we set the ClusterIP to be None.
        // This headless server is used by individual Jupyter pods to connect back to the Hub.
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
    },

    jupyterHubLoadBalancer(serviceType): {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "tf-hub-lb",
        },
        name: "tf-hub-lb",
        namespace: namespace,
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
              "service: tf-hub-lb." + namespace,
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: tf-hub-lb-user-mapping",
              "prefix: /user/",
              "rewrite: /user/",
              "timeout_ms: 300000",
              "service: tf-hub-lb." + namespace,
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
        type: serviceType,
      },
    },

    // image: Image for JupyterHub
    jupyterHub(image, notebookPVCMount, cloud, registry, repoName, jupyterHubAuthenticator, disks, gcpSecretName): {
      apiVersion: "apps/v1beta1",
      kind: "StatefulSet",
      metadata: {
        name: "tf-hub",
        namespace: namespace,
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
                //command: [
                //  "jupyterhub",
                //  "-f",
                //  "/etc/config/jupyterhub_config.py",
                //],
                command: [
                  "/bin/bash", 
                  "-c", 
                  "trap : TERM INT; sleep infinity & wait",
                ],
                image: image,
                name: "tf-hub",
                volumeMounts: [
                  {
                    mountPath: "/etc/config",
                    name: "config-volume",
                  },
                ],
                ports: [
                  // Port 8000 is used by the hub to accept incoming requests.
                  {
                    containerPort: 8000,
                  },
                  // Port 8081 accepts callbacks from the individual Jupyter pods.
                  {
                    containerPort: 8081,
                  },
                ],
                env: [
                  {
                    name: "NOTEBOOK_PVC_MOUNT",
                    value: notebookPVCMount,
                  },
                  {
                    name: "CLOUD_NAME",
                    value: cloud,
                  },
                  {
                    name: "REGISTRY",
                    value: registry,
                  },
                  {
                    name: "REPO_NAME",
                    value: repoName,
                  },
                  {
                    name: "KF_AUTHENTICATOR",
                    value: jupyterHubAuthenticator,
                  },
                  {
                    name: "KF_PVC_LIST",
                    value: disks,
                  },
                  if cloud == "gke" then
                    {
                      name: "GCP_SECRET_NAME",
                      value: gcpSecretName,
                    },
                ],
              },  // jupyterHub container
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
    },

    // contents based on https://github.com/jupyterhub/zero-to-jupyterhub-k8s/blob/master/jupyterhub/templates/hub/rbac.yaml
    jupyterHubRole: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        name: "jupyter-role",
        namespace: namespace,
      },
      rules: [
        {
          apiGroups: [
            "",
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
            "",
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
    },
    jupyterNotebookRole: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "Role",
      metadata: {
        name: "jupyter-notebook-role",
        namespace: namespace,
      },
      rules: [
        {
          apiGroups: [
            "",
          ],
          resources: [
            "pods",
            "deployments",
            "services",
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
            "kubeflow.org",
          ],
          resources: [
            "*",
          ],
          verbs: [
            "*",
          ],
        },
      ],
    },

    jupyterHubServiceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        labels: {
          app: "jupyter-hub",
        },
        name: "jupyter-hub",
        namespace: namespace,
      },
    },
    jupyterNotebookServiceAccount: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "jupyter-notebook",
        namespace: namespace,
      },
    },

    jupyterHubRoleBinding: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        name: "jupyter-role",
        namespace: namespace,
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
          namespace: namespace,
        },
      ],
    },
    jupyterNotebookRoleBinding: {
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      kind: "RoleBinding",
      metadata: {
        name: "jupyter-notebook-role",
        namespace: namespace,
      },
      roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: "Role",
        name: "jupyter-notebook-role",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "jupyter-notebook",
          namespace: namespace,
        },
      ],
    },
  },  // parts
}

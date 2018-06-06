{
  all(params):: [
    $.parts(params.namespace).jupyterHubConfigMap(params.jupyterHubAuthenticator, params.disks),
    $.parts(params.namespace).jupyterHubService,
    $.parts(params.namespace).jupyterHubLoadBalancer(params.jupyterHubServiceType),
    $.parts(params.namespace).jupyterHub(params.jupyterHubImage, params.jupyterNotebookPVCMount, params.cloud, params.jupyterNotebookRegistry, params.jupyterNotebookRepoName),
    $.parts(params.namespace).jupyterHubRole,
    $.parts(params.namespace).jupyterHubServiceAccount,
    $.parts(params.namespace).jupyterHubRoleBinding,
  ],

  parts(namespace):: {
    jupyterHubConfigMap(jupyterHubAuthenticator, disks): {
      local util = import "kubeflow/core/util.libsonnet",
      local diskNames = util.toArray(disks),
      local kubeSpawner = $.parts(namespace).kubeSpawner(jupyterHubAuthenticator, diskNames),
      result:: $.parts(namespace).jupyterHubConfigMapWithSpawner(kubeSpawner),
    }.result,

    kubeSpawner(authenticator, volumeClaims=[]): {
      // TODO(jlewi): We should make whether we use PVC configurable.
      local baseKubeConfigSpawner = importstr "kubeform_spawner.py",

      authenticatorOptions:: {

        //## Authenticator Options
        local kubeConfigDummyAuthenticator = "c.JupyterHub.authenticator_class = 'dummyauthenticator.DummyAuthenticator'",

        // This configuration allows us to use the id provided by IAP.
        local kubeConfigIAPAuthenticator = @"c.JupyterHub.authenticator_class ='jhub_remote_user_authenticator.remote_user_auth.RemoteUserAuthenticator'
c.RemoteUserAuthenticator.header_name = 'x-goog-authenticated-user-email'",

        options:: std.join("\n", std.prune([
          "######## Authenticator ######",
          if authenticator == "iap" then
            kubeConfigIAPAuthenticator else
            kubeConfigDummyAuthenticator,
        ])),
      }.options,  // authenticatorOptions

      volumeOptions:: {
        local volumes = std.map(function(v)
          {
            name: v,
            persistentVolumeClaim: {
              claimName: v,
            },
          }, volumeClaims),


        local volumeMounts = std.map(function(v)
          {
            mountPath: "/mnt/" + v,
            name: v,
          }, volumeClaims),

        options::
          if std.length(volumeClaims) > 0 then
            // we need to merge the PVC from the spawner config
            // with any added by a provisioner
            std.join("\n",
                     [
                       "###### Volumes #######",
                       "c.KubeSpawner.volumes.extend(" + std.manifestPython(volumes) + ")",
                       "c.KubeSpawner.volume_mounts.extend(" + std.manifestPython(volumeMounts) + ")",
                     ])
          else "",

      }.options,  // volumeOptions

      spawner:: std.join("\n", std.prune([baseKubeConfigSpawner, self.authenticatorOptions, self.volumeOptions])),
    }.spawner,  // kubeSpawner

    local baseJupyterHubConfigMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "jupyterhub-config",
        namespace: namespace,
      },
    },

    jupyterHubConfigMapWithSpawner(spawner): baseJupyterHubConfigMap {
      data: {
        "jupyterhub_config.py": spawner,
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
    jupyterHub(image, notebookPVCMount, cloud, registry, repoName): {
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
                command: [
                  "jupyterhub",
                  "-f",
                  "/etc/config/jupyterhub_config.py",
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
  },  // parts
}

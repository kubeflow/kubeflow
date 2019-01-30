{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env {
      disableJwtChecking: util.toBool(_params.disableJwtChecking),
      hostname: if std.objectHas(_params, "hostname") then _params.hostname else "null",
    },

    // Test if the given hostname is in the form of: "NAME.endpoints.PROJECT.cloud.goog"
    local isCloudEndpoint(str) = {
      local toks = if std.type(str) == "null" then [] else std.split(str, "."),
      result::
        (std.length(toks) == 5 && toks[1] == "endpoints" && toks[3] == "cloud" && toks[4] == "goog"),
    }.result,

    local initServiceAccount = {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "envoy",
        namespace: params.istioNamespace,
      },
    },  // initServiceAccount
    initServiceAccount:: initServiceAccount,

    local initClusterRoleBinding = {
      kind: "ClusterRoleBinding",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "envoy",
      },
      subjects: [
        {
          kind: "ServiceAccount",
          name: "envoy",
          namespace: params.istioNamespace,
        },
      ],
      roleRef: {
        kind: "ClusterRole",
        name: "envoy",
        apiGroup: "rbac.authorization.k8s.io",
      },
    },  // initClusterRoleBinding
    initClusterRoleBinding:: initClusterRoleBinding,

    local initClusterRole = {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "envoy",
      },
      rules: [
        {
          apiGroups: [""],
          resources: ["services", "configmaps", "secrets"],
          verbs: ["get", "list", "patch", "update"],
        },
        {
          apiGroups: ["extensions"],
          resources: ["ingresses"],
          verbs: ["get", "list", "update", "patch"],
        },
        {
          apiGroups: ["authentication.istio.io"],
          resources: ["policies"],
          verbs: ["*"],
        },
        {
          apiGroups: ["networking.istio.io"],
          resources: ["gateways", "virtualservices"],
          verbs: ["*"],
        },
      ],
    },  // initClusterRoleBinding
    initClusterRole:: initClusterRole,

    // Run the process to update the backend service
    local backendUpdater = {
      apiVersion: "apps/v1",
      kind: "StatefulSet",
      metadata: {
        name: "backend-updater",
        namespace: params.istioNamespace,
        labels: {
          service: "backend-updater",
        },
      },
      spec: {
        selector: {
          matchLabels: {
            service: "backend-updater",
          },
        },
        template: {
          metadata: {
            labels: {
              service: "backend-updater",
            },
          },
          spec: {
            serviceAccountName: "envoy",
            containers: [
              {
                name: "backend-updater",
                image: params.ingressSetupImage,
                command: [
                  "bash",
                  "/var/envoy-config/update_backend.sh",
                ],
                env: [
                  {
                    name: "NAMESPACE",
                    value: params.istioNamespace,
                  },
                  {
                    name: "SERVICE",
                    value: "istio-ingressgateway",
                  },
                  {
                    name: "GOOGLE_APPLICATION_CREDENTIALS",
                    value: "/var/run/secrets/sa/admin-gcp-sa.json",
                  },
                ],
                volumeMounts: [
                  {
                    mountPath: "/var/envoy-config/",
                    name: "config-volume",
                  },
                  {
                    name: "sa-key",
                    readOnly: true,
                    mountPath: "/var/run/secrets/sa",
                  },
                ],
              },
            ],
            volumes: [
              {
                configMap: {
                  name: "envoy-config",
                },
                name: "config-volume",
              },
              {
                name: "sa-key",
                secret: {
                  secretName: "admin-gcp-sa",
                },
              },
            ],
          },
        },
      },
    },  // backendUpdater
    backendUpdater:: backendUpdater,

    // Run the process to enable iap
    local iapEnabler = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "iap-enabler",
        namespace: params.istioNamespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              service: "iap-enabler",
            },
          },
          spec: {
            serviceAccountName: "envoy",
            containers: [
              {
                name: "iap",
                image: params.ingressSetupImage,
                command: [
                  "bash",
                  "/var/envoy-config/setup_backend.sh",
                ],
                env: [
                  {
                    name: "NAMESPACE",
                    value: params.istioNamespace,
                  },
                  {
                    name: "SERVICE",
                    value: "istio-ingressgateway",
                  },
                  {
                    name: "GOOGLE_APPLICATION_CREDENTIALS",
                    value: "/var/run/secrets/sa/admin-gcp-sa.json",
                  },
                ],
                volumeMounts: [
                  {
                    mountPath: "/var/envoy-config/",
                    name: "config-volume",
                  },
                  {
                    name: "sa-key",
                    readOnly: true,
                    mountPath: "/var/run/secrets/sa",
                  },
                ],
              },
            ],
            restartPolicy: "Always",
            volumes: [
              {
                configMap: {
                  name: "envoy-config",
                },
                name: "config-volume",
              },
              {
                name: "sa-key",
                secret: {
                  secretName: "admin-gcp-sa",
                },
              },
            ],
          },
        },
      },
    },  // iapEnabler
    iapEnabler:: iapEnabler,

    local configMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "envoy-config",
        namespace: params.istioNamespace,
      },
      data: {
        "setup_backend.sh": importstr "setup_backend.sh",
        "update_backend.sh": importstr "update_backend.sh",
        "jwt-policy-template.yaml": importstr "jwt-policy-template.yaml",
      },
    },
    configMap:: configMap,

    local whoamiService = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "whoami",
        },
        name: "whoami-app",
        namespace: params.namespace,
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 8081,
          },
        ],
        selector: {
          app: "whoami",
        },
        type: "ClusterIP",
      },
    },  // whoamiService
    whoamiService:: whoamiService,

    local whoamiApp = {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "whoami-app",
        namespace: params.namespace,
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: "whoami",
            },
          },
          spec: {
            containers: [
              {
                env: [
                  {
                    name: "PORT",
                    value: "8081",
                  },
                ],
                image: "gcr.io/cloud-solutions-group/esp-sample-app:1.0.0",
                name: "app",
                ports: [
                  {
                    containerPort: 8081,
                  },
                ],
                readinessProbe: {
                  failureThreshold: 2,
                  httpGet: {
                    path: "/healthz",
                    port: 8081,
                    scheme: "HTTP",
                  },
                  periodSeconds: 10,
                  successThreshold: 1,
                  timeoutSeconds: 5,
                },
              },
            ],
          },
        },
      },
    },
    whoamiApp:: whoamiApp,

    local backendConfig = {
      apiVersion: "cloud.google.com/v1beta1",
      kind: "BackendConfig",
      metadata: {
        name: "envoy-iap",
        namespace: params.istioNamespace,
      },
      spec: {
        iap: {
          enabled: true,
          oauthclientCredentials: {
            secretName: params.oauthSecretName,
          },
        },
      },
    },  // backendConfig
    backendConfig:: backendConfig,

    // TODO(danisla): Remove afer https://github.com/kubernetes/ingress-gce/pull/388 is resolved per #1327.
    local ingressBootstrapConfigMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "ingress-bootstrap-config",
        namespace: params.namespace,
      },
      data: {
        "ingress_bootstrap.sh": importstr "ingress_bootstrap.sh",
      },
    },
    ingressBootstrapConfigMap:: ingressBootstrapConfigMap,

    local ingressBootstrapJob = {
      apiVersion: "batch/v1",
      kind: "Job",
      metadata: {
        name: "ingress-bootstrap",
        namespace: params.namespace,
      },
      spec: {
        template: {
          spec: {
            restartPolicy: "OnFailure",
            serviceAccountName: "envoy",
            containers: [
              {
                name: "bootstrap",
                image: params.ingressSetupImage,
                command: ["/var/ingress-config/ingress_bootstrap.sh"],
                env: [
                  {
                    name: "NAMESPACE",
                    value: params.namespace,
                  },
                  {
                    name: "TLS_SECRET_NAME",
                    value: params.secretName,
                  },
                  {
                    name: "TLS_HOST_NAME",
                    value: params.hostname,
                  },
                  {
                    name: "INGRESS_NAME",
                    value: "envoy-ingress",
                  },
                ],
                volumeMounts: [
                  {
                    mountPath: "/var/ingress-config/",
                    name: "ingress-config",
                  },
                ],
              },
            ],
            volumes: [
              {
                configMap: {
                  name: "ingress-bootstrap-config",
                  // TODO(danisla): replace with std.parseOctal("0755") after upgrading to ksonnet 0.12
                  defaultMode: 493,
                },
                name: "ingress-config",
              },
            ],
          },
        },
      },
    },  // ingressBootstrapJob
    ingressBootstrapJob:: ingressBootstrapJob,

    local ingress = {
      apiVersion: "extensions/v1beta1",
      kind: "Ingress",
      metadata: {
        name: "envoy-ingress",
        namespace: params.istioNamespace,
        annotations: {
          "kubernetes.io/tls-acme": "true",
          "ingress.kubernetes.io/ssl-redirect": "true",
          "kubernetes.io/ingress.global-static-ip-name": params.ipName,
          "certmanager.k8s.io/issuer": params.issuer,
        },
      },
      spec: {
        rules: [
          {
            [if params.hostname != "null" then "host"]: params.hostname,
            http: {
              paths: [
                {
                  backend: {
                    // Due to https://github.com/kubernetes/contrib/blob/master/ingress/controllers/gce/examples/health_checks/README.md#limitations
                    // Keep port the servicePort the same as the port we are targeting on the backend so that servicePort will be the same as targetPort for the purpose of
                    // health checking.
                    serviceName: "istio-ingressgateway",
                    servicePort: 80,
                  },
                  path: "/*",
                },
              ],
            },
          },
        ],
        tls: [
          {
            secretName: params.secretName,
            hosts: [
              params.hostname,
            ],
          },
        ],
      },
    },  // iapIngress
    ingress:: ingress,

    local certificate = if params.privateGKECluster == "false" then (
      {
        apiVersion: "certmanager.k8s.io/v1alpha1",
        kind: "Certificate",
        metadata: {
          name: params.secretName,
          namespace: params.istioNamespace,
        },

        spec: {
          secretName: params.secretName,
          issuerRef: {
            name: params.issuer,
            kind: "Issuer",
          },
          commonName: params.hostname,
          dnsNames: [
            params.hostname,
          ],
          acme: {
            config: [
              {
                http01: {
                  ingress: "envoy-ingress",
                },
                domains: [
                  params.hostname,
                ],
              },
            ],
          },
        },
      }  // certificate
    ),
    certificate:: certificate,

    local cloudEndpoint = if isCloudEndpoint(params.hostname) then (
      {
        local makeEndpointParams(str) = {
          local toks = std.split(str, "."),
          result:: {
            name: toks[0],
            project: toks[2],
          },
        }.result,
        local endpointParams = makeEndpointParams(params.hostname),
        apiVersion: "ctl.isla.solutions/v1",
        kind: "CloudEndpoint",
        metadata: {
          name: endpointParams.name,
          namespace: params.istioNamespace,
        },
        spec: {
          project: endpointParams.project,
          targetIngress: {
            name: "envoy-ingress",
            namespace: params.istioNamespace,
          },
        },
      }  // cloudEndpoint
    ),
    cloudEndpoint:: cloudEndpoint,

    parts:: self,
    all:: [
      self.initServiceAccount,
      self.initClusterRoleBinding,
      self.initClusterRole,
      self.iapEnabler,
      self.backendUpdater,
      self.configMap,
      self.whoamiService,
      self.whoamiApp,
      self.backendConfig,
      //self.ingressBootstrapConfigMap,
      //self.ingressBootstrapJob,
      self.ingress,
      self.certificate,
      self.cloudEndpoint,
    ],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}

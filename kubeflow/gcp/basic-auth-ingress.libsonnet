{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env {
      hostname: if std.objectHas(_params, "hostname") then _params.hostname else "null",
      ingressName: "envoy-ingress",
      portName: "ambassador",
      injectIstio: util.toBool(_params.injectIstio),
    },
    local namespace = if params.injectIstio then params.istioNamespace else params.namespace,

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
        namespace: namespace,
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
          namespace: namespace,
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
        namespace: namespace,
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
      ],
    },  // initClusterRoleBinding
    initClusterRole:: initClusterRole,

    local configMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "envoy-config",
        namespace: namespace,
      },
      data: {
        "update_backend.sh": importstr "update_backend.sh",
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
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: whoami-mapping",
              "prefix: /whoami",
              "rewrite: /whoami",
              "service: whoami-app." + params.namespace,
            ]),
        },  //annotations
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

    // Run the process to update the backend service
    local backendUpdater = {
      apiVersion: "apps/v1",
      kind: "StatefulSet",
      metadata: {
        name: "backend-updater",
        namespace: namespace,
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
                    value: namespace,
                  },
                  {
                    name: "SERVICE",
                    value: "ambassador",
                  },
                  {
                    name: "GOOGLE_APPLICATION_CREDENTIALS",
                    value: "/var/run/secrets/sa/admin-gcp-sa.json",
                  },
                  {
                    name: "HEALTHCHECK_PATH",
                    value: "/whoami",
                  },
                  {
                    name: "INGRESS_NAME",
                    value: params.ingressName,
                  },
                  {
                    name: "PORT_NAME",
                    value: params.portName,
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

    // TODO(danisla): Remove afer https://github.com/kubernetes/ingress-gce/pull/388 is resolved per #1327.
    local ingressBootstrapConfigMap = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "ingress-bootstrap-config",
        namespace: namespace,
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
        namespace: namespace,
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
                    value: namespace,
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
        namespace: namespace,
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
                    serviceName: "ambassador",
                    servicePort: 80,
                  },
                  path: "/*",
                },
              ],
            },
          },
        ],
      },
    },  // ingress
    ingress:: ingress,

    local certificate = if params.privateGKECluster == "false" then (
      {
        apiVersion: "certmanager.k8s.io/v1alpha1",
        kind: "Certificate",
        metadata: {
          name: params.secretName,
          namespace: namespace,
        },

        spec: {
          secretName: params.secretName,
          issuerRef: {
            name: params.issuer,
            kind: "ClusterIssuer",
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
          namespace: namespace,
        },
        spec: {
          project: endpointParams.project,
          targetIngress: {
            name: "envoy-ingress",
            namespace: namespace,
          },
        },
      }  // cloudEndpoint
    ),
    cloudEndpoint:: cloudEndpoint,

    // No deployments. This is used for annotation that directs traffic to
    // ISTIO ingress gateway.
    local istioMappingSvc = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "istioMappingSvc",
        },
        name: "istio-mapping-service",
        namespace: namespace,
        annotations: {
          "getambassador.io/config":
            std.join("\n", [
              "---",
              "apiVersion: ambassador/v0",
              "kind:  Mapping",
              "name: istio-mapping",
              "prefix_regex: true",
              "prefix: /(?!whoami|kflogin).*",
              "rewrite: \"\"",
              "service: istio-ingressgateway." + namespace,
              "precedence: 1",
            ]),
        },  //annotations
      },
      spec: {
        ports: [
          {
            port: 80,
            targetPort: 8081,
          },
        ],
        selector: {
          app: "istioMappingSvc",
        },
        type: "ClusterIP",
      },
    },
    istioMappingSvc:: istioMappingSvc,

    parts:: self,
    all:: [
      self.initServiceAccount,
      self.initClusterRoleBinding,
      self.initClusterRole,
      self.whoamiService,
      self.whoamiApp,
      self.backendUpdater,
      self.configMap,
      self.ingressBootstrapConfigMap,
      self.ingressBootstrapJob,
      self.ingress,
      self.certificate,
      self.cloudEndpoint,
    ] + if params.injectIstio then [
      self.istioMappingSvc,
    ] else [],

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}

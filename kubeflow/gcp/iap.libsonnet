{
  local k = import "k.libsonnet",
  local util = import "kubeflow/common/util.libsonnet",
  new(_env, _params):: {
    local params = _params + _env {
      disableJwtChecking: util.toBool(_params.disableJwtChecking),
      hostname: if std.objectHas(_params, "hostname") then _params.hostname else "null",
      envoyPort: 8080,
      envoyAdminPort: 8001,
      envoyStatsPort: 8025,
      useIstio: util.toBool(_params.useIstio),
      ingressName: "envoy-ingress"
    },
    local namespace = if params.useIstio then params.istioNamespace else params.namespace,

    // Test if the given hostname is in the form of: "NAME.endpoints.PROJECT.cloud.goog"
    local isCloudEndpoint(str) = {
      local toks = if std.type(str) == "null" then [] else std.split(str, "."),
      result::
        (std.length(toks) == 5 && toks[1] == "endpoints" && toks[3] == "cloud" && toks[4] == "goog"),
    }.result,

    local service = {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          service: "envoy",
        },
        name: "envoy",
        namespace: namespace,
        annotations: {
          "beta.cloud.google.com/backend-config": '{"ports": {"envoy":"iap-backendconfig"}}',
        },
      },
      spec: {
        ports: [
          {
            name: "envoy",
            port: params.envoyPort,
            targetPort: params.envoyPort,
          },
        ],
        selector: {
          service: "envoy",
        },
        // NodePort because this will be the backend for our ingress.
        type: "NodePort",
      },
    },  // service
    service:: service,

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
      ] + if params.useIstio then [
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
      ] else [],
    },  // initClusterRoleBinding
    initClusterRole:: initClusterRole,

    local deploy = {
      local envoyContainer(params) = {
        image: params.image,
        command: [
          "/usr/local/bin/envoy",
          "-c",
          params.configPath,
          "--log-level",
          "info",
          // Since we are running multiple instances of envoy on the same host we need to set a unique baseId
          "--base-id",
          params.baseId,
        ],
        imagePullPolicy: "Always",
        name: params.name,
        livenessProbe: {
          httpGet: {
            path: params.healthPath,
            port: params.healthPort,
          },
          initialDelaySeconds: 30,
          periodSeconds: 30,
        },
        readinessProbe: {
          httpGet: {
            path: params.healthPath,
            port: params.healthPort,
          },
          initialDelaySeconds: 30,
          periodSeconds: 30,
        },
        ports: std.map(function(p)
          {
            containerPort: p,
          }
                       , params.ports),
        resources: {
          limits: {
            cpu: 1,
            memory: "400Mi",
          },
          requests: {
            cpu: "200m",
            memory: "100Mi",
          },
        },
        volumeMounts: [
          {
            mountPath: "/etc/envoy",
            name: "shared",
          },
        ],
      },  // envoyContainer

      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "envoy",
        namespace: params.namespace,
      },
      spec: {
        replicas: 3,
        template: {
          metadata: {
            labels: {
              service: "envoy",
            },
          },
          spec: {
            serviceAccountName: "envoy",
            containers: [
              envoyContainer({
                image: params.envoyImage,
                name: "envoy",
                // We use the admin port for the health, readiness check because the main port will require a valid JWT.
                // healthPath: "/server_info",
                healthPath: "/healthz",
                healthPort: params.envoyPort,
                configPath: "/etc/envoy/envoy-config.json",
                baseId: "27000",
                ports: [params.envoyPort, params.envoyAdminPort, params.envoyStatsPort],
              }),
              {
                name: "iap",
                image: params.ingressSetupImage,
                command: [
                  "sh",
                  "/var/envoy-config/configure_envoy_for_iap.sh",
                ],
                env: [
                  {
                    name: "NAMESPACE",
                    value: params.namespace,
                  },
                  {
                    name: "SERVICE",
                    value: "envoy",
                  },
                  {
                    name: "ENVOY_ADMIN",
                    value: "http://localhost:" + params.envoyAdminPort,
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
                    mountPath: "/var/shared/",
                    name: "shared",
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
                emptyDir: {
                  medium: "Memory",
                },
                name: "shared",
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
    },  // deploy
    deploy:: deploy,

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
                    value: if params.useIstio then "istio-ingressgateway" else "envoy",
                  },
                  {
                    name: "GOOGLE_APPLICATION_CREDENTIALS",
                    value: "/var/run/secrets/sa/admin-gcp-sa.json",
                  },
                ] + if params.useIstio then [
                  {
                    name: "USE_ISTIO",
                    value: "true",
                  },
                ] else [],
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
        namespace: namespace,
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
                    value: namespace,
                  },
                  {
                    name: "SERVICE",
                    value: if params.useIstio then "istio-ingressgateway" else "envoy",
                  },
                  {
                    name: "INGRESS_NAME",
                    value: params.ingressName,
                  },
                  {
                    name: "ENVOY_ADMIN",
                    value: "http://localhost:" + params.envoyAdminPort,
                  },
                  {
                    name: "GOOGLE_APPLICATION_CREDENTIALS",
                    value: "/var/run/secrets/sa/admin-gcp-sa.json",
                  },
                ] + if params.useIstio then [
                  {
                    name: "USE_ISTIO",
                    value: "true",
                  },
                ] else [],
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
      // This is the config for the secondary envoy proxy which does JWT verification
      // and actually routes requests to the appropriate backend.
      local envoyConfig(params) = {
        listeners: [
          {
            address: "tcp://0.0.0.0:" + params.envoyPort,
            filters: [
              {
                type: "read",
                name: "http_connection_manager",
                config: {
                  codec_type: "auto",
                  stat_prefix: "ingress_http",
                  access_log: [
                    {
                      format: 'ACCESS [%START_TIME%] "%REQ(:METHOD)% %REQ(X-ENVOY-ORIGINAL-PATH?:PATH)% %PROTOCOL%" %RESPONSE_CODE% %RESPONSE_FLAGS% %BYTES_RECEIVED% %BYTES_SENT% %DURATION% %RESP(X-ENVOY-UPSTREAM-SERVICE-TIME)% "%REQ(X-FORWARDED-FOR)%" "%REQ(USER-AGENT)%" "%REQ(X-REQUEST-ID)%" "%REQ(:AUTHORITY)%" "%UPSTREAM_HOST%"\n',
                      path: "/dev/fd/1",
                    },
                  ],
                  route_config: {
                    virtual_hosts: [
                      {
                        name: "backend",
                        domains: ["*"],
                        routes: [
                          // First route that matches is picked.
                          {
                            timeout_ms: 10000,
                            path: "/healthz",
                            prefix_rewrite: "/server_info",
                            weighted_clusters: {
                              clusters: [

                                { name: "cluster_healthz", weight: 100.0 },

                              ],
                            },
                          },
                          // Provide access to the whoami app skipping JWT verification.
                          // this is useful for debugging.
                          {
                            timeout_ms: 10000,
                            prefix: "/noiap/whoami",
                            prefix_rewrite: "/",
                            weighted_clusters: {
                              clusters: [
                                {
                                  name: "cluster_iap_app",
                                  weight: 100.0,
                                },
                              ],
                            },
                          },
                          {
                            timeout_ms: 10000,
                            prefix: "/whoami",
                            prefix_rewrite: "/",
                            weighted_clusters: {
                              clusters: [
                                {
                                  name: "cluster_iap_app",
                                  weight: 100.0,
                                },
                              ],
                            },
                          },
                          // Jupyter uses the prefixes /hub & /user
                          {
                            // Jupyter requires the prefix /hub
                            // Use a 10 minute timeout because downloading
                            // images for jupyter notebook can take a while
                            timeout_ms: 600000,
                            prefix: "/hub",
                            prefix_rewrite: "/hub",
                            use_websocket: true,
                            weighted_clusters: {
                              clusters: [
                                {
                                  name: "cluster_jupyter",
                                  weight: 100.0,
                                },
                              ],
                            },
                          },
                          {
                            // Jupyter requires the prefix /user
                            // Use a 10 minute timeout because downloading
                            // images for jupyter notebook can take a while
                            timeout_ms: 600000,
                            prefix: "/user",
                            prefix_rewrite: "/user",
                            use_websocket: true,
                            weighted_clusters: {
                              clusters: [
                                {
                                  name: "cluster_jupyter",
                                  weight: 100.0,
                                },
                              ],
                            },
                          },
                          // TFJob uses the prefix /tfjobs/
                          {
                            timeout_ms: 10000,
                            prefix: "/tfjobs",
                            prefix_rewrite: "/tfjobs",
                            weighted_clusters: {
                              clusters: [
                                {
                                  name: "cluster_tfjobs",
                                  weight: 100.0,
                                },
                              ],
                            },
                          },
                          // Routing with Istio
                          {
                            timeout_ms: 10000,
                            prefix: "/istio",
                            weighted_clusters: {
                              clusters: [
                                {
                                  name: "cluster_istiogateway",
                                  weight: 100.0,
                                },
                              ],
                            },
                          },
                          {
                            // Route remaining traffic to Ambassador which supports dynamically adding
                            // routes based on service annotations.
                            timeout_ms: 10000,
                            prefix: "/",
                            prefix_rewrite: "/",
                            use_websocket: true,
                            weighted_clusters: {
                              clusters: [
                                {
                                  name: "cluster_ambassador",
                                  weight: 100.0,
                                },
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                  local authFilter = if params.disableJwtChecking then
                    []
                  else [{
                    type: "decoder",
                    name: "jwt-auth",
                    config: {
                      jwts: [
                        {
                          issuer: "https://cloud.google.com/iap",
                          audiences: "{{JWT_AUDIENCE}}",
                          jwks_uri: "https://www.gstatic.com/iap/verify/public_key-jwk",
                          jwks_uri_envoy_cluster: "iap_issuer",
                          jwt_headers: ["x-goog-iap-jwt-assertion"],
                        },
                      ],
                      bypass_jwt: [
                        {
                          http_method: "GET",
                          path_exact: "/healthz",
                        },
                        {
                          http_method: "GET",
                          path_exact: "/noiap/whoami",
                        },
                      ],
                    },
                  }],
                  filters:
                    authFilter +
                    [
                      {
                        type: "decoder",
                        name: "router",
                        config: {},
                      },
                    ],
                },
              },
            ],
          },
        ],
        admin: {
          // We use 0.0.0.0 and not 127.0.0.1 because we want the admin server to be available on all devices
          // so that it can be used for health checking.
          address: "tcp://0.0.0.0:" + params.envoyAdminPort,
          access_log_path: "/tmp/admin_access_log",
        },
        cluster_manager: {
          clusters: [
            {
              name: "cluster_healthz",
              connect_timeout_ms: 3000,
              type: "strict_dns",
              lb_type: "round_robin",
              hosts: [
                {
                  // We just use the admin server for the health check
                  url: "tcp://127.0.0.1:" + params.envoyAdminPort,
                },

              ],
            },
            {
              name: "iap_issuer",
              connect_timeout_ms: 5000,
              type: "strict_dns",
              circuit_breakers: {
                default: {
                  max_pending_requests: 10000,
                  max_requests: 10000,
                },
              },
              lb_type: "round_robin",
              hosts: [
                {
                  url: "tcp://www.gstatic.com:80",
                },
              ],
            },
            {
              name: "cluster_iap_app",
              connect_timeout_ms: 3000,
              type: "strict_dns",
              lb_type: "round_robin",
              hosts: [
                {
                  url: "tcp://whoami-app." + params.namespace + ":80",
                },
              ],
            },
            {
              name: "cluster_jupyter",
              connect_timeout_ms: 3000,
              type: "strict_dns",
              lb_type: "round_robin",
              hosts: [
                {
                  url: "tcp://jupyter-lb." + params.namespace + ":80",
                },

              ],
            },
            {
              name: "cluster_tfjobs",
              connect_timeout_ms: 3000,
              type: "strict_dns",
              lb_type: "round_robin",
              hosts: [
                {
                  url: "tcp://tf-job-dashboard." + params.namespace + ":80",
                },

              ],
            },
            // Istio's gateway
            {
              name: "cluster_istiogateway",
              connect_timeout_ms: 3000,
              type: "strict_dns",
              lb_type: "round_robin",
              hosts: [
                {
                  url: "tcp://istio-ingressgateway.istio-system:80",
                },
              ],
            },
            {
              name: "cluster_ambassador",
              connect_timeout_ms: 3000,
              type: "strict_dns",
              lb_type: "round_robin",
              hosts: [
                {
                  url: "tcp://ambassador." + params.namespace + ":80",
                },

              ],
            },
          ],
        },
        statsd_udp_ip_address: "127.0.0.1:" + params.envoyStatsPort,
        stats_flush_interval_ms: 1000,
      },  // envoyConfig

      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "envoy-config",
        namespace: namespace,
      },
      data: {
        "setup_backend.sh": importstr "setup_backend.sh",
        "update_backend.sh": importstr "update_backend.sh",
      } + if params.useIstio then {
        "jwt-policy-template.yaml": importstr "jwt-policy-template.yaml",
        "healthcheck_route.yaml": importstr "healthcheck_route.yaml",
      } else {
        "envoy-config.json": std.manifestJson(envoyConfig(params)),
        "configure_envoy_for_iap.sh": importstr "configure_envoy_for_iap.sh",
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
                image: params.espSampleAppImage,
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
        name: "iap-backendconfig",
        namespace: namespace,
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
                    value: params.ingressName,
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
        name: params.ingressName,
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
                    serviceName: if params.useIstio then "istio-ingressgateway" else "envoy",
                    servicePort: if params.useIstio then 80 else params.envoyPort,
                  },
                  path: "/*",
                },
              ],
            },
          },
        ],
      },
    },  // iapIngress
    ingress:: ingress,

    local certificate = {
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
                ingress: params.ingressName,
              },
              domains: [
                params.hostname,
              ],
            },
          ],
        },
      },
    },  // certificate
    certificate:: certificate,

    local cloudEndpoint = {
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
          name: params.ingressName,
          namespace: namespace,
        },
      },
    },  // cloudEndpoint
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
      self.ingressBootstrapConfigMap,
      self.ingressBootstrapJob,
      self.ingress,
    ] + (
      if params.privateGKECluster == "false" then [
        self.certificate,
      ] else []
    ) + (
      if isCloudEndpoint(params.hostname) then [
        self.cloudEndpoint,
      ] else []
    ) + (
      if !params.useIstio then [
        self.service,
        self.deploy,
      ] else []
    ),

    list(obj=self.all):: k.core.v1.list.new(obj,),
  },
}

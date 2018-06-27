{
  parts(namespace):: {
    local k = import "k.libsonnet",

    // Test if the given hostname is in the form of: "NAME.endpoints.PROJECT.cloud.goog"
    local isCloudEndpoint = function(str) {
      local toks = std.split(str, "."),
      result::
        (std.length(toks) == 5 && toks[1] == "endpoints" && toks[3] == "cloud" && toks[4] == "goog"),
    }.result,

    // Creates map of parameters from a given hostname in the form of: "NAME.endpoints.PROJECT.cloud.goog"
    local makeEndpointParams = function(str) {
      local toks = std.split(str, "."),
      result:: {
        name: toks[0],
        project: toks[2],
      },
    }.result,

    ingressParts(secretName, ipName, hostname, issuer, envoyImage, disableJwt, oauthSecretName):: std.prune(k.core.v1.list.new([
      $.parts(namespace).service,
      $.parts(namespace).ingress(secretName, ipName, hostname),
      $.parts(namespace).certificate(secretName, hostname, issuer),
      $.parts(namespace).initServiceAccount,
      $.parts(namespace).initClusterRoleBinding,
      $.parts(namespace).initClusterRole,
      $.parts(namespace).deploy(envoyImage, oauthSecretName),
      $.parts(namespace).iapEnabler(oauthSecretName),
      $.parts(namespace).configMap(disableJwt),
      $.parts(namespace).whoamiService,
      $.parts(namespace).whoamiApp,
      (if isCloudEndpoint(hostname) then $.parts(namespace).cloudEndpoint(makeEndpointParams(hostname))),
    ])),

    service:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          service: "envoy",
        },
        name: "envoy",
        namespace: namespace,
      },
      spec: {
        ports: [
          {
            name: "envoy",
            port: envoyPort,
            targetPort: envoyPort,
          },
        ],
        selector: {
          service: "envoy",
        },
        // NodePort because this will be the backend for our ingress.
        type: "NodePort",
      },
    },  // service

    initServiceAccount:: {
      apiVersion: "v1",
      kind: "ServiceAccount",
      metadata: {
        name: "envoy",
        namespace: namespace,
      },
    },  // initServiceAccount

    initClusterRoleBinding:: {
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

    initClusterRole:: {
      kind: "ClusterRole",
      apiVersion: "rbac.authorization.k8s.io/v1beta1",
      metadata: {
        name: "envoy",
        namespace: namespace,
      },
      rules: [
        {
          apiGroups: [""],
          resources: ["services", "configmaps"],
          verbs: ["get", "list", "patch", "update"],
        },
      ],
    },  // initClusterRoleBinding

    envoyContainer(params):: {
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

    deploy(image, oauthSecretName):: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "envoy",
        namespace: namespace,
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
              $.parts(namespace).envoyContainer({
                image: image,
                name: "envoy",
                // We use the admin port for the health, readiness check because the main port will require a valid JWT.
                // healthPath: "/server_info",
                healthPath: "/healthz",
                healthPort: envoyPort,
                configPath: "/etc/envoy/envoy-config.json",
                baseId: "27000",
                ports: [envoyPort, envoyAdminPort, envoyStatsPort],
              }),
              {
                name: "iap",
                image: "google/cloud-sdk:alpine",
                command: [
                  "sh",
                  "/var/envoy-config/configure_envoy_for_iap.sh",
                ],
                env: [
                  {
                    name: "NAMESPACE",
                    value: namespace,
                  },
                  {
                    name: "CLIENT_ID",
                    valueFrom: {
                      secretKeyRef: {
                        name: oauthSecretName,
                        key: "CLIENT_ID",
                      },
                    },
                  },
                  {
                    name: "CLIENT_SECRET",
                    valueFrom: {
                      secretKeyRef: {
                        name: oauthSecretName,
                        key: "CLIENT_SECRET",
                      },
                    },
                  },
                  {
                    name: "SERVICE",
                    value: "envoy",
                  },
                  {
                    name: "ENVOY_ADMIN",
                    value: "http://localhost:" + envoyAdminPort,
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

    // Run the process to enable iap
    iapEnabler(oauthSecretName):: {
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
                image: "google/cloud-sdk:alpine",
                command: [
                  "sh",
                  "/var/envoy-config/setup_iap.sh",
                ],
                env: [
                  {
                    name: "NAMESPACE",
                    value: namespace,
                  },
                  {
                    name: "CLIENT_ID",
                    valueFrom: {
                      secretKeyRef: {
                        name: oauthSecretName,
                        key: "CLIENT_ID",
                      },
                    },
                  },
                  {
                    name: "CLIENT_SECRET",
                    valueFrom: {
                      secretKeyRef: {
                        name: oauthSecretName,
                        key: "CLIENT_SECRET",
                      },
                    },
                  },
                  {
                    name: "SERVICE",
                    value: "envoy",
                  },
                  {
                    name: "ENVOY_ADMIN",
                    value: "http://localhost:" + envoyAdminPort,
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

    configMap(disableJwt):: {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: "envoy-config",
        namespace: namespace,
      },
      data: {
        "envoy-config.json": std.manifestJson($.parts(namespace).envoyConfig(disableJwt)),
        "setup_iap.sh": importstr "setup_iap.sh",
        "configure_envoy_for_iap.sh": importstr "configure_envoy_for_iap.sh",
      },
    },

    local envoyPort = 8080,
    local envoyAdminPort = 8001,
    local envoyStatsPort = 8025,

    // This is the config for the secondary envoy proxy which does JWT verification
    // and actually routes requests to the appropriate backend.
    envoyConfig(disableJwt):: {
      listeners: [
        {
          address: "tcp://0.0.0.0:" + envoyPort,
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
                          // JupyterHub requires the prefix /hub
                          // Use a 10 minute timeout because downloading
                          // images for jupyter notebook can take a while
                          timeout_ms: 600000,
                          prefix: "/hub",
                          prefix_rewrite: "/hub",
                          use_websocket: true,
                          weighted_clusters: {
                            clusters: [
                              {
                                name: "cluster_jupyterhub",
                                weight: 100.0,
                              },
                            ],
                          },
                        },
                        {
                          // JupyterHub requires the prefix /user
                          // Use a 10 minute timeout because downloading
                          // images for jupyter notebook can take a while
                          timeout_ms: 600000,
                          prefix: "/user",
                          prefix_rewrite: "/user",
                          use_websocket: true,
                          weighted_clusters: {
                            clusters: [
                              {
                                name: "cluster_jupyterhub",
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
                local authFilter = if disableJwt then
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
        address: "tcp://0.0.0.0:" + envoyAdminPort,
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
                url: "tcp://127.0.0.1:" + envoyAdminPort,
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
                url: "tcp://whoami-app." + namespace + ":80",
              },
            ],
          },
          {
            name: "cluster_jupyterhub",
            connect_timeout_ms: 3000,
            type: "strict_dns",
            lb_type: "round_robin",
            hosts: [
              {
                url: "tcp://tf-hub-lb." + namespace + ":80",
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
                url: "tcp://tf-job-dashboard." + namespace + ":80",
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
                url: "tcp://ambassador." + namespace + ":80",
              },

            ],
          },
        ],
      },
      statsd_udp_ip_address: "127.0.0.1:" + envoyStatsPort,
      stats_flush_interval_ms: 1000,
    },  // envoyConfig

    whoamiService:: {
      apiVersion: "v1",
      kind: "Service",
      metadata: {
        labels: {
          app: "whoami",
        },
        name: "whoami-app",
        namespace: namespace,
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

    whoamiApp:: {
      apiVersion: "extensions/v1beta1",
      kind: "Deployment",
      metadata: {
        name: "whoami-app",
        namespace: namespace,
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

    ingress(secretName, ipName, hostname):: {
      apiVersion: "extensions/v1beta1",
      kind: "Ingress",
      metadata: {
        name: "envoy-ingress",
        namespace: namespace,
        annotations: {
          "kubernetes.io/tls-acme": "true",
          "ingress.kubernetes.io/ssl-redirect": "true",
          "kubernetes.io/ingress.global-static-ip-name": ipName,
        },
      },
      spec: {
        rules: [
          {
            [if hostname != "null" then "host"]: hostname,
            http: {
              paths: [
                {
                  backend: {
                    // Due to https://github.com/kubernetes/contrib/blob/master/ingress/controllers/gce/examples/health_checks/README.md#limitations
                    // Keep port the servicePort the same as the port we are targetting on the backend so that servicePort will be the same as targetPort for the purpose of
                    // health checking.
                    serviceName: "envoy",
                    servicePort: envoyPort,
                  },
                  path: "/*",
                },
              ],
            },
          },
        ],
        tls: [
          {
            secretName: secretName,
          },
        ],
      },
    },  // iapIngress

    certificate(secretName, hostname, issuer):: {
      apiVersion: "certmanager.k8s.io/v1alpha1",
      kind: "Certificate",
      metadata: {
        name: secretName,
        namespace: namespace,
      },

      spec: {
        secretName: secretName,
        issuerRef: {
          name: issuer,
        },
        commonName: hostname,
        dnsNames: [
          hostname,
        ],
        acme: {
          config: [
            {
              http01: {
                ingress: "envoy-ingress",
              },
              domains: [
                hostname,
              ],
            },
          ],
        },
      },
    },  // certificate

    cloudEndpoint(params):: {
      apiVersion: "ctl.isla.solutions/v1",
      kind: "CloudEndpoint",
      metadata: {
        name: params.name,
        namespace: namespace,
      },
      spec: {
        project: params.project,
        targetIngress: {
          name: "envoy-ingress",
          namespace: namespace,
        },
      },
    },  // cloudEndpoint

  },  // parts
}
